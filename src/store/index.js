import Vue from "vue";
import Vuex from "vuex";
import persistence from 'vuex-uniapp-persistence'

Vue.use(Vuex);//vue的插件机制
// Vuex.store构造器选项
const store = new Vuex.Store({
  plugins: [persistence()],
  state: {
    count: 100,
    obj: { name: '李华', age: 20 }
  },
  getters: {},
  mutations: {
    addCount(state, payload) {
      state.count += payload
      // console.log(123);
    }
  },
  modules: {},
});
export default store;
