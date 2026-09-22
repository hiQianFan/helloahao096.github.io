<template>
  <a :href="withBase(post.regularPath)" class="post-card">
    <div class="post-title" :title="post.frontMatter.title">
      {{ post.frontMatter.title }}
    </div>
    <div class="post-right">
      <div class="post-meta">
        <span class="post-meta-dot" aria-hidden="true"></span>
        <span class="post-meta-label">{{ post.lastUpdated ? "最近更新" : "发布于" }}</span>
        <time class="post-meta-value">{{ postDate }}</time>
        <span v-if="commentCount > 0" class="post-comment">
          {{ commentCount }} 条评论
        </span>
      </div>
      <div class="post-tags" v-if="postTags.length > 0">
        <span
          v-for="tag in postTags"
          :key="tag"
          class="post-tag"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { withBase } from "vitepress";
import { formatDateTimeNum } from "../../../core/utils/date";
import type { Post } from "../../../core/types";
import { useCommentCount } from "../../../shared/composables/useCommentCount";

interface Props {
  post: Post;
}

const props = defineProps<Props>();

const { getCount, store } = useCommentCount();
/** 从 store 响应式获取评论数；显式依赖 store.counts，确保异步加载完成后 UI 更新 */
const commentCount = computed(() => {
  void store.counts;
  return getCount(props.post.regularPath);
});

const postDate = computed(() =>
  formatDateTimeNum(props.post.lastUpdated || props.post.frontMatter.date || "").slice(0, 10),
);

// 获取文章标签
const postTags = computed(() => {
  const tags = props.post.frontMatter.tags;
  if (Array.isArray(tags)) {
    return tags.slice(0, 2);
  }
  return [];
});
</script>

<style scoped>
.post-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--color-border);
  background: transparent;
  text-decoration: none;
  color: var(--color-text);
  gap: 1.5rem;
  transition: border-color 0.2s ease;
}

.post-card:hover {
  border-bottom-color: var(--color-primary);
}

.post-card:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

.post-title {
  flex: 1;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-link);
  margin: 0;
  line-height: 1.4;
  min-width: 0;
  font-family: var(--font-sans);
  /* 限制两行以稳定列表节奏；中文标题密度高，单行截断会过早丢信息。 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-right {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.3rem;
  min-width: 13rem;
}

.post-meta {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--color-text-muted);
  gap: 0.35rem;
}

.post-meta-dot {
  width: 0.4rem;
  height: 0.4rem;
  border-radius: var(--radius-pill);
  background: var(--color-primary);
}

.post-meta-label {
  white-space: nowrap;
}

.post-meta-value {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-soft);
}

.post-comment::before {
  content: "·";
  margin-right: 0.35rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 0.35rem;
}

.post-tag {
  display: inline-block;
  padding: 0.15rem 0.55rem;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-family: var(--font-mono);
  color: var(--color-link);
  border: none;
  background: var(--color-overlay);
  line-height: 1.5;
}

/* 移动端适配 */
@media (max-width: 640px) {
  .post-card {
    flex-direction: column;
    padding: 0.875rem 1rem;
    gap: 0.75rem;
    align-items: stretch;
  }

  .post-title {
    font-size: 1.25rem;
    line-height: 1.4;
    width: 100%;
  }

  .post-right {
    width: 100%;
    align-items: flex-start;
    text-align: left;
    gap: 0.4rem;
    min-width: auto;
  }

  .post-meta {
    font-size: 0.8rem;
    justify-content: flex-start;
    gap: 0.4rem;
  }

  .post-tags {
    justify-content: flex-start;
  }

  .post-tag {
    font-size: 0.8rem;
  }
}
</style>
