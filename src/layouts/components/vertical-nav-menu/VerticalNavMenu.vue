<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link to="/" class="d-flex align-center text-decoration-none">
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            🍔 NEED FOOD
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list expand shaped class="vertical-nav-menu-items pr-5">
      <nav-menu-link title="Menu" :to="{ name: 'loja' }" :icon="icons.mdiHomeOutline"></nav-menu-link>
      <nav-menu-link title="Dashboard" :to="{ name: 'dashboard' }" :icon="icons.mdiHomeOutline"></nav-menu-link>
      <nav-menu-link v-if="user.tipo == 'ADMIN'" title="Pedidos" :to="{ name: 'pedidos' }" :icon="icons.mdiArchive"></nav-menu-link>
      <nav-menu-link v-if="user.tipo == 'ADMIN'" title="Categorias" :to="{ name: 'categorias' }" :icon="icons.mdiCreditCardOutline"></nav-menu-link>
      <nav-menu-link v-if="user.tipo == 'ADMIN'" title="Tamanhos" :to="{ name: 'tamanhos' }" :icon="icons.mdiArchive"></nav-menu-link>
      <nav-menu-link v-if="user.tipo == 'ADMIN'" title="Produto" :to="{ name: 'produtos' }" :icon="icons.mdiCreditCardOutline"></nav-menu-link>
      <nav-menu-link v-if="user.tipo == 'ADMIN'" title="Vendas" :to="{ name: 'itemvenda' }" :icon="icons.mdiArchive"></nav-menu-link>
      <nav-menu-link v-if="user.tipo == 'ADMIN'" title="Cliente" :to="{ name: 'clientes' }" :icon="icons.mdiArchive"></nav-menu-link>
      <nav-menu-link
        title="Perfil"
        :to="{ name: 'pages-account-settings' }"
        :icon="icons.mdiAccountCogOutline"
      ></nav-menu-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState } from 'vuex'
// eslint-disable-next-line object-curly-newline
import {
  mdiArchive,
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline } from '@mdi/js'

import NavMenuLink from './components/NavMenuLink.vue'

export default {
  components: {
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {
    return {
      icons: {
        mdiArchive,
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
      },
    }
  },
  computed: {
    ...mapState('auth', ['user']),
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
