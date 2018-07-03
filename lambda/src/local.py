import os

from oyster_email import get_events
from oyster_events import add_events, to_json

events = []

email_path = "test_data/emails"

for filename in os.listdir(email_path):
    print(filename)
    print(events)
    with open(email_path + "/" + filename) as f:
        email_body = f.read()

        events = add_events(events, get_events(email_body))

print(to_json(events))
