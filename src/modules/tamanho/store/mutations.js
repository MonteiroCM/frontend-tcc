// eslint-disable-next-line import/extensions
import * as types from './mutation-types'

export default {
  [types.SET_TAMANHOS](state, payload) {
    state.tamanhos = payload
  },

  [types.SET_TAMANHO](state, payload) {
    state.tamanho = payload
  },
}
