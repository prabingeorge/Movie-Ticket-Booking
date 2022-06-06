import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MessageService } from '../message.service';
import { Location } from '@angular/common';

import { Cinema, Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css']
})
export class BookTicketComponent implements OnInit {

  cinema: Cinema | any;
  multi:any[][] = [];
  char: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  selectedSeats: Cinema[] = [];
  movieDetails: { movieId: String, showTime: String } = { movieId: '', showTime: ''};

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private messageService: MessageService,
    private location: Location,
  ) { }


  ngOnInit(): void {
    this.getCinema();
  }

  getCinema(): void {
    // const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.movieDetails = {
      movieId: this.route.snapshot.paramMap.get('movieId') || '',
      showTime: this.route.snapshot.paramMap.get('showTime') || ''
    }
    const cinemaId = this.route.snapshot.paramMap.get('cinemaId') || '';
    this.movieService.getCinema(parseInt(cinemaId))
      .subscribe(cinema => {
        this.cinema = cinema;
        this.createSeatLayout(this.cinema?.seatsOrder);
        this.setBookedTickets();
      });
  };

  createSeatLayout(seatsOrder: any) {
    for (let row = 1; row <= seatsOrder.rows; row++) {
      let innerColumnArray = [];
      for (let column = 1; column <= seatsOrder.columns; column++) {
        innerColumnArray.push({ seatId: row + ',' + column, booked: false, selected: false });
      }
      this.multi.push(innerColumnArray);
    }
  };

  setBookedTickets(){
    const showTime = this.route.snapshot.paramMap.get('showTime');
    const booking = this.cinema.booking;
    const selectedShow = booking.find((data: { time: string | null; }) => data.time == showTime);
    this.multi.forEach(function(seatRow) {
      seatRow.forEach(function(seatColumn) {
        const isSeatBooked = selectedShow.seats.indexOf(seatColumn.seatId);
        if (isSeatBooked > -1) {
          seatColumn.booked = true;
        }
      });
    });
  };

  getSelectedTickets() {
    let tickets:Cinema[] = [];
    this.multi.forEach(function(seatRow) {
      seatRow.forEach(function(seatColumn) {
        if (seatColumn.selected) {
          tickets.push(seatColumn);
        }
      });
    });
    this.selectedSeats = tickets;
  }

  payAmount(cinema: Cinema) {

    const showTime = this.route.snapshot.paramMap.get('showTime');
    this.selectedSeats.forEach(function(selectedTicket) {
      var selectedCinema = cinema.booking.find(data =>data.time == showTime);
      selectedCinema?.seats.push(selectedTicket.seatId)
    })

    this.movieService.updateBookedTickets(this.cinema)
    .subscribe(() => this.navigateConfirmPage());
  }

  navigateConfirmPage() {
    const seats =  this.selectedSeats.map(seat => seat.seatId);
    this.messageService.setMovieDetails({seats: seats})
    this. router. navigate(['/confirmation']);
  }

  goBack(): void {
    this.location.back();
  }

}
