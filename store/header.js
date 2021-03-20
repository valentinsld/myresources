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
      // create path
      response.json.forEach((el) => {
        if (validURL(el.url) && el.url.includes('myresources.')) {
          const url = new URL(el.url)
          el.path = url.pathname
        }
      })

      commit('setData', response.json)
    }
  }
}

function validURL (str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i') // fragment locator
  return !!pattern.test(str)
}
