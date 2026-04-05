import { useQuery } from "@tanstack/react-query";
import { ExpensesView } from "./ExpensesView";
import { LoadingView } from "../LoadingView";

export const fetchExpenses = async () => {
    const response = await fetch("https://127.0.0.1:8000/api/expenses");

    if (!response.ok) {
        throw new Error("Failed to fetch expenses data");
    }

    const data = await response.json();
    return data;
};

export const ExpensesScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['EXPENSES'],
        queryFn: fetchExpenses,
    });

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading expenses data: {(error as Error).message}</div>;
    }

    return (
        <ExpensesView
            expenses={data?.items || []}
            totalExpenses={data?.total || 0}
            page={data?.page || 1}
            totalPages={data?.pages || 1}
        />
    );
};