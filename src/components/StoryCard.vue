<script lang="ts" setup>
import type { Story } from '../data/stories';
import { useUiStore } from '../store/ui';
import SoundIcon from './icons/SoundIcon.vue';
import NoSoundIcon from './icons/NoSoundIcon.vue';
import { computed, ref, useTemplateRef, watchEffect, watch } from 'vue';
import { useStoriesStore } from '../store/stories';
import { onClickOutside } from '@vueuse/core';

interface StoriesCardProps {
    story: Story
}
const { story } = defineProps<StoriesCardProps>();

const uiStore = useUiStore();
const storiesStore = useStoriesStore();

const descElement = useTemplateRef<HTMLDivElement>('descElement')

const emit = defineEmits<{
    (e: 'reach-start'): void
    (e: 'reach-end'): void
}>()

watch(() => uiStore.isModalOpen, (isOpen) => {
    if (!isOpen) {
        resetStates()
    }
})

const isActiveStory = computed(() => {
    return storiesStore.activeStory?.id === story.id;
})

const { isNew, logo, desc, fullDesc, slides, preview } = story;

const cardHasVideo = computed(() => {
    return slides?.some((slide) => slide.video);
});

const isDescShown = ref(false)

const description = computed(() => {
    if (!fullDesc?.trim()) {
        if (desc?.trim()) return desc;
        return ''
    }
    return fullDesc;
})


onClickOutside(descElement, () => {
    isDescShown.value = false
})

const video = useTemplateRef<HTMLVideoElement>('video')
const videoDuration = ref(0)
const isVideoReady = ref(false)
const paused = ref(false)
const activeIndex = ref(0)
const holdTimeout = ref<number | null>(null)
const wasHoldTriggered = ref(false)
const progressAnimationFrame = ref<number | null>(null)
const progress = ref(0)
const elapsedTime = ref(0)
const lastStartTime = ref(0)
const HOLD_DURATION = 500 // 500ms hold duration
const DEFAULT_SLIDE_DURATION = 5 // 5 seconds

const activeSlide = computed(() => {
    return slides?.[activeIndex.value]
})

const showSlides = computed(() => {
    return slides?.length && isActiveStory.value && uiStore.isModalOpen
})

const startProgress = () => {
    if (progressAnimationFrame.value) {
        cancelAnimationFrame(progressAnimationFrame.value)
    }

    lastStartTime.value = Date.now() - elapsedTime.value
    const duration = activeSlideDuration.value * 1000 // convert to milliseconds

    const animate = () => {
        const currentElapsed = Date.now() - lastStartTime.value
        elapsedTime.value = currentElapsed
        progress.value = Math.min((currentElapsed / duration) * 100, 100)

        if (currentElapsed < duration) {
            progressAnimationFrame.value = requestAnimationFrame(animate)
        } else {
            handleNext()
        }
    }

    progressAnimationFrame.value = requestAnimationFrame(animate)
}

const stopProgress = () => {
    if (progressAnimationFrame.value) {
        cancelAnimationFrame(progressAnimationFrame.value)
        progressAnimationFrame.value = null
    }
}

const resetStates = () => {
    videoDuration.value = 0
    isVideoReady.value = false
    paused.value = false
    activeIndex.value = 0
    progress.value = 0
    elapsedTime.value = 0
    lastStartTime.value = 0
    if (holdTimeout.value) {
        clearTimeout(holdTimeout.value)
        holdTimeout.value = null
    }
    wasHoldTriggered.value = false
    stopProgress()
}

watch(isActiveStory, (newValue) => {
    if (!newValue) {
        resetStates()
    } else if (!currentSlideHasVideo.value && !paused.value) {
        startProgress()
    }
})

watch([isVideoReady, paused], ([ready, isPaused]) => {
    if (currentSlideHasVideo.value) {
        if (ready && !isPaused) {
            startProgress()
        } else {
            stopProgress()
        }
    } else if (!isPaused) {
        startProgress()
    } else {
        stopProgress()
    }
})

watch(activeSlide, () => {
    isVideoReady.value = false
    if (!currentSlideHasVideo.value && !paused.value) {
        startProgress()
    }
})

const handleVideoMetadataLoaded = () => {
    if (video.value) {
        videoDuration.value = video.value.duration
    }
}

const handleVideoCanPlay = () => {
    isVideoReady.value = true
}

const handleVideoWaiting = () => {
    isVideoReady.value = false
}

const activeSlideDuration = computed(() => {
    const specifiedDuration = activeSlide.value?.duration
    if (specifiedDuration) return specifiedDuration;

    if (currentSlideHasVideo.value && videoDuration.value > 0) {
        return videoDuration.value;
    }
    return DEFAULT_SLIDE_DURATION
})

