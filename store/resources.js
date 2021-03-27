export const state = () => ({
  categories: {}
})

export const mutations = {
  setCategories (state, data) {
    state.categories = data
  },
  setResources (state, { categorie, data }) {
    state.categories[categorie].resources = data
  }
}

export const actions = {
  async getCategories ({ commit, state }) {
    if (!isEmpty(state.categories)) {
      return
    }

    this.$loading?.start()
    const response = await this.$dataApi.getCategories()
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
      const data = {}

      response.json.forEach((cat) => {
        cat.resources = {}
        data[cat.slug] = cat
      })

      commit('setCategories', data)
    }
  },

  // Resources
  async getResourcesByCategorie ({ commit, state }, categorie) {
    // if categories not load
    if (!(categorie in state.categories)) {
      await wait1second()
    }
    // if categorie exist
    if (!state.categories[categorie]) {
      this.$router.push('/resources')
      return
    }
    // if ressources loaded
    if (!isEmpty(state.categories[categorie].resources)) {
      return
    }

    this.$loading?.start()
    const response = await this.$dataApi.getResourcesByCategorie(categorie)
    this.$loading?.finish()
    // response = await this.$dataApi.getResourceBySlug(slug)

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
      const data = {}

      response.json.forEach((res) => {
        data[res.slug] = res
      })

      commit('setResources', { categorie, data })
    }
  }
}

function isEmpty (obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

function wait1second () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolved')
    }, 1000)
  })
}
