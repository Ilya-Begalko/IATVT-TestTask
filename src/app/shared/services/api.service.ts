import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {
  }

 getData(){
     return this.http.get<any[]>("../../../assets/salereports.json", { withCredentials: false })
  }

  getAgents(){
    return this.http.get<any[]>("../../../assets/agents.json", { withCredentials: false })
  }

}