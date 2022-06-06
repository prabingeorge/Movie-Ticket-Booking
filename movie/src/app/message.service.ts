import { Injectable } from '@angular/core';
import { throwIfEmpty } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MessageService {
  messages: string[] = [];
  movieDetails: {movieId?: Number, movieName?: string, movieImage?: string, cinema?: string, time?: string, seats?: string[], amount?: Number} = {};

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  setMovieDetails(movieDetail: {movieId?: Number, movieName?: string, movieImage?: string, cinema?: string, time?: string, seats?: string[]}) {
    if (movieDetail?.seats) {
      const char: any = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let bookedSeats: string[] = [];
      movieDetail.seats.forEach(function(seat){
        const seatValue = seat.split(',');
        const rowValue = char[parseInt(seatValue[0])-1];
        bookedSeats.push(rowValue + seatValue[1])
      })
      this.movieDetails.seats = bookedSeats;
      this.movieDetails.amount = movieDetail.seats.length * 200;
    } else {
      this.movieDetails = movieDetail;
    }
  }

  getMovieDetails() {
    // this.movieDetails = {"movieId":12,"movieName":"Vikram","movieImage":"assets/images/vikram.jpg","cinema":"Chakravarthy Cinemas","time":"11:00 AM","seats":["2,4","3,4"],"amount":400};
    return this.movieDetails;
  }

}
