import Vue from "vue";
import Vuex from "vuex";
import persistence from 'vuex-uniapp-persistence'
import user from './user'

Vue.use(Vuex);//vue的插件机制
// Vuex.store构造器选项
const store = new Vuex.Store({
  plugins: [persistence()],
  state: {
    safeArea: uni.getSystemInfoSync().safeArea,
    capsule: uni.getMenuButtonBoundingClientRect()

  },
  getters: {},
  mutations: {
    addCount(state, payload) {
      state.count += payload
    }
  },
  modules: {
    user
  },
});
export default store;
