/* eslint-disable no-unused-vars */
import * as types from './mutation-types'
import services from '@/api/auth.services'
import * as storage from '../../../storage'

export const ActionDoLogin = (context, payload) => {
  const { dispatch } = context
  const { password, email } = payload

  return services.login(email, password).then(res => {
    dispatch('ActionSetUser', res.data.user)
    dispatch('ActionSetToken', res.data.token)
  })
}

export const CriarUsuario = (context, payload) => {
  const { dispatch } = context
  const { password, email, nome } = payload

  return services.novoUsuario(email, password, nome).then(res => {
    console.log('CRIADO')
  })
}

export const ActionLoadSession = async ({ dispatch }) => {
  try {
    const { data: { user, token } } = await services.loadSession()

    dispatch('ActionSetUser', user)
    dispatch('ActionSetToken', token)
  } catch (err) {
    console.log('ActionSignOut', err)
    dispatch('ActionSignOut')
  }
}

export const ActionCheckToken = ({ dispatch, state }) => {
  if (state.token) {
    return Promise.resolve(state.token)
  }

  const token = storage.getLocalToken()

  if (!token) {
    return Promise.reject(new Error('Token Inválido'))
  }

  return dispatch('ActionLoadSession')
}

export const ActionSignOut = context => {
  const { dispatch } = context

  storage.deleteLocalToken()
  dispatch('ActionSetUser', {
  })
  dispatch('ActionSetToken', '')
}

export const ActionSetUser = (context, payload) => {
  const { commit } = context

  commit(types.SET_USER, payload)
}

export const ActionSetToken = (context, payload) => {
  const { commit } = context
  storage.setLocalToken(payload)
  commit(types.SET_TOKEN, payload)
}
