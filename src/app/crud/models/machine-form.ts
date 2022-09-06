import { FormControl } from "@angular/forms";

export interface MachineForm {
    id: FormControl<number | null>;
    name: FormControl<string>;
    type: FormControl<string>;
    date: FormControl<Date | null>;
}
