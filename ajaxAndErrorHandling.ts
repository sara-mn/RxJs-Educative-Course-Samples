import { fromEvent, throwError } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap, tap } from 'rxjs/operators';

let ajaxRequestBtn = document.querySelector('#ajax-button');

let ajaxRequest$ = fromEvent(ajaxRequestBtn, 'click');

ajaxRequest$.pipe(mergeMap(() => ajax('https://stackblitz.com/'))).subscribe({
  next: (result) => console.log(result),
  error: (err) => alert(err.message),
});

// throwError(() => new Error('Augh!'))
// .subscribe({
//   next: () => console.log('This will never be called'),
//   error: err => console.error('This is immediately called', err)
// });

// ajaxRequest$.subscribe(() =>
//   ajax(
//     'https://...'
//     )
//   .subscribe({
//     next: (result) => console.log(result),
//     error: (err) => alert(err.message),
//   })
// );
