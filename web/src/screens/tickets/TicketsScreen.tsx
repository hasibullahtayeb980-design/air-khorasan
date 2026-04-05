import { keepPreviousData, queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { TicketsView } from "./TicketsView";
import { LoadingView } from "../LoadingView";
import { QUERY_TICKETS_KEY } from "@/services/queries";
import { akClient } from "@/services";
import { useEffect, useState } from "react";

const ticketsQueryOptions = (page: number) => queryOptions({
  queryKey: [QUERY_TICKETS_KEY, page],
  queryFn: () => akClient.fetchTickets(page),
  placeholderData: keepPreviousData,
});

export const TicketsScreen = () => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(ticketsQueryOptions(page + 1))
  }, [page])

  const { data, isLoading, error } = useQuery(ticketsQueryOptions(page));

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
    <TicketsView
      tickets={data?.items || []}
      totalTickets={data?.total || 0}
      page={page}
      totalPages={data?.pages || 1}
      onPageChange={handlePageChange}
    />
  );
}