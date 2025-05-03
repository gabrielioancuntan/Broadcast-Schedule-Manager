<template>
  <div class="broadcast-cards">
    <h1>Broadcast Schedule Manager</h1>

    <BroadcastToolbar />
    <BroadcastCard />
  </div>
</template>

<script setup lang="ts">
import BroadcastCard from "@/components/broadcastCard.vue";
import BroadcastToolbar from "@/components/broadcastToolbar.vue";


</script>

<style>
.broadcast-cards {
  padding: 20px;
}

.broadcast-cards h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #2A265F;
  font-size: 24px;
}

</style>
