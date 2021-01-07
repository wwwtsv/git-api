<template>
  <div class="Layout">
    <header class="Header">
      <base-logo />
      <repo-drop-down />
    </header>
    <main class="Main">
      <router-view />
    </main>
    <footer class="Footer">
      <meta-info />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BaseLogo from '@components/BaseLogo/index.vue'
import RepoDropDown from '@components/RepoDropDown/index.vue'
import MetaInfo from '@components/MetaInfo/index.vue'

const Layout = defineComponent({
  components: {
    BaseLogo,
    RepoDropDown,
    MetaInfo
  }
})

export default Layout
</script>

<style scoped>

</style>
