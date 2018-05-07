class FormView {
    constructor(container) {
        this.container = container;
        this.submit = container.querySelector('[type="submit"]');

        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.registerEventListeners();
    }

    registerEventListeners() {
        this.submit.addEventListener('click', this.handleFormSubmission.bind(this))
    };

    handleFormSubmission(e) {
        e.preventDefault();
        let data = {};

        [...this.container.elements].forEach((field) => {
            data[field.name] = field.value;
        });

        this.validateForm(data);
    }

    validateForm(data) {
        fetch(window.location.pathname, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': this.getCSRFToken(),
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: data
        })
        .then(response => response.json())
        .then(data => {
            data.errors ? this.handleErrorMessages(data.errors) : this.container.submit();
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

    _newError(content) {
        // Create a div node
        let div = document.createElement('div');
        // Create text
        let text = document.createTextNode(content);
        div.classList.add('error-message');
        // Place text in div
        div.appendChild(text);
        return div
    }
}

new window.initialiser('index-form', FormView);