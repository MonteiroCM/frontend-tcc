<template>
  <div>
    <v-card>
      <v-data-table
        :headers="headers"
        :items="produtos"
        sort-by="nome"
        class="elevation-1"
        :footer-props="{
          showFirstLastPage: true,
          'items-per-page-text': 'Itens por página',
        }"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Produtos</v-toolbar-title>
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
                        <div>
                          <div v-if="currentFile">
                            <div>
                              <v-progress-linear
                                v-model="progress"
                                color="light-blue"
                                height="25"
                                reactive
                              >
                                <strong>{{ progress }} %</strong>
                              </v-progress-linear>
                            </div>
                          </div>

                          <v-row no-gutters justify="center" align="center">
                            <v-col cols="8">
                              <v-file-input
                                show-size
                                label="File input"
                                @change="selectFile"
                              ></v-file-input>
                            </v-col>
                          </v-row>

                          <v-alert v-if="message" border="left" color="blue-grey" dark>
                            {{ message }}
                          </v-alert>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.nome"
                          label="Nome"
                          outlined
                          dense
                          placeholder="Nome Produto"
                          hide-details
                          full-width
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-text-field
                          v-model="editedItem.descricao"
                          label="Descrião"
                          outlined
                          dense
                          placeholder="Descrição do Produto"
                          hide-details
                          full-width
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-select
                          v-model="editedItem.categoria_id"
                          nome="categoria"
                          label="nome"
                          :items="categorias"
                          item-text="nome"
                          item-value="id"
                        ></v-select>
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
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mdiPencil, mdiDelete } from '@mdi/js'
import nodata from '../../components/no-data.vue'
import UploadService from '../../services/UploadFilesService'

export default {
  components: {
    nodata,
  },
  data: () => ({
    currentFile: undefined,
    progress: 0,
    message: '',
    nome: '',
    dialog: false,
    dialogDelete: false,
    icons: {
      mdiPencil,
      mdiDelete,
    },
    headers: [
      {
        text: 'Nome',
        align: 'start',
        sortable: false,
        value: 'nome',
      },
      {
        text: 'Descrição',
        sortable: false,
        value: 'descricao',
      },
      {
        text: 'Categoria',
        sortable: false,
        value: 'categorias.nome',
      },
      {
        text: 'Status', value: 'ativo',
      },
      {
        text: 'Actions', value: 'actions', sortable: false,
      },
    ],
    produtoItems: [],
    editedIndex: -1,
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
  }),

  computed: {
    ...mapState('produto', ['produtos', 'produto']),
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
    this.ActionListProduto({
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
    ...mapActions('produto', ['ActionListProduto', 'ActionCriarProduto', 'ActionDeleteProduto', 'ActionUpdateProduto']),
    ...mapActions('categoria', ['ActionListCategoria']),
    selectFile(file) {
      this.progress = 0
      this.currentFile = file
    },
    upload(nome) {
      console.log('upload - app -', this.currentFile)
      UploadService.upload(this.currentFile, event => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      }, nome)
        .then(response => {
          this.message = response.data.message

          return this.message
        })
        .then(files => {
          this.fileInfos = files.data
          this.initialize()
          this.close()
        })
        .catch(() => {
          this.progress = 0
          this.message = 'Could not upload the file!'
          this.currentFile = undefined
        })
    },
    initialize() {
      console.log('initialize')
      this.ActionListProduto({
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
      this.ActionDeleteProduto({
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
      if (!this.currentFile) {
        this.message = 'Selecione um arquivo!'

        return
      }

      this.message = ''

      if (!this.editedItem.id) {
        const extencao = this.currentFile.name.split('.')
        const ext = extencao[extencao.length - 1]

        this.editedItem.imagem = ext

        this.ActionCriarProduto({
          produto: this.editedItem,
        }).then(response => {
          console.log('response.data ->', this.produto, response)
          this.upload(this.produto.id)
        })
      } else {
        this.ActionUpdateProduto({
          id: this.editedIndex, produto: this.editedItem,
        })
      }

      console.log('add > ', this.produto)
    },
  },
}
</script>
<style scoped></style>
