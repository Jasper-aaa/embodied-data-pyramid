# Robot / Simulation Dataset Demo Count Verification

核验日期：2026-07-17（Asia/Shanghai）

## 核验范围与判定标准

本报告核验拉取最新版前 `script.js` 中 Robot Data 与 Simulation Data 标题行仍显示 `# Demos = TBD` 的 10 个数据集，并记录 2026-07-17 拉取主分支后的落地结果。核验时区分：

- **当前目录收录总数**：只计算当前网页条目实际列出的任务、文件或子数据集。
- **完整数据集总数**：论文或官网宣称的整个数据集规模，可能大于当前网页收录范围。
- **无需下载大文件**：允许读取官网、论文、仓库目录，以及 `info.json`、`episodes.jsonl` 等小型 metadata；不下载 ZIP、HDF5、Parquet、视频或分卷 TAR 数据。
- **精确值**：官方 metadata 或官方逐项表格可以直接证明。
- **近似值**：官方只提供 `+`、`k`、`M` 或约数。
- **不可证实**：公开来源没有 episode 数，或当前条目混合了不同数据集，无法把一个数字可靠对应到当前下载链接。

## 汇总结论

| 数据集 | 不下载大文件能否统计 | 当前条目建议值 | 可信度 | 结论 |
|---|---|---:|---|---|
| AIST-Bimanual | 可以 | 标题 `12,025`；当前 16 行小计 `1,400` | 高 | 当前官方 CSV 有 119 个任务，完整总数与收录子集需分开表达 |
| Humanoid Everyday | 可以 | `8,949` | 高 | 官方 `meta/info.json` 直接给出 |
| LET-Body-Dataset | 目前不可以 | 不再适用 | 高（对“证据不足”的判断） | 最新主分支已移除此合并条目，改为有数字的 LET-Base 与 LET-Dex |
| DECO-50 | 可以统计整库总数 | `8,000` | 高 | 官方论文明确为 8,000 successful trajectories |
| HapTile | 可以 | `1,726` | 高 | 论文正文明确为 1,726 demonstrations / 38 tasks |
| OmniVitac | 只能得到下界 | `21,000+ trajectories` | 中高 | 官方 HF card 只有 `21,000+`，没有精确值或六类拆分 |
| MolmoB0T | 只能得到论文约数 | 保持 `TBD`，或显示 `~1.7M core episodes` | 中高 | 论文覆盖 8 个核心任务；当前条目还有无计数的 ObjectBackfill |
| DexMimicGen | 可以 | 标题 `21K demos`；当前 9 行小计 `9,000` | 高 | 论文明确完整规模为 21K，并明确 9 个默认任务各 1,000 |
| RoboCasa365 / GR00T 1000 | 当前条目不能给单一数字 | `TBD`，建议拆条目 | 高（对“条目混合”的判断） | 当前行混合 RoboCasa365 与 GR00T 1000，且当前 HF 链接本身未直接证实 |
| Genie Sim 3.0 | 方法上可以精确统计 | 先保持 `TBD`，待 metadata 汇总 | 高 | 每个 task/robot 目录都有 LeRobot `info.json` / `episodes.jsonl` |

## 逐项证据

### 1. AIST-Bimanual

当前网页收录 16 个 HDF5 任务。AIST 官方数据页提供逐任务 `Num.` 列和可下载 CSV。2026-07-17 重新读取当前 CSV 后，共有 119 个任务，`HDF5 count` 合计为 12,025 episodes：

