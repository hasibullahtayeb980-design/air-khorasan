import { RequestError } from "@/types/errors";

const AK_API_URL = "https://localhost:8000/api";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export interface PaginatedResponse<Type> {
  items: Type[];
  page: number;
  pages: number;
  total: number;
}

export interface Customer {
  id: number;
  fullName: string;
  avatarImageUrl: string;
  phone: string;
  email: string;
  passportNumber: number;
  tazkiraNumber: number;
  createdAt: string;
}

export class AKClient {
  fetchCustomers = async (page?: number | null): Promise<PaginatedResponse<Customer> | null> => {
    const endpoint = `customers`;
    const response = await this.fetchPaginated<Customer>(endpoint, page);

    if (response === null) {
      return null;
    }

    return response;
  };

  private fetchPaginated = async<Type>(
    endpoint: string,
    page?: number | null
  ): Promise<PaginatedResponse<Type>> => {
    let paginatedEndpoint = endpoint;
    const separator = endpoint.includes("?") ? "&" : "?";

    if (page) {
      paginatedEndpoint = `${endpoint}${separator}page=${page}`;
    }

    return this.get(paginatedEndpoint);
  };

  private get = async (endpoint: string): Promise<any> => {
    return this.request(endpoint, HttpMethod.GET);
  };

  private request = async (
    endpoint: string,
    method: HttpMethod,
    body?: any
  ): Promise<any> => {
    let headers = this.getHeaders();
    const jsonResponse: boolean =
      method === HttpMethod.GET || method === HttpMethod.POST;

    if (jsonResponse) {
      headers = {
        ...headers,
        Accept: "application/json",
      };
    }

    if (body) {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }

    const response: Response = await fetch(`${AK_API_URL}/${endpoint}`, {
      headers,
      method,
      body: body && JSON.stringify(body),
    });

    if (!response.ok) {
      throw new RequestError(
        `Error with the following request: ${endpoint}`,
        response.status,
        response.statusText
      );
    }

    return jsonResponse ? response.json() : response;
  };

  // No need for headers atm.
  // TODO: Update whenever auth is requried.
  private getHeaders = () => {
    let headers = {};
    return headers;
  };
}