.PHONY: clean
clean:
	rm -rf build
	rm package.zip

.PHONY: test
test:
	pipenv run pytest -s

build:
	bash -c "cd build && pip install -r <(pipenv lock -r) --target build/"
	find build -name "__pycache__" -type d -print | xargs rm -r --
	cp handler.py build/

package.zip: build
	cd build && zip -9 -q -r ../package.zip .