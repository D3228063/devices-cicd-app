import { ref, type Ref } from 'vue';
import { appConfig } from '@/config/appConfig';

export type Device = {
  id: string;
  name: string;
  type?: string;
  status?: string;
  serialNumber?: string;
  firmwareVersion?: string;
  lastConnected?: string;
  createdAt?: string;
  updatedAt?: string;
};

const API_BASE = appConfig.apiBaseUrl;

export function useDevices() {
  const devices: Ref<Device[]> = ref([]);
  const loading = ref(false);
  const error: Ref<string | null> = ref(null);

  const fetchDevices = async (force = false) => {
    if (loading.value) return;
    loading.value = true;
    error.value = null;
    try {
      const url = new URL('devices', API_BASE).toString();
      const res = await fetch(url, { headers: { Accept: 'application/json' } });
      if (!res.ok)
        throw new Error(
          `Failed to fetch devices: ${res.status} ${res.statusText}`,
        );
      const response = await res.json();
      const data: Device[] = response.success ? response.data : response;
      devices.value = Array.isArray(data) ? data : [];
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Unknown error';
    } finally {
      loading.value = false;
    }
  };

  return { devices, loading, error, fetchDevices };
}
