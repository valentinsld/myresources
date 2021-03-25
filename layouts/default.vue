<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  name: 'Default',
  beforeCreate () {
    this.$nextTick(() => {
      this.$nuxt.$store.$loading = this.$nuxt.$loading
    })
  }
}
</script>
