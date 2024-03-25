import contactUsSchema from "./yup/contactUsSchema"

export class ContactFormClass {
    name: { label: string; value: string; valid: boolean; error: null | string };
    email: { label: string; value: string; valid: boolean; error?: null | string };
    phone: { label: string; value: string; valid: boolean; error?: null | string };
    description: { label: string; value: string; valid: boolean; error?: null | string };

    constructor() {
        this.name = {
            label: 'Name',
            value: '',
            valid: false,
            error: null
        }

        this.email = {
            label: 'Email',
            value: '',
            valid: false,
            error: null
        }
        this.phone = {
            label: 'Phone',
            value: '',
            valid: false,
            error: null
        }
        this.description = {
            label: 'Description',
            value: '',
            valid: false,
            error: null
        }
    }


    async validateField(field: string) {
        try {
            await contactUsSchema.fields[field].validate(this[field].value)
            this[field].valid = true
            return true
        } catch(error) {
            this[field].valid = false
            return false
        }
    }

    toObject() {
        return {
            name: this.name.value,
            email: this.email.value,
            phone: this.phone.value,
            description: this.description.value,
            
        }
    }
}
