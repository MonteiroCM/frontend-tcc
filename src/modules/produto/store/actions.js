import services from '@/api/produto.services'
import * as types from './mutation-types'

// eslint-disable-next-line import/prefer-default-export
export const ActionListProduto = (context, payload) => {
  const { commit } = context
  const { mesAno } = payload
  console.log('mesAno', context, mesAno)

  return services.listaProdutos().then(res => {
    console.log('res', res.data)
    commit(types.SET_PRODUTOS, res.data)
  })
}

export const ActionCriarProduto = (context, payload) => {
  const { commit } = context
  const { produto } = payload
  console.log('ActionCriarProduto', produto)

  return services.addProdutos(produto).then(res => {
    commit(types.SET_PRODUTO, res.data)
    console.log('types.SET_PRODUTO', res.data)
  })
}

export const ActionDeleteProduto = (context, payload) => {
  const { commit } = context
  const { id } = payload
  console.log('ActionDeleteProduto', id)

  return services.deleteProdutos({
    id,
  }).then(res => {
    commit(types.SET_PRODUTO, res.data)
  })
}

export const ActionUpdateProduto = (context, payload) => {
  const { commit } = context
  const { id, produto } = payload
  console.log('ActionUpdateProduto - produto', produto)
  console.log('ActionUpdateProduto - id', id)

  return services.updateProdutos({
    produto,
  }).then(res => {
    commit(types.SET_PRODUTO, res.data)
  })
}
