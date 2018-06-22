import json

import handler


def test_parse_csv():
    with open("test_data/test_csv.csv", "r") as csv_file:
        with open("test_data/parsed_csv.json", "r") as json_file:
            csv = csv_file.read()
            parsed = handler.parse_csv(csv)

            expected = json.dumps(json.load(json_file))

            assert json.dumps(parsed) == expected
