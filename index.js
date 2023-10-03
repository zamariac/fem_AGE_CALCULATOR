console.log('hello');

//Initialize methods so its available elsewhere -- object oriented approach in ES6
class FormValidator {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
    }

    initialize () {
        // console.log('form', this.form);
        // console.log('fields', this.fields);
        this.validateOnSubmit();
        this.validateOnEntry();
    }

    //Listen for button click event
    validateOnSubmit() {
        let self = this;
        this.form.addEventListener("submit", e => {
            e.preventDefault();
            this.fields.forEach(field => {
                const input = document.querySelector(`#${field}`);
                self.validateFields(input)

                console.log(input)
            })
            
        })
    }

    validateOnEntry() {
        let self = this;
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);
            input.addEventListener('input', event => {
                self.validateFields(input)
            })

            console.log(input)
        })
    }

    validateFields(field){
        if (field.value.trim() === '') {
            this.setStatus(field, `Must be a valid ${field.previousElementSibling.innerText.toLowerCase()} `, "error")
        } else {

        }

    }

    setStatus(field, message, status) {
        const errorLabel = field.parentElement.querySelector('label')
        const errorInput = field.parentElement.querySelector('input')
        const errorMessage = field.parentElement.querySelector('.error-message')

        if (status === 'success') {
            if (errorMessage) { errorMessage.innerText = '' }
        }

        if (status === 'error') {
            errorMessage.innerText = message
            errorLabel.classList.add('label-error');
            errorInput.classList.add('input-error');

        }
    }
}


// Form fields 
const form = document.querySelector('.form');
const fields = ['day', 'month', 'year'];

const validator = new FormValidator(form, fields);

validator.initialize();

