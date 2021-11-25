// eslint-disable-next-line import/extensions
import * as types from './mutation-types'

export default {
  [types.SET_PEDIDOS](state, payload) {
    state.pedidos = payload
  },

  [types.SET_PEDIDO](state, payload) {
    state.pedido = payload
  },
}
