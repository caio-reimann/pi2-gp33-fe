<template>
  <div>
    <h1 class="p-4" align="center">
      Carregar Pesquisas
    </h1>
    <b-container>
      <b-row>
        <b-col>
          <b-form>
            <b-alert v-if="error.msg != ''" class="mt-3 mb-3" show variant="warning">
              {{ error.msg }}
            </b-alert>
            <b-form-textarea
              id="campo_csv"
              v-model="campo_csv"
              :placeholder="campo_csv_placeholder"
              rows="3"
              max-rows="6"
              :state="campo_csv_state"
            />
            <b-button class="mt-2" block variant="success" @click="enviarDados">
              Carregar
            </b-button>
          </b-form>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div v-for="cadastrado in cadastrados" :key="cadastrado">
            <b-alert class="mt-3 mb-3" show variant="success">
              {{ cadastrado }}
            </b-alert>
          </div>
          <div v-for="rejeitado in rejeitados" :key="rejeitado">
            <b-alert class="mt-3 mb-3" show variant="warning">
              {{ rejeitado }}
            </b-alert>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      campo_csv: '',
      campo_csv_state: null,
      error: {
        msg: ''
      },
      campo_csv_placeholder: 'Inclua o conteúdo do arquivo CSV',
      cadastrados: [],
      rejeitados: []
    }
  },
  methods: {
    enviarDados () {
      this.rejeitados = []
      this.cadastrados = []
      try {
        const csv = this.$papa.parse(this.campo_csv, {
          delimiter: ','
        })

        if (csv.data.length > 1) {
          let pulaPrimeiraLinha = true
          csv.data.forEach((linha) => {
            if (pulaPrimeiraLinha === true) {
              pulaPrimeiraLinha = false
              return
            }

            if (linha.length === 11) {
              const dado = {
                autores: JSON.stringify(linha[0]),
                titulo: JSON.stringify(linha[1]),
                fonte_artigo: JSON.stringify(linha[2]),
                palavras_chave: JSON.stringify(linha[3]),
                resumo_artigo: JSON.stringify(linha[4]),
                endereco_autores: JSON.stringify(linha[5]),
                instituição_vinculo_autores: JSON.stringify(linha[6]),
                agencia_fomento: JSON.stringify(linha[7]),
                contagem_citacoes: linha[8],
                ano_publicacao: JSON.stringify(linha[9]),
                areas_pesquisa: JSON.stringify(linha[10])
              }
              this.$axios.$post('/api/pesquisas/carregar', dado)
                .then((res) => {
                  this.cadastrados.push('Registro Cadastrado com sucesso ! \n' + dado.titulo)
                })
                .catch(() => {
                  this.rejeitados.push('Registro rejeitado \n' + dado.titulo)
                })
            }
          })
          this.campo_csv_state = null
          this.campo_csv_placeholder = 'Inclua o conteúdo do arquivo CSV'
        } else {
          this.error.msg = 'Formato inválido'
        }
      } catch (e) {
        this.error.msg = 'Ocorreu um erro'
      }
    }
  }
}
</script>
