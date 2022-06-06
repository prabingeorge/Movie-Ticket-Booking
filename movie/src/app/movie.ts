export interface Movie {
  id: number;
  name: string;
  director: string;
  image: string;
  castAndCrew: []
  movieAndCinemaFk: {C_ID: Number, shows: []}[]
}

export interface Cinema {
  seatId: string;
  id: number;
  name: string;
  showTimes: [];
  seatsOrder: {};
  booking: {seats: string[], time: string}[]
}