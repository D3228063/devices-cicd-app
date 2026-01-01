<script setup lang="ts">
import { onMounted } from 'vue';
import { useDevices } from '@/composables/useDevices';

const { devices, loading, error, fetchDevices } = useDevices();

onMounted(() => {
  fetchDevices();
});
</script>

<template>
  <div class="devices-view">
    <h1>Devices</h1>

    <div v-if="loading" class="loading">Loading devices…</div>
    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
      <button @click="fetchDevices(true)">Retry</button>
    </div>
    <div v-else-if="devices.length === 0" class="empty">No devices found.</div>

    <ul v-else class="list">
      <li v-for="d in devices" :key="d.id" class="card">
        <div class="row">
          <strong class="name">{{ d.name }}</strong>
          <span class="status" :class="`status-${d.status?.toLowerCase()}`">{{
            d.status
          }}</span>
        </div>
        <div class="details">
          <p v-if="d.type" class="info"><strong>Type:</strong> {{ d.type }}</p>
          <p v-if="d.serialNumber" class="info">
            <strong>Serial:</strong> {{ d.serialNumber }}
          </p>
          <p v-if="d.firmwareVersion" class="info">
            <strong>Firmware:</strong> {{ d.firmwareVersion }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.devices-view {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem;
}
.list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}
.card {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1rem;
  background: white;
}
.row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
}
.name {
  color: #1f2937;
  font-size: 1.1rem;
}
.status {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}
.status-online {
  background: #d1fae5;
  color: #065f46;
}
.status-offline {
  background: #fee2e2;
  color: #991b1b;
}
.status-maintenance {
  background: #fef3c7;
  color: #92400e;
}
.status-error {
  background: #fecaca;
  color: #991b1b;
}
.details {
  border-top: 1px solid #f3f4f6;
  padding-top: 0.75rem;
}
.info {
  color: #6b7280;
  margin: 0.25rem 0;
  font-size: 0.875rem;
}
.loading,
.error,
.empty {
  text-align: center;
  padding: 2rem;
}
.error button {
  margin-top: 0.5rem;
}
</style>
