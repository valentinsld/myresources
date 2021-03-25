export const state = () => ({
  about: null,
  soon: null
})

export const mutations = {
  setData (state, { slug, data }) {
    state[slug] = data
  }
}

export const actions = {
  async getPage ({ commit, state }, slug) {
    if (state[slug]) {
      return
    }

    this.$loading?.start()
    const response = await this.$dataApi.getPage(slug)
    this.$loading?.finish()

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
