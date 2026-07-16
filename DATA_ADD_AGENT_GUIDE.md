# Dataset Add Agent Guide

This is the operating guide for another GPT/agent to add a new dataset to the website with the same format as the existing entries.

Required user input:

- `dataset_name`: the display name of the dataset section.
- `input_link`: the dataset, paper, project, Hugging Face, ModelScope, mirror, or organization link.

Optional user input:

- parent category, paper link, project link, citation, license, demo count, environment count, observations, actions.

If optional metadata is not present in the source and not provided by the user, write `TBD`. Do not invent numbers, licenses, citations, observation types, or action types.

## Files To Edit

Only `script.js` is normally required.

- `script.js`: dataset constants, row factories, rows, sections, parent groups, entry years, and rendering data.
- `index.html`: edit only if the table schema or filters are explicitly changed.
- `styles.css`: edit only if a new visual state is explicitly required.
- `DATA_UPDATE_QUEUE.md`: optional history/checklist; do not rely on it as the only implementation record.

## Current Website Shape

The table has exactly 7 visible columns:

1. `Task`
2. `Data Links`
3. `Observations`
4. `Actions`
5. `# Demos`
6. `License`
7. `Citation`

The hierarchy is:

1. parent category
2. optional dataset section
3. task rows

Fixed parent categories:

- `Robot Data`: real robot demonstrations, real robot sensor/action datasets.
- `UMI Data`: Universal Manipulation Interface datasets.
- `Simulation Data`: synthetic or simulator-generated data.
- `Ego Data`: egocentric human demonstration data.
- `General Data`: metadata, schemas, mixed resources, or datasets that do not fit the above.

Do not rename these categories unless the user explicitly asks.

## Row Schema

Every task row object should match this shape:

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

`envs` is retained in source row objects for dataset metadata, but it is not rendered as a visible table column.

Rules:

- `task` is the row label. Preserve meaningful source path levels with ` / `.
- `dataLinks` keys are the visible link labels, for example `HuggingFace`, `HF folder`, `HDF5`, `tar.gz`, `Website`, `ModelScope`, `Mirror`.
- `observations` and `actions` are arrays of short tags.
- `demos` can be a number only when source-backed; otherwise use `"TBD"`.
- `envs` can be a number or string only when source-backed; otherwise use `"TBD"`.
- `license` must come from the source or user; otherwise use `"TBD"`.
- Put `citation` on rows only if row citations differ. Otherwise put citation on the dataset section.

For a single landing row, prefer the existing helper:

```js
makeLandingRow({
  task: "Dataset Name episodes",
  href: "https://example.com/dataset",
  label: "Download",
  observations: ["TBD"],
  actions: ["TBD"],
  demos: "TBD",
  envs: "TBD",
  license: "TBD"
})
```

## Section Schema

Use a dataset section for every named dataset collection unless the parent category intentionally has only direct placeholder rows.

```js
{
  id: "dataset-id",
  project: "Dataset Name",
  summary: "One concise sentence describing the dataset and why rows are indexed this way.",
  projectLinks: {
    HuggingFace: "https://huggingface.co/datasets/org/repo",
    Paper: "https://arxiv.org/abs/..."
  },
  citation: `@misc{...}`,
  defaultOpen: false,
  rows: datasetRows
}
```

Rules:

- `id` is lower-case kebab-case and must be unique.
- `project` is the display name from `dataset_name`.
- `summary` must explain the indexing decision, for example task-level folders, top-level resources, gated repo, numeric shards, or single landing page.
- `projectLinks` should include only verified links.
- `citation` belongs here when all rows share it.
- `defaultOpen` should normally be `false` for new sections. Use `true` only if the user asks or the section is the current focus.
- `rows` must reference an array defined before `datasetGroups`.

## Where To Place Code In `script.js`

1. Define any repo constants, directory arrays, task arrays, row factories, and row arrays before `const datasetGroups = [...]`.
2. If adding to `Robot Data`, append a section to `additionalRobotDataSections`.
3. If adding to `Simulation Data`, append a section inside the `sections` array of the `simulation-data` group.
4. If adding to `UMI Data`, `Ego Data`, or `General Data`, prefer adding a `sections` array if it becomes a real named dataset collection; otherwise add direct rows only for placeholders or simple one-off resources.
5. If the source year is known, add an entry to `entryYears` using the section `id` as the key.

Do not change rendering functions unless the current schema cannot represent the data.

