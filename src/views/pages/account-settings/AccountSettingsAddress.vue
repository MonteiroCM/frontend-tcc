<template>
  <v-card flat class="mt-5">
    <v-form>
      <div class="pa-3">
        <v-card-title class="flex-nowrap">
          <v-icon class="text--primary me-3">
            {{ icons.mdiKeyOutline }}
          </v-icon>
          <span class="text-break">Endereços para Entrega</span>
        </v-card-title>
        <v-card>
          <v-data-table
            :headers="headers"
            :items="enderecos"
            sort-by="nome"
            class="elevation-1"
            :footer-props="{
              showFirstLastPage: true,
              'items-per-page-text': 'Itens por página',
            }"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Endereços de {{ user.nome }}</v-toolbar-title>
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
                              v-model="editedItem.rua"
                              label="Rua"
                              outlined
                              dense
                              placeholder="Rua"
                              hide-details
                              full-width
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.numero"
                              label="Número"
                              outlined
                              dense
                              placeholder="Número"
                              hide-details
                              full-width
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.cep"
                              label="Cep"
                              outlined
                              dense
                              placeholder="C.E.P"
                              hide-details
                              full-width
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.bairro"
                              label="bairro"
                              outlined
                              dense
                              placeholder="Bairro"
                              hide-details
                              full-width
                            ></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col>
                            <v-text-field
                              v-model="editedItem.cidade"
                              label="Cidade"
                              outlined
                              dense
                              placeholder="Cidade"
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
            <template v-slot:no-data>
              <nodata></nodata>
            </template>
          </v-data-table>
        </v-card>
      </div>
    </v-form>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiKeyOutline, mdiLockOpenOutline, mdiEyeOffOutline, mdiEyeOutline, mdiPencil, mdiDelete } from '@mdi/js'
import { mapActions, mapState } from 'vuex'
import nodata from '../../../components/no-data.vue'

export default {
  components: {
    nodata,
  },
  computed: {
    ...mapState('endereco', ['enderecos', 'endereco']),
    ...mapState('auth', ['user']),
    formTitle() {
      return this.editedIndex === -1 ? 'Novo' : 'Editar'
    },
  },
  setup() {
    return {
      dialog: false,
      dialogDelete: false,
      editedItem: {
        imagem: '',
        nome: '',
        descricao: '',
        ativo: true,
      },
      defaultItem: {
        imagem: '',
        nome: '',
        ativo: true,
      },
      headers: [
        {
          text: 'Rua',
          align: 'start',
          sortable: false,
          value: 'rua',
        },
        {
          text: 'Número',
          sortable: false,
          value: 'numero',
        },
        {
          text: 'Bairro',
          sortable: false,
          value: 'bairro',
        },
        {
          text: 'Status',
          value: 'ativo',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
        },
      ],
      icons: {
        mdiKeyOutline,
        mdiLockOpenOutline,
        mdiEyeOffOutline,
        mdiEyeOutline,
        mdiPencil,
        mdiDelete,
      },
    }
  },
  created() {
    this.initialize()
  },
  methods: {
    ...mapActions('endereco', [
      'ActionListEndereco',
      'ActionCriarEndereco',
      'ActionDeleteEndereco',
      'ActionUpdateEndereco',
    ]),
    initialize() {
      console.log('initialize')
      this.ActionListEndereco({
        mesano: 0,
      })
    },
    selectFile(file) {
      this.progress = 0
      this.currentFile = file
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
      console.log('deleteItemConfirm - endereco', this.editedIndex)
      this.ActionDeleteEndereco({
        id: this.editedIndex,
      })
      this.closeDelete()
    },

    close() {
      console.log('close')
      this.dialog = false
      this.initialize()
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
        console.log(this.editedItem)
        this.ActionCriarEndereco({
          endereco: this.editedItem,
        })
      } else {
        this.ActionUpdateEndereco({
          id: this.editedIndex, endereco: this.editedItem,
        })
      }
      console.log('add ', this.editedItem)
      this.initialize()
      this.close()
    },
  },
}
</script>

<style lang="scss" scoped>
.two-factor-auth {
  max-width: 25rem;
}
.security-character {
  position: absolute;
  bottom: -0.5rem;
}
</style>
