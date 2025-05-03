<template>
  <div class="add-broadcast">
    <button class="btn">Add new card</button>

    <div class="sort-controls">
      <div class="sort-bar">
        <label for="sort" class="sort-label">Sort by time:</label>
        <select id="sort" class="sort-select">
          <option value="time-asc">🕒 Time ↑</option>
          <option value="time-desc">🕒 Time ↓</option>
        </select>
      </div>

      <div class="filter-bar">
        <label for="type" class="sort-label">Type:</label>
        <select id="type" class="sort-select">
          <option value="all">All</option>
          <option value="news">Channel</option>
        </select>
      </div>
    </div>

    <div class="search-bar">
      <input type="text" class="search-input" placeholder="Search broadcasts..." />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.add-broadcast {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
}

@media (min-width: 768px) {
  .add-broadcast {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 15px;
  }
}

.btn {
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
}

.btn:hover {
  background-color: #f4f4f4;
  color: #2A265F;
  transform: scale(1.05);
}

.sort-controls {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (min-width: 768px) {
  .sort-controls {
    flex-direction: row;
    align-items: center;
  }
}

/* Sort section */
.sort-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.sort-bar,
.filter-bar {
  display: flex;
  align-items: center;
  gap: 8px;
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
}

.sort-select:hover {
  border-color: #2A265F;
  background-color: #f4f4f4;
}

.search-bar {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
}

.search-input {
  width: 100%;
  max-width: 250px;
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
</style>