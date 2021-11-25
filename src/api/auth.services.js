// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  login: (email, password) => http.post('login', {
    email, password,
  }),
  novoUsuario: (email, password, nome) => http.post('users', {
    email, password, nome,
  }),
  loadSession: () => http.post('loadsession'),
  teste: email => http.post('loadsession', email),
}
