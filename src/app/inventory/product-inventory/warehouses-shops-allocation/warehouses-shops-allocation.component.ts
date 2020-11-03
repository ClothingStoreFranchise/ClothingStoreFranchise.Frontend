import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';
import { Shop } from 'src/app/shared/models/shop.model';


interface Building {
  id: number,
  address: string
}
@Component({
  selector: 'app-warehouses-shops-allocation',
  templateUrl: './warehouses-shops-allocation.component.html',
  styleUrls: ['./warehouses-shops-allocation.component.css']
})
export class WarehousesShopsAllocationComponent {

  form: FormGroup;
  elementsData: any;
  building: string;

  get elementsFormArray() {
    return this.form.controls.elements as FormArray;
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<WarehousesShopsAllocationComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Building[])  {
      this.form = this.formBuilder.group({
        elements: new FormArray([], minSelectedCheckboxes(1))
      });

      this.elementsData = data;
      this.building = this.elementsData.building;
      this.addCheckboxes();

    // async elements
    /*of(this.getElements()).subscribe(elements => {
      this.elementsData = elements;
      this.addCheckboxes();
    });*/

    // synchronous elements
    /*this.elementsData = this.getElements();
    this.addCheckboxes();*/
  }

  private addCheckboxes() {
    this.elementsData.forEach(() => this.elementsFormArray.push(new FormControl(false)));
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

  submit() {
    const selectedIds = this.form.value.elements
      .map((checked, i) => checked ? this.elementsData[i].id : null)
      .filter(v => v !== null);

      this.dialogRef.close({data:selectedIds});
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);

    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}
