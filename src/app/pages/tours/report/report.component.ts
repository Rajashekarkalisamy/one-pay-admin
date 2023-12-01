import { Component } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { AccountsService } from 'src/app/services/pages/tours/accounts.service';
import { MemberService } from 'src/app/services/pages/tours/member.service';
import { ToursService } from 'src/app/services/pages/tours/tours.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent {

  transactionColumns: string[] = ['position', 'date', 'name', 'shares', 'description', 'amount', 'action'];
  transactions: any = [];
  members: any = [];
  tourId: string;
  tourName: string;
  collection: number = 0;
  expenditure: number = 0;
  constructor(
    private commonService: CommonService,
    private accountsService: AccountsService,
    private tourService: ToursService,
    private memberService: MemberService,
  ) { }

  ngOnInit() {
    this.tourId = this.commonService.queryParams()?.tour_id ?? null;
    if (!this.tourId) {
      this.commonService.redirect('tours/list')
    } else {
      this.tourService.getTours().then((response: any) => {
        this.tourName = response.find((tour: any) => tour._id == this.tourId).plan;
      })
      this.loadTransactions();
    }
  }

  deleteTransaction(tourId: String, transactionId: String) {
    const message = `Are you sure you want to delete?`;
    this.commonService.confirm(message).then(confirm => {
      if (confirm) {
        this.accountsService.deleteTransaction(tourId, transactionId).then(response => {
          if (response) {
            alert(1)
            this.loadTransactions();
          }
        })
      }
    })
  }

  loadTransactions = () => {
    this.accountsService.getTransactions(this.tourId).then((data: any) => {
      this.memberService.getMembers(this.tourId).then((response: any) => {
        this.members = response;
        console.log(response)
        this.transactions = [];
        var i = 1;
        this.collection = 0;
        this.expenditure = 0;
        data.forEach((element: any) => {
          let name = element.collected_from ? this.members.find((member: any) => member._id == element.collected_from).name : ''
          let tour: { position: number, name: string, description: string | null, shares: string, account_id: string, tour_id: string, date: Date, amount: String } = {
            position: i++,
            account_id: element._id,
            tour_id: element.tour_id,
            date: new Date(element.date),
            name: name,
            shares: `${element.members.length} Share(s)`,
            description: element.reason,
            amount: element.type == "collection" ? `+ ${element.amount}` : `- ${element.amount}`,
          };
          if (element.type == "collection") {
            this.collection = this.collection + element.amount;
          } else {
            this.expenditure = this.expenditure + element.amount;
          }
          this.transactions.push(tour);
        });
      });
    });
  }

}
