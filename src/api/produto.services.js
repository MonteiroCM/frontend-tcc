// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  listaProdutos: filtro => http.get('produtos', {
    filtro,
  }),
  listaEstatistica: filtro => http.post(`produtos/estatistica/${filtro.codigo}`, {
    filtro: {
      mes: filtro.mes, ano: filtro.ano,
    },
  }),
  addProdutos: produto => http.post('produtos', {
    produto,
  }),
  updateProdutos: produto => {
    console.log('updateProdutos - id -', produto.produto.id)
    console.log('updateProdutos - cat -', produto.produto)

    return http.put(`produtos/${produto.produto.id}`, {
      produto: produto.produto,
    })
  },
  deleteProdutos: id => http.delete(`produtos/${id.id}`, {
    id,
  }),
}
