<template>
  <div class="FileViewerCode">
    <pre>
      <code v-html="code" />
    </pre>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";

export default defineComponent({
  name: "FileViewerCode",
  props: {
    content: { type: String as PropType<string> },
  },
  setup(props) {
    const code = ref();
    const formatCode = (code = "") => {
      const assigmentOperator = (value: string) => `<span class="FileViewerCode-Assigment">${value}</span>`;
      const functionOperator = (value: string) => `<span class="FileViewerCode-Function">${value}</span>`;
      const url = (value: string) => `<span class="FileViewerCode-Url">${value}</span>`;
      const formattedCode = code
        .split("\n")
        .map((line) => {
          if (line.includes("repo")) {
            return line.replace("repo", assigmentOperator);
          }
          if (line.includes("function")) {
            return line.replace("function", assigmentOperator);
          }
          return line;
        })
        .join("\n");
      return formattedCode;
    };

    watch(
      () => props.content,
      (content) => {
        code.value = formatCode(content);
      }
    );
    return {
      code: computed(() => code.value),
    };
  },
});
</script>

<style lang="scss" scoped>
.FileViewerCode {
  font-size: 12px;
  font-family: monospace;

  > pre {
    margin: 0;
    > code {
      line-height: 24px;
      font-family: monospace;
    }
  }
  &-Assigment {
    color: #00234b;
    font-weight: bold;
  }
}
</style>
