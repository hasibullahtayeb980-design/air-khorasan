import { LoadingView } from "@/screens/LoadingView";
import { TicketStatus, TicketsView } from "../TicketsView";
import { TicketsCancelledView } from "./TicketsCancelledView";
import { useQuery } from "@tanstack/react-query";

export const fetchTicketsCancelled = async () => {
    const response = await fetch("https://127.0.0.1:8000/api/tickets?status=2");

    if (!response.ok) {
        throw new Error("Failed to fetch tickets cancelled data");
    }

    const data = await response.json();
    return data;
};

export const TicketsCancelledScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['TICKETS_CANCELLED'],
        queryFn: fetchTicketsCancelled,
    });

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading customers data: {(error as Error).message}</div>;
    }
    return (
        <TicketsCancelledView
            ticketsCancelled={data?.items || []}
            totalTicketsCancelled={data?.total || 0}
            page={data?.page || 1}
            totalPages={data?.pages || 1}
        />
    );
}