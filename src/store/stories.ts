import { ref } from "vue";
import { defineStore } from "pinia";
import type { Story } from "../data/stories";

export const useStoriesStore = defineStore("stories", () => {
  const activeStory = ref<Story>();
  function setActiveStory(story: Story) {
    activeStory.value = story;
  }

  return { activeStory, setActiveStory };
});
