import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie, Cinema } from './movie';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class MovieService {

  private moviesUrl = 'api/movies';  // URL to web api
  private cinemasUrl = 'api/cinemas';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET movies from the server */
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        tap(_ => this.log('fetched movies')),
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }

  /** GET cinemas from the server */
  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(this.cinemasUrl)
      .pipe(
        tap(_ => this.log('fetched cinemas')),
        catchError(this.handleError<Cinema[]>('getCinemas', []))
      );
  }

  /** PUT: update the booked tickets on the server */
  updateBookedTickets(cinema: Cinema): Observable<any> {
    return this.http.put(this.cinemasUrl, cinema, this.httpOptions).pipe(
      tap(_ => this.log(`updated cinema id=${cinema.id}`)),
      catchError(this.handleError<any>('updateBookedTickets'))
    );
  }

  /** GET movie by id. Return `undefined` when id not found */
  getHeroNo404<Data>(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/?id=${id}`;
    return this.http.get<Movie[]>(url)
      .pipe(
        map(movies => movies[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} movie id=${id}`);
        }),
        catchError(this.handleError<Movie>(`getMovie id=${id}`))
      );
  }

  /** GET movie by id. Will 404 if id not found */
  getMovie(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  /** GET cinema by id. Will 404 if id not found */
  getCinema(id: number): Observable<Cinema> {
    const url = `${this.cinemasUrl}/${id}`;
    return this.http.get<Cinema>(url).pipe(
      tap(_ => this.log(`fetched cinema id=${id}`)),
      catchError(this.handleError<Cinema>(`getCinema id=${id}`))
    );
  }


  /* GET movies whose name contains search term */
  searchHeroes(term: string): Observable<Movie[]> {
    if (!term.trim()) {
      // if not search term, return empty movie array.
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         this.log(`found movies matching "${term}"`) :
         this.log(`no movies matching "${term}"`)),
      catchError(this.handleError<Movie[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new movie to the server */
  addHero(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.moviesUrl, movie, this.httpOptions).pipe(
      tap((newHero: Movie) => this.log(`added movie w/ id=${newHero.id}`)),
      catchError(this.handleError<Movie>('addHero'))
    );
  }

  /** DELETE: delete the movie from the server */
  deleteHero(id: number): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;

    return this.http.delete<Movie>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted movie id=${id}`)),
      catchError(this.handleError<Movie>('deleteHero'))
    );
  }

  /** PUT: update the movie on the server */
  updateHero(movie: Movie): Observable<any> {
    return this.http.put(this.moviesUrl, movie, this.httpOptions).pipe(
      tap(_ => this.log(`updated movie id=${movie.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a MovieService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MovieService: ${message}`);
  }
}
