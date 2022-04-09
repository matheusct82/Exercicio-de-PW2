class ValidateForm {
    constructor() {
        this.formulario = document.querySelector('.formulario')
        this.eventos()
    }

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const checkFields = this.checkFields();

        if (checkFields) {
            alert('Formulário enviado.');
            this.formulario.submit();
        }
    }

    checkFields() {
        let valid = true

        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove()
        }

        for (let field of this.formulario.querySelectorAll('.validar')) {
            const label = field.previousElementSibling.innerText

            if (!field.value) {
                this.createErro(field, `Campo "${label}" não pode estar em branco`)
                valid = false
            }

            if (field.classList.contains('cpf')) {
                if (!this.validateCPF(field)) valid = false
            }

        }
        return valid
    }

    validateCPF(field) {
        const cpf = new ValidaCPF(field.value)

        if (!cpf.valida()) {
            this.createErro(field, 'CPF invalido')
            return false
        }

        return true
    }


    createErro(field, msg) {
        const div = document.createElement('div')
        div.innerHTML = msg
        div.classList.add('error-text')
        field.insertAdjacentElement('afterend', div)
    }

}

const validate = new ValidateForm()




