import { Component, OnInit } from '@angular/core';
import { fromEvent, interval, of } from 'rxjs';
import {
  concatMap,
  delay,
  mapTo,
  mergeMap,
  switchMap,
  map,
  exhaustMap,
} from 'rxjs/operators';
import { AccountService } from '../../vouchers/account.service';
import { VouchersService } from '../../vouchers/voucher.service';

@Component({
  selector: 'app-transformation',
  templateUrl: './transformation.component.html',
  styleUrls: ['./transformation.component.scss'],
})
export class TransformationComponent implements OnInit {
  constructor(private vs: VouchersService, private as: AccountService) {}

  ngOnInit() {}

  // can be used like an "event handler"
  useMapTo() {
    const clicks = fromEvent(document, 'click');
    //deprecation
    clicks.pipe(mapTo('You clicked the button')).subscribe(console.log);
    //using map
    clicks.pipe(map(() => 'You clicked the button')).subscribe(console.log);
  }

  useSwitchMap() {
    fromEvent(document, 'click')
      .pipe(
        // restart counter on every click
        switchMap(() => interval(1000))
      )
      .subscribe(console.log);
  }

  useConcatMap() {
    const source = of('Hello', 'Goodbye', 'Nevermind');

    //can also be used with promises
    const examplePromise = (val: string) =>
      new Promise((resolve) => resolve(`${val} World!`));

    //result of first param passed to second param selector function before being  returned
    const example = source.pipe(concatMap((val) => examplePromise(val)));

    //output: 'Result: 'Hello World', Result: 'Goodbye Goodbye', ....
    example.subscribe((val) => console.log('Result:', val));
  }

  //mergeMap is also know under its alias: flatMap
  useMergeMap() {
    // faking network request for save
    const saveLocation = (location: any) => {
      return of(location).pipe(delay(1500));
    };

    // click as stream
    const click$ = fromEvent(document, 'click');

    click$
      .pipe(
        mergeMap((e: Event) => {
          return saveLocation({
            x: (e as MouseEvent).clientX,
            y: (e as MouseEvent).clientY,
            timestamp: Date.now(),
          });
        })
      )
      .subscribe((r) => console.log('Saved!', r));
  }

  useExhaustMap() {
    // fromEvent(this.saveButton.nativeElement, 'click')
    // .pipe(
    //     exhaustMap(() => this.saveCourse(this.form.value))
    // )
    // .subscribe();
  }
}
