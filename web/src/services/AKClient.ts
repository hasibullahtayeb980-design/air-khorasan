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

export enum TicketStatus {
  Booked,
  Changed,
  Cancelled,
}

export interface Ticket {
  id: number;
  ticketNumber: number;
  customerId: number;
  customerFullName: string;
  customerAvatarImageUrl: string;
  airline: string;
  fromCity: string;
  toCity: string;
  departureDate: string;
  returnDate: string;
  price: number;
  status: TicketStatus;
  createdAt: string;
}

export enum TicketChangeType {
    Extension,
    DateChange
}

export interface TicketChange {
  id: number;
  ticketId: number;
  customerId: number;
  customerFullName: string;
  customerAvatarImageUrl: string;
  changeType: TicketChangeType;
  oldDate: string;
  newDate: string;
  fee: number;
  createdAt: string;
}

export interface TicketCancelled {
  id: number;
  ticketId: number;
  customerId: number;
  customerFullName: string;
  customerAvatarImageUrl: string;
  cancellationDate: string;
  refundAmount: number;
  penalty: number;
}

export class AKClient {
  fetchCustomers = async (page?: number | null): Promise<PaginatedResponse<Customer> | null> => {
    const endpoint = `customers`;
    const response = await this.fetchPaginated<Customer>(endpoint, page);

    return response;
  };

  fetchTickets = async (page?: number | null): Promise<PaginatedResponse<Ticket> | null> => {
    const endpoint = `tickets`;
    const response = await this.fetchPaginated<Ticket>(endpoint, page);

    return response;
  };

  fetchTicketsChanged = async (page?: number | null): Promise<PaginatedResponse<TicketChange> | null> => {
    const endpoint = `tickets?status=${TicketStatus.Changed}`;
    const response = await this.fetchPaginated<TicketChange>(endpoint, page);

    return response;
  };

  fetchTicketsCancelled = async (page?: number | null): Promise<PaginatedResponse<TicketCancelled> | null> => {
    const endpoint = `tickets?status=${TicketStatus.Cancelled}`;
    const response = await this.fetchPaginated<TicketCancelled>(endpoint, page);

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