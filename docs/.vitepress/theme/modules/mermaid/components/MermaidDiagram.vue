<template>
  <figure ref="container" class="mermaid-diagram">
    <div v-if="svg" class="mermaid-toolbar" aria-label="Mermaid 图表工具">
      <button type="button" aria-label="缩小图表" @click="panzoom?.zoomOut({ animate: true })">
        <Minus aria-hidden="true" />
      </button>
      <button type="button" aria-label="放大图表" @click="panzoom?.zoomIn({ animate: true })">
        <Plus aria-hidden="true" />
      </button>
      <button type="button" aria-label="重置图表缩放" @click="panzoom?.reset({ animate: true })">
        <RotateCcw aria-hidden="true" />
      </button>
      <button type="button" :aria-label="fullscreen ? '退出全屏' : '全屏查看图表'" @click="toggleFullscreen">
        <Minimize2 v-if="fullscreen" aria-hidden="true" />
        <Maximize2 v-else aria-hidden="true" />
      </button>
    </div>
    <div v-if="error" class="mermaid-error" role="alert">图表渲染失败，暂时无法显示。</div>
    <div v-else ref="viewport" class="mermaid-viewport" role="region" aria-label="Mermaid 图表">
      <div ref="content" class="mermaid-content" v-html="svg"></div>
    </div>
  </figure>
</template>

<script lang="ts">
let mermaidQueue = Promise.resolve();
let mermaidId = 0;
</script>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useData } from "vitepress";
import { Maximize2, Minimize2, Minus, Plus, RotateCcw } from "@lucide/vue";
import Panzoom, { type PanzoomObject } from "@panzoom/panzoom";

const props = defineProps<{ source: string }>();
const { isDark } = useData();
const container = ref<HTMLElement | null>(null);
const viewport = ref<HTMLElement | null>(null);
const content = ref<HTMLElement | null>(null);
const svg = ref("");
const error = ref(false);
const fullscreen = ref(false);
let panzoom: PanzoomObject | undefined;
let renderVersion = 0;
let code = "";
let mounted = false;
let sourceValid = false;

function handleWheel(event: WheelEvent) {
  if (event.ctrlKey || event.metaKey) {
    panzoom?.zoomWithWheel(event);
  }
}

function destroyPanzoom() {
  viewport.value?.removeEventListener("wheel", handleWheel);
  panzoom?.destroy();
  panzoom = undefined;
}

function createPanzoom() {
  if (!content.value || !viewport.value) return;
  panzoom = Panzoom(content.value, {
    canvas: true,
    maxScale: 3,
    minScale: 0.5,
    pinchAndPan: true,
    step: 0.2,
  });
  viewport.value.addEventListener("wheel", handleWheel, { passive: false });
}

function decodeSource(source: string) {
  try {
    code = new TextDecoder().decode(
      Uint8Array.from(atob(source), (character) => character.charCodeAt(0)),
    );
    sourceValid = true;
    return true;
  } catch {
    sourceValid = false;
    renderVersion++;
    destroyPanzoom();
    svg.value = "";
    error.value = true;
    return false;
  }
}

function render() {
  if (!sourceValid) return;
  const version = ++renderVersion;
  mermaidQueue = mermaidQueue
    .catch(() => undefined)
    .then(async () => {
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({
        securityLevel: "loose",
        startOnLoad: false,
        theme: isDark.value ? "dark" : "default",
      });
      const id = `mermaid-${++mermaidId}`;
      const result = await mermaid.render(id, code);
      if (version !== renderVersion) return;
      destroyPanzoom();
      svg.value = result.svg;
      error.value = false;
      await nextTick();
      if (version === renderVersion && container.value) {
        result.bindFunctions?.(container.value);
        createPanzoom();
      }
    })
    .catch(() => {
      if (version !== renderVersion) return;
      destroyPanzoom();
      svg.value = "";
      error.value = true;
    });
}

async function toggleFullscreen() {
  try {
    if (document.fullscreenElement === container.value) {
      await document.exitFullscreen();
    } else {
      await container.value?.requestFullscreen();
    }
  } catch {
    // Fullscreen may be unavailable or denied; the browser state remains authoritative.
  } finally {
    updateFullscreen();
  }
}

function updateFullscreen() {
  fullscreen.value = document.fullscreenElement === container.value;
}

onMounted(() => {
  mounted = true;
  document.addEventListener("fullscreenchange", updateFullscreen);
  if (decodeSource(props.source)) render();
});
watch(isDark, () => {
  if (mounted) render();
});
watch(
  () => props.source,
  (source) => {
    if (mounted && decodeSource(source)) render();
  },
);
onBeforeUnmount(() => {
  mounted = false;
  renderVersion++;
  destroyPanzoom();
  document.removeEventListener("fullscreenchange", updateFullscreen);
});
</script>

<style scoped>
.mermaid-diagram {
  margin: 1rem 0;
  padding: 0.5rem;
  background: var(--vp-c-bg);
}

.mermaid-toolbar {
  display: flex;
  justify-content: flex-end;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.mermaid-toolbar button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 0.375rem;
  color: var(--vp-c-text-2);
  background: var(--vp-c-bg-soft);
}

.mermaid-toolbar button:hover,
.mermaid-toolbar button:focus-visible {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.mermaid-toolbar svg {
  width: 1rem;
  height: 1rem;
}

.mermaid-viewport {
  overflow: hidden;
  padding: 0.5rem;
}

.mermaid-content {
  cursor: grab;
}

.mermaid-content:active {
  cursor: grabbing;
}

.mermaid-content :deep(svg) {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
}

.mermaid-error {
  padding: 1rem;
  border: 1px solid var(--vp-c-danger-2);
  border-radius: 0.375rem;
  color: var(--vp-c-danger-1);
  background: var(--vp-c-danger-soft);
}

.mermaid-diagram:fullscreen {
  display: flex;
  flex-direction: column;
  padding: 1rem;
}

.mermaid-diagram:fullscreen .mermaid-viewport {
  flex: 1;
  min-height: 0;
}

@media (max-width: 640px) {
  .mermaid-diagram {
    padding-inline: 0;
  }
}
</style>
