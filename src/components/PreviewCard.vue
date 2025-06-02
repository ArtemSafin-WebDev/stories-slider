<script lang="ts" setup>
import type { Story } from '../data/stories';

type PreviewCardProps = {
    story: Story;
}

const { story } = defineProps<PreviewCardProps>();
const { preview, desc, logo, isNew } = story;

</script>

<template>
    <div class="preview-card">
        <div class="preview-card__image-container" v-if="preview">
            <img :src="preview" class="preview-card__image" loading="lazy">
        </div>
        <div class="preview-card__content">
            <div class="preview-card__row">
                <div class="preview-card__is-new" v-if="isNew">
                    New
                </div>
                <div class="preview-card__logo-wrapper" v-if="logo">
                    <img :src="logo" class="preview-card__logo">
                </div>
            </div>
            <div class="preview-card__desc" v-if="desc">
                <div class="preview-card__desc-text" v-html="desc">
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.preview-card {
    aspect-ratio: 297 / 531;
    position: relative;
    z-index: 1;
    cursor: pointer;
    overflow: clip;
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: 'stack';
    border-radius: 0.5rem;

    @media (hover: hover) and (pointer: fine) {
        &:hover {
            .preview-card__image-container::after {
                opacity: 1;
            }
        }
    }
}

.preview-card__image-container {

    overflow: hidden;
    grid-area: stack;
    position: relative;

    &::after {
        content: '';
        background-color: #00000059;
        position: absolute;
        inset: 0;
        transition: opacity .2s;
        opacity: 0;
    }


}

.preview-card__image {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.preview-card__content {
    grid-area: stack;
    display: flex;
    flex-direction: column;
    z-index: 5;
    padding: 2rem;

    @media only screen and (max-width: 640px) {
        padding: 1rem;
    }
}

.preview-card__row {
    display: flex;
    align-items: flex-start;
    gap: 1.6rem;
    justify-content: space-between;
    margin: -2rem;
    margin-bottom: 0;
    padding: 2rem;
    position: relative;
    z-index: 1;

    &::after {
        content: '';
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 10.2rem;
        z-index: -1;
    }
}

.preview-card__is-new {
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2rem;
    letter-spacing: -0.048rem;
    padding: 0.6rem 1rem;
    color: white;
    background-color: #F14848;
    flex-shrink: 0;
    border-radius: 0.5rem;

    @media only screen and (max-width: 640px) {
        font-size: 1.2rem;
        font-style: normal;
        font-weight: 600;
        line-height: 1.6rem;
        letter-spacing: -.036rem;
        padding: .4rem .8rem;
        border-radius: .5rem;
    }

}

.preview-card__logo-wrapper {
    margin-left: auto;
    width: 4rem;
    height: 4rem;
    flex-shrink: 0;
    overflow: hidden;
    border-radius: 50%;


}

.preview-card__logo {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.preview-card__desc {
    font-size: 2rem;
    font-style: normal;
    font-weight: 600;
    line-height: 2.4rem;
    letter-spacing: -0.08rem;
    margin: -2rem;
    padding: 2rem;
    padding-top: 4rem;
    margin-top: auto;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%);

    @media only screen and (max-width: 640px) {
        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 2rem;
        letter-spacing: -.032rem;
        font-family: var(--inter-display);
    }
}

.preview-card__desc-text {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>