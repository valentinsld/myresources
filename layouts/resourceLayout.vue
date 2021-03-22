<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'ResourceLayout',
  watch: {
    $route (to, from) {
      // update resources categorie
      const categorie = to.params.categorie
      this.$store.dispatch('resources/getResourcesByCategorie', categorie)
    }
  },
  beforeCreate () {
    this.$store.dispatch('resources/getCategories')

    const categorie = this.$route.params.categorie

    if (categorie) {
      this.$store.dispatch('resources/getResourcesByCategorie', categorie)
    }
  }
}
</script>
