import boto3

from oyster_email import parse_message, get_csv_attachment, parse_csv

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
