import { NgForm, FormGroupDirective, FormControl } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class FieldErrorStateMatcher implements ErrorStateMatcher{

    parentForm: FormGroupDirective;

	constructor(parentForm: FormGroupDirective) {
        this.parentForm = parentForm;
    }

	isErrorState(control: FormControl, form: NgForm | FormGroupDirective | null): boolean {
		const isSubmitted = (form && form.submitted) || (this.parentForm && this.parentForm.submitted);
        const isFromDirtyAndSubmitted = !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
		return isFromDirtyAndSubmitted;
	} 
}
