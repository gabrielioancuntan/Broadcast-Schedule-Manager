<template>
  <form
      class="broadcast-card h-100"
      @submit.prevent="broadcastSubmitted"
  >
    <div class="broadcast-preview">
      <h3>New Broadcast</h3>
      <input
          v-model="newBroadcast.start"
          type="datetime-local"
          class="form-control my-2"
          required
      />
      <input
          v-model="newBroadcast.end"
          type="datetime-local"
          class="form-control my-2"
          required
      />
    </div>
    <div class="broadcast-info">
      <input
          v-model="newBroadcast.channel"
          placeholder="Channel"
          class="form-control mb-2"
          required
      />
      <input
          v-model="newBroadcast.title"
          placeholder="Title"
          class="form-control mb-2"
          required
      />

      <div class="broadcast-edit-delete mt-auto">
        <button type="submit" class="edit-broadcast">
          <i class="fa-solid fa-check"></i>
        </button>
        <button type="button" @click="emit('onCancel')" class="delete-broadcast">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import {ref, defineEmits} from "vue";
import type { Broadcasts } from "@/broadcasts";

const emit = defineEmits<{
  onSubmit: [broadcast: Broadcasts],
  onCancel: []
}>();

const newBroadcast = ref({
  id: "",
  title: "",
  channel: "",
  start: "",
  end: "",
});

function broadcastSubmitted() {
  console.log(newBroadcast.value);
  const id = Date.now().toString(); //generate uniq ID

  emit('onSubmit', {...newBroadcast.value, id});
}

</script>

<style scoped>

</style>