import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { MemberService } from 'src/app/services/pages/tours/member.service';
import { ToursService } from 'src/app/services/pages/tours/tours.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss']
})
export class AccountsComponent implements OnInit {

  tours: any = [];
  collection: boolean = false;
  expenditure: boolean = false;
  members: any = [];

  accountsFormSubmitted: boolean = false;

  accountsForm = new FormGroup({
    tour_id: new FormControl('', [Validators.required]),
    type: new FormControl('collection', [Validators.required]),
    collected_from: new FormControl(''),
  });

  constructor(
    private commonService: CommonService,
    private tourService: ToursService,
    private memberService: MemberService,
  ) { }

  ngOnInit(): void {
    this.tourService.getTours().then(tours => {
      this.tours = tours;
    })
  }
  loadMembers = () => {
    if (this.af.tour_id.value) {
      this.memberService.getMembers(this.af.tour_id.value).then(members => {
        this.members = members;
      });
      this.showAccountsSection();
    }
  }
  showAccountsSection = () => {
    if (this.af.tour_id.value) {
      if (this.af.type.value == "collection") {
        this.collection = true;
        this.expenditure = false;
      } else if (this.af.type.value == "expenditure") {
        this.expenditure = true;
        this.collection = false;
      }
    }
  }
  addDetail = () => {
    this.accountsFormSubmitted = true;
    if (this.accountsForm.valid) {
    }
  }

  get af() {
    return this.accountsForm.controls;
  }

}
