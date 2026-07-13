const hfA1TreeBase = "https://huggingface.co/datasets/InternRobotics/InternData-A1/tree/main";
const hfA1BlobBase = "https://huggingface.co/datasets/InternRobotics/InternData-A1/blob/main";
const openXBucketConsoleBase = "https://console.cloud.google.com/storage/browser/gdm-robotics-open-x-embodiment";

const openXEmbodimentSources = [
  {
    name: "RT-1",
    path: "fractal20220817_data",
    embodiment: "RT-1"
  },
  {
    name: "QT-OPT",
    path: "kuka",
    embodiment: "QT-OPT"
  },
  {
    name: "BridgeData / BridgeData V2",
    path: "bridge",
    embodiment: "BridgeData"
  },
  {
    name: "RoboTurk",
    path: "roboturk",
    embodiment: "RoboTurk"
  },
  {
    name: "Furniture-Bench",
    path: "furniture_bench_dataset_converted_externally_to_rlds",
    embodiment: "Furniture-Bench"
  },
  {
    name: "BC-Z",
    path: "bc_z",
    embodiment: "BC-Z"
  },
  {
    name: "RoboNet",
    path: "robo_net",
    embodiment: "RoboNet"
  },
  {
    name: "DROID",
    path: null,
    embodiment: "DROID"
  },
  {
    name: "Mobile-Aloha",
    path: null,
    embodiment: "Mobile-Aloha"
  },
  {
    name: "RoboSet",
    path: null,
    embodiment: "RoboSet"
  }
];

const makeOpenXEmbodimentRow = ({ name, path, embodiment }) => ({
  task: name,
  dataLinks: {
    "GCS folder": path ? `${openXBucketConsoleBase}/${path}` : openXBucketConsoleBase
  },
  observations: ["RLDS", "Robot Observations", "Varies by source"],
  actions: ["Robot Actions", "Varies by source"],
  demos: "TBD",
  envs: embodiment,
  license: "See source"
});

const openXEmbodimentRows = openXEmbodimentSources.map(makeOpenXEmbodimentRow);

const hfDatasetBase = (repo) => `https://huggingface.co/datasets/${repo}`;
const hfDatasetTree = (repo, path = "") => `${hfDatasetBase(repo)}/tree/main${path ? `/${path}` : ""}`;
const hfDatasetBlob = (repo, path) => `${hfDatasetBase(repo)}/blob/main/${path}`;

const roboVerseRepo = "RoboVerseOrg/roboverse_data";
const genManipRepo = "Axi404/GenManip-Dataset-OOC_Bench";
const roboCerebraRepo = "qiukingballball/RoboCerebra";
const roboTwin2Repo = "TianxingChen/RoboTwin2.0";
const vlaBenchPrimitiveRepo = "VLABench/vlabench_primitive_ft_lerobot_video";
const vlaBenchVlmEvalRepo = "VLABench/vlm_evaluation_v1.0";
const colosseumRepo = "colosseum/colosseum-challenge";
const liberoRepo = "yifengzhu-hf/LIBERO-datasets";
const msHabRepos = {
  TidyHouse: "arth-shukla/MS-HAB-TidyHouse",
  PrepareGroceries: "arth-shukla/MS-HAB-PrepareGroceries",
  SetTable: "arth-shukla/MS-HAB-SetTable"
};
const bicoordRepo = "GradiusTwinbee/BiCoord";
const liberoSuiteFiles = [
  {
    suite: "LIBERO-Spatial",
    directory: "libero_spatial",
    files: `
pick_up_the_black_bowl_between_the_plate_and_the_ramekin_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_from_table_center_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_in_the_top_drawer_of_the_wooden_cabinet_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_next_to_the_cookie_box_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_next_to_the_plate_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_next_to_the_ramekin_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_on_the_cookie_box_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_on_the_ramekin_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_on_the_stove_and_place_it_on_the_plate_demo.hdf5
pick_up_the_black_bowl_on_the_wooden_cabinet_and_place_it_on_the_plate_demo.hdf5
`.trim().split("\n")
  },
  {
    suite: "LIBERO-Object",
    directory: "libero_object",
    files: `
pick_up_the_alphabet_soup_and_place_it_in_the_basket_demo.hdf5
pick_up_the_bbq_sauce_and_place_it_in_the_basket_demo.hdf5
pick_up_the_butter_and_place_it_in_the_basket_demo.hdf5
pick_up_the_chocolate_pudding_and_place_it_in_the_basket_demo.hdf5
pick_up_the_cream_cheese_and_place_it_in_the_basket_demo.hdf5
pick_up_the_ketchup_and_place_it_in_the_basket_demo.hdf5
pick_up_the_milk_and_place_it_in_the_basket_demo.hdf5
pick_up_the_orange_juice_and_place_it_in_the_basket_demo.hdf5
pick_up_the_salad_dressing_and_place_it_in_the_basket_demo.hdf5
pick_up_the_tomato_sauce_and_place_it_in_the_basket_demo.hdf5
`.trim().split("\n")
  },
  {
    suite: "LIBERO-Goal",
    directory: "libero_goal",
    files: `
open_the_middle_drawer_of_the_cabinet_demo.hdf5
open_the_top_drawer_and_put_the_bowl_inside_demo.hdf5
push_the_plate_to_the_front_of_the_stove_demo.hdf5
put_the_bowl_on_the_plate_demo.hdf5
put_the_bowl_on_the_stove_demo.hdf5
put_the_bowl_on_top_of_the_cabinet_demo.hdf5
put_the_cream_cheese_in_the_bowl_demo.hdf5
put_the_wine_bottle_on_the_rack_demo.hdf5
put_the_wine_bottle_on_top_of_the_cabinet_demo.hdf5
turn_on_the_stove_demo.hdf5
`.trim().split("\n")
  },
  {
    suite: "LIBERO-100 / LIBERO-90",
    directory: "libero_90",
    files: `
KITCHEN_SCENE10_close_the_top_drawer_of_the_cabinet_and_put_the_black_bowl_on_top_of_it_demo.hdf5
KITCHEN_SCENE10_close_the_top_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE10_put_the_black_bowl_in_the_top_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE10_put_the_butter_at_the_back_in_the_top_drawer_of_the_cabinet_and_close_it_demo.hdf5
KITCHEN_SCENE10_put_the_butter_at_the_front_in_the_top_drawer_of_the_cabinet_and_close_it_demo.hdf5
KITCHEN_SCENE10_put_the_chocolate_pudding_in_the_top_drawer_of_the_cabinet_and_close_it_demo.hdf5
KITCHEN_SCENE1_open_the_bottom_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE1_open_the_top_drawer_of_the_cabinet_and_put_the_bowl_in_it_demo.hdf5
KITCHEN_SCENE1_open_the_top_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE1_put_the_black_bowl_on_the_plate_demo.hdf5
KITCHEN_SCENE1_put_the_black_bowl_on_top_of_the_cabinet_demo.hdf5
KITCHEN_SCENE2_open_the_top_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE2_put_the_black_bowl_at_the_back_on_the_plate_demo.hdf5
KITCHEN_SCENE2_put_the_black_bowl_at_the_front_on_the_plate_demo.hdf5
KITCHEN_SCENE2_put_the_middle_black_bowl_on_the_plate_demo.hdf5
KITCHEN_SCENE2_put_the_middle_black_bowl_on_top_of_the_cabinet_demo.hdf5
KITCHEN_SCENE2_stack_the_black_bowl_at_the_front_on_the_black_bowl_in_the_middle_demo.hdf5
KITCHEN_SCENE2_stack_the_middle_black_bowl_on_the_back_black_bowl_demo.hdf5
KITCHEN_SCENE3_put_the_frying_pan_on_the_stove_demo.hdf5
KITCHEN_SCENE3_put_the_moka_pot_on_the_stove_demo.hdf5
KITCHEN_SCENE3_turn_on_the_stove_and_put_the_frying_pan_on_it_demo.hdf5
KITCHEN_SCENE3_turn_on_the_stove_demo.hdf5
KITCHEN_SCENE4_close_the_bottom_drawer_of_the_cabinet_and_open_the_top_drawer_demo.hdf5
KITCHEN_SCENE4_close_the_bottom_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE4_put_the_black_bowl_in_the_bottom_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE4_put_the_black_bowl_on_top_of_the_cabinet_demo.hdf5
KITCHEN_SCENE4_put_the_wine_bottle_in_the_bottom_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE4_put_the_wine_bottle_on_the_wine_rack_demo.hdf5
KITCHEN_SCENE5_close_the_top_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE5_put_the_black_bowl_in_the_top_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE5_put_the_black_bowl_on_the_plate_demo.hdf5
KITCHEN_SCENE5_put_the_black_bowl_on_top_of_the_cabinet_demo.hdf5
KITCHEN_SCENE5_put_the_ketchup_in_the_top_drawer_of_the_cabinet_demo.hdf5
KITCHEN_SCENE6_close_the_microwave_demo.hdf5
KITCHEN_SCENE6_put_the_yellow_and_white_mug_to_the_front_of_the_white_mug_demo.hdf5
KITCHEN_SCENE7_open_the_microwave_demo.hdf5
KITCHEN_SCENE7_put_the_white_bowl_on_the_plate_demo.hdf5
KITCHEN_SCENE7_put_the_white_bowl_to_the_right_of_the_plate_demo.hdf5
KITCHEN_SCENE8_put_the_right_moka_pot_on_the_stove_demo.hdf5
KITCHEN_SCENE8_turn_off_the_stove_demo.hdf5
KITCHEN_SCENE9_put_the_frying_pan_on_the_cabinet_shelf_demo.hdf5
KITCHEN_SCENE9_put_the_frying_pan_on_top_of_the_cabinet_demo.hdf5
KITCHEN_SCENE9_put_the_frying_pan_under_the_cabinet_shelf_demo.hdf5
KITCHEN_SCENE9_put_the_white_bowl_on_top_of_the_cabinet_demo.hdf5
KITCHEN_SCENE9_turn_on_the_stove_and_put_the_frying_pan_on_it_demo.hdf5
KITCHEN_SCENE9_turn_on_the_stove_demo.hdf5
LIVING_ROOM_SCENE1_pick_up_the_alphabet_soup_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE1_pick_up_the_cream_cheese_box_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE1_pick_up_the_ketchup_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE1_pick_up_the_tomato_sauce_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE2_pick_up_the_alphabet_soup_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE2_pick_up_the_butter_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE2_pick_up_the_milk_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE2_pick_up_the_orange_juice_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE2_pick_up_the_tomato_sauce_and_put_it_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE3_pick_up_the_alphabet_soup_and_put_it_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE3_pick_up_the_butter_and_put_it_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE3_pick_up_the_cream_cheese_and_put_it_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE3_pick_up_the_ketchup_and_put_it_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE3_pick_up_the_tomato_sauce_and_put_it_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE4_pick_up_the_black_bowl_on_the_left_and_put_it_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE4_pick_up_the_chocolate_pudding_and_put_it_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE4_pick_up_the_salad_dressing_and_put_it_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE4_stack_the_left_bowl_on_the_right_bowl_and_place_them_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE4_stack_the_right_bowl_on_the_left_bowl_and_place_them_in_the_tray_demo.hdf5
LIVING_ROOM_SCENE5_put_the_red_mug_on_the_left_plate_demo.hdf5
LIVING_ROOM_SCENE5_put_the_red_mug_on_the_right_plate_demo.hdf5
LIVING_ROOM_SCENE5_put_the_white_mug_on_the_left_plate_demo.hdf5
LIVING_ROOM_SCENE5_put_the_yellow_and_white_mug_on_the_right_plate_demo.hdf5
LIVING_ROOM_SCENE6_put_the_chocolate_pudding_to_the_left_of_the_plate_demo.hdf5
LIVING_ROOM_SCENE6_put_the_chocolate_pudding_to_the_right_of_the_plate_demo.hdf5
LIVING_ROOM_SCENE6_put_the_red_mug_on_the_plate_demo.hdf5
LIVING_ROOM_SCENE6_put_the_white_mug_on_the_plate_demo.hdf5
STUDY_SCENE1_pick_up_the_book_and_place_it_in_the_front_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE1_pick_up_the_book_and_place_it_in_the_left_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE1_pick_up_the_book_and_place_it_in_the_right_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE1_pick_up_the_yellow_and_white_mug_and_place_it_to_the_right_of_the_caddy_demo.hdf5
STUDY_SCENE2_pick_up_the_book_and_place_it_in_the_back_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE2_pick_up_the_book_and_place_it_in_the_front_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE2_pick_up_the_book_and_place_it_in_the_left_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE2_pick_up_the_book_and_place_it_in_the_right_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE3_pick_up_the_book_and_place_it_in_the_front_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE3_pick_up_the_book_and_place_it_in_the_left_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE3_pick_up_the_book_and_place_it_in_the_right_compartment_of_the_caddy_demo.hdf5
STUDY_SCENE3_pick_up_the_red_mug_and_place_it_to_the_right_of_the_caddy_demo.hdf5
STUDY_SCENE3_pick_up_the_white_mug_and_place_it_to_the_right_of_the_caddy_demo.hdf5
STUDY_SCENE4_pick_up_the_book_in_the_middle_and_place_it_on_the_cabinet_shelf_demo.hdf5
STUDY_SCENE4_pick_up_the_book_on_the_left_and_place_it_on_top_of_the_shelf_demo.hdf5
STUDY_SCENE4_pick_up_the_book_on_the_right_and_place_it_on_the_cabinet_shelf_demo.hdf5
STUDY_SCENE4_pick_up_the_book_on_the_right_and_place_it_under_the_cabinet_shelf_demo.hdf5
`.trim().split("\n")
  },
  {
    suite: "LIBERO-100 / LIBERO-10",
    directory: "libero_10",
    files: `
KITCHEN_SCENE3_turn_on_the_stove_and_put_the_moka_pot_on_it_demo.hdf5
KITCHEN_SCENE4_put_the_black_bowl_in_the_bottom_drawer_of_the_cabinet_and_close_it_demo.hdf5
KITCHEN_SCENE6_put_the_yellow_and_white_mug_in_the_microwave_and_close_it_demo.hdf5
KITCHEN_SCENE8_put_both_moka_pots_on_the_stove_demo.hdf5
LIVING_ROOM_SCENE1_put_both_the_alphabet_soup_and_the_cream_cheese_box_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE2_put_both_the_alphabet_soup_and_the_tomato_sauce_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE2_put_both_the_cream_cheese_box_and_the_butter_in_the_basket_demo.hdf5
LIVING_ROOM_SCENE5_put_the_white_mug_on_the_left_plate_and_put_the_yellow_and_white_mug_on_the_right_plate_demo.hdf5
LIVING_ROOM_SCENE6_put_the_white_mug_on_the_plate_and_put_the_chocolate_pudding_to_the_right_of_the_plate_demo.hdf5
STUDY_SCENE1_pick_up_the_book_and_place_it_in_the_back_compartment_of_the_caddy_demo.hdf5
`.trim().split("\n")
  }
];

const makeLiberoTask = ({ suite, directory, file }) => ({
  task: `${suite} / ${file.replace(/_demo\.hdf5$/, "")}`,
  dataLinks: {
    HDF5: hfDatasetBlob(liberoRepo, `${directory}/${file}`),
    "HF suite": hfDatasetTree(liberoRepo, directory)
  },
  observations: ["Workspace RGB", "Wrist RGB", "Proprioception", "Language", "PDDL"],
  actions: ["7D Robot Action"],
  demos: "50 trajectories",
  envs: `${suite} / robosuite manipulation task`,
  license: "CC BY 4.0"
});

const liberoRows = liberoSuiteFiles.flatMap(({ suite, directory, files }) =>
  files.map((file) => makeLiberoTask({ suite, directory, file }))
);

const maniSkillDemoRepo = "haosulab/ManiSkill_Demonstrations";
const maniSkillDemoTasks = [
  { env: "AnymalC-Reach-v1", episodes: "1,022 episodes", sources: "rl", controls: "pd_joint_delta_pos" },
  { env: "DrawTriangle-v1", episodes: "1,000 episodes", sources: "motionplanning", controls: "pd_joint_pos" },
  { env: "LiftPegUpright-v1", episodes: "2,008 episodes across 2 HDF5 variants", sources: "rl", controls: "pd_ee_delta_pose, pd_joint_delta_pos" },
  { env: "PegInsertionSide-v1", episodes: "2,000 episodes across 2 HDF5 variants", sources: "motionplanning, rl", controls: "pd_joint_pos, pd_joint_delta_pos" },
  { env: "PickCube-v1", episodes: "4,042 episodes across 5 HDF5 variants", sources: "motionplanning, rl, teleoperation", controls: "pd_joint_pos, pd_ee_delta_pos, pd_ee_delta_pose, pd_joint_delta_pos" },
  { env: "PlugCharger-v1", episodes: "1,000 episodes", sources: "motionplanning", controls: "pd_joint_pos" },
  { env: "PokeCube-v1", episodes: "2,300 episodes across 3 HDF5 variants", sources: "rl", controls: "pd_ee_delta_pos, pd_ee_delta_pose, pd_joint_delta_pos" },
  { env: "PullCube-v1", episodes: "3,072 episodes across 3 HDF5 variants", sources: "rl", controls: "pd_ee_delta_pos, pd_ee_delta_pose, pd_joint_delta_pos" },
  { env: "PullCubeTool-v1", episodes: "1,000 episodes", sources: "motionplanning", controls: "pd_joint_pos" },
  { env: "PushCube-v1", episodes: "4,062 episodes across 4 HDF5 variants", sources: "motionplanning, rl", controls: "pd_joint_pos, pd_ee_delta_pos, pd_ee_delta_pose, pd_joint_delta_pos" },
  { env: "PushT-v1", episodes: "2,606 episodes across 3 HDF5 variants", sources: "rl", controls: "pd_ee_delta_pos, pd_ee_delta_pose, pd_joint_delta_pos" },
  { env: "RollBall-v1", episodes: "2,373 episodes across 3 HDF5 variants", sources: "rl", controls: "pd_ee_delta_pos, pd_ee_delta_pose, pd_joint_delta_pos" },
  { env: "StackCube-v1", episodes: "3,829 episodes across 4 HDF5 variants", sources: "motionplanning, rl", controls: "pd_joint_pos, pd_ee_delta_pos, pd_ee_delta_pose, pd_joint_delta_pos" },
  { env: "StackPyramid-v1", episodes: "1,000 episodes", sources: "motionplanning", controls: "pd_joint_pos" },
  { env: "TwoRobotPickCube-v1", episodes: "983 episodes", sources: "rl", controls: "dual Panda pd_joint_delta_pos" },
  { env: "TwoRobotStackCube-v1", episodes: "1,007 episodes", sources: "rl", controls: "dual Panda pd_joint_delta_pos" }
];

const makeManiSkillDemoTask = ({ env, episodes, sources, controls }) => ({
  task: env,
  dataLinks: {
    ZIP: hfDatasetBlob(maniSkillDemoRepo, `demos/${env}.zip`),
    "HF folder": hfDatasetTree(maniSkillDemoRepo, `demos/${env}`)
  },
  observations: ["HDF5 Trajectories", "JSON Metadata", "Env States", "Optional Observations", "Sample Videos"],
  actions: ["Actions [T, A]", controls],
  demos: episodes,
  envs: `${env} / ${sources}`,
  license: "Apache-2.0"
});

const maniSkillDemoRows = maniSkillDemoTasks.map(makeManiSkillDemoTask);

