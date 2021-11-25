// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  listaItemVendas: filtro => http.get('itemvendas', {
    filtro,
  }),
  addItemVendas: itemvenda => http.post('itemvendas', {
    itemvenda,
  }),
  updateItemVendas: itemvenda => {
    console.log('updateItemVendas - id -', itemvenda.itemvenda.id)
    console.log('updateItemVendas - cat -', itemvenda.itemvenda)

    return http.put(`itemvendas/${itemvenda.itemvenda.id}`, {
      itemvenda: itemvenda.itemvenda,
    })
  },
  deleteItemVendas: id => http.delete(`itemvendas/${id.id}`, {
    id,
  }),
}
