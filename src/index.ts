type WithPayloadFunction<T extends unknown> = (payload?: T) => void;

export class PubSub<PayloadType> {
    private subscribers: Set<WithPayloadFunction<PayloadType>> = new Set();

    subscribe(cb: WithPayloadFunction<PayloadType>) {
        this.subscribers.add(cb);
    }

    unsubscribe(cb: WithPayloadFunction<PayloadType>) {
        this.subscribers.delete(cb);
    }

    publish(payload?: PayloadType): void {
        this.subscribers.forEach(cb => (payload ? cb(payload) : cb()));
    }
}

export class EventSystem<PayloadType> {
    private listeners: Map<string, PubSub<PayloadType>> = new Map();

    register(topic: string, fn: WithPayloadFunction<PayloadType>) {
        if (!this.listeners.has(topic)) {
            this.listeners.set(topic, new PubSub<PayloadType>());
        }
        this.listeners.get(topic)?.subscribe(fn);
    }

    unregister(topic: string, fn: WithPayloadFunction<PayloadType>) {
        this.listeners.get(topic)?.unsubscribe(fn);
    }

    emit(topic: string, payload?: PayloadType): void {
        this.listeners.get(topic)?.publish(payload);
    }
}
