import { useQuery } from "@tanstack/react-query";
import { LoadingView } from "../../LoadingView";
import { TicketStatus, TicketsView } from "../TicketsView";
import { TicketsChangedView } from "./TicketsChangedView";

export const fetchTicketsChanged = async () => {
    const response = await fetch("https://127.0.0.1:8000/api/tickets?status=1");

    if (!response.ok) {
        throw new Error("Failed to fetch tickets changed data");
    }

    const data = await response.json();
    return data;
};

export const TicketsChangedScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['TICKETS_CHANGED'],
        queryFn: fetchTicketsChanged,
    });

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading customers data: {(error as Error).message}</div>;
    }

    return (
        <TicketsChangedView
            ticketsChanged={data?.items || []}
            totalTicketsChanged={data?.total || 0}
            page={data?.page || 1}
            totalPages={data?.pages || 1}
        />
    );
}