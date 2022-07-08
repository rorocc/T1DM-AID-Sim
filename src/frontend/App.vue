<template>
  <div class="container mx-auto p-4">
    <Tabs></Tabs>
  </div>
  <BottomBar></BottomBar>
</template>

<script>
import BottomBar from './components/BottomBar.vue';
import Tabs from './components/TabsBar.vue';

export default {
  components: {BottomBar, Tabs}
}

</script>