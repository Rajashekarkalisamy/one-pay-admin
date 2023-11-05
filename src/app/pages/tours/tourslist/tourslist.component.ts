import { Component } from '@angular/core';

const ELEMENT_DATA = [
  {
    position: 1,
    name: 'Sunil Joshi',
    description: 'Elite Admin',
    action: true
  },
  {
    position: 2,
    name: 'Andrew McDownland',
    description: 'Real Homes Theme',
    action: true
  },
  {
    position: 3,
    name: 'Christopher Jamil',
    description: 'MedicalPro Theme',
    action: true
  },
  {
    position: 4,
    name: 'Nirav Joshi',
    description: 'Hosting Press HTML',
    action: true
  },
];

@Component({
  selector: 'app-tour',
  templateUrl: './tourslist.component.html',
  styleUrls: ['./tourslist.component.scss'],
})
export class TourslistComponent {

  tourColumns: string[] = ['position', 'name', 'description', 'action'];
  tours = ELEMENT_DATA;

  constructor() {
  }
}
