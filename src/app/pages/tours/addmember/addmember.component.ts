import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { MemberService } from 'src/app/services/pages/tours/member.service';

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.scss']
})
export class AddmemberComponent implements OnInit {
  tourId: string | null;
  memberFormSubmitted: boolean = false;
  memberId: String | null;
  members: any = [];
  memberColumns: string[] = ['position', 'name', 'action'];

  constructor(private commonService: CommonService, private memberService: MemberService) { }

  memberForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  });
  get mf() {
    return this.memberForm.controls;
  }

  ngOnInit(): void {
    this.tourId = this.commonService.queryParams()?.tour_id ?? null;
    if (!this.tourId) {
      this.commonService.redirect('tours/list')
    } else {
      this.loadMembers();
    }
  }
  addMember = () => {
    this.memberFormSubmitted = true;
    if (this.memberForm.valid) {
      this.memberService.create({
        tour_id: this.tourId,
        member_id: this.memberId,
        name: this.mf.name.value
      }).then((response: any) => {
        this.memberId = null;
        this.memberForm.patchValue({ name: '' });
        this.memberFormSubmitted = false;
        this.loadMembers();
      })
    }
  }
  editMember = (memberId: String) => {
    this.memberId = memberId;
    this.memberService.getMembers(this.tourId).then(members => {
      const member = members.find((member: any) => member._id === memberId);
      this.memberForm.patchValue({ name: member.name });
    });
  }
  clearMember = () => {
    this.memberId = null;
    this.memberForm.patchValue({ name: '' });
  }
  deleteMember = (memberId: String) => {
    const message = `Are you sure you want to delete?`;
    this.commonService.confirm(message).then(confirm => {
      if (confirm) {
        this.memberService.deleteMember(this.tourId, memberId).then(response => {
          if (response) {
            this.loadMembers();
          }
        })
      }
    })
  }

  loadMembers = () => {
    this.memberService.getMembers(this.tourId).then(data => {
      this.members = [];
      var i = 1;
      data.forEach((element: any) => {
        let member: { position: Number, name: String, tour_id: String, member_id: String } = {
          position: i++,
          name: element.name,
          tour_id: element.tour_id,
          member_id: element._id,
        };
        this.members.push(member);
      });
    });
  }

}
