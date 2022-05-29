<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Estatísticas</span>
      <v-spacer></v-spacer>
      <v-btn
        icon
        small
        class="me-n3 mt-n2"
      >
        <v-icon>
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle class="mb-8 mt-n5">
      <span class="font-weight-semibold text--primary me-1">Total</span>
      <span>😎</span>
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col
          v-for="data in estatisticabasica"
          :key="data.title"
          cols="6"
          md="3"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data.title).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>
          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ renomear(data.title) }}
            </p>
            <h3 class="text-xl font-weight-semibold">
              {{ data.total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex'
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiCurrencyUsd, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline } from '@mdi/js'

export default {
  computed: {
    ...mapState('produto', ['estatisticabasica']),
  },
  mounted() {
    this.ActionListEstatisticaBasica({
      codigo: 0,
    })
  },
  methods: {
    ...mapActions('produto', ['ActionListEstatisticaBasica']),
  },
  setup() {
    const renomear = data => {
      if (data === 'pedidos') {
        return 'Pedidos'
      }
      if (data === 'usuarios') {
        return 'Clientes'
      }
      if (data === 'produtos') {
        return 'Produtos'
      }
      if (data === 'pedido_dia') {
        return 'Pedidos do Dia'
      }

      return data
    }
    const resolveStatisticsIconVariation = data => {
      if (data === 'pedidos') {
        return {
          icon: mdiTrendingUp, color: 'primary',
        }
      }
      if (data === 'usuarios') {
        return {
          icon: mdiAccountOutline, color: 'success',
        }
      }
      if (data === 'produtos') {
        return {
          icon: mdiLabelOutline, color: 'warning',
        }
      }
      if (data === 'pedido_dia') {
        return {
          icon: mdiCurrencyUsd, color: 'info',
        }
      }

      return {
        icon: mdiAccountOutline, color: 'success',
      }
    }

    return {
      resolveStatisticsIconVariation,
      renomear,

      // icons
      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiAccountOutline,
        mdiLabelOutline,
        mdiCurrencyUsd,
      },
    }
  },
}
</script>
