import { LEDSP_API_ENDPOINT, LEDSP_API_BASEPATH } from "./env";
import LedspEnvironment from "./ledsp-environment.type";

export default class HttpClient {
  public static async request(
    environment: LedspEnvironment,
    method: "GET" | "POST" | "DELETE",
    endpoint: string,
    body?: object,
    customConfig?: RequestInit
  ) {
    return fetch(
      LEDSP_API_ENDPOINT[environment].concat(
        "/",
        LEDSP_API_BASEPATH,
        "/",
        endpoint
      ),
      {
        method,
        ...customConfig,
        headers: {
          ...customConfig?.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
      }
    ).then(async (response) => {
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

  public static async get(
    environment: LedspEnvironment,
    endpoint: string,
    config: RequestInit = {}
  ) {
    return await this.request(environment, "GET", endpoint, undefined, config);
  }

  public static async post(
    environment: LedspEnvironment,
    endpoint: string,
    body: object,
    config: RequestInit = {}
  ) {
    return await this.request(environment, "POST", endpoint, body, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    });
  }

  public static async delete(
    environment: LedspEnvironment,
    endpoint: string,
    body: object = {},
    config: RequestInit = {}
  ) {
    return await this.request(environment, "DELETE", endpoint, body, {
      ...config,
      headers: {
        ...config?.headers,
        "Content-Type": "application/json",
      },
    });
  }
}
