import services from '@/api/cliente.services'
import * as types from './mutation-types'

// eslint-disable-next-line import/prefer-default-export
export const ActionListCliente = (context, payload) => {
  const { commit } = context
  const { mesAno } = payload
  console.log(mesAno)

  return services.listaClientes().then(res => {
    console.log('res', res.data)
    commit(types.SET_CLIENTES, res.data)
  })
}

export const ActionCriarCliente = (context, payload) => {
  const { commit } = context
  const { nome } = payload
  console.log('ActionCriarCliente', nome)

  return services.addClientes({
    nome: nome.nome, ativo: nome.ativo,
  }).then(res => {
    commit(types.SET_CLIENTE, res.data)
  })
}

export const ActionDeleteCliente = (context, payload) => {
  const { commit } = context
  const { id } = payload
  console.log('ActionDeleteCliente', id)

  return services.deleteClientes({
    id,
  }).then(res => {
    commit(types.SET_CLIENTE, res.data)
  })
}

export const ActionUpdateCliente = (context, payload) => {
  const { commit } = context
  const { id, cliente } = payload
  console.log('ActionUpdateCliente - cliente', cliente)
  console.log('ActionUpdateCliente - id', id)

  return services.updateClientes({
    cliente,
  }).then(res => {
    commit(types.SET_CLIENTE, res.data)
  })
}
