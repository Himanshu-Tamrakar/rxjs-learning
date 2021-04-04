import { ConnectableObservable } from 'rxjs';
import { of, interval } from 'rxjs';
import { publish, refCount, take } from 'rxjs/operators';

export function hotColdObservable() {
  /** COLD OBSERVABLE: END*/
  // const stream$ = of(1, 2, 3);

  // const subscriber1 = stream$.subscribe(
  //   (data) => console.log(data),
  //   (error) => console.log(error),
  //   () => console.log('completed')
  // );

  // const subscriber2 = stream$.subscribe(
  //   (data) => console.log(data),
  //   (error) => console.log(error),
  //   () => console.log('completed')
  // );

  /** COLD OBSERVABLE: END*/

  /** HOT OBSERVABLE: START*/
  // let liveStreaming$ = interval(1000).pipe(take(5));

  // const subs1 = liveStreaming$.subscribe(
  //   (data) => console.log('%c subscriber from first minute ', 'color: green'),
  //   (err) => console.log(err),
  //   () => console.log('completed')
  // );

  // setTimeout(() => {
  //   liveStreaming$.subscribe(
  //     (data) => console.log(`  subscriber after 2 minutes`),
  //     (error) => console.log('%c ', error, '{color: red'),
  //     () => console.log('completed')
  //   );
  // }, 2000);
  /** HOT OBSERVABLE: END*/

  /** ACTUAL HOT OBSERVABLE: START */

  // let publisher$ = interval(1000).pipe(
  //   take(5),
  //   publish()
  // ) as ConnectableObservable<number>;

  // publisher$.subscribe(
  //   (data) => console.log('subscriber from first minute', data),
  //   (err) => console.log(err),
  //   () => console.log('completed')
  // );

  // setTimeout(() => {
  //   publisher$.subscribe(
  //     (data) => console.log('subscriber from 2nd minute', data),
  //     (err) => console.log(err),
  //     () => console.log('completed')
  //   );
  // }, 3000);

  // publisher$.connect();

  /** ACTUAL HOT OBSERVABLE: END */

  /**
   * Warm Observables: START
   */

  const hotPublisher$ = interval(1000).pipe(
    take(4),
    publish()
  ) as ConnectableObservable<number>;

  setTimeout(() => {
    hotPublisher$.subscribe((data) =>
      console.log('hot obs, after 2 secs ', data)
    );
  }, 1100);

  hotPublisher$.connect();

  const warmPublisher$ = interval(1000).pipe(
    take(5),
    publish(),
    refCount()
  ) as ConnectableObservable<number>;

  setTimeout(() => {
    warmPublisher$.subscribe((data) =>
      console.log('%c warm obs, after 2 secs', 'color: green')
    );
  }, 2000);
  /**
   * Warm Observables: END
   */
}
