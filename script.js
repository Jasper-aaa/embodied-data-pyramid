const hfA1Base = "https://huggingface.co/datasets/InternRobotics/InternData-A1/blob/main";
const internDataA1Tasks = [
  "collect_the_shoes_language",
  "organize_the_alarm_clocks_language",
  "organize_the_brushes",
  "organize_the_colorful_cups",
  "organize_the_glues_language",
  "organize_the_teaboxes_language",
  "pick_the_priced_item",
  "select_a_drink",
  "sort_the_table_waste",
  "track_the_targets"
];

const makeInternDataA1Task = (task) => ({
  task,
  dataLinks: {
    "tar.gz": `${hfA1Base}/sim/basic_tasks/franka/${task}.tar.gz`
  },
  observations: ["RGB", "Proprio", "Language"],
  actions: ["End Effector Pose", "Gripper"],
  demos: "TBD",
  envs: "TBD",
  license: "CC BY-NC-SA 4.0"
});

const datasetGroups = [
  {
    id: "real-robot-data",
    project: "Real Robot Data",
    source: "real",
    summary: "Reserved section for your collected real robot demonstrations.",
    defaultOpen: true,
    rows: [
      {
        task: "General Manipulation",
        dataLinks: {},
        observations: ["RGB", "Proprio", "Wrist Camera"],
        actions: ["6 DoF End Effector", "Gripper"],
        demos: "TBD",
        envs: "TBD",
        license: "TBD"
      }
    ]
  },
  {
    id: "interndata-a1",
    project: "InternData-A1",
    source: "simulation",
    summary: "Simulation manipulation dataset from InternRobotics. This group indexes the 10 visible Franka basic-task archives under sim/basic_tasks/franka.",
    projectLinks: {
      HuggingFace: "https://huggingface.co/datasets/InternRobotics/InternData-A1/tree/main",
      "basic_tasks/franka": "https://huggingface.co/datasets/InternRobotics/InternData-A1/tree/main/sim/basic_tasks/franka",
      Paper: "https://arxiv.org/abs/2406.05839"
    },
    defaultOpen: true,
    rows: internDataA1Tasks.map(makeInternDataA1Task)
  },
  {
    id: "m1-simulation",
    project: "M1 Simulation Data",
    source: "simulation",
    summary: "Placeholder group for larger M1 simulation task families.",
    defaultOpen: false,
    rows: [
      {
        task: "Tabletop Pick and Place",
        dataLinks: {},
        observations: ["RGB", "Depth", "Segmentation", "Proprio"],
        actions: ["6 DoF End Effector", "Parallel Gripper"],
        demos: 95000,
        envs: 320,
        license: "TBD"
      },
      {
        task: "Room-scale Rearrangement",
        dataLinks: {},
        observations: ["RGB", "Depth", "Map", "Proprio"],
        actions: ["Base Velocity", "6 DoF End Effector", "Gripper"],
        demos: 76000,
        envs: 240,
        license: "TBD"
      }
    ]
  }
];

const groupOpenState = Object.fromEntries(datasetGroups.map((group) => [group.id, group.defaultOpen]));

const formatNumber = (value) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("en-US").format(value);
};

const unique = (items) => [...new Set(items)];

const getAllRows = () => datasetGroups.flatMap((group) => group.rows.map((row) => ({ ...row, group })));

const normalize = (value) => String(value || "").toLowerCase();

const tagList = (items) => `
  <div class="tag-list">
    ${items.map((item) => `<span class="mini-tag">${item}</span>`).join("")}
  </div>
`;

