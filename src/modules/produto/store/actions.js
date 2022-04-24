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

export const ActionEstatistica = (context, payload) => {
  const { commit } = context
  const { codigo } = payload
  console.log('codigo > ', codigo)

  return services.listaEstatistica({
    codigo,
  }).then(res => {
    console.log('res', res.data)
    commit(types.SET_ESTATISTICA, res.data)
  })
}

export const ActionEstatisticaValor = (context, payload) => {
  const { commit } = context
  const { codigo } = payload
  console.log('codigo > ', codigo)

  return services.listaEstatistica({
    codigo,
  }).then(res => {
    console.log('res', res.data)
    commit(types.SET_ESTATISTICA_VALOR, res.data)
  })
}

export const ActionEstatisticaPie = (context, payload) => {
  const { commit } = context
  const { codigo, mes, ano } = payload
  console.log('codigo > ', codigo, mes, ano)

  return services.listaEstatistica({
    codigo,
    mes,
    ano,
  }).then(res => {
    console.log('res', res.data)
    commit(types.SET_ESTATISTICA_PIE, res.data)
  })
}

export const ActionEstatisticaPieFormaPagamento = (context, payload) => {
  const { commit } = context
  const { codigo, mes, ano } = payload
  console.log('codigo > ', codigo, mes, ano)

  return services.listaEstatistica({
    codigo,
    mes,
    ano,
  }).then(res => {
    console.log('res', res.data)
    commit(types.SET_ESTATISTICA_FORMA_PAGAMENTO, res.data)
  })
}

export const ActionEstatisticaLine = (context, payload) => {
  const { commit } = context
  const { codigo, mes, ano } = payload
  console.log('codigo > ', codigo, mes, ano)

  return services.listaEstatistica({
    codigo,
    mes,
    ano,
  }).then(res => {
    console.log('res', res.data)
    commit(types.SET_ESTATISTICA_LINE, res.data)
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
