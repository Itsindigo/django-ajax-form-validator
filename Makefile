env:
	pipenv install --dev
	ln -fs $(abspath ./src/manage.py) "$$(pipenv --venv)/bin/manage.py"

requirements:
	pip install -r ./etc/requirements.txt

sass:
	sass ./src/core/static/scss/main.scss ./src/core/static/main.css
