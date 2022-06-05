export const state = () => ({
  username: null
})

export const mutations = {
  SET_USERNAME (state, value) {
    state.username = value
  }
}
