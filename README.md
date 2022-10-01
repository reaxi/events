### @reaxi/events

-   events (system)

observer pattern implementation : PubSub and Topic Based alternative

## - Pub (Publisher) & Sub (Subscriber)

```ts
import { PubSub } from '@reaxi/events';

const s = new PubSub();

s.subscribe(Function);

s.publish(payload);

s.unsubscribe(Function);

//example:

const myFn = (a: string) => console.log(a);

s.subscribe(myFn);

s.publish('Hello There');
```

## - Topic Based (EventSystem)

```ts
import { EventSystem } from '@reaxi/events';

const ev = new EventSystem();

ev.register('topic', fn);

ev.emit('topic', payload);

// example:

const ev = new EventSystem();

const fn1 = a => a;
const fn2 = b => `${b} b`;
const fn3 = c => c;

ev.register('topic 1', fn1);
ev.register('topic 2', fn2);
ev.register('topic 3', fn3);

ev.emit('topic 1', 'hello');

// another example:

const ev = new EventSystem();

function setup() {
    ev.register('preAction', console.log('starting...'));
    ev.register('postAction', () => console.log('done'));
}

function main() {
    ev.emit('preAction');
    //
    // program functions...
    //
    ev.emit('postAction');
}

setup();
main();
```
