// eslint-disable-next-line import/extensions
import * as types from './mutation-types'

export default {
  [types.SET_ENDERECOS](state, payload) {
    state.enderecos = payload
  },

  [types.SET_ENDERECO](state, payload) {
    state.endereco = payload
  },
}
