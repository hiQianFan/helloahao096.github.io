<template>
  <nav v-if="processedHeaders.length > 0" class="post-outline" aria-label="页面大纲">
    <h2 class="outline-title">📑 页面大纲</h2>
    <ul class="outline-list">
      <PostOutlineItem
        v-for="(item, index) in processedHeaders"
        :key="index"
        :header="item"
      />
    </ul>
  </nav>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useData } from "vitepress";
import PostOutlineItem from "./PostOutlineItem.vue";

interface Header {
  level: number;
  title: string;
  slug: string;
  children?: Header[];
}

const pageData = useData();
const headers = pageData.page.value.headers;

// 递归构建嵌套的标题结构
const processedHeaders = computed(() => {
  if (!headers || headers.length === 0) return [];

  const result: Header[] = [];
  const stack: Header[] = []; // 用于跟踪当前层级

  for (const header of headers) {
    // 只处理 h2 到 h6 的标题
    if (header.level < 2 || header.level > 6) continue;

    const headerNode: Header = {
      level: header.level,
      title: header.title,
      slug: header.slug,
      children: []
    };

    // 找到合适的父节点
    while (stack.length > 0) {
      const top = stack[stack.length - 1];
      if (top.level < header.level) {
        // 当前标题是栈顶标题的子标题
        top.children = top.children || [];
        top.children.push(headerNode);
        stack.push(headerNode);
        break;
      } else {
        // 当前标题的层级小于等于栈顶，需要弹出栈
        stack.pop();
      }
    }

    // 如果栈为空，说明这是顶级标题（h2）
    if (stack.length === 0) {
      result.push(headerNode);
      stack.push(headerNode);
    }
  }

  return result;
});
</script>

<style scoped>
.post-outline {
  margin: 1.5rem 0 2rem;
  padding: 1.25rem 1.5rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-card);
  /* 正文模块不叠加阴影，层级由边框与表面色差表达。 */
}

.outline-title {
  margin: 0 0 1rem 0;
  padding: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  font-family: var(--font-sans);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.75rem;
}

.outline-list {
  margin: 0;
  padding: 0;
  list-style: none;
}


/* 底色、边框与 hover 均已由 token 在深色下自动切换。 */

/* 响应式设计 */
@media (max-width: 768px) {
  .post-outline {
    padding: 1rem 1.25rem;
    margin: 1rem 0 1.5rem;
  }

  .outline-title {
    font-size: 0.95rem;
    margin-bottom: 0.75rem;
  }
}
</style>
