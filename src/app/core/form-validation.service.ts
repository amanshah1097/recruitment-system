import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormArray, FormControl } from '@angular/forms';
import { CoreHelperService } from './core-helper.service';
import { Func1 } from './core.classes';

@Injectable()
export class FormValidationService {
    private readonly validationMessages: { [key: string]: string } = {
        required: '{{field}} is required.',
        email: 'Email Address entered in {{field}} is invalid.',
        min: '{{field}} should be greater than {{min}}.',
        max: '{{field}} should be less than {{max}}.',
        minlength: '{{field}} should be greater than {{min}}.',
        maxlength: '{{field}} should be less than {{max}}.'
    };

    private readonly fieldMapper = new Map<string, Func1<AbstractControl, string>>();
    constructor(private helper: CoreHelperService) {
        this.fieldMapper.set('min', (control) => {
            return (!this.helper.isNullOrUndefined(control.errors) && !this.helper.isNullOrUndefined(control.errors.min)) ? control.errors.min.min : '';
        });
        this.fieldMapper.set('max', (control) => {
            return (!this.helper.isNullOrUndefined(control.errors) && !this.helper.isNullOrUndefined(control.errors.max)) ? control.errors.max.max : '';
        });
        this.fieldMapper.set('minlength', (control) => {
            return (!this.helper.isNullOrUndefined(control.errors) && !this.helper.isNullOrUndefined(control.errors.minlength))
                ? control.errors.minlength.requiredLength : '';
        });
        this.fieldMapper.set('maxlength', (control) => {
            return (!this.helper.isNullOrUndefined(control.errors) && !this.helper.isNullOrUndefined(control.errors.maxlength))
                ? control.errors.maxlength.requiredLength : '';
        });
    }

    addValidationMessage = (key: string, value: string) => {
        this.validationMessages[key] = value;
    }

    addValidationMessages = (validationMessages: Map<string, string>) => {
        if (this.helper.isNullOrUndefined(validationMessages) || validationMessages.size <= 0) {
            return;
        }
        validationMessages.forEach((value, key) => {
            this.validationMessages[key] = value;
        });
    }

    public makeFormDirty = (form: AbstractControl) => {
        if (form instanceof FormGroup) {
            this.makeFormGroupDirty(form);
        } else if (form instanceof FormArray) {
            this.makeFormArrayDirty(form);
        } else {
            this.makeFormControlDirty(form as FormControl);
        }
    }

    private makeFormGroupDirty = (form: FormGroup) => {
        for (const field in form.controls) {
            if (!!field) {
                const control = form.get(field);
                this.makeFormDirty(control);
            }
        }
    }

    private makeFormArrayDirty = (form: FormArray) => {
        for (const formKey in form.controls) {
            if (!!formKey) {
                const control = form.get(formKey);
                this.makeFormDirty(control);
            }
        }
    }

    private makeFormControlDirty = (form: FormControl) => {
        form.markAsTouched();
    }

    public doFormValidation = (form: AbstractControl, name: string, checkDirty: boolean = false,
        fieldMapper?: Map<string, Func1<AbstractControl, string>>, fieldNamesMapper?: Map<string, string>,
        formErrors?: { [key: string]: string }) => {
        const formToValidate = form;
        const errors: { [key: string]: string } = this.helper.isNullOrUndefined(formErrors) ? {} : formErrors;
        if (formToValidate instanceof FormGroup) {
            this.formGroupValidation(formToValidate, checkDirty, fieldMapper, fieldNamesMapper, errors);
        } else if (formToValidate instanceof FormArray) {
            this.formArrayValidation(formToValidate, name, checkDirty, fieldMapper, fieldNamesMapper, errors);
        } else {
            this.formControlValidation(formToValidate as FormControl, name, checkDirty, fieldMapper, errors);
        }
        return errors;
    }

    public formGroupValidation = (form: FormGroup, checkDirty?: boolean,
        fieldMapper?: Map<string, Func1<AbstractControl, string>>,
        fieldNamesMapper?: Map<string, string>, formErrors?: { [key: string]: string }) => {
        const formToValidate = form;
        const errors: { [key: string]: string } = this.helper.isNullOrUndefined(formErrors) ? {} : formErrors;
        for (const field in formToValidate.controls) {
            if (!!field) {
                const control = formToValidate.get(field);
                this.doFormValidation(control, field, checkDirty, fieldMapper, fieldNamesMapper, errors);
            }
        }
        return errors[name];
    }

    public formArrayValidation = (form: FormArray, name: string, checkDirty?: boolean,
        fieldMapper?: Map<string, Func1<AbstractControl, string>>,
        fieldNamesMapper?: Map<string, string>, formErrors?: { [key: string]: string }) => {
        const formToValidate = form;
        const errors: { [key: string]: string } = this.helper.isNullOrUndefined(formErrors) ? {} : formErrors;
        for (const formKey in formToValidate.controls) {
            if (!!formKey) {
                const control = formToValidate.get(formKey);
                this.doFormValidation(control, name + `(${formKey})`, checkDirty, fieldMapper, fieldNamesMapper, errors);
            }
        }
        return errors[name];
    }

    public formControlValidation = (form: FormControl, name: string, checkDirty?: boolean,
        fieldMapper?: Map<string, Func1<AbstractControl, string>>, formErrors?: { [key: string]: string }) => {
        const errors: { [key: string]: string } = this.helper.isNullOrUndefined(formErrors) ? {} : formErrors;

        const messages = this.validationMessages;

        if (form && !form.valid) {
            if (!checkDirty || (this.checkDirty(form))) {
                for (const key in form.errors) {
                    if (!!key) {
                        errors[name] = errors[name]
                            || messages[key].replace('{{field}}', this.helper.snakeCaseToSentenceCase(name));

                        this.formatErrorMessage(fieldMapper, errors, name, form);
                    }
                }
            }
        }
        return errors[name];
    }

    public checkDirty(control: AbstractControl): boolean {
        return control.dirty || control.touched;
    }

    public checkDirtyAndInvalid(control: AbstractControl): boolean {
        try {
            return (control.dirty || control.touched) && control.invalid;
        } catch (error) {
            if (this.helper.isNullOrUndefined(control)) {
                console.error('No control found to check for invalid!');
            } else {
                console.error(error);
            }
            return false;
        }
    }

    private formatErrorMessage(fieldMapper: Map<string, Func1<AbstractControl, string>>,
        formErrors: { [key: string]: string; }, controlName: string, control: AbstractControl) {
        const resultFieldMapper = new Map<string, Func1<AbstractControl, string>>();
        this.fieldMapper.forEach((v, k) => {
            resultFieldMapper.set(k, v);
        });
        if (!this.helper.isNullOrUndefined(fieldMapper) && fieldMapper.size > 0) {
            fieldMapper.forEach((v, k) => {
                resultFieldMapper.set(k, v);
            });
        }
        if (!this.helper.isNullOrUndefined(resultFieldMapper)) {
            resultFieldMapper.forEach((value, fieldKey) => {
                if (!this.helper.isNullOrUndefined(fieldKey) && !this.helper.isNullOrUndefined(value)) {
                    formErrors[controlName] = formErrors[controlName].replace(`{{${fieldKey}}}`, value(control));
                }
            });
        }
    }
}
