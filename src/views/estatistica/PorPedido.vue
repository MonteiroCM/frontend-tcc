<template>
  <div>
    <v-card>
      <v-row>
        <v-col>
          <v-date-picker
            v-model="datasfiltros"
            range
          ></v-date-picker>
        </v-col>
        <v-col>
          <v-row>
            Status do Pedido
          </v-row>
          <v-row>
            <v-chip :color="Selecionado('Aberto')" text-color="white" @click="FiltrarStatus('Aberto')">
              Aberto
            </v-chip>

            <v-chip :color="Selecionado('Preparando')" text-color="white" @click="FiltrarStatus('Preparando')">
              Iniciar Preparo
            </v-chip>

            <v-chip :color="Selecionado('Liberado')" text-color="white" @click="FiltrarStatus('Liberado')">
              Liberado
            </v-chip>

            <v-chip :color="Selecionado('Enviado')" text-color="white" @click="FiltrarStatus('Enviado')">
              Enviado
            </v-chip>

            <v-chip :color="Selecionado('Entreque')" text-color="white" @click="FiltrarStatus('Entreque')">
              Entreque
            </v-chip>

            <v-chip :color="Selecionado('Cancelado')" text-color="white" @click="FiltrarStatus('Cancelado')">
              Cancelar
            </v-chip>
          </v-row>
          <v-row>
            Filtros Selecionados
          </v-row>
          <v-row>
            <v-col>
              <v-row>
                <p class="font-weight-black">
                  Data Inicial:
                </p>
              </v-row>
              <v-row>
                <p class="font-weight-black">
                  Data Final:
                </p>
              </v-row>
              <v-row>
                <p class="font-weight-black">
                  Status
                </p>
              </v-row>
            </v-col>
            <v-col>
              <v-row>
                <p class="font-weight-regular">
                  {{
                    FormatData(datasfiltros[0])
                  }}
                </p>
              </v-row>
              <v-row>
                <p class="font-weight-regular">
                  {{
                    FormatData(datasfiltros[1])
                  }}
                </p>
              </v-row>
              <v-row>
                <v-list-item
                  v-for="(item, i) in filtroStatus"
                  :key="i"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on" @click="Filtrar()">
              Filtrar
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="pedidos"
        sort-by="nome"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': 'Itens por página',
        }"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Pedidos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:[`item.data_pedido`]="{ item }">
          {{
            item.data_pedido.split('-')[2] + "/" + item.data_pedido.split('-')[1] + "/" + item.data_pedido.split('-')[0]
          }}
        </template>
        <template v-slot:[`item.ativo`]="{ item }">
          <v-simple-checkbox v-model="item.ativo" disabled></v-simple-checkbox>
        </template>
        <template #[`item.status`]="{item}">
          <v-chip small :color="statusColor[item.status]" class="font-weight-medium">
            {{ item.status }}
          </v-chip>
        </template>
        <template #[`item.numero`]="{item}">
          {{ zeroPad(item.numero, 5) }}
        </template>
        <template v-slot:[`item.itens`]="{ item }">
          <v-list>
            <v-list-item
              v-for="pedidoItem in item.PedidoItem"
              :key="pedidoItem.id"
            >
              <v-list-item-content>
                <v-list-item-title v-text="pedidoItem.quantidade +' - '+ pedidoItem.produto.nome"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </template>
        <template v-slot:no-data>
          <nodata></nodata>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mdiPencil, mdiDelete } from '@mdi/js'
import nodata from '../../components/no-data.vue'

