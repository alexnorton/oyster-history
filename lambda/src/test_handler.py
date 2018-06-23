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

    assert "Date" not in transformed
    assert transformed["Start Time"] == "2017-12-03T17:08:00+00:00"
    assert transformed["End Time"] == "2017-12-03T17:20:00+00:00"
    assert (
        transformed["Journey/Action"] == "Shepherd's Bush (Central line) to Marble Arch"
    )
    assert transformed["Charge"] == 1.6
    assert transformed["Credit"] is None
    assert transformed["Balance"] == 18.6
    assert transformed["Note"] is None


def test_parse_datetimes():
    assert handler.parse_datetimes("03-Dec-2017", "17:08", "17:20") == (
        "2017-12-03T17:08:00+00:00",
        "2017-12-03T17:20:00+00:00",
    )

    assert handler.parse_datetimes("01-Dec-2017", "03:44", "03:53") == (
        "2017-12-02T03:44:00+00:00",
        "2017-12-02T03:53:00+00:00",
    )

    assert handler.parse_datetimes("23-Jun-2018", "13:47", "14:15") == (
        "2018-06-23T13:47:00+01:00",
        "2018-06-23T14:15:00+01:00",
    )

    assert handler.parse_datetimes("17-Jun-2018", "23:43", "") == (
        "2018-06-17T23:43:00+01:00",
        None,
    )
