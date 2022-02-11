class SchedulerClass {
    private static _lazy: SchedulerClass;

    static get instance() {
        if (!this._lazy) {
            this._lazy = new SchedulerClass();
        }

        return this._lazy;
    }

    scheduleTask<T extends () => void>(task: T, timeout: number) {
        requestIdleCallback(task, { timeout });
    }
}

export const Scheduler = SchedulerClass.instance;
