<template>
  <v-row>
    <v-col
      cols="12"
      md="12"
    >
      <v-card>
        {{ estatisticaformapagamento }}
        <v-card-title class="align-center">
          <span style="width: 100%;text-align: center">Relatório geral vendido no estabelecimento</span>
        </v-card-title>
      </v-card>
    </v-col>
    <v-col
      cols="12"
      md="12"
    >
      <dashboard-weekly-overview
        :values-categories="['JAN', 'FEV', 'MAR', 'ABR', 'MAIO', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']"
        :chart-data="estatistica"
        titulo-relatorio="Vendas Gerais (Quantidades de pedidos) - por mês"
      >
      </dashboard-weekly-overview>
    </v-col>
    <v-col
      cols="12"
      md="12"
    >
      <linhas
        :values-categories="['JAN', 'FEV', 'MAR', 'ABR', 'MAIO', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ']"
        :chart-data="estatisticavalor"
        titulo-relatorio="Vendas Gerais (Valores R$ de pedidos) - por mês"
      >
      </linhas>
    </v-col>

    <v-col
      cols="12"
      md="12"
    >
      <v-row>
        <v-col></v-col>
        <v-col v-for="data in anos" :key="data" @click="TrocarAno(data)">
          <v-hover v-slot="{ hover }">
            <v-btn
              class="v-btn white--text mx-1 px-6"
              elevation="2"
              x-bigger
              rounded
              :style="{ 'background-color': hover ? 'green' : selectAno == data ? 'green' : '#BB86FC' }"
            >
              {{ data }}
            </v-btn>
          </v-hover>
        </v-col>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col></v-col>
        <v-col v-for="data in meses" :key="data" @click="TrocarMes(data)">
          <v-hover v-slot="{ hover }">
            <v-btn
              class="v-btn white--text px-2"
              elevation="2"
              small
              :style="{ 'background-color': hover ? '#86d1fc' : selectMes == data ? '#86d1fc' : '#284fa8' }"
            >
              {{ data }}
            </v-btn>
          </v-hover>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-col>

    <v-col>
      <pie
        :values-categories="pie[0].nomes"
        :chart-data="pie[0].quantidade"
        :titulo-relatorio="'Quantidades - por produtos ' + titulo"
      >
      </pie>
    </v-col>
    <v-col>
      <pie
        :values-categories="pie[0].nomes"
        :chart-data="pie[0].valor"
        :titulo-relatorio="'Valor - por produtos ' + titulo"
      >
      </pie>
    </v-col>
    <v-col
      cols="12"
      sm="12"
      md="12"
    >
    </v-col>
    <v-col>
      <pie
        :values-categories="estatisticaformapagamento[0].nomes"
        :chart-data="estatisticaformapagamento[0].quantidade"
        :titulo-relatorio="'Quantidades - por Forma Pagamento ' + titulo"
      >
      </pie>
    </v-col>
    <v-col>
      <pie
        :values-categories="estatisticaformapagamento[0].nomes"
        :chart-data="estatisticaformapagamento[0].valor"
        :titulo-relatorio="'Valor - por Forma Pagamento ' + titulo"
      >
      </pie>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import DashboardWeeklyOverview from './DashboardWeeklyOverview.vue'
import Pie from './Pie.vue'
import Linhas from './Linhas.vue'

export default {
  components: {
    DashboardWeeklyOverview,
    Pie,
    Linhas,
  },
  setup() {
    const anos = [2019, 2020, 2021, 2022]
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

    return {
      anos,
      meses,
    }
  },
  data: () => ({
    selectMes: 'Janeiro',
    selectAno: 2019,
    titulo: ' por produtos de ',
  }),
  computed: {
    ...mapState('produto', ['estatistica', 'pie', 'estatisticavalor', 'estatisticaformapagamento']),
  },
  mounted() {
    this.ActionEstatisticaPie({
      codigo: 3,
      mes: 1,
      ano: 2019,
    })

    this.ActionEstatisticaPieFormaPagamento({
      codigo: 5,
      mes: 1,
      ano: 2019,
    })

    this.ActionEstatistica({
      codigo: 1,
    })

    this.ActionEstatisticaValor({
      codigo: 4,
    })

    this.titulo = ` de ${this.selectMes} - ${this.selectAno}`
  },

  methods: {
    ...mapActions('produto', ['ActionEstatistica', 'ActionEstatisticaPie', 'ActionEstatisticaValor', 'ActionEstatisticaPieFormaPagamento']),
    TrocarAno(vdata) {
      this.selectAno = vdata
      this.titulo = ` de ${this.selectMes} - ${this.selectAno}`
      console.log('titulo', this.titulo)
      this.ActionEstatisticaPie({
        codigo: 3,
        mes: this.meses.indexOf(this.selectMes) + 1,
        ano: this.selectAno,
      })

      this.ActionEstatisticaPieFormaPagamento({
        codigo: 5,
        mes: this.meses.indexOf(this.selectMes) + 1,
        ano: this.selectAno,
      })
    },
    TrocarMes(vdata) {
      this.selectMes = vdata
      this.titulo = ` de ${this.selectMes} - ${this.selectAno}`
      console.log('titulo', this.titulo)
      this.ActionEstatisticaPie({
        codigo: 3,
        mes: this.meses.indexOf(this.selectMes) + 1,
        ano: this.selectAno,
      })

      this.ActionEstatisticaPieFormaPagamento({
        codigo: 5,
        mes: this.meses.indexOf(this.selectMes) + 1,
        ano: this.selectAno,
      })
    },
  },
}
</script>
