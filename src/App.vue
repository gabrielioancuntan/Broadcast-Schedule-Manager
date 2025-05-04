<template>
  <div class="broadcast-cards">
    <h1>Broadcast Schedule Manager</h1>

    <BroadcastToolbar
        :channels="uniqueChannels"
        @addCard="startAdding"
        @filterChange="handleTimeFilterChange"
        @searchByTitle="handleSearchByTitle"
        @channelFilterChange="handleChannelFilterChange"
    ></BroadcastToolbar>

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
</template>

<script setup lang="ts">
import BroadcastCard from "@/components/broadcastCard.vue";
import BroadcastToolbar from "@/components/broadcastToolbar.vue";
import { Broadcasts, timeFilter } from  "@/broadcasts"
import { fetchBroadcasts } from "@/apiBroadcasts";
import { ref, onMounted, computed } from "vue";

const broadcasts = ref<Broadcasts[]>([]);
const isAdding = ref(false);
const overlappingBroadcastId = ref<string | null>(null);
const editCardId = ref<string | null>(null);
const getTimeFilter = ref<timeFilter>("time-asc");
const searchQuery = ref('');
const channelFilter = ref<string>("all");

const newBroadcast = ref<Broadcasts>({
  id: "",
  title: "",
  channel: "",
  start: "",
  end: "",
});

const uniqueChannels = computed(() => {
  return broadcasts.value.map(b => b.channel);
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

  // Filter by title first
  if (searchQuery.value) {
    list = list.filter(broadcast =>
        broadcast.title.toLowerCase().includes(searchQuery.value)
    );
  }

  if (channelFilter.value !== "all") {
    list = list.filter(broadcast => broadcast.channel.toLowerCase().includes(channelFilter.value.toLocaleLowerCase()));
  }

  // Then sort
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
    if (data.channel !== broadcast.channel) return false;

    const existingStart = new Date(data.start);
    const existingEnd = new Date(data.end);

    return addedStart < existingEnd && addedEnd > existingStart;
  });
}

function handleSaveBroadcast(broadcast: Broadcasts) {
  if (checkIfOverlaps(broadcast)) {
    overlappingBroadcastId.value = broadcast.id;
  }
  console.log(overlappingBroadcastId.value, 'overlappingBroadcastId.value')

  broadcasts.value.unshift(broadcast);
  isAdding.value = false;
  seveBroadcastToLocalStorage();

  // console.log(new Date().toISOString().slice(0, 16));

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
}

function handleSaveEdit(editedBroadcast: Broadcasts) {
  const index = broadcasts.value.findIndex((broadcast) => broadcast.id === editedBroadcast.id);
  if (index !== -1) {
    broadcasts.value[index] = editedBroadcast;
  }
  editCardId.value = null;
  seveBroadcastToLocalStorage();
}

function handleCancelEdit() {
  editCardId.value = null;
}

function handleEditCard(id: string) {
  console.log(id, 'id of the edited card')
  editCardId.value = id;
}

function seveBroadcastToLocalStorage() {
  localStorage.setItem("broadcasts", JSON.stringify(broadcasts.value));
}

onMounted(async () => {
  broadcasts.value = await fetchBroadcasts();

  const savedBroadcasts = localStorage.getItem("broadcasts");
  if (savedBroadcasts) {
    broadcasts.value = JSON.parse(savedBroadcasts) as Broadcasts[];
  } else {
    broadcasts.value = await fetchBroadcasts();
  }
});


</script>

<style>
.broadcast-cards {
  padding: 20px;
}

.broadcast-cards h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #2A265F;
  font-size: 24px;
}

</style>
