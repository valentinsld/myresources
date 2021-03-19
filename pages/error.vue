<template>
  <div>
    <h1>Error</h1>
    <p>
      {{ error.statusCode }} {{ error.message }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'Error',
  data () {
    return {
      error: {
        statusCode: '',
        message: ''
      }
    }
  },
  head () {
    return {
      title: 'Error'
    }
  },
  created () {
    this.$data.error = this.$route.params
  }
}
</script>
