// eslint-disable-next-line import/extensions
import * as types from './mutation-types'

export default {
  [types.SET_CLIENTES](state, payload) {
    state.clientes = payload
  },

  [types.SET_CLIENTE](state, payload) {
    state.cliente = payload
  },
}
