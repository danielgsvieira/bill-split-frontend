import { getAuthToken } from 'src/utils';
import { ApiError, ApiValidationError } from './errors';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type RequestConfig = Omit<RequestInit, 'method'> & {
  params?: Record<string, string>;
};

type MakeRequestConfig = RequestConfig & {
  method: HttpMethod;
  path: string;
};

class HttpClient {
  declare readonly __brand: symbol & { __brand: 'HttpClient' };

  constructor(
    private readonly baseUrl: string,
    private readonly defaultHeaders: Headers,
  ) {}

  private buildUrl(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${this.baseUrl}/${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    return url;
  }

  private buildHeaders(requestHeaders?: HeadersInit) {
    const headers = new Headers(this.defaultHeaders);
    new Headers(requestHeaders).forEach((value, key) => {
      headers.set(key, value);
    });

    const authToken = getAuthToken();
    if (authToken !== null) {
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    return headers;
  }

  public async makeRequest<T>(config: MakeRequestConfig): Promise<T> {
    const { params, path, ...requestConfig } = config;

    const url = this.buildUrl(path, params);
    const headers = this.buildHeaders(requestConfig.headers);

    const response = await fetch(url.toString(), {
      ...requestConfig,
      headers,
    });
    const responseData = await response.json();

    if (!response.ok) {
      const error =
        responseData.statusCode === 400 && responseData.validationErrors !== undefined
          ? ApiValidationError.fromErrorResponse(responseData)
          : ApiError.fromErrorResponse(responseData);
      throw error;
    }

    return responseData;
  }

  public get<T>(path: string, config?: RequestConfig) {
    return this.makeRequest<T>({ ...config, path, method: 'GET' });
  }

  public post<T>(path: string, data: unknown = null, config?: RequestConfig) {
    return this.makeRequest<T>({
      ...config,
      path,
      method: 'POST',
      body: data !== null ? JSON.stringify(data) : null,
    });
  }

  public put<T>(path: string, data: unknown = null, config?: RequestConfig) {
    return this.makeRequest<T>({
      ...config,
      path,
      method: 'PUT',
      body: data !== null ? JSON.stringify(data) : null,
    });
  }

  public patch<T>(path: string, data: unknown = null, config?: RequestConfig) {
    return this.makeRequest<T>({
      ...config,
      path,
      method: 'PATCH',
      body: data !== null ? JSON.stringify(data) : null,
    });
  }

  public delete<T>(path: string, config?: RequestConfig) {
    return this.makeRequest<T>({ ...config, path, method: 'DELETE' });
  }
}

const httpClient = new HttpClient(
  process.env.API_BASE_URL ?? window.location.origin,
  new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }),
);

export { httpClient, HttpClient };
export type { HttpMethod, RequestConfig };
