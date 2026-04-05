import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
import { VisaProcessingView } from "./VisaProcessingView";
import { LoadingView } from "../LoadingView";
import { QUERY_VISAS_KEY } from "@/services/queries";
import { akClient } from "@/services";
import { useEffect, useState } from "react";

const visaQueryOptions = (page: number) => queryOptions({
  queryKey: [QUERY_VISAS_KEY, page],
  queryFn: () => akClient.fetchVisas(page),
});

export const VisaProcessingScreen = () => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(visaQueryOptions(page + 1))
  }, [page])

  const { data, isLoading, error } = useQuery(visaQueryOptions(page));

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
        <VisaProcessingView
            visas={data?.items || []}
            totalVisas={data?.total || 0}
            page={page}
            totalPages={data?.pages || 1}
            onPageChange={handlePageChange}
        />
    );
}