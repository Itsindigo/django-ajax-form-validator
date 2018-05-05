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
            data.errors ? this.handleErrorMessages(data) : this.container.submit();
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
        let errors = this.container.querySelectorAll('error-wrapper');
        if (errors.length) {
            errors.map(error => error.remove())
        }
    }

    applyErrorMessages(data) {
        for (let fieldName in data) {
            if (fieldName === '__all__') {
                this._handleGeneralErrors(data[fieldName])
            } else {
                this._handleFieldErrors(data[fieldName])
            }
        }
    }

    _handleGeneralErrors(errors) {

    }

    _handleFieldErrors(errors) {

    }

}

new window.initialiser('index-form', FormView);