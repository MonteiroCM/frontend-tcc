<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="tamanhos"
        sort-by="nome"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': 'Itens por página',
        }"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Tamanho - Fator multiplicador</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                  Novo
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.nome"
                          label="Nome"
                          outlined
                          dense
                          placeholder="Nome Tamanho"
                          hide-details
                          full-width
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.porcentagem"
                          label="Porcentagem"
                          outlined
                          dense
                          placeholder="Nome Tamanho"
                          hide-details
                          full-width
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-checkbox v-model="editedItem.ativo" label=""></v-checkbox>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="600px">
              <v-card>
                <v-card-title class="text-h5">
                  Tem certeza de que deseja excluir este item?
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm">
                    OK
                  </v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.ativo`]="{ item }">
          <v-simple-checkbox v-model="item.ativo" disabled></v-simple-checkbox>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div>
            <v-icon color="info" x-large @click="editItem(item)">
              {{ icons.mdiPencil }}
            </v-icon>
            <v-icon color="error" x-large @click="deleteItem(item)">
              {{ icons.mdiDelete }}
            </v-icon>
          </div>
        </template>
        <template v-slot:[`item.porcentagem`]="{ item }">
          <div class="font-weight-semibold">
            <span class="text--primary text-base me-1">{{ item.porcentagem.toString() }}</span>
            <v-icon size="20" :color="item.porcentagem.toString().charAt(0) === '-' ? 'error' : 'success'">
              {{ item.porcentagem.toString().charAt(0) === '-' ? icons.mdiChevronDown : icons.mdiChevronUp }}
            </v-icon>
          </div>
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
import { mdiPencil, mdiDelete, mdiChevronUp, mdiChevronDown } from '@mdi/js'
import nodata from '../../components/no-data.vue'

export default {
  components: {
    nodata,
  },
  data: () => ({
    nome: '',
    dialog: false,
    dialogDelete: false,
    icons: {
      mdiPencil,
      mdiDelete,
      mdiChevronUp,
      mdiChevronDown,
    },
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome',
      },
      {
        text: 'Porcentegem', value: 'porcentagem',
      },
      {
        text: 'Status', value: 'ativo',
      },
      {
        text: 'Actions', value: 'actions', sortable: false,
      },
    ],
    tamanhoItems: [],
    editedIndex: -1,
    editedItem: {
      nome: '',
      porcentagem: 0,
      ativo: true,
    },
    defaultItem: {
      nome: '',
      ativo: true,
    },
  }),

  computed: {
    ...mapState('tamanho', ['tamanhos']),
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
    this.ActionListTamanho({
      mesano: 0,
    })
  },
  created() {
    this.initialize()
  },
  methods: {
    ...mapActions('tamanho', ['ActionListTamanho', 'ActionCriarTamanho', 'ActionDeleteTamanho', 'ActionUpdateTamanho']),
    initialize() {
      console.log('initialize')
      this.ActionListTamanho({
        mesano: 0,
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
      this.ActionDeleteTamanho({
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
      console.log('save')
      if (!this.editedItem.id) {
        this.ActionCriarTamanho({
          nome: this.editedItem,
        })
      } else {
        this.ActionUpdateTamanho({
          id: this.editedIndex, tamanho: this.editedItem,
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
