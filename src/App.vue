<template>
  <div class="broadcast-cards">
    <h1>Broadcast Schedule Manager</h1>

    <BroadcastToolbar
        :channels="uniqueChannels"
        @addCard="startAdding"
        @filterChange="handleTimeFilterChange"
        @searchByTitle="handleSearchByTitle"
        @channelFilterChange="handleChannelFilterChange"
        @showAnalytics="handleShowAnalytics"
    ></BroadcastToolbar>

    <div v-if="loaded && broadcasts.length === 0 && !isAdding" class="empty-state">
      <div class="empty-content">
        <p>No broadcasts added yet. Please add a broadcast to get started!</p>
        <img src="@/assets/broadcasting.png" alt="No broadcasts" />
      </div>
    </div>

    <div v-else>
      <BroadcastCard
          :broadcasts="filteredBroadcasts"
          :is-adding="isAdding"
          :edit-card-id="editCardId"
          :overlapping-broadcast-id="overlappingBroadcastId"
          @onSubmit="handleSaveBroadcast"
          @onEditCard="handleEditCard"
          @onDeleteCard="handleDeleteCard"
          @onCancel="handleCancelAdd"
          @onSaveEdit="handleSaveEdit"
          @onCancelEdit="handleCancelEdit"
      ></BroadcastCard>
    </div>

    <div v-if="showChartDrawer" class="drawer-backdrop" @click="showChartDrawer = false">
      <div class="chart-drawer" @click.stop>
        <div class="chart-drawer-header">
          <h4>Channel Analytics</h4>
          <button @click="showChartDrawer = false" class="close-btn">✖</button>
        </div>
        <ChannelAnalyticsChart
            v-if="Object.keys(scheduledTimeByChannel).length"
            :data="scheduledTimeByChannel"
        />
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import BroadcastCard from "@/components/BroadcastCard.vue";
import BroadcastToolbar from "@/components/BroadcastToolbar.vue";
import { Broadcasts, timeFilter } from  "@/broadcasts"
import { fetchBroadcasts } from "@/apiBroadcasts";
import { ref, onMounted, computed } from "vue";
import { useToast } from 'vue-toastification'
import ChannelAnalyticsChart from "./components/ChannelAnalyticsChart.vue";


const broadcasts = ref<Broadcasts[]>([]);
const isAdding = ref(false);
const overlappingBroadcastId = ref<string | null>(null);
const editCardId = ref<string | null>(null);
const getTimeFilter = ref<timeFilter>("time-asc");
const searchQuery = ref('');
const channelFilter = ref<string>("all");
const toast = useToast();
const loaded = ref(false);
const showChartDrawer = ref(false);

const newBroadcast = ref<Broadcasts>({
  id: "",
  title: "",
  channel: "",
  start: "",
  end: "",
});

const uniqueChannels = computed(() => {
  const allChannels = broadcasts.value.map(data => data.channel.trim().toLowerCase());
  return [...new Set(allChannels)];
});

function handleChannelFilterChange(channel: string) {
  channelFilter.value = channel;
}

function handleTimeFilterChange(filter: timeFilter) {
  getTimeFilter.value = filter;
}

function handleSearchByTitle(search: string) {
  searchQuery.value = search.toLowerCase().trim();
}

const filteredBroadcasts = computed(() => {
  let list = [...broadcasts.value];

  // Filter by title
  if (searchQuery.value) {
    list = list.filter(broadcast =>
        broadcast.title.toLowerCase().includes(searchQuery.value)
    );
  }

  //filter by channel
  if (channelFilter.value !== "all") {
    list = list.filter(broadcast => broadcast.channel.toLowerCase().includes(channelFilter.value.toLocaleLowerCase()));
  }

  // Sort by time
  if (getTimeFilter.value === "time-asc") {
    list.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
  } else if (getTimeFilter.value === "time-desc") {
    list.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
  }

  return list;
});

function startAdding() {
  isAdding.value = true;
  newBroadcast.value = { id: "", title: "", channel: "", start: "", end: "" };
}

