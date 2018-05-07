class FormView {
    constructor(container) {
        this.container = container;
        this.submit = container.querySelector('[type="submit"]');

        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.registerEventListeners();
    }

    registerEventListeners() {
        this.submit.addEventListener('click', this.handleFormSubmission.bind(this));
    };

    handleFormSubmission(e) {
        e.preventDefault();
        let encodedProperties = [];

        [...this.container.elements].forEach((field) => {
            let encodedField = `${encodeURIComponent(field.name)}=${encodeURIComponent(field.value)}`;
            encodedProperties.push(encodedField);
        });
        this.validateForm(encodedProperties.join('&'));
    }

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


    /***************\
     * Utility Code *
    \****************/

    getCSRFToken() {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, 10) === ('csrftoken' + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(10));
                    break;
                }
            }
        }
        return cookieValue;
    }

    handleErrorMessages(data) {
        this.clearErrorMessages();
        this.applyErrorMessages(data);
    }

    clearErrorMessages() {
        let errors = this.container.querySelectorAll('.error-message');
        if (errors.length) {
            [...errors].map(error => error.remove())
        }
    }

    applyErrorMessages(data) {
        for (let fieldName in data) {
            if (fieldName === '__all__') {
                this._handleGeneralErrors(data[fieldName])
            } else {
                this._handleFieldErrors(data[fieldName], fieldName)
            }
        }
    }

    _handleGeneralErrors(errors) {
        // Creates a flash message element to display General Errors on the form.
        // Render errors at each error point.
        let anchorPoint = this.container.querySelector('.general-error-container');

        if (!anchorPoint) { return }

        let errorContainerElement = this._spawnErrorContainer(errors);
        anchorPoint.appendChild(errorContainerElement);
    }

    _handleFieldErrors(errors, fieldName) {
        let field = this.container.querySelector(`[name="${fieldName}"]`);
        if (field) {
            // Loop over any error messages.
            for (let i=0; i < errors.length; i++) {
                field.closest('.field').append(this._newError(errors[i]));
            }
        }
    }

    _spawnErrorContainer(errors) {
        let div = document.createElement('div');
        div.className = 'error-box';
        for (let i=0; i < errors.length; i++) {
            let error = errors[i];
            div.appendChild(this._newError(` - ${error}`));
        }
        return div
    }

    _newError(content) {
        // Create a div node
        let div = document.createElement('div');
        // Create text
        let text = document.createTextNode(content);
        div.className = 'error-message';
        // Place text in div
        div.appendChild(text);
        return div
    }

    _isEmpty(object) {
        return Object.getOwnPropertyNames(object).length === 0
    }
}

new window.initialiser('index-form', FormView);