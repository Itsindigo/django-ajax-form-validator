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
        .then(data => console.log('data', data))
        .catch(function(err) {
            console.log('err', err);
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
}

new window.initialiser('index-form', FormView);