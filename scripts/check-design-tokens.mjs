#!/usr/bin/env node
// 校验 DESIGN.md 中可机械检查的约束。失败即退出码 1。
// 覆盖三类最易复发的漂移：硬编码品牌绿、脱离尺度的圆角、失效的 VitePress 变量名。
import { readFileSync } from "node:fs";
import { globSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const THEME = join(ROOT, "docs/.vitepress/theme");

const vueFiles = globSync("**/*.vue", { cwd: THEME }).map((f) => join(THEME, f));
const tokensCss = readFileSync(join(THEME, "styles/tokens.css"), "utf8");
const configTs = readFileSync(join(ROOT, "docs/.vitepress/config.ts"), "utf8");

const ALLOWED_RADII = ["sm", "md", "lg", "card", "pill"];
// MouseEvent 的彩虹光标色与品牌系统无关，按设计豁免。
const COLOR_EXEMPT = ["shared/components/effect/MouseEvent.vue"];

const failures = [];
const fail = (msg) => failures.push(msg);

for (const file of vueFiles) {
  const rel = relative(ROOT, file);
  const short = relative(THEME, file);
  const css = readFileSync(file, "utf8");

  css.split("\n").forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    if (line.trimStart().startsWith("/*") || line.trimStart().startsWith("*")) return;

    // 1. 硬编码品牌绿在深色主题下不会切换。
    if (!COLOR_EXEMPT.includes(short) && /rgba\(\s*8,\s*203,\s*0/.test(line)) {
      fail(`${at} 硬编码品牌绿，应改用 rgb(var(--color-primary-rgb) / <alpha>)`);
    }
    if (!COLOR_EXEMPT.includes(short) && /rgba\(\s*74,\s*222,\s*128/.test(line)) {
      fail(`${at} 硬编码深色品牌绿，应改用 rgb(var(--color-primary-rgb) / <alpha>)`);
    }

    // 2. 圆角必须落在 rounded 尺度上。
    const radius = line.match(/border-radius:\s*([^;]+);/);
    if (radius) {
      const value = radius[1];
      const vars = value.match(/var\(--radius-([a-z]+)\)/g) || [];
      // 去掉 token 引用后，多角简写里剩下的裸 0 是合法的（如 "var(--radius-sm) 0 0 var(--radius-sm)"）。
      const bare = value.replace(/var\(--radius-[a-z]+\)/g, "").trim();
      if (bare && !/^[0\s]+$/.test(bare)) {
        fail(`${at} 圆角 "${value.trim()}" 脱离 rounded 尺度`);
      }
      for (const v of vars) {
        const name = v.match(/--radius-([a-z]+)/)[1];
        if (!ALLOWED_RADII.includes(name)) fail(`${at} 未登记的圆角 token --radius-${name}`);
      }
    }

    // 3. VitePress 2 已移除的变量名，写了不生效。
    for (const dead of ["--vp-c-brand-light", "--vp-c-brand-dark"]) {
      if (line.includes(dead)) fail(`${at} ${dead} 在 VitePress 2 不存在`);
    }
    if (/var\(--vp-c-text\)/.test(line)) {
      fail(`${at} --vp-c-text 在 VitePress 2 不存在，应使用 --vp-c-text-1/2/3`);
    }
    // --vp-c-brand 是 VitePress 自己标记的 DEPRECATED 别名，统一用 brand-1。
    if (/var\(--vp-c-brand\)/.test(line)) {
      fail(`${at} --vp-c-brand 已废弃，应使用 --vp-c-brand-1`);
    }
  });
}

// 4. tokens.css 内部也不该再出现硬编码品牌绿（--color-primary-rgb 除外，它就是定义处）。
tokensCss.split("\n").forEach((line, i) => {
  if (line.trimStart().startsWith("/*") || line.trimStart().startsWith("*")) return;
  if (/rgba\(\s*(8,\s*203,\s*0|74,\s*222,\s*128)/.test(line)) {
    fail(`tokens.css:${i + 1} 硬编码品牌绿，应改用 rgb(var(--color-primary-rgb) / <alpha>)`);
  }
});

// 5. brand-1/2/3/soft 必须被覆盖，否则默认主题的 70+ 处引用仍是靛蓝。
for (const v of ["--vp-c-brand-1", "--vp-c-brand-2", "--vp-c-brand-3", "--vp-c-brand-soft"]) {
  if (!tokensCss.includes(`${v}:`)) fail(`tokens.css 缺少 ${v}，VitePress 默认靛蓝会漏出`);
}

// 5. text-1/2/3 不得压成同一个值。
const textLevels = ["--vp-c-text-1", "--vp-c-text-2", "--vp-c-text-3"].map(
  (v) => tokensCss.match(new RegExp(`${v}:\\s*([^;]+);`))?.[1]?.trim(),
);
if (new Set(textLevels).size !== 3) {
  fail(`tokens.css 的 --vp-c-text-1/2/3 未保持三级差异：${textLevels.join(" / ")}`);
}

// 6. 字体必须在 head 加载，否则 tokens.css 声明的字族全部降级。
for (const family of ["Noto+Sans+SC", "Inter"]) {
  if (!configTs.includes(family)) fail(`config.ts 的 head 未加载字体 ${family}`);
}
if (!configTs.includes("preconnect")) fail("config.ts 缺少字体 preconnect");

if (failures.length) {
  console.error(`✗ ${failures.length} 处设计 token 违规：\n`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log("✓ 设计 token 校验通过");
