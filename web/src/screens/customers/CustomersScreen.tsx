import React from 'react';
import { CustomersView } from './CustomersView';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingView } from '../LoadingView';
import { QUERY_CUSTOMERS_KEY } from '@/services/queries';
import { akClient } from '@/services';

export const CustomersScreen = () => {
  const [page, setPage] = React.useState(1);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        queryKey: [QUERY_CUSTOMERS_KEY, page],
        queryFn: () => akClient.fetchCustomers(page),
    });

    const handlePageChange = (page: number) => {
      if (!data) return;

      const minLimit = (data.page - 1) >= 0;
      const maxLimit = (data.page + 1) <= data.pages;

      if (minLimit && maxLimit) {
        setPage(page);
      }
    }

    const handlePreviousPageClick = () => {
      if (!data) return;

      if ((data.page - 1) >= 0) {
        setPage(old => old - 1);
      }
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
            page={data?.page || 1}
            totalPages={data?.pages || 1}
            totalCustomers={data?.total || 0}
            onPageChange={handlePageChange}
        />
    );
};