// eslint-disable-next-line import/extensions
import * as types from './mutation-types'

export default {
  [types.SET_CATEGORIAS](state, payload) {
    state.categorias = payload
  },

  [types.SET_CATEGORIA](state, payload) {
    state.categoria = payload
  },
}