export default {
  components: {
    nodata,
  },
  setup() {
    const statusColor = {
      Liberado: 'primary',
      Enviado: 'success',
      Cancelado: 'error',
      Preparando: 'warning',
      Realizado: 'info',
      Entreque: 'Entreque',
      Aberto: 'Aberto',
    }

    return {
      statusColor,
    }
  },
  data: () => ({
    datasfiltros: ['2022-05-29', '2022-05-31'],
    filtroStatus: [],
    nome: '',
    dialog: false,
    dialogDelete: false,
    icons: {
      mdiPencil,
      mdiDelete,
    },
    headers: [
      {
        text: 'Data',
        align: 'start',
        sortable: false,
        value: 'data_pedido',
      },
      {
        text: 'Número Pedido',
        sortable: false,
        value: 'numero',
      },
      {
        text: 'Status',
        sortable: false,
        value: 'status',
      },
      {
        text: 'Cliente',
        sortable: false,
        value: 'User.nome',
      },
      {
        text: 'Itens',
        value: 'itens',
        sortable: false,
      },
    ],
    pedidoItems: [],
    editedIndex: -1,
    editedItem: {
      nome: '',
      descricao: '',
      ativo: true,
    },
    defaultItem: {
      nome: '',
      ativo: true,
    },
  }),

  computed: {
    ...mapState('pedido', ['pedidos']),
    ...mapState('categoria', ['categorias']),
    formTitle() {
      return this.editedIndex === -1 ? 'Novo' : 'Editar'
    },
  },

  mounted() {
    this.ActionListPedidoFiltro({
      mesano: 0,
      filtro: {
        inicial: 'hoje',
        final: 'hoje',
      },
    })
  },
  created() {
    this.initialize()
  },
  methods: {
    ...mapActions('pedido', ['ActionListPedidoFiltro']),
    initialize() {
      console.log('initialize')
      this.ActionListPedidoFiltro({
        mesano: 0,
        filtro: {
          inicial: 'hoje', final: 'hoje',
        },
      })
    },
    zeroPad(num, places) {
      const zero = places - num.toString().length + 1

      return Array(+(zero > 0 && zero)).join('0') + num
    },
    FormatData(data) {
      if (data) {
        return `${data.split('-')[2]}/${data.split('-')[1]}/${data.split('-')[0]}`
      }

      return ''
    },
    Filtrar() {
      console.log('Filtrar')
      this.ActionListPedidoFiltro({
        mesano: 0,
        filtro: {
          inicial: this.datasfiltros[0],
          final: this.datasfiltros[1],
          status: this.filtroStatus,
        },
      })
    },

    FiltrarStatus(status) {
      if (this.filtroStatus.indexOf(status) !== -1) {
        const index = this.filtroStatus.indexOf(status)
        if (index !== -1) {
          this.filtroStatus.splice(index, 1)
        }
      } else {
        this.filtroStatus.push(status)
      }
    },

    // eslint-disable-next-line no-unused-vars
    Selecionado(status) {
      if (this.filtroStatus.indexOf(status) !== -1) {
        return 'success'
      }

      return 'info'
    },

    editItem(item) {
      console.log('editItem')
      this.editedIndex = item.id
      // eslint-disable-next-line prefer-object-spread
      this.editedItem = Object.assign({
      }, item)
      this.dialog = true
    },

    deleteItem(item) {
      console.log('deleteItem')
      this.editedIndex = item.id
      // eslint-disable-next-line prefer-object-spread
      this.editedItem = Object.assign({
      }, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      console.log('deleteItemConfirm', this.editedIndex)
      this.ActionDeletePedido({
        id: this.editedIndex,
      })
      this.closeDelete()
    },

    close() {
      console.log('close')
      this.dialog = false
      this.$nextTick(() => {
        // eslint-disable-next-line prefer-object-spread
        this.editedItem = Object.assign({
        }, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      console.log('closeDelete')
      this.dialogDelete = false
      this.$nextTick(() => {
        // eslint-disable-next-line prefer-object-spread
        this.editedItem = Object.assign({
        }, this.defaultItem)
        this.editedIndex = -1
        this.initialize()
      })
    },

    save() {
      console.log('save', this.editedItem)
      if (!this.editedItem.id) {
        this.ActionCriarPedido({
          pedido: this.editedItem,
        })
      } else {
        this.ActionUpdatePedido({
          id: this.editedIndex,
          pedido: this.editedItem,
        })
      }
      console.log('add ', this.editedItem)
      this.initialize()
      this.close()
    },
  },
}
</script>
<style scoped></style>
