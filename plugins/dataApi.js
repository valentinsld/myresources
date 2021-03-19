const ENDPOINT = 'http://myresources.local/wp-json/better-rest-endpoints/v1/'

export default function (context, inject) {
  const header = {
    method: 'GET',
    headers: { 'Content-type': 'application/json;charset=UTF-8' }
  }

  inject('dataApi', {
    getHome
  })

  async function getHome () {
    try {
      return unWrap(await fetch(
        ENDPOINT, header
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
