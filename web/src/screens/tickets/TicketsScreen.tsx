import { useQuery } from "@tanstack/react-query";
import { TicketsView } from "./TicketsView";
import { LoadingView } from "../LoadingView";

export const fetchTickets = async () => {
    const response = await fetch("https://127.0.0.1:8000/api/tickets");

    if (!response.ok) {
        throw new Error("Failed to fetch tickets data");
    }

    const data = await response.json();
    return data;
};

export const TicketsScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['TICKETS'],
        queryFn: fetchTickets,
    });

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading customers data: {(error as Error).message}</div>;
    }
    return (
        <TicketsView
            tickets={data?.items || []}
            totalTickets={data?.total || 0}
            page={data?.page || 1}
            totalPages={data?.pages || 1}
        />
    );
}