<template>
<div class="tab-container grid grid-cols-3 bg-white">
  <div class="tab-btn active">Kurven</div>
  <div class="tab-btn">Statistik</div>
  <div class="tab-btn">Modell</div>
</div>
  <Tab></Tab>
  <Tab></Tab>
  <Tab></Tab>
</template>

<script>
import Tab from './Tab.vue';

export default {
  name: "Tabs.vue",
  components: {Tab}
}
</script>

<style scoped>
.tab-container, .tab-btn{
  border-radius: 22px;
}

.tab-btn{
  @apply text-center px-6 py-2;
}

.active{
  background-color: var(--blue-primary);
  color: var(--blue-light);
}

</style>