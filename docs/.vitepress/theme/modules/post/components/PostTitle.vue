<template>
  <section class="post-title">
    <h1 class="title">{{ title }}</h1>

    <blockquote v-if="description" class="description">
      <p class="description-text">{{ description }}</p>
    </blockquote>

    <section
      v-if="publishDate || tags.length"
      class="meta-block"
    >
      <div v-if="publishDate" class="meta-row">
        <span class="meta-leading">
          <CalendarDays class="meta-icon" aria-hidden="true" />
          <span class="meta-label">发布时间</span>
        </span>
        <span class="meta-value">{{ publishDate }}</span>
      </div>

      <div v-if="tags.length" class="meta-row meta-row-tags">
        <span class="meta-leading">
          <Tags class="meta-icon" aria-hidden="true" />
          <span class="meta-label">标签</span>
        </span>
        <div class="meta-value">
          <a
            v-for="tag in tags"
            :key="tag"
            :href="getTagLink(tag)"
            class="meta-tag"
          >
            {{ tag }}
          </a>
        </div>
      </div>

      <div v-if="isPostPage" class="meta-row meta-row-actions">
        <span class="meta-leading">
          <Share2 class="meta-icon" aria-hidden="true" />
          <span class="meta-label">引用</span>
        </span>
        <PostActions />
      </div>
    </section>
  </section>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import { useData, withBase } from "vitepress";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { CalendarDays, Share2, Tags } from "@lucide/vue";
import PostActions from "./PostActions.vue";

// 启用 dayjs 时区插件
dayjs.extend(utc);
dayjs.extend(timezone);

// 使用响应式引用，而不是 .value 快照
const { page } = useData();
const isPostPage = computed(() =>
  (page.value.relativePath || "").startsWith("posts/")
);

// 使用 computed 确保响应式更新
const title = computed(() => page.value.title);
const description = computed(() => page.value.description);
const frontmatter = computed(() => page.value.frontmatter);

// 计算发布时间（YYYY-MM-DD HH:mm:ss），若格式异常则回退原始值
// 输入时间视为 UTC+8（中国时区），直接格式化显示，不进行时区转换
const publishDate = computed(() => {
  const source = frontmatter.value?.date;
  if (!source) {
    return "";
  }
  // 将输入的日期字符串解析为 UTC+8 时区（Asia/Shanghai）
  // 这样即使系统时区不同，也能正确显示用户输入的中国时间
  const date = dayjs.tz(source, "Asia/Shanghai");
  return date.isValid() ? date.format("YYYY-MM-DD HH:mm:ss") : String(source);
});

// 规范化标签数据，兼容 string / array
const tags = computed(() => {
  const raw = frontmatter.value?.tags;
  if (Array.isArray(raw)) {
    return raw;
  }
  if (typeof raw === "string") {
    return raw
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
});

// 获取标签链接
const getTagLink = (tag: string) => {
  return withBase(`/posts/?tag=${encodeURIComponent(tag)}`);
};
</script>
<style scoped>
.title {
  color: var(--color-primary);
  font-weight: 500;
  font-size: 2.4rem;
  margin: 0.35em 0 0.25em;
  line-height: 1.25;
  font-family: var(--font-sans);
  text-transform: none;
  text-shadow: 0 0 18px rgba(8, 203, 0, 0.12);
}

.meta-block {
  margin-bottom: 1.5rem;
  padding: 1rem 0 1.15rem;
  border-bottom: 1px solid var(--color-border);
  display: grid;
  gap: 0.65rem;
}

.meta-row {
  display: grid;
  grid-template-columns: 6.25rem minmax(0, 1fr);
  align-items: center;
  column-gap: 0.75rem;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-text-gray);
}

.meta-leading {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
  color: var(--color-text-gray);
}

.meta-icon {
  width: 1rem;
  height: 1rem;
  stroke-width: 1.8;
  color: var(--color-text-gray);
  flex: 0 0 auto;
}

.meta-label {
  color: var(--color-text-gray);
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.meta-value {
  min-width: 0;
  color: var(--color-primary);
  font-weight: 600;
  letter-spacing: 0.05em;
}

.meta-row-tags .meta-value {
  display: flex;
  gap: 0.35rem;
  flex-wrap: wrap;
}

.meta-row-actions {
  align-items: center;
}

.meta-tag {
  padding: 0.1rem 0.5rem;
  border-radius: 999px;
  border: 1px solid rgba(8, 203, 0, 0.2);
  font-size: 0.75rem;
  color: var(--color-primary);
  background: rgba(8, 203, 0, 0.08);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-block;
}

.meta-tag:hover {
  background: rgba(8, 203, 0, 0.15);
  border-color: rgba(8, 203, 0, 0.4);
  transform: translateY(-1px);
}

.description {
  display: flex;
  align-items: flex-start;
  gap: 0.95rem;
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--color-primary);
  background: rgba(8, 203, 0, 0.06);
  border-radius: 0 12px 12px 0;
  font-family: var(--font-sans);
}

.description-text {
  margin: 0;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--color-text);
  opacity: 0.9;
}

:global(.dark) .description {
  background: rgba(8, 203, 0, 0.16);
}

:global(.dark) .meta-block {
  border-color: rgba(255, 255, 255, 0.08);
}

:global(.dark) .meta-tag {
  background: rgba(8, 203, 0, 0.2);
  border-color: rgba(8, 203, 0, 0.4);
  color: var(--color-bg);
}

@media (max-width: 640px) {
  .post-title {
    margin-bottom: 2rem;
  }

  .title {
    font-size: 1.75rem;
  }

  .meta-block {
    padding: 0.85rem 0 1rem;
  }

  .meta-row {
    grid-template-columns: 4.75rem minmax(0, 1fr);
    column-gap: 0.65rem;
    align-items: center;
    font-size: 0.8rem;
  }

  .meta-row-tags .meta-value {
    flex: 1 1 auto;
  }
}
</style>
