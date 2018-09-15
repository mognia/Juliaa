import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '../../../../../node_modules/@angular/router';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TicketService } from "../../../services/ticket.service";
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-user-ticket',
  templateUrl: './user-ticket.component.html',
  styleUrls: ['./user-ticket.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserTicketComponent implements OnInit {
  public router: Router;
  public form: FormGroup;
  public subject: AbstractControl;
  public description: AbstractControl;
  public tokenType: AbstractControl;
  public recieveEmail: AbstractControl;
  successTicket:boolean=false;
  acceptMail;
  ticketsArr=[];
   ticketNum;
  constructor(router: Router, private activatedRoute: ActivatedRoute,
    fb: FormBuilder,
    private ticketService: TicketService,
    private flashMessage: FlashMessagesService) {
    this.router = router;

    this.form = fb.group({
      subject: ['', Validators.required],
      description: ['', Validators.required],
      tokenType: ['', Validators.required],
      recieveEmail: [false],
    });
    this.subject = this.form.controls['subject'];
    this.description = this.form.controls['description'];
    this.tokenType = this.form.controls['tokenType'];
    this.recieveEmail = this.form.controls['recieveEmail'];
  }

  ngOnInit() {
    this.ticketService.listmy().subscribe(data=>{
      let tickets = data['tickets'];


      tickets.forEach(ticket => {
        this.ticketsArr.push(ticket);
      });
      console.log(this.ticketsArr);
      
    })
  }
  public onSubmit(values: Object) {
    this.ticketService.create(values).subscribe(data => {
      let success = data['success'];
      if(success) {
        // this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 5000});
        this.successTicket = true;
      } else {
        // this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});

      }
    });
  }

  ShowTicket(ticketnum) {

    this.ticketNum = ticketnum;
    this.ticketService.currentTicket(ticketnum);
    this.router.navigate(['/pages/ticketing/TicketList']);
  }
  State() {
    this.router.navigate(['/pages/ticketing/TicketState']);
  }
}
