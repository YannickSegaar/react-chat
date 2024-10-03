import type { BaseModels } from '@voiceflow/base-types';
import createHTTPError from 'http-errors';

import type {
  RuntimeFeedbackRequest,
  RuntimeHttpRequest,
  RuntimeInteractRequest,
  RuntimeInteractResponse,
  RuntimeOptions,
} from './runtime.interface';

export abstract class RuntimeService {
  private readonly fetch: typeof globalThis.fetch;

  public constructor(private readonly options: RuntimeOptions) {
    this.fetch = options.fetchPonyfill ?? globalThis.fetch?.bind(globalThis);
    if (!this.fetch) {
      throw new TypeError('fetch implementation was not provided and a global fetch was not available');
    }
  }

  public abstract getPublishing<T extends Record<string, unknown>>(request: { versionID?: string }): Promise<T>;

  public abstract createTranscript(
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
  ): Promise<BaseModels.Transcript.Model>;

  public abstract feedback(request: RuntimeFeedbackRequest): Promise<void>;

  /**
   * Sends a request to trigger an interaction in the Voiceflow runtime
   * @param request - The runtime interaction request
   */
  public async interact(
    request: RuntimeInteractRequest
  ): Promise<Partial<RuntimeInteractResponse> & Pick<RuntimeInteractResponse, 'trace'>> {
    return this.send(`state/user/${encodeURIComponent(request.sessionID)}/interact`, {
      method: 'POST',
      body: { action: request.action, config: request.config },
      headers: {
        ...(this.options.verify && 'authorization' in this.options.verify ? { authorization: this.options.verify.authorization } : {}),
        sessionID: request.sessionID,
        ...(request.versionID ? { versionID: request.versionID } : {}),
      },
      params: new URLSearchParams({ verbose: 'true' }),
    });
  }

  /**
   * Sends a custom action trace to the Voiceflow runtime
   * @param sessionID - The unique session ID for the user
   * @param actionName - The custom action name to trigger
   */
  public async sendCustomAction(sessionID: string, actionName: string): Promise<void> {
    const requestPayload = {
      type: 'custom',
      payload: {
        name: actionName,
      },
    };

    await this.interact({
      sessionID,
      action: requestPayload,
    });
  }

  protected async send<T>(path: string, args: RuntimeHttpRequest = {}): Promise<T> {
    const url = new URL(path, this.options.url);
    if (args.params) url.search = args.params.toString();

    const result = await this.fetch(url, {
      method: args.method ?? 'GET',
      body: args.body ? JSON.stringify(args.body) : undefined,
      headers: {
        'content-type': 'application/json',
        ...(args.headers ?? {}),
      },
    });

    const json = (await result.json().catch(() => null)) as any;
    if (!result.ok) {
      throw createHTTPError(result.status, result.statusText, json);
    }

    return json;
  }
}
