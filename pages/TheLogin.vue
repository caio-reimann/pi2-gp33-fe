<template>
  <div class="d-flex justify-content-center align-items-center">
    <b-card
      title="Autenticação"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-alert v-if="error.msg != ''" show variant="warning">
            {{ error.msg }}
          </b-alert>
          <b-form-group
            id="input-group-1"
            label="Usuário: "
            label-for="input-1"
          >
            <b-form-input
              id="email"
              v-model="form.username"
              type="text"
              placeholder="Usuário"
              required
            />
          </b-form-group>

          <b-form-group id="input-group-2" label="Senha:" label-for="input-2">
            <b-form-input
              id="senha"
              v-model="form.password"
              type="password"
              placeholder="Senha"
              required
            />
          </b-form-group>
          <b-row>
            <b-col align="left">
              <b-button type="button" variant="info" @click="registrar">
                Cadastrar
              </b-button>
            </b-col>
            <b-col align="right">
              <b-button type="submit" variant="primary">
                Entrar
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {

  auth: false,

  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      error: {
        msg: ''
      }
    }
  },
  methods: {
    registrar () {
      this.$router.push('/TheRegister')
    },
    onSubmit () {
      this.$auth
        .loginWith('local', {
          data: this.form
        })
        .then(() => {
          this.$router.push('/')
        })
        .catch((error) => {
          console.log(error)
          // if (error.response.status === 401) {
          //   this.error.msg = error.response.data.detail
          // }
        })
    },
    onReset () {
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>
