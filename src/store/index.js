import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'

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
      }
  },

  getters: {
    error: (s) => s.error,
  },

  modules: {
    auth
  }
})
