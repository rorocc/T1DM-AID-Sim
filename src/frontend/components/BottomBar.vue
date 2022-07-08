<template>
  <div class="tab-container absolute bottom-0 w-full bg-white">
    <div class="grid grid-cols-3">
      <div class="tab-btn">Szenarien</div>
      <div class="tab-btn">Vergleichen</div>
      <div class="tab-btn active">Simulieren</div>
    </div>
  </div>

</template>

<style>

.tab-container{
  filter: drop-shadow(0px 23px 45px rgba(0, 0, 0, 0.25));
}

.tab-btn{
  border-right: 1px solid #aaaaaa;
  color: var(--blue-primary);
  @apply px-6 py-4 text-center;
}

.tab-btn + .active{
  color: var(--blue-light);
  border-right: none;
  background-color: var(--blue-primary);
}

</style>