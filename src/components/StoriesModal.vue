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
    grid-gap: 2rem;
    grid-template-rows: minmax(0, 1fr) auto minmax(0, 1fr);
    font-family: "RF Dewi", sans-serif;

}

.stories-slider {
    grid-row: 2 / 3;
    grid-column: 1 / -1;
}

.top-row {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-gap: 2rem;
    grid-row: 1 / 2;
    grid-column: 1 / -1;
    margin-top: 1.6rem;

    @media only screen and (max-width: 576px) {
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        margin-top: 2.4rem;
    }
}

.mw-logo {
    width: 5.4rem;
    height: auto;
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    align-self: flex-start;
    justify-self: flex-start;

    @media only screen and (max-width: 576px) {
        display: none;
    }
}

.title {
    padding: 0;
    margin: 0;
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4rem;
    letter-spacing: -0.08rem;
    grid-column: 3 / 10;
    grid-row: 1 / 2;

    @media only screen and (max-width: 576px) {
        display: none;

    }
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
    font-size: 2rem;
    text-align: left;
    background: transparent;
    color: white;
    border: none;
    outline: none;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4rem;
    letter-spacing: -0.08rem;
    transition: color .2s;
    cursor: pointer;
    transition: color .2s;

    &:hover {
        color: #ffdf58;
    }
}
</style>