README
======

### Overview
I have seen a lot of clunky implementations of AJAX form validation in Django projects, this is my attempt to remedy that problem with a few simple design patterns.

This is intended as a quick reference and showcase. 

The aim of this project was to leverage django's form validating abilities, without having to duplicate logic in JS, while also supporting browsers that might not be running JS.

### Features
The meat of this project's server side logic resides in the `AjaxFormView` found in `src/core/mixins.py`

```python

from django.views.generic import FormView

class AjaxFormView(FormView):

    def post(self, request, *args, **kwargs):
        """
        Handles POST requests, instantiating a form instance with the passed
        POST variables. Ajax requests are parsed into JSON, returning any errors.
        """
        form = self.get_form()
        valid = form.is_valid()

        if not request.is_ajax():
            return super(AjaxFormView, self).post(request, *args, **kwargs)

        if not valid:
            return self.form_invalid_ajax(form)

        return self.form_valid_ajax(form)

```

![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")



### Dependencies
* Python 3.6
* Django 2.0
* Sass (Ruby)
* Modern Web Browser (ES6) 

### Running the project

I work on a Mac, you might need a few other deps on other machines.

To get started you need pipenv installed. You can install with pip or your system package manager.

https://docs.pipenv.org/

Running `make` will setup your virtualenv, and install the project dependencies, as specified in the `pipfile.lock`.

`pipenv shell` will open a bash shell with your developer environment.

You will need to create a MySQL database instance and specify the connection details in `src/core/settings/local.py`

`manage.py runserver` will start your http server.


### Caveats
I didn't want to include a JS build step, as the complexity detracts from the purpose of the project - exposing Django's validators to the front end.

JS scripts are loaded through an initialiser script that lives in the base.html, which detects any additional scripts included in template footer tags.

