<script setup lang="ts">

import Dialog from './Dialog.vue';
import { useUiStore } from '../store/ui';
import StoriesSlider from './StoriesSlider.vue';
import type { Story } from '../data/stories';


interface StoriesModalProps {
    stories?: Story[]
}

const { stories = [] } = defineProps<StoriesModalProps>();

const uiStore = useUiStore();

</script>

<template>
    <Dialog v-model:open="uiStore.isModalOpen">
        <div class="stories-modal">
            <div class="top-row">
                <img src="https://markweber.ru/wp-content/themes/mw/static/dist/images/mw-logo-white.svg" alt="Логотип"
                    class="mw-logo">
                <h3 class="title">
                    Истории
                </h3>
                <button class="close" type="button" @click.prevent="uiStore.closeModal">
                    Закрыть
                </button>
            </div>
            <div class="stories-slider">
                <StoriesSlider :stories="stories" />
            </div>
        </div>
    </Dialog>
</template>

<style scoped lang="scss">
.stories-modal {
    flex-grow: 1;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-gap: 20px;
    grid-template-rows: 1fr auto 1fr;
    font-family: "RF Dewi", sans-serif;
    zoom: 0.8;
}

.stories-slider {
    grid-row: 2 / 3;
    grid-column: 1 / -1;
}

.top-row {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-gap: 20px;
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    margin-top: 16px;
}

.mw-logo {
    width: 54px;
    height: auto;
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    align-self: flex-start;
    justify-self: flex-start;
}

.title {
    padding: 0;
    margin: 0;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.8px;
    grid-column: 3 / 10;
    grid-row: 1 / 2;
}

.close {
    margin: 0;
    padding: 0;
    font: inherit;
    grid-row: 1 / 2;
    align-self: flex-start;
    justify-self: flex-end;
    grid-column: 11 / -1;
    justify-self: flex-end;
    font-size: 20px;
    text-align: left;
    background: transparent;
    color: white;
    border: none;
    outline: none;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.8px;
    transition: color .2s;
    cursor: pointer;
    transition: color .2s;

    &:hover {
        color: #ffdf58;
    }
}
</style>