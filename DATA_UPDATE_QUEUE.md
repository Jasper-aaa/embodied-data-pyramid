# Data Update Queue

This file is the required checklist for future dataset updates. Read this file before editing `script.js`, `index.html`, or `styles.css`.

## Current Fixed Format

The website table has 8 fixed columns:

1. `Task`
2. `Data Links`
3. `Observations`
4. `Actions`
5. `# Demos`
6. `# Envs`
7. `License`
8. `Citation`

The table hierarchy is fixed:

1. Parent category
2. Optional dataset section
3. Task rows

The parent categories are fixed and should not be renamed without an explicit request:

- `Robot Data`
- `UMI Data`
- `Simulation Data`
- `Ego Data`
- `General Data`

`Simulation Data` currently uses a nested section:

- `Simulation Data`
  - `InternData-A1`
    - Task rows generated from Hugging Face paths

Other parent categories can either keep direct `rows` or gain `sections` later if they need dataset-level grouping.

## Code Locations

- `index.html`: table headers and filter controls.
- `styles.css`: parent row, section row, task row, and citation styles.
- `script.js`: all dataset data and rendering logic.

Important `script.js` regions:

- Hugging Face base URLs near the top, for example `hfA1TreeBase` and `hfA1BlobBase`.
- Dataset-specific directory/task arrays, for example `internDataA1Directories`.
- Task factory functions, for example `makeInternDataA1Task`.
- `datasetGroups`, which defines parent categories, optional sections, links, citations, and rows.

## Row Schema

Each task row should use this shape:

```js
{
  task: "category / embodiment / task_name",
  dataLinks: {
    "tar.gz": "https://huggingface.co/datasets/org/repo/blob/main/path/file.tar.gz"
  },
  observations: ["RGB", "Proprio", "Language"],
  actions: ["End Effector Pose", "Gripper"],
  demos: "TBD",
  envs: "TBD",
  license: "TBD"
}
```

Use `TBD` when the source does not clearly provide a value. Do not invent demo counts, environment counts, licenses, observations, or actions.

## Section Schema

Use a section when a parent category contains a named dataset collection:

```js
{
  id: "dataset-id",
  project: "Dataset Name",
  summary: "Short dataset description.",
  projectLinks: {
    HuggingFace: "https://huggingface.co/datasets/org/repo/tree/main",
    Paper: "https://arxiv.org/abs/..."
  },
  citation: `@inproceedings{...}`,
  defaultOpen: true,
  rows: datasetRows
}
```

Citation belongs on the section when all task rows share the same citation. Only put citation on individual rows when rows have different citations.

## Hugging Face Indexing Logic

When the user provides a Hugging Face dataset link:

1. Identify the repo root, for example `https://huggingface.co/datasets/org/repo`.
2. Define both base URLs:

```js
const datasetTreeBase = "https://huggingface.co/datasets/org/repo/tree/main";
const datasetBlobBase = "https://huggingface.co/datasets/org/repo/blob/main";
```

3. Inspect the repo tree. Prefer task-level indexing when paths expose repeated task files or task folders.
4. Treat these as likely downloadable task artifacts:
   - `.tar.gz`
   - `.zip`
   - `.hdf5`
   - `.h5`
   - `.parquet`
   - `.jsonl`
   - `.zarr`
5. Preserve meaningful path levels in the `task` label. Follow the InternData-A1 pattern:

```js
const path = `sim/${category}/${embodiment}/${task}.tar.gz`;
task: `${category} / ${embodiment} / ${task}`;
dataLinks: {
  "tar.gz": `${datasetBlobBase}/${path}`
}
```

6. If the repo has a clear hierarchy, make an array like:

```js
const datasetDirectories = [
  {
    category: "category_name",
    embodiment: "robot_or_platform",
    tasks: ["task_one", "task_two"]
  }
];
```

Then generate rows with a factory function instead of writing repetitive row objects by hand.

7. If no reliable task structure can be found, do not force a task split. Add one row with a download/project link:

```js
{
  task: "Dataset Name",
  dataLinks: {
    Download: "https://huggingface.co/datasets/org/repo"
  },
  observations: ["TBD"],
  actions: ["TBD"],
  demos: "TBD",
  envs: "TBD",
  license: "TBD"
}
```

## Category Selection Rules

Use the parent category that best matches the dataset:

