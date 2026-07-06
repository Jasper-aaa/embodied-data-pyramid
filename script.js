const hfA1TreeBase = "https://huggingface.co/datasets/InternRobotics/InternData-A1/tree/main";
const hfA1BlobBase = "https://huggingface.co/datasets/InternRobotics/InternData-A1/blob/main";
const openXBucketConsoleBase = "https://console.cloud.google.com/storage/browser/gdm-robotics-open-x-embodiment";

const openXDefaultActions = ["EEF Pose", "Joint", "Parallel gripper"];

const openXDatasetNames = [
  "agent_aware_affordances",
  "asu_table_top_converted_externally_to_rlds",
  "austin_buds_dataset_converted_externally_to_rlds",
  "austin_sailor_dataset_converted_externally_to_rlds",
  "austin_sirius_dataset_converted_externally_to_rlds",
  "bc_z",
  "berkeley_autolab_ur5",
  "berkeley_cable_routing",
  "berkeley_fanuc_manipulation",
  "berkeley_gnm_cory_hall",
  "berkeley_gnm_recon",
  "berkeley_gnm_sac_son",
  "berkeley_mvp_converted_externally_to_rlds",
  "berkeley_rpt_converted_externally_to_rlds",
  "bridge",
  "cmu_franka_exploration_dataset_converted_externally_to_rlds",
  "cmu_play_fusion",
  "cmu_playing_with_food",
  "cmu_stretch",
  "columbia_cairlab_pusht_real",
  "dlr_edan_shared_control_converted_externally_to_rlds",
  "dlr_sara_grid_clamp_converted_externally_to_rlds",
  "dlr_sara_pour_converted_externally_to_rlds",
  "eth_agent_affordances",
  "fanuc_manipulation_v2",
  "fractal20220817_data",
  "furniture_bench_dataset_converted_externally_to_rlds",
  "iamlab_cmu_pickup_insert_converted_externally_to_rlds",
  "imperial_wrist_dataset",
  "imperialcollege_sawyer_wrist_cam",
  "jaco_play",
  "kaist_nonprehensile_converted_externally_to_rlds",
  "kuka",
  "language_table",
  "language_table_blocktoabsolute_oracle_sim",
  "language_table_blocktoblock_4block_sim",
  "language_table_blocktoblock_oracle_sim",
  "language_table_blocktoblock_sim",
  "language_table_blocktoblockrelative_oracle_sim",
  "language_table_blocktorelative_oracle_sim",
  "language_table_separate_oracle_sim",
  "language_table_sim",
  "maniskill_dataset_converted_externally_to_rlds",
  "mt_opt_rlds",
  "mt_opt_sd",
  "mutex_dataset",
  "nyu_door_opening_surprising_effectiveness",
  "nyu_franka_play_dataset_converted_externally_to_rlds",
  "nyu_rot_dataset_converted_externally_to_rlds",
  "qut_dexterous_manpulation",
  "robo_net",
  "robot_vqa",
  "roboturk",
  "stanford_hydra_dataset_converted_externally_to_rlds",
  "stanford_kuka_multimodal_dataset_converted_externally_to_rlds",
  "stanford_mask_vit_converted_externally_to_rlds",
  "stanford_robocook_converted_externally_to_rlds",
  "taco_play",
  "tokyo_u_lsmo_converted_externally_to_rlds",
  "toto",
  "ucsd_kitchen_dataset_converted_externally_to_rlds",
  "ucsd_pick_and_place_dataset_converted_externally_to_rlds",
  "uiuc_d3field",
  "usc_cloth_sim_converted_externally_to_rlds",
  "utaustin_mutex",
  "utokyo_pr2_opening_fridge_converted_externally_to_rlds",
  "utokyo_pr2_tabletop_manipulation_converted_externally_to_rlds",
  "utokyo_saytap_converted_externally_to_rlds",
  "utokyo_xarm_bimanual_converted_externally_to_rlds",
  "utokyo_xarm_pick_and_place_converted_externally_to_rlds",
  "viola"
];

const openXDatasetAnnotations = {
  bc_z: {
    alias: "BC-Z",
    actions: ["EEF Pose", "Parallel gripper"],
    links: {
      Kaggle: "https://www.kaggle.com/datasets/google/bc-z-robot"
    }
  },
  bridge: {
    alias: "BridgeData / BridgeData V2",
    links: {
      Project: "https://rail-berkeley.github.io/bridgedata/",
      "BridgeData V1": "https://rail.eecs.berkeley.edu/datasets/bridge_release/raw/bridge_data_v1/",
      "BridgeData V2": "https://rail.eecs.berkeley.edu/datasets/bridge_release/raw/bridge_data_v2/"
    }
  },
  fractal20220817_data: {
    alias: "RT-1",
    actions: ["EEF Pose", "Parallel gripper"],
    links: {
      Project: "https://robotics-transformer1.github.io/",
    }
  },
  furniture_bench_dataset_converted_externally_to_rlds: {
    alias: "Furniture-Bench",
    links: {
      Project: "https://clvrai.github.io/furniture-bench/"
    }
  },
  kuka: {
    alias: "QT-OPT",
    actions: ["EEF Pose", "Parallel gripper"]
  },
  mt_opt_rlds: {
    alias: "MT-Opt RLDS",
    actions: ["EEF Pose", "Parallel gripper"],
    links: {
      RLDS: "https://www.tensorflow.org/datasets/catalog/mt_opt"
    }
  },
  mt_opt_sd: {
    alias: "MT-Opt SD",
    actions: ["EEF Pose", "Parallel gripper"]
  },
  robo_net: {
    alias: "RoboNet",
    links: {
      Project: "https://www.robonet.wiki/"
    }
  },
  roboset: {
    alias: "RoboSet",
    links: {
      Project: "https://robopen.github.io/roboset/teleoperation.html",
    }
  },
  roboturk: {
    alias: "RoboTurk",
    actions: ["Joint", "Parallel gripper"],
    links: {
      Project: "https://roboturk.stanford.edu/dataset_real.html"
    }
  }
};

const openXEmbodimentSources = openXDatasetNames.map((name) => ({
  name,
  path: name,
  actions: openXDefaultActions,
  ...(openXDatasetAnnotations[name] || {})
}));

const makeOpenXEmbodimentRow = ({ name, path, alias, actions, links = {} }) => ({
  task: alias ? `${name} (${alias})` : name,
  dataLinks: {
    "RLDS": path ? `${openXBucketConsoleBase}/${path}` : openXBucketConsoleBase,
    ...links
  },
  observations: ["RGB-D", "Proprio", "Language", "Force", "Tactile"],
  actions,
  demos: "TBD",
  envs: "",
  license: "See source"
});

const openXEmbodimentRows = openXEmbodimentSources.map(makeOpenXEmbodimentRow);

const hfDatasetBase = (repo) => `https://huggingface.co/datasets/${repo}`;
const hfDatasetTree = (repo, path = "") => `${hfDatasetBase(repo)}/tree/main${path ? `/${path}` : ""}`;
const hfDatasetBlob = (repo, path) => `${hfDatasetBase(repo)}/blob/main/${path}`;
const modelScopeDatasetBase = (repo) => `https://modelscope.cn/datasets/${repo}`;
const modelScopeDatasetTree = (repo, path = "") => `${modelScopeDatasetBase(repo)}/tree/master${path ? `/${path}` : ""}`;

const makeLandingRow = ({ task, href, label = "Download", observations = ["TBD"], actions = ["TBD"], demos = "TBD", envs = "", license = "TBD" }) => ({
  task,
  dataLinks: {
    [label]: href
  },
  observations,
  actions,
  demos,
  envs,
  license
});

const roboMindRepo = "x-humanoid-robomind/RoboMIND";
const roboMindGroups = [
  { benchmark: "benchmark1_0_compressed", embodiment: "h5_agilex_3rgb", taskCount: 62 },
  { benchmark: "benchmark1_0_compressed", embodiment: "h5_franka_1rgb", taskCount: 2 },
  { benchmark: "benchmark1_0_compressed", embodiment: "h5_franka_3rgb", taskCount: 90 },
  { benchmark: "benchmark1_0_compressed", embodiment: "h5_simulation", taskCount: 10 },
  { benchmark: "benchmark1_0_compressed", embodiment: "h5_tienkung_gello_1rgb", taskCount: 26 },
  { benchmark: "benchmark1_0_compressed", embodiment: "h5_tienkung_xsens_1rgb", taskCount: 23 },
  { benchmark: "benchmark1_0_compressed", embodiment: "h5_ur_1rgb", taskCount: 77 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_agilex_3rgb", taskCount: 16 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_franka_3rgb", taskCount: 26 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_franka_fr3_dual", taskCount: 6 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_sim_franka_3rgb", taskCount: 11 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_sim_tienkung_1rgb", taskCount: 4 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_tienkung_gello_1rgb", taskCount: 19 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_tienkung_prod1_gello_1rgb", taskCount: 4 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_tienkung_xsens_1rgb", taskCount: 3 },
  { benchmark: "benchmark1_1_compressed", embodiment: "h5_ur_1rgb", taskCount: 90 },
  { benchmark: "benchmark1_2_compressed", embodiment: "h5_franka_3rgb", taskCount: 1 },
  { benchmark: "benchmark1_2_compressed", embodiment: "h5_sim_franka_3rgb", taskCount: 9 },
  { benchmark: "example_data", embodiment: "h5_agilex_3rgb", taskCount: 1 },
  { benchmark: "example_data", embodiment: "h5_franka_3rgb", taskCount: 1 },
  { benchmark: "example_data", embodiment: "h5_tienkung_gello_1rgb", taskCount: 1 },
  { benchmark: "example_data", embodiment: "h5_ur_1rgb", taskCount: 1 }
];

const roboMindRows = [
  ...roboMindGroups.map(({ benchmark, embodiment, taskCount }) => ({
    task: `${benchmark} / ${embodiment}`,
    dataLinks: {
      "HF folder": hfDatasetTree(roboMindRepo, `${benchmark}/${embodiment}`)
    },
    observations: ["HDF5", "RGB", "Robot Observations"],
    actions: ["Robot Actions"],
    demos: "TBD",
    envs: `${embodiment} / ${taskCount} task archives`,
    license: "Apache-2.0"
  })),
  {
    task: "Failure data",
    dataLinks: {
      HuggingFace: hfDatasetTree(roboMindRepo, "failure_data")
    },
    observations: ["HDF5", "RGB", "Robot Observations"],
    actions: ["Robot Actions"],
    demos: "TBD",
    envs: "",
    license: "Apache-2.0"
  }
];

const agiBotWorldRepo = "agibot-world/AgiBotWorld-Beta";
const agiBotWorldTaskEntries = [
  { name: "Pickup items in the supermarket", ids: ["327", "354"], demos: 2286, episodes: 725 },
  { name: "Open the wardrobe and hang the clothes.", ids: ["351"], demos: 7959, episodes: 1137 },
  { name: "Open the fridge to get food.", ids: ["352"], demos: 5548, episodes: 1387 },
  { name: "Packing in the supermarket", ids: ["356", "360", "372"], demos: 10827, episodes: 1529 },
  { name: "Wash dishes with dishwasher", ids: ["357"], demos: 6848, episodes: 428 },
  { name: "Toast bread", ids: ["358"], demos: 2350, episodes: 470 },
  { name: "Sort in the warehouse", ids: ["359"], demos: 3220, episodes: 644 },
  { name: "Flatten shorts", ids: ["361"], demos: 2554, episodes: 2554 },
  { name: "Fold shorts", ids: ["362", "555"], demos: 19476, episodes: 9738 },
  { name: "Open the drawer to store clothes.", ids: ["363"], demos: 6318, episodes: 1053 },
  { name: "Sort personal care products", ids: ["365"], demos: 2515, episodes: 503 },
  { name: "Sort food", ids: ["366"], demos: 3640, episodes: 728 },
  { name: "Take toast from toaster", ids: ["367"], demos: 1028, episodes: 257 },
  { name: "Cook vegetables with oven", ids: ["368"], demos: 7056, episodes: 588 },
  { name: "Remove clothes from the washing machine", ids: ["369"], demos: 9016, episodes: 1127 },
  { name: "Sweep the floor", ids: ["373"], demos: 10557, episodes: 1173 },
  { name: "Sort laundry and personal care products", ids: ["374"], demos: 182, episodes: 91 },
  { name: "Brew tea", ids: ["375"], demos: 3376, episodes: 422 },
  { name: "Sort electronic products", ids: ["376"], demos: 2015, episodes: 403 },
  { name: "Packing in e-commerce", ids: ["377", "380"], demos: 11284, episodes: 1609 },
  { name: "Clear table in the restaurant", ids: ["378"], demos: 8868, episodes: 739 },
  { name: "Insert a book into the bookshelf", ids: ["384"], demos: 3232, episodes: 808 },
  { name: "Pickup in the supermarket produce section", ids: ["385"], demos: 1284, episodes: 214 },
  { name: "Pickup in the supermarket", ids: ["388", "389"], demos: 1800, episodes: 404 },
  { name: "Checkout and scan barcode in the supermarket", ids: ["390"], demos: 8250, episodes: 750 },
  { name: "Brush water bottle", ids: ["392"], demos: 13830, episodes: 977 },
  { name: "Sort clothes", ids: ["398"], demos: 865, episodes: 173 },
  { name: "Water Pouring in Restaurant", ids: ["410"], demos: 3273, episodes: 1091 },
  { name: "Hang clothes with hanger", ids: ["414"], demos: 14434, episodes: 2064 },
  { name: "Pick up the item to wipe away the stain.", ids: ["421"], demos: 6616, episodes: 1654 },
  { name: "Pack items for industrial logistics", ids: ["422"], demos: 16712, episodes: 2089 },
  { name: "Clear the countertop waste", ids: ["424"], demos: 8244, episodes: 916 },
  { name: "Prepare oatmeal porridge", ids: ["425"], demos: 17612, episodes: 1258 },
  { name: "Open drawer and store items", ids: ["428"], demos: 14256, episodes: 1782 },
  { name: "Install memory module", ids: ["429"], demos: 138, episodes: 46 },
  { name: "Brew coffee with a capsule machine", ids: ["431"], demos: 4044, episodes: 674 },
  { name: "Make instant coffee", ids: ["433"], demos: 12348, episodes: 882 },
  { name: "Remove capsules from the coffee machine.", ids: ["434"], demos: 2415, episodes: 483 },
  { name: "Place the pen into the pen holder.", ids: ["438"], demos: 11890, episodes: 2379 },
  { name: "Iron clothes", ids: ["440", "491"], demos: 11696, episodes: 1587 },
  { name: "Fold short sleeve", ids: ["444"], demos: 1640, episodes: 328 },
  { name: "Open the fridge to get fruits and vegetables.", ids: ["445"], demos: 11460, episodes: 1910 },
  { name: "Transport table with another robot", ids: ["446"], demos: 360, episodes: 72 },
  { name: "Make a salad", ids: ["451"], demos: 6509, episodes: 283 },
  { name: "Slice a lemon to make lemon water.", ids: ["452"], demos: 2605, episodes: 521 },
  { name: "Make a sandwich", ids: ["453", "454"], demos: 4543, episodes: 372 },
  { name: "Serve meals", ids: ["455"], demos: 3198, episodes: 533 },
  { name: "Remove the pillowcase from the clothesline and place it in the basket.", ids: ["460"], demos: 3656, episodes: 914 },
  { name: "Discard the trash bag into the large bin.", ids: ["462"], demos: 3708, episodes: 618 },
  { name: "Clean the microwave and range hood.", ids: ["463"], demos: 5340, episodes: 1780 },
  { name: "Replace the toilet paper roll", ids: ["464"], demos: 4800, episodes: 800 },
  { name: "Wash clothes in the washing machine.", ids: ["465"], demos: 5535, episodes: 615 },
  { name: "Separate dark and light clothes", ids: ["466", "548"], demos: 6895, episodes: 949 },
  { name: "Remove clothes from the drying rack and place them in the basket.", ids: ["468"], demos: 5452, episodes: 1363 },
  { name: "Tidy the tables at the milk tea shop.", ids: ["470"], demos: 7271, episodes: 661 },
  { name: "Organize the condiments on the stove.", ids: ["471"], demos: 5500, episodes: 550 },
  { name: "Arrange flowers", ids: ["474"], demos: 4600, episodes: 575 },
  { name: "Ironing Clothes", ids: ["475"], demos: 7224, episodes: 903 },
  { name: "Fold towels on the table", ids: ["477"], demos: 2400, episodes: 400 },
  { name: "Wipe the mirror cabinet", ids: ["478"], demos: 6630, episodes: 1105 },
  { name: "Make sandwiches with salad dressing 1213 edition", ids: ["480"], demos: 10076, episodes: 916 },
  { name: "Place items from the meeting room table into the storage box.", ids: ["483"], demos: 4587, episodes: 417 },
  { name: "Pick up the scrap paper on the desk and feed it into the shredder for destruction.", ids: ["485"], demos: 2685, episodes: 537 },
  { name: "Remove bottled water from the carton and arrange it neatly on the table.", ids: ["486"], demos: 4380, episodes: 365 },
  { name: "Remove bottled water from the carton and arrange neatly on the table.", ids: ["487"], demos: 5844, episodes: 487 },
  { name: "Pack in the supermarket cashier", ids: ["492"], demos: 10560, episodes: 960 },
  { name: "Organize the kitchen counter seasonings", ids: ["494"], demos: 6140, episodes: 614 },
  { name: "Restock in the supermarket", ids: ["497"], demos: 11888, episodes: 1486 },
  { name: "Make milk tea", ids: ["498"], demos: 7580, episodes: 379 },
  { name: "Clean the bathroom faucet.", ids: ["501"], demos: 4131, episodes: 459 },
  { name: "Store toys", ids: ["503", "575"], demos: 19280, episodes: 3265 },
  { name: "Restock supermarket snacks", ids: ["504", "506"], demos: 19577, episodes: 3128 },
  { name: "Sort maternity and baby products", ids: ["505"], demos: 6830, episodes: 1366 },
  { name: "Prepare breakfast", ids: ["507"], demos: 11508, episodes: 822 },
  { name: "Place items in the bag.", ids: ["508"], demos: 16408, episodes: 2344 },
  { name: "Fold the towel", ids: ["509"], demos: 2961, episodes: 987 },
  { name: "Stack dishcloth on the kitchen countertop", ids: ["510"], demos: 7325, episodes: 1465 },
  { name: "Return the showerhead to its holder.", ids: ["511"], demos: 1107, episodes: 369 },
  { name: "Wipe the whiteboard", ids: ["512"], demos: 1677, episodes: 559 },
  { name: "Heat the food in the microwave.", ids: ["515"], demos: 10056, episodes: 1676 },
  { name: "Fold shorts on the bed", ids: ["520"], demos: 3584, episodes: 1792 },
  { name: "Dispose of the trash on the desk.", ids: ["521"], demos: 4002, episodes: 667 },
  { name: "Replenish tissues in the meeting room", ids: ["522"], demos: 4434, episodes: 739 },
  { name: "Dispose of the takeout box", ids: ["524"], demos: 4280, episodes: 535 },
  { name: "Place cutlery in the restaurant", ids: ["525"], demos: 18136, episodes: 2267 },
  { name: "Arrange sofa", ids: ["527"], demos: 27151, episodes: 1429 },
  { name: "Boil water in the kettle", ids: ["528"], demos: 2610, episodes: 290 },
  { name: "Wipe the toilet with a cloth.", ids: ["529"], demos: 1300, episodes: 325 },
  { name: "Packing permanent magnet ingot", ids: ["532"], demos: 8734, episodes: 4367 },
  { name: "Open the curtains.", ids: ["533"], demos: 3412, episodes: 853 },
  { name: "Close the curtains", ids: ["534", "688"], demos: 5413, episodes: 1273 },
  { name: "Hang hair dryer", ids: ["535"], demos: 5223, episodes: 1741 },
  { name: "Pack groceries at the supermarket", ids: ["536"], demos: 2365, episodes: 215 },
  { name: "Make the bed", ids: ["537"], demos: 7510, episodes: 751 },
  { name: "Turn the TV on and off with the remote control", ids: ["540"], demos: 4572, episodes: 1143 },
  { name: "Clean toilet with a rag", ids: ["541"], demos: 2598, episodes: 866 },
  { name: "Boil water with a kettle", ids: ["542", "549"], demos: 1995, episodes: 285 },
  { name: "Packing washing detergent", ids: ["543"], demos: 7972, episodes: 1993 },
  { name: "Wash the pot and spatula", ids: ["544"], demos: 3042, episodes: 234 },
  { name: "Wash the dishes and silverware", ids: ["545"], demos: 3220, episodes: 230 },
  { name: "Sort light and dark clothes", ids: ["547"], demos: 737, episodes: 67 },
  { name: "Peel fruits and vegetables", ids: ["550"], demos: 5178, episodes: 863 },
  { name: "Disinfect the countertop", ids: ["551"], demos: 4095, episodes: 585 },
  { name: "Vacuum crumbs with a handheld vacuum.", ids: ["554"], demos: 2284, episodes: 571 },
  { name: "Packing schoolbag", ids: ["556"], demos: 9260, episodes: 926 },
  { name: "Pour water", ids: ["558"], demos: 1020, episodes: 340 },
  { name: "Flatten and fold shorts", ids: ["561"], demos: 6189, episodes: 2063 },
  { name: "Remove the baked dessert from the oven.", ids: ["563"], demos: 4164, episodes: 347 },
  { name: "Place goods from the material box onto the shelves.", ids: ["566", "567", "568"], demos: 2374, episodes: 727 },
  { name: "Fold the T-shirt on the field", ids: ["570"], demos: 6624, episodes: 2208 },
  { name: "Open the drawer to store items.", ids: ["573"], demos: 714, episodes: 119 },
  { name: "Produce ice with an ice maker", ids: ["574"], demos: 3720, episodes: 620 },
  { name: "Receive the menu", ids: ["577", "740"], demos: 5364, episodes: 1341 },
  { name: "Disinfect the shelves with a sanitizing gun.", ids: ["578"], demos: 1890, episodes: 315 },
  { name: "Make juice", ids: ["580"], demos: 756, episodes: 28 },
  { name: "Discard the trash on the coffee table.", ids: ["582"], demos: 888, episodes: 222 },
  { name: "Pack permanent magnet ingots", ids: ["584"], demos: 606, episodes: 101 },
  { name: "Pick up the pen on the desk and place it in the pen holder.", ids: ["587"], demos: 416, episodes: 104 },
  { name: "Pack the box securely", ids: ["588"], demos: 2043, episodes: 681 },
  { name: "Shred vegetables with a slicer.", ids: ["589"], demos: 8750, episodes: 625 },
  { name: "Place the desktop items into the felt bag.", ids: ["590"], demos: 680, episodes: 136 },
  { name: "Untie the curtain ties and draw the curtains.", ids: ["591"], demos: 8526, episodes: 1218 },
  { name: "Arrange fruits in a fruit bowl.", ids: ["593"], demos: 524, episodes: 131 },
  { name: "Hand the menu", ids: ["595", "739"], demos: 3135, episodes: 1045 },
  { name: "Place the inner pot with rice into the rice cooker to cook.", ids: ["596"], demos: 4890, episodes: 815 },
  { name: "Restock the hanging basket area", ids: ["597", "602", "609"], demos: 10908, episodes: 2727 },
  { name: "Pour the tea", ids: ["598"], demos: 4275, episodes: 225 },
  { name: "Fold the shorts", ids: ["599", "658", "681"], demos: 7358, episodes: 3679 },
  { name: "Hang the key on the hook and place the bag in the storage box.", ids: ["600"], demos: 2444, episodes: 611 },
  { name: "Scan the code to pack.", ids: ["603"], demos: 5731, episodes: 521 },
  { name: "Chop vegetables into cubes with a dicer.", ids: ["604"], demos: 49, episodes: 7 },
  { name: "Scan and package the goods", ids: ["607"], demos: 1672, episodes: 152 },
  { name: "Water the flowers", ids: ["608"], demos: 1516, episodes: 758 },
  { name: "Insert the pen cap", ids: ["613"], demos: 3005, episodes: 601 },
  { name: "Fold T-shirts", ids: ["616"], demos: 420, episodes: 140 },
  { name: "Grab the toy", ids: ["619"], demos: 376, episodes: 188 },
  { name: "Print documents with a printer.", ids: ["620"], demos: 1500, episodes: 150 },
  { name: "Add the seasoning to the pot.", ids: ["621"], demos: 8190, episodes: 390 },
  { name: "Pack takeout", ids: ["622"], demos: 1000, episodes: 125 },
  { name: "Pack the medicine", ids: ["660"], demos: 6564, episodes: 547 },
  { name: "Hammer the toy", ids: ["664"], demos: 7182, episodes: 798 },
  { name: "Close the pen cap", ids: ["666"], demos: 1125, episodes: 225 },
  { name: "Insert the straw", ids: ["675"], demos: 1197, episodes: 399 },
  { name: "Unplug the charger", ids: ["676"], demos: 435, episodes: 145 },
  { name: "Insert the plug", ids: ["677"], demos: 526, episodes: 263 },
  { name: "Confirm the meeting room status", ids: ["679"], demos: 1425, episodes: 285 },
  { name: "Serve the meal", ids: ["682", "683", "785"], demos: 2776, episodes: 389 },
  { name: "Lower the curtain", ids: ["689"], demos: 7535, episodes: 685 },
  { name: "Draw the curtains", ids: ["692"], demos: 10098, episodes: 594 },
  { name: "Twist the bottle cap", ids: ["694", "707"], demos: 7410, episodes: 1235 },
  { name: "Turn on the fan", ids: ["695"], demos: 5900, episodes: 1180 },
  { name: "Restock tea bags", ids: ["698"], demos: 7972, episodes: 1993 },
  { name: "Shoot the basketball", ids: ["705"], demos: 1098, episodes: 549 },
  { name: "Place name tags", ids: ["708"], demos: 13180, episodes: 659 },
  { name: "Pack the medicines", ids: ["709"], demos: 16752, episodes: 1396 },
  { name: "Open the red wine", ids: ["710"], demos: 588, episodes: 98 },
  { name: "Mop the floor", ids: ["711"], demos: 4240, episodes: 848 },
  { name: "Carry bottled water.", ids: ["712"], demos: 5128, episodes: 641 },
  { name: "Open the door and turn off the light.", ids: ["714"], demos: 1360, episodes: 170 },
  { name: "Insert the key and open the door.", ids: ["715"], demos: 3896, episodes: 974 },
  { name: "Stamp the document and place the reimbursement form in the reimbursement box.", ids: ["716"], demos: 5000, episodes: 625 },
  { name: "Deliver goods", ids: ["717"], demos: 124, episodes: 62 },
  { name: "Convey merchandise", ids: ["719"], demos: 88, episodes: 44 },
  { name: "Tighten the bottle cap", ids: ["722"], demos: 8952, episodes: 1492 },
  { name: "Scan security check", ids: ["725"], demos: 9520, episodes: 952 },
  { name: "Lift dumbbells", ids: ["726"], demos: 6840, episodes: 1140 },
  { name: "Fetch water", ids: ["727"], demos: 114, episodes: 19 },
  { name: "Strike the gong", ids: ["729"], demos: 1557, episodes: 519 },
  { name: "Clap hands", ids: ["730"], demos: 2310, episodes: 770 },
  { name: "Wave goodbye", ids: ["731"], demos: 1350, episodes: 675 },
  { name: "Roll the dough", ids: ["732"], demos: 4840, episodes: 1210 },
  { name: "Tie the curtain sash", ids: ["734"], demos: 211, episodes: 211 },
  { name: "Roll away stains with a lint roller", ids: ["735"], demos: 1024, episodes: 128 },
  { name: "Peel the skin", ids: ["737"], demos: 428, episodes: 214 },
  { name: "Pack the fruits", ids: ["741"], demos: 1902, episodes: 317 },
  { name: "Pack fruits", ids: ["744"], demos: 502, episodes: 251 },
  { name: "Scan for security check", ids: ["748"], demos: 936, episodes: 104 },
  { name: "Place the feed box", ids: ["749"], demos: 315, episodes: 105 },
  { name: "Slice the noodles", ids: ["751"], demos: 5660, episodes: 1132 },
  { name: "Knead dough", ids: ["753"], demos: 936, episodes: 312 },
  { name: "Carry books", ids: ["761"], demos: 1305, episodes: 261 },
  { name: "Paint the wall", ids: ["762"], demos: 3402, episodes: 486 },
  { name: "Move house", ids: ["764"], demos: 5515, episodes: 1103 },
  { name: "Adjust product placement", ids: ["765"], demos: 2986, episodes: 1493 },
  { name: "Milk the cow", ids: ["773"], demos: 8970, episodes: 690 },
  { name: "Insert the key and open the door", ids: ["774"], demos: 1344, episodes: 336 },
  { name: "Stamp the seal", ids: ["779"], demos: 3003, episodes: 1001 },
  { name: "Pass the water", ids: ["781"], demos: 1524, episodes: 762 },
  { name: "Tidy the bar counter", ids: ["782"], demos: 981, episodes: 109 },
  { name: "Spread the tablecloth", ids: ["783"], demos: 5525, episodes: 1105 },
  { name: "Tie the rope", ids: ["786"], demos: 5142, episodes: 1714 },
  { name: "Clear the dining table", ids: ["787"], demos: 3252, episodes: 271 },
  { name: "Swipe toy cards", ids: ["790"], demos: 1028, episodes: 514 },
];

const agiBotWorldRows = agiBotWorldTaskEntries.map(({ name, ids, demos }) => ({
  task: name,
  dataLinks: {
    HuggingFace: ids.map((id) => hfDatasetTree(agiBotWorldRepo, `observations/${id}`))
  },
  observations: ["RGB-D", "Proprio", "Language"],
  actions: ["EEF Pose", "Joint"],
  demos,
  envs: "",
  license: "CC BY-NC-SA 4.0"
}));

const openGalaxeaRepo = "OpenGalaxea/Galaxea-Open-World-Dataset";
const openGalaxeaTaskArchives = [
  "Adjust_The_Air_Conditioner_Temperature_20250711_006",
  "Arrange_Fruits_20250819_011",
  "Arrange_Mineral_Water_Bottles_On_The_Desk_20250721_008",
  "Arrange_Sofa_Cushions_20250708_006",
  "Arrange_Sofa_Cushions_20250804_012",
  "Arrange_The_Fruits_20250716_006",
  "Arrange_The_Fruits_20250731_012",
  "Arrange_The_Fruits_20250822_013",
  "Arrange_The_Sofa_Cushions_20250722_008",
  "Arrange_The_Tray_20250725_010",
  "Arrange_The_Tray_20250804_012",
  "Arrange_The_Tray_20250822_013",
  "Arrange_Throw_Pillows_On_Living_Room_Sofa_20250624_002",
  "Arrange_Toiletries_20250731_012",
  "Bedside_Console_With_Switch_Panel20250624_002",
  "Boil_The_Water_20250714_006",
  "Boil_The_Water_20250801_012",
  "Chair_Push_And_Place_20250709_006",
  "Chair_Push_And_Place_20250719_008",
  "Chair_Push_And_Place_20250801_012",
  "Check_Out_At_Self-checkout_Counter_20250607_003",
  "Clean_Cutting_Board_20250627_002",
  "Clean_The_Chopping_Board_20250722_008",
  "Clean_The_Cutting_Board_20250711_006",
  "Clean_The_Cutting_Board_20250804_012",
  "Clean_The_Mirror_20250714_006",
  "Clean_The_Mirror_20250731_012",
  "Clean_The_Sink_20250710_006",
  "Clean_The_Sink_20250721_008",
  "Clean_The_Sink_20250730_012",
  "Clean_The_Sofa20250627_002",
  "Clean_The_Toilet20250618_001",
  "Clean_Toilet_20250625_002",
  "Clothes_Into_The_Basket_20250728_010",
  "Collect_Juice_20250621_001",
  "Connect_Router_Cables_20250625_002",
  "Cooking_Food_In_An_Air_Fryer_20250719_008",
  "Cooking_Food_In_An_Air_Fryer_20250801_012",
  "Desktop_Garbage_Decluttering_20250712_006",
  "Desktop_Garbage_Organizing20250721_008",
  "Desktop_Trash_Disposal_20250729_011",
  "Dispose_Of_Garbage_In_The_Trash_Can",
  "Dispose_Of_Leftover_Food_20250626_002",
  "Doll_Storage_20250731_012",
  "Dry_Clothes_In_A_Dryer_20250619_001",
  "Egg_Placement20250703_002",
  "Enter_Exit_Door_Turn_On_Off_lights_20250620_001",
  "Floor_cloth_wiping_stains_20250614_001",
  "Flowers_Are_Inserted_Into_Vases_20250725_010",
  "Fold_Clothes20250617_001",
  "Fold_Clothes_20250807_011",
  "From_Kitchen_To_Bedroom20250703_002",
  "Handle_Plates_20250619_001",
  "Handle_The_Wooden_Barrel_Lid20250619_001",
  "Hang_Clothes20250625_002",
  "Hang_The_Towel_On_The_Shelf_20250715_006",
  "Hang_The_Towel_On_The_Shelf_20250722_008",
  "Hang_The_Towel_On_The_Shelf_20250805_012",
  "Heat_Food_In_Microwave_Oven_20250703_003",
  "Heat_Food_In_The_Microwave_20250710_006",
  "Insert_Flowers_Into_A_Vase_20250711_006",
  "Iron_The_Clothes_20250728_010",
  "Layered_Shoe_Cabinet_For_Placing_Slippers_20250728_010",
  "Lift_The_Steamer_Lid20250618_001",
  "Lift_up_the_carpet_and_wipe_the_floor_20250625_002",
  "Locker_torage_And_Retrieval20250623_002",
  "Make_Breakfast_20250626_002",
  "Make_Breakfast_20250726_010",
  "Make_Milk_Powder_20250728_010",
  "Make_Milk_Powder_20250731_012",
  "Make_Tea_20250624_002",
  "Make_The_Bed_20250616_001",
  "Make_The_Bed_20250708_006",
  "Make_The_Bed_20250730_012",
  "Milk_Powder_Preparation20250701_002",
  "Open_And_Close_Curtains_20250708_006",
  "Open_And_Close_Microwave_Oven_20250623_002",
  "Open_And_Close_Nightstand_Door_20250625_002",
  "Open_And_Close_Nightstand_Drawer_20250624_002",
  "Open_And_Close_The_Curtain_20250728_010",
  "Open_And_Close_The_Curtain_20250804_012",
  "Open_And_Close_The_Door_20250802_012",
  "Open_And_Close_The_Nightstand_To_Place_Items_20250802_012",
  "Open_And_Close_The_Notebook20250628_002",
  "Open_And_Close_The_Refrigerator_Drawer_To_Place_Items_20250728_010",
  "Open_And_Close_The_Refrigerator_Drawer_To_Place_Items_20250802_012",
  "Open_Close_Lid_Stirring_20250618_001",
  "Open_Or_Close_The_Cabinet_Door_To_Place_Items_20250719_008",
  "Open_Or_Close_The_Cabinet_Door_To_Place_Items_20250801_012",
  "Open_The_Bedroom_Door_To_Enter20250701_002",
  "Open_and_close_the_freezer_door_20250620",
  "Opening_Or_Closing_Refrigerator_Drawers_To_Store_And_Retrieve_Items20250624_002",
  "Organize_Dried_Fruit_And_Meat_Shelves_20250702_003",
  "Organize_Mineral_Water_Bottles_0n_The_Table_20250709_006",
  "Organize_Potato_Chip_Shelves_20250701_003",
  "Organize_Refrigerated_Beverage_Case_20250704_003",
  "Organize_Refrigerated_shelf_20250703_003",
  "Organize_Refrigerator_Items0250703_002",
  "Organize_The_Beverage_Cooler_20250630_003",
  "Organize_The_Bread_Shelf_20250630_003",
  "Organize_The_Coat_Rack20250617_001",
  "Organize_The_Condiment_Shelf_20250731_012",
  "Organize_The_Potato_Chip_Shelf_20250630_003",
  "Organize_The_Seasoning_Shelf_20250620_001",
  "Organize_The_Seasoning_Shelf_20250717_006",
  "Organize_The_Signs20250618_001",
  "Organize_The_Toiletries_20250719_008",
  "Organize_The_Wall-mounted_Coat_Rack_20250716_006",
  "Organize_Toys_20250628_002",
  "Organize_Toys_20250716_006",
  "Organize_trays_20250621_001",
  "Organizing_Desktop_Trash_20250630_003",
  "Pack_Medicines_Into_Medicine_Box_20250707_005",
  "Pen_Case_For_Storing_Stationery_20250717_006",
  "Pen_Case_For_Storing_Stationery_20250719_008",
  "Pen_Case_For_Storing_Stationery_20250802_012",
  "Pick_And_Place_Items_On_The_Bread_Shelf_20250701_003",
  "Pick_And_Place_Items_On_The_Potato_Chip_Shelves_20250701_003",
  "Pick_And_place_Ice_Cream_Freezer",
  "Pick_Up_Garbage_On_The_Ground_20250724_010",
  "Pick_Up_Garbage_On_The_Ground_20250801_012",
  "Pick_Up_Garbage_On_The_Ground_20250805_011",
  "Pick_Up_Or_Put_Down_The_Clip20250619",
  "Pick_Up_Trash_From_Ground_20250709_006",
  "Place_Slippers_In_The_Layered_Shoe_Cabinet_20250805_012",
  "Place_The_Dress_Shirt_On_The_Hanger20250619_001",
  "Plug_And_Unplug_Switch_Lights_20250726_010",
  "Plug_And_Unplug_Switch_Lights_20250802_012",
  "Plug_Into_A_Fixed_Socket_20250710_006",
  "Plug_Into_A_Fixed_Socket_20250722_008",
  "Plug_The_Socket_20250616_001",
  "PourWater_20250614",
  "Pour_Leftovers_20250802_012",
  "Pour_Out_The_Leftover_Food_20250714_006",
  "Pour_The_Leftover_Food_20250724_010",
  "Pour_Water20250708_006",
  "Pour_Water_20250801_012",
  "Pour_Water_20250806_011",
  "Pull_Out_The_Cap_20250725_010",
  "Push_And_Pull_The_Chair_20250728_010",
  "Push_In_Chairs_20250614_001",
  "Pushing_Garbage_Trucks_To_Put_Garbage_Away20250707_005",
  "Put_A_Bag_In_The_Trash_Can20250617_001",
  "Put_Clothes_Into_The_Basket_20250709_006",
  "Put_Clothes_Into_The_Basket_20250731_012",
  "Put_Clothes_Into_The_Basket_20250813_011",
  "Put_Clothes_Into_Wardrobe_20250707_005",
  "Put_Shoes_Into_The_Shoe_Box_20250801_012",
  "Put_Slippers_Into_Floor_Standing_Shoe_Cabinet_20250620_001",
  "Put_The_Flowers_In_The_Vase20250618_001",
  "Put_The_Glasses_In_The_Glasses_Case_20250722_008",
  "Put_The_Glasses_In_The_Glasses_Case_20250731_012",
  "Put_The_Items_Into_The_Storage_Box_20250929_002_007",
  "Put_The_Landline_Phone_Back_In_Place_20250725_010",
  "Put_The_Pen_Into_The_Pen_Holder_20250722_008",
  "Put_The_Pen_Into_The_Pen_Holder_20250724_010",
  "Put_The_Pen_Into_The_Pen_Holder_20250731_012",
  "Put_The_Phone_Back_In_place_20250716_006",
  "Put_The_Pillow_On_The_Bed20250617_001",
  "Put_The_Shoes_Into_The_Shoe_Box_202507116_006",
  "Put_The_Shoes_Into_The_Shoebox_20250725_010",
  "Put_The_Trash_Bag_At_The_Door20250626_002",
  "Put_the_shoes_into_the_shoe_box_20250621_001",
  "ReplaceFacialTissue_20250613_001",
  "Replace_The_Toilet_Paper_Roll_20250712_006",
  "Replace_The_Toilet_Paper_Roll_20250805_012",
  "Replace_The_Toiletries_20250616_001",
  "Replace_Toilet_Paper_20250623_002",
  "Retrieving_And_Placing_Items_Inside_The_TV_Cabinet_20250726_010",
  "Retrieving_And_Placing_Items_Inside_The_TV_Cabinet_20250805_012",
  "ReturnClothesToBasket_20250613_001",
  "Ring_The_Landline20250627_002",
  "Serve_Soup_In_The_Rice_Pot_20250717_006",
  "Serve_Soup_With_A_Rice_Pot_20250801_012",
  "Sliding_Bar_Stool_20250625_002",
  "Sort_Out_Desktop_Garbage20250802_012",
  "Steam_Rice_20250711_006",
  "Steam_Rice_20250721_008",
  "Steam_Rice_20250729_010",
  "Steam_Rice_20250730_012",
  "Stir-Fry_Dishes_20250726_010",
  "Stir-fry_20250722_008",
  "Stir-frying_20250627_002",
  "Storage_Tools_20250722_008",
  "Storage_Tools_20250725_010",
  "Storage_Tools_20250802_012",
  "Storage_Towels_20250715_006",
  "Storage_Towels_20250721_008",
  "Store_Dolls_20250812_011",
  "Store_Fruit_20250811_011",
  "Store_Tableware_20250625_002",
  "Store_The_Dolls_20250719_008",
  "Switch_The_Fan_On_And_Off_20250725_010",
  "Switch_The_Fan_On_And_Off_20250804_012",
  "Switch_The_Rotating_Nightstand_And_Place_Items_20250804_012",
  "Switch_The_Sign_20250616_001",
  "Take_A_Drink_Out_Of_Fridge_And_Put_It_On_Table_20250712_006",
  "Take_And_Place_The_Portable_Power_Bank20250628_002",
  "Take_And_Put_Items_In_And_Out_Of_The_Microwave_Oven_20250731_012",
  "Take_Drinks_From_The_Refrigerator_And_Place_Them_On_The_Table_20250728_010",
  "Take_Out_The_Laundry_From_The_Washing_Machine20250618_001",
  "Take_a_bowl_from_the_cabinet_20250620_001",
  "Take_and_place_tableware_20250620_001",
  "Taking_And_Placing_Shoes_In_The_Shoe_Cabinet20250624_002",
  "Tidy_Up_Bathroom_Toiletries_20250623_002",
  "Toast_Bread_20250618_001",
  "Turn_0n_The_Food_Pot20250618_001",
  "Turn_On_And_Off_Central_Air_Conditioning_System_20250623_002",
  "Turn_On_And_Off_Central_Air_Conditioning_System_20250624_002_special",
  "Turn_On_And_Off_The_Air_Conditioner_20250802_012",
  "Turn_On_And_Off_The_Small_Fan_20250711_006",
  "Turn_On_And_Turn_Off_The_Air_Conditioner_20250724_010",
  "Turn_On_Off_The_Light_20250619_001",
  "Twist_The_Bottle_Cap20250619_001",
  "Twist_The_Bottle_Cap_20250725_010",
  "Twist_The_Bottle_Cap_20250731_012",
  "Uncap_The_Pen_20250804_012",
  "Use_Of_Objects_20250704_003",
  "Use_The_Drawer_To_Store_The_Hair_Dryer20250625_002",
  "Washing_Machine_Washes_Clothes_20250728_010",
  "Water_Dispenser_Connected_To_Water20250707_005",
  "Wearing_A_Strip_Rack_Hanging_Clothes_For_Retrieval_20250724_010",
  "Wipe_The_Desktop_20250801_012",
  "Wipe_The_Desktop_20250804_011",
  "Wipe_The_Sewage_Stains_With_A_Ground_Cloth_20250709_006",
  "Wipe_The_Sewage_Stains_With_A_Ground_Cloth_20250725_010",
  "Wipe_The_Sewage_Stains_With_A_Ground_Cloth_20250801_012"
];

