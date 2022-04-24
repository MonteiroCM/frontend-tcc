import Vue from 'vue'
import VueRouter from 'vue-router'
import beforeEach from './beforeEach'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    meta: {
      auth: true,
    },
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/typography',
    name: 'typography',

    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',

    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',

    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/relgeral',
    name: 'Geral',

    component: () => import('@/views/estatistica/Geral.vue'),
  },
  {
    path: '/porano',
    name: 'PorAno',

    component: () => import('@/views/estatistica/PorAno.vue'),
  },
  {
    path: '/porpedido',
    name: 'PorPedido',

    component: () => import('@/views/estatistica/PorPedido.vue'),
  },
  {
    path: '/categoria',
    name: 'categorias',

    component: () => import('@/views/categoria/Categoria.vue'),
  },
  {
    path: '/loja',
    name: 'loja',

    component: () => import('@/views/loja/Loja.vue'),
  },
  {
    path: '/pedido',
    name: 'pedidos',

    component: () => import('@/views/pedido/Pedido.vue'),
  },
  {
    path: '/tamanho',
    name: 'tamanhos',

    component: () => import('@/views/tamanho/Tamanho.vue'),
  },
  {
    path: '/cliente',
    name: 'clientes',

    component: () => import('@/views/cliente/Cliente.vue'),
  },
  {
    path: '/itemvenda',
    name: 'itemvenda',

    component: () => import('@/views/itemVenda/ItemVenda.vue'),
  },
  {
    path: '/produto',
    name: 'produtos',

    component: () => import('@/views/produto/Produto.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',

    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',

    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',

    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
      auth: false,
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',

    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
      auth: false,
    },
  },
  {
    path: '/error-404',
    name: 'error-404',

    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(beforeEach)

export default router
