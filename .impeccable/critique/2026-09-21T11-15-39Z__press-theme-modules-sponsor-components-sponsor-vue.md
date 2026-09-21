---
target: 文章底部赞助与联系方式模块
total_score: 22
p0_count: 0
p1_count: 3
timestamp: 2026-09-21T11-15-39Z
slug: press-theme-modules-sponsor-components-sponsor-vue
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---:|---|
| 1 | Visibility of System Status | 2 | 二维码无加载/失效反馈 |
| 2 | Match System / Real World | 2 | 桌面端仍提示“长按保存” |
| 3 | User Control and Freedom | 3 | 可跳过，但所有内容默认展开 |
| 4 | Consistency and Standards | 2 | 联系方式交互形态不一致 |
| 5 | Error Prevention | 1 | 付款前缺少收款人核对信息 |
| 6 | Recognition Rather Than Recall | 3 | 支付渠道清楚，图标联系方式依赖品牌识别 |
| 7 | Flexibility and Efficiency | 2 | 未区分桌面/移动操作路径 |
| 8 | Aesthetic and Minimalist Design | 2 | 两张大二维码抢走文章收尾焦点 |
| 9 | Error Recovery | 2 | 二维码失效时无明确替代路径 |
| 10 | Help and Documentation | 3 | 有操作提示，但未按设备适配 |
| **Total** | | **22/40** | **可用，但响应式与文章收尾层级需要优先修正** |

## Anti-Patterns Verdict

**LLM assessment:** 不是“一眼 AI”，但双列同构卡片、宽柔阴影、大圆角与居中二维码有明显模板感。真实收款码、“喝口奶茶”和 terminal-green 保留了个人品牌性。

**Deterministic scan:** CLI 输出 `[]`，0 条命中。源码复核发现检测覆盖缺口：`.donation-card` 和 `.donation-qr` 同时使用 1px border 与 16px 以上模糊阴影，符合 ghost-card 反模式。

**Visual evidence:** 无头 Chrome 已截取 1440px 桌面与 390px 移动端。未注入用户可见 overlay；以实际截图作为替代证据。

## Overall Impression

模块本身清楚、有个人感，但对“文章底部”来说过于庞大。最大机会不是继续装饰，而是将文章底部与独立赞助页分成两种密度。

## What's Working

- “🧋喝口奶茶”比通用“支持我们”更符合个人博客。
- 支付宝/微信名称、图片与 alt 完整，识别成本低。
- 配色延续站点 terminal-green，没有额外引入新的视觉语法。

## Priority Issues

1. **[P1] 移动端卡片溢出可视宽度**
   - **Why it matters:** 390px 截图中二维码卡片向右被裁切，页面产生水平溢出，直接影响操作。
   - **Fix:** 小屏幕下让 `.donation-card` 使用 `width: 100%; max-width: 100%; box-sizing: border-box`，缩减容器内外边距，并验证 320/375/390px。
   - **Suggested command:** `$impeccable adapt`
2. **[P1] 文章收尾被二维码模块压过**
   - **Why it matters:** 赞助、联系、评论三种意图连续竞争，读者读完文章后还要穿过一个小型落地页。
   - **Fix:** 文章底部改为紧凑横向支持区；完整二维码保留在 `/sponsor`。若必须展开，至少缩小为两张无外层卡片的并排码。
   - **Suggested command:** `$impeccable distill`
3. **[P1] 付款前缺少信任与误付防护**
   - **Why it matters:** 付款是高风险动作，但页面未提供收款人核对信息或“完全自愿”说明。
   - **Fix:** 在二维码旁提供昵称/脱敏姓名核对、自愿支持说明和失效联系路径。
   - **Suggested command:** `$impeccable harden`
4. **[P2] 操作提示不分设备**
   - **Why it matters:** 桌面端“长按”不成立；同一手机上也不能用相机扫当前屏幕。
   - **Fix:** 桌面显示“用手机扫码”，移动显示“长按保存，在 App 中从相册识别”。
   - **Suggested command:** `$impeccable clarify`
5. **[P2] 卡片细节和可访问性未收口**
   - **Why it matters:** border + 宽模糊阴影形成 ghost-card；弱色小字可能不足 AA；42px 图标按钮小于 44px 触控建议。
   - **Fix:** 边框与阴影二选一，圆角收到 12–16px，提高 muted 对比度，触控目标至少 44px，增加 `:focus-visible`。
   - **Suggested command:** `$impeccable polish`

## Persona Red Flags

- **搜索落地的桌面技术读者:** 想快速看评论，却要越过两张大二维码；“长按”与鼠标场景冲突。
- **同一手机阅读的读者:** 卡片被裁切，且不知道需要从支付 App 相册识别。
- **谨慎赞助者/低视力键盘用户:** 无法预先核对收款人，弱对比提示和偏小图标目标增加风险。

## Minor Observations

- 赞助标题实际是链接，静态状态却不像可点击。
- scoped CSS 与 `custom.css` 重复定义 donation 样式，视觉来源不透明。
- 联系方式与赞助方式属于不同意图，可以在文章底部拆开。

## Questions to Consider

1. 如果文章底部只能保留一个主动作，是“去评论”还是“支持作者”？
2. 完整二维码是否只需在 `/sponsor` 出现，文章底部只保留一个作者化的赞助入口？
3. 联系作者与赞助作者是否必须共享同一个收尾区？
