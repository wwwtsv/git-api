<template>
  <div class="Breadcrumbs">
    <ul class="Breadcrumbs-List">
      <li v-for="(elem, index) in breadcrumbs" :key="index" class="Breadcrumbs-Elem">
        <router-link class="Breadcrumbs-Link" :to="{ path: `/${elem}` }">
          {{ elem }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const route = useRoute();

    const pathToDirectory = route.fullPath.match(/tree\/(.+)+/);
    const breadcrumbs = pathToDirectory[1].split("/");

    return {
      router,
      breadcrumbs,
    };
  },
});
</script>

<style lang="scss" scoped>
.Breadcrumbs {
  padding-top: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #e5e5e5;
  &-List {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  &-Elem {
    position: relative;
    margin-right: 36px;
    &:before {
      content: "/";
      position: absolute;
      top: 0;
      bottom: 0;
      right: -18px;
      margin: auto;
    }
    &:last-child {
      margin-right: 0;
      &:before {
        display: none;
      }
    }
  }
  &-Link {
    text-decoration: none;
    color: #7f8285;
    transition: ease 0.2s;
    &:hover {
      color: #000;
    }
  }
}
</style>
