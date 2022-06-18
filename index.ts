import './style.css';
import './dragDrop.ts';
import './stopwatch.ts';
import './pigLatinTranslator.ts';

import { interval, of, merge } from 'rxjs';
import { map, take, filter, delay } from 'rxjs/operators';

// of('World')
//   .pipe(map((name) => `Hello, ${name}!`))
//   .subscribe(console.log);

const answers = of(1, 2, 3, 4, 5, 6).pipe(
  filter((x) => x > 3), //filtering corect answers
  take(3) // taking the first 3 correct answers
);
//logging the first 3 correct answers
answers.subscribe((x) => console.log(x));

let oneSecond$ = of('one').pipe(delay(1000));
let twoSecond$ = of('two').pipe(delay(2000));
let threeSecond$ = of('three').pipe(delay(3000));
let fourSecond$ = of('four').pipe(delay(4000));

merge(oneSecond$, twoSecond$, threeSecond$, fourSecond$).subscribe(console.log);

interval(1000)
  .pipe(
    take(5),
    map((val) => val * 5),
    delay(500)
  )
  .subscribe(console.log);
