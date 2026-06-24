<template>
  <div class="post-actions" aria-label="文章操作">
    <div class="action-group">
      <button class="primary-action" type="button" @click="copyMarkdown">
        <Copy class="action-icon" aria-hidden="true" />
        复制 Markdown
      </button>
      <details ref="menuRef" class="action-menu">
        <summary class="menu-trigger" aria-label="更多文章操作">
          <ChevronDown class="action-icon" aria-hidden="true" />
        </summary>
        <div class="menu-panel">
          <button class="menu-item" type="button" @click="runMenuAction(copyMarkdown)">
            <Copy class="menu-icon" aria-hidden="true" />
            复制 Markdown
          </button>
          <button class="menu-item" type="button" @click="runMenuAction(copyPrompt)">
            <ClipboardPenLine class="menu-icon" aria-hidden="true" />
            复制 AI Prompt
          </button>
          <div class="menu-separator" role="separator"></div>
          <button
            v-for="target in aiTargets"
            :key="target.name"
            class="menu-item"
            type="button"
            @click="runMenuAction(() => openAi(target.url))"
          >
            <component :is="target.icon" class="menu-icon" aria-hidden="true" />
            在 {{ target.name }} 中打开
          </button>
        </div>
      </details>
    </div>
    <span v-if="status" class="action-status">{{ status }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useData, withBase } from "vitepress";
import {
  Bot,
  ChevronDown,
  ClipboardPenLine,
  Copy,
  Search,
  Sparkles,
} from "@lucide/vue";

const siteUrl = "https://blog.mapin.net";
const { page } = useData();
const status = ref("");
const menuRef = ref<HTMLDetailsElement | null>(null);

const markdownPath = computed(() => `/${page.value.relativePath}`);
const markdownUrl = computed(() => new URL(markdownPath.value, `${siteUrl}/`).href);
const pageUrl = computed(() =>
  new URL(markdownPath.value.replace(/\.md$/, ""), `${siteUrl}/`).href
);

const aiTargets = [
  { name: "ChatGPT", url: "https://chatgpt.com/", icon: Bot },
  { name: "Claude", url: "https://claude.ai/new", icon: Sparkles },
  { name: "Gemini", url: "https://gemini.google.com/app", icon: Sparkles },
  { name: "Perplexity", url: "https://www.perplexity.ai/", icon: Search },
];

function promptText() {
  return [
    `请基于这篇文章回答我的问题：${page.value.title}`,
    "",
    `页面：${pageUrl.value}`,
    `Markdown：${markdownUrl.value}`,
    "",
    "请优先依据文章内容，必要时指出文章没有覆盖的信息。",
  ].join("\n");
}

async function copyText(text: string, message: string) {
  await navigator.clipboard.writeText(text);
  status.value = message;
  window.setTimeout(() => {
    status.value = "";
  }, 1800);
}

async function copyMarkdown() {
  try {
    const response = await fetch(withBase(markdownPath.value));
    if (!response.ok) {
      throw new Error(`Markdown fetch failed: ${response.status}`);
    }
    await copyText(await response.text(), "已复制 Markdown");
  } catch {
    status.value = "Markdown 暂不可用";
  }
}

async function copyPrompt() {
  await copyText(promptText(), "已复制 Prompt");
}

async function openAi(url: string) {
  await copyPrompt();
  window.open(url, "_blank", "noopener,noreferrer");
}

async function runMenuAction(action: () => void | Promise<void>) {
  menuRef.value?.removeAttribute("open");
  await action();
}
</script>

<style scoped>
.post-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  min-width: 0;
  font-family: var(--font-mono);
}

.action-group {
  position: relative;
  display: inline-flex;
  align-items: stretch;
}

.primary-action,
.menu-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-height: 1.85rem;
  border: 1px solid rgba(8, 203, 0, 0.28);
  background: rgba(8, 203, 0, 0.06);
  color: var(--color-primary);
  font: inherit;
  font-size: 0.78rem;
  line-height: 1.2;
  cursor: pointer;
}

.primary-action {
  padding: 0.2rem 0.62rem;
  border-radius: 6px 0 0 6px;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.menu-trigger {
  width: 1.85rem;
  border-left: 0;
  border-radius: 0 6px 6px 0;
  list-style: none;
}

.menu-trigger::-webkit-details-marker {
  display: none;
}

.primary-action:hover,
.menu-trigger:hover {
  border-color: rgba(8, 203, 0, 0.5);
  background: rgba(8, 203, 0, 0.12);
}

.action-menu[open] .menu-trigger {
  background: rgba(8, 203, 0, 0.14);
}

.menu-panel {
  position: absolute;
  top: calc(100% + 0.35rem);
  left: 0;
  z-index: 30;
  min-width: 12rem;
  padding: 0.35rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.14);
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  min-height: 2rem;
  padding: 0.4rem 0.55rem;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--color-text);
  font-size: 0.82rem;
  text-align: left;
  cursor: pointer;
}

.action-icon,
.menu-icon {
  width: 0.95rem;
  height: 0.95rem;
  stroke-width: 1.9;
  flex: 0 0 auto;
}

.menu-icon {
  color: var(--color-primary);
}

.menu-item:hover {
  background: rgba(8, 203, 0, 0.1);
  color: var(--color-primary);
}

.menu-separator {
  height: 1px;
  margin: 0.35rem 0;
  background: var(--color-border);
}

.action-status {
  color: var(--color-text-gray);
  font-size: 0.78rem;
}

:global(.dark) .primary-action,
:global(.dark) .menu-trigger {
  background: rgba(8, 203, 0, 0.18);
}

:global(.dark) .menu-panel {
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.34);
}

@media (max-width: 640px) {
  .post-actions,
  .action-group {
    width: 100%;
  }

  .primary-action {
    flex: 1 1 auto;
  }

  .primary-action,
  .menu-trigger {
    min-height: 2.75rem;
    font-size: 0.82rem;
  }

  .menu-trigger {
    width: 2.75rem;
  }

  .menu-panel {
    width: 100%;
  }
}
</style>
