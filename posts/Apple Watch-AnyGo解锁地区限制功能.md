---
title: Apple Watch-AnyGo解锁地区限制功能
description: 通过 AnyGo 模拟定位，在国行 Apple Watch 上开通睡眠呼吸暂停、ECG 心电图、房颤提醒等地区限制功能的操作指南
date: 2026-03-01
tags:
  - Apple Watch
---

> 参考来源：[V2EX - 国行 Watch 开通房颤和睡眠呼吸暂停](https://www.v2ex.com/t/1159981)

## 参考视频

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; margin: 1rem 0;">
  <iframe src="https://player.bilibili.com/player.html?isOutside=true&aid=115243720115660&bvid=BV1rKJZzAE9W&cid=32551733015&p=1" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;" scrolling="no" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>
</div>

## 1. 开始前确认

准备以下设备和环境：

- **iPhone 和 Apple Watch**：Apple Watch 硬件本身必须支持想要开通的功能。
- **Mac 或 Windows 电脑**：用于运行 iToolab AnyGo（[官网](https://itoolab.com/ad/g/gps-simulator/)）。
- **可用的代理网络**：电脑和 iPhone 均需连接，并将节点设为支持目标功能的地区，例如中国香港。否则 AnyGo 可能提示「当前地区不可用」。

本文验证环境为美版 Apple Watch Ultra 2 + iPhone，两台设备的系统版本均为 26。

### AnyGo 支持的平台

| 平台 | 版本要求 |
|------|----------|
| Windows | 11 / 10 / 8 / 7 |
| macOS | 10.12 及以上 |
| iOS | iOS 13 ~ iOS 26 |
| Android | Google Play 下载，支持 Android 15 |

官网支持 **Wi-Fi 无线**、**蓝牙**和数据线等连接方式。本文以 macOS + iPhone 的蓝牙模式为例。

> Windows 端目前暂无支持蓝牙模式的学习版，但正版 AnyGo 支持。若需蓝牙模式，请使用正版。

## 2. 操作步骤

1. **关闭 Apple Watch**，并在开通完成前保持关机。
2. **将 iPhone 连接到 AnyGo**：优先尝试蓝牙模式；如果无法连接，可改用数据线。
3. **按 AnyGo 提示重置 iPhone 的网络与定位**：
   1. 前往「设置 → 隐私与安全性 → 定位服务」，关闭定位服务。
   2. 关闭 Wi-Fi 和蜂窝网络，也可直接开启飞行模式。
   3. 等待约 10 秒。
   4. 依次重新开启 Wi-Fi、蜂窝网络和定位服务。
4. **修改定位**：在 AnyGo 中将 iPhone 定位设为目标地区。
5. **切换网络出口**：在 iPhone 上开启全局代理，使用与模拟定位一致的地区节点。
6. **验证定位**：打开百度地图或高德地图，确认当前位置已变更为目标地区。
7. **开通功能**：打开 iPhone 的「健康」App，按页面提示开通睡眠呼吸暂停通知、ECG 心电图或房颤相关功能。

如果「房颤历史」与 ECG 心电图只能二选一，请根据自己的使用需求选择。

## 3. 如何确认开通成功

在「健康」App 中完成设置后：

1. 确认相关功能不再显示「当前地区不可用」。
2. 开启 Apple Watch，等待其与 iPhone 完成同步。
3. 在 Watch App 或手表上确认对应的功能入口已出现。

如果功能入口仍未出现，请不要反复开关手表，先按下方的现象排查。

## 4. 常见问题

### 蓝牙连接失败

先改用数据线连接。如果仍想使用蓝牙，可依次尝试：

1. 在 Mac 的蓝牙设置中忽略 iPhone，然后重新配对。
2. 重启 Mac 和 iPhone 后再次连接。
3. 仍无法连接时，备份后删除 `~/Library/Preferences/` 下以 `com.apple.bluetooth` 或 `com.apple.bluetoothuserd` 开头的 plist 文件，重启 Mac 并重新配对。

删除蓝牙偏好设置可能会清除已保存的蓝牙配对信息，只建议作为最后的排查手段。

### 学习版蓝牙连不上

原帖回帖中，学习版的蓝牙连接结果并不一致：部分用户可以正常使用，部分用户换成正版后才连接成功。优先尝试数据线；如果必须使用蓝牙，可考虑改用正版。

### 定位改好了，健康 App 仍提示地区不可用

按以下顺序检查：

1. 地图 App 显示的是否为目标地区。
2. 代理是否为全局模式，节点地区是否与模拟定位一致。
3. Apple Watch 是否在整个操作过程中保持关机。
4. 将 AnyGo 的蓝牙连接改为数据线连接，重新执行一次流程。

## 5. 限制与风险

### 成功率不稳定

原帖中存在 iOS 18.x、26.x 以及 macOS 15.x、26.x 的成功案例，暂时没有明确证据表明成功与某个系统版本直接相关。更可能的影响因素是 AnyGo 版本、授权类型、连接方式和网络环境。

### 代开服务风险

不建议使用需要登录他人 Apple ID 的代开服务。这类服务可能导致隐私数据泄露、同步无关数据，甚至让设备被陌生 Apple ID 锁定。
