<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">
        PI2 - Grupo 33
      </b-navbar-brand>

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
              <em>Usuário</em>
            </template>
            <b-dropdown-item href="#">
              Meus dados
            </b-dropdown-item>
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
      }
    }
  },
  methods: {
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
    }
  }
}
</script>
