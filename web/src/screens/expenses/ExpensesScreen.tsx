import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExpensesView } from "./ExpensesView";
import { LoadingView } from "../LoadingView";
import { QUERY_EXPENSES_KEY } from "@/services/queries";
import { akClient } from "@/services";
import { useEffect, useState } from "react";

const expensesQueryOptions = (page: number) => queryOptions({
  queryKey: [QUERY_EXPENSES_KEY, page],
  queryFn: () => akClient.fetchExpenses(page),
})

export const ExpensesScreen = () => {
    const [page, setPage] = useState<number>(1);
    const queryClient = useQueryClient();

    useEffect(() => {
      queryClient.prefetchQuery(expensesQueryOptions(page + 1))
    }, [page]);

    const { data, isLoading, error } = useQuery(expensesQueryOptions(page));

    const handlePageChange = (page: number) => {
      setPage(page);
    }

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
            page={page}
            totalPages={data?.pages || 1}
            onPageChange={handlePageChange}
        />
    );
};