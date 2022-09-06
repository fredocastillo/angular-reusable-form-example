import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, FormGroupDirective, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FieldErrorStateMatcher } from '../../models/field-error-state-matcher';
import { Machine } from '../../models/machine';
import { MachineForm } from '../../models/machine-form';

@Component({
  selector: 'app-machine-form',
  templateUrl: './machine-form.component.html',
  styleUrls: ['./machine-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MachineFormComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => MachineFormComponent),
    },
  ],
  host: {
    "[id]": "inputId",
  },
})
export class MachineFormComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy {

  static nextId = 0;
  inputId = `machine-input-${MachineFormComponent.nextId++}`;

  form = new FormGroup<MachineForm>({
    id: new FormControl(null),
    name: new FormControl('', { validators: Validators.required, nonNullable: true}),
    type: new FormControl('', { validators: Validators.required, nonNullable: true}),
    date: new FormControl(null, { validators: Validators.required })
  });

  errorMatcher: FieldErrorStateMatcher;

  subscriptions: Subscription;

  constructor(private parentFormGroup: FormGroupDirective) {
    this.subscriptions = new Subscription();
    this.errorMatcher = new FieldErrorStateMatcher(parentFormGroup);
   }
  
  writeValue(value: Machine | null): void {
    if(value)
      this.form.patchValue(value, { emitEvent: false });
    else
      this.form.reset();
  }
  
  registerOnChange(onChange: (value: any) => void) {
    this.subscriptions.add(this.form.valueChanges.subscribe(onChange));
  }

  registerOnTouched(onTouched: () => void): void {
    this.subscriptions.add(this.form.valueChanges.subscribe(onTouched));
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  validate(control: AbstractControl<Machine>): ValidationErrors | null {
    return this.form.valid ? null : { machine: true };
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  get id() {
    return this.form.get("id");
  }
  get name() {
    return this.form.get("name");
  }
  get type() {
    return this.form.get("type");
  }
  get date() {
    return this.form.get("date");
  }

  ngOnInit(): void {}

}
