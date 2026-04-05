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

interface Dashboard {
  newCustomers: {
    monthYear: string,
    newCustomers: number,
  }[];
  latestTicketChanges: TicketChange[];
  latestTicketCancellations: TicketCancelled[];
  totalCustomers: number;
  changeInPercentage: number;
  totalTickets: number;
  totalTicketChanges: number;
  totalTicketCancellations: number;
}

interface DashboardResponse {
  new_customers: {
    month_year: string;
    new_customers: number;
  }[];
  latest_ticket_changes: TicketChange[],
  latest_ticket_cancellations: TicketCancelled[],
  total_customers: number,
  change_in_percentage: number,
  total_tickets: number,
  total_ticket_changes: number,
  total_ticket_cancellations: number,
}

export class AKClient {
  fetchDashboard = async (): Promise<Dashboard> => {
    const endpoint = `dashboard`;
    const response = await this.get<DashboardResponse>(endpoint);

    return this.processDashboardResponse(response);
  };

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

  private processDashboardResponse = (response: DashboardResponse): Dashboard => ({
    newCustomers: response.new_customers.map((item: any) => ({
        monthYear: `${item.month_year}-01T00:00:00`,
        newCustomers: item.new_customers,
    })),
    latestTicketChanges: response.latest_ticket_changes,
    latestTicketCancellations: response.latest_ticket_cancellations,
    totalCustomers: response.total_customers,
    changeInPercentage: response.change_in_percentage,
    totalTickets: response.total_tickets,
    totalTicketChanges: response.total_ticket_changes,
    totalTicketCancellations: response.total_ticket_cancellations,
  });

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

  private get = async<Type> (endpoint: string): Promise<Type> => {
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