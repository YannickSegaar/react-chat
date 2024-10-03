import { createTraceComponent } from '../trace.component';
import type { Trace } from '../../runtime/runtime.interface';
import type { TraceHandlerMeta } from '../trace.interface';

// Define the Custom Action Trace Type
interface CustomActionTrace extends Trace.BaseTraceFrame {
  type: 'custom';
  payload: {
    name: string; // The action name, e.g., 'exploreTours'
  };
}

// Create the Custom Action Trace Component
export const CustomActionTraceComponent = createTraceComponent<CustomActionTrace>('custom');

// Registering the handler function
CustomActionTraceComponent<TraceHandlerMeta<unknown>>((context, trace) => {
  if (trace.payload.name === 'exploreTours') {
    console.log('Triggering custom action: exploreTours');
    // Here, you can add logic to interact with the Voiceflow system or perform any other actions
    // For example, calling an API or updating internal state
  }

  return context;
});
