FUNCTION_NAME=oyster-history-EmailHandlerFunction-M03ANSGN3Z6X

.PHONY: clean
clean:
	rm -rf build package.zip requirements.txt || true

.PHONY: test
test:
	pipenv run pytest -s

.PHONY: test-watch
test-watch:
	pipenv run ptw -- -s

requirements.txt:
	pipenv lock -r > requirements.txt

build: requirements.txt
	mkdir build
	docker run \
		--rm \
		-v $$PWD:/lambda \
		-w /lambda \
		python:3-alpine \
		/bin/sh -c "pip install -r requirements.txt --target build/"
	find build -name "__pycache__" -type d -print | xargs rm -r --
	cp src/* build/

package.zip: build
	cd build && zip -9 -q -r ../package.zip .

.PHONY: update-function
update-function: clean package.zip
	aws lambda update-function-code \
		--function-name $(FUNCTION_NAME) \
		--zip-file fileb://package.zip