const openGalaxeaRows = openGalaxeaTaskArchives.map((archive) => ({
  task: archive,
  dataLinks: {
    "tar.gz": hfDatasetBlob(openGalaxeaRepo, `lerobot/${archive}.tar.gz`)
  },
  observations: ["LeRobot", "Video", "Robot Observations"],
  actions: ["Robot Actions"],
  demos: "TBD",
  envs: "Galaxea",
  license: "CC BY-NC-SA 4.0"
}));

const realSourceWorldRepo = "RealSourceData/RealSource-World";
const realSourceWorldTasks = [
  { path: "Arrange_the_cups", demos: 2196 },
  { path: "Arrange_the_items_on_the_conference_table", demos: 313 },
  { path: "Cable_Plugging_able", demos: 200 },
  { path: "Clean_the_convenience_store", demos: 973 },
  { path: "Collect_the_mail", demos: 391 },
  { path: "Cook_rice_using_an_electric_rice_cooker", demos: 156 },
  { path: "Hang_out_the_clothes_to_dry", demos: 393 },
  { path: "Long_Term_Tasks_Without_Annotations/Cleaning_and_organizing_of_books", demos: 110 },
  { path: "Long_Term_Tasks_Without_Annotations/Conveyor_belt_sorts_and_separates_different_parts", demos: 162 },
  { path: "Long_Term_Tasks_Without_Annotations/Dishwasher_cleans_tableware", demos: 89 },
  { path: "Long_Term_Tasks_Without_Annotations/Fruit_shelving_and_arrangement", demos: 132 },
  { path: "Long_Term_Tasks_Without_Annotations/Storage_and_arrangement_of_clothes_on_the_bed", demos: 121 },
  { path: "Long_Term_Tasks_Without_Annotations/Storage_and_arrangement_of_clothes_on_the_sofa", demos: 129 },
  { path: "Make_toast", demos: 858 },
  { path: "Making_steamed_potatoes", demos: 15 },
  { path: "Move_industrial_parts_to_different_plastic_boxes", demos: 107 },
  { path: "Organize_the_TV_cabinet", demos: 983 },
  { path: "Organize_the_glass_tube_on_the_rack", demos: 158 },
  { path: "Organize_the_magazines", demos: 635 },
  { path: "Organize_the_pen_holder", demos: 920 },
  { path: "Organize_the_repair_tools", demos: 1758 },
  { path: "Organize_the_toys", demos: 1951 },
  { path: "Pack_the_badminton_shuttlecock", demos: 615 },
  { path: "Place_the_books", demos: 241 },
  { path: "Place_the_hairdryer", demos: 466 },
  { path: "Place_the_slippers", demos: 664 },
  { path: "Prepare_the_birthday_cake", demos: 686 },
  { path: "Prepare_the_bread", demos: 314 },
  { path: "Put_the_milk_in_the_refrigerator", demos: 486 },
  { path: "Refill_the_laundry_detergent", demos: 924 },
  { path: "Replace_the_tissues_and_arrange_them", demos: 456 },
  { path: "Replenish_tea_bags", demos: 95 },
  { path: "Stack_the_cups", demos: 2748 },
  { path: "Steam_buns", demos: 148 },
  { path: "Steaming_rice_in_a_rice_cooker", demos: 179 },
  { path: "Take_down_the_book", demos: 1512 },
  { path: "Take_out_the_trash", demos: 177 },
  { path: "Tidy_up_the_childrens_room", demos: 362 },
  { path: "Tidy_up_the_conference_room_table", demos: 1088 },
  { path: "Tidy_up_the_cooking_counter", demos: 2305 },
  { path: "Tidy_up_the_kitchen_counter", demos: 455 },
];

const realSourceWorldRows = realSourceWorldTasks.map(({ path, demos }) => ({
  task: path,
  dataLinks: {
    LeRobot: hfDatasetTree(realSourceWorldRepo, path)
  },
  observations: ["RGB", "Proprio.", "Lang.", "Force", "Torque"],
  actions: ["Robot Actions"],
  demos,
  envs: "RealSource",
  license: "CC BY-NC-SA 4.0"
}));

const makeHfFolderRow = ({ repo, path, task = path, label = "HF folder", observations, actions, demos = "TBD", envs = "TBD", license = "TBD" }) => ({
  task,
  dataLinks: {
    [label]: hfDatasetTree(repo, path)
  },
  observations,
  actions,
  demos,
  envs,
  license
});

const makeHfBlobRow = ({ repo, path, task, label = "Download", observations, actions, demos = "TBD", envs = "TBD", license = "TBD" }) => ({
  task,
  dataLinks: {
    [label]: hfDatasetBlob(repo, path)
  },
  observations,
  actions,
  demos,
  envs,
  license
});

const makeDropboxRow = ({ task, href, label = "Dropbox", observations, actions, demos = "TBD", envs = "TBD", license = "TBD" }) =>
  makeLandingRow({
    task,
    href,
    label,
    observations,
    actions,
    demos,
    envs,
    license
  });

