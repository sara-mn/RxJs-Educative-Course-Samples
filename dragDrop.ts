import { fromEvent} from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

let draggable = <HTMLElement>document.querySelector('#draggable');
let dropable = <HTMLElement>document.querySelector('#dropable');

const draggable_first_pos_x = draggable.offsetLeft;
const draggable_first_pos_y = draggable.offsetTop;
const dropable_x = dropable.offsetLeft;
const dropable_y = dropable.offsetTop;

let mouseDown$ = fromEvent<MouseEvent>(draggable, 'mousedown');
let mouseMove$ = fromEvent<MouseEvent>(document, 'mousemove');
let mouseUp$ = fromEvent<MouseEvent>(document, 'mouseup');
let mouseUp_box$ = fromEvent<MouseEvent>(dropable, 'mouseup');

// mouseDown$.subscribe(() => {
//   mouseMove$
//     .pipe(
//       map((event) => {
//         event.preventDefault();
//         return {
//           x: event.clientX,
//           y: event.clientY,
//         };
//       }),
//       takeUntil(mouseUp_box$)
//     )
//     .subscribe((pos) => {
//       draggable.style.left = pos.x + 'px';
//       draggable.style.top = pos.y + 'px';
//       console.log(pos);
//     });
// });

mouseDown$.subscribe(() => {
  mouseMove$
    .pipe(
      map((event) => {
        event.preventDefault();
        return {
          x: event.clientX,
          y: event.clientY,
        };
      }),
      takeUntil(mouseUp$)
    )
    .subscribe((pos) => {
      draggable.style.left = pos.x + 'px';
      draggable.style.top = pos.y + 'px';
    });
});

mouseUp$.subscribe(() => {
  const draggable_x = draggable.offsetLeft;
  const draggable_y = draggable.offsetTop;

  if (
    !inRange(draggable_x, dropable_x, dropable_x + dropable.clientWidth) ||
    !inRange(draggable_y, dropable_y, dropable_y + dropable.clientHeight)
  ) {
    draggable.style.left = draggable_first_pos_x + 'px';
    draggable.style.top = draggable_first_pos_y + 'px';
  }
});

function inRange(x, min, max) {
  console.log(min);
  console.log(x);
  console.log(max);
  console.log(x >= min && x <= max);

  return x >= min && x <= max;
}

