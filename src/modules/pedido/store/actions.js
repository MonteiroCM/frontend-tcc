import services from '@/api/pedido.services'
import * as types from './mutation-types'

// eslint-disable-next-line import/prefer-default-export
export const ActionListPedido = (context, payload) => {
  const { commit } = context
  const { mesAno, filtro } = payload
  console.log(mesAno, filtro)

  return services.listaPedidos({
    filtro,
  }).then(res => {
    console.log('res', res.data)
    commit(types.SET_PEDIDOS, res.data)
  })
}

export const ActionListPedidoFiltro = (context, payload) => {
  const { commit } = context
  const { filtro } = payload
  console.log('ActionListPedidoFiltro 3', filtro)

  return services.listaPedidosFiltro({
    filtro,
  }).then(res => {
    console.log('res', res.data)
    commit(types.SET_PEDIDOS, res.data)
  })
}

export const ActionCriarPedido = (context, payload) => {
  const { commit } = context
  const { nome } = payload
  console.log('ActionCriarPedido', nome)

  return services.addPedidos({
    pedido: nome,
  }).then(res => {
    commit(types.SET_PEDIDO, res.data)
  })
}

export const ActionDeletePedido = (context, payload) => {
  const { commit } = context
  const { id } = payload
  console.log('ActionDeletePedido', id)

  return services.deletePedidos({
    id,
  }).then(res => {
    commit(types.SET_PEDIDO, res.data)
  })
}

export const ActionUpdatePedido = (context, payload) => {
  const { commit } = context
  const { id, pedido } = payload
  console.log('ActionUpdatePedido - pedido', pedido)
  console.log('ActionUpdatePedido - id', id)

  return services.updatePedidos({
    pedido,
  }).then(res => {
    commit(types.SET_PEDIDO, res.data)
  })
}
