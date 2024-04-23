import Vue from 'vue';
import Vuex from 'vuex';
import axiosInstance, { setBearerToken } from '@/helper/api.js';

Vue.use(Vuex);

export default function createStore() {
  return new Vuex.Store({
    state: {
      isEnglish: false,
    },
    mutations: {
      setIsEnglish(state, newValue) {
        state.isEnglish = newValue;
      },
    },
    actions: {
      login({ commit }, userData) {
        return new Promise((resolve, reject) => {
          axiosInstance.post('/api/auth/sign-in', userData)
            .then(response => {
              localStorage.setItem('token', response.data);
              const tokenlocal = localStorage.getItem('token');
              setBearerToken(tokenlocal);
              // Thực hiện chuyển hướng
              resolve();
            })
            .catch(error => {
              reject(error); // Trả về lỗi
            });
        });
      },
    },
    getters: {

    },
  });
}