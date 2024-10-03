import type { RuntimeInteractResponse } from '@/runtime/runtime.interface';
import type { TraceDeclaration, TraceHandlerMeta, TraceOptions } from './trace.interface';

export class TraceService<T = unknown> {
  private readonly traces: TraceDeclaration<T, any>[] = [];

  public constructor(options: TraceOptions<T> = {}) {
    this.registerTraces(options.traces ?? []);
    this.registerCustomActionTrace(); // Register the custom action trace handler
  }

  public registerTrace(step: TraceDeclaration<T, any>): this {
    this.traces.push(step);
    return this;
  }

  public registerTraces(steps: TraceDeclaration<T, any>[]): this {
    steps.forEach((step) => this.registerTrace(step));
    return this;
  }

  public async processTrace(context: T, response: Pick<RuntimeInteractResponse, 'trace'>): Promise<T> {
    const meta: TraceHandlerMeta<T> = { context };

    for (const trace of response.trace) {
      const step = this.traces.find((step) => step.canHandle(trace));
      if (step) {
        meta.context = step.handle(meta, trace); // Make sure handle is synchronous
      }
    }
    return meta.context;
  }

  // Register the custom action trace handler
  private registerCustomActionTrace(): void {
    this.registerTrace({
      canHandle: (trace) => trace.type === 'custom', // Recognize custom action traces
      handle: (meta, trace) => {
        if (trace.payload.name === 'exploreTours') {
          console.log('Triggering custom action: exploreTours');
          // Add any other logic required to handle the custom action here
        }
        return meta.context; // Make sure the handle method returns context synchronously
      },
    });
  }
}
