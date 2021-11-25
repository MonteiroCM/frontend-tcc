import services from '@/api/tamanho.services'
import * as types from './mutation-types'

// eslint-disable-next-line import/prefer-default-export
export const ActionListTamanho = (context, payload) => {
  const { commit } = context
  const { mesAno } = payload
  console.log(mesAno)

  return services.listaTamanhos().then(res => {
    console.log('res', res.data)
    commit(types.SET_TAMANHOS, res.data)
  })
}

export const ActionCriarTamanho = (context, payload) => {
  const { commit } = context
  const { nome } = payload
  console.log('ActionCriarTamanho', nome)

  return services.addTamanhos(nome).then(res => {
    commit(types.SET_TAMANHO, res.data)
  })
}

export const ActionDeleteTamanho = (context, payload) => {
  const { commit } = context
  const { id } = payload
  console.log('ActionDeleteTamanho', id)

  return services.deleteTamanhos({
    id,
  }).then(res => {
    commit(types.SET_TAMANHO, res.data)
  })
}

export const ActionUpdateTamanho = (context, payload) => {
  const { commit } = context
  const { id, tamanho } = payload
  console.log('ActionUpdateTamanho - tamanho', tamanho)
  console.log('ActionUpdateTamanho - id', id)

  return services.updateTamanhos({
    tamanho,
  }).then(res => {
    commit(types.SET_TAMANHO, res.data)
  })
}
