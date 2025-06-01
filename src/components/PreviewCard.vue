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
    border-radius: 5px;

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
    padding: 20px;
}

.preview-card__row {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    justify-content: space-between;
    margin: -20px;
    margin-bottom: 0;
    padding: 20px;
    position: relative;
    z-index: 1;

    &::after {
        content: '';
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0.50) 0%, rgba(0, 0, 0, 0.00) 100%);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 102px;
        z-index: -1;
    }
}

.preview-card__is-new {
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.48px;
    padding: 6px 10px;
    color: white;
    background-color: #F14848;
    flex-shrink: 0;
    border-radius: 5px;

}

.preview-card__logo-wrapper {
    margin-left: auto;
    width: 40px;
    height: 40px;
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
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.8px;
    margin: -20px;
    padding: 20px;
    padding-top: 40px;

    margin-top: auto;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.60) 100%);
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