const roboCoinRepoBase = "https://huggingface.co/datasets/RoboCOIN";
const roboCoinTaskEntries = [
  { path: "AgiBot-g1_battery_storage_b", task: "AgiBot_G1_battery_storage_b", demos: 115 },
  { path: "AgiBot-g1_battery_storage_c", task: "AgiBot_G1_battery_storage_c", demos: 57 },
  { path: "AgiBot-g1_box_storage_a", task: "AgiBot_G1_box_storage_a", demos: 21 },
  { path: "AgiBot-g1_box_storage_b", task: "AgiBot_G1_box_storage_b", demos: 96 },
  { path: "AgiBot-g1_box_storage_c", task: "AgiBot_G1_box_storage_c", demos: 39 },
  { path: "AgiBot-g1_box_storage_cardboard_box_a", task: "AgiBot_G1_box_storage_cardboard_box_a", demos: 402 },
  { path: "AgiBot-g1_box_storage_cardboard_box_b", task: "AgiBot_G1_box_storage_cardboard_box_b", demos: 247 },
  { path: "AgiBot-g1_box_storage_cardboard_box_c", task: "AgiBot_G1_box_storage_cardboard_box_c", demos: 476 },
  { path: "AgiBot-g1_box_storage_e", task: "AgiBot_G1_box_storage_e", demos: 58 },
  { path: "AgiBot-g1_box_storage_part_a", task: "AgiBot_G1_box_storage_part_a", demos: 335 },
  { path: "AgiBot-g1_box_storage_tool", task: "AgiBot_G1_box_storage_tool", demos: 99 },
  { path: "AgiBot-g1_left_capture_part", task: "AgiBot_G1_left_capture_part", demos: 464 },
  { path: "AgiBot-g1_mobile_accessory_storage_box_a", task: "AgiBot_G1_mobile_accessory_storage_box_a", demos: 81 },
  { path: "AgiBot-g1_mobile_accessory_storage_box_c", task: "AgiBot_G1_mobile_accessory_storage_box_c", demos: 40 },
  { path: "AgiBot-g1_mobile_accessory_storage_box_d", task: "AgiBot_G1_mobile_accessory_storage_box_d", demos: 30 },
  { path: "AgiBot-g1_mobile_accessory_storage_box_e", task: "AgiBot_G1_mobile_accessory_storage_box_e", demos: 61 },
  { path: "AgiBot-g1_mobile_accessory_storage_box_f", task: "AgiBot_G1_mobile_accessory_storage_box_f", demos: 68 },
  { path: "AgiBot-g1_pick_up_battery", task: "AgiBot_G1_pick_up_battery", demos: 387 },
  { path: "AgiBot-g1_picks_up_battery_a", task: "AgiBot_G1_picks_up_battery_a", demos: 562 },
  { path: "AgiBot-g1_picks_up_battery_b", task: "AgiBot_G1_picks_up_battery_b", demos: 329 },
  { path: "AgiBot-g1_picks_up_cardboard_box", task: "AgiBot_G1_picks_up_cardboard_box", demos: 277 },
  { path: "AgiBot-g1_picks_up_parts_a", task: "AgiBot_G1_picks_up_parts_a", demos: 126 },
  { path: "AgiBot-g1_picks_up_parts_b", task: "AgiBot_G1_picks_up_parts_b", demos: 824 },
  { path: "AgiBot-g1_remove_the_accessory", task: "AgiBot_G1_remove_the_accessory", demos: 68 },
  { path: "AgiBot-g1_right_capture_part", task: "AgiBot_G1_right_capture_part", demos: 57 },
  { path: "AgiBot-g1_robotic_arm_picks_up_battery", task: "AgiBot_G1_robotic_arm_picks_up_battery", demos: 56 },
  { path: "AgiBot-g1_robotic_arm_picks_up_parts", task: "AgiBot_G1_robotic_arm_picks_up_parts", demos: 53 },
  { path: "AgiBot-g1_storage_item_b", task: "AgiBot_G1_storage_item_b", demos: 106 },
  { path: "AgiBot-g1_storage_item_d", task: "AgiBot_G1_storage_item_d", demos: 450 },
  { path: "AgiBot-g1_storage_item_e", task: "AgiBot_G1_storage_item_e", demos: 507 },
  { path: "AgiBot-g1_tool_storage", task: "AgiBot_G1_tool_storage", demos: 67 },
  { path: "Agilex_Cobot_Magic_Agilex_Split_Aloha_organize_desk_fail", task: "Agilex_Cobot_Magic_Agilex_Split_Aloha_organize_desk_fail", demos: 117 },
  { path: "Cobot_Magic_box_storage_chopsticks", task: "Agilex_Cobot_Magic_box_storage_chopsticks", demos: 499 },
  { path: "Cobot_Magic_cap_the_pen_a", task: "Agilex_Cobot_Magic_cap_the_pen_a", demos: 55 },
  { path: "Cobot_Magic_catch_the_ball", task: "Agilex_Cobot_Magic_catch_the_ball", demos: 98 },
  { path: "Cobot_Magic_classification_of_fruits_and_vegetables", task: "Agilex_Cobot_Magic_classification_of_fruits_and_vegetables", demos: 301 },
  { path: "Cobot_Magic_classification_of_fruits_and_vegetables_a", task: "Agilex_Cobot_Magic_classification_of_fruits_and_vegetables_a", demos: 300 },
  { path: "Cobot_Magic_classification_of_tableware", task: "Agilex_Cobot_Magic_classification_of_tableware", demos: 406 },
  { path: "Agilex_Cobot_Magic_classify_objects_eight", task: "Agilex_Cobot_Magic_classify_objects_eight", demos: 197 },
  { path: "Agilex_Cobot_Magic_classify_objects_six", task: "Agilex_Cobot_Magic_classify_objects_six", demos: 199 },
  { path: "Cobot_Magic_clean_blackboard", task: "Agilex_Cobot_Magic_clean_blackboard", demos: 938 },
  { path: "Cobot_Magic_clean_up_the_tableware", task: "Agilex_Cobot_Magic_clean_up_the_tableware", demos: 33 },
  { path: "Cobot_Magic_clear_the_desktop", task: "Agilex_Cobot_Magic_clear_the_desktop", demos: 293 },
  { path: "Cobot_Magic_close_book", task: "Agilex_Cobot_Magic_close_book", demos: 287 },
  { path: "Cobot_Magic_close_button", task: "Agilex_Cobot_Magic_close_button", demos: 60 },
  { path: "Agilex_Cobot_Magic_close_drawer_bottom", task: "Agilex_Cobot_Magic_close_drawer_bottom", demos: 50 },
  { path: "Agilex_Cobot_Magic_close_drawer_top", task: "Agilex_Cobot_Magic_close_drawer_top", demos: 50 },
  { path: "Agilex_Cobot_Magic_close_drawer_upper", task: "Agilex_Cobot_Magic_close_drawer_upper", demos: 173 },
  { path: "Agilex_Cobot_Magic_connect_block", task: "Agilex_Cobot_Magic_connect_block", demos: 238 },
  { path: "Cobot_Magic_cube_reset", task: "Agilex_Cobot_Magic_cube_reset", demos: 98 },
  { path: "Cobot_Magic_cut_banana", task: "Agilex_Cobot_Magic_cut_banana", demos: 583 },
  { path: "Cobot_Magic_desktop_organization", task: "Agilex_Cobot_Magic_desktop_organization", demos: 1070 },
  { path: "Cobot_Magic_drawer_storage_mineral_water", task: "Agilex_Cobot_Magic_drawer_storage_mineral_water", demos: 99 },
  { path: "Agilex_Cobot_Magic_erase_board", task: "Agilex_Cobot_Magic_erase_board", demos: 50 },
  { path: "Agilex_Cobot_Magic_erase_board_left", task: "Agilex_Cobot_Magic_erase_board_left", demos: 49 },
  { path: "Agilex_Cobot_Magic_erase_board_left_side", task: "Agilex_Cobot_Magic_erase_board_left_side", demos: 101 },
  { path: "Agilex_Cobot_Magic_erase_board_passing_left_to_right", task: "Agilex_Cobot_Magic_erase_board_passing_left_to_right", demos: 50 },
  { path: "Agilex_Cobot_Magic_erase_board_passing_right_to_left", task: "Agilex_Cobot_Magic_erase_board_passing_right_to_left", demos: 47 },
  { path: "Agilex_Cobot_Magic_erase_board_right", task: "Agilex_Cobot_Magic_erase_board_right", demos: 50 },
  { path: "Cobot_Magic_fold_clothes", task: "Agilex_Cobot_Magic_fold_clothes", demos: 584 },
  { path: "Agilex_Cobot_Magic_fold_jeans_shorts_children's", task: "Agilex_Cobot_Magic_fold_jeans_shorts_children's", demos: 50 },
  { path: "Agilex_Cobot_Magic_fold_short_sleeve_black", task: "Agilex_Cobot_Magic_fold_short_sleeve_black", demos: 50 },
  { path: "Agilex_Cobot_Magic_fold_short_sleeve_white", task: "Agilex_Cobot_Magic_fold_short_sleeve_white", demos: 50 },
  { path: "Agilex_Cobot_Magic_fold_shorts_khaki", task: "Agilex_Cobot_Magic_fold_shorts_khaki", demos: 50 },
  { path: "Agilex_Cobot_Magic_fold_T-shirts", task: "Agilex_Cobot_Magic_fold_T-shirts", demos: 100 },
  { path: "Cobot_Magic_fold_the_towel", task: "Agilex_Cobot_Magic_fold_the_towel", demos: 177 },
  { path: "Agilex_Cobot_Magic_fold_towel", task: "Agilex_Cobot_Magic_fold_towel", demos: 100 },
  { path: "Cobot_Magic_fold_towel_a", task: "Agilex_Cobot_Magic_fold_towel_a", demos: 96 },
  { path: "Agilex_Cobot_Magic_fold_towel_blue", task: "Agilex_Cobot_Magic_fold_towel_blue", demos: 185 },
  { path: "Agilex_Cobot_Magic_fold_towel_blue_tray", task: "Agilex_Cobot_Magic_fold_towel_blue_tray", demos: 50 },
  { path: "Agilex_Cobot_Magic_fold_towel_brown", task: "Agilex_Cobot_Magic_fold_towel_brown", demos: 387 },
  { path: "Agilex_Cobot_Magic_fold_towel_grey_tray", task: "Agilex_Cobot_Magic_fold_towel_grey_tray", demos: 50 },
  { path: "Agilex_Cobot_Magic_fold_towel_pink_tray", task: "Agilex_Cobot_Magic_fold_towel_pink_tray", demos: 50 },
  { path: "Agilex_Cobot_Magic_fold_towel_purple", task: "Agilex_Cobot_Magic_fold_towel_purple", demos: 175 },
  { path: "Agilex_Cobot_Magic_fold_towel_tray_twice", task: "Agilex_Cobot_Magic_fold_towel_tray_twice", demos: 195 },
  { path: "Agilex_Cobot_Magic_fold_towel_yellow_tray", task: "Agilex_Cobot_Magic_fold_towel_yellow_tray", demos: 49 },
  { path: "Cobot_Magic_food_packaging", task: "Agilex_Cobot_Magic_food_packaging", demos: 798 },
  { path: "Agilex_Cobot_Magic_heat_burger", task: "Agilex_Cobot_Magic_heat_burger", demos: 819 },
  { path: "Agilex_Cobot_Magic_heat_sandwich", task: "Agilex_Cobot_Magic_heat_sandwich", demos: 301 },
  { path: "Cobot_Magic_make_fruit_salad", task: "Agilex_Cobot_Magic_make_fruit_salad", demos: 687 },
  { path: "Cobot_Magic_make_hamburger", task: "Agilex_Cobot_Magic_make_hamburger", demos: 3044 },
  { path: "Agilex_Cobot_Magic_make_sandwiche", task: "Agilex_Cobot_Magic_make_sandwiche", demos: 515 },
  { path: "Cobot_Magic_mobile_cube", task: "Agilex_Cobot_Magic_mobile_cube", demos: 99 },
  { path: "Cobot_Magic_mobile_cube_blackboard", task: "Agilex_Cobot_Magic_mobile_cube_blackboard", demos: 100 },
  { path: "Cobot_Magic_move_beverage", task: "Agilex_Cobot_Magic_move_beverage", demos: 100 },
  { path: "Agilex_Cobot_Magic_move_mouse", task: "Agilex_Cobot_Magic_move_mouse", demos: 112 },
  { path: "Agilex_Cobot_Magic_move_mouse_pen", task: "Agilex_Cobot_Magic_move_mouse_pen", demos: 30 },
  { path: "Agilex_Cobot_Magic_move_mouse_pen_black_tablecloth", task: "Agilex_Cobot_Magic_move_mouse_pen_black_tablecloth", demos: 30 },
  { path: "Agilex_Cobot_Magic_move_mouse_pen_green_tablecloth", task: "Agilex_Cobot_Magic_move_mouse_pen_green_tablecloth", demos: 30 },
  { path: "Agilex_Cobot_Magic_move_mouse_pen_khaki_tablecloth", task: "Agilex_Cobot_Magic_move_mouse_pen_khaki_tablecloth", demos: 30 },
  { path: "Agilex_Cobot_Magic_move_mouse_pen_red_tablecloth", task: "Agilex_Cobot_Magic_move_mouse_pen_red_tablecloth", demos: 30 },
  { path: "Agilex_Cobot_Magic_move_object", task: "Agilex_Cobot_Magic_move_object", demos: 1163 },
  { path: "Agilex_Cobot_Magic_move_object_beige_tablecloth", task: "Agilex_Cobot_Magic_move_object_beige_tablecloth", demos: 199 },
  { path: "Agilex_Cobot_Magic_move_object_black_tablecloth", task: "Agilex_Cobot_Magic_move_object_black_tablecloth", demos: 200 },
  { path: "Agilex_Cobot_Magic_move_object_green_tablecloth", task: "Agilex_Cobot_Magic_move_object_green_tablecloth", demos: 197 },
  { path: "Agilex_Cobot_Magic_move_object_red_tablecloth", task: "Agilex_Cobot_Magic_move_object_red_tablecloth", demos: 198 },
  { path: "Agilex_Cobot_Magic_move_pencil_sharpener", task: "Agilex_Cobot_Magic_move_pencil_sharpener", demos: 98 },
  { path: "Cobot_Magic_move_plate", task: "Agilex_Cobot_Magic_move_plate", demos: 99 },
  { path: "Cobot_Magic_move_the_ball", task: "Agilex_Cobot_Magic_move_the_ball", demos: 100 },
  { path: "Cobot_Magic_move_the_ball_and_the_cube_block", task: "Agilex_Cobot_Magic_move_the_ball_and_the_cube_block", demos: 98 },
  { path: "Cobot_Magic_move_the_ball_interference", task: "Agilex_Cobot_Magic_move_the_ball_interference", demos: 100 },
  { path: "Cobot_Magic_move_the_bread", task: "Agilex_Cobot_Magic_move_the_bread", demos: 99 },
  { path: "Cobot_Magic_move_the_cup", task: "Agilex_Cobot_Magic_move_the_cup", demos: 100 },
  { path: "Cobot_Magic_move_the_plate", task: "Agilex_Cobot_Magic_move_the_plate", demos: 98 },
  { path: "Cobot_Magic_move_the_small_ball", task: "Agilex_Cobot_Magic_move_the_small_ball", demos: 100 },
  { path: "Cobot_Magic_movethe_position_of_the_bluetooth", task: "Agilex_Cobot_Magic_movethe_position_of_the_bluetooth", demos: 198 },
  { path: "Agilex_Cobot_Magic_open_drawer_bottom", task: "Agilex_Cobot_Magic_open_drawer_bottom", demos: 50 },
  { path: "Cobot_Magic_open_the_shoebox", task: "Agilex_Cobot_Magic_open_the_shoebox", demos: 299 },
  { path: "Agilex_Cobot_Magic_organize_test_tube", task: "Agilex_Cobot_Magic_organize_test_tube", demos: 197 },
  { path: "Cobot_Magic_place_square_pyramid", task: "Agilex_Cobot_Magic_place_square_pyramid", demos: 99 },
  { path: "Cobot_Magic_place_the_cube_block", task: "Agilex_Cobot_Magic_place_the_cube_block", demos: 58 },
  { path: "Cobot_Magic_place_the_test_tube", task: "Agilex_Cobot_Magic_place_the_test_tube", demos: 364 },
  { path: "Agilex_Cobot_Magic_place_towel_flat", task: "Agilex_Cobot_Magic_place_towel_flat", demos: 962 },
  { path: "Cobot_Magic_plate_storage_apple", task: "Agilex_Cobot_Magic_plate_storage_apple", demos: 103 },
  { path: "Cobot_Magic_plate_storage_bread", task: "Agilex_Cobot_Magic_plate_storage_bread", demos: 100 },
  { path: "Cobot_Magic_plate_storaje_baozi", task: "Agilex_Cobot_Magic_plate_storaje_baozi", demos: 495 },
  { path: "Cobot_Magic_pot_storage_steamer", task: "Agilex_Cobot_Magic_pot_storage_steamer", demos: 590 },
  { path: "Cobot_Magic_pour_drink", task: "Agilex_Cobot_Magic_pour_drink", demos: 1613 },
  { path: "Agilex_Cobot_Magic_pour_drink_bottle_cup", task: "Agilex_Cobot_Magic_pour_drink_bottle_cup", demos: 195 },
  { path: "Agilex_Cobot_Magic_pour_drink_bottle_cup_cup", task: "Agilex_Cobot_Magic_pour_drink_bottle_cup_cup", demos: 200 },
  { path: "Cobot_Magic_pour_water_a", task: "Agilex_Cobot_Magic_pour_water_a", demos: 896 },
  { path: "Cobot_Magic_pour_water_bottle", task: "Agilex_Cobot_Magic_pour_water_bottle", demos: 92 },
  { path: "Agilex_Cobot_Magic_pour_water_bottle_cup_cup", task: "Agilex_Cobot_Magic_pour_water_bottle_cup_cup", demos: 198 },
  { path: "Agilex_Cobot_Magic_pour_water_middle_cup", task: "Agilex_Cobot_Magic_pour_water_middle_cup", demos: 192 },
  { path: "Agilex_Cobot_Magic_pour_water_pink_cup", task: "Agilex_Cobot_Magic_pour_water_pink_cup", demos: 100 },
  { path: "Cobot_Magic_prepare_breakfast", task: "Agilex_Cobot_Magic_prepare_breakfast", demos: 565 },
  { path: "Cobot_Magic_pull_zipper", task: "Agilex_Cobot_Magic_pull_zipper", demos: 1868 },
  { path: "Cobot_Magic_pushing_magnet", task: "Agilex_Cobot_Magic_pushing_magnet", demos: 100 },
  { path: "Cobot_Magic_put_in_the_pear", task: "Agilex_Cobot_Magic_put_in_the_pear", demos: 97 },
  { path: "Cobot_Magic_put_the_building_block_on_the_table", task: "Agilex_Cobot_Magic_put_the_building_block_on_the_table", demos: 98 },
  { path: "Agilex_Cobot_Magic_seal_bag", task: "Agilex_Cobot_Magic_seal_bag", demos: 398 },
  { path: "Agilex_Cobot_Magic_stack_block", task: "Agilex_Cobot_Magic_stack_block", demos: 672 },
  { path: "Cobot_Magic_steamer_storage_dumpling", task: "Agilex_Cobot_Magic_steamer_storage_dumpling", demos: 580 },
  { path: "Agilex_Cobot_Magic_storage_bread_basket", task: "Agilex_Cobot_Magic_storage_bread_basket", demos: 98 },
  { path: "Agilex_Cobot_Magic_storage_fruit_basket", task: "Agilex_Cobot_Magic_storage_fruit_basket", demos: 199 },
  { path: "Agilex_Cobot_Magic_storage_fruit_bowl", task: "Agilex_Cobot_Magic_storage_fruit_bowl", demos: 100 },
  { path: "Agilex_Cobot_Magic_storage_lemon_mango", task: "Agilex_Cobot_Magic_storage_lemon_mango", demos: 100 },
  { path: "Agilex_Cobot_Magic_storage_object", task: "Agilex_Cobot_Magic_storage_object", demos: 99 },
  { path: "Agilex_Cobot_Magic_storage_object_basket", task: "Agilex_Cobot_Magic_storage_object_basket", demos: 100 },
  { path: "Agilex_Cobot_Magic_storage_object_closest", task: "Agilex_Cobot_Magic_storage_object_closest", demos: 100 },
  { path: "Agilex_Cobot_Magic_storage_object_closest_apple", task: "Agilex_Cobot_Magic_storage_object_closest_apple", demos: 49 },
  { path: "Agilex_Cobot_Magic_storage_object_closest_cube", task: "Agilex_Cobot_Magic_storage_object_closest_cube", demos: 49 },
  { path: "Agilex_Cobot_Magic_storage_object_left", task: "Agilex_Cobot_Magic_storage_object_left", demos: 100 },
  { path: "Agilex_Cobot_Magic_storage_object_red_tablecloth", task: "Agilex_Cobot_Magic_storage_object_red_tablecloth", demos: 200 },
  { path: "Agilex_Cobot_Magic_storage_orange_basket_left", task: "Agilex_Cobot_Magic_storage_orange_basket_left", demos: 99 },
  { path: "Agilex_Cobot_Magic_storage_orange_basket_right", task: "Agilex_Cobot_Magic_storage_orange_basket_right", demos: 98 },
  { path: "Agilex_Cobot_Magic_storage_orange_white_bag", task: "Agilex_Cobot_Magic_storage_orange_white_bag", demos: 100 },
  { path: "Agilex_Cobot_Magic_storage_peach_brown_bag", task: "Agilex_Cobot_Magic_storage_peach_brown_bag", demos: 100 },
  { path: "Agilex_Cobot_Magic_storage_peach_left", task: "Agilex_Cobot_Magic_storage_peach_left", demos: 99 },
  { path: "Agilex_Cobot_Magic_storage_peach_right", task: "Agilex_Cobot_Magic_storage_peach_right", demos: 99 },
  { path: "Agilex_Cobot_Magic_storage_peach_white_bag", task: "Agilex_Cobot_Magic_storage_peach_white_bag", demos: 100 },
  { path: "Cobot_Magic_storage_plate", task: "Agilex_Cobot_Magic_storage_plate", demos: 84 },
  { path: "Agilex_Cobot_Magic_storage_towel", task: "Agilex_Cobot_Magic_storage_towel", demos: 1176 },
  { path: "Agilex_Cobot_Magic_sweep_coffee_beans", task: "Agilex_Cobot_Magic_sweep_coffee_beans", demos: 359 },
  { path: "Cobot_Magic_take_out_a_pen_from_the_pen_holder", task: "Agilex_Cobot_Magic_take_out_a_pen_from_the_pen_holder", demos: 488 },
  { path: "Cobot_Magic_take_out_the_bread", task: "Agilex_Cobot_Magic_take_out_the_bread", demos: 588 },
  { path: "Cobot_Magic_take_the_shoes_off_the_shelf", task: "Agilex_Cobot_Magic_take_the_shoes_off_the_shelf", demos: 595 },
  { path: "Cobot_Magic_the_box_stores_table_tennis_balls", task: "Agilex_Cobot_Magic_the_box_stores_table_tennis_balls", demos: 477 },
  { path: "Cobot_Magic_the_plate_holds_the_fruit", task: "Agilex_Cobot_Magic_the_plate_holds_the_fruit", demos: 525 },
  { path: "Cobot_Magic_the_plate_holds_the_vegetables", task: "Agilex_Cobot_Magic_the_plate_holds_the_vegetables", demos: 505 },
  { path: "Cobot_Magic_turn_off_the_desk_lamp", task: "Agilex_Cobot_Magic_turn_off_the_desk_lamp", demos: 398 },
  { path: "Cobot_Magic_turn_on_the_bulb", task: "Agilex_Cobot_Magic_turn_on_the_bulb", demos: 11 },
  { path: "Cobot_Magic_turn_on_the_desk_lamp", task: "Agilex_Cobot_Magic_turn_on_the_desk_lamp", demos: 449 },
  { path: "Cobot_Magic_twist_bottle_cap", task: "Agilex_Cobot_Magic_twist_bottle_cap", demos: 863 },
  { path: "Cobot_Magic_vase_storage_flower", task: "Agilex_Cobot_Magic_vase_storage_flower", demos: 455 },
  { path: "Cobot_Magic_water_bottle_storage", task: "Agilex_Cobot_Magic_water_bottle_storage", demos: 100 },
  { path: "Split_aloha_basket_storage_banana", task: "Agilex_Split_Aloha_basket_storage_banana", demos: 368 },
  { path: "Split_aloha_basket_storage_bread", task: "Agilex_Split_Aloha_basket_storage_bread", demos: 497 },
  { path: "Split_aloha_basket_storage_egg_yolk_pastry", task: "Agilex_Split_Aloha_basket_storage_egg_yolk_pastry", demos: 629 },
  { path: "Split_aloha_basket_storage_long_bread", task: "Agilex_Split_Aloha_basket_storage_long_bread", demos: 311 },
  { path: "Split_aloha_basket_storage_orange", task: "Agilex_Split_Aloha_basket_storage_orange", demos: 642 },
  { path: "Split_aloha_basket_storage_peach", task: "Agilex_Split_Aloha_basket_storage_peach", demos: 994 },
  { path: "agilex_cobot_magic_pass_object_left_to_right_black_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_left_to_right_black_tablecloth", demos: 98 },
  { path: "agilex_cobot_magic_pass_object_left_to_right_green_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_left_to_right_green_tablecloth", demos: 96 },
  { path: "agilex_cobot_magic_pass_object_left_to_right_khaki_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_left_to_right_khaki_tablecloth", demos: 97 },
  { path: "agilex_cobot_magic_pass_object_left_to_right_white_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_left_to_right_white_tablecloth", demos: 96 },
  { path: "agilex_cobot_magic_pass_object_right_to_left_black_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_right_to_left_black_tablecloth", demos: 93 },
  { path: "agilex_cobot_magic_pass_object_right_to_left_green_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_right_to_left_green_tablecloth", demos: 98 },
  { path: "agilex_cobot_magic_pass_object_right_to_left_khaki_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_right_to_left_khaki_tablecloth", demos: 98 },
  { path: "agilex_cobot_magic_pass_object_right_to_left_red_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_right_to_left_red_tablecloth", demos: 99 },
  { path: "agilex_cobot_magic_pass_object_right_to_left_white_tablecloth", task: "Agilex_Split_Aloha_cobot_magic_pass_object_right_to_left_white_tablecloth", demos: 99 },
  { path: "Split_aloha_fold_the_pants", task: "Agilex_Split_Aloha_fold_the_pants", demos: 486 },
  { path: "Split_aloha_plate_storage", task: "Agilex_Split_Aloha_plate_storage", demos: 499 },
  { path: "Split_aloha_pour_rice", task: "Agilex_Split_Aloha_pour_rice", demos: 740 },
  { path: "Split_aloha_pour_tea", task: "Agilex_Split_Aloha_pour_tea", demos: 977 },
  { path: "Split_aloha_scoop_coffee_beans", task: "Agilex_Split_Aloha_scoop_coffee_beans", demos: 499 },
  { path: "Split_aloha_stack_baskets", task: "Agilex_Split_Aloha_stack_baskets", demos: 1066 },
  { path: "Split_aloha_stir_coffee", task: "Agilex_Split_Aloha_stir_coffee", demos: 495 },
  { path: "Split_aloha_wipe_table", task: "Agilex_Split_Aloha_wipe_table", demos: 200 },
  { path: "Split_aloha_wipe_the_table", task: "Agilex_Split_Aloha_wipe_the_table", demos: 302 },
  { path: "Split_aloha_zip_up_the_document_bag", task: "Agilex_Split_Aloha_zip_up_the_document_bag", demos: 495 },
  { path: "alpha_bot_2_carry_the_clothes_basket", task: "AI2_Alphabot_2_carry_the_clothes_basket", demos: 50 },
  { path: "alpha_bot_2_item_reversal", task: "AI2_Alphabot_2_item_reversal", demos: 90 },
  { path: "alpha_bot_2_move_the_table", task: "AI2_Alphabot_2_move_the_table", demos: 72 },
  { path: "alpha_bot_2_operate_the_microwave_oven", task: "AI2_Alphabot_2_operate_the_microwave_oven", demos: 16 },
  { path: "alpha_bot_2_pass_the_sandbag", task: "AI2_Alphabot_2_pass_the_sandbag", demos: 86 },
  { path: "alpha_bot_2_press_the_button_a", task: "AI2_Alphabot_2_press_the_button_a", demos: 116 },
  { path: "alpha_bot_2_press_the_button_b", task: "AI2_Alphabot_2_press_the_button_b", demos: 34 },
  { path: "alpha_bot_2_recover_after_touching_an_obstacle", task: "AI2_Alphabot_2_recover_after_touching_an_obstacle", demos: 130 },
  { path: "alpha_bot_2_stack_building_blocks", task: "AI2_Alphabot_2_stack_building_blocks", demos: 139 },
  { path: "alpha_bot_2_sticker", task: "AI2_Alphabot_2_sticker", demos: 93 },
  { path: "AIRBOT_MMK2_beauty_sponge_and_cake_to_place", task: "Airbot_MMK2_beauty_sponge_and_cake_to_place", demos: 50 },
  { path: "AIRBOT_MMK2_bowl_storage_pepper", task: "Airbot_MMK2_bowl_storage_pepper", demos: 150 },
  { path: "AIRBOT_MMK2_boxs_storage", task: "Airbot_MMK2_boxs_storage", demos: 138 },
  { path: "AIRBOT_MMK2_building_block_storage", task: "Airbot_MMK2_building_block_storage", demos: 246 },
  { path: "AIRBOT_MMK2_cake_storage", task: "Airbot_MMK2_cake_storage", demos: 50 },
  { path: "AIRBOT_MMK2_chop_the_scallions", task: "Airbot_MMK2_chop_the_scallions", demos: 50 },
  { path: "AIRBOT_MMK2_clean_the_desktop", task: "Airbot_MMK2_clean_the_desktop", demos: 49 },
  { path: "AIRBOT_MMK2_clean_the_desktop_a", task: "Airbot_MMK2_clean_the_desktop_a", demos: 50 },
  { path: "Airbot_MMK2_click_pen", task: "Airbot_MMK2_click_pen", demos: 100 },
  { path: "Airbot_MMK2_close_door_left", task: "Airbot_MMK2_close_door_left", demos: 50 },
  { path: "Airbot_MMK2_close_door_right", task: "Airbot_MMK2_close_door_right", demos: 47 },
  { path: "Airbot_MMK2_close_doors", task: "Airbot_MMK2_close_doors", demos: 50 },
  { path: "Airbot_MMK2_close_drawer", task: "Airbot_MMK2_close_drawer", demos: 50 },
  { path: "Airbot_MMK2_close_lid", task: "Airbot_MMK2_close_lid", demos: 239 },
  { path: "AIRBOT_MMK2_close_the_computer", task: "Airbot_MMK2_close_the_computer", demos: 49 },
  { path: "Airbot_MMK2_cover_lid", task: "Airbot_MMK2_cover_lid", demos: 50 },
  { path: "AIRBOT_MMK2_cup_storage", task: "Airbot_MMK2_cup_storage", demos: 48 },
  { path: "Airbot_MMK2_cut_scallion", task: "Airbot_MMK2_cut_scallion", demos: 97 },
  { path: "AIRBOT_MMK2_desktop_storage", task: "Airbot_MMK2_desktop_storage", demos: 13 },
  { path: "Airbot_MMK2_dial_number", task: "Airbot_MMK2_dial_number", demos: 98 },
  { path: "AIRBOT_MMK2_diamond_storage", task: "Airbot_MMK2_diamond_storage", demos: 50 },
  { path: "Airbot_MMK2_doodled_line", task: "Airbot_MMK2_doodled_line", demos: 99 },
  { path: "AIRBOT_MMK2_double-sided_tape_placement", task: "Airbot_MMK2_double-sided_tape_placement", demos: 50 },
  { path: "AIRBOT_MMK2_egg_storage", task: "Airbot_MMK2_egg_storage", demos: 58 },
  { path: "AIRBOT_MMK2_food_storage", task: "Airbot_MMK2_food_storage", demos: 344 },
  { path: "AIRBOT_MMK2_item_storage", task: "Airbot_MMK2_item_storage", demos: 72 },
  { path: "AIRBOT_MMK2_lemon_and_orange_storage", task: "Airbot_MMK2_lemon_and_orange_storage", demos: 29 },
  { path: "AIRBOT_MMK2_medicine_bottle_storage", task: "Airbot_MMK2_medicine_bottle_storage", demos: 49 },
  { path: "AIRBOT_MMK2_mobile_calculator_box", task: "Airbot_MMK2_mobile_calculator_box", demos: 150 },
  { path: "AIRBOT_MMK2_mobile_car", task: "Airbot_MMK2_mobile_car", demos: 50 },
  { path: "AIRBOT_MMK2_mobile_phone_storage", task: "Airbot_MMK2_mobile_phone_storage", demos: 49 },
  { path: "Airbot_MMK2_move_apple_orange_pomegranate", task: "Airbot_MMK2_move_apple_orange_pomegranate", demos: 59 },
  { path: "Airbot_MMK2_move_block", task: "Airbot_MMK2_move_block", demos: 50 },
  { path: "Airbot_MMK2_move_block_both_hands", task: "Airbot_MMK2_move_block_both_hands", demos: 54 },
  { path: "Airbot_MMK2_move_block_gold_bar_models", task: "Airbot_MMK2_move_block_gold_bar_models", demos: 50 },
  { path: "Airbot_MMK2_move_block_twice", task: "Airbot_MMK2_move_block_twice", demos: 57 },
  { path: "Airbot_MMK2_move_block_wet_wipes", task: "Airbot_MMK2_move_block_wet_wipes", demos: 60 },
  { path: "Airbot_MMK2_move_book_front", task: "Airbot_MMK2_move_book_front", demos: 49 },
  { path: "Airbot_MMK2_move_book_right_side", task: "Airbot_MMK2_move_book_right_side", demos: 46 },
  { path: "Airbot_MMK2_move_bottle_tape_measure", task: "Airbot_MMK2_move_bottle_tape_measure", demos: 44 },
  { path: "Airbot_MMK2_move_cake", task: "Airbot_MMK2_move_cake", demos: 94 },
  { path: "Airbot_MMK2_move_cake_tape_measure", task: "Airbot_MMK2_move_cake_tape_measure", demos: 49 },
  { path: "Airbot_MMK2_move_cup_paper_box", task: "Airbot_MMK2_move_cup_paper_box", demos: 93 },
  { path: "Airbot_MMK2_move_fake_food", task: "Airbot_MMK2_move_fake_food", demos: 50 },
  { path: "Airbot_MMK2_move_medicine_bottle", task: "Airbot_MMK2_move_medicine_bottle", demos: 50 },
  { path: "Airbot_MMK2_move_pan", task: "Airbot_MMK2_move_pan", demos: 48 },
  { path: "Airbot_MMK2_move_paper_box", task: "Airbot_MMK2_move_paper_box", demos: 47 },
  { path: "Airbot_MMK2_move_phone_twice", task: "Airbot_MMK2_move_phone_twice", demos: 50 },
  { path: "Airbot_MMK2_move_sword_doll", task: "Airbot_MMK2_move_sword_doll", demos: 48 },
  { path: "Airbot_MMK2_move_tennis_racket_ball", task: "Airbot_MMK2_move_tennis_racket_ball", demos: 48 },
  { path: "Airbot_MMK2_move_tub", task: "Airbot_MMK2_move_tub", demos: 37 },
  { path: "Airbot_MMK2_move_umbrella_tissues", task: "Airbot_MMK2_move_umbrella_tissues", demos: 49 },
  { path: "Airbot_MMK2_open_door_left", task: "Airbot_MMK2_open_door_left", demos: 49 },
  { path: "Airbot_MMK2_open_door_right", task: "Airbot_MMK2_open_door_right", demos: 98 },
  { path: "Airbot_MMK2_open_laptop", task: "Airbot_MMK2_open_laptop", demos: 50 },
  { path: "Airbot_MMK2_open_lid", task: "Airbot_MMK2_open_lid", demos: 198 },
  { path: "AIRBOT_MMK2_open_notebook", task: "Airbot_MMK2_open_notebook", demos: 50 },
  { path: "AIRBOT_MMK2_organize_and_place_books", task: "Airbot_MMK2_organize_and_place_books", demos: 48 },
  { path: "AIRBOT_MMK2_organize_books", task: "Airbot_MMK2_organize_books", demos: 50 },
  { path: "Airbot_MMK2_organize_plate", task: "Airbot_MMK2_organize_plate", demos: 595 },
  { path: "Airbot_MMK2_pass_paper_box", task: "Airbot_MMK2_pass_paper_box", demos: 46 },
  { path: "Airbot_MMK2_pick_up_and_place_tub", task: "Airbot_MMK2_pick_up_and_place_tub", demos: 98 },
  { path: "AIRBOT_MMK2_place_cookies_and_beer", task: "Airbot_MMK2_place_cookies_and_beer", demos: 50 },
  { path: "AIRBOT_MMK2_place_the_basin", task: "Airbot_MMK2_place_the_basin", demos: 50 },
  { path: "AIRBOT_MMK2_place_the_blue_and_purple_blocks", task: "Airbot_MMK2_place_the_blue_and_purple_blocks", demos: 50 },
  { path: "AIRBOT_MMK2_place_the_books", task: "Airbot_MMK2_place_the_books", demos: 49 },
  { path: "AIRBOT_MMK2_place_the_building_blocks", task: "Airbot_MMK2_place_the_building_blocks", demos: 43 },
  { path: "AIRBOT_MMK2_place_the_cake", task: "Airbot_MMK2_place_the_cake", demos: 249 },
  { path: "AIRBOT_MMK2_place_the_glasses_case_and_gold_bars", task: "Airbot_MMK2_place_the_glasses_case_and_gold_bars", demos: 49 },
  { path: "AIRBOT_MMK2_place_the_network_cable_and_mouse_box", task: "Airbot_MMK2_place_the_network_cable_and_mouse_box", demos: 46 },
  { path: "AIRBOT_MMK2_place_the_paper_drawer", task: "Airbot_MMK2_place_the_paper_drawer", demos: 688 },
  { path: "AIRBOT_MMK2_place_the_piano_and_the_needle-nose_pliers", task: "Airbot_MMK2_place_the_piano_and_the_needle-nose_pliers", demos: 49 },
  { path: "AIRBOT_MMK2_place_the_pliers_and_wallpaper_knife", task: "Airbot_MMK2_place_the_pliers_and_wallpaper_knife", demos: 50 },
  { path: "AIRBOT_MMK2_place_the_shark_toys_and_gold_bars", task: "Airbot_MMK2_place_the_shark_toys_and_gold_bars", demos: 50 },
  { path: "AIRBOT_MMK2_place_the_small_bowl_of_canned_food", task: "Airbot_MMK2_place_the_small_bowl_of_canned_food", demos: 50 },
  { path: "AIRBOT_MMK2_place_the_sponge_and_wet_wipes", task: "Airbot_MMK2_place_the_sponge_and_wet_wipes", demos: 90 },
  { path: "AIRBOT_MMK2_place_the_umbrella_and_the_ruler", task: "Airbot_MMK2_place_the_umbrella_and_the_ruler", demos: 42 },
  { path: "AIRBOT_MMK2_place_the_yellow_block", task: "Airbot_MMK2_place_the_yellow_block", demos: 47 },
  { path: "Airbot_MMK2_play_guitar", task: "Airbot_MMK2_play_guitar", demos: 94 },
  { path: "AIRBOT_MMK2_play_the_guitar", task: "Airbot_MMK2_play_the_guitar", demos: 48 },
  { path: "Airbot_MMK2_play_toy_piano", task: "Airbot_MMK2_play_toy_piano", demos: 50 },
  { path: "AIRBOT_MMK2_potato_storage", task: "Airbot_MMK2_potato_storage", demos: 50 },
  { path: "Airbot_MMK2_pour_BBs", task: "Airbot_MMK2_pour_BBs", demos: 50 },
  { path: "AIRBOT_MMK2_pour_out_the_beauty_blender", task: "Airbot_MMK2_pour_out_the_beauty_blender", demos: 47 },
  { path: "Airbot_MMK2_prepare_tea", task: "Airbot_MMK2_prepare_tea", demos: 89 },
  { path: "Airbot_MMK2_pull_plunger", task: "Airbot_MMK2_pull_plunger", demos: 97 },
  { path: "AIRBOT_MMK2_pull_the_syringe_piston", task: "Airbot_MMK2_pull_the_syringe_piston", demos: 50 },
  { path: "Airbot_MMK2_pull_tissue", task: "Airbot_MMK2_pull_tissue", demos: 49 },
  { path: "AIRBOT_MMK2_pumpkin_storage", task: "Airbot_MMK2_pumpkin_storage", demos: 49 },
  { path: "Airbot_MMK2_push_away_book", task: "Airbot_MMK2_push_away_book", demos: 244 },
  { path: "AIRBOT_MMK2_push_building_blocks", task: "Airbot_MMK2_push_building_blocks", demos: 139 },
  { path: "AIRBOT_MMK2_push_piston", task: "Airbot_MMK2_push_piston", demos: 47 },
  { path: "Airbot_MMK2_push_plunger", task: "Airbot_MMK2_push_plunger", demos: 147 },
  { path: "Airbot_MMK2_push_toy_car", task: "Airbot_MMK2_push_toy_car", demos: 50 },
  { path: "Airbot_MMK2_remove_lid", task: "Airbot_MMK2_remove_lid", demos: 47 },
  { path: "Airbot_MMK2_remove_pen_cap", task: "Airbot_MMK2_remove_pen_cap", demos: 100 },
  { path: "Airbot_MMK2_rotate_cube_face", task: "Airbot_MMK2_rotate_cube_face", demos: 145 },
  { path: "AIRBOT_MMK2_screw_the_bottle_cap", task: "Airbot_MMK2_screw_the_bottle_cap", demos: 50 },
  { path: "Airbot_MMK2_slide_block", task: "Airbot_MMK2_slide_block", demos: 173 },
  { path: "Airbot_MMK2_slide_block_onto_post", task: "Airbot_MMK2_slide_block_onto_post", demos: 189 },
  { path: "Airbot_MMK2_slide_tape_onto_can", task: "Airbot_MMK2_slide_tape_onto_can", demos: 44 },
  { path: "AIRBOT_MMK2_square_arrangement", task: "Airbot_MMK2_square_arrangement", demos: 49 },
  { path: "Airbot_MMK2_stack_block", task: "Airbot_MMK2_stack_block", demos: 236 },
  { path: "Airbot_MMK2_stack_bowl", task: "Airbot_MMK2_stack_bowl", demos: 50 },
  { path: "Airbot_MMK2_stack_cubic_block", task: "Airbot_MMK2_stack_cubic_block", demos: 162 },
  { path: "Airbot_MMK2_stack_cup", task: "Airbot_MMK2_stack_cup", demos: 99 },
  { path: "AIRBOT_MMK2_stacking_blocks", task: "Airbot_MMK2_stacking_blocks", demos: 213 },
  { path: "Airbot_MMK2_storage_and_take_cake_plate", task: "Airbot_MMK2_storage_and_take_cake_plate", demos: 50 },
  { path: "Airbot_MMK2_storage_apple_orange", task: "Airbot_MMK2_storage_apple_orange", demos: 41 },
  { path: "Airbot_MMK2_storage_badminton", task: "Airbot_MMK2_storage_badminton", demos: 49 },
  { path: "Airbot_MMK2_storage_bell_pepper", task: "Airbot_MMK2_storage_bell_pepper", demos: 48 },
  { path: "Airbot_MMK2_storage_bell_pepper_bowl", task: "Airbot_MMK2_storage_bell_pepper_bowl", demos: 50 },
  { path: "Airbot_MMK2_storage_block", task: "Airbot_MMK2_storage_block", demos: 262 },
  { path: "Airbot_MMK2_storage_block_BBs", task: "Airbot_MMK2_storage_block_BBs", demos: 48 },
  { path: "Airbot_MMK2_storage_block_both_hands", task: "Airbot_MMK2_storage_block_both_hands", demos: 49 },
  { path: "Airbot_MMK2_storage_block_tape_measure", task: "Airbot_MMK2_storage_block_tape_measure", demos: 48 },
  { path: "Airbot_MMK2_storage_book", task: "Airbot_MMK2_storage_book", demos: 237 },
  { path: "Airbot_MMK2_storage_bottle_part", task: "Airbot_MMK2_storage_bottle_part", demos: 49 },
  { path: "Airbot_MMK2_storage_bowl", task: "Airbot_MMK2_storage_bowl", demos: 46 },
  { path: "Airbot_MMK2_storage_bowl_wet_wipes", task: "Airbot_MMK2_storage_bowl_wet_wipes", demos: 50 },
  { path: "AIRBOT_MMK2_storage_box_for_mouse_and_sponge", task: "Airbot_MMK2_storage_box_for_mouse_and_sponge", demos: 49 },
  { path: "Airbot_MMK2_storage_braised_pork_belly_shrimp", task: "Airbot_MMK2_storage_braised_pork_belly_shrimp", demos: 38 },
  { path: "Airbot_MMK2_storage_cake_both_hands", task: "Airbot_MMK2_storage_cake_both_hands", demos: 47 },
  { path: "Airbot_MMK2_storage_cake_box", task: "Airbot_MMK2_storage_cake_box", demos: 50 },
  { path: "Airbot_MMK2_storage_cake_cup", task: "Airbot_MMK2_storage_cake_cup", demos: 50 },
  { path: "Airbot_MMK2_storage_cake_ice_cream", task: "Airbot_MMK2_storage_cake_ice_cream", demos: 50 },
  { path: "Airbot_MMK2_storage_cake_pan", task: "Airbot_MMK2_storage_cake_pan", demos: 48 },
  { path: "Airbot_MMK2_storage_cake_plate", task: "Airbot_MMK2_storage_cake_plate", demos: 50 },
  { path: "AIRBOT_MMK2_storage_computer_box", task: "Airbot_MMK2_storage_computer_box", demos: 50 },
  { path: "Airbot_MMK2_storage_cookie_cup", task: "Airbot_MMK2_storage_cookie_cup", demos: 47 },
  { path: "Airbot_MMK2_storage_cookie_toy_car", task: "Airbot_MMK2_storage_cookie_toy_car", demos: 50 },
  { path: "Airbot_MMK2_storage_cup", task: "Airbot_MMK2_storage_cup", demos: 99 },
  { path: "Airbot_MMK2_storage_cup_plate", task: "Airbot_MMK2_storage_cup_plate", demos: 44 },
  { path: "Airbot_MMK2_storage_cup_rubik's_cube", task: "Airbot_MMK2_storage_cup_rubik's_cube (Airbot_MMK2_storage_cup_rubik's_cube)", demos: 47 },
  { path: "Airbot_MMK2_storage_cup_rubik_s_cube", task: "Airbot_MMK2_storage_cup_rubik's_cube (Airbot_MMK2_storage_cup_rubik_s_cube)", demos: 47 },
  { path: "Airbot_MMK2_storage_diamond_ring", task: "Airbot_MMK2_storage_diamond_ring", demos: 50 },
  { path: "Airbot_MMK2_storage_egg_bowl", task: "Airbot_MMK2_storage_egg_bowl", demos: 50 },
  { path: "Airbot_MMK2_storage_egg_plate", task: "Airbot_MMK2_storage_egg_plate", demos: 45 },
  { path: "Airbot_MMK2_storage_egg_white_box", task: "Airbot_MMK2_storage_egg_white_box", demos: 43 },
  { path: "Airbot_MMK2_storage_egg_yellow_box", task: "Airbot_MMK2_storage_egg_yellow_box", demos: 249 },
  { path: "Airbot_MMK2_storage_electronics_white_basket", task: "Airbot_MMK2_storage_electronics_white_basket", demos: 50 },
  { path: "Airbot_MMK2_storage_electronics_yellow_baket", task: "Airbot_MMK2_storage_electronics_yellow_baket", demos: 99 },
  { path: "AIRBOT_MMK2_storage_for_building_blocks_and_beauty_sponges", task: "Airbot_MMK2_storage_for_building_blocks_and_beauty_sponges", demos: 150 },
  { path: "Airbot_MMK2_storage_gold_bar_model_shark_doll", task: "Airbot_MMK2_storage_gold_bar_model_shark_doll", demos: 44 },
  { path: "Airbot_MMK2_storage_grape", task: "Airbot_MMK2_storage_grape", demos: 50 },
  { path: "Airbot_MMK2_storage_hourglass", task: "Airbot_MMK2_storage_hourglass", demos: 50 },
  { path: "Airbot_MMK2_storage_ice_cream", task: "Airbot_MMK2_storage_ice_cream", demos: 47 },
  { path: "AIRBOT_MMK2_storage_item", task: "Airbot_MMK2_storage_item", demos: 47 },
  { path: "Airbot_MMK2_storage_lemon_mango", task: "Airbot_MMK2_storage_lemon_mango", demos: 49 },
  { path: "Airbot_MMK2_storage_mango_pomegranate", task: "Airbot_MMK2_storage_mango_pomegranate", demos: 90 },
  { path: "Airbot_MMK2_storage_milk_tissue", task: "Airbot_MMK2_storage_milk_tissue", demos: 48 },
  { path: "Airbot_MMK2_storage_network_cable_paper_box", task: "Airbot_MMK2_storage_network_cable_paper_box", demos: 60 },
  { path: "Airbot_MMK2_storage_onion_sweet_potato", task: "Airbot_MMK2_storage_onion_sweet_potato", demos: 50 },
  { path: "Airbot_MMK2_storage_paper_box_sponge", task: "Airbot_MMK2_storage_paper_box_sponge", demos: 49 },
  { path: "Airbot_MMK2_storage_peach_pear", task: "Airbot_MMK2_storage_peach_pear", demos: 12 },
  { path: "Airbot_MMK2_storage_penguin_doll_tiger_doll", task: "Airbot_MMK2_storage_penguin_doll_tiger_doll", demos: 100 },
  { path: "Airbot_MMK2_storage_pineapple", task: "Airbot_MMK2_storage_pineapple", demos: 49 },
  { path: "Airbot_MMK2_storage_potato_left", task: "Airbot_MMK2_storage_potato_left", demos: 69 },
  { path: "Airbot_MMK2_storage_potato_pumpkin", task: "Airbot_MMK2_storage_potato_pumpkin", demos: 41 },
  { path: "Airbot_MMK2_storage_pumpkin_left", task: "Airbot_MMK2_storage_pumpkin_left", demos: 50 },
  { path: "Airbot_MMK2_storage_pumpkin_right", task: "Airbot_MMK2_storage_pumpkin_right", demos: 49 },
  { path: "AIRBOT_MMK2_storage_remote_control_clip_box_water_bottle", task: "Airbot_MMK2_storage_remote_control_clip_box_water_bottle", demos: 47 },
  { path: "AIRBOT_MMK2_storage_rubiks_cube_and_cup", task: "Airbot_MMK2_storage_rubiks_cube_and_cup", demos: 48 },
  { path: "Airbot_MMK2_storage_shark_doll", task: "Airbot_MMK2_storage_shark_doll", demos: 93 },
  { path: "Airbot_MMK2_storage_sponge_wet_wipes", task: "Airbot_MMK2_storage_sponge_wet_wipes", demos: 40 },
  { path: "Airbot_MMK2_storage_spoon", task: "Airbot_MMK2_storage_spoon (Airbot_MMK2_storage_spoon)", demos: 54 },
  { path: "AIRBOT_MMK2_storage_spoon", task: "Airbot_MMK2_storage_spoon (AIRBOT_MMK2_storage_spoon)", demos: 49 },
  { path: "Airbot_MMK2_storage_stationery_xylophone", task: "Airbot_MMK2_storage_stationery_xylophone", demos: 47 },
  { path: "Airbot_MMK2_storage_tape_measure_umbrella", task: "Airbot_MMK2_storage_tape_measure_umbrella", demos: 40 },
  { path: "AIRBOT_MMK2_storage_tissue_and_milk_carton", task: "Airbot_MMK2_storage_tissue_and_milk_carton", demos: 47 },
  { path: "AIRBOT_MMK2_storage_tissue_paper", task: "Airbot_MMK2_storage_tissue_paper", demos: 50 },
  { path: "Airbot_MMK2_storage_tissues_tub", task: "Airbot_MMK2_storage_tissues_tub", demos: 49 },
  { path: "Airbot_MMK2_storage_tomato_potato", task: "Airbot_MMK2_storage_tomato_potato", demos: 47 },
  { path: "Airbot_MMK2_storage_tools", task: "Airbot_MMK2_storage_tools", demos: 49 },
  { path: "AIRBOT_MMK2_storage_toy_cars_and_cookies", task: "Airbot_MMK2_storage_toy_cars_and_cookies", demos: 50 },
  { path: "Airbot_MMK2_storage_tumbler_umbrella", task: "Airbot_MMK2_storage_tumbler_umbrella", demos: 48 },
  { path: "AIRBOT_MMK2_storage_wet_tissue_and_building_block", task: "Airbot_MMK2_storage_wet_tissue_and_building_block", demos: 47 },
  { path: "AIRBOT_MMK2_store_beauty_blender_and_building_blocks", task: "Airbot_MMK2_store_beauty_blender_and_building_blocks", demos: 50 },
  { path: "AIRBOT_MMK2_store_coffee_cups", task: "Airbot_MMK2_store_coffee_cups", demos: 50 },
  { path: "AIRBOT_MMK2_store_peaches_and_pears", task: "Airbot_MMK2_store_peaches_and_pears", demos: 48 },
  { path: "AIRBOT_MMK2_store_pomegranates_and_mangoes", task: "Airbot_MMK2_store_pomegranates_and_mangoes", demos: 44 },
  { path: "AIRBOT_MMK2_store_wet_wipes_and_bowls", task: "Airbot_MMK2_store_wet_wipes_and_bowls", demos: 50 },
  { path: "Airbot_MMK2_storge_cake_ice_cream", task: "Airbot_MMK2_storge_cake_ice_cream", demos: 48 },
  { path: "Airbot_MMK2_swap_apple_cake_plate", task: "Airbot_MMK2_swap_apple_cake_plate", demos: 47 },
  { path: "Airbot_MMK2_swap_bbs_block_plate", task: "Airbot_MMK2_swap_bbs_block_plate", demos: 50 },
  { path: "Airbot_MMK2_swap_bbs_cake_plate", task: "Airbot_MMK2_swap_bbs_cake_plate", demos: 49 },
  { path: "Airbot_MMK2_swap_bottle_wet_wipes_plate", task: "Airbot_MMK2_swap_bottle_wet_wipes_plate", demos: 50 },
  { path: "Airbot_MMK2_swap_bread_cake_plate", task: "Airbot_MMK2_swap_bread_cake_plate", demos: 41 },
  { path: "Airbot_MMK2_swap_cake_pumpkin_plate", task: "Airbot_MMK2_swap_cake_pumpkin_plate", demos: 50 },
  { path: "Airbot_MMK2_swap_cake_sponge_plate", task: "Airbot_MMK2_swap_cake_sponge_plate", demos: 43 },
  { path: "Airbot_MMK2_swap_sponge_paper_box_plate", task: "Airbot_MMK2_swap_sponge_paper_box_plate", demos: 50 },
  { path: "Airbot_MMK2_sweep_peaper", task: "Airbot_MMK2_sweep_peaper", demos: 98 },
  { path: "Airbot_MMK2_take_BBs_block", task: "Airbot_MMK2_take_BBs_block", demos: 43 },
  { path: "Airbot_MMK2_take_block", task: "Airbot_MMK2_take_block", demos: 47 },
  { path: "Airbot_MMK2_take_block_both_hands", task: "Airbot_MMK2_take_block_both_hands", demos: 47 },
  { path: "Airbot_MMK2_take_book", task: "Airbot_MMK2_take_book", demos: 98 },
  { path: "Airbot_MMK2_take_bottle_umbrella", task: "Airbot_MMK2_take_bottle_umbrella", demos: 54 },
  { path: "Airbot_MMK2_take_bowl_sponge", task: "Airbot_MMK2_take_bowl_sponge", demos: 42 },
  { path: "Airbot_MMK2_take_cake_both_hands", task: "Airbot_MMK2_take_cake_both_hands", demos: 48 },
  { path: "Airbot_MMK2_take_cup", task: "Airbot_MMK2_take_cup", demos: 35 },
  { path: "Airbot_MMK2_take_dog_doll", task: "Airbot_MMK2_take_dog_doll", demos: 50 },
  { path: "AIRBOT_MMK2_take_down_paper_cup", task: "Airbot_MMK2_take_down_paper_cup", demos: 46 },
  { path: "AIRBOT_MMK2_take_down_umbrella_and_mineral_water", task: "Airbot_MMK2_take_down_umbrella_and_mineral_water", demos: 212 },
  { path: "Airbot_MMK2_take_drink", task: "Airbot_MMK2_take_drink", demos: 86 },
  { path: "Airbot_MMK2_take_egg", task: "Airbot_MMK2_take_egg", demos: 101 },
  { path: "Airbot_MMK2_take_electronics", task: "Airbot_MMK2_take_electronics", demos: 49 },
  { path: "Airbot_MMK2_take_part_both_hands", task: "Airbot_MMK2_take_part_both_hands", demos: 50 },
  { path: "AIRBOT_MMK2_take_the_book", task: "Airbot_MMK2_take_the_book", demos: 79 },
  { path: "Airbot_MMK2_take_tissues", task: "Airbot_MMK2_take_tissues", demos: 50 },
  { path: "Airbot_MMK2_take_toy_car", task: "Airbot_MMK2_take_toy_car", demos: 49 },
  { path: "AIRBOT_MMK2_the_cup_is_put_into_the_bucket", task: "Airbot_MMK2_the_cup_is_put_into_the_bucket", demos: 50 },
  { path: "AIRBOT_MMK2_toy_storage", task: "Airbot_MMK2_toy_storage", demos: 199 },
  { path: "Airbot_MMK2_turn_page", task: "Airbot_MMK2_turn_page", demos: 149 },
  { path: "Airbot_MMK2_unplug", task: "Airbot_MMK2_unplug", demos: 90 },
  { path: "Airbot_MMK2_unscrew_bottle_cap", task: "Airbot_MMK2_unscrew_bottle_cap", demos: 50 },
  { path: "Galaxea_R1_Lite_arrange_baai_then_brain", task: "Galaxea_R1_Lite_arrange_baai_then_brain", demos: 56 },
  { path: "R1_Lite_boil_water_in_a_kettle", task: "Galaxea_R1_Lite_boil_water_in_a_kettle", demos: 75 },
  { path: "R1_Lite_build_blocks", task: "Galaxea_R1_Lite_build_blocks", demos: 66 },
  { path: "R1_Lite_catch_the_water", task: "Galaxea_R1_Lite_catch_the_water", demos: 148 },
  { path: "Galaxea_R1_Lite_change_baai_into_brain", task: "Galaxea_R1_Lite_change_baai_into_brain", demos: 67 },
  { path: "Galaxea_R1_Lite_classify_object_five", task: "Galaxea_R1_Lite_classify_object_five", demos: 195 },
  { path: "Galaxea_R1_Lite_classify_object_four", task: "Galaxea_R1_Lite_classify_object_four", demos: 191 },
  { path: "Galaxea_R1_Lite_classify_object_green_tablecloth", task: "Galaxea_R1_Lite_classify_object_green_tablecloth", demos: 224 },
  { path: "Galaxea_R1_Lite_classify_object_six", task: "Galaxea_R1_Lite_classify_object_six", demos: 105 },
  { path: "Galaxea_R1_Lite_classify_object_three", task: "Galaxea_R1_Lite_classify_object_three", demos: 197 },
  { path: "R1_Lite_clean_the_floor", task: "Galaxea_R1_Lite_clean_the_floor", demos: 87 },
  { path: "R1_Lite_clean_the_sink", task: "Galaxea_R1_Lite_clean_the_sink", demos: 120 },
  { path: "R1_Lite_clean_toilet", task: "Galaxea_R1_Lite_clean_toilet", demos: 99 },
  { path: "R1_Lite_connect_the_router_cable", task: "Galaxea_R1_Lite_connect_the_router_cable", demos: 105 },
  { path: "R1_Lite_cook_a_meal", task: "Galaxea_R1_Lite_cook_a_meal", demos: 82 },
  { path: "R1_Lite_cover_the_pot_lid", task: "Galaxea_R1_Lite_cover_the_pot_lid", demos: 100 },
  { path: "R1_Lite_dispose_of_leftover_food", task: "Galaxea_R1_Lite_dispose_of_leftover_food", demos: 127 },
  { path: "R1_Lite_drawer_storage_hair_dryer", task: "Galaxea_R1_Lite_drawer_storage_hair_dryer", demos: 145 },
  { path: "R1_Lite_fold_clothes", task: "Galaxea_R1_Lite_fold_clothes", demos: 111 },
  { path: "Galaxea_R1_Lite_fold_towel_twice", task: "Galaxea_R1_Lite_fold_towel_twice", demos: 46 },
  { path: "R1_Lite_garbage_disposal", task: "Galaxea_R1_Lite_garbage_disposal", demos: 81 },
  { path: "R1_Lite_hang_clothes", task: "Galaxea_R1_Lite_hang_clothes", demos: 109 },
  { path: "R1_Lite_make_a_landline_call", task: "Galaxea_R1_Lite_make_a_landline_call", demos: 115 },
  { path: "R1_Lite_make_breakfast", task: "Galaxea_R1_Lite_make_breakfast", demos: 45 },
  { path: "R1_Lite_make_tea", task: "Galaxea_R1_Lite_make_tea", demos: 101 },
  { path: "R1_Lite_make_the_bed", task: "Galaxea_R1_Lite_make_the_bed", demos: 100 },
  { path: "Galaxea_R1_Lite_mix_blue_yellow_large_test_tube", task: "Galaxea_R1_Lite_mix_blue_yellow_large_test_tube", demos: 51 },
  { path: "Galaxea_R1_Lite_mix_blue_yellow_left_large_test_tube", task: "Galaxea_R1_Lite_mix_blue_yellow_left_large_test_tube", demos: 50 },
  { path: "Galaxea_R1_Lite_mix_blue_yellow_left_small_test_tube", task: "Galaxea_R1_Lite_mix_blue_yellow_left_small_test_tube", demos: 50 },
  { path: "Galaxea_R1_Lite_mix_blue_yellow_right", task: "Galaxea_R1_Lite_mix_blue_yellow_right", demos: 50 },
  { path: "Galaxea_R1_Lite_mix_color", task: "Galaxea_R1_Lite_mix_color", demos: 50 },
  { path: "Galaxea_R1_Lite_mix_color_large_test_tube", task: "Galaxea_R1_Lite_mix_color_large_test_tube", demos: 121 },
  { path: "Galaxea_R1_Lite_mix_color_small_test_tube", task: "Galaxea_R1_Lite_mix_color_small_test_tube", demos: 203 },
  { path: "Galaxea_R1_Lite_mix_red_blue_large_test_tube", task: "Galaxea_R1_Lite_mix_red_blue_large_test_tube", demos: 50 },
  { path: "Galaxea_R1_Lite_mix_red_blue_left_large_test_tube", task: "Galaxea_R1_Lite_mix_red_blue_left_large_test_tube", demos: 50 },
  { path: "Galaxea_R1_Lite_mix_red_blue_right", task: "Galaxea_R1_Lite_mix_red_blue_right", demos: 50 },
  { path: "Galaxea_R1_Lite_mix_red_yellow_large_test_tube", task: "Galaxea_R1_Lite_mix_red_yellow_large_test_tube", demos: 50 },
  { path: "Galaxea_R1_Lite_mix_red_yellow_left_large_test_tube", task: "Galaxea_R1_Lite_mix_red_yellow_left_large_test_tube", demos: 100 },
  { path: "Galaxea_R1_Lite_mix_red_yellow_right", task: "Galaxea_R1_Lite_mix_red_yellow_right", demos: 99 },
  { path: "Galaxea_R1_Lite_move_mouse", task: "Galaxea_R1_Lite_move_mouse", demos: 30 },
  { path: "R1_Lite_move_the_position_of_the_apple", task: "Galaxea_R1_Lite_move_the_position_of_the_apple", demos: 35 },
  { path: "R1_Lite_move_the_position_of_the_black_marker", task: "Galaxea_R1_Lite_move_the_position_of_the_black_marker", demos: 61 },
  { path: "R1_Lite_move_the_position_of_the_brush", task: "Galaxea_R1_Lite_move_the_position_of_the_brush", demos: 63 },
  { path: "R1_Lite_move_the_position_of_the_coffee_capsule", task: "Galaxea_R1_Lite_move_the_position_of_the_coffee_capsule", demos: 58 },
  { path: "R1_Lite_move_the_position_of_the_cookie", task: "Galaxea_R1_Lite_move_the_position_of_the_cookie", demos: 25 },
  { path: "R1_Lite_move_the_position_of_the_duck", task: "Galaxea_R1_Lite_move_the_position_of_the_duck", demos: 40 },
  { path: "R1_Lite_move_the_position_of_the_glass", task: "Galaxea_R1_Lite_move_the_position_of_the_glass", demos: 36 },
  { path: "R1_Lite_move_the_position_of_the_long_bread", task: "Galaxea_R1_Lite_move_the_position_of_the_long_bread", demos: 31 },
  { path: "R1_Lite_move_the_position_of_the_milk", task: "Galaxea_R1_Lite_move_the_position_of_the_milk", demos: 59 },
  { path: "R1_Lite_move_the_position_of_the_orange", task: "Galaxea_R1_Lite_move_the_position_of_the_orange", demos: 42 },
  { path: "R1_Lite_move_the_position_of_the_peeler", task: "Galaxea_R1_Lite_move_the_position_of_the_peeler", demos: 43 },
  { path: "R1_Lite_move_the_position_of_the_pen", task: "Galaxea_R1_Lite_move_the_position_of_the_pen", demos: 31 },
  { path: "R1_Lite_move_the_position_of_the_rubiks_cube", task: "Galaxea_R1_Lite_move_the_position_of_the_rubiks_cube", demos: 44 },
  { path: "R1_Lite_move_the_position_of_the_soda", task: "Galaxea_R1_Lite_move_the_position_of_the_soda", demos: 62 },
  { path: "R1_Lite_move_the_position_of_the_spoon", task: "Galaxea_R1_Lite_move_the_position_of_the_spoon", demos: 23 },
  { path: "R1_Lite_move_the_position_of_the_triangle_bread", task: "Galaxea_R1_Lite_move_the_position_of_the_triangle_bread", demos: 40 },
  { path: "R1_Lite_open_and_close_curtains", task: "Galaxea_R1_Lite_open_and_close_curtains", demos: 98 },
  { path: "R1_Lite_open_and_close_microwave_oven", task: "Galaxea_R1_Lite_open_and_close_microwave_oven", demos: 117 },
  { path: "R1_Lite_open_and_close_nightstand_door", task: "Galaxea_R1_Lite_open_and_close_nightstand_door", demos: 100 },
  { path: "R1_Lite_open_and_close_nightstand_drawer", task: "Galaxea_R1_Lite_open_and_close_nightstand_drawer", demos: 77 },
  { path: "R1_Lite_open_and_close_the_freezer_door", task: "Galaxea_R1_Lite_open_and_close_the_freezer_door", demos: 93 },
  { path: "R1_Lite_open_the_food_pan", task: "Galaxea_R1_Lite_open_the_food_pan", demos: 94 },
  { path: "R1_Lite_opening_and_closing_aalcony_sliding_doors", task: "Galaxea_R1_Lite_opening_and_closing_aalcony_sliding_doors", demos: 101 },
  { path: "R1_Lite_peach_storage", task: "Galaxea_R1_Lite_peach_storage", demos: 110 },
  { path: "R1_Lite_pick_up_and_store_items", task: "Galaxea_R1_Lite_pick_up_and_store_items", demos: 108 },
  { path: "R1_Lite_place_the_dress_shirt_on_the_hanger", task: "Galaxea_R1_Lite_place_the_dress_shirt_on_the_hanger", demos: 103 },
  { path: "R1_Lite_plug_the_socket", task: "Galaxea_R1_Lite_plug_the_socket", demos: 96 },
  { path: "Galaxea_R1_Lite_pour_liquid_mrable_bar_counter", task: "Galaxea_R1_Lite_pour_liquid_mrable_bar_counter", demos: 100 },
  { path: "Galaxea_R1_Lite_pour_powder", task: "Galaxea_R1_Lite_pour_powder", demos: 30 },
  { path: "Galaxea_R1_Lite_pour_powder_marble_bar_counter", task: "Galaxea_R1_Lite_pour_powder_marble_bar_counter", demos: 100 },
  { path: "Galaxea_R1_Lite_pour_solid", task: "Galaxea_R1_Lite_pour_solid", demos: 39 },
  { path: "Galaxea_R1_Lite_pour_solid_marble_bar_counter", task: "Galaxea_R1_Lite_pour_solid_marble_bar_counter", demos: 85 },
  { path: "Galaxea_R1_Lite_pour_water", task: "Galaxea_R1_Lite_pour_water (Galaxea_R1_Lite_pour_water)", demos: 100 },
  { path: "R1_Lite_pour_water", task: "Galaxea_R1_Lite_pour_water (R1_Lite_pour_water)", demos: 51 },
  { path: "Galaxea_R1_Lite_pour_water_black_tablecloth", task: "Galaxea_R1_Lite_pour_water_black_tablecloth", demos: 98 },
  { path: "R1_Lite_put_on_a_garbage_bag", task: "Galaxea_R1_Lite_put_on_a_garbage_bag", demos: 133 },
  { path: "R1_Lite_put_slippers_into_floor_standing_shoe_cabinet", task: "Galaxea_R1_Lite_put_slippers_into_floor_standing_shoe_cabinet", demos: 107 },
  { path: "R1_Lite_put_the_pillow_on_the_bed", task: "Galaxea_R1_Lite_put_the_pillow_on_the_bed", demos: 48 },
  { path: "R1_Lite_put_the_shoes_into_the_shoe_box", task: "Galaxea_R1_Lite_put_the_shoes_into_the_shoe_box", demos: 106 },
  { path: "R1_Lite_put_the_tableware_into_the_cupboard", task: "Galaxea_R1_Lite_put_the_tableware_into_the_cupboard", demos: 143 },
  { path: "R1_Lite_sliding_chair", task: "Galaxea_R1_Lite_sliding_chair", demos: 87 },
  { path: "R1_Lite_stack_baskets", task: "Galaxea_R1_Lite_stack_baskets", demos: 101 },
  { path: "Galaxea_R1_Lite_storage_object_blue_plate", task: "Galaxea_R1_Lite_storage_object_blue_plate", demos: 102 },
  { path: "Galaxea_R1_Lite_storage_object_brown_basket", task: "Galaxea_R1_Lite_storage_object_brown_basket", demos: 102 },
  { path: "Galaxea_R1_Lite_storage_object_brown_bowl", task: "Galaxea_R1_Lite_storage_object_brown_bowl", demos: 101 },
  { path: "Galaxea_R1_Lite_storage_object_brown_plate", task: "Galaxea_R1_Lite_storage_object_brown_plate", demos: 102 },
  { path: "Galaxea_R1_Lite_storage_object_dish", task: "Galaxea_R1_Lite_storage_object_dish", demos: 101 },
  { path: "Galaxea_R1_Lite_storage_object_gray_plate", task: "Galaxea_R1_Lite_storage_object_gray_plate", demos: 102 },
  { path: "Galaxea_R1_Lite_storage_object_pink_bowl", task: "Galaxea_R1_Lite_storage_object_pink_bowl", demos: 102 },
  { path: "Galaxea_R1_Lite_storage_object_white_box", task: "Galaxea_R1_Lite_storage_object_white_box", demos: 102 },
  { path: "Galaxea_R1_Lite_storage_object_yellow_basket", task: "Galaxea_R1_Lite_storage_object_yellow_basket", demos: 102 },
  { path: "R1_Lite_storage_of_toiletries", task: "Galaxea_R1_Lite_storage_of_toiletries", demos: 101 },
  { path: "R1_Lite_switch_labels", task: "Galaxea_R1_Lite_switch_labels", demos: 99 },
  { path: "R1_Lite_switch_on_and_off_the_central_air_conditioning", task: "Galaxea_R1_Lite_switch_on_and_off_the_central_air_conditioning", demos: 35 },
  { path: "R1_Lite_tableware_arrangement", task: "Galaxea_R1_Lite_tableware_arrangement", demos: 8 },
  { path: "R1_Lite_tableware_cleaning", task: "Galaxea_R1_Lite_tableware_cleaning", demos: 102 },
  { path: "R1_Lite_take_and_place_the_portable_power_bank", task: "Galaxea_R1_Lite_take_and_place_the_portable_power_bank", demos: 110 },
  { path: "R1_Lite_take_and_put_away_garden_stuff", task: "Galaxea_R1_Lite_take_and_put_away_garden_stuff", demos: 53 },
  { path: "R1_Lite_take_and_put_away_garden_stuff_a", task: "Galaxea_R1_Lite_take_and_put_away_garden_stuff_a", demos: 148 },
  { path: "R1_Lite_take_and_put_away_items", task: "Galaxea_R1_Lite_take_and_put_away_items", demos: 112 },
  { path: "R1_Lite_take_and_put_the_bowl", task: "Galaxea_R1_Lite_take_and_put_the_bowl", demos: 94 },
  { path: "R1_Lite_take_clothes_out_of_the_washing_machine", task: "Galaxea_R1_Lite_take_clothes_out_of_the_washing_machine", demos: 114 },
  { path: "R1_Lite_take_or_store_plates", task: "Galaxea_R1_Lite_take_or_store_plates", demos: 105 },
  { path: "R1_Lite_tea_service_table_setting", task: "Galaxea_R1_Lite_tea_service_table_setting", demos: 109 },
  { path: "R1_Lite_throw_out_the_trash", task: "Galaxea_R1_Lite_throw_out_the_trash", demos: 109 },
  { path: "R1_Lite_tidy_up_toiletries", task: "Galaxea_R1_Lite_tidy_up_toiletries", demos: 115 },
  { path: "Galaxea_R1_Lite_toggle_drawer_red", task: "Galaxea_R1_Lite_toggle_drawer_red", demos: 100 },
  { path: "Galaxea_R1_Lite_toggle_drawer_yellow", task: "Galaxea_R1_Lite_toggle_drawer_yellow", demos: 97 },
  { path: "R1_Lite_wash_the_tableware", task: "Galaxea_R1_Lite_wash_the_tableware", demos: 137 },
  { path: "R1_Lite_washing_board", task: "Galaxea_R1_Lite_washing_board", demos: 97 },
  { path: "R1_Lite_wipe_the_table", task: "Galaxea_R1_Lite_wipe_the_table", demos: 107 },
  { path: "Galbot_g1_fold_clothe_b", task: "Galbot_G1_fold_clothe_b", demos: 213 },
  { path: "Galbot_g1_fold_clothe_c", task: "Galbot_G1_fold_clothe_c", demos: 666 },
  { path: "Galbot_g1_fold_clothe_e", task: "Galbot_G1_fold_clothe_e", demos: 865 },
  { path: "Galbot_g1_steamer_storage_baozi_a", task: "Galbot_G1_steamer_storage_baozi_a", demos: 266 },
  { path: "Galbot_g1_steamer_storage_baozi_b", task: "Galbot_G1_steamer_storage_baozi_b", demos: 430 },
  { path: "Galbot_g1_steamer_storage_baozi_c", task: "Galbot_G1_steamer_storage_baozi_c", demos: 207 },
  { path: "Galbot_g1_steamer_storage_baozi_d", task: "Galbot_G1_steamer_storage_baozi_d", demos: 969 },
  { path: "Galbot_g1_steamer_storage_baozi_e", task: "Galbot_G1_steamer_storage_baozi_e", demos: 607 },
  { path: "Galbot_g1_steamer_storage_baozi_f", task: "Galbot_G1_steamer_storage_baozi_f", demos: 96 },
  { path: "Galbot_g1_steamer_storage_baozi_g", task: "Galbot_G1_steamer_storage_baozi_g", demos: 89 },
  { path: "Galbot_g1_steamer_storage_baozi_h", task: "Galbot_G1_steamer_storage_baozi_h", demos: 996 },
  { path: "Galbot_g1_steamer_storage_baozi_i", task: "Galbot_G1_steamer_storage_baozi_i", demos: 32 },
  { path: "Galbot_g1_steamer_storage_baozi_j", task: "Galbot_G1_steamer_storage_baozi_j", demos: 41 },
  { path: "leju_robot_box_storage_parcel", task: "Leju_Kuavo_4_box_storage_parcel", demos: 443 },
  { path: "leju_robot_box_storage_parcel_a", task: "Leju_Kuavo_4_box_storage_parcel_a", demos: 493 },
  { path: "leju_robot_box_storage_parcel_b", task: "Leju_Kuavo_4_box_storage_parcel_b", demos: 497 },
  { path: "leju_robot_box_storage_parcel_c", task: "Leju_Kuavo_4_box_storage_parcel_c", demos: 493 },
  { path: "leju_robot_box_storage_parcel_d", task: "Leju_Kuavo_4_box_storage_parcel_d", demos: 212 },
  { path: "leju_robot_box_storage_parcel_f", task: "Leju_Kuavo_4_box_storage_parcel_f", demos: 497 },
  { path: "leju_robot_box_storage_parcel_g", task: "Leju_Kuavo_4_box_storage_parcel_g", demos: 492 },
  { path: "leju_robot_box_storage_parcel_h", task: "Leju_Kuavo_4_box_storage_parcel_h", demos: 389 },
  { path: "leju_robot_box_storage_parcel_i", task: "Leju_Kuavo_4_box_storage_parcel_i", demos: 222 },
  { path: "leju_robot_box_storage_parcel_j", task: "Leju_Kuavo_4_box_storage_parcel_j", demos: 226 },
  { path: "leju_robot_hotel_services_a", task: "Leju_Kuavo_4_hotel_services_a", demos: 340 },
  { path: "leju_robot_hotel_services_aa", task: "Leju_Kuavo_4_hotel_services_aa", demos: 419 },
  { path: "leju_robot_hotel_services_ab", task: "Leju_Kuavo_4_hotel_services_ab", demos: 450 },
  { path: "leju_robot_hotel_services_ac", task: "Leju_Kuavo_4_hotel_services_ac", demos: 431 },
  { path: "leju_robot_hotel_services_ad", task: "Leju_Kuavo_4_hotel_services_ad", demos: 430 },
  { path: "leju_robot_hotel_services_ae", task: "Leju_Kuavo_4_hotel_services_ae", demos: 449 },
  { path: "leju_robot_hotel_services_af", task: "Leju_Kuavo_4_hotel_services_af", demos: 437 },
  { path: "leju_robot_hotel_services_ag", task: "Leju_Kuavo_4_hotel_services_ag", demos: 428 },
  { path: "leju_robot_hotel_services_ah", task: "Leju_Kuavo_4_hotel_services_ah", demos: 44 },
  { path: "leju_robot_hotel_services_b", task: "Leju_Kuavo_4_hotel_services_b", demos: 288 },
  { path: "leju_robot_hotel_services_c", task: "Leju_Kuavo_4_hotel_services_c", demos: 334 },
  { path: "leju_robot_hotel_services_d", task: "Leju_Kuavo_4_hotel_services_d", demos: 324 },
  { path: "leju_robot_hotel_services_e", task: "Leju_Kuavo_4_hotel_services_e", demos: 309 },
  { path: "leju_robot_hotel_services_f", task: "Leju_Kuavo_4_hotel_services_f", demos: 135 },
  { path: "leju_robot_hotel_services_h", task: "Leju_Kuavo_4_hotel_services_h", demos: 205 },
  { path: "leju_robot_hotel_services_i", task: "Leju_Kuavo_4_hotel_services_i", demos: 189 },
  { path: "leju_robot_moving_parts_a", task: "Leju_Kuavo_4_moving_parts_a", demos: 380 },
  { path: "leju_robot_moving_parts_b", task: "Leju_Kuavo_4_moving_parts_b", demos: 490 },
  { path: "leju_robot_moving_parts_c", task: "Leju_Kuavo_4_moving_parts_c", demos: 490 },
  { path: "leju_robot_moving_parts_f", task: "Leju_Kuavo_4_moving_parts_f", demos: 489 },
  { path: "leju_robot_moving_parts_g", task: "Leju_Kuavo_4_moving_parts_g", demos: 157 },
  { path: "leju_robot_moving_parts_h", task: "Leju_Kuavo_4_moving_parts_h", demos: 162 },
  { path: "leju_robot_moving_parts_i", task: "Leju_Kuavo_4_moving_parts_i", demos: 155 },
  { path: "leju_robot_moving_parts_j", task: "Leju_Kuavo_4_moving_parts_j", demos: 153 },
  { path: "leju_robot_moving_parts_k", task: "Leju_Kuavo_4_moving_parts_k", demos: 329 },
  { path: "leju_robot_moving_parts_m", task: "Leju_Kuavo_4_moving_parts_m", demos: 490 },
  { path: "leju_robot_moving_parts_n", task: "Leju_Kuavo_4_moving_parts_n", demos: 492 },
  { path: "leju_robot_moving_parts_o", task: "Leju_Kuavo_4_moving_parts_o", demos: 490 },
  { path: "leju_robot_moving_parts_q", task: "Leju_Kuavo_4_moving_parts_q", demos: 494 },
  { path: "leju_robot_moving_parts_r", task: "Leju_Kuavo_4_moving_parts_r", demos: 495 },
  { path: "leju_robot_moving_parts_s", task: "Leju_Kuavo_4_moving_parts_s", demos: 495 },
  { path: "leju_robot_moving_parts_t", task: "Leju_Kuavo_4_moving_parts_t", demos: 493 },
  { path: "leju_robot_moving_parts_u", task: "Leju_Kuavo_4_moving_parts_u", demos: 100 },
  { path: "leju_robot_part_placement", task: "Leju_Kuavo_4_part_placement", demos: 538 },
  { path: "leju_robot_pass_the_cleaner_a", task: "Leju_Kuavo_4_pass_the_cleaner_a", demos: 457 },
  { path: "leju_robot_pass_the_cleaner_b", task: "Leju_Kuavo_4_pass_the_cleaner_b", demos: 441 },
  { path: "leju_robot_pass_the_cleaner_c", task: "Leju_Kuavo_4_pass_the_cleaner_c", demos: 444 },
  { path: "leju_robot_pass_the_cleaner_d", task: "Leju_Kuavo_4_pass_the_cleaner_d", demos: 451 },
  { path: "leju_robot_pass_the_cleaner_e", task: "Leju_Kuavo_4_pass_the_cleaner_e", demos: 430 },
  { path: "Realman_RMC-AIDA-L_arrange_flowers", task: "Realman_RMC-AIDA-L_arrange_flowers", demos: 60 },
  { path: "RMC-AIDA-L_basket_storage_banana", task: "Realman_RMC-AIDA-L_basket_storage_banana", demos: 654 },
  { path: "RMC-AIDA-L_basket_storage_egg_yolk_pastry", task: "Realman_RMC-AIDA-L_basket_storage_egg_yolk_pastry", demos: 727 },
  { path: "RMC-AIDA-L_basket_storage_long_bread", task: "Realman_RMC-AIDA-L_basket_storage_long_bread", demos: 753 },
  { path: "RMC-AIDA-L_basket_storage_orange", task: "Realman_RMC-AIDA-L_basket_storage_orange", demos: 356 },
  { path: "RMC-AIDA-L_basket_storage_peach", task: "Realman_RMC-AIDA-L_basket_storage_peach", demos: 721 },
  { path: "RMC-AIDA-L_box_up_down", task: "Realman_RMC-AIDA-L_box_up_down", demos: 159 },
  { path: "RMC-AIDA-L_clean_table", task: "Realman_RMC-AIDA-L_clean_table", demos: 776 },
  { path: "RMC-AIDA-L_desktop_organization", task: "Realman_RMC-AIDA-L_desktop_organization", demos: 1660 },
  { path: "RMC-AIDA-L_fold_shirt", task: "Realman_RMC-AIDA-L_fold_shirt", demos: 1487 },
  { path: "RMC-AIDA-L_fold_shorts", task: "Realman_RMC-AIDA-L_fold_shorts", demos: 866 },
  { path: "Realman_RMC-AIDA-L_fold_towel", task: "Realman_RMC-AIDA-L_fold_towel (Realman_RMC-AIDA-L_fold_towel)", demos: 120 },
  { path: "RMC-AIDA-L_fold_towel", task: "Realman_RMC-AIDA-L_fold_towel (RMC-AIDA-L_fold_towel)", demos: 314 },
  { path: "RMC-AIDA-L_food_packaging", task: "Realman_RMC-AIDA-L_food_packaging", demos: 497 },
  { path: "RMC-AIDA-L_food_storage", task: "Realman_RMC-AIDA-L_food_storage", demos: 499 },
  { path: "RMC-AIDA-L_fruit_storage", task: "Realman_RMC-AIDA-L_fruit_storage", demos: 521 },
  { path: "RMC-AIDA-L_get_water", task: "Realman_RMC-AIDA-L_get_water", demos: 333 },
  { path: "RMC-AIDA-L_glasses_storage", task: "Realman_RMC-AIDA-L_glasses_storage", demos: 990 },
  { path: "Realman_RMC-AIDA-L_hang_clothes", task: "Realman_RMC-AIDA-L_hang_clothes", demos: 50 },
  { path: "RMC-AIDA-L_organise_the_document_bag", task: "Realman_RMC-AIDA-L_organise_the_document_bag", demos: 480 },
  { path: "Realman_RMC-AIDA-L_pass_bowl", task: "Realman_RMC-AIDA-L_pass_bowl", demos: 57 },
  { path: "RMC-AIDA-L_place_test_tube", task: "Realman_RMC-AIDA-L_place_test_tube", demos: 648 },
  { path: "RMC-AIDA-L_place_the_fruits_repeatedly", task: "Realman_RMC-AIDA-L_place_the_fruits_repeatedly", demos: 481 },
  { path: "RMC-AIDA-L_place_towel", task: "Realman_RMC-AIDA-L_place_towel", demos: 398 },
  { path: "RMC-AIDA-L_plate_storage", task: "Realman_RMC-AIDA-L_plate_storage", demos: 498 },
  { path: "RMC-AIDA-L_pour_coffee_beans", task: "Realman_RMC-AIDA-L_pour_coffee_beans", demos: 493 },
  { path: "RMC-AIDA-L_pour_rice", task: "Realman_RMC-AIDA-L_pour_rice", demos: 714 },
  { path: "RMC-AIDA-L_pour_tea", task: "Realman_RMC-AIDA-L_pour_tea", demos: 790 },
  { path: "RMC-AIDA-L_pull_open_bag", task: "Realman_RMC-AIDA-L_pull_open_bag", demos: 1396 },
  { path: "RMC-AIDA-L_stack_baskets", task: "Realman_RMC-AIDA-L_stack_baskets", demos: 484 },
  { path: "RMC-AIDA-L_stir_coffee", task: "Realman_RMC-AIDA-L_stir_coffee", demos: 767 },
  { path: "RMC-AIDA-L_storage_bin_storage", task: "Realman_RMC-AIDA-L_storage_bin_storage", demos: 302 },
  { path: "Realman_RMC-AIDA-L_storage_block_basket", task: "Realman_RMC-AIDA-L_storage_block_basket", demos: 50 },
  { path: "Realman_RMC-AIDA-L_storage_peach_box", task: "Realman_RMC-AIDA-L_storage_peach_box", demos: 118 },
  { path: "Realman_RMC-AIDA-L_storage_peach_drawer", task: "Realman_RMC-AIDA-L_storage_peach_drawer", demos: 120 },
  { path: "Realman_RMC-AIDA-L_storage_towel_basket", task: "Realman_RMC-AIDA-L_storage_towel_basket", demos: 118 },
  { path: "Tianqin_A2_box_storage_part", task: "Tianqing_A2_box_storage_part", demos: 1104 },
  { path: "Tianqin_A2_container_storage_graphics_card", task: "Tianqing_A2_container_storage_graphics_card", demos: 280 },
  { path: "Tianqin_A2_place_the_paper_box", task: "Tianqing_A2_place_the_paper_box", demos: 236 },
  { path: "G1edu-u3_basket_storage_apple", task: "Unitree_G1edu-u3_basket_storage_apple", demos: 88 },
  { path: "G1edu-u3_basket_storage_apple_b", task: "Unitree_G1edu-u3_basket_storage_apple_b", demos: 241 },
  { path: "G1edu-u3_bowl_storage_grape_singletry", task: "Unitree_G1edu-u3_bowl_storage_grape_singletry", demos: 242 },
  { path: "G1edu-u3_food_storage", task: "Unitree_G1edu-u3_food_storage", demos: 190 },
  { path: "G1edu-u3_little_tray_storage_apple_b", task: "Unitree_G1edu-u3_little_tray_storage_apple_b", demos: 15 },
  { path: "G1edu-u3_little_tray_storage_lemon_b", task: "Unitree_G1edu-u3_little_tray_storage_lemon_b", demos: 14 },
  { path: "G1edu-u3_pick_apple_a", task: "Unitree_G1edu-u3_pick_apple_a", demos: 40 },
  { path: "G1edu-u3_pick_apple_b", task: "Unitree_G1edu-u3_pick_apple_b", demos: 26 },
  { path: "G1edu-u3_pick_crumpled_paper_aa", task: "Unitree_G1edu-u3_pick_crumpled_paper_aa", demos: 13 },
  { path: "G1edu-u3_pick_cup_a", task: "Unitree_G1edu-u3_pick_cup_a", demos: 24 },
  { path: "G1edu-u3_pick_empty_bottle_ab", task: "Unitree_G1edu-u3_pick_empty_bottle_ab", demos: 11 },
  { path: "G1edu-u3_pick_leftover_food_ac", task: "Unitree_G1edu-u3_pick_leftover_food_ac", demos: 14 },
  { path: "G1edu-u3_pick_metal_bowl_aa", task: "Unitree_G1edu-u3_pick_metal_bowl_aa", demos: 35 },
  { path: "G1edu-u3_pick_metal_bowl_ab", task: "Unitree_G1edu-u3_pick_metal_bowl_ab", demos: 36 },
  { path: "G1edu-u3_pick_plastic_bowl_ac", task: "Unitree_G1edu-u3_pick_plastic_bowl_ac", demos: 32 },
  { path: "G1edu-u3_pick_plastic_bowl_ad", task: "Unitree_G1edu-u3_pick_plastic_bowl_ad", demos: 32 },
  { path: "G1edu-u3_pick_up_the_bottled_water_a", task: "Unitree_G1edu-u3_pick_up_the_bottled_water_a", demos: 29 },
  { path: "G1edu-u3_pick_up_the_bottled_water_as", task: "Unitree_G1edu-u3_pick_up_the_bottled_water_as", demos: 24 },
  { path: "G1edu-u3_pick_up_the_bottled_water_b", task: "Unitree_G1edu-u3_pick_up_the_bottled_water_b", demos: 30 },
  { path: "G1edu-u3_pick_up_the_bread_az", task: "Unitree_G1edu-u3_pick_up_the_bread_az", demos: 26 },
  { path: "G1edu-u3_pick_up_the_lemon_a", task: "Unitree_G1edu-u3_pick_up_the_lemon_a", demos: 23 },
  { path: "G1edu-u3_pick_up_the_lemon_at", task: "Unitree_G1edu-u3_pick_up_the_lemon_at", demos: 26 },
  { path: "G1edu-u3_pick_up_the_tissue_box_ao", task: "Unitree_G1edu-u3_pick_up_the_tissue_box_ao", demos: 29 },
  { path: "G1edu-u3_pick_up_the_toy_ai", task: "Unitree_G1edu-u3_pick_up_the_toy_ai", demos: 10 },
  { path: "G1edu-u3_place_apple_c", task: "Unitree_G1edu-u3_place_apple_c", demos: 29 },
  { path: "G1edu-u3_place_bottle_c", task: "Unitree_G1edu-u3_place_bottle_c", demos: 29 },
  { path: "G1edu-u3_place_metal_bowl_ae", task: "Unitree_G1edu-u3_place_metal_bowl_ae", demos: 38 },
  { path: "G1edu-u3_place_metal_bowl_af", task: "Unitree_G1edu-u3_place_metal_bowl_af", demos: 38 },
  { path: "G1edu-u3_place_plastic_bowl_ag", task: "Unitree_G1edu-u3_place_plastic_bowl_ag", demos: 38 },
  { path: "G1edu-u3_place_plastic_bowl_ah", task: "Unitree_G1edu-u3_place_plastic_bowl_ah", demos: 33 },
  { path: "G1edu-u3_plate_storage_doll", task: "Unitree_G1edu-u3_plate_storage_doll", demos: 388 },
  { path: "G1edu-u3_plate_storage_rabbit_doll", task: "Unitree_G1edu-u3_plate_storage_rabbit_doll", demos: 227 },
  { path: "G1edu-u3_pullBowl_storage_bread_b", task: "Unitree_G1edu-u3_pullBowl__storage2bread_unordered", demos: 186 },
  { path: "G1edu-u3_pullBowl_storage_bread_a", task: "Unitree_G1edu-u3_pullBowl_storage_bread_a", demos: 178 },
  { path: "G1edu-u3_pullBowl_storage_bread_unordered_a", task: "Unitree_G1edu-u3_pullBowl_storage_bread_unordered_a", demos: 188 },
  { path: "G1edu-u3_pullBowl_storage_bread_unordered_b", task: "Unitree_G1edu-u3_pullBowl_storage_bread_unordered_b", demos: 190 },
  { path: "G1edu-u3_pullBowl_storage_bread_unordered_C", task: "Unitree_G1edu-u3_pullBowl_storage_bread_unordered_C", demos: 190 },
  { path: "G1edu-u3_put_the_bread_aw", task: "Unitree_G1edu-u3_put_the_bread_aw", demos: 26 },
  { path: "G1edu-u3_put_the_cup_b", task: "Unitree_G1edu-u3_put_the_cup_b", demos: 29 },
  { path: "G1edu-u3_put_the_lemon_af", task: "Unitree_G1edu-u3_put_the_lemon_af", demos: 19 },
  { path: "G1edu-u3_put_the_lemon_on_the_plate_ah", task: "Unitree_G1edu-u3_put_the_lemon_on_the_plate_ah", demos: 9 },
  { path: "G1edu-u3_put_the_tissue_box_al", task: "Unitree_G1edu-u3_put_the_tissue_box_al", demos: 39 },
  { path: "G1edu-u3_put_the_toy_ap", task: "Unitree_G1edu-u3_put_the_toy_ap", demos: 9 },
  { path: "G1edu-u3_put_the_water_bottle_aq", task: "Unitree_G1edu-u3_put_the_water_bottle_aq", demos: 21 },
  { path: "G1edu-u3_put_the_water_bottle_on_the_table_d", task: "Unitree_G1edu-u3_put_the_water_bottle_on_the_table_d", demos: 32 },
  { path: "G1edu-u3_stack_bowls", task: "Unitree_G1edu-u3_stack_bowls", demos: 261 },
  { path: "G1edu-u3_tray_storage_lemon_a", task: "Unitree_G1edu-u3_tray_storage_lemon_a", demos: 13 },
];

