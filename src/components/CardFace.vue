<template>
  <div
    class="
      w-full
      h-full
      border-4
      rounded-[50%]
      transform
      rotate-18
      flex
      items-center
      justify-center
      text-white
      font-bold
    "
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'CardFace',
};
</script>