- 官方数据页：[AIST Bimanual Manipulation Dataset](https://aistairc.github.io/aist_bimanip_site/)
- 官方页面对当前 16 个任务给出的计数依次为：
  `50, 50, 100, 100, 100, 100, 100, 50, 50, 50, 50, 200, 100, 100, 100, 100`。
- 当前收录范围加总：`1,400`。
- 完整官网任务表总计：`12,025`。

**判定：** 数据集标题应填完整规模 `12,025`；当前 16 个任务行继续显示各自官方计数，小计 `1,400`。摘要必须明确这些行只是完整数据集的子集。

### 2. Humanoid Everyday

官方 Hugging Face 仓库的 LeRobot metadata 明确给出：

- [`meta/info.json`](https://huggingface.co/datasets/USC-PSI-Lab/humanoid-everyday/blob/main/meta/info.json)
- `total_episodes: 8949`
- 同一文件还给出 `total_frames: 3436171`、`total_tasks: 246`、`total_videos: 8949`。

**判定：** 可不下载数据直接填 `8,949`，证据是数据仓库自身的结构化 metadata。

### 3. LET-Body-Dataset

> 2026-07-17 状态：最新版主分支已不再包含这个合并条目，而是拆为已有数值的 LET-Base Dataset 与 LET-Dex Dataset，因此本次没有向网站写入未经证实的 LET-Body 数字。以下内容保留为历史核验证据。

可查到的公开数据说明给出：

- 数据类型为 ROSbag。
- 当前扫描到 2 个任务目录：`supermarket_replenishment` 与 `supermarket_shelf_stocking`。
- 没有 `total_episodes`、逐任务轨迹数、ROSbag 数与 episode 的对应规则。
- 公开说明：[LET-Body-Dataset](https://ai.gitcode.com/OpenLET/LET-Body-Dataset)
- 项目当前使用的 ModelScope 链接：<https://modelscope.cn/datasets/lejurobot/LET-Body-Dataset>

即使远程文件树可以数出 ROSbag 文件，也不能在缺少官方定义时自动断言“一份 ROSbag = 一个成功 demo”。

**判定：** 目前保留 `TBD`。要得到可靠数值，需要发布方提供 episode 清单、计数表，或明确 ROSbag 与 demo 的一一对应关系。

### 4. DECO-50

官方论文摘要明确说明 DECO-50 包含：4 个场景、28 个子任务、约 500 万帧和 **8,000 successful trajectories**。

- 官方论文：[DECO: Decoupled Multimodal Diffusion Transformer...](https://arxiv.org/abs/2602.05513)
- 官方数据仓库：[BAAI-Humanoid/DECO-50](https://huggingface.co/datasets/BAAI-Humanoid/DECO-50)
- HF 目录结构把 episode 保存为 `episode_XXXX.tar.gz`，因此未来可通过远程目录 API 做 task1–task4 分项计数，而无需下载 archive 内容。

**判定：** 数据集标题行可填 `8,000`。但当前四个场景行若也要分别填数字，仍需对官方文件树做分页、递归计数并检查重复/缺失。

### 5. HapTile

论文正文的 Dataset Statistics 明确给出：**1,726 demonstrations across 38 tasks**，由 9 名操作者采集，总交互时长 750.33 分钟。

- 官方论文入口：[HapTile](https://arxiv.org/abs/2606.04825)
- 当前数据仓库：[HapTile2026/HapTile](https://huggingface.co/datasets/HapTile2026/HapTile)

当前网页正好列出 38 个任务，因此论文总数与当前 section 范围一致。

**判定：** 可填 `1,726`。逐任务 ZIP 的单独 episode 数没有公开机器可读 metadata；如需每行精确值，应从论文图表或发布方补充清单核验，不能按 ZIP 大小推算。

### 6. OmniVitac

官方 HF dataset card 写明：**21,000+ trajectories across 86 tasks and 100+ objects**。

- 官方仓库说明：[tars-robotics/OmniVitac README](https://huggingface.co/datasets/tars-robotics/OmniVitac/blob/main/README.md)
- 文件目录：[tars-robotics/OmniVitac](https://huggingface.co/datasets/tars-robotics/OmniVitac/tree/main)

数据目录仅公开六类超大 TAR 分卷，例如 `Adjustment.tar.gz.00`、`.01` 等；分卷数是存储切片数，不是 episode 数。公开 card 也没有六类的独立 trajectory 计数。此外，当前网页六类名称（Adjustment / Assembly / Cutting / Grasping / Peeling / Wiping）与 dataset card 描述的六种 interaction patterns 并不完全一致，因此不能把 21,000 按六行随意拆分。

**判定：** 只能可靠显示 `21,000+ trajectories`，不能改成精确整数，也不能无依据生成分类计数。

### 7. MolmoB0T

官方论文 Table II 给出 8 个核心任务的 episode 约数：

| 任务 | 机器人 | 论文 episode 数 |
|---|---|---:|
| Door-open | RB-Y1 | 79.0k |
| Open | RB-Y1 | 46.6k |
| Pick | RB-Y1 | 62.3k |
| Pick | Franka | 781.8k |
| Pick-and-Place | RB-Y1 | 14.8k |
| Pick-and-Place | Franka | 554.2k |
| PnP Next-To | Franka | 182.7k |
| PnP Color | Franka | 28.6k |

这些已四舍五入的行相加为约 `1.75M`，论文正文以 `1.7M episodes` 概述。

- 官方论文：[MolmoB0T OpenReview PDF](https://openreview.net/pdf?id=xDRBHRaI3j)
- 官方数据仓库：[allenai/molmobot-data](https://huggingface.co/datasets/allenai/molmobot-data)

关键限制：

- HF 显示的 324,497 rows 是 package index 行，不是 episode 行。
- 官方 README 明确说明一个 package 可以包含多个 episode，并要求下载后运行 `validate_trajectories.py` 才能抽取有效轨迹。
- 当前网页还列出 `FrankaPickAndPlaceOmniCamConfig_ObjectBackfill`；论文 8 个核心任务统计不包含该 extension，官方页面没有给它的 episode 总数。

**判定：** 不应把 `1.7M` 当成当前 9 行的精确和。可以显示说明性文本 `~1.7M core episodes (8 tasks; ObjectBackfill excluded)`，若 `# Demos` 必须代表当前完整 section 的精确数，则继续保留 `TBD`。

### 8. DexMimicGen

官方论文列出 9 个主任务，并说明：**DexMimicGen is subsequently used to generate 1000 demonstrations per task**。Table I 也明确称这些是 `datasets of 1000 trajectories`。

- 官方论文：[DexMimicGen OpenReview PDF](https://openreview.net/pdf?id=KgUgavAl6Y)
- 官方项目页：[DexMimicGen](https://dexmimicgen.github.io/)
- 官方 HF release：[MimicGen/dexmimicgen_datasets](https://huggingface.co/datasets/MimicGen/dexmimicgen_datasets/tree/main/generated)

当前网页列出的 9 个 HDF5 文件名与论文 9 个默认任务相符，因此这些任务行的小计为：`9 × 1,000 = 9,000`。

论文明确报告完整发布规模为 `21K demos`，覆盖默认任务数据、不同 reset distributions 和额外 benchmark 数据。它应作为数据集标题总量，而当前九行仍表达默认任务文件的 `9,000` 小计。

**判定：** 数据集标题填论文口径 `21K demos`；九个当前任务行各填 `1,000`。两个数分别代表完整发布规模和当前索引子集，不能互相替代。

### 9. RoboCasa365 / GR00T 1000

当前网页把以下概念放在同一行：

- RoboCasa365 benchmark；
- RoboCasa365 的完整训练数据；
- 名称为 GR00T 1000 的单独 HF 数据；
- 当前下载链接 `huiwon/robocasa_mg_gr00t_1000`。

它们不是同一个统计口径。

官方 RoboCasa365 文档给出的名义数据规模为：

- Pretraining Human：`300 tasks × 100 demos = 30,000`
- Pretraining MimicGen：`60 tasks × 10,000 demos = 600,000`
- Target Human：`50 tasks × 500 demos = 25,000`
- 名义合计：`655,000`

来源：[RoboCasa 1.0.1 Dataset Overview](https://robocasa.ai/docs/build/html/datasets/datasets_overview.html)

另一方面，RoboCasa GR-1 官方仓库说明另一个数据集覆盖 24 个 tabletop tasks、每任务 1,000 个 human-collected demos，即名义上 24,000：

- [robocasa/robocasa-gr1-tabletop-tasks](https://github.com/robocasa/robocasa-gr1-tabletop-tasks)

另一个可公开核验的 LeRobot 转换仓库 `DAVIAN-Robotics/robocasa-MG_1000` 的 `meta/info.json` 也给出 `total_episodes: 24000`：

- [`DAVIAN-Robotics/robocasa-MG_1000/meta/info.json`](https://huggingface.co/datasets/DAVIAN-Robotics/robocasa-MG_1000/blob/main/meta/info.json)

但上述 24,000 证据不是项目当前 `huiwon/robocasa_mg_gr00t_1000` 链接本身的 metadata。当前链接没有可核验的 dataset card / `info.json` 证据，不能仅凭相似名称认定内容完全相同。

**判定：** 我之前直接把当前条目判为 24,000 过于确定，应撤回。建议把条目拆成 RoboCasa365 与 GR00T/RoboCasa MG 1000 两项，并让每项链接到能直接证明计数的官方或结构化 metadata；拆分前保持 `TBD`。

### 10. Genie Sim 3.0

官方 ModelScope 页面明确说明：

- 数据按 `dataset/<task>/<robot>/` 组织。
- 每个 task/robot 目录都包含 LeRobot metadata：`meta/info.json`、`episodes.jsonl`、`episodes_stats.jsonl`、`tasks.jsonl`。
- 每个 episode 的大文件保存在 `data/.../episode_XXXXXX.parquet`，视频另存。

来源：[GenieSim3.0-Dataset](https://modelscope.cn/datasets/agibot_world/GenieSim3.0-Dataset)

因此可以使用 ModelScope 文件树 API：

1. 只递归列出 `dataset/` 下的 `meta/info.json`；
2. 逐个读取小型 `info.json` 的 `total_episodes`，或计算 `episodes.jsonl` 行数；
3. 按 task/robot 去重后求和；
4. 不下载 43.55 TB 的 Parquet、视频或重建数据。

目前官方页面只给出 `10,000+ hours` 与 `200+ tasks`，没有直接展示完整 episode 总数。本报告没有执行完整 metadata 遍历，因此不伪造总数。

**判定：** 精确统计在技术上可行，但在实际完成 metadata 汇总前应保持 `TBD`。

## 对上一轮结论的修正

上一轮调查中以下判断仍成立：AIST、Humanoid Everyday、DECO-50、HapTile、OmniVitac、MolmoB0T 的公开总量级，以及旧 LET-Body 合并条目缺少 episode 证据。

需要修正两点：

1. **RoboCasa 当前条目不能直接写 24,000。** 24,000 对相关的 24-task × 1,000 数据集有可靠证据，但未直接证明项目当前 HF 链接的内容。
2. **MolmoB0T 的 1.7M 不是当前 9 行的精确和。** 它是论文 8 个核心任务的约数，当前第 9 个 ObjectBackfill 未被覆盖。

## 2026-07-17 网站落地结果

已更新：

- AIST-Bimanual：标题 `12,025`；16 个当前任务行小计 `1,400`
- Humanoid Everyday：`8,949`
- DECO-50：`8,000`
- HapTile：`1,726`
- OmniVitac：使用字符串 `21,000+ trajectories`
- DexMimicGen：标题 `21K demos`；9 个当前默认任务各 `1,000`，小计 `9,000`

未更新、继续显示 `TBD`：

- MolmoB0T（除非接受 8 个核心任务的约数说明）
- RoboCasa365 / GR00T 1000（先拆条目和修链接）
- Genie Sim 3.0（先运行 metadata-only 汇总）

LET-Body-Dataset 不在未更新列表中：最新版已将它替换为有数值的 LET-Base 与 LET-Dex。
