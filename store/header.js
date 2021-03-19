export const state = () => ({})

export const mutations = {
  async getData (state) {
    const response = await this.$dataApi.getHome()

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
      state = response.json
      // console.log(state)
    }
  }
}
