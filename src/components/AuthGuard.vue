<template>
  <div class="auth-guard">
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p class="loading-text">Loading...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <h2>Authentication Error</h2>
      <p>{{ error.message }}</p>
    </div>

    <div v-else-if="!isAuthenticated" class="login-container">
      <div class="login-card">
        <h1>Welcome to Devices App</h1>
        <p class="subtitle">Please sign in to view your devices</p>
        <LoginButton />
      </div>
    </div>

    <div v-else class="authenticated-content">
      <div class="user-info">
        <img
          v-if="user?.picture"
          :src="user.picture"
          :alt="user.name"
          class="user-avatar"
        />
        <div class="user-details">
          <span class="user-name">{{ user?.name }}</span>
          <span class="user-email">{{ user?.email }}</span>
        </div>
        <LogoutButton />
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth0 } from '@auth0/auth0-vue';
import LoginButton from './LoginButton.vue';
import LogoutButton from './LogoutButton.vue';

const { isAuthenticated, isLoading, user, error } = useAuth0();
</script>

<style scoped>
.auth-guard {
  min-height: 100vh;
}

.loading-container,
.error-container,
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e2e8f0;
  border-top-color: #63b3ed;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  margin-top: 1rem;
  font-size: 1.125rem;
  color: #718096;
}

.error-container {
  background-color: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 2rem;
  max-width: 500px;
}

.error-container h2 {
  color: #c53030;
  margin-bottom: 1rem;
}

.error-container p {
  color: #742a2a;
}

.login-card {
  background: white;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 450px;
}

.login-card h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1a202c;
}

.subtitle {
  font-size: 1.125rem;
  color: #718096;
  margin-bottom: 2rem;
}

.authenticated-content {
  padding: 1rem;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
}

.user-details {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.user-name {
  font-weight: 600;
  color: #1a202c;
}

.user-email {
  font-size: 0.875rem;
  color: #718096;
}
</style>