const roboCoinDataManagerOnlyPaths = new Set([
  "Agilex_Cobot_Magic_Agilex_Split_Aloha_organize_desk_fail",
  "Agilex_Cobot_Magic_fold_T-shirts",
  "Agilex_Cobot_Magic_fold_jeans_shorts_children's",
  "Agilex_Cobot_Magic_sweep_coffee_beans",
  "Airbot_MMK2_stack_bowl",
  "Airbot_MMK2_storage_bell_pepper_bowl",
  "Airbot_MMK2_storage_cup_rubik's_cube",
  "Airbot_MMK2_storage_mango_pomegranate",
  "Airbot_MMK2_storage_potato_left",
  "Airbot_MMK2_storage_potato_pumpkin",
  "Airbot_MMK2_storage_pumpkin_left",
  "Airbot_MMK2_storage_pumpkin_right",
  "Airbot_MMK2_storage_spoon",
  "Galaxea_R1_Lite_arrange_baai_then_brain",
  "Galaxea_R1_Lite_classify_object_green_tablecloth",
  "Galaxea_R1_Lite_fold_towel_twice",
  "Galaxea_R1_Lite_mix_blue_yellow_large_test_tube",
  "Galaxea_R1_Lite_mix_blue_yellow_right",
  "Galaxea_R1_Lite_mix_color",
  "Galaxea_R1_Lite_mix_red_blue_large_test_tube",
  "Galaxea_R1_Lite_mix_red_blue_left_large_test_tube",
  "Galaxea_R1_Lite_mix_red_blue_right",
  "Galaxea_R1_Lite_mix_red_yellow_large_test_tube",
  "Galaxea_R1_Lite_mix_red_yellow_left_large_test_tube",
  "Galaxea_R1_Lite_mix_red_yellow_right",
  "Galaxea_R1_Lite_move_mouse",
  "Galaxea_R1_Lite_pour_liquid_mrable_bar_counter",
  "Galaxea_R1_Lite_pour_powder",
  "Galaxea_R1_Lite_pour_powder_marble_bar_counter",
  "Galaxea_R1_Lite_pour_solid",
  "Galaxea_R1_Lite_pour_water",
  "Galaxea_R1_Lite_pour_water_black_tablecloth",
  "Galaxea_R1_Lite_toggle_drawer_red",
  "Galaxea_R1_Lite_toggle_drawer_yellow",
  "Realman_RMC-AIDA-L_arrange_flowers",
  "Realman_RMC-AIDA-L_fold_towel",
  "Realman_RMC-AIDA-L_hang_clothes",
  "Realman_RMC-AIDA-L_pass_bowl",
  "Realman_RMC-AIDA-L_storage_block_basket",
  "Realman_RMC-AIDA-L_storage_peach_box",
  "Realman_RMC-AIDA-L_storage_peach_drawer",
  "Realman_RMC-AIDA-L_storage_towel_basket",
  "agilex_cobot_magic_pass_object_left_to_right_black_tablecloth",
  "agilex_cobot_magic_pass_object_left_to_right_green_tablecloth",
  "agilex_cobot_magic_pass_object_left_to_right_khaki_tablecloth",
  "agilex_cobot_magic_pass_object_left_to_right_white_tablecloth",
  "agilex_cobot_magic_pass_object_right_to_left_black_tablecloth",
  "agilex_cobot_magic_pass_object_right_to_left_green_tablecloth",
  "agilex_cobot_magic_pass_object_right_to_left_khaki_tablecloth",
  "agilex_cobot_magic_pass_object_right_to_left_red_tablecloth",
  "agilex_cobot_magic_pass_object_right_to_left_white_tablecloth"
]);

