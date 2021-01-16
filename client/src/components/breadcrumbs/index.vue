<template>
  <div class="Breadcrumbs">
    <ul v-if="isTree" class="Breadcrumbs-List">
      <li v-for="(elem, index) in breadcrumbs" :key="index" class="Breadcrumbs-Elem">
        <div v-if="lastPath === elem" class="Breadcrumbs-CurrentDir">
          {{ elem }}
        </div>
        <router-link
          v-else
          class="Breadcrumbs-Link"
          :to="{
            path: `/file-list/${currentRepository}/${
              index === 0 ? '' : breadcrumbs.slice(0, index).join('/') + '/'
            }${elem}`,
          }"
        >
          {{ elem }}
        </router-link>
      </li>
    </ul>
    <ul v-else class="Breadcrumbs-List">
      <li class="Breadcrumbs-Elem">
        <div class="Breadcrumbs-CurrentDir">
          {{ currentRepository }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { isEmpty } from "lodash";
import { defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "Breadcrumbs",
  props: {
    currentRepository: { type: String as PropType<string>, default: () => "" },
    breadcrumbs: { type: Array as PropType<Array<string>>, default: () => null },
    lastPath: { type: String, default: () => "" },
  },
  setup(props) {
    const isTree = ref();
    watch(
      () => props.breadcrumbs,
      (newBreadcrumbs) => (isTree.value = !isEmpty(newBreadcrumbs))
    );
    return {
      isTree,
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
  &-CurrentDir {
    color: #000;
  }
}
</style>
