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

    const response = await this.$dataApi.getCategories()

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
    if (!isEmpty(state.categories[categorie].resources)) {
      return
    }

    const response = await this.$dataApi.getResourcesByCategorie(categorie)
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