const roboCoinDexterousHandPaths = new Set([
  "AIRBOT_MMK2_beauty_sponge_and_cake_to_place",
  "AIRBOT_MMK2_bowl_storage_pepper",
  "AIRBOT_MMK2_boxs_storage",
  "AIRBOT_MMK2_building_block_storage",
  "AIRBOT_MMK2_cake_storage",
  "AIRBOT_MMK2_chop_the_scallions",
  "AIRBOT_MMK2_clean_the_desktop",
  "AIRBOT_MMK2_clean_the_desktop_a",
  "Airbot_MMK2_click_pen",
  "Airbot_MMK2_close_door_left",
  "Airbot_MMK2_close_door_right",
  "Airbot_MMK2_close_doors",
  "Airbot_MMK2_close_drawer",
  "Airbot_MMK2_close_lid",
  "AIRBOT_MMK2_close_the_computer",
  "Airbot_MMK2_cover_lid",
  "AIRBOT_MMK2_cup_storage",
  "Airbot_MMK2_cut_scallion",
  "AIRBOT_MMK2_desktop_storage",
  "Airbot_MMK2_dial_number",
  "AIRBOT_MMK2_diamond_storage",
  "Airbot_MMK2_doodled_line",
  "AIRBOT_MMK2_double-sided_tape_placement",
  "AIRBOT_MMK2_egg_storage",
  "AIRBOT_MMK2_food_storage",
  "AIRBOT_MMK2_item_storage",
  "AIRBOT_MMK2_lemon_and_orange_storage",
  "AIRBOT_MMK2_medicine_bottle_storage",
  "AIRBOT_MMK2_mobile_calculator_box",
  "AIRBOT_MMK2_mobile_car",
  "AIRBOT_MMK2_mobile_phone_storage",
  "Airbot_MMK2_move_apple_orange_pomegranate",
  "Airbot_MMK2_move_block",
  "Airbot_MMK2_move_block_both_hands",
  "Airbot_MMK2_move_block_gold_bar_models",
  "Airbot_MMK2_move_block_twice",
  "Airbot_MMK2_move_block_wet_wipes",
  "Airbot_MMK2_move_book_front",
  "Airbot_MMK2_move_book_right_side",
  "Airbot_MMK2_move_bottle_tape_measure",
  "Airbot_MMK2_move_cake",
  "Airbot_MMK2_move_cake_tape_measure",
  "Airbot_MMK2_move_cup_paper_box",
  "Airbot_MMK2_move_fake_food",
  "Airbot_MMK2_move_medicine_bottle",
  "Airbot_MMK2_move_pan",
  "Airbot_MMK2_move_paper_box",
  "Airbot_MMK2_move_phone_twice",
  "Airbot_MMK2_move_sword_doll",
  "Airbot_MMK2_move_tennis_racket_ball",
  "Airbot_MMK2_move_tub",
  "Airbot_MMK2_move_umbrella_tissues",
  "Airbot_MMK2_open_door_left",
  "Airbot_MMK2_open_door_right",
  "Airbot_MMK2_open_laptop",
  "Airbot_MMK2_open_lid",
  "AIRBOT_MMK2_open_notebook",
  "AIRBOT_MMK2_organize_and_place_books",
  "AIRBOT_MMK2_organize_books",
  "Airbot_MMK2_organize_plate",
  "Airbot_MMK2_pass_paper_box",
  "Airbot_MMK2_pick_up_and_place_tub",
  "AIRBOT_MMK2_place_cookies_and_beer",
  "AIRBOT_MMK2_place_the_basin",
  "AIRBOT_MMK2_place_the_blue_and_purple_blocks",
  "AIRBOT_MMK2_place_the_books",
  "AIRBOT_MMK2_place_the_building_blocks",
  "AIRBOT_MMK2_place_the_cake",
  "AIRBOT_MMK2_place_the_glasses_case_and_gold_bars",
  "AIRBOT_MMK2_place_the_network_cable_and_mouse_box",
  "AIRBOT_MMK2_place_the_paper_drawer",
  "AIRBOT_MMK2_place_the_piano_and_the_needle-nose_pliers",
  "AIRBOT_MMK2_place_the_pliers_and_wallpaper_knife",
  "AIRBOT_MMK2_place_the_shark_toys_and_gold_bars",
  "AIRBOT_MMK2_place_the_small_bowl_of_canned_food",
  "AIRBOT_MMK2_place_the_sponge_and_wet_wipes",
  "AIRBOT_MMK2_place_the_umbrella_and_the_ruler",
  "AIRBOT_MMK2_place_the_yellow_block",
  "Airbot_MMK2_play_guitar",
  "AIRBOT_MMK2_play_the_guitar",
  "Airbot_MMK2_play_toy_piano",
  "AIRBOT_MMK2_potato_storage",
  "Airbot_MMK2_pour_BBs",
  "AIRBOT_MMK2_pour_out_the_beauty_blender",
  "Airbot_MMK2_prepare_tea",
  "Airbot_MMK2_pull_plunger",
  "AIRBOT_MMK2_pull_the_syringe_piston",
  "Airbot_MMK2_pull_tissue",
  "AIRBOT_MMK2_pumpkin_storage",
  "Airbot_MMK2_push_away_book",
  "AIRBOT_MMK2_push_building_blocks",
  "AIRBOT_MMK2_push_piston",
  "Airbot_MMK2_push_plunger",
  "Airbot_MMK2_push_toy_car",
  "Airbot_MMK2_remove_lid",
  "Airbot_MMK2_remove_pen_cap",
  "Airbot_MMK2_rotate_cube_face",
  "AIRBOT_MMK2_screw_the_bottle_cap",
  "Airbot_MMK2_slide_block",
  "Airbot_MMK2_slide_block_onto_post",
  "Airbot_MMK2_slide_tape_onto_can",
  "AIRBOT_MMK2_square_arrangement",
  "Airbot_MMK2_stack_block",
  "Airbot_MMK2_stack_cubic_block",
  "Airbot_MMK2_stack_cup",
  "AIRBOT_MMK2_stacking_blocks",
  "Airbot_MMK2_storage_and_take_cake_plate",
  "Airbot_MMK2_storage_apple_orange",
  "Airbot_MMK2_storage_badminton",
  "Airbot_MMK2_storage_bell_pepper",
  "Airbot_MMK2_storage_block",
  "Airbot_MMK2_storage_block_BBs",
  "Airbot_MMK2_storage_block_both_hands",
  "Airbot_MMK2_storage_block_tape_measure",
  "Airbot_MMK2_storage_book",
  "Airbot_MMK2_storage_bottle_part",
  "Airbot_MMK2_storage_bowl",
  "Airbot_MMK2_storage_bowl_wet_wipes",
  "AIRBOT_MMK2_storage_box_for_mouse_and_sponge",
  "Airbot_MMK2_storage_braised_pork_belly_shrimp",
  "Airbot_MMK2_storage_cake_both_hands",
  "Airbot_MMK2_storage_cake_box",
  "Airbot_MMK2_storage_cake_cup",
  "Airbot_MMK2_storage_cake_ice_cream",
  "Airbot_MMK2_storage_cake_pan",
  "Airbot_MMK2_storage_cake_plate",
  "AIRBOT_MMK2_storage_computer_box",
  "Airbot_MMK2_storage_cookie_cup",
  "Airbot_MMK2_storage_cookie_toy_car",
  "Airbot_MMK2_storage_cup",
  "Airbot_MMK2_storage_cup_plate",
  "Airbot_MMK2_storage_cup_rubik_s_cube",
  "Airbot_MMK2_storage_diamond_ring",
  "Airbot_MMK2_storage_egg_bowl",
  "Airbot_MMK2_storage_egg_plate",
  "Airbot_MMK2_storage_egg_white_box",
  "Airbot_MMK2_storage_egg_yellow_box",
  "Airbot_MMK2_storage_electronics_white_basket",
  "Airbot_MMK2_storage_electronics_yellow_baket",
  "AIRBOT_MMK2_storage_for_building_blocks_and_beauty_sponges",
  "Airbot_MMK2_storage_gold_bar_model_shark_doll",
  "Airbot_MMK2_storage_grape",
  "Airbot_MMK2_storage_hourglass",
  "Airbot_MMK2_storage_ice_cream",
  "AIRBOT_MMK2_storage_item",
  "Airbot_MMK2_storage_lemon_mango",
  "Airbot_MMK2_storage_milk_tissue",
  "Airbot_MMK2_storage_network_cable_paper_box",
  "Airbot_MMK2_storage_onion_sweet_potato",
  "Airbot_MMK2_storage_paper_box_sponge",
  "Airbot_MMK2_storage_peach_pear",
  "Airbot_MMK2_storage_penguin_doll_tiger_doll",
  "Airbot_MMK2_storage_pineapple",
  "AIRBOT_MMK2_storage_remote_control_clip_box_water_bottle",
  "AIRBOT_MMK2_storage_rubiks_cube_and_cup",
  "Airbot_MMK2_storage_shark_doll",
  "Airbot_MMK2_storage_sponge_wet_wipes",
  "AIRBOT_MMK2_storage_spoon",
  "Airbot_MMK2_storage_stationery_xylophone",
  "Airbot_MMK2_storage_tape_measure_umbrella",
  "AIRBOT_MMK2_storage_tissue_and_milk_carton",
  "AIRBOT_MMK2_storage_tissue_paper",
  "Airbot_MMK2_storage_tissues_tub",
  "Airbot_MMK2_storage_tomato_potato",
  "Airbot_MMK2_storage_tools",
  "AIRBOT_MMK2_storage_toy_cars_and_cookies",
  "Airbot_MMK2_storage_tumbler_umbrella",
  "AIRBOT_MMK2_storage_wet_tissue_and_building_block",
  "AIRBOT_MMK2_store_beauty_blender_and_building_blocks",
  "AIRBOT_MMK2_store_coffee_cups",
  "AIRBOT_MMK2_store_peaches_and_pears",
  "AIRBOT_MMK2_store_pomegranates_and_mangoes",
  "AIRBOT_MMK2_store_wet_wipes_and_bowls",
  "Airbot_MMK2_storge_cake_ice_cream",
  "Airbot_MMK2_swap_apple_cake_plate",
  "Airbot_MMK2_swap_bbs_block_plate",
  "Airbot_MMK2_swap_bbs_cake_plate",
  "Airbot_MMK2_swap_bottle_wet_wipes_plate",
  "Airbot_MMK2_swap_bread_cake_plate",
  "Airbot_MMK2_swap_cake_pumpkin_plate",
  "Airbot_MMK2_swap_cake_sponge_plate",
  "Airbot_MMK2_swap_sponge_paper_box_plate",
  "Airbot_MMK2_sweep_peaper",
  "Airbot_MMK2_take_BBs_block",
  "Airbot_MMK2_take_block",
  "Airbot_MMK2_take_block_both_hands",
  "Airbot_MMK2_take_book",
  "Airbot_MMK2_take_bottle_umbrella",
  "Airbot_MMK2_take_bowl_sponge",
  "Airbot_MMK2_take_cake_both_hands",
  "Airbot_MMK2_take_cup",
  "Airbot_MMK2_take_dog_doll",
  "AIRBOT_MMK2_take_down_paper_cup",
  "AIRBOT_MMK2_take_down_umbrella_and_mineral_water",
  "Airbot_MMK2_take_drink",
  "Airbot_MMK2_take_egg",
  "Airbot_MMK2_take_electronics",
  "Airbot_MMK2_take_part_both_hands",
  "AIRBOT_MMK2_take_the_book",
  "Airbot_MMK2_take_tissues",
  "Airbot_MMK2_take_toy_car",
  "AIRBOT_MMK2_the_cup_is_put_into_the_bucket",
  "AIRBOT_MMK2_toy_storage",
  "Airbot_MMK2_turn_page",
  "Airbot_MMK2_unplug",
  "Airbot_MMK2_unscrew_bottle_cap",
  "leju_robot_box_storage_parcel",
  "leju_robot_box_storage_parcel_a",
  "leju_robot_box_storage_parcel_b",
  "leju_robot_box_storage_parcel_c",
  "leju_robot_box_storage_parcel_d",
  "leju_robot_box_storage_parcel_f",
  "leju_robot_box_storage_parcel_g",
  "leju_robot_box_storage_parcel_h",
  "leju_robot_box_storage_parcel_i",
  "leju_robot_box_storage_parcel_j",
  "leju_robot_hotel_services_a",
  "leju_robot_hotel_services_aa",
  "leju_robot_hotel_services_ab",
  "leju_robot_hotel_services_ac",
  "leju_robot_hotel_services_ad",
  "leju_robot_hotel_services_ae",
  "leju_robot_hotel_services_af",
  "leju_robot_hotel_services_ag",
  "leju_robot_hotel_services_ah",
  "leju_robot_hotel_services_b",
  "leju_robot_hotel_services_c",
  "leju_robot_hotel_services_d",
  "leju_robot_hotel_services_e",
  "leju_robot_hotel_services_f",
  "leju_robot_hotel_services_h",
  "leju_robot_hotel_services_i",
  "leju_robot_moving_parts_a",
  "leju_robot_moving_parts_b",
  "leju_robot_moving_parts_c",
  "leju_robot_moving_parts_f",
  "leju_robot_moving_parts_g",
  "leju_robot_moving_parts_h",
  "leju_robot_moving_parts_i",
  "leju_robot_moving_parts_j",
  "leju_robot_moving_parts_k",
  "leju_robot_moving_parts_m",
  "leju_robot_moving_parts_n",
  "leju_robot_moving_parts_o",
  "leju_robot_moving_parts_q",
  "leju_robot_moving_parts_r",
  "leju_robot_moving_parts_s",
  "leju_robot_moving_parts_t",
  "leju_robot_moving_parts_u",
  "leju_robot_part_placement",
  "leju_robot_pass_the_cleaner_a",
  "leju_robot_pass_the_cleaner_b",
  "leju_robot_pass_the_cleaner_c",
  "leju_robot_pass_the_cleaner_d",
  "leju_robot_pass_the_cleaner_e",
  "G1edu-u3_basket_storage_apple",
  "G1edu-u3_basket_storage_apple_b",
  "G1edu-u3_bowl_storage_grape_singletry",
  "G1edu-u3_food_storage",
  "G1edu-u3_little_tray_storage_apple_b",
  "G1edu-u3_little_tray_storage_lemon_b",
  "G1edu-u3_pick_apple_a",
  "G1edu-u3_pick_apple_b",
  "G1edu-u3_pick_crumpled_paper_aa",
  "G1edu-u3_pick_cup_a",
  "G1edu-u3_pick_empty_bottle_ab",
  "G1edu-u3_pick_leftover_food_ac",
  "G1edu-u3_pick_metal_bowl_aa",
  "G1edu-u3_pick_metal_bowl_ab",
  "G1edu-u3_pick_plastic_bowl_ac",
  "G1edu-u3_pick_plastic_bowl_ad",
  "G1edu-u3_pick_up_the_bottled_water_a",
  "G1edu-u3_pick_up_the_bottled_water_as",
  "G1edu-u3_pick_up_the_bottled_water_b",
  "G1edu-u3_pick_up_the_bread_az",
  "G1edu-u3_pick_up_the_lemon_a",
  "G1edu-u3_pick_up_the_lemon_at",
  "G1edu-u3_pick_up_the_tissue_box_ao",
  "G1edu-u3_pick_up_the_toy_ai",
  "G1edu-u3_place_apple_c",
  "G1edu-u3_place_bottle_c",
  "G1edu-u3_place_metal_bowl_ae",
  "G1edu-u3_place_metal_bowl_af",
  "G1edu-u3_place_plastic_bowl_ag",
  "G1edu-u3_place_plastic_bowl_ah",
  "G1edu-u3_plate_storage_doll",
  "G1edu-u3_plate_storage_rabbit_doll",
  "G1edu-u3_pullBowl_storage_bread_b",
  "G1edu-u3_pullBowl_storage_bread_a",
  "G1edu-u3_pullBowl_storage_bread_unordered_a",
  "G1edu-u3_pullBowl_storage_bread_unordered_b",
  "G1edu-u3_pullBowl_storage_bread_unordered_C",
  "G1edu-u3_put_the_bread_aw",
  "G1edu-u3_put_the_cup_b",
  "G1edu-u3_put_the_lemon_af",
  "G1edu-u3_put_the_lemon_on_the_plate_ah",
  "G1edu-u3_put_the_tissue_box_al",
  "G1edu-u3_put_the_toy_ap",
  "G1edu-u3_put_the_water_bottle_aq",
  "G1edu-u3_put_the_water_bottle_on_the_table_d",
  "G1edu-u3_stack_bowls",
  "G1edu-u3_tray_storage_lemon_a"
]);

const roboCoinActionsForPath = (path) => [
  "EEF Pose",
  "Joint",
  roboCoinDexterousHandPaths.has(path) ? "Dexterous hand joint" : "Parallel gripper"
];

const roboCoinRows = roboCoinTaskEntries
  .filter(({ path }) => !roboCoinDataManagerOnlyPaths.has(path))
  .map(({ path, task, demos }) => ({
    task,
    dataLinks: {
      HuggingFace: `${roboCoinRepoBase}/${path}`
    },
    observations: ["RGB-D", "Proprio", "Language"],
    actions: roboCoinActionsForPath(path),
    demos,
    envs: "",
    license: "Apache-2.0"
  }));

const roboMind2EmbodimentEntries = [
  { repo: "X-Humanoid/RoboMIND2.0-UR5", dataset: "RoboMIND2.0-UR5", embodiment: "ur", tasks: 150, demos: 54441 },
  { repo: "X-Humanoid/RoboMIND2.0-UR5-Dex", dataset: "RoboMIND2.0-UR5-Dex", embodiment: "ur_dex", tasks: 6, demos: 1795 },
  { repo: "X-Humanoid/RoboMIND2.0-Franka-sim", dataset: "RoboMIND2.0-Franka-sim", embodiment: "franka_sim", tasks: 34, demos: 10692 },
  { repo: "X-Humanoid/RoboMIND2.0-Agilex", dataset: "RoboMIND2.0-Agilex", embodiment: "agilex", tasks: 66, demos: 22206 },
  { repo: "X-Humanoid/RoboMIND2.0-Agilex-mobile", dataset: "RoboMIND2.0-Agilex-mobile", embodiment: "agilex_mobile", tasks: 77, demos: 13873 },
  { repo: "X-Humanoid/RoboMIND2.0-Tienkung-sim", dataset: "RoboMIND2.0-Tienkung-sim", embodiment: "tienkung_sim", tasks: 25, demos: 8015 },
  { repo: "X-Humanoid/RoboMIND2.0-Tienkung", dataset: "RoboMIND2.0-Tienkung", embodiment: "tienkung", tasks: 47, demos: 14740 },
  { repo: "X-Humanoid/RoboMIND2.0-Tianyi", dataset: "RoboMIND2.0-Tianyi", embodiment: "tienyi", tasks: 36, demos: 7145 },
  { repo: "X-Humanoid/RoboMIND2.0-Tianyi-mobile", dataset: "RoboMIND2.0-Tianyi-mobile", embodiment: "tienyi_mobile", tasks: 10, demos: 1779 },
  { repo: "X-Humanoid/RoboMIND2.0-Ark", dataset: "RoboMIND2.0-Ark", embodiment: "ark", tasks: 54, demos: 14857 },
  { repo: "X-Humanoid/RoboMIND2.0-Ark-mobile", dataset: "RoboMIND2.0-Ark-mobile", embodiment: "ark_mobile", tasks: 21, demos: 4295 },
  { repo: "X-Humanoid/RoboMIND2.0-Franka-Part-1", dataset: "RoboMIND2.0-Franka-Part-1", embodiment: "franka", tasks: 45, demos: 18637 },
  { repo: "X-Humanoid/RoboMIND2.0-Franka-Part-2", dataset: "RoboMIND2.0-Franka-Part-2", embodiment: "franka", tasks: 45, demos: 22000 },
  { repo: "X-Humanoid/RoboMIND2.0-Franka-Part-3", dataset: "RoboMIND2.0-Franka-Part-3", embodiment: "franka", tasks: 41, demos: 38747 },
  { repo: "X-Humanoid/RoboMIND2.0-Franka-Part-4", dataset: "RoboMIND2.0-Franka-Part-4", embodiment: "franka", tasks: 42, demos: 16081 },
  { repo: "X-Humanoid/RoboMIND2.0-Franka-Part-5", dataset: "RoboMIND2.0-Franka-Part-5", embodiment: "franka", tasks: 40, demos: 17160 },
];
const roboMind2Rows = roboMind2EmbodimentEntries.map(({ repo, dataset, embodiment, tasks, demos }) =>
  makeLandingRow({
    task: `${dataset} / ${embodiment} (${tasks} tasks)`,
    href: modelScopeDatasetTree(repo, `data/${embodiment}`),
    label: "ModelScope",
    observations: ["RGB-D", "Proprio", "Language", "Force", "Torque"],
    actions: ["Robot Actions"],
    demos,
    license: "Apache-2.0"
  })
);

const ph2dRepo = "RogerQi/PH2D";
const ph2dDatasets = [
  { path: "000-sim_test", taskType: "sim_test", embodiment: "simulation", demos: 50 },
  { path: "104-lars-grasping_2024-11-08_15-23-40", taskType: "grasping", embodiment: "human_avp", demos: 30 },
  { path: "105_lars-grasping_2024-11-08_15-47-04", taskType: "grasping", embodiment: "human_avp", demos: 66 },
  { path: "106-grasping-zedbox-human_2024-11-13_15-27-43", taskType: "grasping", embodiment: "human_avp", demos: 52 },
  { path: "1061new_sim_pepsi_grasp_h1_2_inspire-2025_02_11-22_20_48", taskType: "grasping", embodiment: "h1_inspire_sim", demos: 54 },
  { path: "107-grasping-chocolate-human_2024-11-13_15-15-09", taskType: "grasping", embodiment: "human_avp", demos: 54 },
  { path: "108-grasping-water-human _2024-11-13_15-00-20", taskType: "grasping", embodiment: "human_avp", demos: 52 },
  { path: "109-grasping-mtn-human_2024-11-13_14-40-07", taskType: "grasping", embodiment: "human_avp", demos: 52 },
  { path: "110-picking-dynamixel-human_2024-11-13_17-34-13", taskType: "picking", embodiment: "human_avp", demos: 59 },
  { path: "111-picking-colorful-toycube_2024-11-13_20-25-34", taskType: "picking", embodiment: "human_avp", demos: 58 },
  { path: "112-picking-brownbox-human_2024-11-13_20-42-14", taskType: "picking", embodiment: "human_avp", demos: 56 },
  { path: "113-picking-blackcube-human_2024-11-13_22-09-05", taskType: "picking", embodiment: "human_avp", demos: 58 },
  { path: "120-pouring-mtn-human_2024-11-14_01-05-21", taskType: "pouring", embodiment: "human_avp", demos: 58 },
  { path: "121-pouring-party-cup-human_2024-11-14_01-26-24", taskType: "pouring", embodiment: "human_avp", demos: 58 },
  { path: "1400_grasping_three_items_zed-2025_01_23-20_13_12", taskType: "grasping", embodiment: "human_zed", demos: 44 },
  { path: "1401_grasping_three_items_2025-01-23_19-24-05", taskType: "grasping", embodiment: "human_avp", demos: 45 },
  { path: "1402_grasping_three_items_whole_2025-01-23_19-37-55", taskType: "grasping", embodiment: "human_avp", demos: 45 },
  { path: "1403-human_pick_color_pad_left_2025-01-13_13-05-06", taskType: "picking", embodiment: "human_avp", demos: 50 },
  { path: "1404-human_more_colorpad_left_picking_2025-01-20_22-23-13", taskType: "picking", embodiment: "human_avp", demos: 105 },
  { path: "1405-picking_3cat_straw_2025-03-12_15-53-25", taskType: "picking", embodiment: "human_avp", demos: 31 },
  { path: "1406-picking_orange_2025-03-12_17-08-20", taskType: "picking", embodiment: "human_avp", demos: 50 },
  { path: "1407-picking_orange_tj_2025-03-12_16-42-19", taskType: "picking", embodiment: "human_avp", demos: 24 },
  { path: "1500-pouring_2025-01-18_13-24-27", taskType: "pouring", embodiment: "human_avp", demos: 24 },
  { path: "1501-pouring_costco_water_2025-03-12_17-23-11", taskType: "pouring", embodiment: "human_avp", demos: 52 },
  { path: "1502-pouring_kura_2025-03-12_15-38-26", taskType: "pouring", embodiment: "human_avp", demos: 21 },
  { path: "1503-pouring_tea_2025-03-12_17-18-12", taskType: "pouring", embodiment: "human_avp", demos: 20 },
  { path: "1504-pouring_water_2025-03-12_19-33-52", taskType: "pouring", embodiment: "human_avp", demos: 20 },
  { path: "2061_rw_pepsi_grasp_alan_2025_02_15-16_27_13", taskType: "grasping", embodiment: "h1_2_inspire_cmu", demos: 56 },
  { path: "302-grasp_coke_random-2024_12_09-21_39_30", taskType: "grasping", embodiment: "h1_inspire", demos: 49 },
  { path: "303-grasp_coke_random-2024_12_12-19_13_53", taskType: "grasping", embodiment: "h1_inspire", demos: 52 },
  { path: "304-grasp_coke_random-2024_12_12-19_58_36", taskType: "grasping", embodiment: "h1_inspire", demos: 50 },
  { path: "401-picking-2024_11_12-22_39_57", taskType: "picking", embodiment: "h1_inspire", demos: 101 },
  { path: "402-pick_on_color_pad_right-2025_01_09-16_36_15", taskType: "picking", embodiment: "h1_inspire", demos: 51 },
  { path: "403-pick_on_color_pad_left-2025_01_09-16_58_04", taskType: "picking", embodiment: "h1_inspire", demos: 10 },
  { path: "404-pick_on_color_pad_right_far-2025_01_12-20_20_57", taskType: "picking", embodiment: "h1_inspire", demos: 39 },
  { path: "405-pick_on_color_pad_right_far_far-2025_01_13-19_29_04", taskType: "picking", embodiment: "h1_inspire", demos: 19 },
  { path: "501-pouring-2024_11_12-23_39_22", taskType: "pouring", embodiment: "h1_inspire", demos: 48 },
  { path: "502-pouring_random-2025_01_10-20_21_26", taskType: "pouring", embodiment: "h1_inspire", demos: 42 },
  { path: "503-pouring-2025_01_27-22_03_40", taskType: "pouring", embodiment: "h1_inspire", demos: 19 },
  { path: "901-grasping-val-2024_11_18-17_36_04", taskType: "grasping", embodiment: "h1_inspire", demos: 10 },
  { path: "902-pouring-val-2024_11_18-18_49_25", taskType: "pouring", embodiment: "h1_inspire", demos: 4 },
  { path: "903-picking-val-2024_11_18-18_58_16", taskType: "picking", embodiment: "h1_inspire", demos: 10 },
];

const ph2dRows = ph2dDatasets.map(({ path, taskType, embodiment, demos }) => ({
  task: `${taskType} / ${path}`,
  dataLinks: {
    HuggingFace: hfDatasetTree(ph2dRepo, path)
  },
  observations: ["HDF5", "RGB", "Proprio"],
  actions: ["Robot Actions"],
  demos,
  envs: embodiment,
  license: "MIT"
}));

const decoRepo = "BAAI-Humanoid/DECO-50";
const decoTaskGroups = [
  ["task1", "12 subtask folders"],
  ["task2", "3 subtask folders"],
  ["task3", "8 subtask folders"],
  ["task4", "6 subtask folders"]
];
const decoRows = decoTaskGroups.map(([path, envs]) =>
  makeHfFolderRow({
    repo: decoRepo,
    path,
    task: `${path} / data-* folders`,
    observations: ["RGB", "Proprio"],
    actions: ["Robot Actions"],
    envs,
    license: "Apache-2.0"
  })
);

const dexoraRepo = "Dexora/Dexora_Real-World_Dataset";
const dexoraTopLevelFolders = [
  { path: "airbot_articulation", demos: 1041 },
  { path: "airbot_assemble", demos: 1880 },
  { path: "airbot_dexterous", demos: 2299 },
  { path: "airbot_pick_and_place", demos: 6297 }
];
const dexoraRows = dexoraTopLevelFolders.map(({ path, demos }) =>
  makeHfFolderRow({
    repo: dexoraRepo,
    path,
    task: path,
    observations: ["RGB", "Proprio", "Language"],
    actions: ["EEF Pose", "Joint", "Dexterous hand joint"],
    demos,
    envs: 1,
    license: "MIT"
  })
);

const baihuVTouchDataBase = "https://ai.atomgit.com/openloong/visuo-tactile/code";
const baihuVTouchTaskEntries = [
  { task: "Connect an Ethernet Cable to a Router", sourceTask: "路由器连接网线", demos: 500 },
  { task: "Put a Smartwatch into a Drawer", sourceTask: "智能手表放入抽屉", demos: 499 },
  { task: "Put a Ruler into a Stationery Pouch", sourceTask: "尺子放入文具袋", demos: 442 },
  { task: "Place a Spoon into a Utensil Holder", sourceTask: "勺子放入餐具筒", demos: 301 },
  { task: "Stack Plates", sourceTask: "堆叠盘子", demos: 301 },
  { task: "Place Disposable Gloves on a Kitchen Storage Rack", sourceTask: "将一次性手套放入厨房储物架", demos: 301 },
  { task: "Place Body Wash on a Storage Rack", sourceTask: "将沐浴露放入置物架", demos: 301 },
  { task: "Place Shampoo on a Storage Rack", sourceTask: "将洗发水放入置物架", demos: 301 },
  { task: "Pour Ingredients from a Plate into a Bowl", sourceTask: "将盘中食材倒入碗中", demos: 301 },
  { task: "Place an Imported Wine Bottle into a Gift Box and Fill Foam", sourceTask: "将进口红酒瓶放入礼盒并填充泡沫", demos: 301 },
  { task: "Wipe a Table with a Cloth", sourceTask: "抹布擦桌子", demos: 301 },
  { task: "Organize Needle-Nose Pliers and Pliers into a Tool Organizer", sourceTask: "整理尖嘴钳与钳子入工具收纳格", demos: 301 },
  { task: "Clean Desktop Trash", sourceTask: "桌面垃圾", demos: 301 },
  { task: "Place a Mug on a Coaster", sourceTask: "马克杯放垫片上", demos: 301 },
  { task: "Apply Lubricating Oil to a Bearing", sourceTask: "使用润滑油瓶滴油至轴承", demos: 300 },
  { task: "Absorb Water Stains from a Table with a Sponge", sourceTask: "吸水海绵吸除桌面水渍", demos: 300 },
  { task: "Stack Building Blocks", sourceTask: "堆叠积木方块", demos: 300 },
  { task: "Pour a Bag of Nuts into a Storage Jar", sourceTask: "将坚果袋倒入分装罐", demos: 300 },
  { task: "Place a Lubricating Oil Bottle into a Toolbox Slot", sourceTask: "将润滑油瓶放入工具箱固定位", demos: 300 },
  { task: "Place Toothpaste on a Storage Rack", sourceTask: "将牙膏放入置物架", demos: 300 },
  { task: "Maintain and Store Tools", sourceTask: "工具保养收纳", demos: 300 },
  { task: "Recycle Waste into a Recycling Bin", sourceTask: "废料回收至回收箱", demos: 300 },
  { task: "Pick a Liquid-Packaged Item from a Shelf", sourceTask: "货架取液体包装商品", demos: 300 },
  { task: "Pick a Boxed Item from a Shelf", sourceTask: "货架取盒装商品", demos: 300 },
  { task: "Place a Plastic Cover Plate into a Parts Storage Box", sourceTask: "将塑料盖板放入零件收纳盒", demos: 299 },
  { task: "Sort Medicine Bottles by Label onto a Medicine Rack", sourceTask: "将药瓶按标签分类放入药品架", demos: 299 },
  { task: "Place a Jarred Item onto a Shelf", sourceTask: "罐子装物品放到货架", demos: 299 },
  { task: "Place a Test Tube", sourceTask: "试管放置", demos: 299 },
  { task: "Place a Gas-Packaged Item onto a Shelf", sourceTask: "气体包装物品放到货架", demos: 297 }
];
const baihuVTouchRows = baihuVTouchTaskEntries.map(({ task, sourceTask, demos }) =>
  makeLandingRow({
    task,
    href: `${baihuVTouchDataBase}/${encodeURIComponent(sourceTask)}`,
    label: "hdf5",
    observations: ["RGB-D", "Proprio", "Tactile"],
    actions: ["EEF Pose", "Joint", "Parallel gripper"],
    demos,
    envs: 1,
    license: "TBD"
  })
);

const agiBotWorld2026Repo = "agibot-world/AgiBotWorld2026";
const agiBotWorld2026Folders = [
  ["ImitationLearning/CommercialSpaces", "Imitation learning / commercial spaces"],
  ["ImitationLearning/Home", "Imitation learning / home"],
  ["RichInteraction/CommercialSpaces", "Rich interaction / commercial spaces"],
  ["RichInteraction/Home", "Rich interaction / home"],
  ["simulation/scoop_popcorn_to_bucket", "simulation / scoop_popcorn_to_bucket"],
  ["simulation/take_bagged_food_to_cart", "simulation / take_bagged_food_to_cart"],
  ["simulation/take_cup_to_cart", "simulation / take_cup_to_cart"],
  ["simulation/take_drink_to_cart", "simulation / take_drink_to_cart"],
  ["simulation/take_laundry_detergent_to_cart", "simulation / take_laundry_detergent_to_cart"],
  ["simulation/tidy_up_food_in_freezer", "simulation / tidy_up_food_in_freezer"]
];
const agiBotWorld2026Rows = [
  ...agiBotWorld2026Folders.map(([path, task]) =>
    makeHfFolderRow({
      repo: agiBotWorld2026Repo,
      path,
      task,
      observations: ["RGB-D", "Proprio", "Language"],
      actions: ["Robot Actions"],
      envs: "AgiBot World 2026",
      license: "CC BY-NC-SA 4.0"
    })
  ),
  makeHfBlobRow({
    repo: agiBotWorld2026Repo,
    path: "split_episodes_tool.zip",
    task: "split_episodes_tool",
    label: "zip",
    observations: ["N/A"],
    actions: ["N/A"],
    envs: "tooling",
    license: "CC BY-NC-SA 4.0"
  })
];

