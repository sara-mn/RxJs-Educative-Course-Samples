import { fromEvent, map, mergeMap, from, reduce } from 'rxjs';

let englishWordsTextBox = document.querySelector('#englishInput');
let pigLatin1 = document.getElementById('pigLatin1');
let pigLatin2 = document.getElementById('pigLatin2');

let englishWordsTextBox$ = fromEvent<any>(englishWordsTextBox, 'keyup');

englishWordsTextBox$
  .pipe(
    map((event) => event.target.value),
    map((words) => words.split(/\s+/)),
    map((wordArray: string[]) => wordArray.map((e) => pigLatinify(e)))
  )
  .subscribe((words) => (pigLatin1.innerText = words.join(' ')));

englishWordsTextBox$
  .pipe(
    map((event) => event.target.value),
    mergeMap((wordString) =>
      // Inner observable
      from(wordString.split(/\s+/)).pipe(
        map(pigLatinify),
        reduce((bigString, newWord) => bigString + ' ' + newWord, '')
      )
    )
  )
  .subscribe((translatedWords) => (pigLatin2.innerText = translatedWords));

function pigLatinify(word: string) {
  // Handle single-letter case and empty strings
  if (word.length < 2) {
    return word;
  }
  return word.slice(1) + '-' + word[0].toLowerCase() + 'ay';
}
