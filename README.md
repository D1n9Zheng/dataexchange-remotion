# 数据交换工具 - 宣传片动画工程 (Remotion 60FPS)

> 当前状态：S03 为接入能力动画，S04–S06 已接入真实录屏与动画包装，全片 72 秒。S07/S08 已从主片移除，源文件保留；S01、S02、S09、S10 保持已确定版本。

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

# 导出完整 V1 结构版 (72s，无声)
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

## 录屏版生成

```bash
npm run prepare:recordings
npm run typecheck
npm run build
npm run render:recordings
```

原始文件保留在 `public/recordings/`，剪辑决策见 `src/content/recording-edits.json`。
`public/edited/` 为可再生的静音裁切媒体；不修改原始录屏。
中段预览为 `out/RecordingActPreview.mp4`（46 秒）。全片使用 `npm run render:all`，S07/S08 不进入主片。

上一版交付包含网页播放格式的 `out/FullPromoVideo_RecordingDraft_1080p.mp4` 与 `out/RecordingActPreview_1080p.mp4`，为 1080p / 60 FPS / H.264 / yuv420p / 无音轨并启用 Fast Start。Remotion 母版保留在 `out/FullPromoVideo_RecordingDraft.mp4`。该文件为旧版参考，不代表当前主片。

上述旧版成片尚未包含本次 S03 优化。当前时间轴为 72 秒，S03 检查片段为 `out/S03_Connections_Preview_1080p.mp4`（含 S02 末尾 1 秒、S03 15 秒、S04 开头 2 秒）。完整衔接预览为 `out/S02_S03_Transition_1080p.mp4`（S02 6 秒 + S03 15 秒 + S04 开头 2 秒）；S02 与 S03 共享产品节点，不再展开界面模板。

新版完整母版导出及网页格式转换可复现为：

```bash
npx remotion render build FullPromoVideo out/FullPromoVideo_RecordingDraft.mp4 --codec=h264 --muted
ffmpeg -y -i out/FullPromoVideo_RecordingDraft.mp4 -vf 'scale=in_range=full:out_range=tv,format=yuv420p' -c:v libx264 -preset fast -crf 16 -color_range tv -an -movflags +faststart out/FullPromoVideo_RecordingDraft_1080p.mp4
ffmpeg -y -ss 14 -i out/FullPromoVideo_RecordingDraft_1080p.mp4 -t 46 -an -c:v libx264 -preset fast -crf 16 -pix_fmt yuv420p -color_range tv -movflags +faststart out/RecordingActPreview_1080p.mp4
```

S04 当前为 13 秒，新增 EDIFACT / X12 协议介绍，并移除该镜头的副标题、品牌标识及底部说明。最新局部预览见 `out/S04_Protocol_Preview_1080p.mp4`；之前导出的成片和衔接片段不代表本次更新。

S05 当前为 12 秒 AI 映射能力展示，已移除日期编辑与保存操作。最新预览：`out/S05_Mapping_Preview_1080p.mp4`（含 S04 末尾 1 秒、S05 12 秒、S06 开头 2 秒）。

当前主片顺序：S01 → S02 → S03 → S04 → S05 → S06（6 秒真实转换结果）→ S09 → S10，共 72 秒。最新完整视频：`out/FullPromoVideo_Current_1080p.mp4`。
