import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})
export class BookingConfirmationComponent implements OnInit {

  bookdingDetails: any = {};


  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.bookdingDetails = this.messageService.getMovieDetails();
  }

}
