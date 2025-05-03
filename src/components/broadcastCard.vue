<template>
  <div class="row g-4 px-3 broadcast-card-list">
    <div
        class="col-12 col-sm-6 col-md-4 col-lg-4 col-xl-3"
        v-for="i in 6"
        :key="i"
    >
      <div class="broadcast-card h-100">
        <div class="broadcast-preview">
          <h3>Time schedule</h3>
          <p>Starts at: 2025-05-02T08:00:00</p>
          <p>Ends at: 2025-05-02T09:00:00</p>
        </div>
        <div class="broadcast-info">
          <div class="broadcast-channel-message">
            <h6>Channel {{ i }}</h6>
            <h2>Morning News</h2>
          </div>
          <div class="broadcast-edit-delete mt-auto">
            <p class="edit-broadcast"><i class="fa-solid fa-pencil"></i></p>
            <p class="delete-broadcast"><i class="fa-solid fa-trash"></i></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">


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
</style>
