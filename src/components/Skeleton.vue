<script setup lang="ts">

</script>

<template>
    <div class="skeleton">

    </div>
</template>

<style scoped lang="scss">
.skeleton {
    width: 100%;
    background-color: #191919;
    aspect-ratio: 297 / 531;
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: translateX(-100%);
        background-image: linear-gradient(90deg,
                rgba(255, 255, 255, 0) 0,
                rgba(255, 255, 255, 0.05) 20%,
                rgba(255, 255, 255, 0.1) 60%,
                rgba(255, 255, 255, 0));
        animation: shimmer 2s infinite;
    }
}

@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}
</style>