import API from '@/api'
const LETTER = 'LETTER'
const PAGE_NUMBER_ADD = 'PAGE_NUMBER_ADD'
const PAGE_NUMBER_INIT = 'PAGE_NUMBER_INIT'
const TOP_DISTANCE = 'TOP_DISTANCE'
const LAST_PAGE = 'LAST_PAGE'

const CACHE = 'cache'
const REFRESH = 'refresh'
const LOADMORE = 'loadmore'

export default {
  namespaced: true,
  state: {
    list: [],
    page: 1,
    top: 0,
    pageSize: 15,
    isLastPage: false
  },
  mutations: {
    [LETTER] (state, data) {
      state.list = data
    },
    [PAGE_NUMBER_ADD] (state) {
      state.page += 1
    },
    [PAGE_NUMBER_INIT] (state) {
      state.page = 1
    },
    [TOP_DISTANCE] (state, data) {
      state.top = data
    },
    [LAST_PAGE] (state, data) {
      state.isLastPage = data
    }
  },
  actions: {
    async getLetters ({ commit, state }, type) {
      // 以下两种方式，还有另外一种方式loadmore，加载更多数据，即不需要缓存，也不需要清空list和page
      // 返回再次进入时，缓存方式给数据
      if (state.list.length && type === CACHE) return
      // 下拉加载时，重置page = 1, 取消最后一页标示
      if (type === REFRESH) {
        commit(LAST_PAGE, false)
        commit(PAGE_NUMBER_INIT)
      }
      // 如果是最后一页并且是加载状态，即没有更多数据，直接返回
      if (state.isLastPage && type === LOADMORE) return
      // 请求数据 - 第一次进入，刷新加载，加载更多都会请求数据
      const { page, pageSize } = state
      const res = await API.getMyLetters({include: 'wxuser', page})

      const { status, data } = res.data
      if (!status) return
      if (state.list.length !== data.meta.pagination.total) {
        commit(PAGE_NUMBER_ADD)
        // 下拉加载，重置list = []，放在这里为了防止数据加载的白屏
        if (type === REFRESH) commit(LETTER, [])
        commit(LETTER, [ ...state.list, ...data.data ])
      } else {
        // 加载到最后一页的标识
        commit(LAST_PAGE, true)
      }
      if (state.list.length < pageSize) commit(LAST_PAGE, true)
    }
  }
}
