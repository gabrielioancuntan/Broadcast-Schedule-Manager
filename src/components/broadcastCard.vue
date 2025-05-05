<template>
<!--  add new card-->
  <div v-if="props.isAdding" class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
    <addBroadcastCard @onSubmit="handleSubmit" @onCancel="handleCancel" />
  </div>

<!--  render or edit card-->
  <div class="row g-4 px-3 broadcast-card-list">
      <div
        v-for="broadcast in props.broadcasts"
        class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
        :class="{ 'is-overlap': broadcast.id === props.overlappingBroadcastId }"
        :key="broadcast.id"
    >

      <addBroadcastCard
          v-if="editCardId === broadcast.id"
          :initial-values="broadcast"
          @onSubmit="saveEdit"
          @onCancel="cancelEdit"
      />

      <div v-else>
        <div class="broadcast-card h-100">
          <div class="broadcast-preview">
            <div v-if="isBroadcastLive(broadcast)" class="live-badge">
              <span class="red-dot"></span> Live
            </div>
            <h3>Time schedule</h3>
<!--            <p>Starts at: {{broadcast.start}}</p>-->
<!--            <p>Ends at: {{broadcast.end}}</p>-->
            <p>Starts at: {{ formatDate(broadcast.start) }}</p>
            <p>Ends at: {{ formatDate(broadcast.end) }}</p>

          </div>
          <div class="broadcast-info">
            <div class="broadcast-channel-message">
              <h6>{{ broadcast.channel }}</h6>
              <h2>{{broadcast.title}}</h2>
            </div>
            <div class="broadcast-edit-delete mt-auto">
              <p @click="editCard( broadcast.id)" class="edit-broadcast"><i class="fa-solid fa-pencil"></i></p>
              <p @click="deleteCard(broadcast.id)" class="delete-broadcast"><i class="fa-solid fa-trash"></i></p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="broadcast.id === props.overlappingBroadcastId" class="error-message">
        This broadcast overlaps with an existing one!
      </div>

    </div>
  </div>

  <teleport to="body">
    <confirmModal
        v-if="showDeleteModal"
        message="Are you sure you want to delete this Broadcast card?"
        @confirmDelete="confirmDelete"
        @cancelDelete="cancelDelete"
    />
  </teleport>

</template>

<script setup lang="ts">
import addBroadcastCard from "@/components/addBroadcastCard.vue";
import confirmModal from "@/components/confirmModal.vue";

import { ref, defineProps, defineEmits } from 'vue'
import { Broadcasts } from "@/broadcasts";

const showDeleteModal = ref(false);
const deleteCardId = ref<string | null>(null);

const props = defineProps({
  broadcasts: {
    type: Array as () => Broadcasts[],
    required: true
  },
  isAdding: {
    type: Boolean,
    default: false
  },
  overlappingBroadcastId: {
    type: String,
    default: null
  },
  editCardId: {
    type: String,
    default: null
  }
})

const emit = defineEmits<{
  onSubmit: [broadcast: Broadcasts],
  onCancel: [],
  onDeleteCard: [id: string]
  onEditCard: [id: string]
  onSaveEdit: [broadcast: Broadcasts],
  onCancelEdit: []
}>();

function deleteCard(id: string) {
  console.log("Showing modal for ID:", id);
  deleteCardId.value = id;
  showDeleteModal.value = true;
}

function confirmDelete() {
  if (deleteCardId.value) {
    emit("onDeleteCard", deleteCardId.value);
    showDeleteModal.value = false;
    deleteCardId.value = null;
  }
}

function cancelDelete() {
  showDeleteModal.value = false;
  deleteCardId.value = null;
}

function saveEdit(broadcast: Broadcasts) {
  emit('onSaveEdit', broadcast)
}

function cancelEdit() {
  emit('onCancelEdit')
}

function editCard(id: string) {
  emit("onEditCard", id);
}

function handleSubmit(broadcast: Broadcasts) {
  emit("onSubmit", broadcast);
}

function handleCancel() {
  emit("onCancel")
}

function isBroadcastLive(broadcast: Broadcasts) {
  const dateNow = new Date();
  const start = new Date(broadcast.start);
  const end = new Date(broadcast.end);
  return dateNow >= start && dateNow <= end
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

</script>

<style>
.broadcast-card {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  height: 100%;
}

.broadcast-preview {
  background-color: #2A265F;
  color: #fff;
  padding: 20px;
  position: relative;
}

.broadcast-preview h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.broadcast-preview p {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.broadcast-info {
  display: flex;
  flex-direction: column;
  padding: 15px;
  flex-grow: 1;
  position: relative;
  min-height: 150px;
}

.broadcast-channel-message h6 {
  opacity: 0.6;
  margin: 0;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-size: 13px;
}

.broadcast-channel-message h2 {
  letter-spacing: 1px;
  margin: 10px 0;
  font-size: 20px;
  color: #2A265F;
}

.broadcast-edit-delete {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Buttons */
.edit-broadcast,
.delete-broadcast {
  background-color: #2A265F;
  border: 0;
  border-radius: 20px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  padding: 8px 17px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}

.delete-broadcast:hover {
  background-color: #f4f4f4;
  transform: scale(1.05);
  color: red;
}

.edit-broadcast:hover {
  background-color: #f4f4f4;
  transform: scale(1.05);
  color: #2A265F;
}

.is-overlap .broadcast-card {
  border: 2px solid red;
  animation: pulseBorder 0.6s ease-in-out;
}

.error-message {
  margin-top: 10px;
  color: red;
  font-weight: 600;
  text-align: center;
}

@keyframes pulseBorder {
  0% {
    border-color: red;
  }
  50% {
    border-color: transparent;
  }
  100% {
    border-color: red;
  }
}

.live-badge {
  position: absolute;
  top: 10px;
  right: 10px; /* 👈 move it to the right */
  background-color: rgba(255, 0, 0, 0.1);
  color: red;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
}

.red-dot {
  width: 8px;
  height: 8px;
  background-color: red;
  border-radius: 50%;
}

</style>
