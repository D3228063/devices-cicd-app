<script setup lang="ts">
import AuthGuard from './components/AuthGuard.vue';

const hasAuth0Config =
  !!import.meta.env.VITE_AUTH0_DOMAIN &&
  !!import.meta.env.VITE_AUTH0_CLIENT_ID &&
  import.meta.env.VITE_AUTH0_CLIENT_ID !== 'your-client-id-here';
</script>

<template>
  <div v-if="!hasAuth0Config" class="setup-error-container">
    <div class="setup-error-card">
      <h1>Configuration required</h1>
      <p>
        Auth0 settings are missing for this environment. Set
        <strong>VITE_AUTH0_DOMAIN</strong> and
        <strong>VITE_AUTH0_CLIENT_ID</strong> in the production build
        configuration.
      </p>
    </div>
  </div>
  <AuthGuard v-else>
    <RouterView />
  </AuthGuard>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f7fafc;
}

#app {
  min-height: 100vh;
}

.setup-error-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.setup-error-card {
  max-width: 560px;
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 12px;
  padding: 2rem;
}

.setup-error-card h1 {
  margin-bottom: 0.75rem;
  color: #c53030;
}

.setup-error-card p {
  color: #742a2a;
  line-height: 1.5;
}
</style>