const furnitureBenchDriveFolder = "https://drive.google.com/drive/folders/1j59vFmgBsatu1PZK52HWX_9o5BCh_XDt?usp=sharing";
const furnitureBenchRowsSpec = [
  { furniture: "lamp", randomness: "low", demos: 150, avgLength: 594, hours: 4.9, fileId: "1kD9Fxj49Df4mgZPVkBa_b_L3dqzEQROF" },
  { furniture: "lamp", randomness: "medium", driveRandomness: "med", demos: 150, avgLength: 598, hours: 5.0, fileId: "1awqLazZlNOqDhnOuElttOwDOol9oWY0C" },
  { furniture: "lamp", randomness: "high", demos: 50, avgLength: 768, hours: 2.1, fileId: "1Ia0SHIACIoqwzVjhc_dgzEMsiKffIO6T" },
  { furniture: "square_table", randomness: "low", demos: 150, avgLength: 1689, hours: 14.1, fileId: "1ogI5VkFcGeJsFje9_0AS_fFSwhJX6zQR" },
  { furniture: "square_table", randomness: "medium", driveRandomness: "med", demos: 150, avgLength: 1660, hours: 13.8, fileId: "1T4QLiCaJQjzsLANUR8jPssGsVZFChMog" },
  { furniture: "square_table", randomness: "high", demos: 50, avgLength: 1682, hours: 4.7, fileId: "1Wq1MVCUSXxi6wJk7CQW-3LMGdUGJdiAR" },
  { furniture: "desk", randomness: "low", demos: 100, avgLength: 1531, hours: 8.5, fileId: "1aJEqENTUCvnHhoAlwd9rks38YzkgeecL" },
  { furniture: "desk", randomness: "medium", driveRandomness: "med", demos: 100, avgLength: 1914, hours: 10.6, fileId: "1edLqFAxKRAPcnNgDkRBmw9AilN8zZSqs" },
  { furniture: "desk", randomness: "high", demos: 50, avgLength: 1687, hours: 4.7, fileId: "1xOhzI96-BORgjyqF7rBdYRPc_-RxYr_Z" },
  { furniture: "drawer", randomness: "low", demos: 250, avgLength: 571, hours: 7.9, fileId: "121seXYws04z3UowpUdT-7uxg-y0l4Qb2" },
  { furniture: "drawer", randomness: "medium", driveRandomness: "med", demos: 250, avgLength: 520, hours: 7.2, fileId: "1nFdVpUERi90zNNthfOR2sdYCjrW7Rg_c" },
  { furniture: "drawer", randomness: "high", demos: 50, avgLength: 781, hours: 2.2, fileId: "1QNqA48y9fFE4251xMmCMaUOdmNcnaZ8T" },
  { furniture: "cabinet", randomness: "low", demos: 150, avgLength: 883, hours: 7.4, fileId: "1zjMLlRlXVZDGri1QUINV540DTG7-jAa-" },
  { furniture: "cabinet", randomness: "medium", driveRandomness: "med", demos: 150, avgLength: 814, hours: 6.8, fileId: "1LRexjymeP0szZucTEt40ZL-2VoLYXKKo" },
  { furniture: "cabinet", randomness: "high", demos: 50, avgLength: 1166, hours: 3.2, fileId: "1RHbo27phzXVJDjMXPI91QKPHWByCSQU4" },
  { furniture: "round_table", randomness: "low", demos: 100, avgLength: 847, hours: 4.7, fileId: "1SjSg2tzQZ4fsN6z_xLT1vEOuTTzrQCun" },
  { furniture: "round_table", randomness: "medium", driveRandomness: "med", demos: 100, avgLength: 867, hours: 4.8, fileId: "1gJ_HmhpgE4nJNBMmEKHHx7mKjYUQadRA" },
  { furniture: "round_table", randomness: "high", demos: 50, avgLength: 1060, hours: 2.9, fileId: "1qS2lIiPdqq8pTJsPN2txU1lzQJ4seWCr" },
  { furniture: "stool", randomness: "low", demos: 100, avgLength: 1231, hours: 6.8, fileId: "1Z1ewa62pkWehC4biodoDdPfWDJdCNPtb" },
  { furniture: "stool", randomness: "medium", driveRandomness: "med", demos: 100, avgLength: 1419, hours: 7.9, fileId: "1IstEhReeRri2s2y7vJrcv1oQ3wUm4kqT" },
  { furniture: "stool", randomness: "high", demos: 50, avgLength: 1273, hours: 3.5, fileId: "1QeEb4Ajz-qN820Y_DVuxU7UdvrZBv7hJ" },
  { furniture: "chair", randomness: "low", demos: 100, avgLength: 1817, hours: 10.1, fileId: "1swulRnjB7rU1u-TuG6-WOrci9o8WZaEI" },
  { furniture: "chair", randomness: "medium", driveRandomness: "med", demos: 100, avgLength: 2282, hours: 12.7, fileId: "1wXGloFr4aVJ3ChYz4qKD_zRheuivM9rc" },
  { furniture: "chair", randomness: "high", demos: 50, avgLength: 2066, hours: 5.7, fileId: "1D8j1s4v9NL02V03PwEU6moOjn9v5qzFn" },
  { furniture: "one_leg", randomness: "low", demos: 1000, avgLength: 374, hours: 20.8, fileId: "1E121w1Q9-SzFN3Bf6wC_NF-7kDA57RZf" },
  { furniture: "one_leg", randomness: "medium", driveRandomness: "med", demos: 1000, avgLength: 429, hours: 23.8, fileId: "1zRqpz3WLztpOo7ULYC6Ik3rWyYtoo9ch" },
  { furniture: "one_leg", randomness: "high", demos: 500, avgLength: 461, hours: 12.8, fileId: "19iLUPDAvrRzevVggfD09nK2ayZ3GrVfC" }
];

const makeFurnitureBenchTask = ({ furniture, randomness, driveRandomness, demos, avgLength, hours, fileId }) => ({
  task: `${furniture} / ${randomness}`,
  dataLinks: {
    "tar.gz": `https://drive.google.com/file/d/${fileId}/view`,
    "Drive folder": furnitureBenchDriveFolder,
    Docs: "https://clvrai.github.io/furniture-bench/docs/tutorials/dataset.html"
  },
  observations: ["Wrist RGB", "Front RGB", "Robot State", "Rewards", "Skill Flags", "Metadata"],
  actions: ["8-D Actions", "Delta End-Effector Pose", "Gripper"],
  demos: `${demos} demos; avg ${avgLength} steps; ${hours} hrs`,
  envs: `${furniture} / ${driveRandomness || randomness}_compressed / Franka Panda + FurnitureSim`,
  license: "TBD"
});

const furnitureBenchRows = furnitureBenchRowsSpec.map(makeFurnitureBenchTask);

