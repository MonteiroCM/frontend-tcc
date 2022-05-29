<template>
  <div>
    <v-row>
      <v-col cols="12" md="12">
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="bestclientes"
            sort-by="sequencia"
            class="elevation-1"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': 'Itens por página',
            }"
          >
            <template v-slot:top>
              <button onclick="window.print()">
                Imprimir Pagina
              </button>
              <v-toolbar flat>
                <v-toolbar-title>Listas dos Melhores clientes</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
              </v-toolbar>
            </template>
            <template v-slot:no-data>
              <nodata></nodata>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
      <v-col> </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import nodata from '../../components/no-data.vue'

export default {
  components: {
    nodata,
  },
  data: () => ({
    currentFile: undefined,
    progress: 0,
    message: '',
    nome: '',
    headers: [
      {
        text: 'Ordem',
        align: 'start',
        sortable: false,
        value: 'sequencia',
      },
      {
        text: 'Cliente',
        sortable: false,
        value: 'nome',
      },
    ],
  }),

  computed: {
    ...mapState('produto', ['bestclientes']),
  },

  mounted() {
    this.ActionListBestClientes({
      codigo: 6,
    })
  },
  created() {
    this.initialize()
  },
  methods: {
    ...mapActions('produto', ['ActionListBestClientes']),
    initialize() {
      console.log('initialize')
      this.ActionListBestClientes({
        codigo: 6,
      })
    },
  },
}
</script>
<style scoped></style>
