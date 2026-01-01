<template>
  <button @click="handleLogin" class="button login" :disabled="isLoading">
    {{ isLoading ? 'Loading...' : 'Log In' }}
  </button>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';

const { loginWithRedirect, isLoading } = useAuth0();

const handleLogin = () => {
  loginWithRedirect();
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

.button.login {
  background-color: #63b3ed;
  color: #1a202c;
}

.button.login:hover:not(:disabled) {
  background-color: #4299e1;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(99, 179, 237, 0.4);
}
</style>
