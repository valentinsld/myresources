export const state = () => ({})

export const mutations = {
  async getData (state) {
    const response = await this.$dataApi.getHome()

    if (!response.ok) {
      console.error(response.status, response.statusText)

      this.$router.push({
        path: '/error',
        name: 'error',
        params: {
          statusCode: response.status,
          message: response.statusText
        }
      })
    }

    state = response.json
  }
}