const unitreeUnifolmCollection = "https://huggingface.co/collections/unitreerobotics/unifolm-wbt-dataset";
const unitreeUnifolmRepos = [
  { repo: "unitreerobotics/G1_WBT_Inspire_Collect_Clothes_MainCamOnly", demos: 336 },
  { repo: "unitreerobotics/G1_WBT_Inspire_Pickup_Pillow_MainCamOnly", demos: 609 },
  { repo: "unitreerobotics/G1_WBT_Inspire_Put_Clothes_into_Washing_Machine_MainCamOnly", demos: 457 },
  { repo: "unitreerobotics/G1_WBT_Brainco_Collect_Plates_Into_Dishwasher", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Brainco_Pickup_Pillow", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Inspire_Put_Clothes_into_Washing_Machine", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Brainco_Make_The_Bed", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Inspire_Put_Clothes_Into_Basket", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Dex1_Put_Clothes_into_Washing_Machine", demos: 154 },
  { repo: "unitreerobotics/G1_WBT_Inspire_Put_Drinks_Into_Fridge", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Inspire_Put_Vegetables_Into_Basket", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Brainco_Pick_Up_Medicine", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Inspire_Pick_Up_Drinks", demos: 300 },
  { repo: "unitreerobotics/G1_WBT_Inspire_Clean_The_Living_Room", demos: 300 }
];
const unitreeUnifolmRows = unitreeUnifolmRepos.map(({ repo, demos }) =>
  makeLandingRow({
    task: repo.split("/").at(-1).replaceAll("_", " "),
    href: hfDatasetBase(repo),
    label: "HuggingFace",
    observations: ["Video", "Parquet", "Proprio", "Language"],
    actions: ["Robot Actions"],
    demos,
    envs: "Unitree G1 WBT",
    license: "Apache-2.0"
  })
);

const aistBimanualRoot = "https://www.dropbox.com/scl/fo/zumqdjhk47uk2k8kcefmu/AEeieZQJ0wGr_D5J7ar0nqg?dl=0&rlkey=bhkxfigxkt8fmbxb88qnq1og7";
const aistBimanualDataRoot = "https://www.dropbox.com/scl/fo/zumqdjhk47uk2k8kcefmu/AGWTD7LBzclJkg3Wpo9LAxU/data?rlkey=bhkxfigxkt8fmbxb88qnq1og7&dl=0";
const aistBimanualHdf5Root = "https://www.dropbox.com/scl/fo/zumqdjhk47uk2k8kcefmu/AELiAf4iasSkcGyryGI8nDE/data/hdf5";
const makeAistBimanualHdf5Url = (zipName) =>
  `${aistBimanualHdf5Root}?dl=0&preview=${encodeURIComponent(zipName)}&rlkey=bhkxfigxkt8fmbxb88qnq1og7&subfolder_nav_tracking=1`;
const aistBimanualHdf5Zips = [
  "brush_screws_into_dustpan_human_brush_left_hold.zip",
  "brush_screws_into_dustpan_left_brush_human_hold.zip",
  "close_cardboard_box.zip",
  "close_toolbox.zip",
  "find_hole_and_insert_into_gear.zip",
  "find_insert_large_gear_shaft.zip",
  "find_insert_small_gear_shaft.zip",
  "fit_large_gear_shaft.zip",
  "fit_small_gear_shaft.zip",
  "fold_bath_towel.zip",
  "fold_big_towel.zip",
  "fold_blue_towel.zip",
  "fold_green_towel.zip",
  "fold_light_blue_towel.zip",
  "fold_orange_towel.zip",
  "fold_towel_assist.zip"
];
const aistBimanualRows = [
  ...aistBimanualHdf5Zips.map((zipName) =>
    makeDropboxRow({
      task: `hdf5 / ${zipName.replace(".zip", "")}`,
      href: makeAistBimanualHdf5Url(zipName),
      label: "zip",
      observations: ["RGB", "Proprio", "Language"],
      actions: ["Robot Actions"],
      demos: "TBD",
      envs: "task zip",
      license: "TBD"
    })
  )
];

const hapTileRepo = "HapTile2026/HapTile";
const hapTileTaskZips = [
  "fold_Tshirt.zip",
  "insert_peg.zip",
  "move_cable.zip",
  "move_can.zip",
  "move_disposable_cup.zip",
  "move_mobile_box.zip",
  "move_plush_toy.zip",
  "move_rubiks_cube.zip",
  "move_spoon.zip",
  "move_toy_car.zip",
  "move_water_bottle.zip",
  "press_Coffee_machine.zip",
  "put_Apple.zip",
  "put_Banana.zip",
  "put_Orange.zip",
  "put_baseball.zip",
  "put_fork.zip",
  "put_golf_ball.zip",
  "put_lego.zip",
  "put_spatula.zip",
  "put_sponge.zip",
  "put_spoon.zip",
  "put_spray_bottle.zip",
  "put_stack_glass_cups.zip",
  "put_strawberry.zip",
  "remove_cloth.zip",
  "remove_laundry_pod.zip",
  "remove_screwdriver.zip",
  "remove_sticky_note.zip",
  "remove_sugar_bag.zip",
  "remove_tissue.zip",
  "stack_bowls.zip",
  "stack_disposable_cup.zip",
  "stack_glass_cups.zip",
  "turn_can.zip",
  "turn_cleanser_bottle.zip",
  "turn_water_bottle.zip",
  "wipe_whiteboard.zip"
];
const hapTileRows = hapTileTaskZips.map((zipName) =>
  makeHfBlobRow({
    repo: hapTileRepo,
    path: `Data/${zipName}`,
    task: zipName.replace(".zip", ""),
    label: "zip",
    observations: ["RGB", "Proprio", "Language", "Haptic"],
    actions: ["Robot Actions"],
    envs: "HapTile task zip",
    license: "CC BY 4.0"
  })
);

const omniVitacRepo = "tars-robotics/OmniVitac";
const omniVitacFolders = [
  "Adjustment_zip_new",
  "Assembly_zip_new",
  "Cutting_zip_new",
  "Grasping_zip_new",
  "Peeling_zip_new",
  "Wiping_zip_new"
];
const omniVitacRows = omniVitacFolders.map((path) =>
  makeHfFolderRow({
    repo: omniVitacRepo,
    path,
    label: "tar.gz",
    task: path.replace("_zip_new", ""),
    observations: ["RGB-D", "Proprio", "Language", "Tactile"],
    actions: ["TBD"],
    envs: "OmniVitac task family",
    license: "CC BY-NC 4.0"
  })
);

const mimeTaskEntries = [
  { task: "Pour", folder: "https://www.dropbox.com/sh/wmyek0jhrpm0hmh/AADypxdDq9CbeD4VRKulTbG1a?dl=0", demos: 290 },
  { task: "Stir", folder: "https://www.dropbox.com/sh/kfxdbxy1dsju79i/AAD_0YyCm17oradIgtoTEidja?dl=0", demos: 508 },
  { task: "Pass", folder: "https://www.dropbox.com/sh/q33ko971usb028x/AACZJ25JmluVCeDU7ZrnMRqNa?dl=0", demos: 485 },
  { task: "Stack", folder: "https://www.dropbox.com/sh/dofxnu3ncum39hs/AAD2GKHwT7OtA4rtYxCnViNKa?dl=0", demos: 514 },
  { task: "Place objects in box", folder: "https://www.dropbox.com/sh/z3o7ad8jt7ji8h1/AAC4qTLuAyYq5EXccBUuuzt6a?dl=0", demos: 367 },
  { task: "Open Bottles", folder: "https://www.dropbox.com/sh/grgj9f8zyw4irfh/AAA2BKWxRpXgyy8R96bRRU1ua?dl=0", demos: 473 },
  { task: "Push", folder: "https://www.dropbox.com/sh/hb2rxqnjpcx2591/AADU0alwAPCxRY0qfNS_O0Cza?dl=0", demos: 355 },
  { task: "Rotate", folder: "https://www.dropbox.com/sh/uj7v0axgceddgw7/AAC4GB-uPSgtrPsJpAfNYjJta?dl=0", demos: 419 },
  { task: "Wipe", folder: "https://www.dropbox.com/sh/1sj84icjhrvxwf4/AADOg_NUFI_oU6lR3E0mZhkQa?dl=0", demos: 292 },
  { task: "Press Buttons", folder: "https://www.dropbox.com/sh/99jyhxvvs1cwqt4/AAB4zokOUUA2x2QIEGrZUawNa?dl=0", demos: 315 },
  { task: "Close Book", folder: "https://www.dropbox.com/sh/m9emo93c0nwl23k/AACb912BIksbG1PWHO0T8GMYa?dl=0", demos: 317 },
  { task: "Picking (single hand)", folder: "https://www.dropbox.com/sh/61s1x4f6yrjj2fp/AABBHku0_4EGyXH3__vAyijTa?dl=0", demos: 655 },
  { task: "Picking (both hands)", folder: "https://www.dropbox.com/sh/hrwbreflwsy3x2b/AACDSbpiCRUIwfNWjI4lyydya?dl=0", demos: 249 },
  { task: "Poke", folder: "https://www.dropbox.com/sh/i1yacr9dzuxzmy3/AACG-uJ6OYLwvwC0RngIMI5ja?dl=0", demos: 542 },
  { task: "Pull (two hands)", folder: "https://www.dropbox.com/sh/wqqrf0fjgpxseld/AADln-EXkyVCCRU_XM75qlfSa?dl=0", demos: 465 },
  { task: "Push (two hands)", folder: "https://www.dropbox.com/sh/jsrxsxm9em42uj2/AACgj6_NIjxJC1dKgK35TsJSa?dl=0", demos: 394 },
  { task: "Toy Car Trajectories", folder: "https://www.dropbox.com/sh/qph8y8kwsu470vx/AACBW2NQ1WAcj227GWm1wYfoa?dl=0", demos: 418 },
  { task: "Roll", folder: "https://www.dropbox.com/sh/ui2rcfdu3jbb4a4/AAAlwwPFXWd-MggI62uEwCwna?dl=0", demos: 426 },
  { task: "Drop Objects", folder: "https://www.dropbox.com/sh/6ysn4cbq5uuxcij/AAAAjU_yA79odQMGgYtVWJA6a?dl=0", demos: 465 },
  { task: "Pull (single hand)", folder: "https://www.dropbox.com/sh/x60fptqni9cvqx8/AAB71YePoQfovylmMzZILWSxa?dl=0", demos: 410 }
];

const mimeRows = mimeTaskEntries.map(({ task, folder, demos }, index) => ({
    task,
    dataLinks: {
      "Dropbox folder": folder,
    },
    observations: ["RGB-D", "Proprio"],
    actions: ["Joint", "Parallel gripper"],
    demos,
    envs: 1,
    license: "TBD"
  }));

const requestedRobotDataSections = [
  {
    id: "daml",
    project: "DAML",
    summary: "Domain-adaptive meta-learning robot imitation dataset. The public link is a single ZIP archive, so it is indexed as one dataset row.",
    projectLinks: {
      Project: "https://sites.google.com/view/daml",
      Download: "https://rail.eecs.berkeley.edu/datasets/mil_data.zip",
      Paper: "https://arxiv.org/abs/1802.01557"
    },
    citation: `@article{yu2018one,
  title={One-shot imitation from observing humans via domain-adaptive meta-learning},
  author={Yu, Tianhe and Finn, Chelsea and Xie, Annie and Dasari, Sudeep and Zhang, Tianhao and Abbeel, Pieter and Levine, Sergey},
  journal={arXiv preprint arXiv:1802.01557},
  year={2018}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "DAML one-shot imitation tasks",
        href: "https://rail.eecs.berkeley.edu/datasets/mil_data.zip",
        label: "zip",
        observations: ["RGB", "Proprio"],
        actions: ["Robot Actions"],
        demos: 2900,
        envs: "2 embodiments / 3 tasks"
      })
    ]
  },
  {
    id: "mime",
    project: "MIME",
    summary: "Multiple Interactions Made Easy dataset. The dataset page is the stable entry point rather than a task-level download tree.",
    projectLinks: {
      Dataset: "https://sites.google.com/view/mimedataset/dataset",
      Paper: "https://proceedings.mlr.press/v87/sharma18a.html",
    },
    citation: `@inproceedings{sharma2018multiple,
  title={Multiple interactions made easy (mime): Large scale demonstrations data for imitation},
  author={Sharma, Pratyusha and Mohan, Lekha and Pinto, Lerrel and Gupta, Abhinav},
  booktitle={Conference on robot learning},
  pages={906--915},
  year={2018},
  organization={PMLR}
}`,
    defaultOpen: false,
    rows: mimeRows
  },
  {
    id: "mt-opt",
    project: "MT-Opt",
    summary: "Google multi-task real robot dataset exposed through TensorFlow Datasets rather than task-named archives.",
    projectLinks: {
      RLDS: "https://www.tensorflow.org/datasets/catalog/mt_opt",
      Paper: "https://arxiv.org/abs/2104.08212"
    },
    citation: `@inproceedings{kalashnikov2021mt,
  title={Mt-opt: Continuous multi-task robotic reinforcement learning at scale},
  author={Kalashnikov, Dmitry and Irpan, Alex and Pastor, Peter and Ibarz, Julian and Herzog, Alexander and Jang, Eric and Quillen, Deirdre and Holly, Ethan and Kalakrishnan, Mrinal and Vanhoucke, Vincent and others},
  booktitle={Conference on Robot Learning},
  year={2021}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "MT-Opt",
        href: "https://www.tensorflow.org/datasets/catalog/mt_opt",
        label: "RLDS",
        observations: ["RGB", "Proprio"],
        actions: ["Robot Actions"],
        demos: 800000,
        envs: "12 tasks"
      })
    ]
  },
  {
    id: "rh20t",
    project: "RH20T",
    summary: "Multimodal real robot dataset with a project download page rather than visible task-level archives.",
    projectLinks: {
      Project: "https://rh20t.github.io/",
      Download: "https://rh20t.github.io/#download",
      Paper: "https://arxiv.org/abs/2307.00595"
    },
    citation: `@article{fang2023rh20t,
  title={Rh20t: A comprehensive robotic dataset for learning diverse skills in one-shot},
  author={Fang, Hao-Shu and Fang, Hongjie and Tang, Zhenyu and Liu, Jirong and Wang, Chenxi and Wang, Junbo and Zhu, Haoyi and Lu, Cewu},
  journal={arXiv preprint arXiv:2307.00595},
  year={2023}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "RH20T",
        href: "https://rh20t.github.io/#download",
        label: "zip",
        observations: ["RGB-D", "Proprio", "Language", "Force", "Audio"],
        actions: ["Robot Actions"],
        demos: 110000,
        envs: "4 embodiments / 147 tasks"
      })
    ]
  },
  {
    id: "fmb",
    project: "FMB dataset",
    summary: "Functional Manipulation Benchmark dataset. The RAIL page is the stable dataset entry point.",
    projectLinks: {
      Project: "https://functional-manipulation-benchmark.github.io/",
      Dataset: "https://rail.eecs.berkeley.edu/datasets/fmb/",
      Paper: "https://doi.org/10.1177/02783649241299777"
    },
    citation: `@article{luo2025fmb,
  title={Fmb: a functional manipulation benchmark for generalizable robotic learning},
  author={Luo, Jianlan and Xu, Charles and Liu, Fangchen and Tan, Liam and Lin, Zipeng and Wu, Jeffrey and Abbeel, Pieter and Levine, Sergey},
  journal={The International Journal of Robotics Research},
  volume={44},
  number={4},
  pages={592--606},
  year={2025},
  publisher={Sage Publications Sage UK: London, England}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "FMB benchmark data",
        href: "https://rail.eecs.berkeley.edu/datasets/fmb/",
        label: "Dataset",
        observations: ["RGB-D", "Proprio", "Force", "Torque"],
        actions: ["Robot Actions"],
        demos: 22600,
        envs: "2 tasks"
      })
    ]
  },
  {
    id: "reassemble",
    project: "REASSEMBLE",
    summary: "Contact-rich robotic assembly and disassembly dataset from TU Wien Research Data.",
    projectLinks: {
      Dataset: "https://researchdata.tuwien.ac.at/records/0ewrv-8cb44",
      Paper: "https://arxiv.org/abs/2502.05086"
    },
    citation: `@article{sliwowski2025reassemble,
  title={Reassemble: A multimodal dataset for contact-rich robotic assembly and disassembly},
  author={Sliwowski, Daniel and Jadav, Shail and Stanovcic, Sergej and Orbik, Jedrzej and Heidersberger, Johannes and Lee, Dongheui},
  journal={arXiv preprint arXiv:2502.05086},
  year={2025}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "REASSEMBLE contact-rich tasks",
        href: "https://researchdata.tuwien.ac.at/records/0ewrv-8cb44",
        label: "Dataset",
        observations: ["RGB", "Proprio", "Audio", "Force", "Torque"],
        actions: ["Robot Actions"],
        demos: 4600,
        envs: "121 tasks"
      })
    ]
  },
  {
    id: "ph2d",
    project: "PH2D",
    summary: "Humanoid Policy to Human Policy dataset. Rows are individual Hugging Face session folders with trajectory counts from HDF5 episode files.",
    projectLinks: {
      HuggingFace: hfDatasetBase(ph2dRepo),
      Paper: "https://arxiv.org/abs/2503.13441"
    },
    citation: `@article{qiu2025humanoid,
  title={Humanoid policy human policy},
  author={Qiu, Ri-Zhao and Yang, Shiqi and Cheng, Xuxin and Chawla, Chaitanya and Li, Jialong and He, Tairan and Yan, Ge and Yoon, David J and Hoque, Ryan and Paulsen, Lars and others},
  journal={arXiv preprint arXiv:2503.13441},
  year={2025}
}`,
    defaultOpen: false,
    rows: ph2dRows
  },
  {
    id: "aist-bimanual",
    project: "AIST-Bimanual",
    summary: "AIST bimanual manipulation dataset distributed through Dropbox. Rows include the public format folders plus task-named HDF5 ZIP files visible from the first shared-folder page.",
    projectLinks: {
      Project: "https://aistairc.github.io/aist_bimanip_site/",
      Data: aistBimanualDataRoot
    },
    citation: `@misc{aist2025bimanip,
  author={Tomohiro Motoda and Masaki Murooka and Ryoichi Nakajo and Muhammad A. Muttaqien and Koshi Makihara and Hanbit Oh and Keisuke Shirai and Floris Erich and Ryo Hanai and Yukiyasu Domae},
  title={AIST-Bimanual Manipulation},
  year={2025}
}`,
    defaultOpen: false,
    rows: aistBimanualRows
  },
  {
    id: "deco-50",
    project: "DECO-50",
    summary: "DECO-50 real-world bimanual dexterous dataset. Rows follow the task folders exposed by Hugging Face.",
    projectLinks: {
      HuggingFace: hfDatasetBase(decoRepo),
      Paper: "https://arxiv.org/abs/2602.05513"
    },
    citation: `@article{li2026deco,
  title={DECO: Decoupled Multimodal Diffusion Transformer for Bimanual Dexterous Manipulation with a Plugin Tactile Adapter},
  author={Li, Xukun and Sun, Yu and Zhang, Lei and Huang, Bosheng and Peng, Yibo and Meng, Yuan and Jiang, Haojun and Xie, Shaoxuan and Yao, Guocai and Knoll, Alois and others},
  journal={arXiv preprint arXiv:2602.05513},
  year={2026}
}`,
    defaultOpen: false,
    rows: decoRows
  },
  {
    id: "dexora",
    project: "Dexora",
    summary: "Dexora real-world bimanual dexterity dataset. Rows use the four episode-centric airbot_* task families; the dexora/ folder is a task-level mirror and is not added again.",
    projectLinks: {
      HuggingFace: hfDatasetBase(dexoraRepo),
      Project: "https://dexoravla.github.io/",
      GitHub: "https://github.com/ZZongzheng0918/Dexora",
      Paper: "https://arxiv.org/abs/2605.18722"
    },
    citation: `@article{zhang2026dexora,
  title={Dexora: Open-source VLA for High-DoF Bimanual Dexterity},
  author={Zhang, Zongzheng and Pang, Jingrui and Yang, Zhuo and Li, Kun and Liao, Minwen and Zhang, Saining and Chi, Guoxuan and Guo, Jinbang and Gao, Huan-ang and Shi, Modi and others},
  journal={arXiv preprint arXiv:2605.18722},
  year={2026}
}`,
    defaultOpen: false,
    rows: dexoraRows
  },
  {
    id: "agibot-world-2026",
    project: "AgiBot World 2026",
    summary: "AgiBot World 2026 dataset. Rows follow the visible imitation-learning, rich-interaction, and simulation folders.",
    projectLinks: {
      HuggingFace: hfDatasetBase(agiBotWorld2026Repo)
    },
    citation: `@misc{agibotworld2026,
  title={AgiBot World 2026},
  author={AgiBot World Team},
  howpublished={\\url{https://huggingface.co/datasets/agibot-world/AgiBotWorld2026}},
  year={2026}
}`,
    defaultOpen: false,
    rows: agiBotWorld2026Rows
  },
  {
    id: "unitree-unifolm-wbt",
    project: "Unitree UnifoLM-WBT",
    summary: "Unitree UnifoLM-WBT collection. Rows are indexed by the 14 Hugging Face subdatasets; demos come from each repo's meta/info.json total_episodes, totaling 4,556 trajectories.",
    projectLinks: {
      Data: unitreeUnifolmCollection
    },
    citation: `@misc{unitree2026unifolm,
  title={UnifoLM-WBT-Dataset},
  author={{Unitree Robotics}},
  year={2026},
  howpublished={\\url{https://huggingface.co/collections/unitreerobotics/unifolm-wbt-dataset}}
}`,
    defaultOpen: false,
    rows: unitreeUnifolmRows
  },
  {
    id: "haptile",
    project: "HapTile",
    summary: "Haptic-informed vision-tactile-language-action dataset. Rows index the task-named ZIP files under the Data folder.",
    projectLinks: {
      HuggingFace: hfDatasetBase(hapTileRepo),
      Paper: "https://arxiv.org/abs/2606.04825"
    },
    citation: `@article{alian2026haptile,
  title={HapTile: A Haptic-Informed Vision-Tactile-Language-Action Dataset for Contact-Rich Imitation Learning},
  author={Alian, Amirhosein and Zhao, Yongqiang and Gu, Shiyi and Zhang, Xuyang and Chen, Zhuo and Mower, Christopher E and Bou-Ammar, Haitham and Luo, Shan},
  journal={arXiv preprint arXiv:2606.04825},
  year={2026}
}`,
    defaultOpen: false,
    rows: hapTileRows
  },
  {
    id: "omnivitac",
    project: "OmniVitac",
    summary: "Visuo-tactile manipulation dataset. Rows follow the six top-level task-family folders visible on Hugging Face.",
    projectLinks: {
      Project: "https://mrsecant.github.io/OmniVTA/",
      Code: "https://github.com/MrSecant/OmniVTA",
      HuggingFace: hfDatasetBase(omniVitacRepo),
      Paper: "https://arxiv.org/abs/2603.19201"
    },
    citation: `@article{zheng2026omnivta,
  title={Omnivta: Visuo-tactile world modeling for contact-rich robotic manipulation},
  author={Zheng, Yuhang and Gu, Songen and Li, Weize and Zheng, Yupeng and Zang, Yujie and Tian, Shuai and Li, Xiang and Hao, Ce and Gao, Chen and Liu, Si and others},
  journal={arXiv preprint arXiv:2603.19201},
  year={2026}
}`,
    defaultOpen: false,
    rows: omniVitacRows
  }
];

const additionalRobotDataSections = [
  ...requestedRobotDataSections,
  {
    id: "robomind",
    project: "RoboMIND",
    summary: "Robot manipulation dataset from X-Humanoid. Rows are grouped by benchmark and embodiment because task archives are multipart tar.gz files.",
    projectLinks: {
      Project: "https://x-humanoid-robomind.github.io/",
      HuggingFace: hfDatasetBase(roboMindRepo),
      Paper: "https://arxiv.org/abs/2412.13877"
    },
    citation: `@article{wu2024robomind,
  title={Robomind: Benchmark on multi-embodiment intelligence normative data for robot manipulation},
  author={Wu, Kun and Hou, Chengkai and Liu, Jiaming and Che, Zhengping and Ju, Xiaozhu and Yang, Zhuqin and Li, Meng and Zhao, Yinuo and Xu, Zhiyuan and Yang, Guang and others},
  journal={arXiv preprint arXiv:2412.13877},
  year={2024}
}`,
    defaultOpen: false,
    rows: roboMindRows
  },
  {
    id: "agibot-world-beta",
    project: "AgiBot World Beta",
    summary: "AgiBot World beta release with per-task observation shards, parameter shards, and proprio stats.",
    projectLinks: {
      Project: "https://agibot-world.com/",
      HuggingFace: hfDatasetBase(agiBotWorldRepo),
      GitHub: "https://github.com/OpenDriveLab/AgiBot-World"
    },
    citation: `@misc{contributors2024agibotworldrepo,
  title={AgiBot World Colosseum},
  author={AgiBot World Colosseum contributors},
  howpublished={\\url{https://github.com/OpenDriveLab/AgiBot-World}},
  year={2024}
}`,
    defaultOpen: false,
    rows: agiBotWorldRows
  },
  {
    id: "actionnet",
    project: "ActionNet",
    summary: "Fourier Intelligence ActionNet robot dataset. The public repo exposes numbered tar shards rather than task-named folders.",
    projectLinks: {
      HuggingFace: hfDatasetBase("FourierIntelligence/ActionNet"),
      Project: "https://action-net.org/",
      Github: "https://github.com/FFTAI/fourier-lerobot"
    },
    citation: `@article{fourier2025actionnet,
  author    = {Fourier ActionNet Team, Yao Mu},
  title     = {ActionNet: A dataset for dexterous bimanual manipulation},
  year      = {2025},
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "ActionNet",
        href: hfDatasetBase("FourierIntelligence/ActionNet"),
        label: "HuggingFace",
        observations: ["RGB-D", "Proprio", "Language"],
        actions: ["Robot Actions"],
        demos: 30000,
        envs: "3 embodiments",
        license: "CC BY-NC-SA 4.0"
      })
    ]
  },
  {
    id: "open-galaxea",
    project: "Open Galaxea",
    summary: "Galaxea open-world robot dataset. Rows are generated from the visible LeRobot tar.gz task archives.",
    projectLinks: {
      HuggingFace: hfDatasetBase(openGalaxeaRepo),
      Paper: "https://arxiv.org/abs/2509.00576"
    },
    citation: `@article{galaxea2025,
  title={Galaxea G0: Open-World Dataset and Dual-System VLA Model},
  author={Galaxea Team},
  journal={arXiv preprint arXiv:2509.00576},
  year={2025}
}`,
    defaultOpen: false,
    rows: openGalaxeaRows
  },
  {
    id: "realsource-world",
    project: "RealSource World",
    summary: "RealSource real-world robot dataset. Rows use LeRobot task folders with demos counted from episode parquet files in the Hugging Face directory tree.",
    projectLinks: {
      HuggingFace: hfDatasetBase(realSourceWorldRepo),
      Guide: "https://develop.realman-robotics.com/datatraining/guide/dataacquisition/"
    },
    citation: `@misc{realsourceworld,
  title={RealSource World: A Large-Scale Real-World Dual-Arm Manipulation Dataset},
  author={RealSource},
  howpublished={\\url{https://huggingface.co/datasets/RealSourceData/RealSource-World}},
  year={2025}
}`,
    defaultOpen: false,
    rows: realSourceWorldRows
  },
  {
    id: "robocoin",
    project: "RoboCOIN",
    summary: "Rows keep the 624 RoboCOIN task repos with public HuggingFace entries; demos are statistics.total_episodes for those rows, totaling 126,568. DataManager-only entries without open dataset links are omitted.",
    projectLinks: {
      Project: "https://flagopen.github.io/RoboCOIN/",
      Website: "https://flagopen.github.io/RoboCOIN-DataManager/",
      HuggingFace: "https://huggingface.co/RoboCOIN",
      Paper: "https://arxiv.org/abs/2511.17441"
    },
    citation: `@article{wu2025robocoin,
  title={Robocoin: An open-sourced bimanual robotic data collection for integrated manipulation},
  author={Wu, Shihan and Liu, Xuecheng and Xie, Shaoxuan and Wang, Pengwei and Li, Xinghang and Yang, Bowen and Li, Zhe and Zhu, Kai and Wu, Hongyu and Liu, Yiheng and others},
  journal={arXiv preprint arXiv:2511.17441},
  year={2025}
}`,
    defaultOpen: false,
    rows: roboCoinRows
  },
  {
    id: "humanoid-everyday",
    project: "Humanoid Everyday",
    summary: "Humanoid everyday manipulation dataset. The public repo exposes episode parquet/video shards rather than task-named archives.",
    projectLinks: {
      Poject: "https://humanoideveryday.github.io/",
      HuggingFace: hfDatasetBase("USC-PSI-Lab/humanoid-everyday"),
      Paper: "https://arxiv.org/abs/2510.08807"
    },
    citation: `@article{zhao2025humanoid,
  title={Humanoid everyday: A comprehensive robotic dataset for open-world humanoid manipulation},
  author={Zhao, Zhenyu and Jing, Hongyi and Liu, Xiawei and Mao, Jiageng and Jha, Abha and Yang, Hanwen and Xue, Rong and Zakharor, Sergey and Guizilini, Vitor and Wang, Yue},
  journal={arXiv preprint arXiv:2510.08807},
  year={2025}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "Humanoid Everyday episodes",
        href: hfDatasetBase("USC-PSI-Lab/humanoid-everyday"),
        label: "HuggingFace",
        observations: ["Video", "Parquet", "Robot Observations"],
        actions: ["Robot Actions"],
        envs: "Humanoid",
        license: "Apache-2.0"
      })
    ]
  },
  {
    id: "robomind-2",
    project: "RoboMIND 2.0",
    summary: "Rows follow the 16 ModelScope RoboMIND 2.0 embodiment/part dataset repos; demos are counted from success_episodes directories.",
    projectLinks: {
      ModelScope: "https://modelscope.cn/collections/X-Humanoid/RoboMIND20",
      Paper: "https://arxiv.org/abs/2512.24653"
    },
    citation: `@article{hou2025robomind,
  title={Robomind 2.0: A multimodal, bimanual mobile manipulation dataset for generalizable embodied intelligence},
  author={Hou, Chengkai and Wu, Kun and Liu, Jiaming and Che, Zhengping and Wu, Di and Liao, Fei and Li, Guangrun and He, Jingyang and Feng, Qiuxuan and Jin, Zhao and others},
  journal={arXiv preprint arXiv:2512.24653},
  year={2025}
}`,
    defaultOpen: false,
    rows: roboMind2Rows
  },
  {
    id: "molmoact2",
    project: "MolmoAct2-BimanualYAM-Dataset",
    summary: "AllenAI MolmoAct2-BimanualYAM-Dataset in LeRobot format. meta/info.json reports 32,246 episodes across 34 tasks.",
    projectLinks: {
      HuggingFace: hfDatasetBase("allenai/MolmoAct2-BimanualYAM-Dataset"),
      Paper: "https://arxiv.org/abs/2605.02881"
    },
    citation: `@misc{fang2026molmoact2actionreasoningmodels,
  title={MolmoAct2: Action Reasoning Models for Real-world Deployment},
  author={Haoquan Fang and Jiafei Duan and Donovan Clay and Sam Wang and Shuo Liu and Weikai Huang and Xiang Fan and Wei-Chuan Tsai and Shirui Chen and Yi Ru Wang and Shanli Xing and Jaemin Cho and Jae Sung Park and Ainaz Eftekhar and Peter Sushko and Karen Farley and Angad Wadhwa and Cole Harrison and Winson Han and Ying-Chun Lee and Eli VanderBilt and Rose Hendrix and Suveen Ellawela and Lucas Ngoo and Joyce Chai and Zhongzheng Ren and Ali Farhadi and Dieter Fox and Ranjay Krishna},
  year={2026},
  eprint={2605.02881},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2605.02881},
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "MolmoAct2-BimanualYAM-Dataset",
        href: hfDatasetBase("allenai/MolmoAct2-BimanualYAM-Dataset"),
        label: "HuggingFace",
        observations: ["Video", "Parquet", "Bimanual"],
        actions: ["Robot Actions"],
        demos: 32246,
        envs: "BimanualYAM",
        license: "Apache-2.0"
      })
    ]
  },
  {
    id: "baihu-vtouch",
    project: "Baihu-VTouch",
    summary: "OpenLoong Baihu-VTouch visuo-tactile dataset. Rows follow the 29 top-level HDF5 task folders, totaling 9,245 trajectories.",
    projectLinks: {
      Website: "https://www.openloong.org.cn/cn/datasets/baihu-vtouch",
      Data: "https://ai.atomgit.com/openloong/visuo-tactile",
      Paper: "https://arxiv.org/abs/2604.20444"
    },
    citation: `@article{hua2026vtouch++,
  title={VTouch++: A Multimodal Dataset with Vision-Based Tactile Enhancement for Bimanual Manipulation},
  author={Hua, Qianxi and Li, Xinyue and Yan, Zheng and Li, Yang and Zhang, Chi and Li, Yongyao and Liu, Yufei},
  journal={arXiv preprint arXiv:2604.20444},
  year={2026}
}`,
    defaultOpen: false,
    rows: baihuVTouchRows
  },
  {
    id: "let-dataset",
    project: "Let-Dataset",
    summary: "Leju LET full-size humanoid robot dataset family, split into the Base, Dex, and Body subdatasets requested by the source naming.",
    projectLinks: {
      ModelScope: "https://modelscope.cn/organization/lejurobot",

    },
    citation: `@misc{LET2025,
  title={LET:Full-Size Humanoid Robot Real-World Dataset},
  author={LejuRobotics},
  year={2025},
  howpublished={\\url{https://huggingface.co/datasets/LejuRobotics/LET-Base-Dataset}}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "LET-Base-Dataset",
        href: "https://huggingface.co/datasets/LejuRobotics/LET-Base-Dataset",
        label: "HuggingFace",
        observations: ["RGB-D", "Proprio", "Language", "IMU"],
        actions: ["TBD"],
        demos: 92600,
        envs: "55 tasks",
        license: "CC BY-NC-SA 4.0"
      }),
      makeLandingRow({
        task: "LET-Dex-Dataset",
        href: "https://huggingface.co/datasets/LejuRobotics/LET-Dex-Dataset",
        label: "HuggingFace",
        observations: ["RGB-D", "Proprio", "Language", "Tactile", "Force"],
        actions: ["TBD"],
        demos: 3000,
        envs: "14 tasks",
        license: "CC BY-NC-SA 4.0"
      }),
      makeLandingRow({
        task: "LET-Body-Dataset",
        href: "https://modelscope.cn/datasets/lejurobot/LET-Body-Dataset",
        label: "ModelScope",
        observations: ["RGB-D", "Proprio", "Language", "Whole-body State"],
        actions: ["TBD"],
        demos: "TBD",
        envs: "20+ tasks",
        license: "CC BY-NC-SA 4.0"
      })
    ]
  }
];

const internDataA1Directories = [
  {
    category: "articulation_tasks",
    embodiment: "franka",
    tasks: [
      "close_the_electriccooker",
      "close_the_laptop",
      "close_the_microwave",
      "open_the_electriccooker",
      "open_the_laptop",
      "open_the_microwave",
      "turn_off_the_faucet",
      "turn_on_the_faucet"
    ]
  },
  {
    category: "articulation_tasks",
    embodiment: "lift2",
    tasks: [
      "close_the_electriccooker",
      "close_the_laptop",
      "close_the_microwave",
      "open_the_electriccooker",
      "open_the_laptop",
      "open_the_microwave",
      "turn_off_the_faucet",
      "turn_on_the_faucet"
    ]
  },
  {
    category: "articulation_tasks",
    embodiment: "split_aloha",
    tasks: [
      "close_the_electriccooker",
      "close_the_laptop",
      "close_the_microwave",
      "open_the_electriccooker",
      "open_the_laptop",
      "open_the_microwave",
      "turn_off_the_faucet",
      "turn_on_the_faucet"
    ]
  },
  {
    category: "basic_tasks",
    embodiment: "franka",
    tasks: [
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
    ]
  },
  {
    category: "basic_tasks",
    embodiment: "genie1",
    tasks: [
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
    ]
  },
  {
    category: "basic_tasks",
    embodiment: "lift2",
    tasks: [
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
    ]
  },
  {
    category: "basic_tasks",
    embodiment: "split_aloha",
    tasks: [
      "collect_the_shoes_language",
      "organize_the_alarm_clocks_language",
      "organize_the_brushes",
      "organize_the_colorful_cups",
      "organize_the_glues_language",
      "organize_the_teaboxes_language",
      "pick_the_priced_item",
      "select_a_drink",
      "sort_the_table_waste",
      "track_the_targets",
      "watering_plants_left_arm",
      "watering_plants_right_arm"
    ]
  },
  {
    category: "long_horizon_tasks",
    embodiment: "franka",
    tasks: [
      "use_the_coffee_machine"
    ]
  },
  {
    category: "long_horizon_tasks",
    embodiment: "lift2",
    tasks: [
      "store_the_groceries"
    ]
  },
  {
    category: "long_horizon_tasks",
    embodiment: "split_aloha",
    tasks: [
      "put_the_sauce_into_the_fridge",
      "store_the_groceries",
      "use_the_coffee_machine"
    ]
  },
  {
    category: "pick_and_place_tasks",
    embodiment: "franka",
    tasks: [
      "blocks_stack_easy",
      "blocks_stack_hard",
      "collect_toys",
      "place_bread_in_skillet",
      "place_bread_on_plate",
      "place_bread_on_skillet",
      "place_bread_on_top_left_plate",
      "put_apple_into_basket",
      "put_banana_into_basket",
      "put_orange_into_basket"
    ]
  },
  {
    category: "pick_and_place_tasks",
    embodiment: "genie1",
    tasks: [
      "blocks_stack_easy",
      "blocks_stack_hard",
      "collect_toys",
      "place_bread_in_skillet",
      "place_bread_on_skillet",
      "put_apple_into_basket",
      "put_orange_into_basket"
    ]
  },
  {
    category: "pick_and_place_tasks",
    embodiment: "lift2",
    tasks: [
      "blocks_stack_easy",
      "blocks_stack_hard",
      "collect_toys",
      "place_bread_in_skillet",
      "place_bread_on_plate",
      "place_bread_on_skillet",
      "place_bread_on_top_left_plate",
      "put_apple_into_basket",
      "put_banana_into_basket",
      "put_eggplant_into_basket",
      "put_orange_into_basket",
      "put_strawberry_into_basket",
      "put_watermelon_into_basket"
    ]
  },
  {
    category: "pick_and_place_tasks",
    embodiment: "split_aloha",
    tasks: [
      "blocks_stack_easy",
      "blocks_stack_hard",
      "collect_toys",
      "place_bread_in_skillet",
      "place_bread_on_plate",
      "place_bread_on_skillet",
      "place_bread_on_top_left_plate",
      "put_apple_into_basket",
      "put_banana_into_basket",
      "put_orange_into_basket"
    ]
  }
];

const makeInternDataA1Task = ({ category, embodiment, task }) => {
  const path = `sim/${category}/${embodiment}/${task}.tar.gz`;
  return {
    task: `${category} / ${embodiment} / ${task}`,
    dataLinks: {
      "tar.gz": `${hfA1BlobBase}/${path}`
    },
    observations: ["RGB", "Proprio", "Language"],
    actions: ["EEF Pose", "Gripper"],
    demos: "TBD",
    envs: "TBD",
    license: "CC BY-NC-SA 4.0"
  };
};

const internDataA1Rows = internDataA1Directories.flatMap((directory) =>
  directory.tasks.map((task) => makeInternDataA1Task({ ...directory, task }))
);

const internDataM1Repo = "InternRobotics/InternData-M1";
const internDataM1Rows = [
  {
    task: "InternData-M1 simulation episodes",
    dataLinks: {
      HuggingFace: hfDatasetBase(internDataM1Repo),
      "simulated/agilex": hfDatasetTree(internDataM1Repo, "simulated/agilex"),
      "simulated/franka": hfDatasetTree(internDataM1Repo, "simulated/franka"),
      "simulated/robotiq": hfDatasetTree(internDataM1Repo, "simulated/robotiq")
    },
    observations: ["LeRobot", "Parquet", "Video", "2D/3D Boxes", "Semantic Masks"],
    actions: ["Robot Actions", "Task Planning"],
    demos: 244426,
    envs: "agilex / franka / robotiq / 50,907 tasks",
    license: "CC BY-NC-SA 4.0"
  }
];

const molmoBotRepo = "allenai/molmobot-data";
const molmoBotTaskConfigs = [
  {
    task: "DoorOpeningDataGenConfig",
    config: "DoorOpeningDataGenConfig"
  },
  {
    task: "RB-Y1 / open",
    config: "RBY1OpenDataGenConfig"
  },
  {
    task: "RB-Y1 / pick",
    config: "RBY1PickDataGenConfig"
  },
  {
    task: "RB-Y1 / pick_and_place",
    config: "RBY1PickAndPlaceDataGenConfig"
  },
  {
    task: "Franka / pick / omni_cam",
    config: "FrankaPickOmniCamConfig"
  },
  {
    task: "Franka / pick_and_place / omni_cam",
    config: "FrankaPickAndPlaceOmniCamConfig"
  },
  {
    task: "Franka / pick_and_place / color_omni_cam",
    config: "FrankaPickAndPlaceColorOmniCamConfig"
  },
  {
    task: "Franka / pick_and_place / next_to_omni_cam",
    config: "FrankaPickAndPlaceNextToOmniCamConfig"
  },
  {
    task: "Franka / pick_and_place / object_backfill",
    config: "FrankaPickAndPlaceObjectBackfillOmniCamConfig"
  }
];

const makeMolmoBotTask = ({ task, config }) => ({
  task,
  dataLinks: {
    "train_pkgs": `${hfDatasetBase(molmoBotRepo)}/viewer/${config}/train_pkgs`,
    "val_pkgs": `${hfDatasetBase(molmoBotRepo)}/viewer/${config}/val_pkgs`
  },
  observations: ["Visual Inputs", "Proprioception", "Language"],
  actions: ["Robot Actions"],
  demos: "TBD",
  envs: "TBD",
  license: "ODC-BY 1.0"
});

const molmoBotRows = molmoBotTaskConfigs.map(makeMolmoBotTask);

const gr00tXSimRepo = "nvidia/PhysicalAI-Robotics-GR00T-X-Embodiment-Sim";
const gr00tXSimTaskFamilies = [
  {
    category: "Cross-embodied bimanual manipulation",
    tasks: [
      ["bimanual_panda_gripper.Threading", 1000],
      ["bimanual_panda_hand.LiftTray", 1000],
      ["bimanual_panda_gripper.ThreePieceAssembly", 1000],
      ["bimanual_panda_gripper.Transport", 1000],
      ["bimanual_panda_hand.BoxCleanup", 1000],
      ["bimanual_panda_hand.DrawerCleanup", 1000],
      ["gr1_arms_only.CanSort", 1000],
      ["gr1_full_upper_body.Coffee", 1000],
      ["gr1_full_upper_body.Pouring", 1000]
    ]
  },
  {
    category: "Humanoid robot tabletop manipulation",
    tasks: [
      ["gr1_arms_waist.CanToDrawer", 10000],
      ["gr1_arms_waist.CupToDrawer", 10000],
      ["gr1_arms_waist.CuttingboardToBasket", 10000],
      ["gr1_arms_waist.CuttingboardToCardboardBox", 10000],
      ["gr1_arms_waist.CuttingboardToPan", 10000],
      ["gr1_arms_waist.CuttingboardToPot", 10000],
      ["gr1_arms_waist.CuttingboardToTieredBasket", 10000],
      ["gr1_arms_waist.PlaceBottleToCabinet", 10000],
      ["gr1_arms_waist.PlaceMilkToMicrowave", 10000],
      ["gr1_arms_waist.PlacematToBasket", 10000],
      ["gr1_arms_waist.PlacematToBowl", 10000],
      ["gr1_arms_waist.PlacematToPlate", 10000],
      ["gr1_arms_waist.PlacematToTieredShelf", 10000],
      ["gr1_arms_waist.PlateToBowl", 10000],
      ["gr1_arms_waist.PlateToCardboardBox", 10000],
      ["gr1_arms_waist.PlateToPan", 10000],
      ["gr1_arms_waist.PlateToPlate", 10000],
      ["gr1_arms_waist.PotatoToMicrowave", 10000],
      ["gr1_arms_waist.TrayToCardboardBox", 10000],
      ["gr1_arms_waist.TrayToPlate", 10000],
      ["gr1_arms_waist.TrayToPot", 10000],
      ["gr1_arms_waist.TrayToTieredBasket", 10000],
      ["gr1_arms_waist.TrayToTieredShelf", 10000],
      ["gr1_arms_waist.WineToCabinet", 10000]
    ]
  },
  {
    category: "Humanoid robot tabletop manipulation - downsampled",
    tasks: [
      ["gr1_unified.PnPBottleToCabinetClose_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PnPCanToDrawerClose_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PnPCupToDrawerClose_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PnPMilkToMicrowaveClose_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PnPPotatoToMicrowaveClose_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PnPWineToCabinetClose_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromCuttingboardToBasketSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromCuttingboardToCardboardboxSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromCuttingboardToPanSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromCuttingboardToPotSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromCuttingboardToTieredbasketSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromPlacematToBasketSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromPlacematToBowlSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromPlacematToPlateSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromPlacematToTieredshelfSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromPlateToBowlSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromPlateToCardboardboxSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromPlateToPanSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromPlateToPlateSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromTrayToCardboardboxSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromTrayToPlateSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromTrayToPotSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromTrayToTieredbasketSplitA_GR1ArmsAndWaistFourierHands_1000", 1000],
      ["gr1_unified.PosttrainPnPNovelFromTrayToTieredshelfSplitA_GR1ArmsAndWaistFourierHands_1000", 1000]
    ]
  },
  {
    category: "Robot Arm Kitchen Manipulation",
    tasks: [
      ["single_panda_gripper.CloseDoubleDoor", 3000],
      ["single_panda_gripper.CloseDrawer", 3000],
      ["single_panda_gripper.CloseSingleDoor", 3000],
      ["single_panda_gripper.CoffeePressButton", 3000],
      ["single_panda_gripper.CoffeeServeMug", 3000],
      ["single_panda_gripper.CoffeeSetupMug", 3000],
      ["single_panda_gripper.OpenDoubleDoor", 3000],
      ["single_panda_gripper.OpenDrawer", 3000],
      ["single_panda_gripper.OpenSingleDoor", 3000],
      ["single_panda_gripper.PnPCabToCounter", 3000],
      ["single_panda_gripper.PnPCounterToCab", 3000],
      ["single_panda_gripper.PnPCounterToMicrowave", 3000],
      ["single_panda_gripper.PnPCounterToSink", 3000],
      ["single_panda_gripper.PnPCounterToStove", 3000],
      ["single_panda_gripper.PnPMicrowaveToCounter", 3000],
      ["single_panda_gripper.PnPSinkToCounter", 3000],
      ["single_panda_gripper.PnPStoveToCounter", 3000],
      ["single_panda_gripper.TurnOffMicrowave", 3000],
      ["single_panda_gripper.TurnOffSinkFaucet", 3000],
      ["single_panda_gripper.TurnOffStove", 3000],
      ["single_panda_gripper.TurnOnMicrowave", 3000],
      ["single_panda_gripper.TurnOnSinkFaucet", 3000],
      ["single_panda_gripper.TurnOnStove", 3000],
      ["single_panda_gripper.TurnSinkSpout", 3000]
    ]
  },
  {
    category: "Unitree G1 Loco-Manipulation",
    tasks: [
      ["unitree_g1.LMPnPAppleToPlateDC", 102]
    ]
  }
];

const makeGr00tXSimTask = ({ category, datasetName, demos }) => {
  const [embodiment, task] = datasetName.split(".");
  return {
    task: `${category} / ${embodiment} / ${task}`,
    dataLinks: {
      "HF folder": hfDatasetTree(gr00tXSimRepo, datasetName)
    },
    observations: ["Simulation Trajectories"],
    actions: ["Robot Actions"],
    demos,
    envs: embodiment,
    license: "CC BY 4.0"
  };
};

const gr00tXSimRows = gr00tXSimTaskFamilies.flatMap((family) =>
  family.tasks.map(([datasetName, demos]) => makeGr00tXSimTask({ category: family.category, datasetName, demos }))
);

const dexMimicGenRepo = "MimicGen/dexmimicgen_datasets";
const dexMimicGenTasks = [
  "two_arm_box_cleanup",
  "two_arm_can_sort_random",
  "two_arm_coffee",
  "two_arm_drawer_cleanup",
  "two_arm_lift_tray",
  "two_arm_pouring",
  "two_arm_threading",
  "two_arm_three_piece_assembly",
  "two_arm_transport"
];

const makeDexMimicGenTask = (task) => ({
  task: `generated / ${task}`,
  dataLinks: {
    HDF5: hfDatasetBlob(dexMimicGenRepo, `generated/${task}.hdf5`)
  },
  observations: ["Simulation Trajectories", "Images", "Robot State"],
  actions: ["Bimanual Dexterous Actions"],
  demos: "TBD",
  envs: "Bimanual dexterous manipulation",
  license: "CC BY-NC-SA 4.0"
});

const dexMimicGenRows = dexMimicGenTasks.map(makeDexMimicGenTask);

const dexGraspNetRepo = "lhrlhr/DexGraspNet2.0";
const dexGraspNetRows = [
  {
    task: "DexGraspNet 2.0 427M dexterous grasps",
    dataLinks: {
      HuggingFace: hfDatasetBase(dexGraspNetRepo),
      "Dex grasps": hfDatasetBlob(dexGraspNetRepo, "dex_grasps_new.tar.gz"),
      "Dex graspness": hfDatasetBlob(dexGraspNetRepo, "dex_graspness_new.tar.gz"),
      Scenes: hfDatasetTree(dexGraspNetRepo),
      Checkpoints: hfDatasetBlob(dexGraspNetRepo, "DexGraspNet2.0-ckpts.tar")
    },
    observations: ["3D Scenes", "Object Meshes", "Dexterous Grasps"],
    actions: ["Hand Grasps"],
    demos: 427000000,
    envs: "Synthetic cluttered scenes",
    license: "CC BY-NC 4.0"
  }
];

const mimicGenRepo = "amandlek/mimicgen_datasets";
const mimicGenDirectories = [
  {
    category: "source",
    demos: 10,
    tasks: [
      "coffee",
      "coffee_preparation",
      "hammer_cleanup",
      "kitchen",
      "mug_cleanup",
      "nut_assembly",
      "pick_place",
      "square",
      "stack",
      "stack_three",
      "threading",
      "three_piece_assembly"
    ]
  },
  {
    category: "core",
    demos: 1000,
    tasks: [
      "coffee_d0",
      "coffee_d1",
      "coffee_d2",
      "coffee_preparation_d0",
      "coffee_preparation_d1",
      "hammer_cleanup_d0",
      "hammer_cleanup_d1",
      "kitchen_d0",
      "kitchen_d1",
      "mug_cleanup_d0",
      "mug_cleanup_d1",
      "nut_assembly_d0",
      "pick_place_d0",
      "square_d0",
      "square_d1",
      "square_d2",
      "stack_d0",
      "stack_d1",
      "stack_three_d0",
      "stack_three_d1",
      "threading_d0",
      "threading_d1",
      "threading_d2",
      "three_piece_assembly_d0",
      "three_piece_assembly_d1",
      "three_piece_assembly_d2"
    ]
  },
  {
    category: "object",
    demos: 1000,
    tasks: [
      "mug_cleanup_o1",
      "mug_cleanup_o2"
    ]
  },
  {
    category: "robot",
    demos: 1000,
    tasks: [
      "square_d0_iiwa",
      "square_d0_panda",
      "square_d0_sawyer",
      "square_d0_ur5e",
      "square_d1_iiwa",
      "square_d1_panda",
      "square_d1_sawyer",
      "square_d1_ur5e",
      "threading_d0_iiwa",
      "threading_d0_panda",
      "threading_d0_sawyer",
      "threading_d0_ur5e",
      "threading_d1_iiwa",
      "threading_d1_panda",
      "threading_d1_sawyer",
      "threading_d1_ur5e"
    ]
  },
  {
    category: "large_interpolation",
    demos: 1000,
    tasks: [
      "coffee_d1",
      "pick_place_d0",
      "square_d1",
      "stack_d1",
      "threading_d1",
      "three_piece_assembly_d1"
    ]
  }
];

const makeMimicGenTask = ({ category, task, demos }) => ({
  task: `${category} / ${task}`,
  dataLinks: {
    HDF5: hfDatasetBlob(mimicGenRepo, `${category}/${task}.hdf5`)
  },
  observations: ["Robomimic HDF5", "Images", "Robot State"],
  actions: ["Robot Actions"],
  demos,
  envs: category,
  license: "CC BY 4.0"
});

const mimicGenRows = mimicGenDirectories.flatMap((directory) =>
  directory.tasks.map((task) => makeMimicGenTask({ ...directory, task }))
);

const dexGraspNetMirrorBase = "https://mirrors.pku.edu.cn/dl-release/DexGraspNet-ICRA2023";
const dexGraspNetClassicRows = [
  {
    task: "DexGraspNet 1.32M ShadowHand grasps",
    dataLinks: {
      Mirror: `${dexGraspNetMirrorBase}/`,
      "dexgraspnet.tar.gz": `${dexGraspNetMirrorBase}/dexgraspnet.tar.gz`,
      "meshdata.tar.gz": `${dexGraspNetMirrorBase}/meshdata.tar.gz`
    },
    observations: ["Object Meshes", "Dexterous Grasps"],
    actions: ["ShadowHand Grasps"],
    demos: 1320000,
    envs: "5355 objects",
    license: "TBD"
  }
];

const robotSectionYears = {
  daml: 2018,
  mime: 2018,
  "mt-opt": 2021,
  "open-x-embodiment": 2023,
  rh20t: 2023,
  robomind: 2024,
  "agibot-world-beta": 2024,
  actionnet: 2025,
  "aist-bimanual": 2025,
  fmb: 2025,
  "humanoid-everyday": 2025,
  "let-dataset": 2025,
  "open-galaxea": 2025,
  ph2d: 2025,
  reassemble: 2025,
  "realsource-world": 2025,
  robocoin: 2025,
  "robomind-2": 2025,
  "agibot-world-2026": 2026,
  "baihu-vtouch": 2026,
  "deco-50": 2026,
  dexora: 2026,
  haptile: 2026,
  molmoact2: 2026,
  omnivitac: 2026,
  "unitree-unifolm-wbt": 2026
};

const robotActionOverrides = {
  daml: ["EEF Pose", "Parallel gripper"],
  mime: ["Joint", "Parallel gripper"],
  "mt-opt": ["EEF Pose", "Parallel gripper"],
  rh20t: ["EEF Pose", "Joint", "Parallel gripper"],
  fmb: ["EEF Pose", "Joint", "Parallel gripper"],
  reassemble: ["EEF Pose", "Joint", "Parallel gripper"],
  ph2d: ["Joint", "Dexterous hand joint"],
  "aist-bimanual": ["Joint", "Parallel gripper"],
  robomind: ["EEF Pose", "Joint", "Parallel gripper", "Dexterous hand joint"],
  "agibot-world-beta": ["EEF Pose", "Joint"],
  actionnet: ["EEF Pose", "Joint", "Dexterous hand joint"],
  "open-galaxea": ["EEF Pose", "Joint", "Parallel gripper"],
  "realsource-world": ["EEF Pose", "Joint", "Parallel gripper"],
  "humanoid-everyday": ["Joint", "Dexterous hand joint"],
  "robomind-2": ["EEF Pose", "Joint", "Parallel gripper", "Dexterous hand joint"],
  "let-dataset": ["Joint", "Parallel gripper", "Dexterous hand joint"],
  "deco-50": ["Joint", "Dexterous hand joint"],
  dexora: ["EEF Pose", "Joint", "Dexterous hand joint"],
  molmoact2: ["Joint", "Parallel gripper"],
  "agibot-world-2026": ["EEF Pose", "Joint", "Parallel gripper", "Dexterous hand joint"],
  "unitree-unifolm-wbt": ["Joint", "Dexterous hand joint"],
  "baihu-vtouch": ["EEF Pose", "Joint", "Parallel gripper"],
  haptile: ["EEF Pose", "Joint", "Parallel gripper"],
  omnivitac: ["EEF Pose", "Parallel gripper"]
};

const robotEnvOverrides = {
  daml: 1,
  mime: 1,
  "mt-opt": 1,
  rh20t: 1,
  fmb: 1,
  reassemble: 1,
  ph2d: 1,
  "aist-bimanual": 1,
  "deco-50": 1,
  dexora: 1,
  "agibot-world-2026": 1,
  "unitree-unifolm-wbt": 1,
  haptile: 1,
  omnivitac: 1
};

const hasOwn = (object, key) => Object.prototype.hasOwnProperty.call(object, key);

const normalizeRobotActions = (actions = []) => {
  const tokens = new Set();
  const normalizedText = actions.join(" ").toLowerCase();

  if (normalizedText.includes("n/a")) return ["N/A"];
  if (normalizedText.includes("tbd")) return ["TBD"];
  if (normalizedText.includes("end effector") || normalizedText.includes("eef") || normalizedText.includes("6 dof") || normalizedText.includes("pose")) {
    tokens.add("EEF Pose");
  }
  if (normalizedText.includes("joint") || normalizedText.includes("whole-body") || normalizedText.includes("bimanual") || normalizedText.includes("robot actions")) {
    tokens.add("Joint");
  }
  if (normalizedText.includes("gripper")) {
    tokens.add("Parallel gripper");
  }
  if (normalizedText.includes("dexterous") || normalizedText.includes("hand joint") || normalizedText.includes("hand state")) {
    tokens.add("Dexterous hand joint");
  }

  return tokens.size ? Array.from(tokens) : actions;
};

const withRobotDataDisplayRules = (section) => ({
  ...section,
  rows: (section.rows || []).map((row) => ({
    ...row,
    actions: hasOwn(robotActionOverrides, section.id)
      ? robotActionOverrides[section.id]
      : normalizeRobotActions(row.actions),
    envs: hasOwn(robotEnvOverrides, section.id) ? robotEnvOverrides[section.id] : ""
  }))
});

const sortRobotSectionsByYear = (sections) =>
  sections
    .map(withRobotDataDisplayRules)
    .sort((left, right) => {
      const leftYear = robotSectionYears[left.id] || Number.MAX_SAFE_INTEGER;
      const rightYear = robotSectionYears[right.id] || Number.MAX_SAFE_INTEGER;
      return leftYear - rightYear || left.project.localeCompare(right.project);
    });

const umiCommunityUrl = "https://umi-data.github.io/#datasets";

const makeUmiRow = ({ task, dataLinks = {}, observations, actions, demos = "TBD", envs = "TBD", license = "TBD" }) => ({
  task,
  dataLinks,
  observations,
  actions,
  demos,
  envs,
  license
});

const umiDatasetSections = [
  {
    id: "umi",
    project: "UMI",
    summary: "2024 UMI-style dataset; arm type: Single / Bimanual; end effector: Gripper; listed tasks: 5.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://umi-gripper.github.io/"
    },
    citation: "@inproceedings{chi2024universal,\n    title={Universal Manipulation Interface: In-The-Wild Robot Teaching Without In-The-Wild Robots},\n    author={Chi, Cheng and Xu, Zhenjia and Pan, Chuer and Cousineau, Eric and Burchfiel, Benjamin and Feng, Siyuan and Tedrake, Russ and Song, Shuran},\n    booktitle={Proceedings of Robotics: Science and Systems (RSS)},\n    year={2024}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Bimanual Dish Washing",
        dataLinks: {"Zarr":"https://real.stanford.edu/umi/data/dish_washing/bimanual_dish_washing.zarr.zip","MP4":"https://real.stanford.edu/umi/data/dish_washing/bimanual_dish_washing_mp4s.zip"},
        observations: ["Image","Proprio","Bimanual"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 258,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Bimanual Cloth Folding",
        dataLinks: {"Zarr":"https://real.stanford.edu/umi/data/bimanual_cloth_folding/bimanual_cloth_folding.zarr.zip","MP4":"https://real.stanford.edu/umi/data/bimanual_cloth_folding/bimanual_cloth_folding_mp4s.zip"},
        observations: ["Image","Proprio","Bimanual"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 249,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Dynamic Tossing",
        dataLinks: {"Zarr":"https://real.stanford.edu/umi/data/dynamic_tossing/dynamic_tossing.zarr.zip","MP4":"https://real.stanford.edu/umi/data/dynamic_tossing/dynamic_tossing_mp4s.zip"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 284,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Cup Arrangement in the Lab",
        dataLinks: {"Zarr":"https://real.stanford.edu/umi/data/cup_arrangement/cup_in_the_lab.zarr.zip","MP4":"https://real.stanford.edu/umi/data/cup_arrangement/cup_in_lab_mp4s.zip"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 305,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Cup Arrangement in the Wild",
        dataLinks: {"Zarr":"https://real.stanford.edu/umi/data/cup_in_the_wild/cup_in_the_wild.zarr.zip","MP4":"https://real.stanford.edu/umi/data/cup_in_the_wild/cup_in_the_wild_mp4s.zip"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 1447,
        envs: 30,
        license: "MIT"
      }),
    ]
  },
  {
    id: "maniwav",
    project: "ManiWAV",
    summary: "2024 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 5.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://mani-wav.github.io/"
    },
    citation: "@article{liu2024maniwav,\n    title={ManiWAV: Learning Robot Manipulation from In-the-Wild Audio-Visual Data},\n    author={Liu, Zeyi and Chi, Cheng and Cousineau, Eric and Kuppuswamy, Naveen and Burchfiel, Benjamin and Song, Shuran},\n    journal={arXiv preprint arXiv:2406.19464},\n    year={2024}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Whiteboard Shape Wipe",
        dataLinks: {"Zarr":"https://real.stanford.edu/maniwav/data/wipe/replay_buffer.zarr.zip"},
        observations: ["Image","Proprio","Audio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 119,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Flip bagel",
        dataLinks: {"Zarr":"https://real.stanford.edu/maniwav/data/flip/replay_buffer.zarr.zip"},
        observations: ["Image","Proprio","Audio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 283,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pour dice",
        dataLinks: {"Zarr":"https://real.stanford.edu/maniwav/data/pour/replay_buffer.zarr.zip"},
        observations: ["Image","Proprio","Audio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 145,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Strap wires with velcro tape",
        dataLinks: {"Zarr":"https://real.stanford.edu/maniwav/data/velcro_tape/replay_buffer.zarr.zip"},
        observations: ["Image","Proprio","Audio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 193,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Flip bagel in the wild",
        dataLinks: {"MP4":"https://real.stanford.edu/maniwav/data/bagel_in_wild/demos/","Zarr":"https://real.stanford.edu/maniwav/data/bagel_in_wild/replay_buffer.zarr.zip"},
        observations: ["Image","Proprio","Audio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 274,
        envs: 7,
        license: "MIT"
      }),
    ]
  },
  {
    id: "umi-on-legs",
    project: "UMI on Legs",
    summary: "2024 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 2.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://umi-on-legs.github.io/"
    },
    citation: "@inproceedings{ha2024umilegs,\n  title={{UMI} on Legs: Making Manipulation Policies Mobile with Manipulation-Centric Whole-body Controllers},\n  author={Huy Ha and Yihuai Gao and Zipeng Fu and Jie Tan and Shuran Song},\n  year={2024},\n  booktitle={Proceedings of the 2024 Conference on Robot Learning},\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Kettlebell Pushing",
        dataLinks: {"MP4":"https://real.stanford.edu/umi-on-legs/pushing_2024_05_29_huy/","Zarr":"https://real.stanford.edu/umi-on-legs/pushing_2024_05_29_huy.zarr.zip"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 14,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Tennis Ball Basket Toss",
        dataLinks: {"MP4":"https://real.stanford.edu/umi-on-legs/tossing/","Zarr":"https://real.stanford.edu/umi-on-legs/tossing.zarr.zip"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 500,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "fast-umi",
    project: "FastUMI",
    summary: "2024 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 22.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://fastumi.com/"
    },
    citation: "@article{wu2024fast,\n    title={Fast-UMI: A Scalable and Hardware-Independent Universal Manipulation Interface},\n    author={Wu, Ziniu and Wang, Tianyu and Guan, Chuyue and Jia, Zhongjie and Liang, Shuai and Song, Haoming and Qu, Delin and Wang, Dong and Wang, Zhigang and Cao, Nieqing and others},\n    journal={arXiv preprint arXiv:2409.19499},\n    year={2024}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Open Container",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 251,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Fold Towel",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 243,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pick Bear",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 546,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Place Plate",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 499,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Rearrange Coke",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 500,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Sweep Trash",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 512,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Clean Table",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 100,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Unplug Charger",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 429,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pour Coke",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 398,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Cover Beef",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 517,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Hotdog in Ricecooker",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 100,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Hotdog in Roaster",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 500,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pick Lid",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 496,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Open Drawer",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 833,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Open Roaster",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 499,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pick Cup",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 895,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pick Pen",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 608,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Close Ricecooker",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 20,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Open Suitcase",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 20,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pick Bread",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 495,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Place Pot",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 300,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Open Rice Cooker",
        dataLinks: {"HDF5":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI-Data"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 204,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "data-scaling-laws",
    project: "Data Scaling Laws",
    summary: "2024 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 6.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://data-scaling-laws.github.io/"
    },
    citation: "@article{lin2024data,\n    title={Data Scaling Laws in Imitation Learning for Robotic Manipulation},\n    author={Lin, Fanqi and Hu, Yingdong and Sheng, Pingyue and Wen, Chuan and You,\n    Jiacheng and Gao, Yang},\n    journal={arXiv preprint arXiv:2410.18647},\n    year={2024}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Pour Water - Split 1",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Fanqi-Lin/Processed-Task-Dataset/tree/main/pour_water","MP4":"https://huggingface.co/datasets/Fanqi-Lin/GoPro-Raw-Videos/tree/main/pour_water"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3648,
        envs: 32,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pour Water - Split 2",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Fanqi-Lin/Processed-Task-Dataset/tree/main/pour_water_16_env_4_object","MP4":"https://huggingface.co/datasets/Fanqi-Lin/GoPro-Raw-Videos/tree/main/pour_water"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 6896,
        envs: 16,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Mouse Arrangement - Split 1",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Fanqi-Lin/Processed-Task-Dataset/tree/main/arrange_mouse","MP4":"https://huggingface.co/datasets/Fanqi-Lin/GoPro-Raw-Videos/tree/main/pick_place_mouse"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3564,
        envs: 32,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Mouse Arrangement - Split 2",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Fanqi-Lin/Processed-Task-Dataset/tree/main/arrange_mouse_16_env_4_object","MP4":"https://huggingface.co/datasets/Fanqi-Lin/GoPro-Raw-Videos/tree/main/pick_place_mouse"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 6505,
        envs: 16,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Fold Towels",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Fanqi-Lin/Processed-Task-Dataset/tree/main/fold_towel","MP4":"https://huggingface.co/datasets/Fanqi-Lin/GoPro-Raw-Videos/tree/main/fold_towel"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 1752,
        envs: 32,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Unplug Charger",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Fanqi-Lin/Processed-Task-Dataset/tree/main/unplug_charger","MP4":"https://huggingface.co/datasets/Fanqi-Lin/GoPro-Raw-Videos/tree/main/unplug_charger"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 1733,
        envs: 32,
        license: "MIT"
      }),
    ]
  },
  {
    id: "legato",
    project: "LEGATO",
    summary: "2024 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 6.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://ut-hcrl.github.io/LEGATO/"
    },
    citation: "@article{seo2024legato,\n    title={LEGATO: Cross-Embodiment Imitation Using a Grasping Tool},\n    author={Seo, Mingyo and Park, H. Andy and Yuan, Shenli and Zhu, Yuke and\n    and Sentis, Luis},\n    journal={IEEE Robotics and Automation Letters (RA-L)},\n    year={2025}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Closing The Lid (Sim)",
        dataLinks: {"HDF5":"https://utexas.box.com/s/ya7n93ybh8t69u1daq78ddjszwylka92"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 150,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Cup Shelving (Sim)",
        dataLinks: {"HDF5":"https://utexas.box.com/s/wmo0h0t8123t43vlzbysf9q2xywq2b7w"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 150,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Ladle Reorganization (Sim)",
        dataLinks: {"HDF5":"https://utexas.box.com/s/t0nia0ee26otlrgl8zo8492jiqn6ymeg"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 150,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Closing The Lid (Real)",
        dataLinks: {"HDF5":"https://utexas.box.com/s/my5qagwcfdjs2t6wk9fl7rlb35cgvh1z"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 150,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Cup Shelving (Real)",
        dataLinks: {"HDF5":"https://utexas.box.com/s/bc6nd5xegqght0dsywdnts5k8k8py1jg"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 150,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Ladle Reorganization (Real)",
        dataLinks: {"HDF5":"https://utexas.box.com/s/p971sf34sd8i5fwuwf47soojhp5788gb"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 150,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "vitamin",
    project: "ViTaMIn",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 8.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://chuanyune.github.io/ViTaMIn_page/"
    },
    citation: "@article{liu2025vitamin,\n  title={ViTaMIn: Learning Contact-Rich Tasks Through Robot-Free Visuo-Tactile Manipulation Interface},\n  author={Liu, Fangchen and Li, Chuanyu and Qin, Yihua and Shaw, Ankit and Xu, Jing and Abbeel, Pieter and Chen, Rui},\n  journal={arXiv preprint arXiv:2504.06156},\n  year={2025}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Orange Placement",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/chuanyune/ViTaMIn_dataset"},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 73,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Sponge Insertion",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/chuanyune/ViTaMIn_dataset"},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 138,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Test Tube Reorientation",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/chuanyune/ViTaMIn_dataset"},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 125,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Scissor Hanging",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/chuanyune/ViTaMIn_dataset"},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 137,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Articulated Object Manipulation",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/chuanyune/ViTaMIn_dataset"},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 83,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Dynamic Peg Insertion",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/chuanyune/ViTaMIn_dataset"},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 101,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Articulated Object Manipulation",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/chuanyune/ViTaMIn_dataset"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 83,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Dynamic Peg Insertion",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/chuanyune/ViTaMIn_dataset"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 101,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "dexwild",
    project: "DexWild",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Dexterous Hand; listed tasks: 10.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://dexwild.github.io/"
    },
    citation: "@article{tao2025dexwild,\n      title={DexWild: Dexterous Human Interactions for In-the-Wild Robot Policies},\n      author={Tao, Tony and Srirama, Mohan Kumar and Liu, Jason Jingzhou and Shaw, Kenneth and Pathak, Deepak},\n      journal={Robotics: Science and Systems (RSS)},\n      year={2025}}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Florist (Human)",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/florist_data/human"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 1030,
        envs: 15,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Florist (Robot)",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/florist_data/robot"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 248,
        envs: 3,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Clothes Folding (Human)",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/clothes_folding_data/human"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 1123,
        envs: 12,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Clothes Folding (Robot)",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/clothes_folding_data/robot"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 295,
        envs: 3,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Spray",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/spray_data/human"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 2820,
        envs: 30,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Spray (Robot)",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/spray_data/robot"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 388,
        envs: 4,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Toy Cleanup",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/toy_data/human"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 2323,
        envs: 30,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Toy Cleanup (Robot)",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/toy_data/robot"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 546,
        envs: 5,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pouring",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/pour_data/human"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 621,
        envs: 6,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pouring (Robot)",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/boardd/dexwild-dataset/tree/main/pour_data/robot"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 111,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "dexumi",
    project: "DexUMI",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Dexterous Hand; listed tasks: 5.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://umi-data.github.io/"
    },
    citation: "@article{xu2025dexumi,\n  title={DexUMI: Using Human Hand as the Universal Manipulation Interface for Dexterous Manipulation},\n  author={Xu, Mengda and Zhang, Han and Hou, Yifan and Xu, Zhenjia and Fan, Linxi and Veloso, Manuela and Song, Shuran},\n  journal={arXiv preprint arXiv:2505.21864},\n  year={2025}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Inspire Hand: Cube Picking",
        dataLinks: {"Zarr":"https://real.stanford.edu/dexumi/dataset/inspire/cube_picking.zip"},
        observations: ["Image","Proprio","Force/Torque"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 309,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Inspire Hand: Egg Carton",
        dataLinks: {"Zarr":"https://real.stanford.edu/dexumi/dataset/inspire/egg_carton.zip"},
        observations: ["Image","Proprio","Force/Torque"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 175,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Inspire Hand: Tool Using",
        dataLinks: {"Zarr":"https://real.stanford.edu/dexumi/dataset/inspire/tool_use.zip"},
        observations: ["Image","Proprio","Force/Torque"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 404,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "XHand: Tool Using",
        dataLinks: {"Zarr":"https://real.stanford.edu/dexumi/dataset/xhand/tool_use.zip"},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 440,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "XHand: Kitchen",
        dataLinks: {"Zarr":"https://real.stanford.edu/dexumi/dataset/xhand/kitchen.zip"},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Dexterous Hand"],
        demos: 464,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "freetacman",
    project: "FreeTacMan",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 50.",
    projectLinks: {
      Community: umiCommunityUrl
    },
    citation: "TBD",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "FreeTacMan dataset",
        dataLinks: {},
        observations: ["Image","Proprio","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 10000,
        envs: "TBD",
        license: "TBD"
      }),
    ]
  },
  {
    id: "touch-in-the-wild",
    project: "Touch in the Wild",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 20.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://binghao-huang.github.io/touch_in_the_wild/"
    },
    citation: "@article{zhu2025touch,\n  title={Touch in the Wild: Learning Fine-Grained Manipulation with a Portable Visuo-Tactile Gripper},\n  author={Zhu, Xinyue and Huang, Binghao and Li, Yunzhu},\n  journal={arXiv preprint arXiv:2507.15062},\n  year={2025}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Campus",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/campus"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 38,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Chipotle",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/chipotle"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 14,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Hardware Store",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/hardware_store"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 164,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Kitchen",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/kitchen"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 51,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Lawn",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/lawn"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 24,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Library",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/library"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 26,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Lounge",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/lounge"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 40,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Makerspace",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/makerspace"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 275,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Starbucks",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/in_the_wild_data/starbucks"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 50,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Fluid Transfer",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/four_tasks/fluid_transfer"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 244,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pencil Insertion",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/four_tasks/pencil_insertion"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 192,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Test Tube Collection",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/four_tasks/test_tube_collection"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 266,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Whiteboard Erasing",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/four_tasks/whiteboard_erasing"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 150,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Hex Key Insertion",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/indoor_data/hex_key_insertion"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 188,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Move Cup",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/indoor_data/moving_cup"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 107,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Move Tape",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/indoor_data/moving_tape"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 202,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Peg Insertion",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/indoor_data/peg_insertion"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 114,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Tossing",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/indoor_data/tossing"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 239,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Whiteboard Erasing (Indoor)",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/indoor_data/whiteboard_erasing"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 150,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Writing",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/binghaohuang-robot/touch_in_the_wild-dataset/tree/main/indoor_data/writing"},
        observations: ["Image","Tactile","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 203,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "exumi",
    project: "exUMI",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 8.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://silicx.github.io/exUMI/"
    },
    citation: "@inproceedings{xu2025exumi,\n  title={exUMI: Extensible Robot Teaching System with Action-aware Task-agnostic Tactile Representation},\n  author={Xu, Yue and Wei, Litao and An, Pengyu and Zhang, Qingyu and Li, Yong-Lu},\n  booktitle={Conference on Robot Learning},\n  pages={2536--2554},\n  year={2025},\n  organization={PMLR}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Pick Cube",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/silicx/exUMI/blob/main/pick_cube.zarr.zip"},
        observations: ["Image"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 208,
        envs: 8,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pick Brocolli",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/silicx/exUMI/blob/main/pick_brocolli.zarr.zip"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 170,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pick Carrot",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/silicx/exUMI/blob/main/pick_carrot.zarr.zip"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 135,
        envs: 2,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Stack Cube",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/silicx/exUMI/blob/main/stack_cube.zarr.zip"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 201,
        envs: 2,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Insert Pen",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/silicx/exUMI/blob/main/insert_pen.zarr.zip"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 139,
        envs: 2,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Open Bottle",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/silicx/exUMI/blob/main/open_bottle.zarr.zip"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 270,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Peg in Hole",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/silicx/exUMI/blob/main/peg_in_hole.zarr.zip"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 256,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Pull Drawer",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/silicx/exUMI/blob/main/pull_drawer.zarr.zip"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 281,
        envs: 4,
        license: "MIT"
      }),
    ]
  },
  {
    id: "mv-umi",
    project: "MV-UMI",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 4.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://mv-umi.github.io"
    },
    citation: "@article{rayyan2025mv,\n  title={MV-UMI: A Scalable Multi-View Interface for Cross-Embodiment Learning},\n  author={Rayyan, Omar and Abanes, John and Hafez, Mahmoud and Tzes, Anthony and Abu-Dakka, Fares},\n  journal={arXiv preprint arXiv:2509.18757},\n  year={2025}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Markers Placement (Raw View)",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/omarrayyann/mv-umi/blob/main/markers_placement_raw_data.zarr.zip"},
        observations: ["Image"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 454,
        envs: 7,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Markers Placement (Segmented View)",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/omarrayyann/mv-umi/blob/main/markers_placement_data.zarr.zip"},
        observations: ["Image"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 454,
        envs: 7,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Bottles Rack (Segmented View)",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/omarrayyann/mv-umi/blob/main/bottles_rack_data.zarr.zip"},
        observations: ["Image"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 199,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Cans Shelf Placement (Segmented View)",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/omarrayyann/mv-umi/blob/main/cans_shelf_placement.zip"},
        observations: ["Image"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 263,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "manipforce",
    project: "ManipForce",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 6.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://sites.google.com/view/manipforce/"
    },
    citation: "@article{lee2025manipforce,\n  title={ManipForce: Force-Guided Policy Learning with Frequency-Aware Representation for Contact-Rich Manipulation},\n  author={Lee, Geonhyup and Lee, Yeongjin and Kim, Kangmin and Lee, Seongju and Noh, Sangjun and Back, Seunghyeok and Lee, Kyoobin},\n  journal={arXiv preprint arXiv:2509.19047}, \n  year={2025}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Gear Assembly",
        dataLinks: {"Zarr":"https://drive.google.com/file/d/1xp4oWpiwtiqlyPAFymck2vCtmIlwp5St/view?usp=drive_link"},
        observations: ["Image","Wrist Force/Torque"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 101,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "LAN Plug Insertion",
        dataLinks: {"Zarr":"https://drive.google.com/file/d/1guFaDLcHSC4KAR6ZKASFTgtFYFHVR2QY/view?usp=drive_link"},
        observations: ["Image (x2)","Wrist Force/Torque"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 110,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Box Flipping",
        dataLinks: {"Zarr":"https://drive.google.com/file/d/1dLG6C_eU83GqNPb0TPXuTdYtUZiytz3w/view?usp=drive_link"},
        observations: ["Image (x2)","Wrist Force/Torque"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 69,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Open Lid",
        dataLinks: {"Zarr":"https://drive.google.com/file/d/1XDYeveOeoE5NtdHup5z32rGHtKq1z2MJ/view?usp=drive_link"},
        observations: ["Image (x2)","Wrist Force/Torque"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 102,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Battery Disassembly",
        dataLinks: {"Zarr":"https://drive.google.com/file/d/12QJuR_yrsMIRdqHXRVpO3uqMnF3YuV5S/view?usp=drive_link"},
        observations: ["Image (x2)","Wrist Force/Torque"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 108,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Battery Insertion",
        dataLinks: {"Zarr":"https://drive.google.com/file/d/1tx1xLhELkUJOb3JEZBpc6xfUtBFhgpfE/view?usp=drive_link"},
        observations: ["Image (x2)","Wrist Force/Torque"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 107,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "fastumi-100k",
    project: "FastUMI-100K",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 32.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://github.com/MrKeee/FastUMI-100K"
    },
    citation: "@article{liu2025fastumi100k,\n    title={FastUMI-100K: Advancing Data-driven Robotic Manipulation with a Large-scale UMI-style Dataset},\n    author={Liu, Kehui and Jia, Zhongjie and Li, Yang and Zhaxizhuoma and Chen, Pengan and Liu, Song and Liu, Xin and Zhang, Pingrui and Song, Haoming and Ye, Xinyi and others},\n    journal={arXiv preprint arXiv:2510.08022},\n    year={2025}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Prepare Tableware",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/Prepare_tableware"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3368,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Store Shoes in Shoe Cabinet",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/Store_Shoes_in_Shoe_Cabinet"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3343,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Get Plate and Spoon from Dish Rack",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/get_plate_and_spoon_from_dish_rack"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3611,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Heat Food in Microwave",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/heat_food_in_microwave"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3156,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Heat Food in Toaster Oven",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/heat_food_in_toaster_oven"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 4036,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Iron Clothes",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/iron_clothes"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 2541,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Make Sandwich",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/make_sandwich"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3104,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Open Toilet Lid",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/open_toilet_lid"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 2869,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Pour Water into Cup",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/pour_water_into_cup"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 4206,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Put Shoes into Storage Box",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/put_shoes_into_storage_box"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 4384,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Take Items out of Drawer",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/take_items_out_of_drawer"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 4137,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Wash Clothes",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/single_arm/wash_clothes"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3244,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Add Rice to Rice Cooker",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Add_Rice_to_Rice_Cooker"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 3748,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Arrange Toothbrush and Toothpaste",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Arrange_Toothbrush_and_Toothpaste"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 3952,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Clean Desktop",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Clean_Desktop"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2147,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Dispose of Desktop Debris",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Dispose_of_Desktop_Debris"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2864,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Fold the Jeans",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Fold_the_Jeans"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 3004,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Fold the Suit",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Fold_the_Suit"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2926,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Fold the T-shirt",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Fold_the_T-shirt"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 3136,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Open Double Door Cabinet",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Open_Double_Door_Cabinet"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2569,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Open Double Door Shoe Cabinet",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Open_Double_Door_Shoe_Cabinet"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 1809,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Pack Skincare Products",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Pack_Skincare_Products"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2539,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Place Pot on Induction Cooktop",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Place_Pot_on_Induction_Cooktop"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 3323,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Place Shoes and Close Shoe Cabinet",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Place_Shoes_and_Close_Shoe_Cabinet"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2035,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Pour Water into Teacup",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Pour_Water_into_Teacup"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 4244,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Put Books into Schoolbag",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Put_Books_into_Schoolbag"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 1265,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Put Clothes into Laundry Hamper",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Put_Clothes_into_Laundry_Hamper"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2974,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Put Food into Electric Oven",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Put_Food_into_Electric_Oven"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 1740,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Put Food into Microwave",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Put_Food_into_Microwave"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2161,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Take Bottle and Close Double Doors",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Take_Bottle_and_Close_Double_Doors"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2161,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Take Bottle and Place on Coaster",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Take_Bottle_and_Place_on_Coaster"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 2227,
        envs: 1,
        license: "Apache-2.0"
      }),
      makeUmiRow({
        task: "Unplug the Power Strip",
        dataLinks: {"LeRobot":"https://huggingface.co/datasets/IPEC-COMMUNITY/FastUMI_100k_lerobot/tree/main/dual_arm/Unplug_the_Power_Strip"},
        observations: ["Image","Proprio"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: "TBD",
        envs: 1,
        license: "Apache-2.0"
      }),
    ]
  },
  {
    id: "vitamin-b",
    project: "ViTaMIn-B",
    summary: "2025 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 4.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://chuanyune.github.io/ViTaMIn-B_page/"
    },
    citation: "@article{li2025vitamin,\ntitle={ViTaMIn-B: A Reliable and Efficient Visuo-Tactile Bimanual Manipulation Interface},\nauthor={Li, Chuanyu and Liu, Chaoyi and Wang, Daotan and Zhang, Shuyu and Li, Lusong and Zeng, Zecui and Liu, Fangchen and Xu, Jing and Chen, Rui},\njournal={arXiv preprint arXiv:2511.05858},\nyear={2025}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Weight Placement",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/chuanyune/ViTaMIn-B_data_and_ckpt/tree/main"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 123,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Bean Scooping",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/chuanyune/ViTaMIn-B_data_and_ckpt/tree/main"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 345,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Cube Storage",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/chuanyune/ViTaMIn-B_data_and_ckpt/tree/main"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 195,
        envs: 1,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Beaker Wiping",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/chuanyune/ViTaMIn-B_data_and_ckpt/tree/main"},
        observations: ["Image","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 181,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "humi",
    project: "HuMI",
    summary: "2026 UMI-style dataset; arm type: Bimanual; end effector: Gripper; listed tasks: 5.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://humanoid-manipulation-interface.github.io/"
    },
    citation: "@article{nai2026humanoid,\n  title={Humanoid Manipulation Interface: Humanoid Whole-Body Manipulation from Robot-Free Demonstrations},\n  author={Nai, Ruiqian and Zheng, Boyuan and Zhao, Junming and Zhu, Haodong and Dai, Sicong and Chen, Zunhao and Hu, Yihang and Hu, Yingdong and Zhang, Tong and Wen, Chuan and others},\n  journal={arXiv preprint arXiv:2602.06643},\n  year={2026}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Marriage Proposal",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Richard-Nai/HuMI-Zarrs/tree/main/proposal","Raw Data":"https://huggingface.co/datasets/Richard-Nai/HuMI-Raw-Data/tree/main/proposal","LeRobot":"https://huggingface.co/datasets/Richard-Nai/HuMI-Proposal"},
        observations: ["Image","Proprio","Bimanual"],
        actions: ["6 DoF Poses","Parallel Gripper","Bimanual","Pelvis","Feet"],
        demos: 103,
        envs: 1,
        license: "CC BY 4.0"
      }),
      makeUmiRow({
        task: "Walk & Clean Table",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Richard-Nai/HuMI-Zarrs/tree/main/walk-clean-table","Raw Data":"https://huggingface.co/datasets/Richard-Nai/HuMI-Raw-Data/tree/main/walk-clean-table","LeRobot":"https://huggingface.co/datasets/Richard-Nai/HuMI-Walk-Clean-Table"},
        observations: ["Image","Proprio","Bimanual"],
        actions: ["6 DoF Poses","Parallel Gripper","Bimanual","Pelvis","Feet"],
        demos: 105,
        envs: 1,
        license: "CC BY 4.0"
      }),
      makeUmiRow({
        task: "Unsheathe Sword",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Richard-Nai/HuMI-Zarrs/tree/main/unsheathe","Raw Data":"https://huggingface.co/datasets/Richard-Nai/HuMI-Raw-Data/tree/main/unsheathe-sword","LeRobot":"https://huggingface.co/datasets/Richard-Nai/HuMI-Unsheathe"},
        observations: ["Image","Proprio","Bimanual"],
        actions: ["6 DoF Poses","Parallel Gripper","Bimanual","Pelvis","Feet"],
        demos: 105,
        envs: 1,
        license: "CC BY 4.0"
      }),
      makeUmiRow({
        task: "Dynamic Toss",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Richard-Nai/HuMI-Zarrs/tree/main/toss","Raw Data":"https://huggingface.co/datasets/Richard-Nai/HuMI-Raw-Data/tree/main/toss","LeRobot":"https://huggingface.co/datasets/Richard-Nai/HuMI-Toss"},
        observations: ["Image","Proprio","Bimanual"],
        actions: ["6 DoF Poses","Parallel Gripper","Bimanual","Pelvis","Feet"],
        demos: 104,
        envs: 1,
        license: "CC BY 4.0"
      }),
      makeUmiRow({
        task: "Squat & Pick Ground",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/Richard-Nai/HuMI-Zarrs/tree/main/squat-pick-ground","Raw Data":"https://huggingface.co/datasets/Richard-Nai/HuMI-Raw-Data/tree/main/squat-pick-ground","LeRobot":"https://huggingface.co/datasets/Richard-Nai/HuMI-Squat-Pick-Ground"},
        observations: ["Image","Proprio","Bimanual"],
        actions: ["6 DoF Poses","Parallel Gripper","Bimanual","Pelvis","Feet"],
        demos: 410,
        envs: 7,
        license: "CC BY 4.0"
      }),
    ]
  },
  {
    id: "genrobot",
    project: "GenRobot",
    summary: "2026 UMI-style dataset; arm type: Bimanual; end effector: Gripper; listed tasks: Diverse.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://www.genrobot.ai/"
    },
    citation: "TBD",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Diverse",
        dataLinks: {"HuggingFace":"https://huggingface.co/datasets/genrobot2025/10Kh-RealOmin-OpenData"},
        observations: ["Image","Proprio","Bimanual","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 789772,
        envs: "Many",
        license: "CC BY-SA 4.0"
      }),
    ]
  },
  {
    id: "umi-3d",
    project: "UMI-3D",
    summary: "2026 UMI-style dataset; arm type: Single; end effector: Gripper; listed tasks: 3.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://umi-3d.github.io/"
    },
    citation: "@misc{wang2026umi3dextendinguniversalmanipulation,\n  title={UMI-3D: Extending Universal Manipulation Interface from Vision-Limited to 3D Spatial Perception},\n  author={Ziming Wang},\n  year={2026},\n  eprint={2604.14089},\n  archivePrefix={arXiv},\n  primaryClass={cs.RO},\n  url={https://arxiv.org/abs/2604.14089}\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Cup-to-Saucer Placement",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/ZIMBOT/umi-3d-dataset-cup","Rosbag":"https://pan.baidu.com/s/1ukL6oDFspRRjbqr6Vdy5VQ?pwd=kyg6"},
        observations: ["Image","Proprio","Point Cloud"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 3500,
        envs: 4,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Curtain Pulling",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/ZIMBOT/umi-3d-dataset-curtain","Rosbag":"https://pan.baidu.com/s/1-ZTBTXOFqplpWlRUnBSAIQ?pwd=4m3j"},
        observations: ["Image","Proprio","Point Cloud"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 769,
        envs: 3,
        license: "MIT"
      }),
      makeUmiRow({
        task: "Door Opening and Cup Placement",
        dataLinks: {"Zarr":"https://huggingface.co/datasets/ZIMBOT/umi-3d-dataset-door-cup","Rosbag":"https://pan.baidu.com/s/1QVurpNRc9u0ERTpR_iixhg?pwd=k5nb"},
        observations: ["Image","Proprio","Point Cloud"],
        actions: ["6 DoF EEF Pose","Parallel Gripper"],
        demos: 340,
        envs: 1,
        license: "MIT"
      }),
    ]
  },
  {
    id: "tamen",
    project: "TAMEn",
    summary: "2026 UMI-style dataset; arm type: Bimanual; end effector: Gripper; listed tasks: 4.",
    projectLinks: {
      Community: umiCommunityUrl,
      Project: "https://opendrivelab.com/TAMEn"
    },
    citation: "@misc{wu2026tamentactileawaremanipulationengine,\n      title={TAMEn: Tactile-Aware Manipulation Engine for Closed-Loop Data Collection in Contact-Rich Tasks},\n      author={Longyan Wu and Jieji Ren and Chenghang Jiang and Junxi Zhou and Shijia Peng and Ran Huang and Guoying Gu and Li Chen and Hongyang Li},\n      year={2026},\n      eprint={2604.07335},\n      archivePrefix={arXiv},\n      primaryClass={cs.RO},\n      url={https://arxiv.org/abs/2604.07335},\n}",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Cable Mounting",
        dataLinks: {"MP4":"https://huggingface.co/datasets/OpenDriveLab-org/TAMEn/tree/main/Cable_Mounting"},
        observations: ["Image","Proprio","Bimanual","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 271,
        envs: 1,
        license: "CC BY-NC-SA 4.0"
      }),
      makeUmiRow({
        task: "Binder Clip Removal",
        dataLinks: {"MP4":"https://huggingface.co/datasets/OpenDriveLab-org/TAMEn/tree/main/Binder_Clip_Removal"},
        observations: ["Image","Proprio","Bimanual","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 159,
        envs: 1,
        license: "CC BY-NC-SA 4.0"
      }),
      makeUmiRow({
        task: "Dish Washing",
        dataLinks: {"MP4":"https://huggingface.co/datasets/OpenDriveLab-org/TAMEn/tree/main/Dish_Washing"},
        observations: ["Image","Proprio","Bimanual","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 148,
        envs: 1,
        license: "CC BY-NC-SA 4.0"
      }),
      makeUmiRow({
        task: "Herbal Transfer",
        dataLinks: {"MP4":"https://huggingface.co/datasets/OpenDriveLab-org/TAMEn/tree/main/Herbal_Transfer"},
        observations: ["Image","Proprio","Bimanual","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: 146,
        envs: 1,
        license: "CC BY-NC-SA 4.0"
      }),
    ]
  },
  {
    id: "daimon-infinity",
    project: "Daimon-Infinity",
    summary: "2026 UMI-style dataset; arm type: Bimanual; end effector: Gripper; listed tasks: TBD.",
    projectLinks: {
      Community: umiCommunityUrl
    },
    citation: "TBD",
    defaultOpen: false,
    rows: [
      makeUmiRow({
        task: "Daimon-Infinity dataset",
        dataLinks: {},
        observations: ["Image","Proprio","Bimanual","Tactile"],
        actions: ["6 DoF EEF Pose","Parallel Gripper","Bimanual"],
        demos: "TBD",
        envs: "TBD",
        license: "TBD"
      }),
    ]
  },
];

const umiSectionYears = {
  umi: 2024,
  maniwav: 2024,
  "umi-on-legs": 2024,
  "fast-umi": 2024,
  "data-scaling-laws": 2024,
  legato: 2024,
  vitamin: 2025,
  dexwild: 2025,
  dexumi: 2025,
  freetacman: 2025,
  "touch-in-the-wild": 2025,
  exumi: 2025,
  "mv-umi": 2025,
  manipforce: 2025,
  "fastumi-100k": 2025,
  "vitamin-b": 2025,
  humi: 2026,
  genrobot: 2026,
  "umi-3d": 2026,
  tamen: 2026,
  "daimon-infinity": 2026
};

const sortUmiSectionsByYear = (sections) =>
  [...sections].sort((left, right) => {
    const leftYear = umiSectionYears[left.id] || Number.MAX_SAFE_INTEGER;
    const rightYear = umiSectionYears[right.id] || Number.MAX_SAFE_INTEGER;
    return leftYear - rightYear || left.project.localeCompare(right.project);
  });

const datasetGroups = [
  {
    id: "robot-data",
    project: "Robot Data",
    source: "robot",
    summary: "Real robot demonstrations and robot-platform datasets.",
    defaultOpen: true,
    sections: sortRobotSectionsByYear([
      {
        id: "open-x-embodiment",
        project: "Open X-Embodiment",
        summary: "Large-scale real robot dataset collection in RLDS format. Rows are indexed by source collection because the public bucket exposes dataset directories rather than stable task-level archives.",
        projectLinks: {
          "GCS Bucket": openXBucketConsoleBase,
          Paper: "https://arxiv.org/abs/2310.08864",
          Project: "https://robotics-transformer-x.github.io/"
        },
        citation: `@article{openxembodiment2023,
  title={Open X-Embodiment: Robotic Learning Datasets and RT-X Models},
  author={Open X-Embodiment Collaboration and O'Neill, Abby and Rehman, Abdul and Gupta, Abhinav and Maddukuri, Abhiram and Gupta, Abhishek and Padalkar, Abhishek and others},
  journal={arXiv preprint arXiv:2310.08864},
  year={2023}
}`,
        defaultOpen: true,
        rows: openXEmbodimentRows
      },
      ...additionalRobotDataSections
    ])
  },
  {
    id: "umi-data",
    project: "UMI Data",
    source: "umi",
    summary: "Universal Manipulation Interface and UMI-style real-world manipulation datasets from the UMI community registry.",
    defaultOpen: false,
    sections: sortUmiSectionsByYear(umiDatasetSections)
  },
  {
    id: "simulation-data",
    project: "Simulation Data",
    source: "simulation",
    summary: "Simulation datasets grouped by dataset collection.",
    defaultOpen: true,
    sections: [
      {
        id: "interndata-a1",
        project: "InternData-A1",
        summary: "Simulation manipulation dataset from InternRobotics. This group indexes all visible sim task archives across articulation, basic, long-horizon, and pick-and-place task folders.",
        projectLinks: {
          HuggingFace: `${hfA1TreeBase}`,
          "sim/articulation_tasks": `${hfA1TreeBase}/sim/articulation_tasks`,
          "sim/basic_tasks": `${hfA1TreeBase}/sim/basic_tasks`,
          "sim/long_horizon_tasks": `${hfA1TreeBase}/sim/long_horizon_tasks`,
          "sim/pick_and_place_tasks": `${hfA1TreeBase}/sim/pick_and_place_tasks`,
          Paper: "https://arxiv.org/abs/2511.16651"
        },
        citation: `@inproceedings{tian2026interndata,
  title={Interndata-a1: Pioneering high-fidelity synthetic data for pre-training generalist policy},
  author={Tian, Yang and Yang, Yuyin and Xie, Yiman and Cai, Zetao and Shi, Xu and Gao, Ning and Liu, Hangxu and Jiang, Xuekun and Qiu, Zherui and Yuan, Feng and others},
  booktitle={Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition},
  pages={976--985},
  year={2026}
}`,
        defaultOpen: true,
        rows: internDataA1Rows
      },
      {
        id: "interndata-m1",
        project: "InternData-M1",
        summary: "Gated InternRobotics simulation dataset with LeRobot parquet/video episodes and rich frame-based annotations. The public structure exposes agilex, franka, and robotiq subdatasets rather than task-named archives.",
        projectLinks: {
          HuggingFace: hfDatasetBase(internDataM1Repo),
          "simulated/agilex": hfDatasetTree(internDataM1Repo, "simulated/agilex"),
          "simulated/franka": hfDatasetTree(internDataM1Repo, "simulated/franka"),
          "simulated/robotiq": hfDatasetTree(internDataM1Repo, "simulated/robotiq")
        },
        citation: `@misc{interndata_m1_2025,
  title={InternData-M1},
  author={InternRobotics},
  year={2025},
  howpublished={\\url{https://huggingface.co/datasets/InternRobotics/InternData-M1}}
}`,
        defaultOpen: true,
        rows: internDataM1Rows
      },
      {
        id: "molmobot-data",
        project: "MolmoB0T",
        summary: "Simulation manipulation dataset for MolmoB0T. Rows index the Hugging Face task configs exposed by the dataset card rather than individual package shards.",
        projectLinks: {
          HuggingFace: hfDatasetBase(molmoBotRepo),
          "Data files": hfDatasetTree(molmoBotRepo),
          "bulk_download.py": hfDatasetBlob(molmoBotRepo, "bulk_download.py"),
          Paper: "https://arxiv.org/abs/2603.16861",
          Project: "https://allenai.github.io/MolmoBot/",
          Code: "https://github.com/allenai/MolmoBot"
        },
        citation: `@misc{liu2026molmobotlargescalesimulationenables,
  title={MolmoB0T: Large-Scale Simulation Enables Zero-Shot Manipulation},
  author={Xiao Liu and Rutav Shah and Kaiyuan Chen and Dirk Groeneveld and Jack Dvorkin and Alex Spangher and Kyle Lo and Christopher Clark and Alexander Khazatsky and Noah Smith and Dieter Fox and Ranjay Krishna},
  year={2026},
  eprint={2603.16861},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2603.16861}
}`,
        defaultOpen: true,
        rows: molmoBotRows
      },
      {
        id: "nvidia-gr00t-x-sim",
        project: "NVIDIA GR00T-X Sim",
        summary: "Synthetic cross-embodiment robotics trajectories for GR00T-X post-training. Rows are indexed by the Hugging Face dataset folders listed on the dataset card.",
        projectLinks: {
          HuggingFace: hfDatasetBase(gr00tXSimRepo),
          "Data files": hfDatasetTree(gr00tXSimRepo),
          GitHub: "https://github.com/NVIDIA/Isaac-GR00T",
          Paper: "https://arxiv.org/abs/2503.14734"
        },
        citation: `@misc{nvidia2025gr00tn1openfoundation,
  title={GR00T N1: An Open Foundation Model for Generalist Humanoid Robots},
  author={NVIDIA and Johan Bjorck and Fernando Castaneda and Nikita Cherniadev and Xingye Da and Runyu Ding and Linxi Fan and Yu Fang and Dieter Fox and Fengyuan Hu and Spencer Huang and Joel Jang and Zhenyu Jiang and Jan Kautz and Kaushil Kundalia and Lawrence Lao and Zhiqi Li and Zongyu Lin and Kevin Lin and Guilin Liu and Edith Llontop and Loic Magne and Ajay Mandlekar and Avnish Narayan and Soroush Nasiriany and Scott Reed and You Liang Tan and Guanzhi Wang and Zu Wang and Jing Wang and Qi Wang and Jiannan Xiang and Yuqi Xie and Yinzhen Xu and Zhenjia Xu and Seonghyeon Ye and Zhiding Yu and Ao Zhang and Hao Zhang and Yizhou Zhao and Ruijie Zheng and Yuke Zhu},
  year={2025},
  eprint={2503.14734},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2503.14734}
}`,
        defaultOpen: true,
        rows: gr00tXSimRows
      },
      {
        id: "dexmimicgen",
        project: "DexMimicGen",
        summary: "Generated bimanual dexterous manipulation demonstrations from DexMimicGen. Rows index the task-named HDF5 files under the Hugging Face generated folder.",
        projectLinks: {
          HuggingFace: hfDatasetBase(dexMimicGenRepo),
          generated: hfDatasetTree(dexMimicGenRepo, "generated"),
          Paper: "https://arxiv.org/abs/2410.24185",
          Project: "https://dexmimicgen.github.io/",
          Code: "https://github.com/NVlabs/dexmimicgen"
        },
        citation: `@misc{jiang2025dexmimicgenautomateddatageneration,
  title={DexMimicGen: Automated Data Generation for Bimanual Dexterous Manipulation via Imitation Learning},
  author={Jiang, Zhenyu and Xie, Yuqi and Lin, Kevin and Xu, Zhenjia and Wan, Weikang and Mandlekar, Ajay and Fan, Linxi and Zhu, Yuke},
  year={2025},
  eprint={2410.24185},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2410.24185}
}`,
        defaultOpen: true,
        rows: dexMimicGenRows
      },
      {
        id: "dexgraspnet-2",
        project: "DexGraspNet 2.0",
        summary: "Large-scale synthetic dexterous grasping dataset. The public repo exposes grasp archives, graspness archives, scenes, models, and checkpoints rather than task-level trajectories.",
        projectLinks: {
          HuggingFace: hfDatasetBase(dexGraspNetRepo),
          Paper: "https://arxiv.org/abs/2410.23004",
          Project: "https://pku-epic.github.io/DexGraspNet2.0/"
        },
        citation: `@misc{zhang2024dexgraspnet20learninggenerative,
  title={DexGraspNet 2.0: Learning Generative Dexterous Grasping in Large-scale Synthetic Cluttered Scenes},
  author={Zhang, Jialiang and Liu, Haoran and Li, Danshi and Yu, Xinqiang and Geng, Haoran and Ding, Yufei and Chen, Jiayi and Wang, He},
  year={2024},
  eprint={2410.23004},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2410.23004}
}`,
        defaultOpen: true,
        rows: dexGraspNetRows
      },
      {
        id: "mimicgen",
        project: "MimicGen",
        summary: "Scalable robot-learning datasets generated by MimicGen. Rows index task-named Robomimic-compatible HDF5 files across source, core, object, robot, and large-interpolation splits.",
        projectLinks: {
          HuggingFace: hfDatasetBase(mimicGenRepo),
          source: hfDatasetTree(mimicGenRepo, "source"),
          core: hfDatasetTree(mimicGenRepo, "core"),
          object: hfDatasetTree(mimicGenRepo, "object"),
          robot: hfDatasetTree(mimicGenRepo, "robot"),
          large_interpolation: hfDatasetTree(mimicGenRepo, "large_interpolation"),
          Paper: "https://arxiv.org/abs/2310.17596",
          Project: "https://mimicgen.github.io/",
          Code: "https://github.com/NVlabs/mimicgen"
        },
        citation: `@inproceedings{mandlekar2023mimicgen,
  title={MimicGen: A Data Generation System for Scalable Robot Learning using Human Demonstrations},
  author={Mandlekar, Ajay and Nasiriany, Soroush and Wen, Bowen and Akinola, Iretiayo and Narang, Yashraj and Fan, Linxi and Zhu, Yuke and Fox, Dieter},
  booktitle={7th Annual Conference on Robot Learning},
  year={2023}
}`,
        defaultOpen: true,
        rows: mimicGenRows
      },
      {
        id: "dexgraspnet",
        project: "DexGraspNet",
        summary: "Original DexGraspNet ICRA 2023 release from the PKU mirror. The mirror exposes grasp and mesh archives rather than task-level trajectories.",
        projectLinks: {
          Mirror: `${dexGraspNetMirrorBase}/`,
          Paper: "https://arxiv.org/abs/2210.02697",
          Project: "https://pku-epic.github.io/DexGraspNet/"
        },
        citation: `@misc{wang2023dexgraspnetlargescaleroboticdexterous,
  title={DexGraspNet: A Large-Scale Robotic Dexterous Grasp Dataset for General Objects Based on Simulation},
  author={Wang, Ruicheng and Zhang, Jialiang and Chen, Jiayi and Xu, Yinzhen and Li, Puhao and Liu, Tengyu and Wang, He},
  year={2023},
  eprint={2210.02697},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2210.02697}
}`,
        defaultOpen: true,
        rows: dexGraspNetClassicRows
      }
    ]
  },
  {
    id: "ego-data",
    project: "Ego Data",
    source: "ego",
    summary: "Ego-centric human demonstration data for robot learning and observation modeling.",
    defaultOpen: false,
    rows: [
      {
        task: "Ego-centric Demonstrations",
        dataLinks: {},
        observations: ["Ego RGB", "Hand Pose", "Language"],
        actions: ["Human Action", "Object Interaction"],
        demos: "TBD",
        envs: "TBD",
        license: "TBD"
      }
    ]
  },
  {
    id: "general-data",
    project: "General Data",
    source: "general",
    summary: "General-purpose datasets, metadata, schemas, and auxiliary robot-learning resources.",
    defaultOpen: false,
    rows: [
      {
        task: "General Metadata",
        dataLinks: {},
        observations: ["Metadata", "Documentation"],
        actions: ["N/A"],
        demos: "TBD",
        envs: "TBD",
        license: "TBD"
      }
    ]
  }
];

const groupOpenState = Object.fromEntries(datasetGroups.map((group) => [group.id, group.defaultOpen]));
const sectionOpenState = Object.fromEntries(
  datasetGroups.flatMap((group) =>
    (group.sections || []).map((section) => [section.id, section.defaultOpen])
  )
);

const sourceLabels = {
  robot: "Robot Data",
  umi: "UMI Data",
  simulation: "Simulation Data",
  ego: "Ego Data",
  general: "General Data"
};

const entryYears = {
  "open-x-embodiment": 2023,
  robomind: 2024,
  "agibot-world-beta": 2024,
  actionnet: 2025,
  "open-galaxea": 2025,
  "realsource-world": 2025,
  robocoin: 2025,
  "humanoid-everyday": 2025,
  "robomind-2": 2025,
  molmoact2: 2026,
  "baihu-vtouch": 2026,
  "let-dataset": 2025,
  daml: 2018,
  mime: 2018,
  "mt-opt": 2021,
  rh20t: 2023,
  fmb: 2025,
  reassemble: 2025,
  ph2d: 2025,
  "aist-bimanual": 2025,
  "deco-50": 2026,
  dexora: 2026,
  "agibot-world-2026": 2026,
  "unitree-unifolm-wbt": 2026,
  haptile: 2026,
  omnivitac: 2026,
  umi: 2024,
  maniwav: 2024,
  "umi-on-legs": 2024,
  "fast-umi": 2024,
  "data-scaling-laws": 2024,
  legato: 2024,
  vitamin: 2025,
  dexwild: 2025,
  dexumi: 2025,
  freetacman: 2025,
  "touch-in-the-wild": 2025,
  exumi: 2025,
  "mv-umi": 2025,
  manipforce: 2025,
  "fastumi-100k": 2025,
  "vitamin-b": 2025,
  humi: 2026,
  genrobot: 2026,
  "umi-3d": 2026,
  tamen: 2026,
  "daimon-infinity": 2026,
  "interndata-a1": 2026,
  "interndata-m1": 2025,
  "molmobot-data": 2026,
  "nvidia-gr00t-x-sim": 2025,
  dexmimicgen: 2025,
  "dexgraspnet-2": 2024,
  mimicgen: 2023,
  dexgraspnet: 2023
};

const formatNumber = (value) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("en-US").format(value);
};

const formatSource = (source) => sourceLabels[source] || source;

const unique = (items) => [...new Set(items)];

const getGroupRows = (group) => group.sections
  ? group.sections.flatMap((section) => section.rows)
  : group.rows;

const getAllRows = () => datasetGroups.flatMap((group) =>
  group.sections
    ? group.sections.flatMap((section) => section.rows.map((row) => ({ ...row, group, section })))
    : group.rows.map((row) => ({ ...row, group }))
);

const normalize = (value) => String(value || "").toLowerCase();

const escapeHtml = (value) => String(value || "")
  .replaceAll("&", "&amp;")
  .replaceAll("<", "&lt;")
  .replaceAll(">", "&gt;")
  .replaceAll('"', "&quot;")
  .replaceAll("'", "&#039;");

const tagList = (items) => `
  <div class="tag-list">
    ${items.map((item) => `<span class="mini-tag">${item}</span>`).join("")}
  </div>
