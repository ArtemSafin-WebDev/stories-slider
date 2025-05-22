import { ref } from "vue";
import { defineStore } from "pinia";

export const useUiStore = defineStore("ui", () => {
  const isModalOpen = ref(false);
  const muted = ref(false);
  const openModal = () => {
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
  };

  const toggleMuted = () => {
    muted.value = !muted.value;
  };

  return { isModalOpen, openModal, closeModal, muted, toggleMuted };
});
