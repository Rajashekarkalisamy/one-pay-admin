import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { AccountsService } from 'src/app/services/pages/tours/accounts.service';
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
  selectedMembers: any = [];
  accountsFormSubmitted: boolean = false;
  isAllSelected: boolean = false;
  transactionId: string | null;
  tourId: string | null;

  accountsForm = new FormGroup({
    tour_id: new FormControl('', [Validators.required]),
    type: new FormControl('collection', [Validators.required]),
    date: new FormControl('', [Validators.required]),
    collected_from: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required])
  });

  constructor(
    private commonService: CommonService,
    private tourService: ToursService,
    private memberService: MemberService,
    private accountsService: AccountsService,
  ) { }

  ngOnInit(): void {
    this.tourService.getTours().then(tours => {
      this.tours = tours;
    });
    this.transactionId = this.commonService.queryParams()?.transaction_id ?? null;
    this.tourId = this.commonService.queryParams()?.tour_id ?? null;
    if (this.tourId && this.transactionId) {
      this.memberService.getMembers(this.tourId).then(members => {
        this.members = members;
        this.accountsService.getTransactions(this.tourId).then((response: any) => {
          let transaction = response.find((transaction: any) => transaction._id == this.transactionId);
          this.accountsForm.patchValue({
            tour_id: transaction.tour_id,
            type: transaction.type,
            date: transaction.date,
            collected_from: transaction.collected_from,
            amount: transaction.amount,
            reason: transaction.reason,
          });
          (transaction.members).forEach((memberId: string) => {
            this.selectMember(memberId, true)
          });
        });
      })
    }
  }
  loadMembers = () => {
    if (this.af.tour_id.value) {
      this.memberService.getMembers(this.af.tour_id.value).then(members => {
        this.members = members;
        this.selectAll(false);
      });
      this.accountsFormSubmitted = false;
    }
  }
  addDetail = () => {
    this.accountsFormSubmitted = true;
    if (this.accountsForm.valid && this.selectedMembers.length !== 0) {
      const data = {
        account_id: this.transactionId,
        tour_id: this.af.tour_id.value,
        type: this.af.type.value,
        date: this.af.date.value,
        collected_from: this.af.collected_from.value,
        amount: this.af.amount.value,
        reason: this.af.reason.value,
        members: this.selectedMembers
      }
      this.accountsService.create(data).then((response: any) => {
        if (response.statusCode == "R214" || response.statusCode == "R215") {
          this.accountsFormSubmitted = false;
          this.selectedMembers = [];
          this.accountsForm.patchValue({
            date: '',
            collected_from: '',
            amount: '',
            reason: '',
          });
          this.selectAll(false);
          this.transactionId = null;
        }
      })
    } else {
      console.log(this.af, this.selectedMembers)
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
    this.selectedMembers = this.members.filter((member: any) => member.checked).map((member: any) => member._id)
  }
  selectMember = (memberId: string, isChecked: boolean) => {
    this.members.find((member: any) => member._id == memberId)['checked'] = isChecked;
    const checkedCount = this.members.filter((member: any) => member.checked).length;
    this.isAllSelected = (checkedCount == this.members.length)
    this.selectedMembers = this.members.filter((member: any) => member.checked).map((member: any) => member._id)
  }
  transactionTypeChange = () => {
    if (this.af.type.value === "collection") {
      this.accountsForm.get("collected_from")?.setValidators([Validators.required]);
    } else {
      this.accountsForm.get("collected_from")?.clearValidators();
    }
    this.accountsForm.updateValueAndValidity();
    this.accountsForm.patchValue({ collected_from: null });
    this.accountsFormSubmitted = false;
  }

}
