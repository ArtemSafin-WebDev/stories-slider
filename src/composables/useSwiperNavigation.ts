import { Swiper as SwiperInstance } from "swiper";
import { ref } from "vue";

export function useSwiperNavigation() {
  const prevDisabled = ref(false);
  const nextDisabled = ref(false);
  const swiperInstance = ref<SwiperInstance | null>(null);

  const handlePrev = () => {
    swiperInstance.value?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance.value?.slideNext();
  };

  const checkBtns = (instance: SwiperInstance) => {
    if (instance.isBeginning && !instance.params.rewind) {
      nextDisabled.value = true;
    } else {
      nextDisabled.value = false;
    }
    if (instance.isEnd && !instance.params.rewind) {
      prevDisabled.value = true;
    } else {
      prevDisabled.value = false;
    }
  };

  const handleInit = (instance: SwiperInstance) => {
    swiperInstance.value = instance;
    checkBtns(instance);
  };

  return {
    prevDisabled,
    nextDisabled,
    handlePrev,
    handleNext,
    handleInit,
    checkBtns,
  };
}
