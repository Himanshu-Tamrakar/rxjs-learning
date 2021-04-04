import {Observable} from 'rxjs';

/**
 * Creation: success, error and on complete callback
 */
let stream$ = Observable.create((observer) => {
    observer.next(1)
});

stream$.subscribe((data) => {
    console.log('Data', data);
})

let stream1$ = Observable.create((observer) => {
    observer.error('Observable fails');
})

let subscription = stream1$.subscribe(
    (data) => console.log(data),
    (error) => console.log(error)
)

subscription.unsubscribe();

/**
 * End: Creation: success, error and on complete callback
 */
