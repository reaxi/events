import { EventSystem, PubSub } from '../src/index';

describe('Events: PubSub - Observer Pattern', () => {
    test('should subscribe and publish', () => {
        const sub = new PubSub<string>();

        const fn1 = jest.fn(a => a);
        const fn2 = jest.fn(b => `${b} b`);
        const fn3 = jest.fn(c => c);

        sub.subscribe(fn1);
        sub.subscribe(fn2);
        sub.subscribe(fn3);
        sub.unsubscribe(fn3);

        sub.publish('arg');

        expect(fn1).toBeCalledWith('arg');
        expect(fn2).toBeCalledWith('arg');
        expect(fn2).toReturnWith('arg b');
        expect(fn3).not.toBeCalled();
    });
});

describe('Events: Topic Based System', () => {
    test('should do an topic based event system', () => {
        const ev = new EventSystem<string>();

        const fn1 = jest.fn(a => a);
        const fn2 = jest.fn(b => `${b} b`);
        const fn3 = jest.fn(c => c);

        ev.register('topic 1', fn1);
        ev.register('topic 2', fn2);
        ev.register('topic 3', fn3);

        ev.emit('topic 1', 'hello');

        expect(fn1).toBeCalledWith('hello');
        expect(fn1).toBeCalledTimes(1);
        expect(fn2).not.toBeCalled();
        expect(fn3).not.toBeCalled();

        ev.emit('topic 2', 'hello');

        expect(fn1).toBeCalledTimes(1);
        expect(fn1).toBeCalledTimes(1);
        expect(fn3).not.toBeCalled();

        ev.emit('topic 3', 'hello');
    });
});
