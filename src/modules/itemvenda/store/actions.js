import services from '@/api/itemvenda.services'
import * as types from './mutation-types'

// eslint-disable-next-line import/prefer-default-export
export const ActionListItemVenda = (context, payload) => {
  const { commit } = context
  const { mesAno } = payload
  console.log('mesAno', context, mesAno)

  return services.listaItemVendas().then(res => {
    console.log('res', res.data)
    commit(types.SET_ITEMVENDAS, res.data)
  })
}

export const ActionCriarItemVenda = (context, payload) => {
  const { commit } = context
  const { itemvenda } = payload
  console.log('ActionCriarItemVenda', itemvenda)

  return services.addItemVendas(itemvenda).then(res => {
    commit(types.SET_ITEMVENDA, res.data)
  })
}

export const ActionDeleteItemVenda = (context, payload) => {
  const { commit } = context
  const { id } = payload
  console.log('ActionDeleteItemVenda', id)

  return services.deleteItemVendas({
    id,
  }).then(res => {
    commit(types.SET_ITEMVENDA, res.data)
  })
}

export const ActionUpdateItemVenda = (context, payload) => {
  const { commit } = context
  const { id, itemvenda } = payload
  console.log('ActionUpdateItemVenda - itemvenda', itemvenda)
  console.log('ActionUpdateItemVenda - id', id)

  return services.updateItemVendas({
    itemvenda,
  }).then(res => {
    commit(types.SET_ITEMVENDA, res.data)
  })
}
