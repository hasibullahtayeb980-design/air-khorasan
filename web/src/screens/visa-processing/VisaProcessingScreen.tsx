import { useQuery } from "@tanstack/react-query";
import { VisaProcessingView } from "./VisaProcessingView";
import { LoadingView } from "../LoadingView";

export const fetchVisas = async () => {
    const response = await fetch("https://127.0.0.1:8000/api/visas");

    if (!response.ok) {
        throw new Error("Failed to fetch visas data");
    }

    const data = await response.json();
    return data;
};

export const VisaProcessingScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['VISAS'],
        queryFn: fetchVisas,
    });

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading customers data: {(error as Error).message}</div>;
    }

    return (
        <VisaProcessingView
            visas={data?.items || []}
            totalVisas={data?.total || 0}
            page={data?.page || 1}
            totalPages={data?.pages || 1}
        />
    );
}