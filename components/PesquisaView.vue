<template>
  <div>
    <h1 class="p-4" align="center">
      Lista de Pesquisas
    </h1>
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button v-b-toggle.accordion-1 block variant="secondary">
            Filtros
          </b-button>
        </b-card-header>
        <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
          <b-card-body>
            <b-table-simple
              hover
              small
              responsive
              bordered
              style="width: auto;"
            >
              <b-thead head-variant="light">
                <b-tr>
                  <b-th>
                    Valor
                  </b-th>
                  <b-th>
                    Coluna
                  </b-th>
                  <b-th>
                    Tipo
                  </b-th>
                  <b-th style="max-width: 80px;" />
                </b-tr>
              </b-thead>
              <b-tbody>
                <b-tr v-for="(filtro, index) in filtros" :key="index">
                  <b-td>{{ filtro.valor }}</b-td>
                  <b-td>{{ filtro.campo }}</b-td>
                  <b-td>{{ filtro.tipo }}</b-td>
                  <b-td style="width: 60px; text-align: center;">
                    <b-button variant="danger" @click="removeFiltro(index)">
                      X
                    </b-button>
                  </b-td>
                </b-tr>
              </b-tbody>
            </b-table-simple>
            <b-form inline>
              <label class="sr-only" for="filtro-valor">Valor</label>
              <b-form-input
                id="filtro-valor"
                v-model="valorFiltro"
                class="mb-2 mr-sm-2 mb-sm-0"
                placeholder="Filtrar por"
              />
              <b-form-select id="filtro-coluna" v-model="selectedColuna" class="mb-2 mr-sm-2 mb-sm-0" :options="colunasFiltro" />
              <b-form-select id="filtro-tipo" v-model="selectedTipo" class="mb-2 mr-sm-2 mb-sm-0" :options="tiposFiltro" />
              <b-button variant="primary" @click="incluiFiltro">
                Filtrar
              </b-button>
            </b-form>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
    <b-table-simple
      hover
      striped
      responsive
      bordered
      style="background-color: #FFF"
    >
      <b-thead head-variant="light">
        <b-tr>
          <b-th v-for="coluna in colunas" :key="coluna">
            {{ coluna }}
          </b-th>
          <b-th />
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="item in items" :key="item.id">
          <b-td v-for="coluna in colunas" :key="coluna">
            <span :alt="item[coluna]" :title="item[coluna]">{{ reduzTexto(item[coluna]) }}</span>
          </b-td>
          <b-td style="width: 60px; text-align: center;">
            <b-button variant="danger" @click="removeRegistro(item.id)">
              X
            </b-button>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <b-alert show class="totalRegistros">
      Total: {{ totalRegistros }}
    </b-alert>
    <b-pagination
      v-model="pagina"
      :total-rows="totalRegistros"
      :per-page="porPagina"
      aria-controls="items"
      align="center"
      @change="mudaPagina"
    />
  </div>
</template>
<script>

export default {
  data () {
    return {
      items: [],
      colunas: [],
      valorFiltro: '',
      selectedTipo: null,
      selectedColuna: null,
      colunasFiltro: [
        { value: null, text: 'Selecione uma coluna' }
      ],
      tiposFiltro: [
        { value: null, text: 'Selecione uma tipo' },
        { value: 'icontains', text: 'Contém' },
        { value: 'istartswith', text: 'Começa com' },
        { value: 'iendswith', text: 'Termina com' }
      ],
      filtros: [],
      totalRegistros: 0,
      porPagina: 25,
      pagina: 1
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async removeRegistro (id) {
      await this.$axios.$delete('/api/pesquisa/' + id)
        .then(async (res) => {
          console.log(res)
          await this.getData()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    removeFiltro (index) {
      this.filtros.splice(index, 1)
      this.getData()
    },
    incluiFiltro () {
      if (this.selectedColuna && this.valorFiltro && this.selectedTipo) {
        this.filtros.push({
          campo: this.selectedColuna,
          valor: this.valorFiltro,
          tipo: this.selectedTipo
        })
        this.selectedColuna = null
        this.valorFiltro = null
        this.selectedTipo = null
        this.getData()
      }
    },
    async getData () {
      try {
        const dados = await this.$axios.$post('/api/pesquisas', {
          filtros: this.filtros,
          pagina: this.pagina,
          quantidade: this.porPagina
        })

        this.items = dados.registros
        dados.registros.forEach((dado) => {
          if (this.colunas.length === 0) {
            Object.keys(dado).forEach((key) => {
              this.colunas.push(key)
              this.colunasFiltro.push({
                value: key, text: key
              })
            })
          }
        })
        this.totalRegistros = dados.total
        this.porPagina = dados.porPagina
        this.pagina = dados.pagina
      } catch (error) {
        console.log(error)
      }
    },
    carregaPagina (pagina) {
      this.paginas.PesquisaView = true
    },
    mudaPagina (pa) {
      this.pagina = pa
      this.getData()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    reduzTexto (texto) {
      return texto.length > length
        ? texto.substring(0, 20) + '...'
        : texto
    }
  }
}
</script>
<style>
.totalRegistros{
  font-weight: bold;
  text-align: center;
}
</style>
