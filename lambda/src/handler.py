import os

import boto3

from oyster_email import parse_message, get_csv_attachment, parse_csv

s3 = boto3.resource("s3")

email_bucket = os.environ.EMAIL_BUCKET
data_bucket = os.environ.DATA_BUCKET


def handler(event, context):
    message_id = get_message_id(event)
    message_body = get_message_body(message_id)

    message = parse_message(message_body)
    attachment = get_csv_attachment(message)
    csv = attachment.get_content()

    events = parse_csv(csv)

    print(events)


def get_message_id(event):
    notification = event["Records"][0]["ses"]
    return notification["mail"]["messageId"]


def get_message_body(message_id):
    email_object = s3.Object(email_bucket, message_id)
    return email_object.get()["Body"].read().decode("utf-8")
