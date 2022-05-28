<template>
  <div class="d-flex justify-content-center align-items-center">
    <b-card
      title="Autenticação"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text>
        <b-form @submit.prevent="onSubmit" @reset="onReset">
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
          <b-button type="submit" variant="primary">
            Entrar
          </b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      await this.$axios.$post('/api/token/',
        {
          username: this.form.username,
          password: this.form.password
        }
      )
        .then(function (response) {
          console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    onReset () {
      this.form.username = ''
      this.form.password = ''
    }
  }
}
</script>
