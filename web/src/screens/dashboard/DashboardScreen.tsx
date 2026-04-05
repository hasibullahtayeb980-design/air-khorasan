import { useQuery } from "@tanstack/react-query";
import { DashboardView } from "./DashboardView";
import { LoadingView } from "../LoadingView";

export const fetchDashboard = async () => {
    const response = await fetch("https://127.0.0.1:8000/api/dashboard");

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    const data = await response.json();

    return {
        newCustomers: data.new_customers.map((item: any) => ({
            monthYear: `${item.month_year}-01T00:00:00`,
            newCustomers: item.new_customers,
        })),
        latestTicketChanges: data.latest_ticket_changes,
        latestTicketCancellations: data.latest_ticket_cancellations,
        totalCustomers: data.total_customers,
        changeInPercentage: data.change_in_percentage,
        totalTickets: data.total_tickets,
        totalTicketChanges: data.total_ticket_changes,
        totalTicketCancellations: data.total_ticket_cancellations,
    };
};

export const DashboardScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['DASHBOARD'],
        queryFn: fetchDashboard,
    });

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading dashboard data: {(error as Error).message}</div>;
    }

    return (
        <DashboardView
            newCustomers={data?.newCustomers}
            latestTicketChanges={data?.latestTicketChanges}
            latestTicketCancellations={data?.latestTicketCancellations}
            totalCustomers={data?.totalCustomers}
            changeInPercentage={data?.changeInPercentage}
        />
    );
};