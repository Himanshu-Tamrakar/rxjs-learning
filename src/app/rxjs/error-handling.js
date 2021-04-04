import {Subject} from 'rxjs';
import {BehaviorSubject} from 'rxjs';
import {ReplaySubject} from 'rxjs';
import {of, from, range, combineLatest, concat, merge, interval, timer} from 'rxjs';
import {retry, retryWhen, map, reduce, min, max, filter, take, buffer, debounceTime, bufferTime} from 'rxjs/operators';

function retryExample() {
    of(1, 2, 3).pipe(
        map(value => {
            if (value > 2) {throw 'error'}
            else return value;
        }),
        retry(3)
    ).subscribe(
        data => console.log(data),
        error => console.error(error)
    )
}

function retryWhenExample() {
    let values$ = of(1, 2, 3, 4).pipe(
        map(val => {
            if (val === 2) {
                throw 'err';
            } else return val;
        }),
        retryWhen(stream => {
            console.log(stream);
            return stream;
        })
    );

    values$.subscribe(
        data => console.log('Retry when - data', data),
        err => console.error('Retry when - Err', err)
    )
}

// SUBJECT

function subjectExample() {
    const source$ = interval(500).pipe(
        take(5)
    )

    const subject$ = new Subject();

    // source$.subscribe(data => subject$.next(data));
    source$.subscribe(subject$) // equivalant

    subject$.subscribe(
        data => console.log(data)
    )
    subject$.next(44);

}


function replaySubjectExample() {
    // new ReplaySubject([bufferSize], [windowSize], [scheduler])
    let replaySubject = new ReplaySubject(4);
    replaySubject.next(1);
    replaySubject.next(2);
    replaySubject.next(3);
    replaySubject.next(4);
    replaySubject.next(5);
    replaySubject.next(6);


    const subscriber = replaySubject.subscribe(
        data => console.log(data)
    )

}

// BehaviorSubject

function behaviourSubjectExample() {
    const behaviourSubject$ = new BehaviorSubject(44);

    behaviourSubject$.subscribe(
        data => console.log(data)
    )

    console.log('Last Value in Subject Behaviour: ', behaviourSubject$.getValue());

    behaviourSubject$.next(1);
    console.log('Last Value in Subject Behaviour: ', behaviourSubject$.getValue());

    behaviourSubject$.next(22);
    console.log('Last Value in Subject Behaviour: ', behaviourSubject$.getValue());

    behaviourSubject$.next(33);
    console.log('Last Value in Subject Behaviour: ', behaviourSubject$.getValue());

}


export function run() {
    // console.log('error handing run');
    // retryExample();
    // retryWhenExample();// CRASH

    // subjectExample();
    // replaySubjectExample()
    behaviourSubjectExample()
}