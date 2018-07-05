import json

KEY_COLUMN_MAPPING = [
    "Start Time",
    "End Time",
    "Journey/Action",
    "Charge",
    "Credit",
    "Balance",
    "Note",
]


def add_events(current, new):
    return sorted(
        current + new,
        key=lambda event: event["Start Time"]
        if event["Start Time"]
        else event["End Time"],
    )


def from_json(string):
    events = []

    for row in json.loads(string):
        event = {}

        for key, value in zip(KEY_COLUMN_MAPPING, row):
            event[key] = value

        events.append(event)

    return events


def to_json(events):
    rows = []

    for event in events:
        row = [event[key] for key in KEY_COLUMN_MAPPING]
        rows.append(row)

    return json.dumps(rows)
