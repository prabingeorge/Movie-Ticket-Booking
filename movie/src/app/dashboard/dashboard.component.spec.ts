import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MovieSearchComponent } from '../movie-search/movie-search.component';
import { MovieService } from '../movie.service';
import { HEROES } from '../mock-movies';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let movieService;
  let getHeroesSpy: jasmine.Spy;

  beforeEach(waitForAsync(() => {
    movieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    getHeroesSpy = movieService.getMovies.and.returnValue(of(HEROES));
    TestBed
        .configureTestingModule({
          declarations: [DashboardComponent, MovieSearchComponent],
          imports: [RouterTestingModule.withRoutes([])],
          providers: [{provide: MovieService, useValue: movieService}]
        })
        .compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual('Top Heroes');
  });

  it('should call movieService', waitForAsync(() => {
       expect(getHeroesSpy.calls.any()).toBe(true);
     }));

  it('should display 4 links', waitForAsync(() => {
       expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
     }));
});
