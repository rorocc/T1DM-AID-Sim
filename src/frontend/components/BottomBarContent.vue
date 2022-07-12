<template>
<div class="BottomBarContent">
  <div class="container p-4">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: "BottomBarContent"
}
</script>

<style>
 .BottomBarContent{
   box-shadow: 0px 1px 20px rgba(0, 0, 0, 0.25);
   border-radius: 22px 22px 0 0;
   @apply w-full h-full bg-white overflow-scroll;
 }
</style>