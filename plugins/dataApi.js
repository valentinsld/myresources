const RESTLINK = 'http://myresources.local/wp-json/'
const ENDPOINT = RESTLINK + 'better-rest-endpoints/v1/'

export default function (context, inject) {
  const header = {
    method: 'GET',
    headers: { 'Content-type': 'application/json;charset=UTF-8' }
  }

  inject('dataApi', {
    getHeader,
    getFooter,
    getPage,
    getCategories,
    getAllResources,
    getResourcesByCategorie,
    getResourceBySlug
  })

  async function getHeader () {
    try {
      return unWrap(await fetch(
        ENDPOINT + 'menus/menu-1-eng', header
      ))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getFooter () {
    try {
      return unWrap(await fetch(
        ENDPOINT + 'menus/footer', header
      ))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getPage (slug) {
    try {
      return unWrap(await fetch(
        ENDPOINT + 'page/' + slug, header
      ))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getCategories () {
    try {
      return unWrap(await fetch(
        RESTLINK + 'wp/v2/res_categories?per_page=30', header
      ))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getAllResources () {
    try {
      return unWrap(await fetch(
        ENDPOINT + 'resources/?per_page=250', header
      ))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getResourcesByCategorie (categorie) {
    try {
      return unWrap(await fetch(
        ENDPOINT + 'categories/' + categorie, header
      ))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  async function getResourceBySlug (slug) {
    try {
      return unWrap(await fetch(
        ENDPOINT + 'resources/' + slug, header
      ))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

  //
  // HELP
  //
  async function unWrap (response) {
    const json = await response.json()
    const { ok, status, statusText } = response

    return {
      json,
      ok,
      status,
      statusText
    }
  }

  function getErrorResponse (error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {}
    }
  }
}
