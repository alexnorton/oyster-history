import boto3
from email.parser import Parser
import email.policy

s3 = boto3.resource("s3")

bucket = "oyster-stats"


def handler(event, context):
    notification = event["Records"][0]["ses"]
    message_id = notification["mail"]["messageId"]

    email_object = s3.Object(bucket, message_id)
    body = email_object.get()["Body"].read().decode("utf-8")

    parser = Parser(policy=email.policy.default)
    message = parser.parsestr(body)

    attachments = message.iter_attachments()
    attachment = [a for a in attachments if ".csv" in a.get_filename()][0]

    print(attachment.get_content().splitlines()[2:])
