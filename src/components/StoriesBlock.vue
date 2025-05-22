<script setup lang="ts">
import stories, { type Story } from '../data/stories';
import PreviewCard from './PreviewCard.vue';
import StoriesModal from './StoriesModal.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed } from 'vue';
import { useUiStore } from '../store/ui';
import { useStoriesStore } from '../store/stories';
import { useSwiperNavigation } from '../composables/useSwiperNavigation';
// @ts-ignore
import "swiper/css";

const uiStore = useUiStore();
const storiesStore = useStoriesStore();
const { prevDisabled, nextDisabled, handlePrev, handleNext, handleInit, checkBtns } = useSwiperNavigation();


const newStories = computed(() => {
    return stories.filter((story) => story.isNew).length;
})

const handleCardClick = (story: Story) => {
    uiStore.openModal();
    storiesStore.setActiveStory(story);
}

</script>

<template>
    <section class="section">
        <div class="container">
            <div class="section-content">
                <h2 class="heading">
                    Истории
                </h2>
                <div class="controls">
                    <div class="total" v-if="newStories > 0">
                        Новых историй - {{ newStories }}
                    </div>
                    <div class="nav-btns">
                        <button class="nav-btn" @click="handlePrev" :disabled="nextDisabled">
                            Назад
                        </button>
                        <button class="nav-btn" @click="handleNext" :disabled="prevDisabled">
                            Вперед
                        </button>
                    </div>
                </div>
                <div class="slider">
                    <swiper slides-per-view="auto" :space-between="20" :long-swipes-ratio="0.2" :speed="600"
                        class="slider-container" @swiper="handleInit" @to-edge="checkBtns" @from-edge="checkBtns">
                        <swiper-slide v-for="story in stories" :key="story.id" class="slide">
                            <PreviewCard :story="story" class="slide-card" @click.prevent="handleCardClick(story)" />
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </div>
    </section>
    <StoriesModal :stories="stories" />
</template>

<style scoped lang="scss">
.section {
    padding-top: 100px;
    padding-bottom: 20px;
    background-color: #212121;
    color: white;
    font-family: "RF Dewi", sans-serif;
    overflow: hidden;
    overflow: clip;
}

.section-content {
    zoom: 0.8;
}

.slider-container {
    overflow: visible;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.heading {
    font-size: 80px;
    font-style: normal;
    font-weight: 400;
    line-height: 100%;
    letter-spacing: -3.2px;
    padding: 0;
    margin: 0;
    margin-bottom: 120px;
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin-bottom: 30px;
}

.total {
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.8px;
}

.nav-btns {
    display: flex;
    align-items: center;
    gap: 20px;
}

.nav-btn {
    font-family: "RF Dewi", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.6px;
    outline: none;
    border: none;
    background-color: transparent;
    color: white;
    text-align: left;
    cursor: pointer;
    transition: opacity 0.2s, color .2s;

    &[disabled] {
        opacity: 0.5;
        cursor: default;
    }

    &:not([disabled]):hover {
        color: #ffdf58;
    }
}

.slide {
    width: 300px;
}
</style>