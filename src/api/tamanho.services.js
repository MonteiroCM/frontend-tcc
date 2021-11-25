// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  listaTamanhos: filtro => http.get('tamanhos', {
    filtro,
  }),
  addTamanhos: tamanho => http.post('tamanhos', {
    tamanho,
  }),
  updateTamanhos: tamanho => {
    console.log('updateTamanhos - id -', tamanho.tamanho.id)
    console.log('updateTamanhos - cat -', tamanho.tamanho)

    return http.put(`tamanhos/${tamanho.tamanho.id}`, {
      tamanho: tamanho.tamanho,
    })
  },
  deleteTamanhos: id => http.delete(`tamanhos/${id.id}`, {
    id,
  }),
}
