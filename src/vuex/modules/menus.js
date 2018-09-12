import { deepCopy } from '../../assets/utils/util'
// initial state
const state = {
  list: [],
  index: 0,
  activeColumn: 0 // 当前板块
}
const defaultValue = deepCopy(state)
// getters
const getters = {
  list: state => {
    return state.list
  },
  activeColumn: state => {
    return state.activeColumn
  },
  index: state => {
    return state.index
  }
}
// mutations
const mutations = {
  // 数据初始化
  service_init (state) {
    window.$globalHub.$store.state.menus = defaultValue
  },
  // 持久化目录
  SET_MENUS_LIST (state, val) {
    state.list = val
  },
  // 设置当前板块
  SET_ACTIVE_COLUME (state, val) {
    state.activeColumn = val
  },
  // 设置当前参数
  SET_TEST_COLUME (state, val) {
    state.index = val
  }
}
const actions = {
  // 持久化目录
  set_menus_list ({ commit }, val) {
    commit('SET_MENUS_LIST', val)
  },
  // 设置当前板块
  set_active_colume ({ commit }, val) {
    commit('SET_ACTIVE_COLUME', val)
  },
  set_test_colume ({ commit }, val) {
    commit('SET_TEST_COLUME', val)
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