## Input-Link Decision Tree

Given only `dataset_name` and `input_link`:

1. Inspect the link.
2. Infer the parent category from the source and dataset description.
3. Decide the row granularity:
   - Use task-level rows when there are readable task folders or readable task files.
   - Use resource-level rows when the source exposes meaningful resources such as `observations`, `parameters`, `task_info`, or splits, but not readable task names.
   - Use one landing row when the link is a paper page, project page, organization page, gated repo, numeric shards only, a mirror with only archives, or a repo without stable task-level structure.
4. Add source-backed metadata only.
5. Validate JavaScript syntax.
6. Check the browser rendering if possible.

## Hugging Face Rules

For a Hugging Face dataset link:

1. Normalize the repo root to `org/repo`, for example:

```js
const datasetRepo = "org/repo";
```

2. Use existing helpers:

```js
hfDatasetBase(datasetRepo)
hfDatasetTree(datasetRepo, "path")
hfDatasetBlob(datasetRepo, "path/file.tar.gz")
```

3. Prefer task-level indexing for readable artifact paths. Common artifact types:

- `.tar.gz`
- `.zip`
- `.hdf5`
- `.h5`
- `.parquet`
- `.jsonl`
- `.zarr`

4. If paths follow a repeated hierarchy, create a compact source array and map it into rows:

```js
const datasetDirectories = [
  {
    category: "category_name",
    embodiment: "robot_or_platform",
    tasks: ["task_one", "task_two"]
  }
];

const makeDatasetTask = ({ category, embodiment, task }) => ({
  task: `${category} / ${embodiment} / ${task}`,
  dataLinks: {
    "tar.gz": hfDatasetBlob(datasetRepo, `${category}/${embodiment}/${task}.tar.gz`)
  },
  observations: ["TBD"],
  actions: ["TBD"],
  demos: "TBD",
  envs: embodiment,
  license: "TBD"
});

const datasetRows = datasetDirectories.flatMap((directory) =>
  directory.tasks.map((task) => makeDatasetTask({ ...directory, task }))
);
```

5. If there is no reliable task structure, add one row:

```js
const datasetRows = [
  makeLandingRow({
    task: "Dataset Name dataset",
    href: hfDatasetBase(datasetRepo),
    label: "HuggingFace",
    observations: ["TBD"],
    actions: ["TBD"],
    envs: "Dataset Name"
  })
];
```

## Non-Hugging Face Rules

For ModelScope, project pages, mirrors, cloud buckets, or custom websites:

- Use the source's real link label, for example `ModelScope`, `Website`, `Mirror`, `GCS Bucket`, or `Project`.
- If the page exposes stable downloadable archives, link directly to those archives.
- If it only exposes a collection or organization entry point, add one landing row and say that task-level rows should be added later when a stable dataset tree is available.
- If the source has a paper link or project link, put it in `projectLinks`, not `dataLinks`, unless it is the only available dataset access link.

Example:

```js
const datasetRows = [
  makeLandingRow({
    task: "Dataset Name collection",
    href: "https://modelscope.cn/collections/example",
    label: "ModelScope",
    observations: ["TBD"],
    actions: ["TBD"],
    envs: "Dataset Name"
  })
];
```

## Metadata Standards

Use these common tags only when supported by the source:

- Observations: `RGB`, `Video`, `Parquet`, `LeRobot`, `RLDS`, `WebDataset`, `HDF5`, `Robot Observations`, `Proprio`, `Language`, `Simulation Trajectories`, `Object Meshes`, `Task Metadata`.
- Actions: `Robot Actions`, `End Effector Pose`, `Gripper`, `Bimanual Dexterous Actions`, `Hand Grasps`, `Human Action`.
- License examples: `Apache-2.0`, `CC BY 4.0`, `CC BY-NC 4.0`, `CC BY-NC-SA 4.0`, `ODC-BY 1.0`, `See source`, `TBD`.

Do not convert string counts such as `"50,907 tasks"` into numbers unless the column represents a pure numeric demo count.

## Required Validation

Run:

```bash
/Users/jasperyip/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check script.js
```

Then verify in the page if possible:

- parent category renders
- dataset section renders
- task rows render
- search and filters still work
- citation opens if provided
- data links open in a new tab

## Final Response Checklist

When done, report:

- dataset name added
- parent category
- indexing plan used: task-level, resource-level, or single landing row
- number of rows added
- validation result
- any metadata left as `TBD`
