
import os

filenames = [
    "baecher_joseph_2023_d1f8a239-27c0-4a38-a333-ea4e82533d1b_PROPOSAL_1.pdf",
    "baecher_joseph_2024_c6f0ae22-48ba-4044-a44c-d860f9b8d17f_PROPOSAL_1.pdf",
    "barker_michelle_2020_1b5d2213-4c72-4da8-a7b8-bece5b27d280_PROPOSAL_1.pdf",
    "bertolet_brittnil_2021_9d34d838-4fd8-4fbd-b94e-766d1dd82d23_PROPOSAL_1.pdf",
    "brown_ctitus_2014_afd7eaff-7bea-45d0-be3e-33188b448cd1_PROPOSAL_1.pdf",
    "frazer_ryane_2019_74f22e94-b364-482e-a2c1-0892b705f0c6_PROPOSAL_1.pdf",
    "gregory_samantha_2018_7f2475c4-2fad-498f-beac-e3044183b996_PROPOSAL_1.pdf",
    "jensen_jan_2015_02ecd4f0-ac84-4cf4-8d10-1aed8faa6767_PROPOSAL_1.pdf",
    "nell_lucas_2022_6306262d-9317-4f58-aadc-caf26325862d_PROPOSAL_1.pdf",
    "polino_alexander_2017_f990c0ee-e9e0-4f31-b050-9ed3a0b4c2e5_PROPOSAL_1.pdf"
]

target_dir = "services/strands/src/seed-data"
os.makedirs(target_dir, exist_ok=True)

dummy_pdf_content = b"%PDF-1.4\n%..."  # Minimal PDF header

for fname in filenames:
    path = os.path.join(target_dir, fname)
    with open(path, "wb") as f:
        f.write(dummy_pdf_content)
    print(f"Created {path}")
