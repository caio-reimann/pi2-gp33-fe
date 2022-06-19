<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary">
      <b-navbar-brand href="#">
        PI2 - Grupo 33
      </b-navbar-brand>
      <b-button-group size="sm" class="mr-3">
        <b-button variant="warning" @click="aumentarFonte">
          A+
        </b-button>
        <b-button variant="warning" @click="diminuirFonte">
          A-
        </b-button>
      </b-button-group>
      <b-navbar-toggle target="nav-collapse" />

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item-dropdown text="Pesquisas">
            <b-dropdown-item @click="carregaCarregarPesquisa">
              Incluir
            </b-dropdown-item>
            <b-dropdown-item @click="carregaPesquisaView">
              Visualizar
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>{{ $auth.user }}</em>
            </template>
            <b-dropdown-item @click="logout">
              Sair
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-container>
      <b-row>
        <b-col>
          <div v-if="paginas.PesquisaView">
            <PesquisaView />
          </div>
          <div v-if="paginas.CarregarPesquisa">
            <CarregarPesquisa />
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>

import PesquisaView from '~/components/PesquisaView.vue'
import CarregarPesquisa from '~/components/CarregarPesquisa.vue'

export default {
  name: 'IndexPage',
  components: { PesquisaView, CarregarPesquisa },
  data () {
    return {
      paginas: {
        PesquisaView: false,
        CarregarPesquisa: false
      },
      fontSize: 14
    }
  },
  async fetch () {
    await this.alteraFonte()
  },
  methods: {
    async alteraFonte () {
      this.fontSize = await this.$store.state.font.font_size
      document.getElementsByTagName('html')[0].style.fontSize = this.fontSize + 'px'
    },
    async logout () {
      try {
        await this.$auth.logout()
      } catch (error) {
        console.log(error)
      }
      this.$router.push('/TheLogin')
    },
    carregaPesquisaView (pagina) {
      this.paginas.PesquisaView = true
      this.paginas.CarregarPesquisa = false
    },
    carregaCarregarPesquisa (pagina) {
      this.paginas.PesquisaView = false
      this.paginas.CarregarPesquisa = true
    },
    async aumentarFonte () {
      await this.$store.commit('font/AUMENTA_FONTE')
      await this.alteraFonte()
    },
    async diminuirFonte () {
      await this.$store.commit('font/DIMINUI_FONTE')
      await this.alteraFonte()
    }
  }
}
</script>
<style scoped>
  .navbar.navbar-dark.bg-primary{
      background-color: #5E33C0 !important;
  }
</style>
