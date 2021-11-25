<template>
  <div>
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
        <template v-slot:[`item.actions`]="{ item }">
          <v-chip color="info" text-color="white" @click="changeStatus('Preparando', item)">
            Iniciar Preparo
          </v-chip>

          <v-chip color="success" text-color="white" @click="changeStatus('Liberado', item)">
            Liberado
          </v-chip>

          <v-chip color="success" text-color="white" @click="changeStatus('Enviado', item)">
            Enviado
          </v-chip>

          <v-chip color="error" text-color="white" @click="changeStatus('Cancelado', item)">
            Cancelar
          </v-chip>
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
    }

    return {
      statusColor,
    }
  },
  data: () => ({
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
        text: 'Actions',
        value: 'actions',
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

  watch: {
    dialog(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.close()
    },
    dialogDelete(val) {
      // eslint-disable-next-line no-unused-expressions
      val || this.closeDelete()
    },
  },
  mounted() {
    this.ActionListPedido({
      mesano: 0,
    })
    this.ActionListCategoria({
      mesano: 0,
    })
  },
  created() {
    this.initialize()
  },
  methods: {
    ...mapActions('pedido', ['ActionListPedido', 'ActionCriarPedido', 'ActionDeletePedido', 'ActionUpdatePedido']),
    ...mapActions('categoria', ['ActionListCategoria']),
    initialize() {
      console.log('initialize')
      this.ActionListPedido({
        mesano: 0,
      })
    },

    zeroPad(num, places) {
      const zero = places - num.toString().length + 1

      return Array(+(zero > 0 && zero)).join('0') + num
    },

    changeStatus(status, item) {
      // eslint-disable-next-line no-param-reassign
      item.status = status

      this.ActionUpdatePedido({
        id: this.editedIndex,
        pedido: item,
      })
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
