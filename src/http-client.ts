export default class HttpClient {
  constructor(private readonly endpoint: string) {}

  public async request(
    method: "GET" | "POST" | "DELETE",
    path: string,
    body?: object,
    customConfig?: RequestInit
  ) {
    // TODO improve path resolution
    return fetch(this.endpoint.concat("/", path), {
      method,
      ...customConfig,
      headers: {
        ...customConfig?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    }).then(async (response) => {
      if (response.status === 403)
        return Promise.reject(new Error(await response.text()));
      else if (response.status === 401) {
        window.location.assign(window.location.toString());
        return;
      } else if (response.ok) {
        const responseText = await response.text();

        try {
          const responseJson = JSON.parse(responseText);
          return responseJson;
        } catch (jsonParsingError) {
          return responseText;
        }
      } else return Promise.reject(new Error(await response.text()));
    });
  }

  public async get(path: string, config: RequestInit = {}) {
    return await this.request("GET", path, undefined, config);
  }

  public async post(path: string, body: object, config: RequestInit = {}) {
    return await this.request("POST", path, body, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    });
  }

  public async delete(
    path: string,
    body: object = {},
    config: RequestInit = {}
  ) {
    return await this.request("DELETE", path, body, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    });
  }
}
