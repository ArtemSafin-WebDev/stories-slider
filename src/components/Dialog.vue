<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useTemplateRef, watchEffect } from 'vue';

const modal = useTemplateRef<HTMLDialogElement>('dialog')
const innerModal = useTemplateRef<HTMLElement>('dialogContent')
const isOpen = defineModel<boolean>('open')


watchEffect(() => {
    if (!modal.value) return;
    if (isOpen.value) {
        modal.value.showModal();
        document.body.classList.add("lock-scroll");
    } else {
        modal.value.close();
        document.body.classList.remove("lock-scroll");
    }
})

onClickOutside(innerModal, () => {
    isOpen.value = false;
})
</script>

<template>
    <dialog class="dialog" v-on:cancel="isOpen = false" ref="dialog">
        <div class="container">
            <div class="dialogContent" ref="dialogContent">
                <slot></slot>
            </div>
        </div>
    </dialog>
</template>

<style scoped lang="scss">
.dialog {
    border: none;
    max-width: none;
    max-height: none;
    overscroll-behavior-y: contain;
    overflow-x: hidden;
    transition: 500ms opacity, 500ms display allow-discrete,
        500ms overlay allow-discrete;
    opacity: 0;
    inset: 0;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    padding: 0;
    background-color: transparent;
    background-color: #212121;
    color: #fff;

    &::backdrop {
        background-color: #212121;
        transition: 500ms opacity, 500ms display allow-discrete,
            500ms overlay allow-discrete;
        opacity: 0;
    }

    &[open] {
        opacity: 1;
        display: flex;
        flex-direction: column;

        &::backdrop {
            opacity: 1;
        }
    }
}


@starting-style {
    .dialog {
        &[open] {
            opacity: 0;

            &::backdrop {
                opacity: 0;
            }
        }
    }
}

.dialogContent {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1;

}
</style>