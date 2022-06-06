import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { MoviesComponent } from './movies/movies.component';
import { CinemasComponent } from './cinemas/cinemas.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';


const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: CinemasComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'book-ticket/:movieId/:cinemaId/:showTime', component: BookTicketComponent },
  { path: 'confirmation', component: BookingConfirmationComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
