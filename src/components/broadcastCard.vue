<template>
<!--  <div-->
<!--      v-if="editCardId === broadcast.id"-->
<!--      class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"-->
<!--  >-->
<!--    <addBroadcastCard-->
<!--        :initial-values="broadcast"-->
<!--        @onSubmit="saveEdit"-->
<!--        @onCancel="cancelEdit"-->
<!--    />-->
<!--  </div>-->

  <div v-if="props.isAdding" class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3">
    <addBroadcastCard @onSubmit="handleSubmit" @onCancel="handleCancel" />
  </div>

  <div class="row g-4 px-3 broadcast-card-list">
    <div
        class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
        :class="{ 'is-overlap': broadcast.id === props.overlappingBroadcastId }"
        v-for="broadcast in props.broadcasts"
        :key="broadcast.id"
    >

      <!-- Show editable form if this card is being edited -->
      <addBroadcastCard
          v-if="editCardId === broadcast.id"
          :initial-values="broadcast"
          @onSubmit="saveEdit"
          @onCancel="cancelEdit"
      />

<div v-else>
  <div class="broadcast-card h-100">
    <div class="broadcast-preview">
      <h3>Time schedule</h3>
      <p>Starts at: {{broadcast.start}}</p>
      <p>Ends at: {{broadcast.end}}</p>
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

</template>

<script setup lang="ts">
import addBroadcastCard from "@/components/addBroadcastCard.vue";
import {defineProps, defineEmits} from 'vue'
import {Broadcasts} from "@/broadcasts";

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

function saveEdit(broadcast: Broadcasts) {
  emit('onSaveEdit', broadcast)
}

function cancelEdit() {
  emit('onCancelEdit')
}

function deleteCard(id: string) {
  console.log(id, 'id of the deleted card')
  emit("onDeleteCard", id);
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


</script>

<style scoped>
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

</style>
