import { boot } from 'quasar/wrappers';
import { Dark, LocalStorage } from 'quasar';

type Theme = 'dark' | 'light';

function setTheme() {
  const storageTheme = LocalStorage.getItem<Theme>('theme') ?? 'dark';
  Dark.set(storageTheme === 'dark');
}

function addLocalStorageThemeWatcher() {
  window.addEventListener('storage', (event) => {
    if (event.key === 'theme') {
      setTheme();
    }
  });
}

export default boot(() => {
  setTheme();
  addLocalStorageThemeWatcher();
});
export type { Theme };
