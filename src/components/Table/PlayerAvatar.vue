<template>
  <div class="flex flex-col items-center transform" :class="classObject">
    <Avatar :label="nameFirstLetter" size="large" class="text-white" :class="avatarClassObject" />
    <span class="mt-2 text-white">{{ playerName }}</span>
  </div>
</template>

<script>
import { computed, defineComponent, toRefs } from 'vue';
export default defineComponent({
  name: 'PlayerAvatar',
  props: {
    playerName: {
      type: String,
      required: true,
    },
    rotate: {
      type: String,
      default: 'rotate-0',
    },
    active: Boolean,
  },
  setup(props) {
    const { playerName, rotate, active } = toRefs(props);

    const nameFirstLetter = computed(() => {
      return playerName?.value?.charAt(0).toUpperCase() || '';
    });
    const avatarClassObject = computed(() => {
      return { 'border border-4 border-yellow-400 animate-pulse ': active.value };
    });
    const classObject = computed(() => {
      return {
        [rotate.value]: true,
      };
    });
    return { nameFirstLetter, classObject, avatarClassObject };
  },
});
</script>
