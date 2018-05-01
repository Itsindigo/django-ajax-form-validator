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
    }

    validateForm(data) {
        fetch(window.location.pathname, {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded'
            }
        })
        .then((response) => {
            console.log(response);
        })
    }
}

new window.initialiser('index-form', FormView);