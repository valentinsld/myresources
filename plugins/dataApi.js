const RESTLINK = 'http://myresources.local/wp-json/'
const ENDPOINT = RESTLINK + 'better-rest-endpoints/v1/'

export default function (context, inject) {
  const header = {
    method: 'GET',
    headers: { 'Content-type': 'application/json;charset=UTF-8' }
  }

  inject('dataApi', {
    getPage,
    getHeader,
    getFooter
  })

  async function getPage (slug) {
    try {
      return unWrap(await fetch(
        ENDPOINT + slug, header
      ))
    } catch (error) {
      return getErrorResponse(error)
    }
  }

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
