import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const movies = [
      { id: 12, name: 'Vikram', director: 'Lokesh', image: 'assets/images/vikram.jpg', 
      castAndCrew: ['Kamal Hassan', 'Fahadh Faasil', 'Vijay'], movieAndCinemaFk: [{C_ID: 1, shows: ['11:00 AM', '2:00 PM']}, {C_ID: 2, shows: ['11:00 AM']}]  },
      { id: 13, name: 'Don', director: 'Cibi Chakaravarthi', image: 'assets/images/don.jpg' , castAndCrew: ['SivaKarthikeyan', 'Priyanka'] },
      { id: 14, name: 'Beast', director: 'Nelson Dilipkumar', image: 'assets/images/beast.jpg', castAndCrew: ['Vijay', 'Pooja'] },
      { id: 15, name: 'K.G.F: Chapter 2', director: 'Prashanth Neel', image: 'assets/images/kgf2.jpg', castAndCrew: ['Yash', 'Raveena'] },
      { id: 16, name: 'RRR', director: 'Rajamouli', image: 'assets/images/rrr.jpg', castAndCrew: ['Ramcharan', 'Alia'] }
    ];
    const cinemas = [
      {id: 1, name: 'Chakravarthy Cinemas', showTimes: ['11:00 AM', '2:00 PM'], seatsOrder: {rows: 10, columns: 12}, booking: [
        {show:1, time: '11:00 AM', seats: ['1,2', '1,3']},
        {show:2, time: '2:00 PM', seats: ['3,2']}
      ]},
      {id: 2, name: 'Sri Karthigai Theatre', showTimes: ['11:00 AM', '2:00 PM', '6:00 PM'], seatsOrder: {rows: 10, columns: 12}, booking: []},
      {id: 3, name: 'Rajesh A/C Theater', showTimes: ['11:00 AM', '2:00 PM', '6:00 PM'], seatsOrder: {rows: 10, columns: 12}, booking: []},
      {id: 4, name: 'Thangam Cinema Theatre', showTimes: ['11:00 AM', '2:00 PM', '6:00 PM'], seatsOrder: {rows: 10, columns: 12}, booking: []},
      {id: 5, name: 'Anand Cinemas', showTimes: ['11:00 AM', '2:00 PM', '6:00 PM'], seatsOrder: {rows: 10, columns: 12}, booking: []},
    ]
    return {movies, cinemas};
  }

  // Overrides the genId method to ensure that a movie always has an id.
  // If the movies array is empty,
  // the method below returns the initial number (11).
  // if the movies array is not empty, the method below returns the highest
  // movie id + 1.
  genId(movies: Movie[]): number {
    return movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 11;
  }
}
