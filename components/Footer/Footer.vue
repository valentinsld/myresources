<template>
  <footer>
    <p v-for="(link, index) in links" :key="index">
      {{ link.title }}
    </p>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    links () {
      return { ...this.$store.state.footer.links }
    }
  }
}
</script>
