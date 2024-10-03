import type { RuntimeFeedbackRequest, RuntimeInteractRequest, RuntimeInteractResponse } from './runtime.interface';
import { RuntimeService } from './runtime.service';

class ConcreteRuntimeService extends RuntimeService {
  public async getPublishing<T extends Record<string, unknown>>(request: { versionID?: string }): Promise<T> {
    // Provide a concrete implementation for getPublishing
    throw new Error('Method not implemented.');
  }

  public async createTranscript(
    sessionID: string,
    metadata: {
      os?: string;
      user?: {
        name?: string;
        image?: string;
      };
      device?: string;
      browser?: string;
    }
  ): Promise<any> {
    // Provide a concrete implementation for createTranscript
    throw new Error('Method not implemented.');
  }

  public async interact(
    request: RuntimeInteractRequest
  ): Promise<Partial<RuntimeInteractResponse> & Pick<RuntimeInteractResponse, 'trace'>> {
    // Use the already implemented interact method from RuntimeService
    return super.interact(request);
  }

  public async feedback(request: RuntimeFeedbackRequest): Promise<void> {
    // Provide a concrete implementation for feedback
    throw new Error('Method not implemented.');
  }
}

export default ConcreteRuntimeService;
