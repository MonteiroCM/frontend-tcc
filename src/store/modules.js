// eslint-disable-next-line import/named
import { store as auth } from '@/modules/auth'
import { store as categoria } from '@/modules/categoria'
import { store as tamanho } from '@/modules/tamanho'
import { store as produto } from '@/modules/produto'
import { store as itemvenda } from '@/modules/itemvenda'
import { store as cliente } from '@/modules/cliente'
import { store as pedido } from '@/modules/pedido'
import { store as endereco } from '@/modules/endereco'

export default {
  auth,
  categoria,
  tamanho,
  produto,
  itemvenda,
  cliente,
  pedido,
  endereco,
}