const currentSlideHasVideo = computed(() => {
    return !!activeSlide.value?.video
})

watchEffect(() => {
    console.log('Watching paused', paused.value)
    if (paused.value) {
        video.value?.pause()
    } else {
        video.value?.play()
    }
})

const handlePrev = () => {
    if (wasHoldTriggered.value) {
        wasHoldTriggered.value = false
        return
    }
    if (activeIndex.value > 0) {
        stopProgress()
        activeIndex.value--
        progress.value = 0
        elapsedTime.value = 0
        lastStartTime.value = 0
        isVideoReady.value = false
        if (video.value) {
            video.value.currentTime = 0
        }
    } else {
        // Trigger event that active story is at the start
        emit('reach-start')
    }
}

const handleNext = () => {
    if (wasHoldTriggered.value) {
        wasHoldTriggered.value = false
        return
    }
    if (slides && activeIndex.value < slides.length - 1) {
        stopProgress()
        activeIndex.value++
        progress.value = 0
        elapsedTime.value = 0
        lastStartTime.value = 0
        isVideoReady.value = false
        if (video.value) {
            video.value.currentTime = 0
        }
    } else {
        // Trigger event that active story is at the end
        emit('reach-end')
    }
}

const handlePointerDown = () => {
    console.log('Mousedown')
    wasHoldTriggered.value = false
    holdTimeout.value = window.setTimeout(() => {
        paused.value = true
        wasHoldTriggered.value = true
    }, HOLD_DURATION)
}

const handlePointerUp = () => {
    console.log('Mouseup')
    if (holdTimeout.value) {
        clearTimeout(holdTimeout.value)
        holdTimeout.value = null
    }
    paused.value = false
}


</script>

<template>
    <div class="story-card">
        <div class="story-card__bullets" v-if="slides?.length && isActiveStory">
            <div class="story-card__bullet" v-for="(slide, index) in slides" :key="slide.id" :class="{
                prev: index < activeIndex,
                next: index > activeIndex,
                active: index === activeIndex
            }">
                <div class="story-card__bullet-progress"
                    :style="{ width: index === activeIndex ? `${progress}%` : '0%' }"></div>
            </div>
        </div>
        <div class="story-card__grid" @pointerdown="handlePointerDown" @pointerup="handlePointerUp"
            @pointerleave="handlePointerUp" @pointercancel="handlePointerUp" @contextmenu.prevent>
            <div class="story-card__bg-wrapper" v-if="preview">
                <img :src="preview" alt="" class="story-card__bg-image" loading="lazy">
            </div>
            <div class="story-card__slides" v-if="showSlides">
                <div class="story-card__slide" v-if="activeSlide" :key="activeSlide.id">
                    <img :src="activeSlide.image" alt="" class="story-card__slide-image">
                    <video :src="activeSlide.video" playsinline autoplay :muted="uiStore.muted" loop
                        class="story-card__slide-video" v-if="activeSlide.video" ref="video"
                        @loadedmetadata="handleVideoMetadataLoaded" @canplay="handleVideoCanPlay"
                        @waiting="handleVideoWaiting"></video>
                    <div class="story-card__loader" v-if="currentSlideHasVideo && !isVideoReady">
                        <div class="story-card__loader__circle"></div>
                    </div>
                </div>
            </div>
            <div class="story__controls-layer" v-if="showSlides">
                <div class="story__controls-layer-prev" @click="handlePrev"></div>
                <div class="story__controls-layer-next" @click="handleNext"></div>
            </div>
            <div class="story-card__content">
                <div class="story-card__inactive-overlay" v-if="!isActiveStory"></div>
                <div class="story-card__top-row">
                    <div class="story-card__is-new" v-if="isNew">
                        New
                    </div>
                    <div class="story-card__logo-wrapper" v-if="logo">
                        <img class="story-card__logo" :src="logo" alt="Logo">
                    </div>
                </div>
                <div class="story-card__bottom-row" v-if="isActiveStory">
                    <div class="story-card__desc" v-if="desc" @mouseenter="isDescShown = true"
                        @mouseleave="isDescShown = false" @touchstart.prevent="isDescShown = !isDescShown" :class="{
                            shown: isDescShown
                        }" ref="descElement" :data-text="desc">
                        <div class="story-card__desc-text" :class="{
                            shown: isDescShown
                        }">
                            {{ description }}
                        </div>
                    </div>
                    <button class="story-card__mute-btn" @click.prevent="uiStore.toggleMuted" v-if="cardHasVideo">
                        <SoundIcon v-if="!uiStore.muted" />
                        <NoSoundIcon v-else />
                    </button>
                </div>
            </div>
        </div>

    </div>
</template>


