# 0.2.0

improve typescript topic types/keys

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

# 0.1.0

First release 🎈 (alpha version)
