import {
  of,
  tap,
  connect,
  merge,
  map,
  filter,
  share,
  interval,
  take,
} from 'rxjs';

const source$ = of(1, 2, 3, 4, 5).pipe(
  tap({
    subscribe: () => console.log('subscription started'),
    next: (n) => console.log(`source emitted ${n}`),
  }),
  share()
);

source$
  .pipe(
    // Notice in here we're merging 3 subscriptions to `shared$`.
    connect((shared$) =>
      merge(
        shared$.pipe(map((n) => `all ${n}`)),
        shared$.pipe(
          filter((n) => n % 2 === 0),
          map((n) => `even ${n}`)
        ),
        shared$.pipe(
          filter((n) => n % 2 === 1),
          map((n) => `odd ${n}`)
        )
      )
    )
  )
  .subscribe(console.log);

// source$.pipe(map((n) => `all ${n}`)).subscribe(console.log);
// source$
//   .pipe(
//     filter((n) => n % 2 === 0),
//     map((n) => `even ${n}`)
//   )
//   .subscribe(console.log);
// source$
//   .pipe(
//     filter((n) => n % 2 === 1),
//     map((n) => `odd ${n}`)
//   )
//   .subscribe(console.log);

const source = interval(1000).pipe(
  tap((x) => console.log('Processing: ', x)),
  map((x) => x * x),
  take(6),
  share()
);

source.subscribe((x) => console.log('subscription 1: ', x));
source.subscribe((x) => console.log('subscription 2: ', x));
