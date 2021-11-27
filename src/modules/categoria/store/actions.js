import services from '@/api/categoria.services'
import * as types from './mutation-types'

// eslint-disable-next-line import/prefer-default-export
export const ActionListCategoria = (context, payload) => {
  const { commit } = context
  const { mesAno } = payload
  console.log(mesAno)

  return services.listaCategorias().then(res => {
    console.log('res', res)
    commit(types.SET_CATEGORIAS, res.data)
  })
}

export const ActionCriarCategoria = (context, payload) => {
  const { commit } = context
  const { nome } = payload
  console.log('ActionCriarCategoria', nome)

  return services.addCategorias({
    nome: nome.nome, ativo: nome.ativo,
  }).then(res => {
    commit(types.SET_CATEGORIA, res.data)
  })
}

export const ActionDeleteCategoria = (context, payload) => {
  const { commit } = context
  const { id } = payload
  console.log('ActionDeleteCategoria', id)

  return services.deleteCategorias({
    id,
  }).then(res => {
    commit(types.SET_CATEGORIA, res.data)
  })
}

export const ActionUpdateCategoria = (context, payload) => {
  const { commit } = context
  const { id, categoria } = payload
  console.log('ActionUpdateCategoria - categoria', categoria)
  console.log('ActionUpdateCategoria - id', id)

  return services.updateCategorias({
    categoria,
  }).then(res => {
    commit(types.SET_CATEGORIA, res.data)
  })
}
