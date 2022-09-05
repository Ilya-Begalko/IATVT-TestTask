import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ChartData } from '../models/i-chart';

@Injectable()
export class ChartService {
  constructor() {}

  result: ChartData = {
    arg: [],
    val: [],
  };

  createSeries(data: any[]) {
    this.result = {
      arg: [],
      val: [],
    };
    
    let elArr = data.map((x) => moment(x.dateAccIn).format('DD-MM-yyyy'));
    elArr = elArr.sort()

    let numOfEl: any = {};
    elArr.forEach(function (a) {
      numOfEl[a] = numOfEl[a] + 1 || 1;
    });

    for (let key in numOfEl) {
      this.result.arg.push(key);
      this.result.val.push(numOfEl[key]);
    }

    return this.result;
  }

  createSeriesWithRange(data: any[], dateStart: string, dateEnd: string) {
    this.result = {
      arg: [],
      val: [],
    };

    let elArr = data.map((x) => moment(x.dateAccIn).format('DD-MM-yyyy'));
    elArr = elArr.sort()
    
    let numOfEl: any = {};
    elArr.forEach(function (a) {
      numOfEl[a] = numOfEl[a] + 1 || 1;
    });

    for (let key in numOfEl) {
      let data = moment(key, 'DD-MM-yyyy')
      let startDate =  moment(dateStart, 'DD-MM-yyyy')
      let endDate =  moment(dateEnd, 'DD-MM-yyyy')
      
      if ( data.isBetween(startDate, endDate) || data.isSame(startDate) || data.isSame(endDate)
      ) {
        this.result.arg.push(key);
        this.result.val.push(numOfEl[key]);
      }
    }
    return this.result;
  }
}
