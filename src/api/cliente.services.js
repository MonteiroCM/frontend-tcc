// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  listaClientes: filtro => http.get('clientes', {
    filtro,
  }),
  addClientes: cliente => http.post('clientes', {
    cliente,
  }),
  updateClientes: cliente => {
    console.log('updateClientes - id -', cliente.cliente.id)
    console.log('updateClientes - cat -', cliente.cliente)

    return http.put(`clientes/${cliente.cliente.id}`, {
      cliente: cliente.cliente,
    })
  },
  deleteClientes: id => http.delete(`clientes/${id.id}`, {
    id,
  }),
}
