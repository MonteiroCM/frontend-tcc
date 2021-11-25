// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  listaPedidos: filtro => http.get('pedidos', {
    filtro,
  }),
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
