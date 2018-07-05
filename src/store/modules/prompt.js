import API from '@/api'
const PROMPT = 'PROMPT'

export default {
  namespaced: true,
  state: {
    configText: {}
  },
  mutations: {
    [PROMPT] (state, data) {
      state.configText = data
    }
  },
  actions: {
    async getPrompt ({ commit, state }) {
      const res = await API.getPrompt()
      const { status, data } = res.data
      if (!status) return
      commit(PROMPT, data)
    }
  }
}
