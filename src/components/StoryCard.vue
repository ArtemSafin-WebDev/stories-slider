<script lang="ts" setup>
import type { Story } from '../data/stories';
import { useUiStore } from '../store/ui';
import SoundIcon from './icons/SoundIcon.vue';
import NoSoundIcon from './icons/NoSoundIcon.vue';
import { computed, ref, useTemplateRef, watchEffect, watch } from 'vue';
import { useStoriesStore } from '../store/stories';

interface StoriesCardProps {
    story: Story
}
const { story } = defineProps<StoriesCardProps>();

const uiStore = useUiStore();
const storiesStore = useStoriesStore();


const isActiveStory = computed(() => {
    return storiesStore.activeStory?.id === story.id;
})

const { isNew, logo, desc, slides, preview } = story;

const cardHasVideo = computed(() => {
    return slides?.some((slide) => slide.video);
});


const video = useTemplateRef<HTMLVideoElement>('video')
const videoDuration = ref(0)
const isVideoReady = ref(false)
const paused = ref(false)
const activeIndex = ref(0)
const holdTimeout = ref<number | null>(null)
const wasHoldTriggered = ref(false)
const HOLD_DURATION = 500 // 500ms hold duration
const DEFAULT_SLIDE_DURATION = 5 // 5 seconds

const showSlides = computed(() => {
    return slides?.length && isActiveStory.value && uiStore.isModalOpen
})

const handlePrev = () => {
    if (wasHoldTriggered.value) {
        wasHoldTriggered.value = false
        return
    }
    if (activeIndex.value > 0) {
        activeIndex.value--
    }
}

const handleNext = () => {
    if (wasHoldTriggered.value) {
        wasHoldTriggered.value = false
        return
    }
    if (slides && activeIndex.value < slides.length - 1) {
        activeIndex.value++
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

const activeSlide = computed(() => {
    return slides?.[activeIndex.value]
})

const resetStates = () => {
    videoDuration.value = 0
    isVideoReady.value = false
    paused.value = false
    activeIndex.value = 0
    if (holdTimeout.value) {
        clearTimeout(holdTimeout.value)
        holdTimeout.value = null
    }
    wasHoldTriggered.value = false
}

watch(isActiveStory, (newValue) => {
    if (!newValue) {
        resetStates()
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

watch(activeSlide, () => {
    isVideoReady.value = false
})

</script>

<template>
    <div class="story-card">
        <div class="story-card__bullets" v-if="slides?.length && isActiveStory">
            <div class="story-card__bullet" v-for="(slide, index) in slides" :key="slide.id" :class="{
                prev: index < activeIndex,
                next: index > activeIndex,
                active: index === activeIndex
            }">
                <div class="story-card__bullet-progress"></div>
            </div>
        </div>
        <div class="story-card__grid" @pointerdown="handlePointerDown" @pointerup="handlePointerUp"
            @pointerleave="handlePointerUp" @pointercancel="handlePointerUp">
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
                    <div class="loader" v-if="currentSlideHasVideo && !isVideoReady">
                        <div class="loader__circle"></div>
                    </div>
                </div>
            </div>
            <div class="story__controls-layer" v-if="showSlides">
                <div class="story__controls-layer-prev" @click="handlePrev"></div>
                <div class="story__controls-layer-next" @click="handleNext"></div>
            </div>
            <div class="story-card__content">
                <div class="story-card__top-row">
                    <div class="story-card__is-new" v-if="isNew">
                        New
                    </div>
                    <div class="story-card__logo-wrapper" v-if="logo">
                        <img class="story-card__logo" :src="logo" alt="Logo">
                    </div>
                </div>
                <div class="story-card__bottom-row">
                    <div class="story-card__desc" v-if="desc">
                        <div class="story-card__desc-text" v-html="desc">

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
    gap: 10px;
    flex-grow: 1;
    width: 475px;
    zoom: 0.7;
}

.story-card__grid {
    margin-top: auto;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'stack';
    border-radius: 5px;
    overflow: hidden;

    &::before {
        content: '';
        grid-area: stack;
        aspect-ratio: 475 / 800;
    }
}

.story-card__slides {
    grid-area: stack;
    // background-color: red;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'stack';
    background-color: black;

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
    padding: 20px;
    z-index: 10;
    pointer-events: none;
}

.story-card__top-row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    margin: -20px;
    margin-bottom: 0;
    padding: 20px;
    padding-bottom: 0;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%);
}

.story-card__is-new {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.48px;
    color: white;
    border-radius: 5px;
    background: #F14848;
    flex-shrink: 0;
    white-space: nowrap;
    padding: 6px 10px;
}

.story-card__logo-wrapper {
    border-radius: 50%;
    overflow: hidden;
    background: white;
    margin-left: auto;
    flex-shrink: 0;
    width: 80px;
    height: 80px;
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
    gap: 16px;
    margin: -20px;
    margin-top: auto;
    padding: 20px;
    padding-top: 40px;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0) 100%);
}

.story-card__mute-btn {
    width: 64px;
    height: 64px;
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

    svg {
        fill: #212121;
        display: block;
        width: 24px;
        height: 24px;
    }
}

.story-card__desc {
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.6px;
}

.story-card__desc-text {



    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}


.story-card__bullets {
    gap: 5px;
    display: flex;
    align-items: center;
}

.story-card__bullet {
    height: 5px;
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


.loader {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    pointer-events: none;
}

.loader__circle {
    width: 48px;
    height: 48px;
    border: 5px solid #FFF;
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