<style lang="scss" scoped>
.story-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    flex-grow: 1;
    width: 47.5rem;
    user-select: none;
    -webkit-user-drag: none;
    touch-action: pan-y pinch-zoom;


    width: 40rem;


    @media only screen and (max-width: 640px) {
        width: auto;
        zoom: 1;
    }
}

.story-card__grid {
    margin-top: auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'stack';
    border-radius: 0.5rem;
    overflow: hidden;

    &::before {
        content: '';
        grid-area: stack;
        aspect-ratio: 475 / 800;
    }
}

.story-card__slides {
    grid-area: stack;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'stack';
    background-color: black;

}

.story-card__inactive-overlay {
    position: absolute;
    inset: -2px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: -1;
}

.story-card__slide {
    grid-area: stack;
    position: relative;
    background-color: #212121;
    position: relative;
}

.story-card__slide-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
}

.story-card__slide-video {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.story-card__bg-wrapper {
    grid-area: stack;
    position: relative;
}

.story-card__bg-image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.01);
    user-select: none;
    -webkit-user-drag: none;
}

.story__controls-layer {
    grid-area: stack;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    z-index: 5;
    cursor: pointer;
}

.story__controls-layer-prev,
.story__controls-layer-next {
    height: 100%;
    width: 100%;
}

.story-card__content {
    grid-area: stack;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    z-index: 10;
    pointer-events: none;
    position: relative;

    @media only screen and (max-width: 640px) {
        padding: 1.5rem;
    }
}

.story-card__top-row {
    display: flex;
    align-items: flex-start;
    gap: 1.6rem;
    margin: -2rem;
    margin-bottom: 0;
    padding: 2rem;
    padding-bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%);
}

.story-card__is-new {
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: -0.048rem;
    color: white;
    border-radius: 0.5rem;
    background: #F14848;
    flex-shrink: 0;
    white-space: nowrap;
    padding: 0.6rem 1rem;
}

.story-card__logo-wrapper {
    border-radius: 50%;
    overflow: hidden;
    background: white;
    margin-left: auto;
    flex-shrink: 0;
    // width: 8rem;
    // height: 8rem;

    width: 6.4rem;
    height: 6.4rem;

    @media only screen and (max-width: 640px) {
        width: 6.4rem;
        height: 6.4rem;
    }
}

.story-card__logo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.story-card__bottom-row {
    display: flex;
    align-items: flex-end;
    gap: 1.6rem;
    margin: -2rem;
    margin-top: auto;
    padding: 2rem;
    padding-top: 12rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.70) 0%, rgba(0, 0, 0, 0) 100%);
    min-height: 17rem;
}

.story-card__mute-btn {
    width: 6.4rem;
    height: 6.4rem;
    border-radius: 50%;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    border: none;
    background-color: white;
    outline: none;
    margin-left: auto;
    cursor: pointer;
    pointer-events: all;

    @media only screen and (max-width: 640px) {
        width: 4.4rem;
        height: 4.4rem;
    }

    svg {
        fill: #212121;
        display: block;
        width: 2.4rem;
        height: 2.4rem;

        @media only screen and (max-width: 640px) {
            width: 1.6rem;
            height: 1.6rem;
        }
    }
}

.story-card__desc {

    position: relative;
    z-index: 15;
    // overflow: hidden;
    cursor: pointer;
    pointer-events: all;
    font-size: 2rem;
    font-style: normal;
    font-weight: 400;
    line-height: 2.4rem;
    letter-spacing: -.06rem;

    &::after {
        content: attr(data-text);

        color: #fff;

        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        transition: opacity .2s;
        opacity: 1;
        overflow: hidden;
        opacity: 0;


    }

    &:not(.shown) {
        &::after {
            opacity: 1;

        }
    }

    @media only screen and (max-width: 640px) {
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 2rem;
        letter-spacing: -.032rem;
        font-family: var(--inter-display);
    }
}

.story-card__desc-text {

    transition: transform .4s, color .2s;
    -webkit-user-select: none;
    user-select: none;
    cursor: pointer;
    position: absolute;
    right: 0;
    bottom: 0;
    // transform: translateY(100%);
    width: 100%;

    &:not(.shown) {


        color: transparent;

    }


}


.story-card__bullets {
    gap: 0.5rem;
    display: flex;
    align-items: center;
}

.story-card__bullet {
    height: 0.5rem;
    width: 1px;
    flex-grow: 1;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    position: relative;

    &.prev {
        background-color: white;
    }
}

.story-card__bullet-progress {
    position: absolute;
    left: 0;
    top: 0;
    width: 0%;
    height: 100%;
    background-color: white;
    border-radius: 10px;
}


.story-card__loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
    pointer-events: none;
}

.story-card__loader__circle {
    width: 4.8rem;
    height: 4.8rem;
    border: 0.5rem solid #FFF;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>