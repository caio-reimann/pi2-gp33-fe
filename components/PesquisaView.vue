<template>
  <div>
    <b-table
      striped
      hover
      responsive
      bordered
      :items="items"
      :per-page="0"
    />
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
      totalRegistros: 0,
      porPagina: 25,
      pagina: 1
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const dados = await this.$axios.$post('/api/pesquisas', {
          filtros: [
            // {
            //   campo: 'autores',
            //   valor: 'jo',
            //   tipo: 'contains'
            // },
            // {
            //   campo: 'titulo',
            //   valor: 'planning',
            //   tipo: 'iendswith'
            // }
          ],
          pagina: this.pagina,
          quantidade: this.porPagina
        })

        this.items = dados.registros
        console.log(dados.registros[0])
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
    }
  }
}
</script>
