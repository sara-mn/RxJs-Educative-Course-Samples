import { merge } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { scan } from 'rxjs/operators';

let loadingBar = document.querySelector<HTMLElement>('#loading-bar');
let loadingBox = document.querySelector('#loading-box');
let ajaxError = document.querySelector<HTMLElement>('#ajax-error');

// loadingBar.style.width = '100px';

const requestsArray = [
  ajax('https://ghibliapi.herokuapp.com/films'),
  ajax('https://ghibliapi.herokuapp.com/films'),
  ajax('https://ghibliapi.herokuapp.com/films'),
  ajax('https://ghibliapi.herokuapp.com/films'),
  ajax('https://ghibliapi.herokuapp.com/films'),
  ajax('https://ghibliapi.herokuapp.com/films'),
  ajax('https://stackblitz.com'),
  ajax('https://ghibliapi.herokuapp.com/films'),
];

let requests$ = merge(...requestsArray,2);

requests$
  .pipe(
    scan(
      (prev, curr) => prev + loadingBox.clientWidth / requestsArray.length,
      0
    )
  )
  .subscribe({
    next: (val) => {
      loadingBar.style.width = val.toString() + 'px';
      console.log(val);
    },
    error: (err) => console.log(err),
  });
