
import api from '@/api'

export default {
  state: {
    jwt: '',
    user: null
  },
  mutations: {
    setJwt: function(state, jwt) {
      state.jwt = jwt
      try {
        if (jwt) {
          localStorage.setItem('jwt', jwt);
        } else {
          localStorage.removeItem('jwt');
        }
      } catch {
        console.log('Local storage is not available.')
      }
    },
    setUser: function(state, user) {
      state.user = user
    }
  },
  actions: {
    init: async function(context) {
      const jwt = localStorage.getItem('jwt')
      if (jwt) {
        context.commit('setJwt', jwt);
        await context.dispatch('profile');
      }
    },
    login: async function (context, data) {
      const response = await api.login(data);
      context.commit('setJwt', response.jwt);
      await context.dispatch('profile');
      return response;
    },
    profile: async function (context) {
      const user = await api.profile(context.state.jwt);
      context.commit('setUser', user);
      return user;
    },
    updateProfile: async function (context, user) {
      const response  = await api.updateProfile(user, context.state.jwt);
      if (response.success)
        context.commit('setUser', user);
      return response;
    }
  },
}