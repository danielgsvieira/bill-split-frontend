import { type RouteLocationRaw, useRouter } from 'vue-router';

function useGoBack(fallbackRoute: RouteLocationRaw) {
  const router = useRouter();

  function goBack() {
    if (window.history.state?.back) {
      router.back();
      return;
    }

    void router.push(fallbackRoute);
  }

  return { goBack };
}

export { useGoBack };
