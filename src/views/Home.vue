<template>
  <section
    class="h-screen w-screen flex flex-col justify-center items-center bg-gradient-to-r from-green-400 to-green-300"
  >
    <h1 class="text-white text-4xl font-semibold text-center mb-4">Webuno</h1>
    <MatchList />
  </section>
</template>

<script lang="ts">
import MatchList from '../components/Home/MatchList.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home',
  components: {
    MatchList,
  },
});
</script>
