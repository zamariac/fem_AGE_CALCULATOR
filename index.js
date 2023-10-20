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

                // console.log(input)
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

            // console.log(input)
        })
    }

    validateFields(field){
        if (field.value.trim() === '') {
            this.setStatus(field, `Must be a valid ${field.previousElementSibling.innerText.toLowerCase()} `, "error")
        } else {
            this.setStatus(field, null, 'success')
        }

        if (field.value) {
            if (!isNaN(field.value)) {
                this.setStatus(field, null, "success")
            } else {
                this.setStatus(field, "Please enter a valid number", "error")
            }

            if ( field.id === "day" ) {
                if (field.value >= 1 && field.value <= 31) {
                    this.setStatus(field, null, "success")
                } else {
                    this.setStatus(field, "Please enter a number between 1 & 31", "error")
                }
            }

            if ( field.id === "month" ) {
                if (field.value >= 1 && field.value <= 12) {
                    this.setStatus(field, null, "success")
                } else {
                    this.setStatus(field, "Please enter a number between 1 & 12", "error")
                }
            }

            if ( field.id === "year" ) {
                const today = new Date();
                if (field.value >= 1 && field.value <= today.getFullYear()) {
                    this.setStatus(field, null, "success")
                } else {
                    this.setStatus(field, "Please enter a number no greater than this year", "error")
                }
            }
    
            return field.value;
        }

 // getFullYear() yyyy
// getMonth()	Get month as a number (0-11)
// getDate() 1-31

    }

    setStatus(field, message, status) {
        const errorLabel = field.parentElement.querySelector('label')
        const errorInput = field.parentElement.querySelector('input')
        const errorMessage = field.parentElement.querySelector('.error-message')

        if (status === 'success') {
            if (errorMessage) { errorMessage.innerText = '' }
            errorLabel.classList.remove('label-error');
            errorInput.classList.remove('input-error');
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

