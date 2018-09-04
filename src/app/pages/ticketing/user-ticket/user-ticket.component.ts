import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserTicketComponent implements OnInit {
  public router: Router;
  constructor(router:Router) { 
    this.router = router;
  }

  ngOnInit() {
  }
  ShowTicket(){
    this.router.navigate(['/pages/ticketing/TicketList']);
  }
  State(){
    this.router.navigate(['/pages/ticketing/TicketState']);
  }
}
