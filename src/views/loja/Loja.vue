<template>
  <div>
    <v-row v-if="etapa == 0">
      <v-col>
        <v-card class="align-center">
          <div class="justify-space-between ">
            <div>
              <v-card-text class="text--primary text-base">
                <span class="pt-5">Carrinho</span>
                <span class="pt-5 pl-5 pr-5">{{ totalCarrinho }}</span>
                <v-divider></v-divider>
                <v-simple-table>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">
                          Item
                        </th>
                        <th class="text-left">
                          Quantidade
                        </th>
                        <th class="text-left">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(compra, index) in itemsComprados"
                        :key="index"
                      >
                        <td>{{ compra.produtos.nome }}</td>
                        <td>{{ compra.quantidade }}</td>
                        <td>{{ compra.valor * compra.quantidade }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn text color="primary" dark @click="finalizarCompra(itemsComprados, 1)">
                  <span class="ms-2">Proximo ></span>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="etapa == 1">
      <v-col>
        <v-card class="d-flex align-center">
          <div class="d-flex justify-space-between ">
            <div>
              <v-card-text class="text--primary text-base">
                <span class="pt-5">Escolher Endereço de entrega</span>
                <v-divider></v-divider>
                <v-list>
                  <v-list-item-group
                    v-model="model"
                    active-class="border"
                    color="indigo"
                  >
                    <v-list shaped>
                      <v-list-item-group
                        v-model="model"
                      >
                        <template v-for="(item, i) in enderecos">
                          <v-divider
                            v-if="!item"
                            :key="`divider-${i}`"
                          ></v-divider>
                          <v-list-item
                            v-else
                            :key="`item-${i}`"
                            :value="item"
                            active-class="deep-purple--text text--accent-4"
                            @click="selectEndereco(item)"
                          >
                            <template v-slot:default="{ active }">
                              <v-list-item-content>
                                <v-list-item-title v-text="item.rua + ' - ' + item.numero "></v-list-item-title>
                                <v-list-item-title v-text="item.bairro + ' - ' + item.cidade"></v-list-item-title>
                              </v-list-item-content>

                              <v-list-item-action>
                                <v-checkbox
                                  :input-value="active"
                                  color="deep-purple accent-4"
                                ></v-checkbox>
                              </v-list-item-action>
                            </template>
                          </v-list-item>
                        </template>
                      </v-list-item-group>
                    </v-list>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn text color="primary" dark @click="finalizarCompra(itemsComprados, 2)">
                  <span class="ms-2">Proximo ></span>
                </v-btn>
                <v-btn text color="primary" dark @click="CancelarCompra()">
                  <span class="ms-2">Cancelar</span>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="etapa == 2">
      <v-col>
        <v-card class="d-flex align-center">
          <div class="d-flex justify-space-between ">
            <div>
              <v-card-text class="text--primary text-base">
                <span class="pt-5">Escolher Forma de Pagamento</span>
                <v-divider></v-divider>
                <v-list>
                  <v-list-item-group
                    v-model="model"
                    active-class="border"
                    color="indigo"
                  >
                    <v-list-item
                      v-for="(item, i) in formasPagamento"
                      :key="i"
                      @click="selectFormaPagamento(item)"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="item.icon"></v-icon>
                      </v-list-item-icon>

                      <v-list-item-content>
                        <v-list-item-title v-text="item.nome"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn text color="primary" dark @click="finalizarCompra(itemsComprados, 3)">
                  <span class="ms-2">Fechar Compra</span>
                </v-btn>
                <v-btn text color="primary" dark @click="CancelarCompra()">
                  <span class="ms-2">Cancelar</span>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="etapa == 0">
      <v-col v-for="(itemvenda, index) in itemvendas" :key="index" sm="6" cols="12">
        <v-card class="d-flex align-center">
          <div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row">
            <div class="mx-auto">
              <v-img width="220" height="100%" :src="'http://18.117.219.250:5000/resources/static/assets/uploads/' + itemvenda.produtos.id + '.' + itemvenda.produtos.imagem"></v-img>
            </div>
            <v-divider :vertical="$vuetify.breakpoint.mdAndUp"></v-divider>
            <div>
              <v-card-title>
                {{ itemvenda.produtos.nome }}
              </v-card-title>
              <v-card-text>
                {{ itemvenda.produtos.descricao }}
              </v-card-text>
              <v-card-text class="text--primary text-base">
                <span>Tamanho :</span> <span class="font-weight-bold">{{ itemvenda.tamanhos.nome }}</span>
                <v-divider></v-divider>
                <span>Valor :</span> <span class="font-weight-bold">R$ {{ itemvenda.valor }}</span>
                <span class="pl-5">Quantidade :</span> <span class="font-weight-bold">R$ {{ itemvenda.valor }}</span>
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn text color="primary" dark @click="comprar(itemvenda)">
                  <v-icon>{{ icons.mdiCartPlus }}</v-icon>
                  <span class="ms-2">Colocar no carrinho</span>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="etapa == 4">
      <v-col>
        <v-card class="d-flex align-center">
          <div class="d-flex justify-space-between ">
            <div>
              <v-card-text class="text--primary text-base">
                <v-img width="220" height="100%" src="https://consorciomagalu.com.br/wp-content/uploads/2020/07/verificado-1.png"></v-img>
                <span class="pt-5">Parabéns, seu pedido foi realizado com sucesso!</span>
                <v-divider></v-divider>
                Obrigado
              </v-card-text>
              <v-card-actions class="d-flex justify-space-between dense">
                <v-btn text color="primary" dark @click="finalizarCompra(itemsComprados, 0)">
                  <span class="ms-2">Finalizar ></span>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { mdiChevronUp,
  mdiChevronDown,
  mdiCartPlus,
  mdiShareVariantOutline,
  mdiLockOpenOutline,
  mdiStarOutline,
  mdiAccountOutline,
  mdiTrendingUp,
  mdiHelpCircleOutline,
  mdiCreditCard,
  mdiCreditCardMarker,
  mdiCash } from '@mdi/js'

export default {
  data: () => ({
    formasPagamento: [
      {
        nome: 'Cartão de Credito',
        icon: mdiCreditCard,
      },
      {
        nome: 'Cartão de Debito',
        icon: mdiCreditCardMarker,
      },
      {
        nome: 'Dinheiro',
        icon: mdiCash,
      },
    ],
    itemsComprados: [],
    enderecoPagamento: {
    },
    formaPagamento: {
    },
    totalCarrinho: 0,
    etapa: 0,
    model: 1,
  }
  ),
  computed: {
    ...mapState('endereco', ['enderecos']),
    ...mapState('itemvenda', ['itemvendas']),
    ...mapState('auth', ['user']),
  },
  created() {
    this.initialize()
  },
  setup() {
    const isCardDetailsVisible = false

    return {
      isCardDetailsVisible,

      // icons
      icons: {
        mdiChevronUp,
        mdiChevronDown,
        mdiCartPlus,
        mdiShareVariantOutline,
        mdiLockOpenOutline,
        mdiStarOutline,
        mdiAccountOutline,
        mdiTrendingUp,
        mdiHelpCircleOutline,
        mdiCreditCard,
      },
    }
  },
  methods: {
    ...mapActions('itemvenda', ['ActionListItemVenda']),
    ...mapActions('pedido', ['ActionListPedido', 'ActionCriarPedido', 'ActionDeletePedido', 'ActionUpdatePedido']),
    ...mapActions('endereco', ['ActionListEndereco']),
    initialize() {
      console.log('initialize')
      this.ActionListItemVenda({
        mesano: 0,
      })
    },
    selectFormaPagamento(item) {
      this.formaPagamento = item
    },
    selectEndereco(item) {
      this.enderecoPagamento = item.id
    },
    comprar(item) {
      let tem = 0
      let novoItem = {
      }
      this.itemsComprados.forEach((element, index) => {
        if (element.id === item.id) {
          // eslint-disable-next-line no-param-reassign
          this.itemsComprados[index].quantidade += 1
          novoItem = this.itemsComprados[index]
          tem += 1
        }
      })

      if (tem === 0) {
        console.log('não tem')
        // eslint-disable-next-line no-param-reassign
        item.quantidade = 1
        this.itemsComprados.push(item)
      } else {
        const index = this.itemsComprados.indexOf(item)
        if (index !== -1) {
          this.itemsComprados.splice(index, 1)
          this.itemsComprados.push(novoItem)
        }
      }

      // eslint-disable-next-line radix
      this.totalCarrinho += parseInt(item.valor)
    },
    finalizarCompra(item, etapa) {
      if (etapa !== 3) {
        console.log(item)
        this.etapa = etapa

        if (etapa === 1) {
          this.ActionListEndereco({
            mesano: 0,
          })
        }
      } else {
        console.log(
          this.enderecoPagamento,
          {
            id_cliente: this.user.id,
            items: this.itemsComprados,
            endereco: this.enderecoPagamento,
            formapagamento: this.formaPagamento.nome,
          },
        )

        this.ActionCriarPedido({
          nome: {
            cliente_id: this.user.id,
            items: this.itemsComprados,
            endereco: this.enderecoPagamento,
            formapagamento: this.formaPagamento.nome,
          },
        })

        this.etapa = 4
        this.itemsComprados = []
      }
    },
    CancelarCompra() {
      this.etapa = 0
      this.itemsComprados = []
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/plugins/vuetify/default-preset/preset/mixins.scss';

.border {
border: 2px dashed orange;
}
.avatar-center {
  top: -2rem;
  left: 1rem;
  border: 3px solid white;
  position: absolute;
}

// membership pricing
@include theme--child(memberpricing-bg) using ($material) {
  background-color: rgba(map-deep-get($material, 'primary-shade'), map-deep-get($material, 'states', 'hover'));
}

.memberpricing-bg {
  position: relative;
}
.membership-pricing {
  text-align: center;
  sup {
    font-size: 3.75rem;
    top: 9px;
  }
}
</style>
