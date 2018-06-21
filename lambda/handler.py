import boto3
from email.parser import Parser
import email.policy
from io import StringIO
from csv import DictReader

s3 = boto3.resource("s3")

bucket = "oyster-stats"


def handler(event, context):
    message_id = get_message_id(event)

    message_body = get_message_body(message_id)

    message = parse_message(message_body)

    attachment = get_csv_attachment(message)
    csv = attachment.get_content()

    csv_dict = parse_csv(csv)

    print(csv_dict)


def get_message_id(event):
    notification = event["Records"][0]["ses"]
    return notification["mail"]["messageId"]


def get_message_body(message_id):
    email_object = s3.Object(bucket, message_id)
    return email_object.get()["Body"].read().decode("utf-8")


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
