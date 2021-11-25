// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  listaEnderecos: filtro => http.get('enderecos', {
    filtro,
  }),
  addEnderecos: endereco => http.post('enderecos', {
    endereco,
  }),
  updateEnderecos: endereco => {
    console.log('updateEnderecos - id -', endereco.endereco.id)
    console.log('updateEnderecos - cat -', endereco.endereco)

    return http.put(`enderecos/${endereco.endereco.id}`, {
      endereco: endereco.endereco,
    })
  },
  deleteEnderecos: id => http.delete(`enderecos/${id.id}`, {
    id,
  }),
}
