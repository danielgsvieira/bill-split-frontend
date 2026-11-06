import { onMounted, onUnmounted } from 'vue';

function useKeydown(targetKey: string, handler: (event: KeyboardEvent) => void): void {
  const handleKeyDown = (event: KeyboardEvent): void => {
    const target = event.target as HTMLElement | null;

    if (target) {
      const tagName = target.tagName;
      const isEditable = target.isContentEditable;

      if (tagName === 'INPUT' || tagName === 'TEXTAREA' || tagName === 'SELECT' || isEditable) {
        return;
      }
    }

    if (event.key === targetKey) {
      handler(event);
    }
  };

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown);
  });
}

export { useKeydown };
