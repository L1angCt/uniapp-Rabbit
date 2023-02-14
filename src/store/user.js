import { postLoginWxMinSimple } from '@/api/profile'
export default {
  // 命名空间
  namespaced: true,
  state: {
    profile: null
  },
  getters: {},
  mutations: {
    setProfile(store, payload) {
      store.profile = payload
    }
  },
  actions: {
    // 手机号登陆
    async postLoginWxMinSimple(store, payload) {
      const res = await postLoginWxMinSimple(payload)
      store.commit('setProfile', res.result)
    }
  },
};
