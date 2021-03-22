<template>
  <div>
    <h2>AsideCategorie</h2>
    <p v-for="(categorie, index) in categories" :key="'cat'+index">
      <NuxtLink :to="'/resources/'+categorie.slug">
        {{ categorie.name }}
      </NuxtLink>
    </p>
    <h2>resources</h2>
    <p v-for="(categorie, index) in resources" :key="'res'+index">
      {{ categorie.title }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AsideCategorie',
  computed: {
    categories () {
      return this.$store.state.resources.categories
    },
    resources () {
      const res = this.$store.state.resources.categories?.[this.$route.params.categorie]?.resources || []
      return res
    }
  }
}
</script>
