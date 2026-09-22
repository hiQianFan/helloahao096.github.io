<template>
  <div class="greeting">
    <div class="greeting-content">
      <p class="greeting-text" aria-label="$ Hello, I'm QianFan">
        <span class="greeting-prefix" aria-hidden="true">$</span>
        <span class="greeting-main" aria-hidden="true">{{ displayText }}</span>
        <span
          class="greeting-cursor"
          :class="{ 'greeting-cursor--blink': isPlaying }"
          aria-hidden="true"
        >_</span>
      </p>
      <!-- <p class="greeting-subtitle">
        {{ subtitleText }}
      </p> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";

const greetingText = "Hello, I'm QianFan";
const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}<>?/\\|~";
const FRAME_MS = 32;
const FRAMES_PER_CHARACTER = 3;

const displayText = ref("");
const isPlaying = ref(false);
let animationTimer: ReturnType<typeof setInterval> | null = null;

const getRandomChar = () => randomChars[Math.floor(Math.random() * randomChars.length)];

const finishAnimation = () => {
  if (animationTimer) clearInterval(animationTimer);
  animationTimer = null;
  displayText.value = greetingText;
  isPlaying.value = false;
};

const startAnimation = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.hidden) {
    finishAnimation();
    return;
  }

  let frame = 0;
  isPlaying.value = true;
  animationTimer = setInterval(() => {
    const revealedCount = Math.floor(frame / FRAMES_PER_CHARACTER);
    if (revealedCount >= greetingText.length) {
      finishAnimation();
      return;
    }

    displayText.value = Array.from(greetingText, (char, index) =>
      index < revealedCount || char === " " ? char : getRandomChar(),
    ).join("");
    frame += 1;
  }, FRAME_MS);
};

onMounted(() => {
  startAnimation();
  document.addEventListener("visibilitychange", finishAnimation, { once: true });
});

onBeforeUnmount(() => {
  finishAnimation();
  document.removeEventListener("visibilitychange", finishAnimation);
});
</script>

<style scoped>
.greeting {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.greeting-content {
  max-width: 600px;
  margin: 0 auto;
}

.greeting-text {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--color-primary-hover);
  margin-bottom: 0.5rem;
  line-height: 1.6;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
}

.greeting-prefix {
  color: var(--color-primary);
}

.greeting-main {
  color: inherit;
  min-height: 1.6rem;
  min-width: 18ch;
  text-align: left;
}

.greeting-cursor {
  color: var(--color-primary);
  opacity: 0.8;
}

.greeting-cursor--blink {
  animation: blink 1s steps(2, start) infinite;
}

.greeting-subtitle {
  font-size: 1rem;
  color: var(--color-text-soft);
  font-family: var(--font-sans);
  margin-top: 0.5rem;
}

@keyframes blink {
  0%,
  50% {
    opacity: 0;
  }
  51%,
  100% {
    opacity: 1;
  }
}

/* 移动端适配 */
@media (max-width: 640px) {
  .greeting {
    margin-bottom: 2rem;
    padding: 1.5rem 0;
  }

  .greeting-text {
    font-size: 1.2rem;
  }

  .greeting-subtitle {
    font-size: 0.9rem;
  }
}
</style>
