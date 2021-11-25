import services from '@/api/endereco.services'
import * as types from './mutation-types'

// eslint-disable-next-line import/prefer-default-export
export const ActionListEndereco = (context, payload) => {
  const { commit } = context
  const { mesAno } = payload
  console.log('mesAno', context, mesAno)

  return services.listaEnderecos().then(res => {
    console.log('res', res.data)
    commit(types.SET_ENDERECOS, res.data)
  })
}

export const ActionCriarEndereco = (context, payload) => {
  const { commit } = context
  const { endereco } = payload
  console.log('ActionCriarEndereco', endereco)

  return services.addEnderecos(endereco).then(res => {
    commit(types.SET_ENDERECO, res.data)
    console.log('types.SET_ENDERECO', res.data)
  })
}

export const ActionDeleteEndereco = (context, payload) => {
  const { commit } = context
  const { id } = payload
  console.log('ActionDeleteEndereco', id)

  return services.deleteEnderecos({
    id,
  }).then(res => {
    commit(types.SET_ENDERECO, res.data)
  })
}

export const ActionUpdateEndereco = (context, payload) => {
  const { commit } = context
  const { id, endereco } = payload
  console.log('ActionUpdateEndereco - endereco', endereco)
  console.log('ActionUpdateEndereco - id', id)

  return services.updateEnderecos({
    endereco,
  }).then(res => {
    commit(types.SET_ENDERECO, res.data)
  })
}
