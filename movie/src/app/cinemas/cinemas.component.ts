import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { Cinema, Movie } from '../movie';
import { MovieService } from '../movie.service';
import { MessageService } from '../message.service';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-cinemas',
  templateUrl: './cinemas.component.html',
  styleUrls: [ './cinemas.component.css' ]
})
export class CinemasComponent implements OnInit {
  movie: Movie | undefined;
  cinemas: Cinema[] = [];
  cinemasList: {movieId: Number, cinemaName: string, cinemaId: Number, showTimes: []}[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.getMovie();
    this.getCinemas();
  }

  getMovie(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.movieService.getMovie(id)
      .subscribe(movie => this.movie = movie);
  }

  getCinemas(): void {
    this.movieService.getCinemas()
      // .subscribe(cinemas => this.cinemas = cinemas);
      .subscribe((cinemas) => this.showCinemas(cinemas));
  }

  showCinemas(cinemas: Cinema[]) {

    this.movie?.movieAndCinemaFk.forEach((movieAndCinema) => {
      cinemas.forEach((cinema) => {
        if (movieAndCinema.C_ID == cinema.id) {
          this.cinemasList.push({movieId: 1, cinemaName: cinema.name, cinemaId: cinema.id, showTimes: movieAndCinema.shows})

        }
      })
    })
  }


  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.movie) {
      this.movieService.updateHero(this.movie)
        .subscribe(() => this.goBack());
    }
  }

  bookMovieTickets(cinemaId: Number, cinemaName: string, showTime: string): void {
    const movieId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.messageService.setMovieDetails({ movieId: movieId, movieName: this.movie?.name, movieImage: this.movie?.image, cinema: cinemaName, time: showTime });
    this. router. navigate(['/book-ticket/'+movieId+'/'+cinemaId+'/'+showTime]);
  }


}
