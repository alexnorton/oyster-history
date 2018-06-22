import json

import handler


def test_parse_csv():
    with open("test_data/test_csv.csv", "r") as csv_file:
        with open("test_data/parsed_csv.json", "r") as json_file:
            csv = csv_file.read()
            parsed = handler.parse_csv(csv)

            expected = json.dumps(json.load(json_file))

            assert json.dumps(parsed) == expected


def test_transform_row():
    row = {
        "Date": "03-Dec-2017",
        "Start Time": "17:08",
        "End Time": "17:20",
        "Journey/Action": "Shepherd's Bush (Central line) to Marble Arch",
        "Charge": "1.60",
        "Credit": "",
        "Balance": "18.60",
        "Note": "",
    }

    transformed = handler.transform_row(row)

    print(transformed)
