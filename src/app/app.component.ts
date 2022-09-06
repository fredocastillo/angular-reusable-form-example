import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Machine } from './crud/models/machine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CrudFormService';

  form = new FormGroup({
    machine: new FormControl<Machine>({} as Machine),
  });


  onSubmit(): void {
    if(this.form.valid){
      console.log(this.form.getRawValue());
    }
  }
  
  setValue(): void {
    this.machine?.setValue({ id: 2, name: 'Some Test Name', type: 'Another type', date: new Date()});
  }

  get machine() {
    return this.form.get("machine");
  }

  
}
