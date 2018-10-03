STACK_NAME=oyster-history
TEMPLATE=file://stack.yml

.PHONY: create-stack
create-stack:
	aws cloudformation create-stack \
		--stack-name $(STACK_NAME) \
		--template-body $(TEMPLATE) \
		--capabilities CAPABILITY_IAM

.PHONY: update-stack
update-stack:
	aws cloudformation update-stack \
		--stack-name $(STACK_NAME) \
		--template-body $(TEMPLATE) \
		--capabilities CAPABILITY_IAM
