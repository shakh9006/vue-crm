import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
      setError(ctx, error) {
        ctx.error = error;
      },

      clearError(ctx) {
        ctx.error = null;
      },
  },

    actions: {
        async fetchFixer() {
            const key = '295d300e1f4373007f4096c420cf57dc';
            const data = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=,RUB,USD,EUR&format=1`);
            return await data.json();
        }
    },

  getters: {
    error: (s) => s.error,
  },

  modules: {
    auth,
    info
  }
})
