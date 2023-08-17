import json
import os


def merge_json_files(file1, file2):
    with open(file1, "r") as f1, open(file2, "r") as f2:
        data1 = json.load(f1)
        data2 = json.load(f2)

    merged_data = []

    for entry1, entry2 in zip(data1, data2):
        merged_entry = entry1.copy()

        for candidate1, candidate2 in zip(entry1["candidates"], entry2["candidates"]):
            candidate1["votes"] += candidate2["votes"]

        merged_data.append(merged_entry)

    return merged_data


if __name__ == "__main__":
    file1 = f"{os.path.join(os.path.expanduser('~'),'Documents','Voting-System','templates','Data','Data.json')}"
    file2 = "final.json"

    merged_data = merge_json_files(file1, file2)

    output_file = "final.json"
    with open(output_file, "w") as output:
        json.dump(merged_data, output, indent=4)

    print(f"Merged data saved to {output_file}")
