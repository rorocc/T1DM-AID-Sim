<template>
<div class="bg-white mt-2 rounded-lg p-4 ContentContainer">
  <slot></slot>
</div>
</template>

<script>
export default {
  name: "ContentContainer"
}
</script>

<style>
 .ContentContainer h1{
   color: var(--blue-primary);
   @apply font-medium;
 }
</style>