const linkList = (links) => {
  const entries = Object.entries(links);
  if (!entries.length) return '<span class="muted">Coming soon</span>';
  return `
    <div class="link-list">
      ${entries.map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`).join("")}
    </div>
  `;
};

const projectLinkList = (links = {}) => {
  const entries = Object.entries(links);
  if (!entries.length) return "";
  return `<span class="group-links">${entries.map(([label, href]) => `<a href="${href}" target="_blank" rel="noreferrer">${label}</a>`).join(" / ")}</span>`;
};

const rowMatchesFilters = (row, group) => {
  const query = normalize(document.querySelector("#searchInput").value.trim());
  const source = document.querySelector("#sourceFilter").value;
  const task = document.querySelector("#taskFilter").value;
  const haystack = normalize([
    group.project,
    group.source,
    group.summary,
    row.task,
    row.license,
    ...row.observations,
    ...row.actions,
    ...Object.keys(row.dataLinks)
  ].join(" "));

  return (!query || haystack.includes(query)) &&
    (source === "all" || group.source === source) &&
    (task === "all" || row.task === task);
};

const getFilteredGroups = () => datasetGroups
  .map((group) => ({
    ...group,
    rows: group.rows.filter((row) => rowMatchesFilters(row, group))
  }))
  .filter((group) => group.rows.length);

const renderStats = () => {
  const rows = getAllRows();
  const totalDemos = rows.reduce((sum, item) => sum + (typeof item.demos === "number" ? item.demos : 0), 0);
  const stats = [
    ["Dataset groups", datasetGroups.length],
    ["Task rows", rows.length],
    ["Simulation rows", rows.filter((item) => item.group.source === "simulation").length],
    ["Real robot rows", rows.filter((item) => item.group.source === "real").length]
  ];

  document.querySelector("#stats").innerHTML = stats.map(([label, value]) => `
    <article class="stat-card">
      <span class="stat-value">${formatNumber(value)}</span>
      <span class="stat-label">${label}</span>
    </article>
  `).join("");
};

const renderTaskGroups = () => {
  document.querySelector("#taskGroups").innerHTML = datasetGroups.map((group) => {
    const demos = group.rows.reduce((sum, item) => sum + (typeof item.demos === "number" ? item.demos : 0), 0);
    return `
      <article class="task-card">
        <h3>${group.project}</h3>
        <p>${group.summary}</p>
        <div class="task-meta">
          <span class="pill ${group.source}">${group.source}</span>
          <span class="pill">${group.rows.length} task rows</span>
          <span class="pill">${formatNumber(demos)} demos</span>
        </div>
      </article>
    `;
  }).join("");
};

const renderTaskFilter = () => {
  const options = unique(getAllRows().map((item) => item.task)).sort();
  document.querySelector("#taskFilter").insertAdjacentHTML(
    "beforeend",
    options.map((task) => `<option value="${task}">${task}</option>`).join("")
  );
};

const renderRows = () => {
  const groups = getFilteredGroups();
  const queryActive = Boolean(document.querySelector("#searchInput").value.trim());
  const taskActive = document.querySelector("#taskFilter").value !== "all";

  document.querySelector("#datasetRows").innerHTML = groups.map((group) => {
    const isOpen = queryActive || taskActive || groupOpenState[group.id];
    const groupRow = `
      <tr class="group-row" data-group="${group.id}">
        <td colspan="7">
          <button class="group-toggle" type="button" data-group="${group.id}" aria-expanded="${isOpen}">
            <span class="chevron">${isOpen ? "v" : ">"}</span>
            <span class="dataset-name">${group.project}</span>
            <span class="pill ${group.source}">${group.source}</span>
            <span class="dataset-sub">${group.rows.length} task rows</span>
          </button>
          <span class="group-summary">${group.summary}</span>
          ${projectLinkList(group.projectLinks)}
        </td>
      </tr>
    `;

    const childRows = isOpen ? group.rows.map((row) => `
      <tr class="task-row" data-parent="${group.id}">
        <td>
          <span class="task-name">${row.task}</span>
        </td>
        <td>${linkList(row.dataLinks)}</td>
        <td>${tagList(row.observations)}</td>
        <td>${tagList(row.actions)}</td>
        <td>${formatNumber(row.demos)}</td>
        <td>${formatNumber(row.envs)}</td>
        <td>${row.license}</td>
      </tr>
    `).join("") : "";

    return groupRow + childRows;
  }).join("") || `
    <tr>
      <td colspan="7" class="muted">No dataset rows match the current filters.</td>
    </tr>
  `;

  document.querySelectorAll(".group-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const groupId = button.dataset.group;
      groupOpenState[groupId] = !groupOpenState[groupId];
      renderRows();
    });
  });
};

renderStats();
renderTaskGroups();
renderTaskFilter();
renderRows();

document.querySelector("#searchInput").addEventListener("input", renderRows);
document.querySelector("#sourceFilter").addEventListener("change", renderRows);
document.querySelector("#taskFilter").addEventListener("change", renderRows);
