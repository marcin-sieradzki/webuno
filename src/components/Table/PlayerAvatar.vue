<template>
  <Avatar :label="nameFirstLetter" size="large" class="text-white transform" :class="classObject" />
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

    const classObject = computed(() => {
      return {
        [rotate.value]: true,
        'border border-4 border-yellow-400 animate-pulse ': active.value,
      };
    });
    return { nameFirstLetter, classObject };
  },
});
</script>
