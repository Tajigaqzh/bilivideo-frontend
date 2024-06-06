import { App } from 'vue';
import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export const store = createPinia()

store.use(piniaPluginPersistedstate)
export const installPinia = (app: App) => {
  app.use(store);
};
