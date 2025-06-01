<script setup lang="ts">
import { type Story } from '../data/stories';
import PreviewCard from './PreviewCard.vue';
import StoriesModal from './StoriesModal.vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, watchEffect } from 'vue';
import { useUiStore } from '../store/ui';
import { useStoriesStore } from '../store/stories';
import { useSwiperNavigation } from '../composables/useSwiperNavigation';
import { useQuery } from '@tanstack/vue-query';
import { findAll } from '../api/stories/findAll';
import Skeleton from './Skeleton.vue'
// @ts-ignore
import "swiper/css";

const uiStore = useUiStore();
const storiesStore = useStoriesStore();
const { prevDisabled, nextDisabled, handlePrev, handleNext, handleInit, checkBtns } = useSwiperNavigation();


const { data: stories, isLoading, isError } = useQuery({
    queryKey: ['stories'],
    queryFn: findAll,
    select: (data) => {
        const stories: Story[] = data.map(story => {
            return {
                id: story.id,
                preview: story.acf.stories_image.sizes.full,
                desc: story.acf.stories_text,
                logo: story.acf.stories_logo.sizes.full,
                isNew: story.acf.stories_new,
                slides: story.acf.stories_inner.map(slide => {
                    return {
                        id: slide.stories_inner_image.id,
                        image: slide.stories_inner_image.sizes.full,
                        duration: slide.stories_inner_duration ? Number(slide.stories_inner_duration) : undefined,
                        video: slide.stories_inner_file ? slide.stories_inner_file.url : undefined,
                    }
                })
            }
        })
        return stories;
    }
})

watchEffect(() => {
    console.log('Data', stories.value);
})

const newStories = computed(() => {
    return stories.value?.filter((story) => story.isNew).length;
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
                    <div class="total" v-if="newStories && newStories > 0">
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
                <div class="loading" v-if="isLoading">
                    <div class="slide" v-for="_n in 10" :key="_n">
                        <Skeleton />
                    </div>
                </div>
                <div class="error" v-if="isError">
                    Ошибка загрузки
                </div>
                <div class="slider" v-if="stories && stories.length > 0">
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

.loading {
    display: flex;
    gap: 20px;
}

.loading,
.error {
    font-family: "RF Dewi", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.6px;
}

.slider-container {
    overflow: visible;
}

.container {
    max-width: 1240px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 0 20px;
    box-sizing: border-box;
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
    margin-left: auto;
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
    flex-shrink: 0;
}
</style>