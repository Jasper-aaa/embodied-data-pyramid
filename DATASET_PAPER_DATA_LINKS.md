# Dataset Paper and Data Links

Source table: `Representative datasets grouped by primary supervision type` (50 entries).

This list follows `DATA_ADD_AGENT_GUIDE.md` and `DATA_UPDATE_QUEUE.md`: links are limited to official paper, project, repository, or dataset pages; a project/access page is not described as a direct download; uncertain metadata is not inferred. On the website, project homepages belong only to dataset headers, while concrete dataset/download/annotation/access targets belong only to the innermost data row. Entries without a verified concrete official data target are retained in this research list but excluded from the website table. Checked on 2026-07-17.

Legend: **Public** = official public data page/repository; **Access** = registration, application, or upstream-data access is required; **Paper only** = no independent official data release was verified.

## VL

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| LLaVA-Instruct-150K | [Visual Instruction Tuning](https://arxiv.org/abs/2304.08485) | [Hugging Face](https://huggingface.co/datasets/liuhaotian/LLaVA-Instruct-150K) | **Public**; resource-level JSON files. |
| LLaVA-OneVision-SI | [LLaVA-OneVision](https://arxiv.org/abs/2408.03326) | [Official data documentation](https://github.com/LLaVA-VL/LLaVA-NeXT/blob/main/docs/LLaVA_OneVision.md) | **Public documentation**; `SI` is the single-image training stage/configuration, not a separately released dataset named “LLaVA-OneVision-SI”. Use a landing row unless an exact immutable data repo is selected. |
| ShareGPT4V | [Paper](https://arxiv.org/abs/2311.12793) | [Official Hugging Face dataset](https://huggingface.co/datasets/Lin-Chen/ShareGPT4V) | **Public**; concrete dataset repository. Project page is stored separately. |
| PixMo | [Molmo and PixMo](https://arxiv.org/abs/2409.17146) | [Official PixMo collection](https://huggingface.co/collections/allenai/pixmo) | **Public**; collection-level entry or one section per official subset. |
| A-OKVQA | [Paper](https://arxiv.org/abs/2206.01718) | [Official dataset archive](https://prior-datasets.s3.us-east-2.amazonaws.com/aokvqa/aokvqa_v1p0.tar.gz) | **Public**; direct dataset archive. Project page is stored separately. |
| LLaVA-Video-178K | [Paper](https://arxiv.org/abs/2410.02713) | [Official Hugging Face release](https://huggingface.co/datasets/lmms-lab/LLaVA-Video-178K) | **Public**; resource/split-level entry. |
| RoboVQA | [Paper](https://arxiv.org/abs/2311.00899) | [Hugging Face TFRecord tree](https://huggingface.co/datasets/Tianli/robovqa/tree/main/tfrecord) / [GCS bucket](https://console.cloud.google.com/storage/browser/gdm-robovqa) | **Public**; concrete dataset storage targets. Project page is stored separately. |
| EgoTaskQA | [Paper](https://arxiv.org/abs/2210.03929) | [Official dataset request](https://sites.google.com/view/egotaskqa/download) | **Access**; dataset request/landing row. |

## Pure Robot Video

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| RoVid-X | [Paper](https://arxiv.org/abs/2601.15282) | [OpenReview project record](https://openreview.net/forum?id=p5QSlnwume) | **Paper only**; the paper says open-source, but no independent official data repository was verified in the searched sources. Do not invent a download URL. |
| RoboNet | [Paper](https://arxiv.org/abs/1910.11215) | [Official RoboNet v3 archive](https://drive.google.com/uc?id=1BkqHzfRkfzgzCfc73NbNnPMK_rg3i1n9&export=download) | **Public**; concrete archive linked by the official getting-started guide. |
| RH20T-P | [Paper](https://arxiv.org/abs/2403.19622) | [RH20T-P annotations](https://drive.google.com/file/d/1ssNJikkaEYViz4yr-vIdQjmWoqiLWuwz/view?usp=sharing) / [RH20T source data](https://rh20t.github.io/) | **Access**; annotations and upstream source data are represented separately. |
| RobAVA | [ICCV paper](https://openaccess.thecvf.com/content/ICCV2025/papers/Sun_RobAVA_A_Large-scale_Dataset_and_Baseline_Towards_Video_based_Robotic_ICCV_2025_paper.pdf) | Coming soon | The official repository's advertised Google Drive target is currently a broken placeholder, so the website does not present the repository as a data download. |

## OCR / Doc / UI

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| OCR-VQA | [Paper/project](https://ocr-vqa.github.io/) | [Official OCR-VQA-200K Google Drive folder](https://drive.google.com/drive/folders/1_GYPY5UkUy7HIcR0zq3ZCFgeZN7BAfm_?usp=sharing) | **Public**; concrete dataset folder. |
| TextOCR | [Paper](https://arxiv.org/abs/2105.05486) | [Official dataset page](https://textvqa.org/textocr/) | **Public**; landing/resource-level entry. |
| DocVQA | [Paper](https://arxiv.org/abs/2007.00398) | [Official dataset page](https://site.docvqa.org/datasets/docvqa) | **Access**; download is routed through the RRC challenge portal. |
| ChartQA | [Paper](https://arxiv.org/abs/2203.10244) | [Official full Hugging Face dataset](https://huggingface.co/datasets/ahmed-masry/ChartQA) / [dataset tree](https://github.com/vis-nlp/ChartQA/tree/main/ChartQA%20Dataset) | **Public**; concrete dataset repositories. |
| MultiUI | [Paper](https://arxiv.org/abs/2410.13824) | [Official Hugging Face dataset](https://huggingface.co/datasets/neulab/MultiUI) | **Public**; concrete dataset repository. Project page is stored separately. |

## Segmentation / Localization

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| Objects365 | [ICCV paper](https://openaccess.thecvf.com/content_ICCV_2019/html/Shao_Objects365_A_Large-Scale_High-Quality_Dataset_for_Object_Detection_ICCV_2019_paper.html) | [Official download page](https://www.objects365.org/download.html) | **Access**; registration and dataset terms apply. |
| SA-1B | [Segment Anything](https://arxiv.org/abs/2304.02643) | [Official SA-1B dataset page](https://ai.meta.com/datasets/segment-anything/) | **Public under special terms**; archive/resource-level entry. |
| ADE20K | [Semantic Understanding of Scenes](https://arxiv.org/abs/1608.05442) | [Official dataset page](https://ade20k.csail.mit.edu/) | **Public**; landing/resource-level entry. |
| PACO-LVIS | [PACO paper](https://arxiv.org/abs/2301.01795) | [Official repository](https://github.com/facebookresearch/paco) | **Public**; resource-level annotations; images inherit LVIS/COCO access. |
| RefCOCO | [Paper](https://arxiv.org/abs/1608.00272) | [Official REFER repository](https://github.com/lichengunc/refer) | **Public annotations/upstream images**; resource-level entry. |
| PixMo-Points | [Molmo and PixMo](https://arxiv.org/abs/2409.17146) | [Official Hugging Face dataset](https://huggingface.co/datasets/allenai/pixmo-points) | **Public**; config/split-level entry. |
| RoboPoint | [Paper](https://arxiv.org/abs/2406.10721) | [Official Hugging Face dataset](https://huggingface.co/datasets/wentao-yuan/robopoint-data) | **Public**; concrete dataset repository. Project page is stored separately. |
| RoboAfford++ | [Paper](https://arxiv.org/abs/2511.12436) | Coming soon | The project page is stored separately; no concrete official RoboAfford++ training-data target was verified. |

## Temporal

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| Ego4D NLQ | [Ego4D paper](https://arxiv.org/abs/2110.07058) | [Official Ego4D data portal](https://ego4d-data.org/) | **Access**; CLI/license workflow; task/annotation-level entry. |
| Charades-STA | [TALL paper](https://arxiv.org/abs/1705.02101) | [Official Charades data page](https://allenai.org/plato/charades/) | **Access/upstream**; Charades video access plus STA annotations. |
| DiDeMo | [Paper](https://arxiv.org/abs/1708.01641) | [Official code/annotation repository](https://github.com/LisaAnne/LocalizingMoments) | **Public annotations/upstream videos**; resource-level entry. |
| HiREST | [Paper](https://arxiv.org/abs/2303.16406) | [Official project/data page](https://hirest-cvpr2023.github.io/) | **Public/project**; landing/resource-level entry. |
| Moment-10M | [Momentor paper](https://arxiv.org/abs/2402.11435) | [Official Momentor repository](https://github.com/DCDmllm/Momentor) | **Public/project**; use a landing row unless a stable standalone Moment-10M artifact tree is exposed. |
| COIN | [Paper](https://arxiv.org/abs/1903.02874) | [Official dataset page](https://coin-dataset.github.io/) | **Public/project**; landing/resource-level entry. |

## Spatial / 3D

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| ScanNet | [Paper](https://arxiv.org/abs/1702.04405) | [Official dataset](http://www.scan-net.org/) | **Access**; terms/request workflow; scene/resource-level entry. |
| ScanNet++ | [Paper](https://arxiv.org/abs/2308.11417) | [Official dataset](https://kaldir.vc.in.tum.de/scannetpp/) | **Access**; scene/resource-level entry. |
| ARKitScenes | [Paper](https://arxiv.org/abs/2111.08897) | [Official repository/data instructions](https://github.com/apple/ARKitScenes) | **Public**; split/resource-level entry. |
| 3RScan | [RIO/3RScan paper](https://arxiv.org/abs/1908.06109) | [Official dataset portal](https://3rscan.io/) | **Access**; scan/resource-level entry. |
| MMScan | [Paper](https://arxiv.org/abs/2406.09401) | [Official project](https://tai-wang.github.io/mmscan/) | **Public/project**; landing/resource-level entry. |
| ScanQA | [Paper](https://arxiv.org/abs/2112.10482) | [Official repository](https://github.com/ATR-DBI/ScanQA) | **Public annotations/upstream ScanNet**; resource-level entry. |
| SQA3D | [Paper](https://arxiv.org/abs/2210.07474) | [Official project](https://sqa3d.github.io/) | **Public annotations/upstream ScanNet**; landing/resource-level entry. |

## Planning

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| ALFRED | [Paper](https://arxiv.org/abs/1912.01734) | [Official full-data archive](https://ai2thor-dataset.s3-us-west-2.amazonaws.com/alfred_data_all.zip) | **Public**; direct dataset archive. Project page is stored separately. |
| EgoPlan-IT | [EgoPlan-Bench paper](https://arxiv.org/abs/2312.06722) | [Official repository and training JSON](https://github.com/ChenYi99/EgoPlan) | **Public annotations/upstream videos**; resource-level entry; Epic-Kitchens/Ego4D media have separate access terms. |
| WAP | [Paper](https://arxiv.org/abs/2506.21230) | [Official paper record](https://papers.neurips.cc/paper_files/paper/2025/hash/48992045205729796194da77690a4547-Abstract-Conference.html) | **Paper only**; WAP is primarily a framework/data-construction method; no standalone official 80.9K-pair data release was verified. |
| LLaRP / Language Rearrangement | [Paper](https://arxiv.org/abs/2310.17722) | [Official repository](https://github.com/apple/ml-llarp) | **Public benchmark generation/code**; requires Habitat assets; landing entry. The paper reports 150K training and 1K testing tasks, so the source table’s “114 tasks” should be rechecked. |

## Physics / Failure

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| CLEVRER | [Paper](https://arxiv.org/abs/1910.01442) | [Official project/data](http://clevrer.csail.mit.edu/) | **Public**; split/resource-level entry. |
| IntPhys | [Paper](https://arxiv.org/abs/1803.07616) | [Official downloads page](https://intphys.cognitive-ml.fr/download.html) | **Public**; concrete train/dev/test archive list. Project documentation is stored separately. |
| InfLevel | [TMLR/OpenReview paper](https://openreview.net/forum?id=9NjqD9i48M) | [Official project repository](https://github.com/allenai/inflevel) | **Evaluation-only**; the paper explicitly says there is no training dataset by design. Index as a benchmark landing/resource entry. |
| RoboFail | [REFLECT paper](https://arxiv.org/abs/2306.15724) | [Official project](https://robot-reflect.github.io/) | **Public/project**; landing entry unless the official data artifact is exposed. |

## Grasping

| Dataset | Paper | Data / official access | Status and indexing note |
| --- | --- | --- | --- |
| Cornell Grasp Dataset | [Paper](https://arxiv.org/abs/1412.3128) | [Official legacy Cornell download page](http://pr.cs.cornell.edu/grasping/rect_data/data.php) | **Public/legacy**; landing entry. The legacy server may be slow or intermittently unavailable. |
| GraspNet-1Billion | [Paper](https://arxiv.org/abs/1912.13470) | [Official downloads page](https://graspnet.net/datasets.html) | **Access**; concrete image, label, model, and tool downloads. Project homepage is stored separately. |
| SuctionNet-1Billion | [Paper](https://arxiv.org/abs/2103.12311) | [Official project/data](https://graspnet.net/suction) | **Access**; resource-level entry. |
| DexGraspNet 2.0 | [Paper](https://arxiv.org/abs/2410.23004) | [Official Hugging Face dataset](https://huggingface.co/datasets/lhrlhr/DexGraspNet2.0) | **Public**; archive/resource-level entry. This dataset already exists in `script.js`. |

## Corrections and ingestion cautions

- The source table contains 50 rows, but not all rows correspond to an independently downloadable dataset.
- `LLaVA-OneVision-SI` should not be presented as a standalone 3.2M dataset without identifying the exact official training-data release and revision.
- `InfLevel` is explicitly evaluation-only.
- `LLaRP`/Language Rearrangement scale in the paper is 150K training and 1K testing tasks; the table’s 114-task figure appears to describe a different task grouping and should not be copied into website metadata without a precise source.
- `RoVid-X` and WAP currently need a later release check before adding a `Data` link.
- For ScanQA, SQA3D, PACO-LVIS, RefCOCO, DiDeMo, and EgoPlan-IT, annotations and source media/assets have distinct origins and terms; one link must not imply that all media are redistributed there.
