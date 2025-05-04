<template>
  <div class="broadcast-card h-100">
    <form
        @submit.prevent="broadcastSubmitted"
    >
      <div class="broadcast-preview">
        <h3>{{ newBroadcast.id ? 'Edit Broadcast' : 'New Broadcast' }}</h3>
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
  </div>

</template>

<script setup lang="ts">
import {ref, defineEmits, defineProps, watch } from "vue";
import type { Broadcasts } from "@/broadcasts";

const props = defineProps<{
  initialValues?: Broadcasts;
}>();

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
  const id = newBroadcast.value.id || Date.now().toString();

  emit('onSubmit', {...newBroadcast.value, id});
}

function toDateTimeLocal(value: string): string {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
}

watch(() => props.initialValues, (val) => {
      if (val) {
        newBroadcast.value = {
          ...val,
          start: toDateTimeLocal(val.start),
          end: toDateTimeLocal(val.end)
        };
      }
    },
    { immediate: true }
);

</script>

<style>


</style>