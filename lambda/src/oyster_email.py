from email.parser import Parser
import email.policy
from io import StringIO
from csv import DictReader
from datetime import datetime, timedelta
from pytz import timezone


def parse_message(message_body):
    parser = Parser(policy=email.policy.default)
    return parser.parsestr(message_body)


def get_csv_attachment(message):
    attachments = message.iter_attachments()
    return [a for a in attachments if ".csv" in a.get_filename()][0]


def parse_csv(csv):
    csv_lines = csv.splitlines()
    csv_lines = csv_lines[1:]
    csv_stream = StringIO("\n".join(csv_lines))

    reader = DictReader(csv_stream)

    return [row for row in reader]


def transform_row(row):
    row["Start Time"], row["End Time"] = parse_datetimes(
        row["Date"], row["Start Time"], row["End Time"]
    )

    row["Charge"] = float(row["Charge"]) if row["Charge"] else None
    row["Credit"] = float(row["Credit"]) if row["Credit"] else None

    row["Balance"] = float(row["Balance"])

    row["Note"] = row["Note"] if row["Note"] else None

    del row["Date"]

    return row


def parse_datetimes(date, start_time, end_time):
    start = parse_datetime(date, start_time)

    end = parse_datetime(date, end_time) if end_time else None

    if start.hour < 4 or start.hour == 4 and start.minute < 30:
        start = start + timedelta(days=1)
        end = end + timedelta(days=1) if end else None

    return start.isoformat(), end.isoformat() if end else None


def parse_datetime(date, time):
    return timezone("Europe/London").localize(
        datetime.strptime("{} {}".format(date, time), "%d-%b-%Y %H:%M")
    )
