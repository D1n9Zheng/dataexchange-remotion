# 真实录屏素材投放约定

当前 Remotion 第一阶段使用 `BrowserFrame` 占位界面验证转场。真实素材准备好后放入本目录，再由对应场景通过 `staticFile()` 引用。

## 文件名

- `R01_connector_and_upload.mp4`
- `R02_protocol_parse.mp4`
- `R03_ai_mapping.mp4`
- `R04_result_preview.mp4`
- `R05_monitoring.mp4`

## 录制要求

- 统一使用 EDIFACT ORDERS 采购订单案例。
- 浏览器内容分辨率为 1920×1080 或更高，缩放比例固定为 100%。
- 使用虚构业务数据，不包含账号、电话、地址、Token、内网地址或数据库凭据。
- 不录登录、菜单查找、长时间等待、开发者工具和无关浏览器标签。
- 每个动作前后保留短暂停顿，便于后期裁切和 Remotion 转场。

素材文件通常不提交到 Git；具体是否纳入版本管理由项目交付方式决定。

