// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  listaCategorias: filtro => http.get('categorias', { filtro }),
  addCategorias: categoria => http.post('categorias', { categoria }),
  updateCategorias: categoria => {
    console.log('updateCategorias - id -', categoria.categoria.id)
    console.log('updateCategorias - cat -', categoria.categoria)

    return http.put(`categorias/${categoria.categoria.id}`, { categoria: categoria.categoria })
  },
  deleteCategorias: id => http.delete(`categorias/${id.id}`, { id }),
}