function checkIfOverlaps(broadcast: Broadcasts): boolean {
  const addedStart = new Date(broadcast.start);
  const addedEnd = new Date(broadcast.end);

  return broadcasts.value.some(data => {
    if (data.channel.trim().toLowerCase() !== broadcast.channel.trim().toLowerCase() || data.id === broadcast.id) {
      return false;
    }

    const existingStart = new Date(data.start);
    const existingEnd = new Date(data.end);

    return addedStart < existingEnd && addedEnd > existingStart;
  });
}

function handleSaveBroadcast(broadcast: Broadcasts) {
  const isOverlap = checkIfOverlaps(broadcast);

  if (isOverlap) {
    overlappingBroadcastId.value = broadcast.id;
    localStorage.setItem("overlappingBroadcastId", broadcast.id);
    toast.warning("This broadcast overlaps with an existing one on the same channel!", {timeout: false});
  } else {
    toast.success("Broadcast card successfully deleted!")
  }

  broadcasts.value.unshift(broadcast);
  isAdding.value = false;
  seveBroadcastToLocalStorage();
}

function handleCancelAdd() {
  isAdding.value = false;
}

function handleDeleteCard(id: string) {
  const indexCard = broadcasts.value.findIndex((broadcast) => broadcast.id === id);
  if (indexCard !== -1) {
    broadcasts.value.splice(indexCard, 1);
  }

  seveBroadcastToLocalStorage();
  toast.success("Broadcast card successfully deleted!")
}

function handleSaveEdit(editedBroadcast: Broadcasts) {
  const index = broadcasts.value.findIndex((broadcast) => broadcast.id === editedBroadcast.id);
  if (index !== -1) {
    broadcasts.value[index] = editedBroadcast;
  }
  editCardId.value = null;
  seveBroadcastToLocalStorage();
  toast.success("Broadcast card successfully edited!")
}

function handleCancelEdit() {
  editCardId.value = null;
}

function handleEditCard(id: string) {
  editCardId.value = id;
}

function seveBroadcastToLocalStorage() {
  localStorage.setItem("broadcasts", JSON.stringify(broadcasts.value));
}

function handleShowAnalytics() {
  showChartDrawer.value = true;
}

const scheduledTimeByChannel = computed(() => {
  const result: Record<string, number> = {};
  broadcasts.value.forEach(broadcast => {
    const start = new Date(broadcast.start).getTime();
    const end = new Date(broadcast.end).getTime();
    const durationHours = (end - start) / (1000 * 60 * 60);
    const channel = broadcast.channel.trim().toLowerCase();
    result[channel] = (result[channel] || 0) + durationHours;
  });
  return result;
});

onMounted(async () => {
  broadcasts.value = await fetchBroadcasts();

  const savedBroadcasts = localStorage.getItem("broadcasts");
  if (savedBroadcasts) {
    broadcasts.value = JSON.parse(savedBroadcasts) as Broadcasts[];
  } else {
    broadcasts.value = await fetchBroadcasts();
  }
  loaded.value = true;

  const savedOverlapId = localStorage.getItem("overlappingBroadcastId");
  if (savedOverlapId) {
    overlappingBroadcastId.value = savedOverlapId;
  }
});


</script>

<style>

body, .broadcast-cards {
  position: static !important;
  overflow: visible !important;
  z-index: auto !important;
}
.broadcast-cards {
  padding: 20px;
}

.broadcast-cards h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #2A265F;
  font-size: 24px;
}

.empty-state {
  position: relative;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: contain;
  margin-top: 2rem;
}

.empty-content {
  text-align: center;
}

.empty-content p {
  font-size: 1.2rem;
  color: #2A265F;
  margin-top: 1rem;
  font-weight: 500;
}

.drawer-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3); /* Dim effect */
  backdrop-filter: blur(3px); /* Optional blur */
  z-index: 1000;
  display: flex;
}

.chart-drawer {
  width: 350px;
  max-width: 90vw;
  height: 100%;
  background: #fff;
  padding: 20px;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.2);
  animation: slideInDrawer 0.3s ease-out;
  overflow-y: auto;
}

.chart-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #5c5c8a;
  cursor: pointer;
}

@keyframes slideInDrawer {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}


</style>
