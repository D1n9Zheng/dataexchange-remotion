# 原始录屏

原始录屏保持不变，不覆盖、不改名。

- R01_连接器配置.mp4：配置过程留存，本版采用 R02 的连接摘要。
- R02样例解析-1.mov：源/目标选择、学习样例上传。
- R03协议解析-1.mov：EDIFACT ORDERS 解析。
- R04AI映射审核-1.mov：AI 映射、规则编辑、转换预览及保存。
- R05传输任务-1.mov：任务启动与执行历史。
- 监控素材：待用户补录。

本次案例为 SFTP-TEST → JDBC-ORDERS，EDI → JSON。
剪辑决策位于 `src/content/recording-edits.json`；执行 `npm run prepare:recordings` 生成静音、裁切媒体到 `public/edited/`。原始文件包含配置环境信息，不能直接作为网页发布素材。
