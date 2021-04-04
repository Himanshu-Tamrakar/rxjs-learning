import {Observable} from "rxjs";

class Producer {
    i;
    constructor () {
        this.i = 1;
    }

    nextValue() {
        return this.i++;
    }
}


let stream$ = Observable.create((observer) => {
    const prod = new Producer();

    observer.next(prod.nextValue());
    observer.next(prod.nextValue());
    observer.next(prod.nextValue());


    setTimeout(() => observer.next(prod.nextValue()), 5000);

})

let subscription = stream$.subscribe(
    (data) => console.log(data)
);


setTimeout(() => subscription.unsubscribe(), 3000);