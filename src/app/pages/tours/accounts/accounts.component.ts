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
  members: any = [];

  accountsFormSubmitted: boolean = false;
  isAllSelected: boolean = false;

  accountsForm = new FormGroup({
    tour_id: new FormControl('6563a4d838699e01724a7fa1', [Validators.required]),
    type: new FormControl('collection', [Validators.required]),
    collected_from: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
  });

  constructor(
    private commonService: CommonService,
    private tourService: ToursService,
    private memberService: MemberService,
  ) { }

  ngOnInit(): void {
    this.tourService.getTours().then(tours => {
      this.tours = tours;
    });
    this.loadMembers()
  }
  loadMembers = () => {
    if (this.af.tour_id.value) {
      this.memberService.getMembers(this.af.tour_id.value).then(members => {
        this.members = members;
      });
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

  selectAll = (isChecked: boolean) => {
    this.isAllSelected = isChecked;
    this.members.forEach((element: any) => {
      element['checked'] = isChecked;
    });
  }
  selectMember(memberId: string, isChecked: boolean) {
    this.members.find((member: any) => member._id == memberId)['checked'] = isChecked;
    const checkedCount = this.members.filter((member: any) => member.checked).length;
    this.isAllSelected = (checkedCount == this.members.length)
  }

}
