<template>
  <div>
    <v-card>
      <v-card-title class="align-start">
        <span>{{ tituloRelatorio }}</span>

        <v-spacer></v-spacer>

        <v-btn
          icon
          small
          class="mt-n2 me-n3"
        >
          <v-icon size="22">
            {{ icons.mdiDotsVertical }}
          </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text>
        <!-- Chart -->
        <vue-apex-charts
          :options="chartOptions"
          :series="chartData"
          height="210"
        ></vue-apex-charts>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'
// eslint-disable-next-line object-curly-newline
import { mdiDotsVertical, mdiTrendingUp, mdiCurrencyUsd } from '@mdi/js'

export default {
  components: {
    VueApexCharts,
  },
  props: {
    valuesCategories: {
      type: Array,
      default: null,
    },
    chartData: {
      type: Array,
      default: null,
    },
    tituloRelatorio: {
      type: String,
      default: 'null',
    },
  },
  setup(props) {
    const chartOptions = {
      colors: [
        '#5da8ae',
        '#ffff00',
        '#e7c602',
        '#e7b40d',
        '#ffc220',
        '#eaea32',
        '#0000ff',
        '#89a3dc',
        '#74b6f0',
        '#1d449f',
        '#103279',
        '#1a175e',
        '#004c91',
        '#348f86',
        '#007dc6',
        '#29166f',
        '#14498d',
        '#0c5d7b',
        '#33c4e3',
        '#1ea1f3',
        '#134bac',
        '#5e4119',
        '#ffffff',
        '#cf7e4f',
        '#93654e',
        '#b21935',
        '#a81d16',
        '#7c292c',
        '#d2454d',
        '#d86960',
        '#df8a6b',
        '#e1a98c',
        '#3a3a3a',
        '#23348c',
        '#693f29',
        '#f6f17b',
        '#f5ed06',
        '#449a1f',
        '#468fde',
        '#2c6ecc',
        '#bd2766',
        '#6cb041',
        '#831d1c',
        '#0d213c',
        '#cd2815',
        '#c4300a',
        '#dc70a4',
        '#d03f83',
        '#da7c0a',
        '#d24e04',
        '#f2de03',
        '#f5ee1e',
        '#35221b',
        '#80ad1c',
        '#a42735',
        '#902577',
        '#ca5393',
        '#951d64',
        '#f8f5b2',
        '#4e341d',
        '#578018',
        '#0b4a51',
        '#5f4d29',
        '#edb308',
        '#f0c818',
        '#dcaf0d',
        '#906516',
        '#ae590a',
        '#ab9b46',
        '#b0b0ae',
        '#000000',
        '#752339',
        '#ae4913',
        '#231d11',
        '#dc9d04',
        '#bb5d0a',
        '#4c67b9',
        '#5f7fca',
        '#76571d',
        '#00ff00',
        '#76956b',
        '#76956b',
        '#93c250',
        '#23832c',
        '#074e2e',
        '#054135',
        '#3e450f',
        '#203f30',
        '#205012',
        '#1ED760',
        '#7fba66',
        '#107c10',
        '#d03f01',
        '#ff0000',
        '#ed1c24',
        '#fd2c1a',
        '#6d271b',
        '#ba4229',
        '#a3371b',
        '#77193e',
        '#58368c',
        '#30237e',
        '#9687c0',
        '#5a226e',
        '#47207b',
        '#954479',
        '#187f48',
        '#0d3a13',
      ],
      chart: {
        type: 'bar',
        toolbar: {
          show: false,
        },
        offsetX: -15,
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
          distributed: true,
          borderRadius: 8,
          startingShape: 'rounded',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: props.valuesCategories,
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        tickPlacement: 'on',
        labels: {
          show: true,
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        show: true,
        tickAmount: 4,
        labels: {
          offsetY: 3,
          formatter: value => `${value}`,
        },
      },
      stroke: {
        width: [2, 2],
      },
      grid: {
        strokeDashArray: 12,
        padding: {
          right: 0,
        },
      },
    }

    return {
      chartOptions,
      icons: {
        mdiDotsVertical,
        mdiTrendingUp,
        mdiCurrencyUsd,
      },
    }
  },
}
</script>