- `Robot Data`: real robot demonstrations, robot sensor/action datasets.
- `UMI Data`: Universal Manipulation Interface datasets.
- `Simulation Data`: synthetic or simulator-generated data.
- `Ego Data`: egocentric human demonstration data.
- `General Data`: metadata, schemas, mixed resources, or datasets that do not fit the other categories.

When unsure, add a note in the queue and default to `General Data` only if the source does not clearly match a stronger category.

## Update Workflow

For each requested dataset update:

1. Add or update a queue entry in this file.
2. Inspect the provided link or metadata.
3. Decide whether the source has task-level structure.
4. If task-level structure exists, add a dataset-specific directory array and row factory in `script.js`.
5. Add a section under the correct parent category in `datasetGroups`.
6. Add `projectLinks`, `citation`, `license`, and metadata only when supported by the source or provided by the user.
7. Run validation:

```bash
/Users/jasperyip/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check script.js
```

8. Open `index.html` in the browser or run Playwright checks to confirm:
   - parent category renders
   - section renders
   - task rows render
   - filters still work
   - citation opens if provided

## Pending Dataset Queue

Use this queue for future additions. Keep newest requests at the top.

| Status | Date | Parent Category | Section | Input Link | Indexing Plan | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Done | 2026-07-04 | UMI Data | UMI community batch | https://umi-data.github.io/#datasets plus user-provided LaTeX UMI table | Dataset sections sorted by year; task-level rows generated from the UMI community registry where available | Added 21 UMI-style datasets and 158 rows. 19 datasets use community task rows with links/obs/actions/demos/envs/license/citation; FreeTacMan and Daimon-Infinity were not present in the community page source and are conservative LaTeX-based placeholder rows |
| Done | 2026-07-04 | Robot Data | Robot Data revision pass | User follow-up request plus Hugging Face / Dropbox / ModelScope checks | Year-sorted dataset sections; Robot `# Envs` display forced to `TBD`; LET split into Base/Dex/Body; AIST expanded to public format folders plus visible HDF5 task ZIPs | Added checked licenses for DECO-50, Dexora, AgiBot World Beta/2026, Unitree UnifoLM-WBT, PH2D, RoVid-X, LingBot-Depth, HapTile, OmniVitac, and LET; validated with `node --check` and DOM smoke test |
| Done | 2026-07-04 | Robot Data | README batch additions | User-provided README/list plus LaTeX statistics table | Mixed: task-family rows for visible HF folders/files, source-level rows for single archives/pages, collection rows for Unitree | Added DAML, MIME, MT-Opt, RH20T, FMB, REASSEMBLE, PH2D, AIST-Bimanual, DECO-50, Dexora, AgiBot World 2026, Unitree UnifoLM-WBT, RoVid-X, LingBot-Depth, HapTile, and OmniVitac; updated selected existing Robot Data observation/action stats |
| Done | 2026-06-28 | Simulation Data | InternData-M1 | https://huggingface.co/datasets/InternRobotics/InternData-M1 | Single dataset row | Gated HF repo exposes LeRobot agilex/franka/robotiq subdatasets rather than task-named archives; 244,426 demos and release-year labels added |
| Done | 2026-06-28 | Simulation Data | DexGraspNet | https://mirrors.pku.edu.cn/dl-release/DexGraspNet-ICRA2023/ | Single mirror row | PKU mirror exposes `dexgraspnet.tar.gz` and `meshdata.tar.gz` rather than task-level trajectories; 1.32M grasps and citation added |
| Done | 2026-06-28 | Simulation Data | MimicGen | https://huggingface.co/datasets/amandlek/mimicgen_datasets | Task-level rows from HDF5 files across source/core/object/robot/large_interpolation | Added 62 HDF5 task rows; citation added |
| Done | 2026-06-28 | Simulation Data | DexGraspNet 2.0 | https://huggingface.co/datasets/lhrlhr/DexGraspNet2.0 | Single dataset row | HF repo exposes grasp archives, scenes, models, and checkpoints rather than task-level trajectories; 427M grasps and citation added |
| Done | 2026-06-28 | Simulation Data | DexMimicGen | https://huggingface.co/datasets/MimicGen/dexmimicgen_datasets/tree/main/generated | Task-level rows from `generated/<task>.hdf5` files | Added 9 generated HDF5 task rows; citation added |
| Done | 2026-06-28 | Simulation Data | NVIDIA GR00T-X Sim | https://huggingface.co/datasets/nvidia/PhysicalAI-Robotics-GR00T-X-Embodiment-Sim | Task-level rows from Hugging Face dataset folders | Added 82 rows across 5 GR00T-X Sim task families; citation added |
| Done | 2026-06-28 | Simulation Data | MolmoB0T | https://huggingface.co/papers/2603.16861 | Config-level rows from the 9 Hugging Face dataset configs | Added 8 training task config rows plus 1 FrankaPickAndPlace extension config row; citation added |
| Done | 2026-06-27 | Robot Data | Let-Dataset | https://modelscope.cn/organization/lejurobot | Single ModelScope organization row | Waiting for a specific dataset repository before task-level indexing; citation added |
| Done | 2026-06-27 | Robot Data | Baihu-VTouch | https://www.openloong.org.cn/cn/datasets/baihu-vtouch | Single website row | No stable task-level download tree found from the provided page; citation added |
| Done | 2026-06-27 | Robot Data | MolmoAct2 | https://huggingface.co/datasets/allenai/MolmoAct2-BimanualYAM-Dataset | Single dataset row | HF repo exposes parquet/video shards rather than task-named archives; citation added |
| Done | 2026-06-27 | Robot Data | RoboMIND 2.0 | https://modelscope.cn/collections/X-Humanoid/RoboMIND20 | Single ModelScope collection row | Waiting for a specific dataset repository before task-level indexing; citation added |
| Done | 2026-06-27 | Robot Data | Humanoid Everyday | https://huggingface.co/datasets/USC-PSI-Lab/humanoid-everyday | Single dataset row | HF repo exposes episode parquet/video shards rather than task-named archives; citation added |
| Done | 2026-06-27 | Robot Data | RoboCOIN | https://flagopen.github.io/RoboCOIN-DataManager/ | Single website row | No stable task-level download tree found from the provided page; citation added |
| Done | 2026-06-27 | Robot Data | RealSource World | https://huggingface.co/datasets/RealSourceData/RealSource-World | Task-level rows from top-level HF task directories | Added 36 task rows; citation added |
| Done | 2026-06-27 | Robot Data | Open Galaxea | https://huggingface.co/datasets/OpenGalaxea/Galaxea-Open-World-Dataset | Task-level rows from `lerobot/<task>.tar.gz` archives | Added 227 task archive rows; citation added |
| Done | 2026-06-27 | Robot Data | ActionNet | https://huggingface.co/datasets/FourierIntelligence/ActionNet | Single dataset row | HF repo exposes numbered tar shards rather than task-named archives; citation added |
| Done | 2026-06-27 | Robot Data | AgiBot World Beta | https://huggingface.co/datasets/agibot-world/AgiBotWorld-Beta | Resource-level rows for observations, parameters, proprio stats, and task metadata | HF repo exposes 217 numeric task IDs but not readable task names; citation added |
| Done | 2026-06-27 | Robot Data | RoboMIND | https://huggingface.co/datasets/x-humanoid-robomind/RoboMIND | Benchmark/embodiment rows | Multipart tar.gz task archives make full task-level rows unwieldy; added 22 benchmark/embodiment rows; citation added |
| Done | 2026-06-27 | Robot Data | Open X-Embodiment | https://console.cloud.google.com/storage/browser/gdm-robotics-open-x-embodiment?pli=1 | Source-level rows for the requested source collections, not task-level rows | Public GCS exposes dataset/RLDS directories rather than stable task archives; DROID, Mobile-Aloha, and RoboSet currently point to bucket root until exact paths are provided or found |
| Done | 2026-06-27 | Simulation Data | InternData-A1 | https://huggingface.co/datasets/InternRobotics/InternData-A1 | Task-level rows from `sim/<category>/<embodiment>/<task>.tar.gz` | Paper link set to https://arxiv.org/abs/2511.16651; citation added |

Status values:

- `Pending`: requested but not inspected yet.
- `Inspecting`: link is being checked.
- `Ready`: indexing plan is clear.
- `Done`: added to the website and validated.
- `Blocked`: missing link, inaccessible source, or unclear category.

## Future User Input Format

The user may provide only a data link. If so:

1. Use this file as the update contract.
2. Infer parent category and section name from the source.
3. Prefer task-level Hugging Face indexing.
4. If task-level indexing is not discoverable, add a single dataset row with the download link.
5. Ask only if the category, citation, or license cannot be inferred and the choice would materially affect the website.
