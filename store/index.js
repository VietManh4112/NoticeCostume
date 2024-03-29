import Vuex from 'vuex';

const store = () => {
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
      // Các actions để thực hiện các thay đổi trạng thái
    },
    getters: {
      // Các getters để lấy trạng thái đã được biến đổi
    }
  });
};

export default store;