<template>
  <button @click="handleLogout" class="button logout" :disabled="isLoading">
    {{ isLoading ? 'Loading...' : 'Log Out' }}
  </button>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { logout, isLoading } = useAuth0();

const handleLogout = () => {
  logout({
    logoutParams: {
      returnTo: window.location.origin,
    },
  });
};
</script>

<style scoped>
.button {
  padding: 0.875rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button.logout {
  background-color: #fc8181;
  color: #1a202c;
}

.button.logout:hover:not(:disabled) {
  background-color: #e53e3e;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(252, 129, 129, 0.4);
}
</style>
