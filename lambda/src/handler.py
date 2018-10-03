import os
import requests
import json

import boto3

from oyster_email import get_events
from oyster_events import from_json, to_json, add_events

s3 = boto3.resource("s3")

email_bucket = os.environ["EMAIL_BUCKET"]
data_bucket = os.environ["DATA_BUCKET"]
data_file = "events.json"
slack_webhook_url = os.environ["SLACK_WEBHOOK_URL"]


def handler(event, context):
    message_id = get_message_id(event)
    message_body = get_message_body(message_id)

    previous_events = get_previous_events()

    new_events = get_events(message_body)

    all_events = add_events(previous_events, new_events)

    save_events(all_events)

    send_slack_notification()


def get_message_id(event):
    notification = event["Records"][0]["ses"]
    return notification["mail"]["messageId"]


def get_message_body(message_id):
    email_object = s3.Object(email_bucket, message_id)
    return email_object.get()["Body"].read().decode("utf-8")


def get_previous_events():
    return from_json(
        s3.Object(data_bucket, data_file).get()["Body"].read().decode("utf-8")
    )


def save_events(events):
    s3.Object(data_bucket, data_file).put(Body=to_json(events))


def send_slack_notification():
    requests.post(
        slack_webhook_url,
        data=json.dumps({"text": "Oyster history updated"}),
        headers={"Content-Type": "application/json"},
    )
