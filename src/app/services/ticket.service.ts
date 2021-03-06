import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from "./auth-service.service";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TicketService {
  authToken: any;
   ticketNum
  constructor(private authService:AuthService,private http: HttpClient) { }

  create(ticket){
    console.log(ticket);
    
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);

    let body = new FormData();
    body.append('subject', ticket.subject);
    body.append('description', ticket.description);
    body.append('tokenType', ticket.tokenType);
    body.append('recieveEmail', ticket.recieveEmail);
    body.append('attachment', ticket.file);
    console.log(body);
    
    return this.http.post('/tickets/create', body, { headers: headers })
      ////.map(res => res.json());
  }
  listmy(){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('/tickets/listmy', { headers: headers });
      //.map(res => res.json());
  }
  currentTicket(num){
    this.ticketNum = num;
    
  }
  GetCurrentTicket(){
    return this.ticketNum;
  }
  replay(values){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('/tickets/replay',values, { headers: headers })
      //.map(res => res.json());
  }
  listAdmin(){
    let headers = new HttpHeaders({
      'Authorization' : this.authToken
    });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.get('/tickets/listall', { headers: headers })
      //.map(res => res.json());
  }
  answer(values){
        let headers = new HttpHeaders({       'Authorization' : this.authToken     });
    this.loadToken();
    headers.append('Authorization', this.authToken);
    return this.http.post('/tickets/answer',values, { headers: headers })
      //.map(res => res.json());
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;

    
  }
}