<template>
  <div class="d-flex justify-content-center align-items-center">
    <b-card
      title="Cadastro"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
          <b-alert v-if="error.msg != ''" show variant="warning">
            {{ error.msg }}
          </b-alert>
          <b-alert v-if="success.msg != ''" show variant="success">
            {{ success.msg }}
          </b-alert>
          <b-form-group
            id="input-group-username"
            label="Usuário:"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="Usuário"
              required
            />
          </b-form-group>
          <b-form-group
            id="input-group-email"
            label="Email: "
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="Email:"
              required
            />
          </b-form-group>
          <b-form-group id="input-group-password" label="Senha:" label-for="password">
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="Senha"
              required
            />
          </b-form-group>
          <b-form-group id="input-group-csenha" label="Confirmar Senha:" label-for="input-csenha">
            <b-form-input
              id="csenha"
              v-model="form.cpassword"
              type="password"
              placeholder="Confirmar Senha"
              required
            />
            <b-row align-h="end">
              <b-col class="mt-2" align="right">
                <b-button type="submit" variant="primary">
                  Cadastrar
                </b-button>
              </b-col>
            </b-row>
          </b-form-group>
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
        password: '',
        email: '',
        cpassword: ''
      },
      error: {
        msg: ''
      },
      success: {
        msg: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.form.cpassword !== this.form.password) {
        this.error.msg = 'As senha não são iguais'
        return
      }
      try {
        await this.$axios.$post('api/user/', this.form)
        try {
          await this.$auth
            .loginWith('local', {
              data: {
                username: this.form.username,
                password: this.form.password
              }
            })
          this.$router.push('/')
        } catch (error) {
          if (error.response.status === 401) {
            this.error.msg = error.response.data.detail
          }
        }
      } catch (error) {
        this.error.msg = error.response.data
      }
    },
    onReset () {
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>
