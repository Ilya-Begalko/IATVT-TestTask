import { Component } from '@angular/core';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class DataTableComponent {
  dataSource: any;
  agentDataSource:any;
  applyFilterTypes: any;

  constructor(private apiService: ApiService) {

    this.apiService.getData().subscribe( async (item:any) =>{
      this.dataSource = item.items
      console.log(this.dataSource)
    })
    this.apiService.getAgents().subscribe( async (item:any) =>{
      this.agentDataSource = item.agents.map((x: { code: any; })=> x.code)
      console.log(this.agentDataSource)
    })
  }
}
