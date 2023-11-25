import { Injectable, NgZone } from '@angular/core';
import { CommonService } from '../../common.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {
  toursUpdated: boolean = false;
  toursList: any = [];
  constructor(private commonService: CommonService, private zone: NgZone) { }

  updateToursList = async () => {
    try {
      const response: any = await this.commonService.request("tours/list");
      if (response.success && response.statusCode === "R200") {
        this.toursUpdated = true;
        this.toursList = response.data;
      }
    } catch (error) {
      console.error("Error updating tours list", error);
    }
  }

  getTours = async () => {
    if (this.toursUpdated) {
      return this.toursList;
    } else {
      await this.updateToursList();
      return this.toursList;
    }
  }
}
