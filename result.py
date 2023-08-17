import json
import progressbar
import time


def get_results(json_filename):
    with open(json_filename, "r") as json_file:
        data = json.load(json_file)

    result_dict = {}

    for entry in data:
        post = entry["post"]
        candidates = entry["candidates"]

        # Find the candidate with the maximum votes
        max_votes_candidate = max(candidates, key=lambda x: x["votes"])
        result_dict[post] = max_votes_candidate["name"]

    return result_dict


from openpyxl import Workbook


def create_excel(results):
    workbook = Workbook()
    sheet = workbook.active

    sheet["A1"] = "Post"
    sheet["B1"] = "Winner"

    row = 2
    for post, candidate in results.items():
        sheet.cell(row=row, column=1, value=post)
        sheet.cell(row=row, column=2, value=candidate)
        row += 1

    excel_filename = "results.xlsx"
    workbook.save(excel_filename)
    print(f"Results saved to {excel_filename}")


if __name__ == "__main__":
    json_filename = "templates/Data/Data.json"
    results = get_results(json_filename)
    for i in progressbar.progressbar(range(100)):
        time.sleep(0.02)
    create_excel(results)
