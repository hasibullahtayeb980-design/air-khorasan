import React, { useEffect, useState } from 'react';
import { CustomersView } from './CustomersView';
import { keepPreviousData, queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingView } from '../LoadingView';
import { QUERY_CUSTOMERS_KEY } from '@/services/queries';
import { akClient } from '@/services';

const customersQueryOptions = (page: number) => queryOptions({
  queryKey: [QUERY_CUSTOMERS_KEY, page],
  queryFn: () => akClient.fetchCustomers(page),
  placeholderData: keepPreviousData,
});

export const CustomersScreen = () => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery(customersQueryOptions(page + 1))
  }, [page])

  const { data, isLoading, error } = useQuery(customersQueryOptions(page));

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
    <CustomersView
      customers={data?.items || []}
      page={page}
      totalPages={data?.pages || 1}
      totalCustomers={data?.total || 0}
      onPageChange={handlePageChange}
    />
  );
};