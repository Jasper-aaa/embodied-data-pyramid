const datasets = [
  {
    project: "Real Robot Data",
    split: "Placeholder",
    source: "real",
    task: "General Manipulation",
    robot: "Real robot platform",
    observations: ["RGB", "Proprio", "Wrist Camera"],
    actions: ["6 DoF End Effector", "Gripper"],
    demos: "TBD",
    envs: "TBD",
    links: {},
    notes: "Reserved section for your collected real robot demonstrations."
  },
  {
    project: "A1 Locomotion Simulation",
    split: "Rough terrain locomotion",
    source: "simulation",
    task: "Legged Locomotion",
    robot: "Unitree A1",
    observations: ["Depth", "Height Map", "IMU", "Joint State", "Velocity Command"],
    actions: ["Joint Position", "Joint Torque"],
    demos: 120000,
    envs: 512,
    links: { docs: "#format" },
    notes: "Large-scale simulated quadruped data for uneven terrain, slope, and obstacle crossing."
  },
  {
    project: "A1 Locomotion Simulation",
    split: "Stairs and gaps",
    source: "simulation",
    task: "Legged Locomotion",
    robot: "Unitree A1",
    observations: ["Depth", "IMU", "Foot Contact", "Joint State"],
    actions: ["Joint Position", "Joint Torque"],
    demos: 68000,
    envs: 384,
    links: { docs: "#format" },
    notes: "Task split for step climbing, gap crossing, and recovery behaviors."
  },
  {
    project: "A1 Navigation Simulation",
    split: "Command following",
    source: "simulation",
    task: "Navigation",
    robot: "Unitree A1",
    observations: ["RGB", "Depth", "IMU", "Goal Command", "Joint State"],
    actions: ["Base Velocity", "Joint Target"],
    demos: 85000,
    envs: 256,
    links: { docs: "#format" },
    notes: "Goal-conditioned navigation with obstacle avoidance in indoor and outdoor scenes."
  },
  {
    project: "M1 Manipulation Simulation",
    split: "Tabletop pick and place",
    source: "simulation",
    task: "Object Manipulation",
    robot: "M1 Mobile Manipulator",
    observations: ["RGB", "Depth", "Segmentation", "Proprio"],
    actions: ["6 DoF End Effector", "Parallel Gripper"],
    demos: 95000,
    envs: 320,
    links: { docs: "#format" },
    notes: "Single-arm grasping, placing, stacking, and object rearrangement task family."
  },
  {
    project: "M1 Manipulation Simulation",
    split: "Articulated object interaction",
    source: "simulation",
    task: "Articulated Interaction",
    robot: "M1 Mobile Manipulator",
    observations: ["RGB", "Depth", "Point Cloud", "Proprio"],
    actions: ["6 DoF End Effector", "Gripper"],
    demos: 52000,
    envs: 180,
    links: { docs: "#format" },
    notes: "Drawer opening, cabinet opening, handle pulling, and door interaction split."
  },
  {
    project: "M1 Mobile Manipulation Simulation",
    split: "Room-scale rearrangement",
    source: "simulation",
    task: "Mobile Manipulation",
    robot: "M1 Mobile Manipulator",
    observations: ["RGB", "Depth", "Map", "Proprio", "Object State"],
    actions: ["Base Velocity", "6 DoF End Effector", "Gripper"],
    demos: 76000,
    envs: 240,
    links: { docs: "#format" },
    notes: "Mobile base plus arm demonstrations for navigation, approach, grasp, and place sequences."
  },
  {
    project: "M1 Mobile Manipulation Simulation",
    split: "Long-horizon household tasks",
    source: "simulation",
    task: "Long-horizon Tasks",
    robot: "M1 Mobile Manipulator",
    observations: ["RGB", "Depth", "Language", "Map", "Proprio"],
    actions: ["Base Velocity", "End Effector Pose", "Gripper"],
    demos: 34000,
    envs: 96,
    links: { docs: "#format" },
    notes: "Instruction-conditioned sequences such as sorting, delivery, cleanup, and tool fetch."
  }
];

