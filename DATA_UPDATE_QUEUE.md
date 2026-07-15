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
2. Optional subcategory for `Simulation Data`
3. Optional dataset section
4. Task rows

The parent categories are fixed and should not be renamed without an explicit request:

- `Robot Data`
- `UMI Data`
- `Simulation Data`
- `Ego Data`
- `General Data`

`Simulation Data` currently uses a nested section:

- `Simulation Data`
  - `Large-Scale Simulation Data`
    - Dataset sections
    - Task rows generated from dataset-specific paths
  - `Benchmark`
    - Simulation benchmark dataset sections

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

For this Simulation Data update thread, new user-provided Simulation datasets should be placed under the `Benchmark` subcategory unless the user explicitly asks for another Simulation subcategory.

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
| Done | 2026-07-15 | All categories | Initial collapsed state | N/A | Rendering-state initialization | Changed parent categories, Simulation subcategories, and dataset sections to initialize closed on first page load; clicking toggles still works and active search/source/task filters still expand matching results automatically |
| Done | 2026-07-15 | Robot Data / UMI Data / Simulation Data | User-counted demo totals | User-provided counts | Dataset-section total overrides with `\dagger` marker | Set AgiBot World 2026 to 20,758, AgiBot World Beta to 166,237, Daimon-Infinity to 274,669, RoboCOIN to 100,230, Open Galaxea to 20,662, FastUMI to 9,277, RoboMIND to 74,211, RoboMIND 2.0 to 185,432, Open X-Embodiment / LeRobot OXE to 316,230, and InternData-A1 to 604,722; each value is displayed with a superscript dagger to identify a self-counted total; task-row demo values remain unchanged |
| Done | 2026-07-15 | Robot Data / UMI Data / Simulation Data | Dataset total demos | N/A | Dataset-section total in the fixed `# Demos` column | Added dataset-level demo totals to section header rows for the three requested categories only; sections with entirely numeric task-row counts are summed, known simulation totals stored in non-numeric row labels use explicit totals, and incomplete or non-demo-only statistics display `TBD`; Ego Data and General Data remain unchanged |
| Done | 2026-07-14 | Ego Data | `ego-data` branch merge | https://github.com/Jasper-aaa/embodied-data-pyramid/tree/ego-data | Dataset sections with resource-level download/access rows | Merged commits `27f1e5b` and `b283fd6` from the GitHub `ego-data` branch into local `main` as merge commit `092600f`; added 37 Ego dataset sections and 178 resource rows spanning EgoHands through Xperience-10M; preserved existing Robot, UMI, Simulation, General Data, fixed 8-column rows, citations, year metadata, and the local display cleanup that hides section summaries |
| Done | 2026-07-13 | All categories | Display cleanup | N/A | Rendering-only cleanup | Removed the complete Indexing Principles section and stopped rendering summary descriptions beneath Task Groups, parent categories, Simulation subcategories, and dataset section headings; retained summary fields as search metadata so filtering behavior and dataset content remain unchanged |
| Done | 2026-07-05 | Simulation Data / Benchmark | RoboSet / RoboHive | https://robopen.github.io/roboset/teleoperation.html | Task-level rows from 38 official teleoperation table downloads | Added 38 activity/task/scene rows from the official teleoperation table; each row links its `dl.fbaipublicfiles.com` `.tar.gz` archive and records 250 demonstrations; page states 9,500 immediately downloadable teleoperated trajectories and a broader 30,050-trajectory RoboSet, with 12 skills across 38 tasks, 4 camera views per frame, language-defined tasks, scene variations, and Oculus Quest 2 teleoperation; RoboSet page marks MIT license; section uses RoboAgent/RoboSet arXiv BibTeX/BibLaTeX citation; note that this is real-world teleoperation data but is placed under Simulation Data / Benchmark per this thread's current benchmark ingestion flow |
| Done | 2026-07-05 | Simulation Data / Benchmark | FurnitureBench | https://drive.google.com/drive/folders/1j59vFmgBsatu1PZK52HWX_9o5BCh_XDt?usp=sharing | Furniture/randomness-level rows from official dataset statistics and download script file IDs | Added 27 rows for 9 furniture models x low/medium/high initialization randomness; official project dataset table confirms 5,100 successful teleoperation demonstrations, 219.6 hours, and per-row demos/average length/total hours; docs confirm Google Drive structure `low/med/high/<furniture>/*.pkl`, compressed `*_compressed/<furniture>.tar.gz`, file format with wrist/front RGB, robot state, 8-D actions, rewards, skill flags, and metadata; download script provides stable gdown file IDs for each compressed tarball; section includes project/docs/GitHub/Drive/arXiv links and RSS 2023 BibTeX/BibLaTeX citation; dataset license is not clearly stated, so rows use `TBD` rather than code MIT |
| Done | 2026-07-05 | Simulation Data / Benchmark | ManiSkill | https://pepy.tech/projects/mani_skill?timeRange=threeMonths&category=version&includeCIDownloads=true&granularity=weekly&viewType=line&versions=Total%2C3.* | Env-level rows from 16 Hugging Face demonstration folders | User link is package download statistics, not a dataset entry; added it as a PePy stats project link and used the official `haosulab/ManiSkill_Demonstrations` Hugging Face dataset for downloads; HF tree exposes 16 `demos/<env>` folders and matching `.zip` archives; row demo counts come from the official JSON metadata episode arrays; docs confirm task-ID demo downloads, HDF5 trajectory format, JSON metadata, env states, actions, optional observations, and sample videos; HF card records Apache-2.0 license, while ManiSkill README notes rigid-body environments are permissive and assets are CC BY-NC 4.0; section includes project/docs/tasks/GitHub/HF/PePy/arXiv links and ManiSkill3 RSS 2025 citation |
| Done | 2026-07-05 | Simulation Data / Benchmark | LIBERO | https://libero-project.github.io/datasets | Task-level rows from 130 HDF5 files in the official Hugging Face mirror | Added 130 task rows from `yifengzhu-hf/LIBERO-datasets` across LIBERO-Spatial, LIBERO-Object, LIBERO-Goal, LIBERO-90, and LIBERO-10; official dataset page confirms workspace/wrist RGB, proprioception, language task specifications, PDDL scene descriptions, 130 tasks, 65,000 high-quality demonstrations, and suite sizes of 10/10/10/100 tasks; paper confirms 50 trajectories of high-quality demonstrations for every task; official README gives dataset license as CC BY 4.0 even though the HF mirror card is tagged Apache-2.0; section includes project/docs/GitHub/arXiv/HF links and BibTeX/BibLaTeX citation |
| Done | 2026-07-05 | Simulation Data / Benchmark | ManiSkill-HAB | https://arth-shukla.github.io/mshab/#dataset-section | Task-level rows from the 3 official long-horizon Hugging Face datasets | Added TidyHouse, PrepareGroceries, and SetTable rows; project dataset table confirms 2x 128x128 RGB-D plus state, 1000 episodes per target object/articulation, event labels on all trajectories, and per-task scale of 18K/18K/8K episodes with 3.6M/3.6M/1.6M transitions; HF cards confirm MIT license and expose subtask-level `.h5`/`.json` files; section includes project/GitHub/arXiv/OpenReview/HF links plus ICLR 2025 BibTeX/BibLaTeX citation |
| Done | 2026-07-05 | Simulation Data / Benchmark | The Colosseum | https://huggingface.co/datasets/colosseum/colosseum-challenge | Task-level rows from 20 top-level Hugging Face `.tar.gz` task archives | Added 20 RLBench task rows; HF README confirms 20 tasks, 100 training demonstrations for vanilla tasks, and 25 test demonstrations for each applicable variation factor; rows preserve the original unit rather than flattening variation counts; dataset card records MIT license and section includes project/docs/GitHub/paper links plus arXiv BibTeX/BibLaTeX citation |
| Done | 2026-07-05 | Simulation Data / Benchmark | VLABench | https://huggingface.co/datasets/VLABench/vlabench_primitive_ft_lerobot_video | Config-level rows from 10 Hugging Face primitive fine-tuning configs | Added 10 primitive fine-tuning task rows; HF card exposes 10 task configs and README/meta confirms LeRobot v3, robot_type `panda`, total_episodes 5000, and train split 0:5000; each row records 500 episodes for a Franka Panda 7-DoF arm; section also links VLM evaluation data and records benchmark scale as 100 task categories and 2,000+ objects; MIT license and arXiv BibTeX/BibLaTeX citation added |
| Done | 2026-07-05 | Simulation Data / Benchmark | RoboTwin 2.0 | https://huggingface.co/datasets/TianxingChen/RoboTwin2.0/tree/main/dataset | Task-level rows from 50 Hugging Face `dataset/<task>` folders | Added 50 task rows; HF API exposes 50 task folders and 460 zip files, corresponding to 230 embodiment-task clean/randomized pairs; each row records filename-derived demos as embodiment count x `(50 clean + 500 randomized)` and links to the task folder; official project/GitHub describe 50 dual-arm tasks, 5 robot embodiments, and over 100,000 pre-collected trajectories; MIT license and arXiv BibTeX/BibLaTeX citation added |
| Done | 2026-07-05 | Simulation Data / Benchmark | RoboCerebra | https://huggingface.co/datasets/qiukingballball/RoboCerebra | Single benchmark row | Added user-requested LIBERO/robosuite single tabletop arm row; HF repo exposes raw trainset, RLDS exports, and benchmark case folders rather than a stable task-level dataset split; project confirms 1,000 human-annotated trajectories across 100 task variants with long horizons; row records Franka Panda-style setup, MIT dataset license, and arXiv/project BibTeX/BibLaTeX citation |
| Done | 2026-07-05 | Simulation Data / Benchmark | GenManip / GenManip-Bench | https://huggingface.co/datasets/Axi404/GenManip-Dataset-OOC_Bench | Single benchmark row | Added user-requested single Franka Arm in Isaac Sim row; HF repo exposes episode parquet/video shards under `data/`, `meta/`, and `videos/` rather than task-level folders; row records ~1.07k demos/episodes for OOC_Bench, paper-scale 200 benchmark scenarios and 10K annotated 3D object assets, TBD license, and CVPR/arXiv BibTeX/BibLaTeX citation |
| Done | 2026-07-05 | Simulation Data / Benchmark | RoboVerse | https://huggingface.co/datasets/RoboVerseOrg/roboverse_data | Single benchmark row | Added as one unified benchmark/corpus row per user-provided `1`; HF repo exposes broad resource folders and source-level `trajs/` folders rather than stable task-level counts; row records 510.5k manipulation trajectories with paper-summary note of 500k unique trajectories, multi-embodiment coverage, Apache-2.0 license, and arXiv BibTeX/BibLaTeX citation |
| Done | 2026-07-05 | Simulation Data / Benchmark | BiCoord | https://huggingface.co/datasets/GradiusTwinbee/BiCoord | Task-level rows from 18 top-level Hugging Face task folders | Added user-requested dual Agile benchmark metadata; HF API exposes 18 task directories with `demo_clean/_traj_data`, `data`, `instructions`, `stages`, and `video`; row records 100 trajectories/task, MIT license, project/GitHub/checkpoint links, and arXiv BibTeX/BibLaTeX citation |
| Done | 2026-07-04 | Simulation Data / Benchmark | MIKASA-Robo-VLA | https://github.com/CognitiveAISystems/MIKASA-Robo | Single benchmark row | Added user-requested single Franka benchmark row; official docs/GitHub describe the 2026 ICLR MIKASA-Robo-VLA release with 90 tasks and 22,500 trajectories; row records MIT license and OpenReview BibTeX/BibLaTeX citation |
| Done | 2026-07-04 | Simulation Data / Benchmark | RoboMME | https://huggingface.co/datasets/Yinpei/robomme_data_h5 | Single benchmark row | User requested single row; HF card confirms H5 data with 16 tasks and 100 episodes/task; row records Franka, 1,600 total episodes, Apache-2.0 license, and complete arXiv BibTeX/BibLaTeX citation |
| Done | 2026-07-04 | Simulation Data / Benchmark | RMbench | https://huggingface.co/datasets/THU-KEG/RM-Bench | Single benchmark row | Added with user-provided robotics metadata: dual Agile, 9 tasks, 50 demonstrations/task; complete BibTeX/BibLaTeX citation added with user-corrected 2026 year; note that the linked HF card itself is a text reward-model benchmark, so robotics task/demo metadata is not from that HF card |
| Done | 2026-07-04 | Simulation Data / Benchmark | UniVTAC | https://modelscope.cn/datasets/byml2024/UniVTAC | Single benchmark row | User requested single row; ModelScope README confirms 100 episodes/task, 800 episodes across 8 benchmark tasks, and MIT license; row records GelSight/ViTai/Xense tactile sensors with Franka |
| Done | 2026-07-04 | Simulation Data / Benchmark | Genie Sim 3.0 | https://modelscope.cn/datasets/agibot_world/GenieSim3.0-Dataset/tree/master/dataset/ | Single benchmark row | ModelScope README shows `dataset/<task>/<robot>` LeRobot structure but the provided page does not expose a stable full task list; confirmed 10,000+ hours, 200+ tasks, Isaac Sim, and CC BY-NC-SA 4.0 from README |
| Done | 2026-07-04 | Simulation Data / Benchmark | RoboCasa365 | https://huggingface.co/docs/lerobot/main/robocasa | Single benchmark row | Download link updated to https://huggingface.co/datasets/huiwon/robocasa_mg_gr00t_1000; LeRobot docs confirm 600+ hours, 365 tasks, 2,500 kitchens, and 3,200+ objects |
| Done | 2026-07-04 | Simulation Data / Benchmark | Benchmark Reset | N/A | Cleared benchmark subcategory | Per user correction, cleared all Benchmark rows and will re-add benchmark datasets one by one after source-level verification; `Large-Scale Simulation Data` remains intact |
| Done | 2026-07-03 | Simulation Data | Pipeline Subcategories | N/A | Subcategory grouping | Added `Large-Scale Simulation Data` and `Benchmark`; moved existing Simulation Data sections under Large-Scale Simulation Data |
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
5. Put future Simulation Data requests in `Benchmark` by default unless the user explicitly asks for another Simulation subcategory.
6. Ask only if the category, citation, or license cannot be inferred and the choice would materially affect the website.
