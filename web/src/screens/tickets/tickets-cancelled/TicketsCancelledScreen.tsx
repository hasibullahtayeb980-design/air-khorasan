import { LoadingView } from "@/screens/LoadingView";
import { TicketsCancelledView } from "./TicketsCancelledView";
import { keepPreviousData, queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_CUSTOMERS_KEY } from "@/services/queries";
import { akClient } from "@/services";
import { useEffect, useState } from "react";

const ticketsCancelledQueryOptions = (page: number) => queryOptions({
  queryKey: [QUERY_CUSTOMERS_KEY, page],
  queryFn: () => akClient.fetchTicketsCancelled(page),
  placeholderData: keepPreviousData,
});

export const TicketsCancelledScreen = () => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(ticketsCancelledQueryOptions(page + 1))
  }, [page]);

  const { data, isLoading, error } = useQuery(ticketsCancelledQueryOptions(page));

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
    <TicketsCancelledView
      ticketsCancelled={data?.items || []}
      totalTicketsCancelled={data?.total || 0}
      page={page}
      totalPages={data?.pages || 1}
      onPageChange={handlePageChange}
    />
  );
}