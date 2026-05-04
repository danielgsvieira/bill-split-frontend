import { boot } from 'quasar/wrappers';
import { clearAuthUserData, isUserAuthenticated } from 'src/utils';

export default boot(({ router }) => {
  // Validate if user is authenticated for routes with meta.authenticated = true
  router.beforeEach((to) => {
    if (to.meta.authenticated && !isUserAuthenticated()) {
      clearAuthUserData();

      return { name: 'login', query: { redirect: to.path } };
    }

    return true;
  });
});
