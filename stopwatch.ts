import { interval, fromEvent, Observable, range } from 'rxjs';
import { map, takeUntil, count, mergeMap } from 'rxjs/operators';

// Elements
let startButton = document.querySelector('#start-button');
let stopButton = document.querySelector('#stop-button');
let lapButton = document.querySelector('#lap-button');

let stopwatchResults = document.querySelector<HTMLElement>('.stopwatch-output');
let range1Results = document.querySelector<HTMLElement>('.range1-output');

let text1 = document.querySelector<HTMLElement>('.startcounter');
let text2 = document.querySelector<HTMLElement>('.stopcounter');
let tenthSecondsSubscription;

// Observables
let tenthSecond$ = interval(100);

let tenthSecond3$ = new Observable((observer) => {
  let counter = 0;
  observer.next(counter);
  let interv = setInterval(() => {
    counter++;
    observer.next(counter);
  }, 100);
  return function unsubscribe() {
    clearInterval(interv);
  };
});

let startClick$ = fromEvent<any>(startButton, 'click');
let stopClick$ = fromEvent(stopButton, 'click');
let lapClick$ = fromEvent(lapButton, 'click');

let startClick1$ = new Observable((observer) => {
  let emitClickEvent = (event) => observer.next(event);
  document.addEventListener('click', emitClickEvent);
  return () => document.removeEventListener('click', emitClickEvent);
});

const numbers$ = range(1, 7);
let isLap = false;
//subscribe function
// numbers$
//   .pipe(count((i) => i % 2 === 1))
//   .subscribe((num) => (range1Results.innerText = num.toString()));

startClick$.subscribe(() => {
  tenthSecond$
    .pipe(
      map((item: number) => item / 10),
      takeUntil(stopClick$)
    )
    .subscribe((num) => {
      if (!isLap) {
        stopwatchResults.innerText = num + 's';
      }
    });

  //numbers$.subscribe((num) => console.log(num % 2));
});

startClick$
  .pipe(
    mergeMap(() =>
      interval(100).pipe(
        map((item: number) => item / 10),
        takeUntil(stopClick$)
      )
    )
  )
  .subscribe((num) => {
    //console.log(num + 's');
    // if(!isLap){
    //   stopwatchResults.innerText = num + 's'
    // }
  });

lapClick$.subscribe(() => {
  isLap = !isLap;
});
// stopClick$.subscribe(() => {
//   startClickSubscription.unsubscribe(); // start click not work more than one
//   tenthSecondsSubscription.unsubscribe(); // dont stop all tenthClick events
//   console.log('tenthSecond unsubscribed');
// });

startClick$.subscribe((e) => {
  //console.log('increase count start click');
  let num = parseInt(text1.innerHTML) + 1;
  let strVar = num.toString();
  text1.innerHTML = strVar;
});

stopClick$.subscribe((e) => {
  //console.log('increase count stop click');
  let num = parseInt(text2.innerHTML) + 1;
  let strVar = num.toString();
  text2.innerHTML = strVar;
});
