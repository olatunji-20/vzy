<template>
  <main>
    <div class="first">
      <h1>VZY FRONTEND DEV INTERVIEW</h1>
      <div class="poll-container">
        <Poll />
      </div>
    </div>
  </main>
</template>

<script setup>
import Poll from "@/components/Poll.vue";
</script>

<style scoped>
main {
  text-align: center;
  display: flex;
  justify-content: center;
}
.first {
  margin: 20px auto;
}
.poll-container {
  text-align: left;
  padding: 20px 5px;
  overflow: hidden;
}

@media only screen and (max-width: 480px) {
  main {
    padding: 20px 10px;
  }
}
</style>
