// eslint-disable-next-line import/extensions
import * as types from './mutation-types'

export default {
  [types.SET_ITEMVENDAS](state, payload) {
    state.itemvendas = payload
  },

  [types.SET_ITEMVENDA](state, payload) {
    state.itemvenda = payload
  },
}
