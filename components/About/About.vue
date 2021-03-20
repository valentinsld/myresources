<template>
  <div v-if="about">
    <h1>
      {{ about.title }} + {{ about.author }}
    </h1>
  </div>
</template>

<script>
export default {
  name: 'About',
  computed: {
    about () {
      return this.$store.state.pages.about
    }
  },
  beforeCreate () {
    this.$store.dispatch('pages/getPage', 'about')
  }
}
</script>
