// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  listaPedidos: filtro => {
    console.log('1 filtro -', filtro)

    return http.get('pedidos', {
      filtro,
    })
  },
  listaPedidosFiltro: filtro => {
    console.log('2 filtro -', filtro)

    return http.post('pedidosfiltro', {
      filtro: filtro.filtro,
    })
  },
  addPedidos: pedido => http.post('pedidos', {
    pedido,
  }),
  updatePedidos: pedido => {
    console.log('updatePedidos - id -', pedido.pedido.id)
    console.log('updatePedidos - cat -', pedido.pedido)

    return http.put(`pedidos/${pedido.pedido.id}`, {
      pedido: pedido.pedido,
    })
  },
  deletePedidos: id => http.delete(`pedidos/${id.id}`, {
    id,
  }),
}
