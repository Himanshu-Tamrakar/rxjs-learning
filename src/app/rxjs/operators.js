import {zip, from, of, range, combineLatest, interval, concat, merge, timer} from 'rxjs';

import {filter, tap, map, take, max, reduce, buffer} from 'rxjs/operators'


function operator() {
    console.log('d');
}

function ofOperatorExample() {
    const L = 20;
    const publisher$ = of(...Array.from({length: L}, (v, i) => i));
    const subs1 = publisher$.subscribe(
        (data) => console.log(data),
        error => console.log(error),
        () => console.log('completed')
    );
    console.log('%c (of) is syncrhonous by nature', 'color: green');
    subs1.unsubscribe();
}

function tapOperatorExample() {
    const L = 5;
    const publisher$ = of(...Array.from({length: L}, (v, i) => i)).pipe(
        tap(value => {
            console.log('%c emit every value', 'color: indianred');
        })
    )

    publisher$.subscribe(
        data => data
    )

}

function filterOperatorExample() {
    const L = 20;
    const publisher$ = of(...Array.from({length: L}, (v, i) => i)).pipe(
        tap(value => {
            console.log('%c emit every value', 'color: indianred');
        }),
        filter(v => v % 2 == 0)
    )

    publisher$.subscribe(
        data => console.log('I have got: ', data)
    )
}

function rangeExample() {
    const publisher$ = range(1, 100);

    publisher$.subscribe(
        data => console.log(data)
    )
}

function fromExample() {
    // const publisher$ = from([1, 2, 3, 4, 5]);

    // publisher$.subscribe(
    //     data => console.log(data)
    // )

    const publisher$ = from(
        new Promise((resolve, reject) => {
            setTimeout(() => resolve('Hey THere'), 2000);
            // setTimeout(() => reject('Hey THere'), 2000);
        })
    )

    publisher$.subscribe(
        data => console.log(data),
        error => console.error(error)
    )
}

function toExample() {
    const promise = of(1, 2, 3).toPromise(); //Emit only last vlue
    promise
        .then(data => console.log(data))
        .catch(error => console.error(error))
}



// Combination Operators
function combineLatestExample() {
    let source1 = interval(100).pipe(
        map(val => "source1 " + val),
        take(5)
    );

    let source2 = interval(50).pipe(
        map(val => "source2 " + val),
        take(2)
    );

    let stream$ = combineLatest(
        source1,
        source2
    );

    stream$.subscribe(data => console.log(data));
}


function concatExample() {
    let source1 = interval(100).pipe(
        map(val => "source1 " + val),
        take(5)
    );

    let source2 = interval(50).pipe(
        map(val => "source2 " + val),
        take(2)
    );

    let stream$ = concat(
        source1,
        source2
    );

    stream$.subscribe(data => console.log(data));
}

function mergeExample() {
    let source1 = interval(100).pipe(
        map(val => "source1 " + val),
        take(5)
    );

    let source2 = interval(50).pipe(
        map(val => "source2 " + val),
        take(5)
    );

    let stream$ = merge(
        source1,
        source2
    );

    stream$.subscribe(data => console.log(data));
}

function zipExample() {
    const stream1$ = zip(
        Promise.resolve(1),
        of(1, 2, 3),
        of(6, 8)
    )

    stream1$.subscribe(
        data => console.log('stream1', data)
    )

    const stream2$ = zip(
        of(11, 22, 33, 44),
        of(1, 2, 3),
        of(6, 8)
    )

    stream2$.subscribe(
        data => console.log('stream2', data)
    )

}


// MATHEMATICAL OPERATORS
function maxExaample() {
    // of(1, 2, 3, -6, 33, 11, 24).pipe(
    //     max()
    // ).subscribe(
    //     data => console.log(data)
    // )


    function comparer(x, y) {
        if (x.age > y.age) {
            return 1;
        } else if (x.age < y.age) {
            return -1;
        } else return 0;
    }

    let stream$ = of(
        {name: 'chris', age: 37},
        {name: 'chross', age: 32})
        .pipe(
            max(comparer)
        );

    stream$.subscribe(
        data => console.log(data)
    )
}


function reduceExample() {
    of(1, 2, 3, 4, 5).pipe(
        reduce((acc, val) => acc + val)
    ).subscribe(
        data => console.log(data)
    )
}

function avarageExample() {
    range(1, 10).pipe(
        map(x => {return {sum: x, counter: 1}}),
        reduce((acc, curr) => {
            return [acc[0] + curr.sum, acc[1] + curr.counter]
        }, [0, 0]),
        map(x => x[0] / x[1])
    ).subscribe(
        data => console.log(data)
    )
}


// Grouping

function bufferExample() {
    const breakObs$ = timer(1000);

    const publisher$ = interval(200).pipe(
        buffer(breakObs$)
    )

    publisher$.subscribe(
        data => console.log(data)
    )
}

// buffer with debounce for auto complete
// bufferTime for capturing things untill time


function timerExample() {
    timer(2000, 1000).pipe(
        take(5)
    ).subscribe(
        data => console.log(data)
    )
}

export function run() {
    // operator();
    // ofOperatorExample(); // synchronous in nature
    // tapOperatorExample() // debugging purpose
    // filterOperatorExample() // filtered emits

    // rangeExample();
    // fromExample();
    // toExample();
    // combineLatestExample();
    // concatExample();
    // mergeExample();
    // zipExample();
    // maxExaample()
    // reduceExample()
    // avarageExample()
    // bufferExample();
    timerExample();
}