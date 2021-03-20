<template>
  <header>
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
