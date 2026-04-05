import { useQuery } from "@tanstack/react-query";
import commissions from "./commissions.json";
import { CommissionsView } from "./CommissionsView";
import { LoadingView } from "../LoadingView";

export const fetchCommissions = async () => {
    const response = await fetch("https://127.0.0.1:8000/api/commissions");

    if (!response.ok) {
        throw new Error("Failed to fetch commissions data");
    }

    const data = await response.json();
    return data;
};

export const CommissionsScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['COMMISSIONS'],
        queryFn: fetchCommissions,
    });

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading customers data: {(error as Error).message}</div>;
    }

    return (
        <CommissionsView
            commissions={data?.items || []}
            totalCommissions={data?.total || 0}
            page={data?.page || 1}
            totalPages={data?.pages || 1}
        />
    );
};