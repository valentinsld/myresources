export const state = () => ({
  links: []
})

export const mutations = {
  async getData (state) {
    const response = await this.$dataApi.getFooter()

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
      state.links = response.json
      // console.log('LINKS !!!', state.links)
    }
  }
}