const formatNumber = (value) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("en-US").format(value);
};

const unique = (items) => [...new Set(items)];

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
      ${entries.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}
    </div>
  `;
};

const renderStats = () => {
  const totalDemos = datasets.reduce((sum, item) => sum + (typeof item.demos === "number" ? item.demos : 0), 0);
  const stats = [
    ["Datasets", datasets.length],
    ["Task groups", unique(datasets.map((item) => item.task)).length],
    ["Simulation demos", totalDemos],
    ["Real robot rows", datasets.filter((item) => item.source === "real").length]
  ];

  document.querySelector("#stats").innerHTML = stats.map(([label, value]) => `
    <article class="stat-card">
      <span class="stat-value">${formatNumber(value)}</span>
      <span class="stat-label">${label}</span>
    </article>
  `).join("");
};

const renderTaskGroups = () => {
  const groups = unique(datasets.map((item) => item.task)).map((task) => {
    const rows = datasets.filter((item) => item.task === task);
    const sources = unique(rows.map((item) => item.source));
    const demos = rows.reduce((sum, item) => sum + (typeof item.demos === "number" ? item.demos : 0), 0);
    const robots = unique(rows.map((item) => item.robot));
    return { task, rows, sources, demos, robots };
  });

  document.querySelector("#taskGroups").innerHTML = groups.map((group) => `
    <article class="task-card">
      <h3>${group.task}</h3>
      <p>${group.rows.length} dataset rows across ${group.robots.length} robot platform${group.robots.length > 1 ? "s" : ""}.</p>
      <div class="task-meta">
        ${group.sources.map((source) => `<span class="pill ${source}">${source}</span>`).join("")}
        <span class="pill">${formatNumber(group.demos)} demos</span>
      </div>
    </article>
  `).join("");
};

const renderTaskFilter = () => {
  const options = unique(datasets.map((item) => item.task)).sort();
  document.querySelector("#taskFilter").insertAdjacentHTML(
    "beforeend",
    options.map((task) => `<option value="${task}">${task}</option>`).join("")
  );
};

const getFilteredRows = () => {
  const query = document.querySelector("#searchInput").value.trim().toLowerCase();
  const source = document.querySelector("#sourceFilter").value;
  const task = document.querySelector("#taskFilter").value;

  return datasets.filter((item) => {
    const haystack = [
      item.project,
      item.split,
      item.source,
      item.task,
      item.robot,
      item.notes,
      ...item.observations,
      ...item.actions
    ].join(" ").toLowerCase();

    return (!query || haystack.includes(query)) &&
      (source === "all" || item.source === source) &&
      (task === "all" || item.task === task);
  });
};

const renderRows = () => {
  const rows = getFilteredRows();
  document.querySelector("#datasetRows").innerHTML = rows.map((item) => `
    <tr>
      <td>
        <span class="dataset-name">${item.project}</span>
        <span class="dataset-sub">${item.split}</span>
      </td>
      <td><span class="pill ${item.source}">${item.source}</span></td>
      <td>${item.task}</td>
      <td>${item.robot}</td>
      <td>${tagList(item.observations)}</td>
      <td>${tagList(item.actions)}</td>
      <td>${formatNumber(item.demos)}</td>
      <td>${formatNumber(item.envs)}</td>
      <td>${linkList(item.links)}</td>
      <td class="muted">${item.notes}</td>
    </tr>
  `).join("") || `
    <tr>
      <td colspan="10" class="muted">No dataset rows match the current filters.</td>
    </tr>
  `;
};

renderStats();
renderTaskGroups();
renderTaskFilter();
renderRows();

document.querySelector("#searchInput").addEventListener("input", renderRows);
document.querySelector("#sourceFilter").addEventListener("change", renderRows);
document.querySelector("#taskFilter").addEventListener("change", renderRows);
