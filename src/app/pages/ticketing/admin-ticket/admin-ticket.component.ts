import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '../../../../../node_modules/@angular/router';
@Component({
  selector: 'app-admin-ticket',
  templateUrl: './admin-ticket.component.html',
  styleUrls: ['./admin-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminTicketComponent implements OnInit {
  public router: Router;
  constructor(router:Router) {
    this.router = router;
   }

  ngOnInit() {
  }
  ShowTicket(){
    this.router.navigate(['/pages/ticketing/AdminTicketList']);
  }
}
