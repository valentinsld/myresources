<template>
  <footer>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <NuxtLink v-if="link.path" :to="link.path">
          {{ link.title }}
        </NuxtLink>
        <a v-else :href="link.url">
          {{ link.title }}
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    links () {
      return this.$store.state.footer.links
    }
  },
  beforeCreate () {
    this.$store.dispatch('footer/getData')
  }
}
</script>
