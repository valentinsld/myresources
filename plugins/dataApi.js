const ENDPOINT = 'http://myresources.local/wp-json/better-rest-endpoints/v1/'

export default function (context, inject) {
  const headers = {
    aaa: 'aaa'
  }

  inject('dataApi', {
    getHome
  })

  async function getHome () {
    try {
      return unWrap(await fetch(
        ENDPOINT, { headers }
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