`;

const linkList = (links) => {
  const entries = Object.entries(links).flatMap(([label, href]) =>
    Array.isArray(href) ? href.map((singleHref) => [label, singleHref]) : [[label, href]]
  );
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

const citationBlock = (citation) => {
  if (!citation) return '<span class="muted">-</span>';
  return `
    <details class="citation-details">
      <summary>BibTeX</summary>
      <pre><code>${escapeHtml(citation)}</code></pre>
    </details>
  `;
};

const getEntryYear = (entry) => entry?.year || entryYears[entry?.id];

const yearPill = (entry) => {
  const year = getEntryYear(entry);
  return year ? `<span class="pill year-pill">${escapeHtml(year)}</span>` : "";
};

const rowMatchesFilters = (row, group, section) => {
  const query = normalize(document.querySelector("#searchInput").value.trim());
  const source = document.querySelector("#sourceFilter").value;
  const task = document.querySelector("#taskFilter").value;
  const haystack = normalize([
    group.project,
    group.source,
    group.summary,
    section?.project,
    section?.summary,
    getEntryYear(section),
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
  .map((group) => {
    if (group.sections) {
      const sections = group.sections
        .map((section) => ({
          ...section,
          rows: section.rows.filter((row) => rowMatchesFilters(row, group, section))
        }))
        .filter((section) => section.rows.length);
      return { ...group, sections, rows: sections.flatMap((section) => section.rows) };
    }

    return {
      ...group,
      rows: group.rows.filter((row) => rowMatchesFilters(row, group))
    };
  })
  .filter((group) => group.rows.length);

const renderStats = () => {
  const rows = getAllRows();
  const totalDemos = rows.reduce((sum, item) => sum + (typeof item.demos === "number" ? item.demos : 0), 0);
  const stats = [
    ["Parent categories", datasetGroups.length],
    ["Task rows", rows.length],
    ["Simulation rows", rows.filter((item) => item.group.source === "simulation").length],
    ["Robot rows", rows.filter((item) => item.group.source === "robot").length]
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
    const rows = getGroupRows(group);
    const demos = rows.reduce((sum, item) => sum + (typeof item.demos === "number" ? item.demos : 0), 0);
    return `
      <article class="task-card">
        <h3>${group.project}</h3>
        <p>${group.summary}</p>
        <div class="task-meta">
          <span class="pill ${group.source}">${formatSource(group.source)}</span>
          <span class="pill">${rows.length} task rows</span>
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
  const sourceActive = document.querySelector("#sourceFilter").value !== "all";
  const taskActive = document.querySelector("#taskFilter").value !== "all";

  document.querySelector("#datasetRows").innerHTML = groups.map((group) => {
    const isOpen = queryActive || sourceActive || taskActive || groupOpenState[group.id];
    const hasSections = Boolean(group.sections?.length);
    const groupRow = `
      <tr class="group-row" data-group="${group.id}">
        <td colspan="7">
          <button class="group-toggle" type="button" data-group="${group.id}" aria-expanded="${isOpen}">
            <span class="chevron" aria-hidden="true">${isOpen ? "v" : ">"}</span>
            <span class="dataset-name">${group.project}</span>
            ${yearPill(group)}
            <span class="pill ${group.source}">${formatSource(group.source)}</span>
            <span class="dataset-sub">${group.rows.length} task rows</span>
          </button>
          <span class="group-summary">${group.summary}</span>
          ${projectLinkList(group.projectLinks)}
        </td>
        <td>${citationBlock(group.citation)}</td>
      </tr>
    `;

    const renderTaskRow = (row, parentId) => `
      <tr class="task-row${parentId === group.id ? "" : " section-task-row"}" data-group="${group.id}" data-parent="${parentId}">
        <td>
          <span class="task-name">${row.task}</span>
        </td>
        <td>${linkList(row.dataLinks)}</td>
        <td>${tagList(row.observations)}</td>
        <td>${tagList(row.actions)}</td>
        <td>${formatNumber(row.demos)}</td>
        <td>${formatNumber(row.envs)}</td>
        <td>${row.license}</td>
        <td>${citationBlock(row.citation)}</td>
      </tr>
    `;

    const sectionRows = hasSections && isOpen ? group.sections.map((section) => {
      const isSectionOpen = queryActive || sourceActive || taskActive || sectionOpenState[section.id];
      const sectionRow = `
        <tr class="section-row" data-group="${group.id}" data-section="${section.id}">
          <td colspan="7">
            <button class="section-toggle" type="button" data-section="${section.id}" aria-expanded="${isSectionOpen}">
              <span class="chevron" aria-hidden="true">${isSectionOpen ? "v" : ">"}</span>
              <span class="dataset-name">${section.project}</span>
              ${yearPill(section)}
              <span class="dataset-sub">${section.rows.length} task rows</span>
            </button>
            <span class="group-summary">${section.summary}</span>
            ${projectLinkList(section.projectLinks)}
          </td>
          <td>${citationBlock(section.citation)}</td>
        </tr>
      `;
      const tasks = isSectionOpen
        ? section.rows.map((row) => renderTaskRow(row, section.id)).join("")
        : "";

      return sectionRow + tasks;
    }).join("") : "";

    const childRows = !hasSections && isOpen
      ? group.rows.map((row) => renderTaskRow(row, group.id)).join("")
      : "";

    return groupRow + sectionRows + childRows;
  }).join("") || `
    <tr>
      <td colspan="8" class="muted">No dataset rows match the current filters.</td>
    </tr>
  `;

  document.querySelectorAll(".group-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const groupId = button.dataset.group;
      groupOpenState[groupId] = !groupOpenState[groupId];
      renderRows();
    });
  });

  document.querySelectorAll(".section-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionId = button.dataset.section;
      sectionOpenState[sectionId] = !sectionOpenState[sectionId];
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
