README
======

### Overview
I have seen a lot of clunky implementations of AJAX form validation in Django projects, this is my attempt to remedy that problem with a few simple design patterns.

This is intended as a quick reference and showcase. 

The aim of this project was to leverage django's form validating abilities, without having to duplicate logic in JS, while also supporting browsers that might not be running JS.

By abstracting Ajax conditional logic into view we are able to handle Ajax request in a singular view while maintaining a clear separation of concerns.

You can view the code in action [here](https://intense-taiga-17896.herokuapp.com/)!

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

        if not request.is_ajax():
            return super(AjaxFormView, self).post(request, *args, **kwargs)

        if not form.is_valid():
            return self.form_invalid_ajax(form)

        return self.form_valid_ajax(form)

```

Supported by an AJAX request from the client side code:

```javascript

    validateForm(data) {
        fetch(window.location.pathname, {
            body: data,
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'X-CSRFToken': this.getCSRFToken(),
                'X-Requested-With': 'XMLHttpRequest'
            },
        })
        .then(response => response.json())
        .then(data => {
            this._isEmpty(data.errors) ? this.container.submit() : this.handleErrorMessages(data.errors);
        })
        .catch(function(err) {
            console.error(err);
        })
    }

```

Using this logic allows you to conditionally handle errors based on the JSON response, else allow the form to be processed by Django using the traditional x-www-url encoding, and all under one URL.



### Dependencies
* Python 3.6
* Django 2.0
* Sass (Ruby)
* Modern Web Browser (ES6) 
* Postgres

### Running the project

I work on a Mac, you might need a few other deps on other machines.

To get started you need pipenv installed. You can install with pip or your system package manager.

https://docs.pipenv.org/

Running `make` will setup your virtualenv, and install the project dependencies, as specified in the `pipfile.lock`.

`pipenv shell` will open a bash shell with your developer environment.

You will need to create a database in order to run the project, you can use a configuration of your choice, the project is currently configured to use Postgres. 

Set your config in a `.env` file in the root of your project, and follow the naming conventions described in [this package](https://github.com/kennethreitz/dj-database-url).

`manage.py runserver` will start your http server.


### Caveats
I opted not to include a JS build step in such a small project.

JS scripts are loaded through an initialiser script that lives in the base.html, which detects any additional scripts included in template footer tags.

