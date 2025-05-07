<template>
  <div class="container-fluid">
    <div class="row gy-3 gx-3 align-items-start add-broadcast">
      <div class="col-12 col-md-6 col-lg-auto">
        <button @click="addNewBroadcast" class="add-broadcast-btn w-100 w-md-100 w-lg-auto">
          <i class="fa fa-plus me-2"></i> Add
        </button>
      </div>

      <div class="col-12 col-md-6 col-lg-auto">
        <div class="filter-bar d-flex align-items-center gap-2 w-100">
          <label for="sort" class="sort-label">Sort by time:</label>
          <div class="d-flex align-items-center gap-1 flex-grow-1">
            <select v-model="filter" @change="onFilterChange" id="sort" class="sort-select" style="min-width: 130px;">
              <option value="time-asc">🕒 Time ↑</option>
              <option value="time-desc">🕒 Time ↓</option>
            </select>
            <button @click="clearSort" class="btn-clear-sort" title="Reset sort">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      </div>


      <div class="col-12 col-md-6 col-lg-auto">
        <div class="filter-bar d-flex align-items-center gap-2 w-100">
        <label for="type" class="sort-label">Channel:</label>
          <select v-model="selectedChannel" @change="filterByChannel" id="type" class="sort-select">
            <option value="all" selected>All</option>
            <option v-for="channel in props.channels" :key="channel">{{channel}}</option>
          </select>
        </div>
      </div>

      <div class="col-12 col-md-6 col-lg-auto">
        <button @click="showAnalytics" class="add-broadcast-btn w-100 w-md-100 w-lg-auto">
          <i class="fa fa-chart-pie me-2"></i>Analytics
        </button>
      </div>

      <div class="col-12 col-md-12 col-lg ms-lg-auto">
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
import { defineEmits, ref, defineProps } from "vue";
import { timeFilter } from "@/broadcasts"

const props = defineProps<{
  channels: string[]
}>()


const emit = defineEmits<{
  addCard: [],
  filterChange: [filter: timeFilter],
  searchByTitle: [query: string],
  channelFilterChange: [channel: string],
  showAnalytics: []
}>();

const filter = ref<timeFilter>("time-asc");
const search = ref('');
const selectedChannel =  ref('all');

function showAnalytics() {
  emit("showAnalytics");
}

function onFilterChange() {
  emit("filterChange", filter.value);
}

function clearSort() {
  filter.value="time-asc";
  emit("filterChange", filter.value);
}

function filterByChannel() {
  emit("channelFilterChange", selectedChannel.value);
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
  padding: 20px 5px;
}

.filter-bar {
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
}

.add-broadcast-btn {
  background-color: #2A265F;
  border: none;
  border-radius: 8px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  color: #fff;
  font-size: 16px;
  padding: 8px 20px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;
  width: 100%;
}

.add-broadcast-btn:hover {
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
  max-width: 100%;
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

.btn-clear-sort {
  background-color: #2A265F;
  color: #fff;
  border: none;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 37px;
  min-width: 37px;
  transition: background-color 0.3s;
}

.btn-clear-sort:hover {
  background-color: #4f4aa3;
}

@media (min-width: 768px) and (max-width: 1199px) {
  .search-input {
    min-width: 200px;
    width: 100%;
  }
}

@media (min-width: 1200px) {
  .search-input {
    min-width: 300px;
    width: auto;
  }
}
</style>
