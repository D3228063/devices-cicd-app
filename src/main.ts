import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createAuth0 } from '@auth0/auth0-vue';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

// Validate Auth0 configuration
if (!domain || !clientId || clientId === 'your-client-id-here') {
  console.error(
    'Auth0 configuration missing. Please check your .env.local file.',
  );
  console.error('Required environment variables:');
  console.error('- VITE_AUTH0_DOMAIN');
  console.error('- VITE_AUTH0_CLIENT_ID');
}

const app = createApp(App);

if (domain && clientId && clientId !== 'your-client-id-here') {
  app.use(
    createAuth0({
      domain: domain,
      clientId: clientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),
  );
}

app.use(router);

app.mount('#app');
