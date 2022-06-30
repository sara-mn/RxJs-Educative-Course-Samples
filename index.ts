import './style.css';
import './dragDrop.ts';
import './stopwatch.ts';
import './pigLatinTranslator.ts';
import './ajaxAndErrorHandling.ts';
import './progressBar.ts';
//import './multicast.ts';

import { interval, of, merge, from, fromEvent } from 'rxjs';
import {
  map,
  take,
  filter,
  delay,
  tap,
  mergeMap,
  reduce,
} from 'rxjs/operators';

// of('World')
//   .pipe(map((name) => `Hello, ${name}!`))
//   .subscribe(console.log);

const answers = of(1, 2, 3, 4, 5, 6).pipe(
  filter((x) => x > 3), //filtering corect answers
  take(3) // taking the first 3 correct answers
);
//logging the first 3 correct answers
//answers.subscribe((x) => console.log(x));

let oneSecond$ = of('one').pipe(delay(1000));
let twoSecond$ = of('two').pipe(delay(2000));
let threeSecond$ = of('three').pipe(delay(3000));
let fourSecond$ = of('four').pipe(delay(4000));

//merge(oneSecond$, twoSecond$, threeSecond$, fourSecond$).subscribe(console.log);

interval(1000)
  .pipe(
    take(5),
    map((val) => val * 5),
    delay(500)
  )
  .subscribe(console.log);

let usStates = [
  'alabama',
  'alaska',
  'arizona',
  'arkansas',
  'california',
  'colorado',
  'connecticut',
  'delaware',
  'florida',
  'georgia',
  'hawaii',
  'idaho',
  'illinois',
  'indiana',
  'iowa',
  'kansas',
  'kentucky',
  'louisiana',
  'maine',
  'maryland',
  'massachusetts',
  'michigan',
  'minnesota',
  'mississippi',
  'missouri',
  'montana',
  'nebraska',
  'nevada',
  'new hampshire',
  'new jersey',
  'new mexico',
  'new york',
  'north carolina',
  'north dakota',
  'ohio',
  'oklahoma',
  'oregon',
  'pennsylvania',
  'rhode island',
  'south carolina',
  'south dakota',
  'tennessee',
  'texas',
  'utah',
  'vermont',
  'virginia',
  'washington',
  'west virginia',
  'wisconsin',
  'wyoming',
];
let typeaheadTextBox = document.querySelector('#typeaheadTextBox');
let typeaheadContainer = document.getElementById('typeahead-container');

let typeaheadTextBox$ = fromEvent<any>(typeaheadTextBox, 'keyup');

typeaheadTextBox$
  .pipe(
    map((e): string => e.target.value.toLowerCase()),
    tap(() => (typeaheadContainer.innerText = '')),
    filter((val) => val.length > 2),
    mergeMap((val) =>
      from(usStates).pipe(
        filter((state: string) => state.includes(val)),
        map((state: string) => state.split(val).join('<b>' + val + '</b>')),
        reduce((prev: any, state) => prev.concat(state), [])
      )
    )
  )
  .subscribe(
    (stateList: string[]) =>
      (typeaheadContainer.innerHTML += '<br>' + stateList.join('<br>'))
  );
