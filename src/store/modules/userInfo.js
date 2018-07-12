import API from '@/api'
const UER_INFO = 'UER_INFO'

export default {
  namespaced: true,
  state: {
    info: {}
  },
  mutations: {
    [UER_INFO] (state, data) {
      state.info = data
    }
  },
  actions: {
    async loginByWeb ({ commit, state }) {
      const res = await API.loginByWeb()
      const { status, data } = res.data
      if (!status) return
      commit(UER_INFO, data)
    }
  }
}
