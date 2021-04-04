import {from} from 'rxjs';

let stream$ = from([1, 2, 3]);

let subscription = stream$.subscribe(
    (data) => console.log('observable', data)
);

setTimeout(() => subscription.unsubscribe(), 5000);


let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve([1, 2, 3]), 1000);
})

promise.then(data => console.log(' Promise: ', data));