# 数据交换工具 - 宣传片动画工程 (Remotion 60FPS)

> 当前状态：V1 的 S01–S10 已形成 88 秒无声结构版。S03、S04、S06、S08 目前使用高保真产品画面，R01–R05 真实录屏准备完成后可按相同镜头边界替换。

本项目参考顶级技术产品动效（如 OpenAI Codex、[`Wh1tZz/Tibo-Please`](https://github.com/Wh1tZz/Tibo-Please)）的现代 Code-as-Video 规范，基于 **Remotion 4.x + React 18 + Tailwind CSS** 构建。

---

## 快速上手

### 1. 安装依赖
```bash
npm install
# 或使用国内镜像加速
npm install --registry=https://registry.npmmirror.com
```

### 2. 本地工作台预览 (Remotion Studio)
```bash
npm run studio
```
打开后将提供如同剪映/After Effects 的桌面级时间线面板，支持：
- 逐帧审查（Space 播放/暂停，J/K/L 或左右方向键微调）
- 自由切换查看 `Scene01-PainPoints`、`Scene02-Breakthrough`、`Scene03-ConnectorUpload` 或 `FullPromoVideo`
- 缩放审查局部像素细节与缓动曲线

### 3. 广播级无损导出 MP4 (1080P 60FPS)
```bash
# 导出分镜 01: 痛点呈现 (8s)
npm run render:s1

# 导出分镜 02: 统一链路与产品承接 (6s)
npm run render:s2

# 导出分镜 03: 连接器配置与样例接入 (11s)
npm run render:s3

# 导出完整 V1 结构版 (88s，无声)
npm run render:all

# 导出前三镜头预览 (25s，无声)
npm run render:first-act
```
导出的高码率无损 MP4 文件将保存在 `out/` 目录下。

---

## 目录结构

```text
promo-video/
├── package.json          # 依赖与脚本定义
├── remotion.config.ts    # 渲染器与 Tailwind 配置
├── tsconfig.json         # TypeScript 规范
├── tailwind.config.js    # 蓝白科技风调色板
├── src/
│   ├── index.ts          # Remotion 入口
│   ├── Root.tsx          # Composition 注册与串联
│   ├── styles/
│   │   └── global.css    # 全局样式
│   ├── content/
│   │   └── demo.ts       # EDIFACT ORDERS 统一演示配置
│   ├── timeline/
│   │   └── timing.ts     # 集中式镜头时间轴
│   ├── types/
│   │   └── index.ts      # 节点与协议元数据定义
│   ├── components/       # 动效原子组件
│   │   ├── LightBackground.tsx   # 蓝白科技网格背景
│   │   ├── NodeCard.tsx          # 业务系统卡片 (3D 悬浮/弹簧/红警)
│   │   ├── LaserConnection.tsx   # 激光连线与流光粒子
│   │   ├── ProtocolBadge.tsx     # 协议卡片 (EDIFACT/X12/海关)
│   │   └── SubtitleBanner.tsx    # 电影级旁白字幕条
│   └── scenes/           # 镜头组件
│       ├── Scene01PainPoints.tsx    # 分镜 01: 痛点呈现 (0-8s)
│       ├── Scene02Breakthrough.tsx  # 分镜 02: 平台破局 (8-14s)
│       ├── Scene04ConnectorUpload.tsx # 成片分镜 03: 连接器配置与样例接入
│       ├── Scene05ProtocolParse.tsx    # 成片分镜 04
│       ├── Scene06AiMapping.tsx        # 成片分镜 05
│       ├── Scene07ResultPreview.tsx    # 成片分镜 06
│       ├── Scene08ExchangeFlow.tsx     # 成片分镜 07
│       ├── Scene09Monitoring.tsx       # 成片分镜 08
│       ├── Scene10CapabilitySummary.tsx # 成片分镜 09
│       ├── Scene11EndingPlate.tsx      # 成片分镜 10
│       └── Scene03Protocols.tsx     # 旧协议库素材，暂不进入主时间轴
```
