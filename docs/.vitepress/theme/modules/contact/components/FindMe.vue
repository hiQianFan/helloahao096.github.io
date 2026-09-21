<template>
  <section class="find-me">
    <h2 v-if="showHeading" class="find-me-title">🌐 找到我</h2>
    <p class="find-me-desc">欢迎和我讨论文章内容、技术实践或合作想法</p>
    <div class="link-hub contact-hub">
      <a
        href="https://github.com/hiQianFan"
        target="_blank"
        rel="noreferrer"
        class="link-item contact-icon-link"
        aria-label="GitHub"
        title="GitHub"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0C16.5 4.7 17.5 5 17.5 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3c0 .3.2.7.8.6A11.5 11.5 0 0 0 12 .7Z"/></svg>
      </a>
      <a
        href="mailto:helloahao@icloud.com"
        class="link-item contact-icon-link"
        aria-label="邮箱"
        title="helloahao@icloud.com"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" d="M3 5h18v14H3zM3 6l9 7 9-7"/></svg>
      </a>
      <a
        href="https://space.bilibili.com/6129402"
        target="_blank"
        rel="noreferrer"
        class="link-item contact-icon-link"
        aria-label="哔哩哔哩"
        title="哔哩哔哩"
      >
        <img src="https://cdn.simpleicons.org/bilibili/00A1D6" alt="" />
      </a>
      <a
        href="https://y.music.163.com/m/user?id=268980836"
        target="_blank"
        rel="noreferrer"
        class="link-item contact-icon-link"
        aria-label="网易云音乐"
        title="网易云音乐"
      >
        <img src="https://cdn.simpleicons.org/neteasecloudmusic/D43C33" alt="" />
      </a>
      <a
        href="https://www.douban.com/people/yourid"
        target="_blank"
        rel="noreferrer"
        class="link-item contact-icon-link"
        aria-label="豆瓣"
        title="豆瓣"
      >
        <img src="https://cdn.simpleicons.org/douban/2D963D" alt="" />
      </a>
      <a
        href="https://steamcommunity.com/profiles/76561198236939154"
        target="_blank"
        rel="noreferrer"
        class="link-item contact-icon-link"
        aria-label="Steam"
        title="Steam"
      >
        <img src="https://cdn.simpleicons.org/steam/171A21" alt="" />
      </a>
      <span class="link-item wechat-contact" title="微信号">
        <img src="https://cdn.simpleicons.org/wechat/07C160" alt="" />
        <span>helloAhao_096</span>
      </span>
      <a
        href="https://x.com/hiQianFan"
        target="_blank"
        rel="noreferrer"
        class="link-item contact-icon-link"
        aria-label="X / Twitter"
        title="X / Twitter"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M18.24 2.25h3.31l-7.23 8.26 8.51 11.24h-6.66l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z"/></svg>
      </a>
    </div>
  </section>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{ showHeading?: boolean }>(), { showHeading: true });
</script>

<style scoped>
.find-me {
  margin: 2.5rem 0 2rem;
}

.find-me-title {
  margin: 0 0 0.75rem;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--color-text);
}

.find-me-desc {
  margin: 0;
  line-height: 1.7;
  color: var(--color-text-soft);
}

.contact-hub {
  padding-bottom: 0;
}

.contact-icon-link {
  width: 44px;
  height: 44px;
  padding: 0;
  justify-content: center;
}

.contact-icon-link :is(svg, img) {
  width: 24px;
  height: 24px;
}

.contact-icon-link:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}

.wechat-contact {
  min-height: 44px;
}
</style>
