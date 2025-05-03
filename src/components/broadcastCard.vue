<template>
  <div class="broadcast-card-list">
    <div class="broadcast-card" v-for="i in 6" :key="i">
      <div class="broadcast-card-data">
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
          <div class="broadcast-edit-delete">
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
.broadcast-card-data {
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  margin: 20px;
  overflow: hidden;
}

.broadcast-preview {
  background-color: #2A265F;
  color: #fff;
  padding: 20px;
}

.broadcast-preview h6,
.broadcast-preview p {
  margin: 0 0 10px 0;
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
}

.broadcast-channel-message h2 {
  letter-spacing: 1px;
  margin: 10px 0;
}

.broadcast-edit-delete {
  margin-top: auto;
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

/* Grid for the cards */
.broadcast-card-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));  /* Default for mobile */
  gap: 10px;
}

/* Tablet: 2 cards per row */
@media (min-width: 600px) {
  .broadcast-card-list {
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  }
}

/* Desktop: 3 cards per row */
@media (min-width: 900px) {
  .broadcast-card-list {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

/* Large desktop or wider screens: 4+ cards per row */
@media (min-width: 1200px) {
  .broadcast-card-list {
    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  }
}

/* Extra large screens: 5+ cards per row */
@media (min-width: 1600px) {
  .broadcast-card-list {
    grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  }
}
</style>
