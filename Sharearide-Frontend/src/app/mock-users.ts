import { User } from './user.model';

const JsonUsers = [
  {
    firstName: "Jarne",
    lastName: "Deschacht",
    email: "jarne.deschacht@student.hogent.be",
    phonenumber: "0492554616",
    dateOfBirth: new Date(1999,7, 9), //maand -1 doen
    gender: "Male"
  },
  {
    firstName: "Ime",
    lastName: "Van Daele",
    email: "imevandaele@gmail.com",
    phonenumber: "0484977384",
    dateOfBirth: new Date(2000, 2, 8),
    gender: "Female"
  }
];
export const USERS: User[] = JsonUsers.map(User.fromJSON);
