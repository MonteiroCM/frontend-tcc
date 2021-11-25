// eslint-disable-next-line import/extensions
import * as types from './mutation-types'

export default {
  [types.SET_PRODUTOS](state, payload) {
    state.produtos = payload
  },

  [types.SET_PRODUTO](state, payload) {
    state.produto = payload
  },
}
