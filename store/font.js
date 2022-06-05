export const state = () => ({
  font_size: 14
})

export const mutations = {
  AUMENTA_FONTE (state) {
    state.font_size += 2
  },
  DIMINUI_FONTE (state) {
    state.font_size -= 2
  }
}
