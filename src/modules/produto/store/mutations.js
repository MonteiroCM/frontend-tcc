// eslint-disable-next-line import/extensions
import * as types from './mutation-types'

export default {
  [types.SET_PRODUTOS](state, payload) {
    state.produtos = payload
  },

  [types.SET_PRODUTO](state, payload) {
    state.produto = payload
  },

  [types.SET_ESTATISTICA](state, payload) {
    state.estatistica = payload
  },

  [types.SET_ESTATISTICA_PIE](state, payload) {
    state.pie = payload
  },

  [types.SET_ESTATISTICA_LINE](state, payload) {
    state.line = payload
  },

  [types.SET_ESTATISTICA_VALOR](state, payload) {
    state.estatisticavalor = payload
  },

  [types.SET_ESTATISTICA_FORMA_PAGAMENTO](state, payload) {
    state.estatisticaformapagamento = payload
  },

}
