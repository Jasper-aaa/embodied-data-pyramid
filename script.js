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
