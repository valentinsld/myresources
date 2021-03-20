export const state = () => ({
  about: null
})

export const mutations = {
  setData (state, { slug, data }) {
    state[slug] = data
    console.log(slug, data)
  }
}

export const actions = {
  async getPage ({ commit }, slug) {
    const response = await this.$dataApi.getPage(slug)

    if (!response.ok) {
      // eslint-disable-next-line
      console.error(response.status, response.statusText)

      this.$router.push({
        path: '/error',
        name: 'error',
        params: {
          statusCode: response.status,
          message: response.statusText
        }
      })
    } else {
      commit('setData', { slug, data: response.json })
    }
  }
}
