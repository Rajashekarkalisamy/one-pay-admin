import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToursService } from 'src/app/services/pages/tours/tours.service';

@Component({
  selector: 'app-addtour',
  templateUrl: './addtour.component.html',
  styleUrls: ['./addtour.component.scss']
})

export class AddtourComponent implements OnInit {
  state = this._router.getCurrentNavigation()?.extras.state;
  isPlan: boolean = false;
  tourFormSubmitted: boolean = false;
  tourMemberFormSubmitted: boolean = false;
  tourMembers: string[] = ["Rajasekar", "Kalisamy"];
  tourId: string | null;
  constructor(
    private _router: Router,
    private tourService: ToursService
  ) { }

  ngOnInit(): void {
    this.tourId = this.state && this.state['tour_id'] ? this.state['tour_id'] : null;
    if (this.tourId) {
      this.tourService.getTours().then(tours => {
        const tour = tours.find((tour: any) => tour._id === this.tourId);
        this.tourForm.patchValue({
          plan: tour.plan ?? '',
          description: tour.description ?? '',
          planstartdate: tour.plan_start_date ?? '',
          planenddate: tour.plan_end_date ?? '',
        })
      });
    }
  }

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
