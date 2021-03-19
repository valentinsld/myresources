<template>
  <header>
    <p v-for="(link, index) in links" :key="index">
      {{ link.title }}
    </p>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    links () {
      return { ...this.$store.state.header.links }
    }
  }
}
</script>
