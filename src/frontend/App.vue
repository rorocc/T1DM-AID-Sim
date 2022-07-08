<template>
  <Tabs></Tabs>
  <div id="container">
    <p class="text-blue-300">Tailwind einbinden ist eine tolle Sache, die meistens nicht funktioniert</p>
    <h1>einer</h1>
    <h2>zweier</h2>
    <h3>dreier</h3>
  </div>
  <BottomBar></BottomBar>
</template>

<script>
import BottomBar from './components/BottomBar.vue';
import Tabs from './components/Tabs.vue';

export default {
  components: {BottomBar, Tabs}
}

</script>