import { keepPreviousData, queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { LoadingView } from "../../LoadingView";
import { TicketsChangedView } from "./TicketsChangedView";
import { akClient } from "@/services";
import { QUERY_TICKETS_CHANGED_KEY } from "@/services/queries";
import { useEffect, useState } from "react";

const ticketsChangedQueryOptions = (page: number) => queryOptions({
  queryKey: [QUERY_TICKETS_CHANGED_KEY, page],
  queryFn: () => akClient.fetchTicketsChanged(page),
  placeholderData: keepPreviousData,
});

export const TicketsChangedScreen = () => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(ticketsChangedQueryOptions(page + 1))
  }, [page]);

  const { data, isLoading, error } = useQuery(ticketsChangedQueryOptions(page));

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
      <TicketsChangedView
          ticketsChanged={data?.items || []}
          totalTicketsChanged={data?.totalItems || 0}
          page={page}
          totalPages={data?.totalPages || 1}
          onPageChange={handlePageChange}
      />
  );
}