<script setup lang="ts">
import type { Story } from '../data/stories';
import { Swiper as SwiperInstance } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import StoryCard from './StoryCard.vue';
// @ts-ignore
import "swiper/css";
import { computed, ref, watch } from 'vue';
import { useStoriesStore } from '../store/stories';

interface StoriesSliderProps {
    stories?: Story[]
}

const swiperInstance = ref<SwiperInstance>();
const activeSlideIndex = ref(0);
const storiesStore = useStoriesStore();
const { stories = [] } = defineProps<StoriesSliderProps>();

const activeStoryIndex = computed(() => {
    return stories.findIndex((story) => story.id === storiesStore.activeStory?.id);
})

watch([swiperInstance, activeStoryIndex], ([newInstance, newActiveStoryIndex]) => {
    if (!newInstance) return;
    if (newActiveStoryIndex === -1) return;
    console.log('Watching active story index', activeStoryIndex.value);
    newInstance.slideTo(activeStoryIndex.value, 0);
})


function handleInit(swiper: SwiperInstance) {
    swiperInstance.value = swiper;
    activeSlideIndex.value = swiper.activeIndex;
}

function handleSlideChange(swiper: SwiperInstance) {
    activeSlideIndex.value = swiper.activeIndex;
}

function handleReachStart() {
    console.log('Reach start');

    // Go to previous story if available
    if (activeStoryIndex.value > 0) {
        swiperInstance.value?.slideTo(activeStoryIndex.value - 1);
    } else {
        // Go to last story
        swiperInstance.value?.slideTo(stories.length - 1);
    }
}

function handleReachEnd() {
    console.log('Reach end');
    // Go to next story if available
    if (activeStoryIndex.value < stories.length - 1) {
        swiperInstance.value?.slideTo(activeStoryIndex.value + 1);
    } else {
        // Go to first story
        swiperInstance.value?.slideTo(0);
    }
}

watch(activeSlideIndex, (newActiveSlideIndex, oldActiveSlideIndex) => {
    if (newActiveSlideIndex === oldActiveSlideIndex) return;
    console.log('Active slide index', newActiveSlideIndex);
    storiesStore.setActiveStory(stories[newActiveSlideIndex]);
})

</script>

<template>
    <div class="stories-slider">
        <swiper slides-per-view="auto" :space-between="20" :long-swipes-ratio="0.2" :speed="600"
            class="stories-slider-container" :centered-slides="true" :centered-slides-bounds="false"
            @swiper="handleInit" @slideChange="handleSlideChange">
            <swiper-slide v-for="story in stories" :key="story.id" class="stories-slide">
                <StoryCard :story="story" @reach-start="handleReachStart" @reach-end="handleReachEnd" />
            </swiper-slide>
        </swiper>
    </div>
</template>

<style scoped lang="scss">
.stories-slider {
    display: block;
}

.stories-slider-container {
    overflow: visible;
}

.stories-slide {
    width: max-content;
    box-sizing: border-box;
    height: auto;
    display: flex;
    flex-direction: column;
}
</style>