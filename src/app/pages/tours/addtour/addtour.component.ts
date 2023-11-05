import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addtour',
  templateUrl: './addtour.component.html',
  styleUrls: ['./addtour.component.scss']
})
export class AddtourComponent {
  isPlan: boolean = false;
  tourFormSubmitted: boolean = false;
  tourMemberFormSubmitted: boolean = false;
  tourMembers: string[] = ["Rajasekar", "Kalisamy"];
  tourForm = new FormGroup({
    plan: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    planstartdate: new FormControl('', [Validators.required]),
    planenddate: new FormControl('', [Validators.required])
  });
  get atf() {
    return this.tourForm.controls;
  }
  tourMemberForm = new FormGroup({
    member_name: new FormControl('', [Validators.required])
  });
  get amf() {
    return this.tourMemberForm.controls;
  }

  addTour = () => {
    this.tourFormSubmitted = true;
    if (this.tourForm.valid) {
      this.isPlan = true;
    }
  }

  addMember = () => {
    this.tourMemberFormSubmitted = true;
    if (this.tourMemberForm.valid) {
      let member = this.amf.member_name.value ?? '';
      this.tourMembers.push(member);
      this.tourMemberForm.patchValue({
        member_name: ''
      });
      this.tourMemberFormSubmitted = false;
    }
  }
  removeMember(key: string): void {
    let index = Number(key);
    if (index >= 0) {
      this.tourMembers.splice(index, 1);
    }
  }
}
