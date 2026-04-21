import { keepPreviousData, queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { CommissionsView } from "./CommissionsView";
import { LoadingView } from "../LoadingView";
import { QUERY_COMMISSIONS_KEY } from "@/services/queries";
import { akClient } from "@/services";
import { useEffect, useState } from "react";

const commissionsQueryOptions = (page: number) => queryOptions({
  queryKey: [QUERY_COMMISSIONS_KEY, page],
  queryFn: () => akClient.fetchCommissions(page),
  placeholderData: keepPreviousData,
});

export const CommissionsScreen = () => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(commissionsQueryOptions(page + 1))
  }, [page])

    const { data, isLoading, error } = useQuery(commissionsQueryOptions(page));

  const handlePageChange = (page: number) => {
    setPage(page);
  }

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading customers data: {(error as Error).message}</div>;
    }

    return (
        <CommissionsView
            commissions={data?.items || []}
            totalCommissions={data?.totalItems || 0}
            page={page}
            totalPages={data?.totalPages || 1}
            onPageChange={handlePageChange}
        />
    );
};