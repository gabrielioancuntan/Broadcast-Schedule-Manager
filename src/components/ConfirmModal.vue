<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <p class="modal-text">{{ message }}</p>
      <div class="modal-actions">
        <button @click="emit('confirmDelete')" class="btn confirm">Yes</button>
        <button @click="emit('cancelDelete')" class="btn renounce">No</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
defineProps<{ message: string }>();
const emit = defineEmits(['confirmDelete', 'cancelDelete']);
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  background: white;
  padding: 20px 30px;
  width: 90%;
  max-width: 320px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
  z-index: 10000;
}

.modal-text {
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.btn {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
}

.btn.confirm {
  background-color: red;
  color: white;
}

.btn.renounce {
  background-color: #ccc;
}
</style>
