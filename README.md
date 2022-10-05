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

ev.register('topic', Function);

ev.emit('topic', PayloadData);

ev.unregister('topic', Function);
```

### Example:

```ts
const ev = new EventSystem<string, any>(); // string payload, and any topic keys

const fn1 = a => console.log(a);
const fn2 = b => console.log(`data: ${b}`);
const fn3 = c => console.log(c.toUpperCase());

ev.register('topic 1', fn1);
ev.register('topic 2', fn2);
ev.register('topic 3', fn3);

ev.emit('topic 1', 'hello');
ev.emit('topic 1', 'hello');
ev.emit('topic 1', 'hello');
```

### Typescript example:

```ts
const ev = new EventSystem<
    string, // payload type
    {
        ['preAction'];
        ['showMessage'];
        ['postAction'];
    } // topics types
>();

function setup() {
    ev.register('preAction', console.log('starting...'));
    ev.register('showMessage', message => console.log(message)); // will show "hello there"
    ev.register('postAction', () => console.log('done'));
}

function main() {
    ev.emit('preAction');
    //
    // program functions...
    //
    ev.emit('showMessage', 'hello there');
    ev.emit('postAction');
}

setup();
main();
```

### Custom Class example:

```ts
type HooksPayload = string;

type Topics = {
    ['bootstrap'];
    ['onRequest'];
    ['onCleanup'];
};

class Hooks extends EventSystem<HooksPayload, Topics> {
    //... constructor, methods, properties
}

const hooks = new Hooks();

// EventSystem methods:
// hooks.register()
// hooks.emit()
```
