import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "./auth-service.service";
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  authToken: any;
   ticketNum
  constructor(private authService:AuthService,private http: Http) { }

  create(ticket){
    console.log(ticket);
    
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);

    let body = new FormData();
    body.append('subject', ticket.subject);
    body.append('description', ticket.description);
    body.append('tokenType', ticket.tokenType);
    body.append('recieveEmail', ticket.recieveEmail);

    console.log(body);
    
    return this.http.post('/tickets/create', body, { headers: headers })
      .map(res => res.json());
  }
  listmy(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('/tickets/listmy', { headers: headers })
      .map(res => res.json());
  }
  currentTicket(num){
    this.ticketNum = num;
    
  }
  GetCurrentTicket(){
    return this.ticketNum;
  }
  replay(values){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('/tickets/replay',values, { headers: headers })
      .map(res => res.json());
  }
  listAdmin(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('/tickets/listall', { headers: headers })
      .map(res => res.json());
  }
  answer(values){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('/tickets/answer',values, { headers: headers })
      .map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
