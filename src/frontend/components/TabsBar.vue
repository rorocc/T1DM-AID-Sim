<template>
<div class="tab-container grid grid-cols-3 bg-white">
  <div @click="toggleTab('tabCurves')" ref="tabCurves" class="tab-btn active">Kurven</div>
  <div @click="toggleTab('tabStatistics')" ref="tabStatistics" class="tab-btn">Statistik</div>
  <div @click="toggleTab('tabModel')" ref="tabModel" class="tab-btn">Modell</div>
</div>
  <TabCurves v-if="this.activeTab === 'tabCurves'"></TabCurves>
  <TabStatistics v-if="this.activeTab === 'tabStatistics'"></TabStatistics>
  <TabModel v-if="this.activeTab === 'tabModel'"></TabModel>
</template>

<script>
import Tab from './Tab.vue';
import TabCurves from "./TabCurves.vue";
import TabStatistics from "./TabStatistics.vue";
import TabModel from "./TabModel.vue";

export default {
  name: "Tabs.vue",
  components: {Tab, TabCurves, TabStatistics, TabModel},
  data(){
    return{
      activeTab: 'tabCurves'
    }
  },
  methods:{
    toggleTab(tabRef){
      this.activeTab = tabRef;
      this.$refs['tabCurves'].classList.remove('active');
      this.$refs['tabStatistics'].classList.remove('active');
      this.$refs['tabModel'].classList.remove('active');
      this.$refs[tabRef].classList.add('active');
    }
  }
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