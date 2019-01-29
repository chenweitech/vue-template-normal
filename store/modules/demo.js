import * as mu from '../mutation_type'

const state = {
  data: ''
}

const getters = {

}

const actions = {

}

const mutations = {
  [mu.SET_DEMO_DATA] (state, payload) {
    state.data = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}