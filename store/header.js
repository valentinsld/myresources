export const state = () => ({
  links: []
})

export const mutations = {
  setData (state, links) {
    state.links = links
    // console.log('LINKS !!!', state.links)
  }
}

export const actions = {
  async getData ({ commit }) {
    const response = await this.$dataApi.getHeader()

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
      commit('setData', response.json)
    }
  }
}
