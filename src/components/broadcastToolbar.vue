<template>
  <div class="container-fluid">
    <div class="row gy-3 gx-3 align-items-start add-broadcast">
      <div class="col-12 col-md-6 col-lg-auto">
        <button @click="addNewBroadcast" class="custom-btn w-100 w-md-100 w-lg-auto">Add Broadcast Card</button>
      </div>

      <div class="col-12 col-md-6 col-lg-auto">
        <div class="sort-bar d-flex align-items-center gap-2 w-100">
        <label for="sort" class="sort-label">Sort by time:</label>
          <select v-model="filter" @change="onFilterChange" id="sort" class="sort-select">
            <option value="time-asc">🕒 Time ↑</option>
            <option value="time-desc">🕒 Time ↓</option>
          </select>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-auto">
        <div class="filter-bar d-flex align-items-center gap-2 w-100">
        <label for="type" class="sort-label">Type:</label>
          <select @change="filterByChannel" id="type" class="sort-select">
            <option value="all">All</option>
            <option value="news">Channel</option>
          </select>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-auto ms-lg-auto">
        <div class="search-bar w-100">
          <input
              class="search-input"
              v-model="search"
              @input="searchByTitle"
              type="text"
              placeholder="Search by title..."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";
import { timeFilter } from "@/broadcasts"


const emit = defineEmits<{
  addCard: [],
  filterChange: [filter: timeFilter],
  searchByTitle: [query: string],
}>();

const filter = ref<timeFilter>("time-asc");
const search = ref('');

function onFilterChange() {
  emit("filterChange", filter.value);
}
function searchByTitle() {
  emit("searchByTitle", search.value);
}

function addNewBroadcast() {
  emit("addCard");
}

</script>

<style scoped>
.add-broadcast {
  padding: 20px;
}

/* Keep existing custom styles */

.custom-btn {
  background-color: #2A265F;
  border: none;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  padding: 10px 20px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;
  width: 100%;
}

.custom-btn:hover {
  background-color: #f4f4f4;
  color: #2A265F;
  transform: scale(1.05);
}

.sort-label {
  font-size: 14px;
  font-weight: 500;
  color: #2A265F;
}

.sort-select {
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #2A265F;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  appearance: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  width: 100%;
}

.sort-select:hover {
  border-color: #2A265F;
  background-color: #f4f4f4;
}

.search-bar {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  color: #2A265F;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
  outline: none;
  transition: border-color 0.2s ease, background-color 0.2s ease;
}

.search-input:focus {
  border-color: #2A265F;
  background-color: #f9f9f9;
}

.search-input::placeholder {
  color: #999;
}

@media (min-width: 768px) {
  .search-input {
    min-width: 300px;
    width: auto;
  }
}
</style>