const roboSetTeleopRowsSpec = [
  ["Baking Prep", "Slide-Open Drawer", "Scene 1", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/baking_prep/baking_prep_slide_open_drawer_scene_1.tar.gz"],
  ["Baking Prep", "Slide-Open Drawer", "Scene 4", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/baking_prep/baking_prep_slide_open_drawer_scene_4.tar.gz"],
  ["Baking Prep", "Pick Butter", "Scene 1", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/baking_prep/baking_prep_pick_butter_scene_1.tar.gz"],
  ["Baking Prep", "Pick Butter", "Scene 4", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/baking_prep/baking_prep_pick_butter_scene_4.tar.gz"],
  ["Baking Prep", "Place Butter", "Scene 1", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/baking_prep/baking_prep_place_butter_scene_1.tar.gz"],
  ["Baking Prep", "Place Butter", "Scene 4", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/baking_prep/baking_prep_place_butter_scene_4.tar.gz"],
  ["Baking Prep", "Slide-Close Drawer", "Scene 1", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/baking_prep/baking_prep_slide_close_drawer_scene_1.tar.gz"],
  ["Baking Prep", "Slide-Close Drawer", "Scene 4", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/baking_prep/baking_prep_slide_close_drawer_scene_4.tar.gz"],
  ["Clean Kitchen", "Pick Lid", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/clean_kitchen/clean_kitchen_pick_lid_scene_3.tar.gz"],
  ["Clean Kitchen", "Cap Lid", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/clean_kitchen/clean_kitchen_cap_lid_scene_3.tar.gz"],
  ["Clean Kitchen", "Slide-Close Drawer", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/clean_kitchen/clean_kitchen_slide_close_drawer_scene_3.tar.gz"],
  ["Clean Kitchen", "Flap-Close Oven", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/clean_kitchen/clean_kitchen_flap_close_oven_Scene_3.tar.gz"],
  ["Clean Kitchen", "Pick Towel", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/clean_kitchen/clean_kitchen_pick_towel_scene_3.tar.gz"],
  ["Clean Kitchen", "Wipe Counter", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/clean_kitchen/clean_kitchen_Wipe_Counter_Scene_3.tar.gz"],
  ["Heat Soup", "Flap-Open Oven", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/heat_soup/heat_soup_flap_open_oven_Scene_2.tar.gz"],
  ["Heat Soup", "Flap-Open Oven", "Scene 4", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/heat_soup/heat_soup_flap_open_oven_Scene_4.tar.gz"],
  ["Heat Soup", "Pick Bowl", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/heat_soup/heat_soup_pick_bowl_scene_2.tar.gz"],
  ["Heat Soup", "Pick Bowl", "Scene 4", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/heat_soup/heat_soup_pick_bowl_scene_4.tar.gz"],
  ["Heat Soup", "Slide-In Bowl", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/heat_soup/heat_soup_slide_in_bowl_scene_2.tar.gz"],
  ["Heat Soup", "Slide-In Bowl", "Scene 4", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/heat_soup/heat_soup_slide_in_bowl_scene_4.tar.gz"],
  ["Heat Soup", "Flap-Close Oven", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/heat_soup/heat_soup_flap_close_oven_scene_2.tar.gz"],
  ["Make Tea", "Uncap Lid", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_tea/make_tea_Uncap_Lid_Scene_2.tar.gz"],
  ["Make Tea", "Place Lid", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_tea/make_tea_place_lid_scene_2.tar.gz"],
  ["Make Tea", "Pick tea", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_tea/make_tea_pick_tea_scene_2.tar.gz"],
  ["Make Tea", "Place Tea", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_tea/make_tea_place_tea_scene_2.tar.gz"],
  ["Make Tea", "Pick Lid", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_tea/make_tea_pick_lid_scene_2.tar.gz"],
  ["Make Tea", "Cap Lid", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_tea/make_tea_cap_lid_scene_2.tar.gz"],
  ["Make Toast", "Plunge Toaster", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_toast/make_toast_plunge_toaster_scene_2.tar.gz"],
  ["Make Toast", "Pick Toast", "Scene 1", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_toast/make_toast_pick_toast_scene_1.tar.gz"],
  ["Make Toast", "Place Toast", "Scene 1", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/make_toast/make_toast_place_toast_s_Scene_1.tar.gz"],
  ["Serve Soup", "Flap-Open Oven", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/serve_soup/serve_soup_flap_open_oven_Scene_2.tar.gz"],
  ["Serve Soup", "Slide-Out Bowl", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/serve_soup/serve_soup_slide_out_sowl_scene_2.tar.gz"],
  ["Serve Soup", "Place Bowl", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/serve_soup/serve_soup_place_bowl_scene_2.tar.gz"],
  ["Serve Soup", "Flap-Close Oven", "Scene 2", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/serve_soup/serve_soup_flap_close_oven_Scene_2.tar.gz"],
  ["Stow Bowl", "Slide-Open Drawer", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/stow_bowl/stow_bowl_slide_open_drawer_scene_3.tar.gz"],
  ["Stow Bowl", "Pick Bowl", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/stow_bowl/stow_bowl_pick_bowl_scene_3.tar.gz"],
  ["Stow Bowl", "Place Bowl", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/stow_bowl/stow_bowl_place_bowl_scene_3.tar.gz"],
  ["Stow Bowl", "Slide-Close Drawer", "Scene 3", "http://dl.fbaipublicfiles.com/RoboSet/TeleoperationSet/Activities/stow_bowl/stow_bowl_slide_close_drawer_scene_3.tar.gz"]
];

const makeRoboSetTeleopTask = ([activity, task, scene, downloadUrl]) => ({
  task: `${activity} / ${task} / ${scene}`,
  dataLinks: {
    "tar.gz": downloadUrl,
    "Teleoperation page": "https://robopen.github.io/roboset/teleoperation.html"
  },
  observations: ["4 Camera Views", "HDF5", "Language Instruction", "Scene Variations"],
  actions: ["Teleoperation Robot Actions", "Oculus Quest 2 Control"],
  demos: "250 demonstrations",
  envs: `${activity} / ${scene} / real-world kitchen`,
  license: "MIT"
});

const roboSetTeleopRows = roboSetTeleopRowsSpec.map(makeRoboSetTeleopTask);

const msHabTasks = [
  {
    task: "TidyHouse",
    repo: msHabRepos.TidyHouse,
    subtasks: ["pick", "place"],
    demos: "18K episodes",
    transitions: "3.6M transitions",
    size: "208.5 GB"
  },
  {
    task: "PrepareGroceries",
    repo: msHabRepos.PrepareGroceries,
    subtasks: ["pick", "place"],
    demos: "18K episodes",
    transitions: "3.6M transitions",
    size: "174.2 GB"
  },
  {
    task: "SetTable",
    repo: msHabRepos.SetTable,
    subtasks: ["pick", "place", "open", "close"],
    demos: "8K episodes",
    transitions: "1.6M transitions",
    size: "83.4 GB"
  }
];

const makeMsHabTask = ({ task, repo, subtasks, demos, transitions, size }) => ({
  task,
  dataLinks: {
    "HF dataset": hfDatasetBase(repo),
    ...Object.fromEntries(subtasks.map((subtask) => [subtask, hfDatasetTree(repo, subtask)]))
  },
  observations: ["2x 128x128 RGB-D", "State", "Event Labels", "HDF5 Trajectories"],
  actions: ["Fetch Whole-Body Control", "pd_joint_delta_pos"],
  demos: `${demos} (${transitions}; ${size})`,
  envs: `Fetch / ReplicaCAD 63 train + 21 val scenes / ${subtasks.join(", ")}`,
  license: "MIT"
});

const msHabRows = msHabTasks.map(makeMsHabTask);

const colosseumTasks = [
  "basketball_in_hoop",
  "close_box",
  "close_laptop_lid",
  "empty_dishwasher",
  "get_ice_from_fridge",
  "hockey",
  "insert_onto_square_peg",
  "meat_on_grill",
  "move_hanger",
  "open_drawer",
  "place_wine_at_rack_location",
  "put_money_in_safe",
  "reach_and_drag",
  "scoop_with_spatula",
  "setup_chess",
  "slide_block_to_target",
  "stack_cups",
  "straighten_rope",
  "turn_oven_on",
  "wipe_desk"
];

const makeColosseumTask = (task) => ({
  task,
  dataLinks: {
    "tar.gz": hfDatasetBlob(colosseumRepo, `${task}.tar.gz`)
  },
  observations: ["RGB", "Depth", "4 Camera Views", "Low-Dim Obs", "RLBench"],
  actions: ["RLBench Manipulation Actions"],
  demos: "100 train demos + 25 test demos/variation",
  envs: "RLBench task / Colosseum perturbations",
  license: "MIT"
});

const colosseumRows = colosseumTasks.map(makeColosseumTask);

const vlaBenchPrimitiveTasks = [
  "add_condiment",
  "insert_flower",
  "select_book",
  "select_chemistry_tube",
  "select_drink",
  "select_fruit",
  "select_mahjong",
  "select_painting",
  "select_poker",
  "select_toy"
];

const makeVlaBenchPrimitiveTask = (task) => ({
  task: `primitive / ${task}`,
  dataLinks: {
    "HF config": `${hfDatasetBase(vlaBenchPrimitiveRepo)}/viewer/${task}/train`
  },
  observations: ["LeRobot v3", "RGB", "Video", "Language", "Simulation"],
  actions: ["Franka Panda 7-DoF Manipulation"],
  demos: "500 episodes",
  envs: "Franka Panda / primitive fine-tuning task",
  license: "MIT"
});

const vlaBenchPrimitiveRows = vlaBenchPrimitiveTasks.map(makeVlaBenchPrimitiveTask);

const roboTwin2Tasks = [
  { task: "adjust_bottle", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "beat_block_hammer", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "blocks_ranking_rgb", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "blocks_ranking_size", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "click_alarmclock", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "click_bell", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "dump_bin_bigbin", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "grab_roller", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "handover_block", embodiments: ["aloha-agilex", "arx-x5", "piper"], demos: "1,650 trajectories" },
  { task: "handover_mic", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "hanging_mug", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "lift_pot", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "move_can_pot", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "move_pillbottle_pad", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "move_playingcard_away", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "move_stapler_pad", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "open_laptop", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "open_microwave", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "pick_diverse_bottles", embodiments: ["aloha-agilex", "arx-x5", "piper", "ur5"], demos: "2,200 trajectories" },
  { task: "pick_dual_bottles", embodiments: ["aloha-agilex", "arx-x5", "piper", "ur5"], demos: "2,200 trajectories" },
  { task: "place_a2b_left", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_a2b_right", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_bread_basket", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_bread_skillet", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "place_burger_fries", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_can_basket", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "place_cans_plasticbox", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "place_container_plate", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_dual_shoes", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_empty_cup", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_fan", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "place_mouse_pad", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_object_basket", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "place_object_scale", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_object_stand", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_phone_stand", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "place_shoe", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "press_stapler", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "put_bottles_dustbin", embodiments: ["aloha-agilex", "arx-x5", "piper"], demos: "1,650 trajectories" },
  { task: "put_object_cabinet", embodiments: ["aloha-agilex", "arx-x5", "franka"], demos: "1,650 trajectories" },
  { task: "rotate_qrcode", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "scan_object", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "shake_bottle", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "shake_bottle_horizontally", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "stack_blocks_three", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "stack_blocks_two", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "stack_bowls_three", embodiments: ["aloha-agilex", "arx-x5", "franka", "ur5"], demos: "2,200 trajectories" },
  { task: "stack_bowls_two", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "stamp_seal", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" },
  { task: "turn_switch", embodiments: ["aloha-agilex", "arx-x5", "franka", "piper", "ur5"], demos: "2,750 trajectories" }
];

const makeRoboTwin2Task = ({ task, embodiments, demos }) => ({
  task,
  dataLinks: {
    "HF task folder": hfDatasetTree(roboTwin2Repo, `dataset/${task}`)
  },
  observations: ["Simulation", "Domain Randomization", "RGB", "Language"],
  actions: ["Bimanual Manipulation"],
  demos: `${demos} (${embodiments.length} embodiments; 50 clean + 500 randomized each)`,
  envs: embodiments.join(", "),
  license: "MIT"
});

const roboTwin2Rows = roboTwin2Tasks.map(makeRoboTwin2Task);

const bicoordTasks = [
  "balance_roller",
  "build_bridge",
  "build_tower_with_blocks",
  "clean_table",
  "collect_pens",
  "cook",
  "divide_block_tower",
  "exchange_mics",
  "exchange_pots",
  "extract_bottom_block_to_top",
  "fetch_block_with_roller",
  "handover_block_with_bowls",
  "jigsaw",
  "match_blocks_with_signs",
  "place_plate_and_cup",
  "put_objects_cabinet",
  "stack_bowls",
  "sweep_block"
];

const makeBicoordTask = (task) => ({
  task,
  dataLinks: {
    "HF task folder": hfDatasetTree(bicoordRepo, task),
    "Trajectories": hfDatasetTree(bicoordRepo, `${task}/demo_clean/_traj_data`)
  },
  observations: ["Trajectory Data", "Video", "Task Instructions", "Stage Labels", "Simulation"],
  actions: ["End Pose", "Joint Action", "Dual Agile Manipulation"],
  demos: "100 trajectories",
  envs: "Dual Agile",
  license: "MIT"
});

const bicoordRows = bicoordTasks.map(makeBicoordTask);

const makeLandingRow = ({ task, href, label = "Download", observations = ["TBD"], actions = ["TBD"], demos = "TBD", envs = "TBD", license = "TBD" }) => ({
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

const roboMindRows = roboMindGroups.map(({ benchmark, embodiment, taskCount }) => ({
  task: `${benchmark} / ${embodiment}`,
  dataLinks: {
    "HF folder": hfDatasetTree(roboMindRepo, `${benchmark}/${embodiment}`)
  },
  observations: ["HDF5", "RGB", "Robot Observations"],
  actions: ["Robot Actions"],
  demos: "TBD",
  envs: `${embodiment} / ${taskCount} task archives`,
  license: "Apache-2.0"
}));

const agiBotWorldRepo = "agibot-world/AgiBotWorld-Beta";
const agiBotWorldRows = [
  makeLandingRow({
    task: "observations / task-id tar shards",
    href: hfDatasetTree(agiBotWorldRepo, "observations"),
    label: "HF folder",
    observations: ["WebDataset", "Robot Observations"],
    actions: ["TBD"],
    envs: "217 task IDs"
  }),
  makeLandingRow({
    task: "parameters / tar shards",
    href: hfDatasetTree(agiBotWorldRepo, "parameters"),
    label: "HF folder",
    observations: ["Robot Parameters"],
    actions: ["TBD"],
    envs: "35 shards"
  }),
  makeLandingRow({
    task: "proprio_stats / tar shards",
    href: hfDatasetTree(agiBotWorldRepo, "proprio_stats"),
    label: "HF folder",
    observations: ["Proprio Stats"],
    actions: ["TBD"],
    envs: "7 shards"
  }),
  makeLandingRow({
    task: "task_info / task metadata",
    href: hfDatasetTree(agiBotWorldRepo, "task_info"),
    label: "HF folder",
    observations: ["Task Metadata"],
    actions: ["TBD"],
    envs: "217 task info files"
  })
];

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
  "Arrange_the_cups",
  "Arrange_the_items_on_the_conference_table",
  "Cable_Plugging_able",
  "Clean_the_convenience_store",
  "Collect_the_mail",
  "Cook_rice_using_an_electric_rice_cooker",
  "Hang_out_the_clothes_to_dry",
  "Long_Term_Tasks_Without_Annotations",
  "Make_toast",
  "Making_steamed_potatoes",
  "Move_industrial_parts_to_different_plastic_boxes",
  "Organize_the_TV_cabinet",
  "Organize_the_glass_tube_on_the_rack",
  "Organize_the_magazines",
  "Organize_the_pen_holder",
  "Organize_the_repair_tools",
  "Organize_the_toys",
  "Pack_the_badminton_shuttlecock",
  "Place_the_books",
  "Place_the_hairdryer",
  "Place_the_slippers",
  "Prepare_the_birthday_cake",
  "Prepare_the_bread",
  "Put_the_milk_in_the_refrigerator",
  "RS-02",
  "Refill_the_laundry_detergent",
  "Replace_the_tissues_and_arrange_them",
  "Replenish_tea_bags",
  "Stack_the_cups",
  "Steam_buns",
  "Steaming_rice_in_a_rice_cooker",
  "Take_down_the_book",
  "Take_out_the_trash",
  "Tidy_up_the_childrens_room",
  "Tidy_up_the_conference_room_table",
  "Tidy_up_the_cooking_counter"
];

const realSourceWorldRows = realSourceWorldTasks.map((task) => ({
  task,
  dataLinks: {
    "HF folder": hfDatasetTree(realSourceWorldRepo, task)
  },
  observations: ["LeRobot", "Parquet", "Video"],
  actions: ["Robot Actions"],
  demos: "TBD",
  envs: "RealSource",
  license: "CC BY-NC-SA 4.0"
}));

const additionalRobotDataSections = [
  {
    id: "robomind",
    project: "RoboMIND",
    summary: "Robot manipulation dataset from X-Humanoid. Rows are grouped by benchmark and embodiment because task archives are multipart tar.gz files.",
    projectLinks: {
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
    summary: "AgiBot World beta release with WebDataset observation shards, parameter shards, proprio stats, and task metadata.",
    projectLinks: {
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
      DOI: "https://doi.org/10.57967/hf/6328"
    },
    citation: `@article{fourier2025actionnet,
  author    = {Fourier ActionNet Team, Yao Mu},
  title     = {ActionNet: A dataset for dexterous bimanual manipulation},
  year      = {2025},
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "ActionNet tar shards",
        href: hfDatasetBase("FourierIntelligence/ActionNet"),
        label: "HuggingFace",
        observations: ["Robot Observations"],
        actions: ["Robot Actions"],
        envs: "ActionNet",
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
    summary: "RealSource real-world robot dataset. Rows are generated from top-level task directories.",
    projectLinks: {
      HuggingFace: hfDatasetBase(realSourceWorldRepo)
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
    summary: "RoboCOIN data manager entry point. No stable task-level download tree was exposed from the provided link.",
    projectLinks: {
      Website: "https://flagopen.github.io/RoboCOIN-DataManager/",
      Paper: "https://arxiv.org/abs/2511.17441"
    },
    citation: `@article{wu2025robocoin,
  title={Robocoin: An open-sourced bimanual robotic data collection for integrated manipulation},
  author={Wu, Shihan and Liu, Xuecheng and Xie, Shaoxuan and Wang, Pengwei and Li, Xinghang and Yang, Bowen and Li, Zhe and Zhu, Kai and Wu, Hongyu and Liu, Yiheng and others},
  journal={arXiv preprint arXiv:2511.17441},
  year={2025}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "RoboCOIN DataManager",
        href: "https://flagopen.github.io/RoboCOIN-DataManager/",
        label: "Website",
        observations: ["TBD"],
        actions: ["TBD"],
        envs: "RoboCOIN"
      })
    ]
  },
  {
    id: "humanoid-everyday",
    project: "Humanoid Everyday",
    summary: "Humanoid everyday manipulation dataset. The public repo exposes episode parquet/video shards rather than task-named archives.",
    projectLinks: {
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
    summary: "ModelScope RoboMIND 2.0 collection entry point. Add task-level rows later if a stable dataset tree is provided.",
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
    rows: [
      makeLandingRow({
        task: "RoboMIND 2.0 collection",
        href: "https://modelscope.cn/collections/X-Humanoid/RoboMIND20",
        label: "ModelScope",
        observations: ["TBD"],
        actions: ["TBD"],
        envs: "RoboMIND 2.0"
      })
    ]
  },
  {
    id: "molmoact2",
    project: "MolmoAct2",
    summary: "AllenAI MolmoAct2 BimanualYAM dataset. The public repo exposes parquet/video shards rather than task-named archives.",
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
        task: "MolmoAct2 BimanualYAM episodes",
        href: hfDatasetBase("allenai/MolmoAct2-BimanualYAM-Dataset"),
        label: "HuggingFace",
        observations: ["Video", "Parquet", "Bimanual"],
        actions: ["Robot Actions"],
        envs: "BimanualYAM",
        license: "Apache-2.0"
      })
    ]
  },
  {
    id: "baihu-vtouch",
    project: "Baihu-VTouch",
    summary: "OpenLoong Baihu-VTouch dataset entry point. No stable task-level download tree was exposed from the provided link.",
    projectLinks: {
      Website: "https://www.openloong.org.cn/cn/datasets/baihu-vtouch",
      Paper: "https://arxiv.org/abs/2604.20444"
    },
    citation: `@article{hua2026vtouch++,
  title={VTouch++: A Multimodal Dataset with Vision-Based Tactile Enhancement for Bimanual Manipulation},
  author={Hua, Qianxi and Li, Xinyue and Yan, Zheng and Li, Yang and Zhang, Chi and Li, Yongyao and Liu, Yufei},
  journal={arXiv preprint arXiv:2604.20444},
  year={2026}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "Baihu-VTouch dataset",
        href: "https://www.openloong.org.cn/cn/datasets/baihu-vtouch",
        label: "Website",
        observations: ["TBD"],
        actions: ["TBD"],
        envs: "Baihu-VTouch"
      })
    ]
  },
  {
    id: "let-dataset",
    project: "Let-Dataset",
    summary: "Leju Robot ModelScope organization entry point. Add task-level rows later when a specific dataset repository is provided.",
    projectLinks: {
      ModelScope: "https://modelscope.cn/organization/lejurobot",
      HuggingFace: "https://huggingface.co/datasets/LejuRobotics/LET_Base_Dataset"
    },
    citation: `@misc{LET2025,
  title={LET:Full-Size Humanoid Robot Real-World Dataset},
  author={LejuRobotics},
  year={2025},
  howpublished={\\url{https://huggingface.co/datasets/LejuRobotics/LET_Base_Dataset}}
}`,
    defaultOpen: false,
    rows: [
      makeLandingRow({
        task: "Leju Robot dataset organization",
        href: "https://modelscope.cn/organization/lejurobot",
        label: "ModelScope",
        observations: ["TBD"],
        actions: ["TBD"],
        envs: "Leju Robot"
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
    actions: ["End Effector Pose", "Gripper"],
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

const egoDatasetRecords = [
  { id: "egohands", name: "EgoHands", year: 2015, observations: ["Ego Video", "Hand Segmentation Masks"], summary: "First-person videos of two-person tabletop interactions with pixel-level hand masks for detecting and segmenting hands in natural activities.", paper: "https://www.cv-foundation.org/openaccess/content_iccv_2015/papers/Bambach_Lending_A_Hand_ICCV_2015_paper.pdf", dataLinks: { Dataset: "https://www.kaggle.com/api/v1/datasets/download/himaniishah/egohands?datasetVersionNumber=1" } },
  { id: "krishnacam", name: "KrishnaCam", year: 2016, observations: ["Ego Video", "GPS", "Body Orientation", "Accelerometer"], summary: "A long-term Google Glass record of one person's daily life, pairing 7.6 million frames with location and inertial context.", project: "https://krsingh.cs.ucdavis.edu/krishna_files/papers/krishnacam/krishnacam.html", paper: "https://krsingh.cs.ucdavis.edu/krishna_files/papers/krishnacam/krishnacam_files/kcam_wacv16.pdf", dataLinks: { Videos: "https://drive.google.com/drive/folders/1q81yrQenY1dMul3ixJUbOrf9FPOTgMGW?usp=sharing" } },
  { id: "fpha", name: "FPHA", year: 2017, observations: ["Ego RGB-D Video", "3D Hand Pose", "Object Pose", "Action Labels"], summary: "First-person hand-action recordings of daily object interactions with 3D hand joints and pose annotations for selected manipulated objects.", project: "https://guiggh.github.io/publications/first-person-hands/", paper: "https://arxiv.org/abs/1704.02463", dataLinks: { "Access form": "https://docs.google.com/forms/d/e/1FAIpQLScoksYrmthDbJeAV0_ysXJDmfvZmzMMsX0_Uhkb6H6DHYGBtg/viewform" } },
  { id: "thu-read", name: "THU-READ", year: 2017, observations: ["Ego RGB-D Video", "Action Labels", "Hand Regions"], summary: "Egocentric RGB-D recordings covering 40 daily hand-action classes performed by eight subjects, with clip-level annotations and hand-region cues.", project: "https://ivg.au.tsinghua.edu.cn/dataset/THU_READ.php", paper: "https://ivg.au.tsinghua.edu.cn/samples_THU_READ/Action%20Recognition%20in%20RGB-D%20Egocentric%20Videos.pdf", dataLinks: { Dataset: "https://pan.baidu.com/s/1eR1EX9o" } },
  { id: "charades-ego", name: "Charades-Ego", year: 2018, observations: ["Ego + Exo Video", "Action Labels"], summary: "Paired first- and third-person videos of scripted indoor household activities, aligned with the Charades action vocabulary.", project: "https://prior.allenai.org/projects/charades-ego", paper: "https://arxiv.org/abs/1804.09626", dataLinks: { "Video archive": "https://ai2-public-datasets.s3-us-west-2.amazonaws.com/charades/CharadesEgo_v1_480.tar" }, license: "AllenAI Non-Commercial Use License" },
  { id: "egtea-gaze-plus", name: "EGTEA Gaze+", year: 2018, observations: ["Ego Video", "Gaze", "Action Labels"], summary: "First-person cooking recordings with gaze and action annotations for studying attention, hand-object activity, and food preparation.", project: "https://cbs.ic.gatech.edu/fpv/", paper: "https://www.ecva.net/papers/eccv_2018/papers_ECCV/papers/Yin_Li_In_the_Eye_ECCV_2018_paper.pdf", dataLinks: { "Dataset access": "https://cbs.ic.gatech.edu/fpv/" } },
  { id: "epic-kitchens-v1", name: "EPIC-KITCHENS v1", year: 2018, observations: ["Ego Video", "Audio", "Action Narrations"], summary: "Unscripted daily kitchen activity captured with head-mounted cameras and densely narrated into verb and noun action segments.", project: "https://epic-kitchens.github.io/2019.html", paper: "https://arxiv.org/abs/1804.02748", dataLinks: { "Data repository": "https://data.bris.ac.uk/data/dataset/3h91syskeag572hl6tvuovwv4d", Annotations: "https://github.com/epic-kitchens/annotations" }, license: "CC BY-NC 4.0" },
  { id: "epic-kitchens-100", name: "EPIC-KITCHENS-100", year: 2020, observations: ["Ego Video", "Audio", "Action Narrations"], summary: "The 100-hour extension of EPIC-KITCHENS, capturing unscripted activities across 45 kitchens with action and narration annotations.", project: "https://epic-kitchens.github.io/2020-100.html", paper: "https://arxiv.org/abs/2006.13256", dataLinks: { "Download tool and annotations": "https://github.com/epic-kitchens/epic-kitchens-100-annotations" }, license: "CC BY-NC 4.0" },
  { id: "ego4d", name: "Ego4D", year: 2021, observations: ["Ego Video", "Audio", "Gaze", "3D/Spatial Metadata", "Task Annotations"], summary: "A large-scale collection of everyday first-person activity spanning many locations, participants, scenarios, and benchmark annotations.", project: "https://ego4d-data.org/", paper: "https://arxiv.org/abs/2110.07058", dataLinks: { "Access request form": "https://ego4d.dev/request/ego4d" }, license: "Ego4D Dataset License Agreement" },
  { id: "h2o", name: "H2O", year: 2021, observations: ["Ego + Exo RGB-D Video", "3D Hand Pose", "6D Object Pose", "Action Labels"], summary: "Synchronized multi-view RGB-D recordings of two-handed object interactions with 3D poses for both hands and manipulated objects.", project: "https://taeinkwon.com/projects/h2o/", paper: "https://arxiv.org/abs/2104.11181", dataLinks: { "Dataset download": "https://taeinkwon.com/projects/h2o/" } },
  { id: "assembly101", name: "Assembly101", year: 2022, observations: ["Ego + Exo Video", "Action Labels", "3D Hand Pose"], summary: "Multi-view recordings of people assembling and disassembling 101 take-apart toy vehicles, including procedural mistakes and fine-grained actions.", project: "https://assembly-101.github.io/", paper: "https://arxiv.org/abs/2203.14712", dataLinks: { "Dataset access": "https://assembly-101.github.io/" }, license: "CC BY-NC 4.0" },
  { id: "hoi4d", name: "HOI4D", year: 2022, observations: ["Ego RGB-D Video", "3D Hand Pose", "Object Pose", "Action and Interaction Labels"], summary: "Egocentric RGB-D sequences for 4D hand-object interaction understanding, with spatial and semantic annotations across everyday objects.", project: "https://hoi4d.github.io/", paper: "https://arxiv.org/abs/2203.01577", dataLinks: { "Dataset access": "https://hoi4d.github.io/" } },
  { id: "arctic", name: "ARCTIC", year: 2023, observations: ["Ego + Exo Video", "3D Hand Meshes", "Object Meshes", "Contact"], summary: "Multi-view bimanual manipulation of articulated objects with interacting hand and object meshes, camera calibration, and contact information.", project: "https://arctic.is.tue.mpg.de/", paper: "https://arxiv.org/abs/2204.13662", dataLinks: { "Code/Data access": "https://arctic.is.tue.mpg.de/" }, license: "ARCTIC Non-Commercial Research License" },
  { id: "assemblyhands", name: "AssemblyHands", year: 2023, observations: ["Ego + Exo Video", "3D Hand Pose"], summary: "Large-scale 3D hand-pose annotations for synchronized assembly recordings with severe occlusion and realistic hand-object interaction.", project: "https://assemblyhands.github.io/", paper: "https://arxiv.org/abs/2304.12301", dataLinks: { "Dataset access": "https://assemblyhands.github.io/" } },
  { id: "ego-exo4d", name: "Ego-Exo4D", year: 2023, observations: ["Ego + Exo Video", "Audio", "Gaze", "Pose", "Skill Annotations"], summary: "Synchronized first- and third-person recordings of skilled human activities with multimodal signals and benchmark annotations.", project: "https://ego-exo4d-data.org/", paper: "https://arxiv.org/abs/2311.18259", dataLinks: { "Access request form": "https://ego4d.dev/request/ego-exo4d" }, license: "Ego-Exo4D Dataset License Agreement" },
  { id: "enigma-51", name: "ENIGMA-51", year: 2023, observations: ["Ego Video", "Action Labels", "Object Interactions", "Text Procedures"], summary: "Industrial egocentric videos of electrical-board repair, accompanied by action annotations, textual procedures, and related 3D assets.", project: "https://fpv-iplab.github.io/ENIGMA-51/", paper: "https://arxiv.org/abs/2309.14809", dataLinks: { "Videos and annotations": "https://fpv-iplab.github.io/ENIGMA-51/" } },
  { id: "holoassist", name: "HoloAssist", year: 2023, observations: ["Ego RGB-D Video", "Audio", "Gaze", "Hand and Head Pose", "Conversation Labels"], summary: "Mixed-reality recordings of instructor-performer collaboration, synchronizing video, depth, gaze, pose, audio, actions, and dialogue.", project: "https://holoassist.github.io/", paper: "https://arxiv.org/abs/2309.17024", dataLinks: { "Toolkit and downloader": "https://github.com/Ember-HoloAssist/holoassist-release" }, license: "CDLA-Permissive-2.0" },
  { id: "egoexo-fitness", name: "EgoExo-Fitness", year: 2024, observations: ["Ego + Exo Video", "Action and Quality Labels"], summary: "Synchronized first- and third-person fitness recordings for temporal action understanding and exercise-quality assessment.", paper: "https://arxiv.org/abs/2406.08877", dataLinks: { "Code and data": "https://github.com/iSEE-Laboratory/EgoExo-Fitness" } },
  { id: "egoexolearn", name: "EgoExoLearn", year: 2024, observations: ["Ego + Exo Video", "Gaze", "Action Annotations"], summary: "A large collection of asynchronous egocentric activity and exocentric demonstrations for learning procedural tasks across viewpoints.", paper: "https://arxiv.org/abs/2403.16182", dataLinks: { "Code and data": "https://github.com/OpenGVLab/EgoExoLearn" } },
  { id: "egomimic", name: "EgoMimic", year: 2024, observations: ["Ego Video", "Hand Pose", "Robot Trajectories"], summary: "Project Aria human demonstrations paired with bimanual robot data for learning manipulation policies from human and robot experience.", project: "https://egomimic.github.io/", paper: "https://arxiv.org/abs/2410.24221", dataLinks: { "Hugging Face dataset": "https://huggingface.co/datasets/gatech/EgoMimic" } },
  { id: "egosurgery", name: "EgoSurgery", year: 2024, observations: ["Ego Video", "Gaze", "Phase, Hand and Tool Labels"], summary: "First-person open-surgery recordings with surgical phase, hand, tool, and gaze annotations for workflow and interaction understanding.", paper: "https://arxiv.org/abs/2405.19644", dataLinks: { "Access instructions": "https://github.com/Fujiry0/EgoSurgery" }, license: "CC BY-NC-SA 4.0" },
  { id: "hot3d", name: "HOT3D", year: 2024, observations: ["Ego RGB-D Video", "3D Hand Pose", "6D Object Pose", "Camera Calibration"], summary: "Project Aria and Quest recordings of hand-object interaction with calibrated cameras, 3D hands, object meshes, and object poses.", project: "https://facebookresearch.github.io/hot3d/", paper: "https://arxiv.org/abs/2406.09598", dataLinks: { "Toolkit and downloader": "https://github.com/facebookresearch/hot3d", "BOP clips": "https://huggingface.co/datasets/bop-benchmark/hot3d" }, license: "Mixed: CC BY-SA 4.0 / CC BY-NC-SA 4.0" },
  { id: "industreal", name: "IndustReal", year: 2024, observations: ["Ego Video", "Action and Error Labels"], summary: "Egocentric recordings of industrial-like procedures, including normal executions and mistakes for procedural activity understanding.", project: "https://github.com/TimSchoonbeek/IndustReal", paper: "https://arxiv.org/abs/2310.17323", dataLinks: { "4TU data repository": "https://data.4tu.nl/datasets/b008dd74-020d-4ea4-a8ba-7bb60769d224/2" }, license: "Apache-2.0" },
  { id: "nymeria", name: "Nymeria", year: 2024, observations: ["Ego Video", "Audio", "Gaze", "Full-Body Motion", "Text"], summary: "Large-scale Project Aria recordings of daily activities with multimodal egocentric sensing, full-body motion, and language descriptions.", project: "https://www.projectaria.com/datasets/nymeria/", paper: "https://arxiv.org/abs/2406.09905", dataLinks: { "Data explorer": "https://explorer.projectaria.com/nymeria", "Hugging Face dataset": "https://huggingface.co/datasets/projectaria/Nymeria" }, license: "CC BY-NC 4.0" },
  { id: "egodex", name: "EgoDex", year: 2025, observations: ["Ego Video", "Depth", "3D Hand Pose", "Camera Pose", "Task Labels"], summary: "Apple Vision Pro recordings of dexterous tabletop manipulation, packaged as video and synchronized spatial metadata for robot learning.", paper: "https://arxiv.org/abs/2505.11709", dataLinks: { "Download manifest": "https://github.com/apple/ml-egodex", "Test archive": "https://ml-site.cdn-apple.com/datasets/egodex/test.zip" }, license: "CC BY-NC-ND 4.0" },
  { id: "egolife", name: "EgoLife", year: 2025, observations: ["Ego + Exo Video", "Audio", "Gaze", "Text and QA Annotations"], summary: "Long-duration daily-life recordings and annotations for multimodal personal-assistant, memory, and video-question-answering research.", project: "https://egolife-ai.github.io/", paper: "https://arxiv.org/abs/2503.03803", dataLinks: { "Hugging Face dataset": "https://huggingface.co/datasets/lmms-lab/EgoLife" }, license: "MIT" },
  { id: "egome", name: "EgoMe", year: 2025, observations: ["Ego + Exo Video", "Gaze", "Motion Sensors", "Action Labels"], summary: "Paired exocentric demonstrations and egocentric imitations of the same activities, with wearable sensor signals for learning by observation.", paper: "https://arxiv.org/abs/2501.19061", dataLinks: { "Hugging Face access": "https://huggingface.co/datasets/HeqianQiu/EgoMe" }, license: "Custom Non-Commercial Agreement" },
  { id: "hd-epic", name: "HD-EPIC", year: 2025, observations: ["Ego Video", "Audio", "Gaze", "3D Grounding", "Dense Labels"], summary: "High-density kitchen recordings with fine-grained actions, object tracks, 3D grounding, narrations, and question-answer annotations.", project: "https://hd-epic.github.io/site/", paper: "https://arxiv.org/abs/2502.04144", dataLinks: { "Data repository": "https://data.bris.ac.uk/data/dataset/3cqb5b81wk2dc2379fx1mrxh47" }, license: "CC BY-NC 4.0" },
  { id: "indego", name: "IndEgo", year: 2025, observations: ["Ego + Exo Video", "Gaze", "Motion", "Industrial Metadata"], summary: "Multimodal egocentric and exocentric recordings of industrial work, combining gaze and motion signals with task context.", project: "https://indego-dataset.github.io/", paper: "https://arxiv.org/abs/2511.19684", dataLinks: { "Hugging Face dataset": "https://huggingface.co/datasets/FraunhoferIPK/IndEgo" }, license: "CC BY 4.0" },
  { id: "openego", name: "OpenEgo", year: 2025, observations: ["Ego Video", "3D Hand Pose", "Camera Pose", "Action Primitives"], summary: "Large-scale egocentric dexterous-manipulation data normalized around hand pose, camera geometry, and reusable action primitives.", project: "https://www.openegocentric.com/", paper: "https://arxiv.org/abs/2509.05513", dataLinks: { "Box dataset": "https://utdallas.box.com/s/1fzj9gr331atfumk5on3bifzpp2idnjr", Toolkit: "https://github.com/physicalinc/openego" }, license: "Mixed: Source Dataset Licenses" },
  { id: "taste-rob", name: "TASTE-Rob", year: 2025, observations: ["Ego Hand-Object Video", "Task and Motion Labels"], summary: "A task-oriented corpus of egocentric hand-object interactions built for controllable video generation and robot-oriented representation learning.", paper: "https://arxiv.org/abs/2503.11423", dataLinks: { "Code and data": "https://github.com/GAP-LAB-CUHK-SZ/TASTE-Rob" } },
  { id: "childlens", name: "ChildLens", year: 2026, observations: ["Child-Worn Ego Video", "Behavioral Annotations"], summary: "Child-perspective first-person recordings collected for developmental and behavioral research in natural environments.", paper: "https://pmc.ncbi.nlm.nih.gov/articles/PMC13076423/", dataLinks: { "Research data repository": "https://doi.org/10.17617/4.fe" } },
  { id: "ego-1k", name: "Ego-1K", year: 2026, observations: ["Synchronized Ego Multi-View Video", "Camera Calibration", "3D/4D Scene Data"], summary: "Synchronized 16-camera egocentric multi-view data designed for reconstructing and generating dynamic 3D and 4D human activity.", paper: "https://arxiv.org/abs/2603.13741", dataLinks: { "Hugging Face dataset": "https://huggingface.co/datasets/facebook/ego-1k" }, license: "FAIR Noncommercial Research License" },
  { id: "egolive", name: "EgoLive", year: 2026, observations: ["Ego Video", "3D Hand and Camera Motion", "Task Labels"], summary: "Large-scale first-person recordings of people completing real tasks, introduced for learning reusable representations and policies from human activity.", paper: "https://arxiv.org/abs/2604.23570", dataLinks: { "JD Cloud dataset portal": "https://robotdata-market.jdcloud.com/console/market" } },
  { id: "egomagic", name: "EgoMAGIC", year: 2026, observations: ["Ego Video", "Audio", "Medical Action and Object Labels"], summary: "In-the-wild first-person medical task videos with action and object annotations for evaluating egocentric medical understanding.", paper: "https://arxiv.org/abs/2604.22036", dataLinks: { "Zenodo dataset": "https://zenodo.org/records/19239155" } },
  { id: "egoverse", name: "EgoVerse", year: 2026, observations: ["Ego Video", "Camera and Body Motion", "Action Semantics"], summary: "Egocentric motion and semantic activity data for learning representations relevant to embodied agents and robot interaction.", paper: "https://arxiv.org/abs/2604.07607", dataLinks: { "Code and data": "https://github.com/GaTech-RL2/EgoVerse" } },
  { id: "xperience-10m", name: "Xperience-10M", year: 2026, observations: ["Ego Video", "Embodied Trajectories", "Spatial Metadata"], summary: "A large embodied-experience collection intended for training models on diverse first-person interaction and robot-relevant behavior.", paper: "https://ropedia.com/blog/20260316_xperience_10m.html", dataLinks: { "Hugging Face dataset": "https://huggingface.co/datasets/ropedia-ai/xperience-10m" }, license: "Custom Non-Commercial Agreement" }
];

const egoResource = (task, dataLinks, options = {}) => ({ task, dataLinks, ...options });
const egoMimicRepo = "gatech/EgoMimic";
const hot3dRepo = "bop-benchmark/hot3d";
const nymeriaRepo = "projectaria/Nymeria";
const egoLifeRepo = "lmms-lab/EgoLife";
const egoMeRepo = "HeqianQiu/EgoMe";
const indEgoRepo = "FraunhoferIPK/IndEgo";
const ego1kRepo = "facebook/ego-1k";
const xperience10mRepo = "ropedia-ai/xperience-10m";

const egoDatasetResourceSpecs = {
  egohands: [
    egoResource("EgoHands dataset archive", { ZIP: "https://www.kaggle.com/api/v1/datasets/download/himaniishah/egohands?datasetVersionNumber=1" })
  ],
  krishnacam: [
    egoResource("Videos", { "Google Drive folder": "https://drive.google.com/drive/folders/1q81yrQenY1dMul3ixJUbOrf9FPOTgMGW?usp=sharing" })
  ],
  fpha: [
    egoResource("Dataset access — application required", {
      "Access form": "https://docs.google.com/forms/d/e/1FAIpQLScoksYrmthDbJeAV0_ysXJDmfvZmzMMsX0_Uhkb6H6DHYGBtg/viewform"
    }, {
      availability: "Access application required"
    })
  ],
  "thu-read": [
    egoResource("Depth", { BaiduYun: "https://pan.baidu.com/s/1eR1EX9o" }),
    egoResource("RGBD1", { BaiduYun: "https://pan.baidu.com/s/1boT5vmn" }),
    egoResource("RGBD2", { BaiduYun: "https://pan.baidu.com/s/1nvdu0Dr" }),
    egoResource("Annotations", { "Google Drive": "https://drive.google.com/file/d/1G0oQsJRZ-wBt9o2RW75jDmmRgvUFMwG0/view?usp=drive_open", BaiduYun: "https://pan.baidu.com/s/1kWPp6rP" }),
    egoResource("Train/Test Splits", { TXT: "https://ivg.au.tsinghua.edu.cn/dataset/samples_THU_READ/Train-Test-Splits.txt" })
  ],
  "charades-ego": [
    egoResource("CharadesEgo_v1_480.tar", { "TAR archive": "https://ai2-public-datasets.s3-us-west-2.amazonaws.com/charades/CharadesEgo_v1_480.tar" })
  ],
  "egtea-gaze-plus": [
    egoResource("Video clips", { TAR: "https://www.dropbox.com/s/udynz2u62wpdva6/video_clips.tar?dl=0" }),
    egoResource("Gaze data", { ZIP: "https://www.dropbox.com/s/2aryvztw044w9ih/gaze_data.zip?dl=0" }),
    egoResource("Action annotations", { ZIP: "https://www.dropbox.com/s/ksro6eqa6v59859/action_annotation.zip?dl=0" }),
    egoResource("Hand masks", { ZIP: "https://www.dropbox.com/s/ysi2jv8qr9xvzli/hand14k.zip?dl=0" }),
    egoResource("Raw video download manifest", { TXT: "https://www.dropbox.com/s/uwwj6wb1j4rsm02/video_links.txt?dl=0" }),
    egoResource("Dataset README", { Markdown: "https://www.dropbox.com/s/i0qdxz484ufai5m/readme.md?dl=0" }),
    egoResource("Recipe definitions", { PDF: "https://www.dropbox.com/s/w260trfnhdfcooh/Recipes.pdf?dl=0" })
  ],
  "epic-kitchens-v1": [
    egoResource("Videos + frames", { "Data repository": "https://data.bris.ac.uk/data/dataset/3h91syskeag572hl6tvuovwv4d" }),
    egoResource("Action narrations + temporal annotations", { Annotations: "https://github.com/epic-kitchens/annotations" })
  ],
  "epic-kitchens-100": [
    egoResource("Videos, RGB frames, optical flow, and metadata", {
      "Complete ZIP": "https://data.bris.ac.uk/datasets/tar/2g1n6qdydwa9u22shpxqzp0t8m.zip",
      "Data repository": "https://data.bris.ac.uk/data/dataset/2g1n6qdydwa9u22shpxqzp0t8m",
      "Academic Torrent": "https://academictorrents.com/details/cc2d9afabcbbe33686d2ecd9844b534e3a899f4b"
    }),
    egoResource("Official dataset downloader", {
      Python: "https://raw.githubusercontent.com/epic-kitchens/epic-kitchens-download-scripts/master/epic_downloader.py",
      Shell: "https://raw.githubusercontent.com/epic-kitchens/epic-kitchens-download-scripts/master/download_full_epic.sh"
    }),
    egoResource("Action recognition / train", { CSV: "https://raw.githubusercontent.com/epic-kitchens/epic-kitchens-100-annotations/master/EPIC_100_train.csv" }),
    egoResource("Action recognition / validation", { CSV: "https://raw.githubusercontent.com/epic-kitchens/epic-kitchens-100-annotations/master/EPIC_100_validation.csv" }),
    egoResource("Action recognition / test timestamps", { CSV: "https://raw.githubusercontent.com/epic-kitchens/epic-kitchens-100-annotations/master/EPIC_100_test_timestamps.csv" }),
    egoResource("Noun and verb classes", {
      "Noun CSV": "https://raw.githubusercontent.com/epic-kitchens/epic-kitchens-100-annotations/master/EPIC_100_noun_classes.csv",
      "Verb CSV": "https://raw.githubusercontent.com/epic-kitchens/epic-kitchens-100-annotations/master/EPIC_100_verb_classes.csv"
    }),
    egoResource("Video metadata", { CSV: "https://raw.githubusercontent.com/epic-kitchens/epic-kitchens-100-annotations/master/EPIC_100_video_info.csv" }),
    egoResource("Unsupervised domain adaptation annotations", { "GitHub folder": "https://github.com/epic-kitchens/epic-kitchens-100-annotations/tree/master/UDA_annotations" }),
    egoResource("Multi-instance retrieval annotations", { "GitHub folder": "https://github.com/epic-kitchens/epic-kitchens-100-annotations/tree/master/retrieval_annotations" }),
    egoResource("Automatic masks and hand-object detections", {
      "Complete ZIP": "https://data.bris.ac.uk/datasets/tar/3l8eci2oqgst92n14w2yqi5ytu.zip",
      "Data repository": "https://data.bris.ac.uk/data/dataset/3l8eci2oqgst92n14w2yqi5ytu"
    })
  ],
  ego4d: [
    egoResource("Dataset access — license approval required", {
      "Access request form": "https://ego4d.dev/request/ego4d"
    }, {
      availability: "License agreement and approval required; AWS credentials are issued after approval"
    })
  ],
  h2o: [
    egoResource("Dataset access — registration required", {
      "Registration / download server": "https://h2odataset.ethz.ch/"
    }, {
      availability: "Account registration and terms acceptance required"
    })
  ],
  assembly101: [
    egoResource("Recordings", { "HF folder": hfDatasetTree("cvml-nus/assembly101", "recordings") }),
    egoResource("Annotations", { "HF folder": hfDatasetTree("cvml-nus/assembly101", "annotations") }),
    egoResource("Poses at 60 fps", { "HF folder": hfDatasetTree("cvml-nus/assembly101", "poses@60fps"), ZIP: hfDatasetBlob("cvml-nus/assembly101", "AssemblyPoses.zip") }),
    egoResource("TSM features", { "HF folder": hfDatasetTree("cvml-nus/assembly101", "TSM_features") }),
    egoResource("DINOv2 features", { "HF folder": hfDatasetTree("cvml-nus/assembly101", "DINOv2_features") }),
    egoResource("Skill labels", { ZIP: hfDatasetBlob("cvml-nus/assembly101", "skill_labels.zip") })
  ],
  hoi4d: [
    egoResource("RGB videos", { OneDrive: "https://1drv.ms/u/c/12e5c3dbeffd0594/EZQF_e_bw-UggBIvAQAAAAAB4AcDOxj_uuh7alRaR9b7MQ?e=GyBNaD" }),
    egoResource("Depth videos", { OneDrive: "https://1drv.ms/f/c/12e5c3dbeffd0594/EpQF_e_bw-UggBIpAQAAAAABswaE_tZsrSwsEoBbFh7F2w?e=K797bs" }),
    egoResource("CAD models", { OneDrive: "https://1drv.ms/u/c/12e5c3dbeffd0594/EZQF_e_bw-UggBIsAQAAAAAB5gBbXuK7eDzXQmzDS5W09g?e=DdkFTE" }),
    egoResource("Annotations", { OneDrive: "https://1drv.ms/u/c/12e5c3dbeffd0594/EZQF_e_bw-UggBIuAQAAAAABELgpzxDxCz58Qov76-wpvw?e=qhyY0h" }),
    egoResource("Camera parameters", { OneDrive: "https://1drv.ms/u/c/12e5c3dbeffd0594/EZQF_e_bw-UggBIqAQAAAAABZBWQ3p5gxd-tu_3rOeSo_A?e=GjWeg8" }),
    egoResource("Hand poses", { OneDrive: "https://1drv.ms/u/c/12e5c3dbeffd0594/EZQF_e_bw-UggBIrAQAAAAABHyHqDhs5CpJAkWTAQoGWxQ?e=ALFMCD" }),
    egoResource("Action segmentation test set", { OneDrive: "https://1drv.ms/f/c/12e5c3dbeffd0594/EpQF_e_bw-UggBIcAQAAAAABw2LzsilH0w3nTtEH3emGlA?e=dKDhCl" }),
    egoResource("Semantic segmentation test set", { OneDrive: "https://1drv.ms/f/c/12e5c3dbeffd0594/EpQF_e_bw-UggBIjAQAAAAAB562IRa4P_xu7YZgSSU_vrA?e=tnIX8V" }),
    egoResource("Dataset mirror", { BaiduYun: "https://pan.baidu.com/s/1ZeX8SzU-gnJ-wpO9ZukulQ?pwd=7gfs" })
  ],
  arctic: [
    egoResource("Dataset access — login required", {
      "Login / download": "https://arctic.is.tue.mpg.de/download.php"
    }, {
      availability: "Registered account login required"
    })
  ],
  assemblyhands: [
    egoResource("Egocentric images", { "Google Drive folder": "https://drive.google.com/drive/folders/1slji-2LSOBo7eCYNqK6O-qpbvS7D2yXm?usp=sharing" }),
    egoResource("Exocentric videos", { "Google Drive folder": "https://drive.google.com/drive/folders/1e_TIb2et_bBoa15DoBFjDT3pV-Ivqqzl?usp=sharing" }),
    egoResource("Annotations", { "Google Drive folder": "https://drive.google.com/drive/folders/1mPif4HbxfDbmAu7_prsVxqknL7nbJulI?usp=sharing" })
  ],
  "ego-exo4d": [
    egoResource("Dataset access — license approval required", {
      "Access request form": "https://ego4d.dev/request/ego-exo4d"
    }, {
      availability: "License agreement and approval required; AWS credentials are issued after approval"
    })
  ],
  "enigma-51": [
    egoResource("Videos", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51-videos.zip" }),
    egoResource("Frames", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51_frames.zip" }),
    egoResource("Annotations", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51_annotations_master.zip" }),
    egoResource("Textual Procedures", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51_procedures.zip" }),
    egoResource("3D models", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51%203D%20Models.zip" }),
    egoResource("Features / CLIP ViT-L", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51_CLIP_exported_features_ViT-L.zip" }),
    egoResource("Features / DINOv2 ViT-g", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51_DINOV2_exported_features_ViTg.zip" }),
    egoResource("Hands keypoints / MMPose", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51_MMPOSE_hands_keypoints.zip" }),
    egoResource("Segmentation masks / SAM-HQ", { ZIP: "https://iplab.dmi.unict.it/sharing/ENIGMA-51/ENIGMA-51_SAMHQ_annotations.zip" })
  ],
  holoassist: [
    egoResource("Pitch-shifted videos", { TAR: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/video_pitch_shifted.tar" }),
    egoResource("Compressed videos / width 256", { TAR: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/video_compress.tar" }),
    egoResource("Ahat depth", { TAR: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/ahat_depth.tar" }),
    egoResource("Eye gaze", { TAR: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/eyes.tar" }),
    egoResource("Hand pose", { TAR: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/hands.tar" }),
    egoResource("Head pose", { TAR: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/head.tar" }),
    egoResource("IMU", { TAR: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/imu.tar" }),
    egoResource("Labels", { JSON: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/data-annotation-trainval-v1_1.json" }),
    egoResource("Camera calibration", { TAR: "https://hl2data.z5.web.core.windows.net/holoassist-data-release/cam_info.tar" }),
    egoResource("Train / validation / test splits", { ZIP: "https://holoassist.github.io/label_files/data-splits-v1_2.zip" }),
    egoResource("Alternative dataset mirror", { "ETH data access": "https://www.research-collection.ethz.ch/entities/researchdata/14421c7d-1fd4-4a02-9bd4-567796d68ed6" })
  ],
  "egoexo-fitness": [
    egoResource("Open frames", { "HF folder": "https://huggingface.co/datasets/Lymann/EgoExo-Fitness/tree/main/frames_open" }),
    egoResource("Open features", { "HF folder": "https://huggingface.co/datasets/Lymann/EgoExo-Fitness/tree/main/features_open" }),
    egoResource("Raw annotations", { "HF folder": "https://huggingface.co/datasets/Lymann/EgoExo-Fitness/tree/main/raw_annotations" }),
    egoResource("Raw videos", { "HF dataset": "https://huggingface.co/datasets/Lymann/EgoExo-Fitness-Raw_videos" })
  ],
  egoexolearn: [
    egoResource("Videos / 320p", { "Google Drive file": "https://drive.google.com/file/d/13L0VsE-qYgeqVVdBW_Yb3qKSAD9ucNfs/view?usp=drive_link" }),
    egoResource("Gaze", { "Google Drive file": "https://drive.google.com/file/d/1W3blKBEe_h_aUcaJdw4ohROLp-apfE39/view?usp=sharing" }),
    egoResource("CLIP features / 5 fps", { "Google Drive file": "https://drive.google.com/file/d/1caIMMCtnws3arFYit0nq4yhBaNdCBOF5/view?usp=drive_link" }),
    egoResource("I3D RGB features", { "Google Drive file": "https://drive.google.com/file/d/1YH0tJLy4YL0_VOW56rQSf-LDIhHkxJhl/view?usp=drive_link" }),
    egoResource("CLIP features / gaze crops", { "Google Drive file": "https://drive.google.com/file/d/1A6hmIBWctXKOTwllV8XcJSopHHMXQNLW/view?usp=drive_link" }),
    egoResource("I3D RGB features / gaze crops", { "Google Drive file": "https://drive.google.com/file/d/1-MCjVrPC25yXgxb5eu6Sgx8HDMQb0ZMa/view?usp=drive_link" }),
    egoResource("Full-resolution videos", { "HF dataset": "https://huggingface.co/datasets/hyf015/EgoExoLearn/tree/main" }),
    egoResource("Dataset mirror", { BaiduYun: "https://pan.baidu.com/s/1fLz5bQn4bMLHU5GiEUxsjg?pwd=tm1g" })
  ],
  egomimic: [
    ...["bowlplace", "groceries", "smallclothfold"].flatMap((task) =>
      ["human", "robot"].map((source) =>
        egoResource(`${task} / ${source}`, { HDF5: hfDatasetBlob(egoMimicRepo, `${task}_${source}.hdf5`) }, { envs: `${task} / ${source}` })
      )
    )
  ],
  egosurgery: [
    egoResource("Dataset access — application required", {
      "Access form": "https://forms.gle/T7Kdqozz9C2kFBZs5",
      "Access instructions": "https://github.com/Fujiry0/EgoSurgery"
    }, {
      availability: "Access request required"
    })
  ],
  hot3d: [
    egoResource("Train / Aria", { "HF folder": hfDatasetTree(hot3dRepo, "train_aria") }),
    egoResource("Train / Quest 3", { "HF folder": hfDatasetTree(hot3dRepo, "train_quest3") }),
    egoResource("Test / Aria", { "HF folder": hfDatasetTree(hot3dRepo, "test_aria") }),
    egoResource("Test / Quest 3", { "HF folder": hfDatasetTree(hot3dRepo, "test_quest3") }),
    egoResource("Test / Aria / BOP format", { "HF folder": hfDatasetTree(hot3dRepo, "test_aria_bop_format") }),
    egoResource("Test / Quest 3 / BOP format", { "HF folder": hfDatasetTree(hot3dRepo, "test_quest3_bop_format") }),
    egoResource("Object models", { "HF folder": hfDatasetTree(hot3dRepo, "object_models"), ZIP: hfDatasetBlob(hot3dRepo, "hot3d_models.zip") }),
    egoResource("Object references / Aria / dynamic", { "HF folder": hfDatasetTree(hot3dRepo, "object_ref_aria_dynamic") }),
    egoResource("Object references / Aria / static", { "HF folder": hfDatasetTree(hot3dRepo, "object_ref_aria_static") }),
    egoResource("Object references / Quest 3 / dynamic", { "HF folder": hfDatasetTree(hot3dRepo, "object_ref_quest3_dynamic") }),
    egoResource("Object references / Quest 3 / static", { "HF folder": hfDatasetTree(hot3dRepo, "object_ref_quest3_static") }),
    egoResource("Base metadata", { ZIP: hfDatasetBlob(hot3dRepo, "hot3d_base.zip"), "Clip definitions": hfDatasetBlob(hot3dRepo, "clip_definitions.json"), "Split definitions": hfDatasetBlob(hot3dRepo, "clip_splits.json") }),
    egoResource("Photorealistic train renderings", { ZIP: hfDatasetBlob(hot3dRepo, "hot3d_train_pbr.zip") })
  ],
  industreal: [
    egoResource("Action recognition labels", { ZIP: "https://data.4tu.nl/file/b008dd74-020d-4ea4-a8ba-7bb60769d224/778d7d5f-6631-4cb6-9451-f88c574c7991" }),
    egoResource("RGB videos", { ZIP: "https://data.4tu.nl/file/b008dd74-020d-4ea4-a8ba-7bb60769d224/cf21602e-4424-42a4-b05d-9897957082ad" }),
    egoResource("Part geometries", { ZIP: "https://data.4tu.nl/file/b008dd74-020d-4ea4-a8ba-7bb60769d224/4b6641cf-0034-4875-8ebb-73e35e4a5b91" }),
    ...[
      ["Train / part 1", "f58a5f18-9a71-4443-8a48-e59530df9ee8"],
      ["Train / part 2", "5aae5141-cece-41db-9681-47acd5300705"],
      ["Train / part 3", "4e2ed830-a1fe-40fa-9c5a-2aeae3964616"],
      ["Train / part 4", "3ff5409e-165f-4354-9fa4-a4fde639a7a6"],
      ["Validation / part 1", "bb336949-248c-4ae6-82ef-107dbe61d10f"],
      ["Validation / part 2", "e899de9f-313a-482b-a6b5-e2de4f38412e"],
      ["Test / part 1", "ec7a4f94-7c1d-497d-b75a-4e694b7a9f7e"],
      ["Test / part 2", "d07789b6-83b1-429d-be0c-95edba210757"],
      ["Test / part 3", "31f88cb6-a2e7-44df-ac51-5aaa0a148fc3"]
    ].map(([label, fileId]) => egoResource(label, { ZIP: `https://data.4tu.nl/file/b008dd74-020d-4ea4-a8ba-7bb60769d224/${fileId}` }))
  ],
  nymeria: [
    egoResource("Recordings + multimodal trajectories", { "Download script": hfDatasetBlob(nymeriaRepo, "download.py"), "Data explorer": "https://explorer.projectaria.com/nymeria" }),
    egoResource("Dataset metadata", { JSON: hfDatasetBlob(nymeriaRepo, "data/dataset_metadata.json") }),
    egoResource("Participant metadata", { CSV: hfDatasetBlob(nymeriaRepo, "data/participants_metadata.csv") })
  ],
  egodex: [
    ...[1, 2, 3, 4, 5].map((part) => egoResource(`Full dataset / part ${part}`, { ZIP: `https://ml-site.cdn-apple.com/datasets/egodex/part${part}.zip` })),
    egoResource("Test split", { ZIP: "https://ml-site.cdn-apple.com/datasets/egodex/test.zip" }),
    egoResource("Additional data", { ZIP: "https://ml-site.cdn-apple.com/datasets/egodex/extra.zip" })
  ],
  egolife: [
    ...["A1_JAKE", "A2_ALICE", "A3_TASHA", "A4_LUCIA", "A5_KATRINA", "A6_SHURE"].map((participant) =>
      egoResource(`Raw recordings / ${participant}`, { "HF folder": hfDatasetTree(egoLifeRepo, participant) }, { envs: participant })
    ),
    egoResource("EgoIT / captions", { JSON: hfDatasetBlob(egoLifeRepo, "EgoIT/EgoLife_Caption.json") }),
    egoResource("EgoIT / question answering", { JSON: hfDatasetBlob(egoLifeRepo, "EgoIT/EgoLife_QA.json") }),
    egoResource("EgoLifeCap / dense captions", { "HF folder": hfDatasetTree(egoLifeRepo, "EgoLifeCap/DenseCaption") }),
    egoResource("EgoLifeCap / transcripts", { "HF folder": hfDatasetTree(egoLifeRepo, "EgoLifeCap/Transcript") }),
    egoResource("EgoLifeQA", { "HF folder": hfDatasetTree(egoLifeRepo, "EgoLifeQA") })
  ],
  egome: [
    egoResource("Annotations", { ZIP: hfDatasetBlob(egoMeRepo, "Annotation.zip") }),
    egoResource("Gaze + IMU", { ZIP: hfDatasetBlob(egoMeRepo, "Gaze_IMU.zip") }),
    ...["Video.z01", "Video.z02", "Video.z03", "Video.z04", "Video.zip"].map((file) =>
      egoResource(`Videos / ${file}`, { "Archive part": hfDatasetBlob(egoMeRepo, file) })
    )
  ],
  "hd-epic": [
    egoResource("Videos, VRS, digital twin, SLAM, gaze, audio, and hand masks", {
      "Data repository": "https://data.bris.ac.uk/data/dataset/3cqb5b81wk2dc2379fx1mrxh47",
      "OneDrive without VRS": "https://uob-my.sharepoint.com/:f:/g/personal/wq23021_bristol_ac_uk/IgA0PLwURLmfQZOl_J256iZtAY_uzFr0gTXVMWCWY4MSGd0?e=6C6wNa"
    }),
    egoResource("Dataset downloader", { Python: "https://raw.githubusercontent.com/hd-epic/hd-epic-downloader/main/hd-epic-downloader.py" }),
    egoResource("Narrations and action segments", { "GitHub folder": "https://github.com/hd-epic/hd-epic-annotations/tree/main/narrations-and-action-segments" }),
    egoResource("Audio annotations", { "GitHub folder": "https://github.com/hd-epic/hd-epic-annotations/tree/main/audio-annotations" }),
    egoResource("High-level recipe annotations", { "GitHub folder": "https://github.com/hd-epic/hd-epic-annotations/tree/main/high-level" }),
    egoResource("Scene and object movements", { "GitHub folder": "https://github.com/hd-epic/hd-epic-annotations/tree/main/scene-and-object-movements" }),
    egoResource("Eye-gaze priming", { "GitHub folder": "https://github.com/hd-epic/hd-epic-annotations/tree/main/eye-gaze-priming" }),
    egoResource("VQA benchmark", { "GitHub folder": "https://github.com/hd-epic/hd-epic-annotations/tree/main/vqa-benchmark" }),
    egoResource("Frame-wise calibration, camera pose, and gaze", { OneDrive: "https://uob-my.sharepoint.com/:f:/g/personal/jc17360_bristol_ac_uk/IgCCGb5qDbiOR7cmj1R9OyUWAXQFYL7FP_d0eMzB4ENPVQk?e=5ONiE8" })
  ],
  indego: [
    ...[
      ["Data collection metadata", "00_Data_Collection"],
      ["Assembly", "1_Assembly"],
      ["Disassembly", "1_Disassembly"],
      ["Inspection + repair", "2_Inspection_Repair"],
      ["Logistics + organization", "3_Logistics_Organization"],
      ["Woodworking", "4_Woodworking"],
      ["Miscellaneous", "5_Miscellaneous"],
      ["Tools + objects in context", "6_Tools_Objects_in_Context"],
      ["Tools + objects demonstrations", "7_Tools_Objects_demo"],
      ["Singular actions", "8_Singular_Actions"],
      ["Visual place recognition", "9_VPR"],
      ["Mistake detection", "Mistake_Detection"],
      ["Visual question answering", "VQA"]
    ].map(([label, path]) => egoResource(label, { "HF folder": hfDatasetTree(indEgoRepo, path) }, { envs: label }))
  ],
  openego: [
    egoResource("OpenEgo dataset", { "Box dataset": "https://utdallas.box.com/s/1fzj9gr331atfumk5on3bifzpp2idnjr" })
  ],
  "taste-rob": [
    egoResource("Dataset access request", { Form: "https://docs.google.com/forms/d/e/1FAIpQLSdOlNnW3t_7TGC2FMDMcIb7jnhRjfynq6xLoz5rJk_i-fl5zQ/viewform?usp=sf_link" }),
    egoResource("ModelScope release", { Dataset: "https://www.modelscope.cn/datasets/GAP-Lab/TASTE-Rob-Dataset" }),
    egoResource("Download tool", { Python: "https://github.com/GAP-LAB-CUHK-SZ/TASTE-Rob/blob/main/download_tool_taste_rob.py" })
  ],
  childlens: [
    egoResource("Child-worn recordings + annotations", { "Research data repository": "https://doi.org/10.17617/4.fe" })
  ],
  "ego-1k": [
    egoResource("Train / Parquet metadata", { "HF data folder": hfDatasetTree(ego1kRepo, "data") }),
    egoResource("Test / Parquet metadata", { "HF data folder": hfDatasetTree(ego1kRepo, "data") }),
    egoResource("Train / video shards", { "HF folder": hfDatasetTree(ego1kRepo, "shards/train") }),
    egoResource("Test / video shards", { "HF folder": hfDatasetTree(ego1kRepo, "shards/test") })
  ],
  egolive: [
    egoResource("Dataset access — JD Cloud login required", { "JD Cloud portal": "https://robotdata-market.jdcloud.com/console/market" }, { availability: "JD Cloud account login required" })
  ],
  egomagic: [
    egoResource("Dataset access — completed form required", {
      "Request form (DOCX)": "https://zenodo.org/records/19239155/files/dataset_access_request_form.docx?download=1",
      "File manifest": "https://zenodo.org/records/19239155/files/download-file-list.txt?download=1",
      README: "https://zenodo.org/records/19239155/files/README.md?download=1"
    }, {
      availability: "Completed access request form required"
    })
  ],
  egoverse: [
    egoResource("Episode metadata", { Notebook: "https://github.com/GaTech-RL2/EgoVerse/blob/main/egomimic/scripts/tutorials/sql_tutorial.ipynb" }),
    egoResource("Episode data", { "Download script": "https://github.com/GaTech-RL2/EgoVerse/blob/main/egomimic/scripts/data_download/sync_s3.py" })
  ],
  "xperience-10m": [
    egoResource("UUID experience shards", { "HF repository tree": hfDatasetBase(xperience10mRepo) })
  ]
};

const egoDatasetCitations = {
  "egohands": String.raw`@InProceedings{Bambach_2015_ICCV,
  author = {Bambach, Sven and Lee, Stefan and Crandall, David J. and Yu, Chen},
  title = {Lending A Hand: Detecting Hands and Recognizing Activities in Complex Egocentric Interactions},
  booktitle = {Proceedings of the IEEE International Conference on Computer Vision (ICCV)},
  month = {December},
  year = {2015}
}`,
  "krishnacam": String.raw`@inproceedings{krishna-wacv2016,
  title = {KrishnaCam: Using a Longitudinal, Single-Person, Egocentric Dataset for Scene Understanding Tasks},
  author = {Krishna Kumar Singh and Kayvon Fatahalian and Alexei A. Efros},
  booktitle = {IEEE Winter Conference on Applications of Computer Vision (WACV)},
  year = {2016}
}`,
  "fpha": String.raw`@misc{fpha2017,
      title={First-Person Hand Action Benchmark with RGB-D Videos and 3D Hand Pose Annotations},
      author={Guillermo Garcia-Hernando and Shanxin Yuan and Seungryul Baek and Tae-Kyun Kim},
      year={2018},
      eprint={1704.02463},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/1704.02463},
}`,
  "thu-read": String.raw`@inproceedings{Tang2017THUREAD,
  author = {Yansong Tang and Yi Tian and Jiwen Lu and Jianjiang Feng and Jie Zhou},
  title = {Action Recognition in RGB-D Egocentric Videos},
  booktitle = {2017 IEEE International Conference on Image Processing (ICIP)},
  pages = {3410--3414},
  year = {2017},
  doi = {10.1109/ICIP.2017.8296915}
}`,
  "charades-ego": String.raw`@misc{sigurdsson2018charadesego,
      title={Charades-Ego: A Large-Scale Dataset of Paired Third and First Person Videos},
      author={Gunnar A. Sigurdsson and Abhinav Gupta and Cordelia Schmid and Ali Farhadi and Karteek Alahari},
      year={2018},
      eprint={1804.09626},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/1804.09626},
}`,
  "egtea-gaze-plus": String.raw`@misc{li2020eye,
  title = {In the Eye of the Beholder: Gaze and Actions in First Person Video},
  author = {Yin Li and Miao Liu and James M. Rehg},
  year = {2020},
  eprint = {2006.00626},
  archivePrefix = {arXiv},
  primaryClass = {cs.CV},
  url = {https://arxiv.org/abs/2006.00626}
}`,
  "epic-kitchens-v1": String.raw`@misc{Damen2018EPICKITCHENS,
      title={Scaling Egocentric Vision: The EPIC-KITCHENS Dataset},
      author={Dima Damen and Hazel Doughty and Giovanni Maria Farinella and Sanja Fidler and Antonino Furnari and Evangelos Kazakos and Davide Moltisanti and Jonathan Munro and Toby Perrett and Will Price and Michael Wray},
      year={2018},
      eprint={1804.02748},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/1804.02748},
}`,
  "epic-kitchens-100": String.raw`@misc{damen2020rescaling,
      title={Rescaling Egocentric Vision},
      author={Dima Damen and Hazel Doughty and Giovanni Maria Farinella and Antonino Furnari and Evangelos Kazakos and Jian Ma and Davide Moltisanti and Jonathan Munro and Toby Perrett and Will Price and Michael Wray},
      year={2021},
      eprint={2006.13256},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      doi={https://doi.org/10.5523/bris.2g1n6qdydwa9u22shpxqzp0t8m},
      url={https://arxiv.org/abs/2006.13256},
}`,
  "ego4d": String.raw`@misc{grauman2022ego4d,
      title={Ego4D: Around the World in 3,000 Hours of Egocentric Video},
      author={Kristen Grauman and Andrew Westbury and Eugene Byrne and Zachary Chavis and Antonino Furnari and Rohit Girdhar and Jackson Hamburger and Hao Jiang and Miao Liu and Xingyu Liu and Miguel Martin and Tushar Nagarajan and Ilija Radosavovic and Santhosh Kumar Ramakrishnan and Fiona Ryan and Jayant Sharma and Michael Wray and Mengmeng Xu and Eric Zhongcong Xu and Chen Zhao and Siddhant Bansal and Dhruv Batra and Vincent Cartillier and Sean Crane and Tien Do and Morrie Doulaty and Akshay Erapalli and Christoph Feichtenhofer and Adriano Fragomeni and Qichen Fu and Abrham Gebreselasie and Cristina Gonzalez and James Hillis and Xuhua Huang and Yifei Huang and Wenqi Jia and Weslie Khoo and Jachym Kolar and Satwik Kottur and Anurag Kumar and Federico Landini and Chao Li and Yanghao Li and Zhenqiang Li and Karttikeya Mangalam and Raghava Modhugu and Jonathan Munro and Tullie Murrell and Takumi Nishiyasu and Will Price and Paola Ruiz Puentes and Merey Ramazanova and Leda Sari and Kiran Somasundaram and Audrey Southerland and Yusuke Sugano and Ruijie Tao and Minh Vo and Yuchen Wang and Xindi Wu and Takuma Yagi and Ziwei Zhao and Yunyi Zhu and Pablo Arbelaez and David Crandall and Dima Damen and Giovanni Maria Farinella and Christian Fuegen and Bernard Ghanem and Vamsi Krishna Ithapu and C. V. Jawahar and Hanbyul Joo and Kris Kitani and Haizhou Li and Richard Newcombe and Aude Oliva and Hyun Soo Park and James M. Rehg and Yoichi Sato and Jianbo Shi and Mike Zheng Shou and Antonio Torralba and Lorenzo Torresani and Mingfei Yan and Jitendra Malik},
      year={2022},
      eprint={2110.07058},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2110.07058},
}`,
  "h2o": String.raw`@misc{kwon2021h2o,
      title={H2O: Two Hands Manipulating Objects for First Person Interaction Recognition},
      author={Taein Kwon and Bugra Tekin and Jan Stuhmer and Federica Bogo and Marc Pollefeys},
      year={2021},
      eprint={2104.11181},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2104.11181},
}`,
  "assembly101": String.raw`@misc{sener2022assembly101,
      title={Assembly101: A Large-Scale Multi-View Video Dataset for Understanding Procedural Activities},
      author={Fadime Sener and Dibyadip Chatterjee and Daniel Shelepov and Kun He and Dipika Singhania and Robert Wang and Angela Yao},
      year={2022},
      eprint={2203.14712},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2203.14712},
}`,
  "hoi4d": String.raw`@misc{liu2022hoi4d,
      title={HOI4D: A 4D Egocentric Dataset for Category-Level Human-Object Interaction},
      author={Yunze Liu and Yun Liu and Che Jiang and Kangbo Lyu and Weikang Wan and Hao Shen and Boqiang Liang and Zhoujie Fu and He Wang and Li Yi},
      year={2024},
      eprint={2203.01577},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2203.01577},
}`,
  "arctic": String.raw`@misc{fan2023arctic,
      title={ARCTIC: A Dataset for Dexterous Bimanual Hand-Object Manipulation},
      author={Zicong Fan and Omid Taheri and Dimitrios Tzionas and Muhammed Kocabas and Manuel Kaufmann and Michael J. Black and Otmar Hilliges},
      year={2023},
      eprint={2204.13662},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2204.13662},
}`,
  "assemblyhands": String.raw`@misc{ohkawa2023assemblyhands,
      title={AssemblyHands: Towards Egocentric Activity Understanding via 3D Hand Pose Estimation},
      author={Takehiko Ohkawa and Kun He and Fadime Sener and Tomas Hodan and Luan Tran and Cem Keskin},
      year={2023},
      eprint={2304.12301},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2304.12301},
}`,
  "ego-exo4d": String.raw`@misc{grauman2024egoexo4d,
      title={Ego-Exo4D: Understanding Skilled Human Activity from First- and Third-Person Perspectives},
      author={Kristen Grauman and Andrew Westbury and Lorenzo Torresani and Kris Kitani and Jitendra Malik and Triantafyllos Afouras and Kumar Ashutosh and Vijay Baiyya and Siddhant Bansal and Bikram Boote and Eugene Byrne and Zach Chavis and Joya Chen and Feng Cheng and Fu-Jen Chu and Sean Crane and Avijit Dasgupta and Jing Dong and Maria Escobar and Cristhian Forigua and Abrham Gebreselasie and Sanjay Haresh and Jing Huang and Md Mohaiminul Islam and Suyog Jain and Rawal Khirodkar and Devansh Kukreja and Kevin J Liang and Jia-Wei Liu and Sagnik Majumder and Yongsen Mao and Miguel Martin and Effrosyni Mavroudi and Tushar Nagarajan and Francesco Ragusa and Santhosh Kumar Ramakrishnan and Luigi Seminara and Arjun Somayazulu and Yale Song and Shan Su and Zihui Xue and Edward Zhang and Jinxu Zhang and Angela Castillo and Changan Chen and Xinzhu Fu and Ryosuke Furuta and Cristina Gonzalez and Prince Gupta and Jiabo Hu and Yifei Huang and Yiming Huang and Weslie Khoo and Anush Kumar and Robert Kuo and Sach Lakhavani and Miao Liu and Mi Luo and Zhengyi Luo and Brighid Meredith and Austin Miller and Oluwatumininu Oguntola and Xiaqing Pan and Penny Peng and Shraman Pramanick and Merey Ramazanova and Fiona Ryan and Wei Shan and Kiran Somasundaram and Chenan Song and Audrey Southerland and Masatoshi Tateno and Huiyu Wang and Yuchen Wang and Takuma Yagi and Mingfei Yan and Xitong Yang and Zecheng Yu and Shengxin Cindy Zha and Chen Zhao and Ziwei Zhao and Zhifan Zhu and Jeff Zhuo and Pablo Arbelaez and Gedas Bertasius and David Crandall and Dima Damen and Jakob Engel and Giovanni Maria Farinella and Antonino Furnari and Bernard Ghanem and Judy Hoffman and C. V. Jawahar and Richard Newcombe and Hyun Soo Park and James M. Rehg and Yoichi Sato and Manolis Savva and Jianbo Shi and Mike Zheng Shou and Michael Wray},
      year={2024},
      eprint={2311.18259},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2311.18259},
}`,
  "enigma-51": String.raw`@misc{enigma512023,
      title={ENIGMA-51: Towards a Fine-Grained Understanding of Human-Object Interactions in Industrial Scenarios},
      author={Francesco Ragusa and Rosario Leonardi and Michele Mazzamuto and Claudia Bonanno and Rosario Scavo and Antonino Furnari and Giovanni Maria Farinella},
      year={2023},
      eprint={2309.14809},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2309.14809},
}`,
  "holoassist": String.raw`@misc{wang2023holoassist,
      title={HoloAssist: an Egocentric Human Interaction Dataset for Interactive AI Assistants in the Real World},
      author={Xin Wang and Taein Kwon and Mahdi Rad and Bowen Pan and Ishani Chakraborty and Sean Andrist and Dan Bohus and Ashley Feniello and Bugra Tekin and Felipe Vieira Frujeri and Neel Joshi and Marc Pollefeys},
      year={2023},
      eprint={2309.17024},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2309.17024},
}`,
  "egoexo-fitness": String.raw`@misc{li2024egoexofitness,
      title={EgoExo-Fitness: Towards Egocentric and Exocentric Full-Body Action Understanding},
      author={Yuan-Ming Li and Wei-Jin Huang and An-Lan Wang and Ling-An Zeng and Jing-Ke Meng and Wei-Shi Zheng},
      year={2024},
      eprint={2406.08877},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2406.08877},
}`,
  "egoexolearn": String.raw`@misc{huang2024egoexolearn,
      title={EgoExoLearn: A Dataset for Bridging Asynchronous Ego- and Exo-centric View of Procedural Activities in Real World},
      author={Yifei Huang and Guo Chen and Jilan Xu and Mingfang Zhang and Lijin Yang and Baoqi Pei and Hongjie Zhang and Lu Dong and Yali Wang and Limin Wang and Yu Qiao},
      year={2025},
      eprint={2403.16182},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2403.16182},
}`,
  "egomimic": String.raw`@misc{egomimic2024,
      title={EgoMimic: Scaling Imitation Learning via Egocentric Video},
      author={Simar Kareer and Dhruv Patel and Ryan Punamiya and Pranay Mathur and Shuo Cheng and Chen Wang and Judy Hoffman and Danfei Xu},
      year={2024},
      eprint={2410.24221},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2410.24221},
}`,
  "egosurgery": String.raw`@misc{egosurgeryphasetoolhts2024,
      title={EgoSurgery-Phase: A Dataset of Surgical Phase Recognition from Egocentric Open Surgery Videos},
      author={Ryo Fujii and Masashi Hatano and Hideo Saito and Hiroki Kajita},
      year={2024},
      eprint={2405.19644},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2405.19644},
}`,
  "hot3d": String.raw`@misc{banerjee2024hot3d,
      title={Introducing HOT3D: An Egocentric Dataset for 3D Hand and Object Tracking},
      author={Prithviraj Banerjee and Sindi Shkodrani and Pierre Moulon and Shreyas Hampali and Fan Zhang and Jade Fountain and Edward Miller and Selen Basol and Richard Newcombe and Robert Wang and Jakob Julian Engel and Tomas Hodan},
      year={2024},
      eprint={2406.09598},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2406.09598},
}`,
  "industreal": String.raw`@misc{industreal2024,
      title={IndustReal: A Dataset for Procedure Step Recognition Handling Execution Errors in Egocentric Videos in an Industrial-Like Setting},
      author={Tim J. Schoonbeek and Tim Houben and Hans Onvlee and Peter H. N. de With and Fons van der Sommen},
      year={2023},
      eprint={2310.17323},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2310.17323},
}`,
  "nymeria": String.raw`@misc{ma2024nymeria,
      title={Nymeria: A Massive Collection of Multimodal Egocentric Daily Motion in the Wild},
      author={Lingni Ma and Yuting Ye and Fangzhou Hong and Vladimir Guzov and Yifeng Jiang and Rowan Postyeni and Luis Pesqueira and Alexander Gamino and Vijay Baiyya and Hyo Jin Kim and Kevin Bailey and David Soriano Fosas and C. Karen Liu and Ziwei Liu and Jakob Engel and Renzo De Nardi and Richard Newcombe},
      year={2024},
      eprint={2406.09905},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2406.09905},
}`,
  "egodex": String.raw`@misc{hoque2026egodex,
      title={EgoDex: Learning Dexterous Manipulation from Large-Scale Egocentric Video},
      author={Ryan Hoque and Peide Huang and David J. Yoon and Mouli Sivapurapu and Jian Zhang},
      year={2026},
      eprint={2505.11709},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2505.11709},
}`,
  "egolife": String.raw`@misc{egolife2025,
      title={EgoLife: Towards Egocentric Life Assistant},
      author={Jingkang Yang and Shuai Liu and Hongming Guo and Yuhao Dong and Xiamengwei Zhang and Sicheng Zhang and Pengyun Wang and Zitang Zhou and Binzhu Xie and Ziyue Wang and Bei Ouyang and Zhengyu Lin and Marco Cominelli and Zhongang Cai and Yuanhan Zhang and Peiyuan Zhang and Fangzhou Hong and Joerg Widmer and Francesco Gringoli and Lei Yang and Bo Li and Ziwei Liu},
      year={2026},
      eprint={2503.03803},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2503.03803},
}`,
  "egome": String.raw`@misc{qiu2025egome,
      title={EgoMe: A New Dataset and Challenge for Following Me via Egocentric View in Real World},
      author={Heqian Qiu and Zhaofeng Shi and Lanxiao Wang and Huiyu Xiong and Xiang Li and Hongliang Li},
      year={2025},
      eprint={2501.19061},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2501.19061},
}`,
  "hd-epic": String.raw`@misc{perrett2025hdepic,
      title={HD-EPIC: A Highly-Detailed Egocentric Video Dataset},
      author={Toby Perrett and Ahmad Darkhalil and Saptarshi Sinha and Omar Emara and Sam Pollard and Kranti Parida and Kaiting Liu and Prajwal Gatti and Siddhant Bansal and Kevin Flanagan and Jacob Chalk and Zhifan Zhu and Rhodri Guerrier and Fahd Abdelazim and Bin Zhu and Davide Moltisanti and Michael Wray and Hazel Doughty and Dima Damen},
      year={2025},
      eprint={2502.04144},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2502.04144},
}`,
  "indego": String.raw`@misc{chavan2025indegod,
      title={IndEgo: A Dataset of Industrial Scenarios and Collaborative Work for Egocentric Assistants},
      author={Vivek Chavan and Yasmina Imgrund and Tung Dao and Sanwantri Bai and Bosong Wang and Ze Lu and Oliver Heimann and Jörg Krüger},
      year={2025},
      eprint={2511.19684},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2511.19684},
}`,
  "openego": String.raw`@misc{jawaid2025openego,
      title={OpenEgo: A Large-Scale Multimodal Egocentric Dataset for Dexterous Manipulation},
      author={Ahad Jawaid and Yu Xiang},
      year={2025},
      eprint={2509.05513},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2509.05513},
}`,
  "taste-rob": String.raw`@misc{zhao2025tasterob,
      title={TASTE-Rob: Advancing Video Generation of Task-Oriented Hand-Object Interaction for Generalizable Robotic Manipulation},
      author={Hongxiang Zhao and Xingchen Liu and Mutian Xu and Yiming Hao and Weikai Chen and Xiaoguang Han},
      year={2025},
      eprint={2503.11423},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2503.11423},
}`,
  "childlens": String.raw`@article{childlens2026, title={ChildLens: An egocentric video dataset for activity analysis in children}, volume={58}, ISSN={1554-3528}, url={http://dx.doi.org/10.3758/s13428-026-02982-6}, DOI={10.3758/s13428-026-02982-6}, number={5}, journal={Behavior Research Methods}, publisher={Springer Science and Business Media LLC}, author={Suffo, Nele-Pauline and Martin, Pierre-Etienne and Suffo, Anas and Haun, Daniel and Bohn, Manuel}, year={2026}, month=Apr }`,
  "ego-1k": String.raw`@misc{ego1k2026,
      title={Ego-1K -- A Large-Scale Multiview Video Dataset for Egocentric Vision},
      author={Jae Yong Lee and Daniel Scharstein and Akash Bapat and Hao Hu and Andrew Fu and Haoru Zhao and Paul Sammut and Xiang Li and Stephen Jeapes and Anik Gupta and Lior David and Saketh Madhuvarasu and Jay Girish Joshi and Jason Wither},
      year={2026},
      eprint={2603.13741},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2603.13741},
}`,
  "egolive": String.raw`@misc{li2026egolive,
      title={EgoLive: A Large-Scale Egocentric Dataset from Real-World Human Tasks},
      author={Yihang Li and Xuelong Wei and Jingzhou Luo and Yingjing Xiao and Yibo Bai and Guangyuan Zhou and Teng Zou and Chenguang Gui and Jiajun Wen and He Zhang and Kangliang Chen and Xing Pan and Shuaiyan Liu and Daming Wang and Tao An and Jiayi Li and Shibo Jin and Wanwan Zhang and Tianyu Wang and Boren Wei and Zhixuan Huang and Fangsheng Liu and Ruodai Li and Hui Zhang and Anson Li and Yicheng Gong and Peng Cao and Jiaming Liang and Liang Lin},
      year={2026},
      eprint={2604.23570},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2604.23570},
}`,
  "egomagic": String.raw`@misc{egomagic2026,
      title={EgoMAGIC- An Egocentric Video Field Medicine Dataset for Training Perception Algorithms},
      author={Brian VanVoorst and Nicholas Walczak and Christopher Gilleo and Charles Meissner and Fabio Felix and Iran Roman and Bea Steers and Claudio Silva and Yuhan Shen and Zijia Lu and Shih-Po Lee and Ehsan Elhamifar},
      year={2026},
      eprint={2604.22036},
      archivePrefix={arXiv},
      primaryClass={cs.CV},
      url={https://arxiv.org/abs/2604.22036},
}`,
  "egoverse": String.raw`@misc{punamiya2026egoverse,
      title={EgoVerse: An Egocentric Human Dataset for Robot Learning from Around the World},
      author={Ryan Punamiya and Simar Kareer and Zeyi Liu and Josh Citron and Ri-Zhao Qiu and Xiongyi Cai and Alexey Gavryushin and Jiaqi Chen and Davide Liconti and Lawrence Y. Zhu and Patcharapong Aphiwetsa and Baoyu Li and Aniketh Cheluva and Pranav Kuppili and Yangcen Liu and Dhruv Patel and Aidan Gao and Hye-Young Chung and Ryan Co and Renee Zbizika and Jeff Liu and Xiaomeng Xu and Haoyu Xiong and Geng Chen and Sebastiano Oliani and Chenyu Yang and Xi Wang and James Fort and Richard Newcombe and Josh Gao and Jason Chong and Garrett Matsuda and Aseem Doriwala and Marc Pollefeys and Robert Katzschmann and Xiaolong Wang and Shuran Song and Judy Hoffman and Danfei Xu},
      year={2026},
      eprint={2604.07607},
      archivePrefix={arXiv},
      primaryClass={cs.RO},
      url={https://arxiv.org/abs/2604.07607},
}`,
  "xperience-10m": String.raw`@misc{xperience10m2026,
  title = {Xperience-10M | Ropedia Dataset Release},
  year = {2026},
  url = {https://ropedia.com/blog/20260316\_xperience\_10m.html},
  note = {BibTeX generated from citation metadata; verify manually}
}`
};

const egoDatasetAccessLinkLabels = {
  fpha: "Access Form",
  ego4d: "Access Form",
  h2o: "Register / Download",
  arctic: "Login / Download",
  "ego-exo4d": "Access Form",
  egosurgery: "Access Form",
  egolive: "Login / Dataset Portal",
  egomagic: "Request Form"
};

const makeEgoDatasetSection = ({
  id,
  name,
  year,
  observations,
  paper,
  project,
  dataLinks,
  license = "TBD"
}) => {
  const resourceSpecs = egoDatasetResourceSpecs[id] || [
    egoResource(`${name} dataset`, dataLinks)
  ];
  const datasetUrl = resourceSpecs
    .flatMap((resource) => Object.values(resource.dataLinks || {}))
    .find(Boolean);
  const datasetLinkLabel = egoDatasetAccessLinkLabels[id] || "Dataset";
  const projectLinks = {
    ...(datasetUrl ? { [datasetLinkLabel]: datasetUrl } : {}),
    ...(project ? { Project: project } : {}),
    ...(paper && paper !== project ? { Paper: paper } : {})
  };

  return {
    id,
    project: name,
    year,
    citation: egoDatasetCitations[id],
    projectLinks,
    defaultOpen: false,
    rows: resourceSpecs.map((resource) => ({
      task: resource.task,
      dataLinks: resource.dataLinks,
      observations: resource.observations || observations,
      actions: resource.actions || ["TBD"],
      demos: resource.demos || "TBD",
      envs: resource.envs || name,
      license: resource.license || license,
      ...(resource.availability ? { availability: resource.availability } : {})
    }))
  };
};

const egoDataSections = egoDatasetRecords.map(makeEgoDatasetSection);

const datasetGroups = [
  {
    id: "robot-data",
    project: "Robot Data",
    source: "robot",
    summary: "Real robot demonstrations and robot-platform datasets.",
    defaultOpen: true,
    sections: [
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
    ]
  },
  {
    id: "umi-data",
    project: "UMI Data",
    source: "umi",
    summary: "Universal Manipulation Interface data and related real-world manipulation collections.",
    defaultOpen: false,
    rows: [
      {
        task: "UMI Manipulation",
        dataLinks: {},
        observations: ["RGB", "Proprio", "Human Demonstration"],
        actions: ["End Effector Pose", "Gripper"],
        demos: "TBD",
        envs: "TBD",
        license: "TBD"
      }
    ]
  },
  {
    id: "simulation-data",
    project: "Simulation Data",
    source: "simulation",
    summary: "Simulation datasets grouped by pipeline subcategory and dataset collection.",
    defaultOpen: true,
    sectionGroups: [
      {
        id: "large-scale-simulation-data",
        project: "Large-Scale Simulation Data",
        summary: "Large-scale synthetic and simulator-generated datasets currently tracked in this table.",
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
        id: "simulation-benchmark",
        project: "Benchmark",
        summary: "Simulation benchmark entries and evaluation datasets.",
        defaultOpen: true,
        sections: [
          {
            id: "robocasa365",
            project: "RoboCasa365",
            summary: "Large-scale kitchen simulation benchmark for everyday manipulation tasks. LeRobot exposes benchmark/task shortcuts and one CloseFridge dataset entry rather than a full task-level dataset tree.",
            projectLinks: {
              Docs: "https://huggingface.co/docs/lerobot/main/robocasa",
              Paper: "https://arxiv.org/abs/2406.02523",
              Project: "https://robocasa.ai/",
              GitHub: "https://github.com/robocasa/robocasa",
              "Pretrained policy": "https://huggingface.co/lerobot/smolvla_robocasa",
              "GR00T 1000 dataset": hfDatasetBase("huiwon/robocasa_mg_gr00t_1000")
            },
            citation: `@misc{nasiriany2024robocasalargescalesimulationeveryday,
  title={RoboCasa: Large-Scale Simulation of Everyday Tasks for Generalist Robots},
  author={Nasiriany, Soroush and Maddukuri, Abhiram and Zhang, Lance and Parikh, Adeet and Lo, Aaron and Joshi, Abhishek and Mandlekar, Ajay and Zhu, Yuke},
  year={2024},
  eprint={2406.02523},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2406.02523}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "RoboCasa365 benchmark and GR00T 1000 dataset",
                dataLinks: {
                  Docs: "https://huggingface.co/docs/lerobot/main/robocasa",
                  "GR00T 1000 dataset": hfDatasetBase("huiwon/robocasa_mg_gr00t_1000"),
                  "Pretrained policy": "https://huggingface.co/lerobot/smolvla_robocasa"
                },
                observations: ["RGB", "Proprioception", "Simulation", "Human Demonstrations"],
                actions: ["12-DoF Mobile Manipulator Control"],
                demos: "600+ hours",
                envs: "365 tasks / 2,500 kitchens / 3,200+ objects",
                license: "TBD"
              }
            ]
          },
          {
            id: "geniesim-3",
            project: "Genie Sim 3.0",
            summary: "Large-scale Isaac Sim robotic manipulation dataset. The repository organizes data as dataset/task-name/robot-type with LeRobot parquet data, metadata, and videos, but does not expose a stable full task list on the provided page.",
            projectLinks: {
              ModelScope: "https://modelscope.cn/datasets/agibot_world/GenieSim3.0-Dataset",
              "dataset/": "https://modelscope.cn/datasets/agibot_world/GenieSim3.0-Dataset/tree/master/dataset/",
              Paper: "https://arxiv.org/abs/2601.02078",
              Project: "https://agibot-world.com/genie-sim",
              GitHub: "https://github.com/AgibotTech/genie_sim"
            },
            citation: `@misc{yin2026geniesim30,
  title={Genie Sim 3.0 : A High-Fidelity Comprehensive Simulation Platform for Humanoid Robot},
  author={Chenghao Yin and Da Huang and Di Yang and Jichao Wang and Nanshu Zhao and Chen Xu and Wenjun Sun and Linjie Hou and Zhijun Li and Junhui Wu and Zhaobo Liu and Zhen Xiao and Sheng Zhang and Lei Bao and Rui Feng and Zhenquan Pang and Jiayu Li and Qian Wang and Maoqing Yao},
  year={2026},
  eprint={2601.02078},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2601.02078}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "Genie Sim 3.0 dataset",
                dataLinks: {
                  "dataset/": "https://modelscope.cn/datasets/agibot_world/GenieSim3.0-Dataset/tree/master/dataset/",
                  ModelScope: "https://modelscope.cn/datasets/agibot_world/GenieSim3.0-Dataset"
                },
                observations: ["LeRobot", "RGB-D", "Proprioception", "Depth", "Segmentation", "Videos"],
                actions: ["Robot Manipulation Actions"],
                demos: "10,000+ hours",
                envs: "200+ tasks / task-robot folders",
                license: "CC BY-NC-SA 4.0"
              }
            ]
          },
          {
            id: "univtac",
            project: "UniVTAC",
            summary: "Simulation-based visuo-tactile benchmark for tactile-driven Franka manipulation policies with GelSight, ViTai, and Xense tactile sensors.",
            projectLinks: {
              ModelScope: "https://modelscope.cn/datasets/byml2024/UniVTAC",
              Project: "https://univtac.github.io/",
              GitHub: "https://github.com/univtac/UniVTAC",
              Paper: "https://arxiv.org/abs/2602.10093"
            },
            citation: `@misc{chen2026univtac,
  title={UniVTAC: A Unified Simulation Platform for Visuo-Tactile Manipulation Data Generation, Learning, and Benchmarking},
  author={Chen, Baijun and Wan, Weijie and Chen, Tianxing and Guo, Xianda and Xu, Congsheng and Qi, Yuanyang and Zhang, Haojie and Wu, Longyan and Xu, Tianling and Li, Zixuan and Wu, Yizhe and Li, Rui and Yang, Xiaokang and Luo, Ping and Sui, Wei and Mu, Yao},
  year={2026},
  eprint={2602.10093},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2602.10093}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "UniVTAC Benchmark",
                dataLinks: {
                  ModelScope: "https://modelscope.cn/datasets/byml2024/UniVTAC"
                },
                observations: ["Vision", "Tactile", "GelSight", "ViTai", "Xense", "Simulation"],
                actions: ["Franka Manipulation"],
                demos: "100 episodes/task (800 total)",
                envs: "8 benchmark tasks / Franka",
                license: "MIT"
              }
            ]
          },
          {
            id: "rm-bench",
            project: "RMbench",
            summary: "Benchmark row added from the requested Hugging Face link with user-provided robotics metadata: dual Agile setup, 9 tasks, and 50 demonstrations per task.",
            projectLinks: {
              HuggingFace: "https://huggingface.co/datasets/THU-KEG/RM-Bench",
              Paper: "https://arxiv.org/abs/2410.16184",
              GitHub: "https://github.com/THU-KEG/RM-Bench",
              "HF Paper": "https://huggingface.co/papers/2410.16184"
            },
            citation: `@misc{liu2026rmbench,
  title={RM-Bench: Benchmarking Reward Models of Language Models with Subtlety and Style},
  author={Liu, Yantao and Yao, Zijun and Min, Rui and Cao, Yixin and Hou, Lei and Li, Juanzi},
  year={2026},
  eprint={2410.16184},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  doi={10.48550/arXiv.2410.16184},
  url={https://arxiv.org/abs/2410.16184}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "RMbench dual Agile benchmark",
                dataLinks: {
                  HuggingFace: "https://huggingface.co/datasets/THU-KEG/RM-Bench"
                },
                observations: ["Simulation", "Dual", "Agile"],
                actions: ["Agile Manipulation"],
                demos: "50 demonstrations/task (450 total)",
                envs: "9 tasks / Agile",
                license: "ODC-BY"
              }
            ]
          },
          {
            id: "robomme",
            project: "RoboMME",
            summary: "Memory-focused robotic manipulation benchmark and H5 training data release for memory-augmented robotic generalist policies.",
            projectLinks: {
              HuggingFace: "https://huggingface.co/datasets/Yinpei/robomme_data_h5",
              Paper: "https://arxiv.org/abs/2603.04639",
              "HF Paper": "https://huggingface.co/papers/2603.04639",
              Project: "https://robomme.github.io/",
              "Benchmark Code": "https://github.com/RoboMME/robomme_benchmark",
              "Policy Learning Code": "https://github.com/RoboMME/MemoryVLA"
            },
            citation: `@misc{dai2026robomme,
  title={RoboMME: Benchmarking and Understanding Memory for Robotic Generalist Policies},
  author={Dai, Yinpei and Fu, Hongze and Lee, Jayjun and Liu, Yuejiang and Zhang, Haoran and Yang, Jianing and Finn, Chelsea and Fazeli, Nima and Chai, Joyce},
  year={2026},
  eprint={2603.04639},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  doi={10.48550/arXiv.2603.04639},
  url={https://arxiv.org/abs/2603.04639}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "RoboMME H5 training data",
                dataLinks: {
                  HuggingFace: "https://huggingface.co/datasets/Yinpei/robomme_data_h5"
                },
                observations: ["H5", "Simulation", "Memory Tasks", "Franka"],
                actions: ["Franka Manipulation"],
                demos: "100 episodes/task (1,600 total)",
                envs: "16 tasks / Franka",
                license: "Apache-2.0"
              }
            ]
          },
          {
            id: "mikasa-robo-vla",
            project: "MIKASA-Robo-VLA",
            summary: "Language-conditioned memory-intensive tabletop manipulation benchmark extending MIKASA-Robo to VLA research with released RLDS and LeRobotDataset trajectories.",
            projectLinks: {
              GitHub: "https://github.com/CognitiveAISystems/MIKASA-Robo",
              Documentation: "https://mikasarobo.github.io/",
              HuggingFace: hfDatasetBase("mikasa-robo/mikasa-robo-vla-lerobot"),
              Paper: "https://openreview.net/forum?id=9cLPurIZMj",
              arXiv: "https://arxiv.org/abs/2502.10550"
            },
            citation: `@inproceedings{cherepanov2026memory,
  title={Memory, Benchmark \\& Robots: A Benchmark for Solving Complex Tasks with Reinforcement Learning},
  author={Cherepanov, Egor and Kachaev, Nikita and Kovalev, Alexey and Panov, Aleksandr I.},
  booktitle={The Fourteenth International Conference on Learning Representations},
  year={2026},
  url={https://openreview.net/forum?id=9cLPurIZMj}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "MIKASA-Robo-VLA trajectory release",
                dataLinks: {
                  HuggingFace: hfDatasetBase("mikasa-robo/mikasa-robo-vla-lerobot"),
                  GitHub: "https://github.com/CognitiveAISystems/MIKASA-Robo"
                },
                observations: ["RGB", "State", "Language Instructions", "Simulation", "Memory Tasks", "Franka"],
                actions: ["Franka End-Effector Delta Pose"],
                demos: "22,500 trajectories",
                envs: "90 tasks / Franka",
                license: "MIT"
              }
            ]
          },
          {
            id: "bicoord",
            project: "BiCoord",
            summary: "Bimanual long-horizon spatial-temporal coordination benchmark built on RoboTwin 2.0. The Hugging Face release exposes 18 task folders with demo_clean trajectory data, task instructions, stages, and videos.",
            projectLinks: {
              HuggingFace: hfDatasetBase(bicoordRepo),
              Project: "https://buaa-colalab.github.io/BiCoord/",
              GitHub: "https://github.com/buaa-colalab/BiCoord-Bench",
              Paper: "https://arxiv.org/abs/2604.05831",
              Checkpoints: "https://huggingface.co/Oshwiciqwq/BiCoord-checkpoints"
            },
            citation: `@misc{peng2026bicoord,
  title={BiCoord: A Bimanual Manipulation Benchmark towards Long-Horizon Spatial-Temporal Coordination},
  author={Peng, Xingyu and Gao, Chen and Jin, Liankai and Li, Annan and Liu, Si},
  year={2026},
  eprint={2604.05831},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2604.05831}
}`,
            defaultOpen: true,
            rows: bicoordRows
          },
          {
            id: "roboverse",
            project: "RoboVerse",
            summary: "Unified simulation platform, dataset, and benchmark for scalable robot learning. The paper summarizes 500k unique trajectories, while its statistics table reports 510.5k manipulation trajectories across 276 task categories and 5.5k assets.",
            projectLinks: {
              HuggingFace: hfDatasetBase(roboVerseRepo),
              "HF trajs/": hfDatasetTree(roboVerseRepo, "trajs"),
              Project: "https://roboverseorg.github.io/",
              Documentation: "https://roboverse.wiki/",
              GitHub: "https://github.com/RoboVerseOrg/RoboVerse",
              Paper: "https://arxiv.org/abs/2504.18904",
              "HF Paper": "https://huggingface.co/papers/2504.18904"
            },
            citation: `@misc{geng2025roboverse,
  title={RoboVerse: Towards a Unified Platform, Dataset and Benchmark for Scalable and Generalizable Robot Learning},
  author={Geng, Haoran and Wang, Feishi and Wei, Songlin and Li, Yuyang and Wang, Bangjun and An, Boshi and Cheng, Charlie Tianyue and Lou, Haozhe and Li, Peihao and Wang, Yen-Jen and Liang, Yutong and Goetting, Dylan and Xu, Chaoyi and Chen, Haozhe and Qian, Yuxi and Geng, Yiran and Mao, Jiageng and Wan, Weikang and Zhang, Mingtong and Lyu, Jiangran and Zhao, Siheng and Zhang, Jiazhao and Zhang, Jialiang and Zhao, Chengyang and Lu, Haoran and Ding, Yufei and Gong, Ran and Wang, Yuran and Kuang, Yuxuan and Wu, Ruihai and Jia, Baoxiong and Sferrazza, Carlo and Dong, Hao and Huang, Siyuan and Wang, Yue and Malik, Jitendra and Abbeel, Pieter},
  year={2025},
  eprint={2504.18904},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2504.18904}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "RoboVerse unified manipulation corpus",
                dataLinks: {
                  HuggingFace: hfDatasetBase(roboVerseRepo),
                  "trajs/": hfDatasetTree(roboVerseRepo, "trajs")
                },
                observations: ["Simulation", "Multi-Embodiment", "Assets", "Scenes", "Trajectories"],
                actions: ["Multi-Embodiment Robot Manipulation"],
                demos: "510.5k manipulation trajectories",
                envs: "1 unified benchmark / 276 task categories / gripper arms, dexterous hands, bimanual systems, Unitree Dog, JetBot, humanoid setups",
                license: "Apache-2.0"
              }
            ]
          },
          {
            id: "genmanip-bench",
            project: "GenManip / GenManip-Bench",
            summary: "LLM-driven Isaac Sim manipulation suite and benchmark for instruction-following policy generalization. The paper reports 200 benchmark scenarios and 10K annotated 3D object assets; the HF OOC_Bench release contains about 1.07k demos/episodes.",
            projectLinks: {
              HuggingFace: hfDatasetBase(genManipRepo),
              "HF data/": hfDatasetTree(genManipRepo, "data"),
              "HF meta/": hfDatasetTree(genManipRepo, "meta"),
              Project: "https://genmanip.com/",
              GitHub: "https://github.com/InternRobotics/GenManip",
              Paper: "https://arxiv.org/abs/2506.10966",
              "HF Paper": "https://huggingface.co/papers/2506.10966"
            },
            citation: `@inproceedings{gao2025genmanip,
  title={GenManip: LLM-driven Simulation for Generalizable Instruction-Following Manipulation},
  author={Gao, Ning and Chen, Yilun and Yang, Shuai and Chen, Xinyi and Tian, Yang and Li, Hao and Huang, Haifeng and Wang, Hanqing and Wang, Tai and Pang, Jiangmiao},
  booktitle={CVPR},
  year={2025}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "GenManip OOC_Bench dataset",
                dataLinks: {
                  HuggingFace: hfDatasetBase(genManipRepo),
                  "data/": hfDatasetTree(genManipRepo, "data"),
                  "meta/": hfDatasetTree(genManipRepo, "meta"),
                  "videos/": hfDatasetTree(genManipRepo, "videos")
                },
                observations: ["LeRobot/GR00T Format", "Parquet", "Videos", "Simulation", "Isaac Sim"],
                actions: ["Single Franka Arm Manipulation"],
                demos: "~1.07k demos/episodes",
                envs: "1 OOC_Bench / single Franka Arm in Isaac Sim / 200 benchmark scenarios / 10K annotated 3D object assets",
                license: "TBD"
              }
            ]
          },
          {
            id: "robocerebra",
            project: "RoboCerebra",
            summary: "Long-horizon robotic manipulation benchmark for System 2 reasoning. The project reports 1,000 human-annotated trajectories across 100 task variants, with trajectories up to 3,000 simulation steps and an average length of 2,972 steps.",
            projectLinks: {
              HuggingFace: hfDatasetBase(roboCerebraRepo),
              "HF trainset/": hfDatasetTree(roboCerebraRepo, "RoboCerebra_trainset"),
              "HF RLDS exports": hfDatasetTree(roboCerebraRepo, "RoboCerebra_trainset_coffee_table_p1p2_rlds"),
              "HF benchmark cases": hfDatasetTree(roboCerebraRepo, "RoboCerebraBench"),
              Project: "https://robocerebra.github.io/",
              GitHub: "https://github.com/buaa-colalab/RoboCerebra",
              Paper: "https://arxiv.org/abs/2506.06677"
            },
            citation: `@article{han2025robocerebra,
  title={RoboCerebra: A Large-scale Benchmark for Long-horizon Robotic Manipulation Evaluation},
  author={Han, Songhao and Qiu, Boxiang and Liao, Yue and Huang, Siyuan and Gao, Chen and Yan, Shuicheng and Liu, Si},
  journal={arXiv preprint arXiv:2506.06677},
  year={2025}
}`,
            defaultOpen: true,
            rows: [
              {
                task: "RoboCerebra long-horizon trainset and benchmark",
                dataLinks: {
                  HuggingFace: hfDatasetBase(roboCerebraRepo),
                  "trainset/": hfDatasetTree(roboCerebraRepo, "RoboCerebra_trainset"),
                  "benchmark cases": hfDatasetTree(roboCerebraRepo, "RoboCerebraBench")
                },
                observations: ["RGB", "Language Instructions", "Subtask Annotations", "Simulation", "RLDS"],
                actions: ["LIBERO/robosuite Franka Panda-style Manipulation"],
                demos: "1,000 human-annotated trajectories",
                envs: "100 task variants / LIBERO/robosuite single tabletop arm / Franka Panda-style setup",
                license: "MIT"
              }
            ]
          },
          {
            id: "robotwin-2",
            project: "RoboTwin 2.0",
            summary: "Scalable data generator and benchmark for robust bimanual robotic manipulation. The official release describes 50 dual-arm tasks across 5 robot embodiments and over 100,000 pre-collected trajectories; the Hugging Face dataset currently exposes 50 task folders with 460 zip files, covering 230 embodiment-task clean/randomized pairs.",
            projectLinks: {
              HuggingFace: hfDatasetBase(roboTwin2Repo),
              "HF dataset/": hfDatasetTree(roboTwin2Repo, "dataset"),
              Project: "https://robotwin-platform.github.io/",
              Documentation: "https://robotwin-platform.github.io/doc/",
              "Tasks Doc": "https://robotwin-platform.github.io/doc/tasks/",
              GitHub: "https://github.com/robotwin-Platform/RoboTwin",
              Paper: "https://arxiv.org/abs/2506.18088"
            },
            citation: `@article{chen2025robotwin,
  title={Robotwin 2.0: A scalable data generator and benchmark with strong domain randomization for robust bimanual robotic manipulation},
  author={Chen, Tianxing and Chen, Zanxin and Chen, Baijun and Cai, Zijian and Liu, Yibin and Li, Zixuan and Liang, Qiwei and Lin, Xianliang and Ge, Yiheng and Gu, Zhenyu and others},
  journal={arXiv preprint arXiv:2506.18088},
  year={2025}
}`,
            defaultOpen: true,
            rows: roboTwin2Rows
          },
          {
            id: "vlabench",
            project: "VLABench",
            summary: "Large-scale language-conditioned manipulation benchmark for long-horizon reasoning. The benchmark covers 100 task categories with strong randomization and 2,000+ objects; the primitive fine-tuning release provides 10 tasks with 500 episodes each, totaling 5,000 demos for a Franka Panda robot.",
            projectLinks: {
              "HF primitive FT": hfDatasetBase(vlaBenchPrimitiveRepo),
              "HF VLM eval": hfDatasetBase(vlaBenchVlmEvalRepo),
              Project: "https://vlabench.github.io/",
              GitHub: "https://github.com/OpenMOSS/VLABench",
              Paper: "https://arxiv.org/abs/2412.18194"
            },
            citation: `@misc{zhang2024vlabench,
  title={VLABench: A Large-Scale Benchmark for Language-Conditioned Robotics Manipulation with Long-Horizon Reasoning Tasks},
  author={Zhang, Shiduo and Xu, Zhe and Liu, Peiju and Yu, Xiaopeng and Li, Yuan and Gao, Qinghui and Fei, Zhaoye and Yin, Zhangyue and Wu, Zuxuan and Jiang, Yu-Gang and Qiu, Xipeng},
  year={2024},
  eprint={2412.18194},
  archivePrefix={arXiv},
  primaryClass={cs.RO},
  url={https://arxiv.org/abs/2412.18194}
}`,
            defaultOpen: true,
            rows: vlaBenchPrimitiveRows
          },
          {
            id: "the-colosseum",
            project: "The Colosseum",
            summary: "RLBench-based simulation benchmark for evaluating robotic manipulation generalization. The dataset contains 20 RLBench tasks, 100 training demonstrations for the vanilla task setting, and 25 test demonstrations for each applicable variation factor across perturbations such as object, tabletop, background, lighting, distractors, physics, and camera pose.",
            projectLinks: {
              HuggingFace: hfDatasetBase(colosseumRepo),
              Project: "https://robot-colosseum.github.io/",
              Documentation: "https://robot-colosseum.readthedocs.io/en/latest/overview.html",
              GitHub: "https://github.com/robot-colosseum/robot-colosseum",
              Paper: "https://arxiv.org/abs/2402.08191"
            },
            citation: `@article{pumacay2024colosseum,
  title={THE COLOSSEUM: A Benchmark for Evaluating Generalization for Robotic Manipulation},
  author={Pumacay, Wilbert and Singh, Ishika and Duan, Jiafei and Krishna, Ranjay and Thomason, Jesse and Fox, Dieter},
  booktitle={arXiv preprint arXiv:2402.08191},
  year={2024}
}`,
            defaultOpen: true,
            rows: colosseumRows
          },
          {
            id: "maniskill-hab",
            project: "ManiSkill-HAB",
            summary: "ICLR 2025 ManiSkill-HAB benchmark for low-level manipulation in home rearrangement tasks. The project dataset table exposes three long-horizon task datasets with 2x 128x128 RGB-D plus state, 1000 episodes per target object/articulation, and event labels on all trajectories.",
            projectLinks: {
              Project: "https://arth-shukla.github.io/mshab/",
              Dataset: "https://arth-shukla.github.io/mshab/#dataset-section",
              GitHub: "https://github.com/arth-shukla/mshab",
              Paper: "https://arxiv.org/abs/2412.13211",
              OpenReview: "https://openreview.net/forum?id=6bKEWevgSd",
              "TidyHouse HF": hfDatasetBase(msHabRepos.TidyHouse),
              "PrepareGroceries HF": hfDatasetBase(msHabRepos.PrepareGroceries),
              "SetTable HF": hfDatasetBase(msHabRepos.SetTable)
            },
            citation: `@inproceedings{shukla2025maniskillhab,
  author={Arth Shukla and Stone Tao and Hao Su},
  title={ManiSkill-HAB: {A} Benchmark for Low-Level Manipulation in Home Rearrangement Tasks},
  booktitle={The Thirteenth International Conference on Learning Representations, {ICLR} 2025, Singapore, April 24-28, 2025},
  publisher={OpenReview.net},
  year={2025},
  url={https://openreview.net/forum?id=6bKEWevgSd},
  biburl={https://dblp.org/rec/conf/iclr/ShuklaTS25.bib},
  bibsource={dblp computer science bibliography, https://dblp.org}
}`,
            defaultOpen: true,
            rows: msHabRows
          },
          {
            id: "libero",
            project: "LIBERO",
            summary: "NeurIPS 2023 Datasets and Benchmarks benchmark for knowledge transfer in lifelong robot learning. The official dataset page lists four task suites with 130 tasks and 65,000 high-quality demonstrations; the official Hugging Face mirror exposes one HDF5 file per task.",
            projectLinks: {
              Project: "https://libero-project.github.io/",
              Datasets: "https://libero-project.github.io/datasets",
              Documentation: "https://lifelong-robot-learning.github.io/LIBERO/html/getting_started/overview.html",
              GitHub: "https://github.com/Lifelong-Robot-Learning/LIBERO",
              Paper: "https://arxiv.org/abs/2306.03310",
              HuggingFace: hfDatasetBase(liberoRepo),
              "HF LIBERO-Spatial": hfDatasetTree(liberoRepo, "libero_spatial"),
              "HF LIBERO-Object": hfDatasetTree(liberoRepo, "libero_object"),
              "HF LIBERO-Goal": hfDatasetTree(liberoRepo, "libero_goal"),
              "HF LIBERO-90": hfDatasetTree(liberoRepo, "libero_90"),
              "HF LIBERO-10": hfDatasetTree(liberoRepo, "libero_10")
            },
            citation: `@article{liu2023libero,
  title={LIBERO: Benchmarking Knowledge Transfer for Lifelong Robot Learning},
  author={Liu, Bo and Zhu, Yifeng and Gao, Chongkai and Feng, Yihao and Liu, Qiang and Zhu, Yuke and Stone, Peter},
  journal={arXiv preprint arXiv:2306.03310},
  year={2023}
}`,
            defaultOpen: true,
            rows: liberoRows
          },
          {
            id: "maniskill",
            project: "ManiSkill",
            summary: "Latest ManiSkill demonstration dataset release for GPU-parallelized robotics simulation. The official docs provide task-ID downloads from Hugging Face; the repo exposes 16 environment folders, each with zipped HDF5 trajectories, JSON metadata, and sample videos.",
            projectLinks: {
              Project: "https://maniskill.ai/",
              Documentation: "https://maniskill.readthedocs.io/en/latest/",
              "Demonstration docs": "https://maniskill.readthedocs.io/en/latest/user_guide/datasets/demos.html",
              Tasks: "https://maniskill.readthedocs.io/en/latest/tasks/index.html",
              GitHub: "https://github.com/haosulab/ManiSkill",
              HuggingFace: hfDatasetBase(maniSkillDemoRepo),
              "PePy stats": "https://pepy.tech/projects/mani_skill?timeRange=threeMonths&category=version&includeCIDownloads=true&granularity=weekly&viewType=line&versions=Total%2C3.*",
              Paper: "https://arxiv.org/abs/2410.00425"
            },
            citation: `@article{taomaniskill3,
  title={ManiSkill3: GPU Parallelized Robotics Simulation and Rendering for Generalizable Embodied AI},
  author={Stone Tao and Fanbo Xiang and Arth Shukla and Yuzhe Qin and Xander Hinrichsen and Xiaodi Yuan and Chen Bao and Xinsong Lin and Yulin Liu and Tse-kai Chan and Yuan Gao and Xuanlin Li and Tongzhou Mu and Nan Xiao and Arnav Gurha and Viswesh Nagaswamy Rajesh and Yong Woo Choi and Yen-Ru Chen and Zhiao Huang and Roberto Calandra and Rui Chen and Shan Luo and Hao Su},
  journal={Robotics: Science and Systems},
  year={2025}
}`,
            defaultOpen: true,
            rows: maniSkillDemoRows
          },
          {
            id: "furniturebench",
            project: "FurnitureBench",
            summary: "RSS 2023 reproducible real-world furniture assembly benchmark with FurnitureSim support. The official dataset table reports 5,100 successful teleoperation demonstrations totaling 219.6 hours across 9 furniture models and 3 initial-randomness levels.",
            projectLinks: {
              Project: "https://clvrai.github.io/furniture-bench/",
              Documentation: "https://clvrai.github.io/furniture-bench/docs/index.html",
              Dataset: "https://clvrai.github.io/furniture-bench/docs/tutorials/dataset.html",
              "Drive folder": furnitureBenchDriveFolder,
              GitHub: "https://github.com/clvrai/furniture-bench",
              Paper: "https://arxiv.org/abs/2305.12821"
            },
            citation: `@inproceedings{heo2023furniturebench,
  title={FurnitureBench: Reproducible Real-World Benchmark for Long-Horizon Complex Manipulation},
  author={Minho Heo and Youngwoon Lee and Doohyun Lee and Joseph J. Lim},
  booktitle={Robotics: Science and Systems},
  year={2023}
}`,
            defaultOpen: true,
            rows: furnitureBenchRows
          },
          {
            id: "roboset",
            project: "RoboSet / RoboHive",
            summary: "Large-scale real-world multi-task kitchen robotics dataset released with RoboHive/RoboAgent. The teleoperation page exposes 9,500 immediately downloadable teleoperated trajectories across 38 activity-task-scene rows, with 250 demonstrations per row; the page describes a broader 30,050-trajectory dataset.",
            projectLinks: {
              RoboSet: "https://robopen.github.io/roboset/",
              Teleoperation: "https://robopen.github.io/roboset/teleoperation.html",
              RoboHive: "https://sites.google.com/view/robohive",
              RoboAgent: "https://robopen.github.io/",
              Paper: "https://arxiv.org/abs/2309.01918"
            },
            citation: `@misc{bharadhwaj2023roboagent,
  title={RoboAgent: Generalization and Efficiency in Robot Manipulation via Semantic Augmentations and Action Chunking},
  author={Homanga Bharadhwaj and Jay Vakil and Mohit Sharma and Abhinav Gupta and Shubham Tulsiani and Vikash Kumar},
  year={2023},
  eprint={2309.01918},
  archivePrefix={arXiv},
  primaryClass={cs.RO}
}`,
            defaultOpen: true,
            rows: roboSetTeleopRows
          }
        ]
      }
    ]
  },
  {
    id: "ego-data",
    project: "Ego Data",
    source: "ego",
    summary: "Ego-centric human demonstration data for robot learning and observation modeling.",
    defaultOpen: false,
    sections: egoDataSections
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

const getGroupSections = (group) => group.sectionGroups
  ? group.sectionGroups.flatMap((sectionGroup) => sectionGroup.sections || [])
  : (group.sections || []);

const groupOpenState = Object.fromEntries(datasetGroups.map((group) => [group.id, group.defaultOpen]));
const sectionGroupOpenState = Object.fromEntries(
  datasetGroups.flatMap((group) =>
    (group.sectionGroups || []).map((sectionGroup) => [sectionGroup.id, sectionGroup.defaultOpen])
  )
);
const sectionOpenState = Object.fromEntries(
  datasetGroups.flatMap((group) =>
    getGroupSections(group).map((section) => [section.id, section.defaultOpen])
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
  "interndata-a1": 2026,
  "interndata-m1": 2025,
  "molmobot-data": 2026,
  "nvidia-gr00t-x-sim": 2025,
  dexmimicgen: 2025,
  "dexgraspnet-2": 2024,
  mimicgen: 2023,
  dexgraspnet: 2023,
  robocasa365: 2024,
  "geniesim-3": 2026,
  univtac: 2026,
  "rm-bench": 2026,
  robomme: 2026,
  "mikasa-robo-vla": 2026,
  bicoord: 2026,
  roboverse: 2025,
  "genmanip-bench": 2025,
  robocerebra: 2025,
  "robotwin-2": 2025,
  vlabench: 2024,
  "the-colosseum": 2024,
  "maniskill-hab": 2025,
  libero: 2023,
  maniskill: 2025,
  furniturebench: 2023,
  roboset: 2023
};

const formatNumber = (value) => {
  if (typeof value !== "number") return value;
  return new Intl.NumberFormat("en-US").format(value);
};

const formatSource = (source) => sourceLabels[source] || source;

const unique = (items) => [...new Set(items)];

const getGroupRows = (group) => group.sectionGroups
  ? group.sectionGroups.flatMap((sectionGroup) =>
    (sectionGroup.sections || []).flatMap((section) => section.rows)
  )
  : group.sections
  ? group.sections.flatMap((section) => section.rows)
  : group.rows;

const getAllRows = () => datasetGroups.flatMap((group) =>
  group.sectionGroups
    ? group.sectionGroups.flatMap((sectionGroup) =>
      (sectionGroup.sections || []).flatMap((section) =>
        section.rows.map((row) => ({ ...row, group, section, sectionGroup }))
      )
    )
    : group.sections
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

const rowMatchesFilters = (row, group, section, sectionGroup) => {
  const query = normalize(document.querySelector("#searchInput").value.trim());
  const source = document.querySelector("#sourceFilter").value;
  const task = document.querySelector("#taskFilter").value;
  const haystack = normalize([
    group.project,
    group.source,
    group.summary,
    sectionGroup?.project,
    sectionGroup?.summary,
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
    if (group.sectionGroups) {
      const sectionGroups = group.sectionGroups.map((sectionGroup) => {
        const sections = (sectionGroup.sections || [])
          .map((section) => ({
            ...section,
            rows: section.rows.filter((row) => rowMatchesFilters(row, group, section, sectionGroup))
          }))
          .filter((section) => section.rows.length);
        return { ...sectionGroup, sections, rows: sections.flatMap((section) => section.rows) };
      });
      return { ...group, sectionGroups, rows: sectionGroups.flatMap((sectionGroup) => sectionGroup.rows) };
    }

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
          <span class="pill">${rows.length} task ${rows.length === 1 ? "row" : "rows"}</span>
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
    const hasSectionGroups = Boolean(group.sectionGroups?.length);
    const hasSections = Boolean(group.sections?.length);
    const groupRow = `
      <tr class="group-row" data-group="${group.id}">
        <td colspan="7">
          <button class="group-toggle" type="button" data-group="${group.id}" aria-expanded="${isOpen}">
            <span class="chevron" aria-hidden="true">${isOpen ? "v" : ">"}</span>
            <span class="dataset-name">${group.project}</span>
            ${yearPill(group)}
            <span class="pill ${group.source}">${formatSource(group.source)}</span>
            <span class="dataset-sub">${group.rows.length} task ${group.rows.length === 1 ? "row" : "rows"}</span>
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

    const renderSectionRow = (section, parentId = section.id, extraClass = "") => {
      const isSectionOpen = queryActive || sourceActive || taskActive || sectionOpenState[section.id];
      const sectionRow = `
        <tr class="section-row${extraClass}" data-group="${group.id}" data-section="${section.id}">
          <td colspan="7">
            <button class="section-toggle" type="button" data-section="${section.id}" aria-expanded="${isSectionOpen}">
              <span class="chevron" aria-hidden="true">${isSectionOpen ? "v" : ">"}</span>
              <span class="dataset-name">${section.project}</span>
              ${yearPill(section)}
              <span class="dataset-sub">${section.rows.length} task ${section.rows.length === 1 ? "row" : "rows"}</span>
            </button>
            ${section.summary ? `<span class="group-summary">${section.summary}</span>` : ""}
            ${projectLinkList(section.projectLinks)}
          </td>
          <td>${citationBlock(section.citation)}</td>
        </tr>
      `;
      const tasks = isSectionOpen
        ? section.rows.map((row) => renderTaskRow(row, parentId)).join("")
        : "";

      return sectionRow + tasks;
    };

    const sectionGroupRows = hasSectionGroups && isOpen ? group.sectionGroups.map((sectionGroup) => {
      const isSectionGroupOpen = queryActive || sourceActive || taskActive || sectionGroupOpenState[sectionGroup.id];
      const showEmptyGroup = !queryActive && !taskActive;
      if (!sectionGroup.rows.length && !showEmptyGroup) return "";

      const sectionGroupRow = `
        <tr class="subcategory-row" data-group="${group.id}" data-section-group="${sectionGroup.id}">
          <td colspan="7">
            <button class="subcategory-toggle" type="button" data-section-group="${sectionGroup.id}" aria-expanded="${isSectionGroupOpen}">
              <span class="chevron" aria-hidden="true">${isSectionGroupOpen ? "v" : ">"}</span>
              <span class="dataset-name">${sectionGroup.project}</span>
              <span class="dataset-sub">${sectionGroup.rows.length} task ${sectionGroup.rows.length === 1 ? "row" : "rows"}</span>
            </button>
            <span class="group-summary">${sectionGroup.summary}</span>
          </td>
          <td><span class="muted">-</span></td>
        </tr>
      `;
      const sections = isSectionGroupOpen
        ? sectionGroup.sections.map((section) => renderSectionRow(section, section.id, " subgroup-section-row")).join("")
        : "";

      return sectionGroupRow + sections;
    }).join("") : "";

    const sectionRows = hasSections && isOpen
      ? group.sections.map((section) => renderSectionRow(section)).join("")
      : "";

    const childRows = !hasSectionGroups && !hasSections && isOpen
      ? group.rows.map((row) => renderTaskRow(row, group.id)).join("")
      : "";

    return groupRow + sectionGroupRows + sectionRows + childRows;
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

  document.querySelectorAll(".subcategory-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const sectionGroupId = button.dataset.sectionGroup;
      sectionGroupOpenState[sectionGroupId] = !sectionGroupOpenState[sectionGroupId];
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
