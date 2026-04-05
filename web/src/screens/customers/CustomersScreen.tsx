import React from 'react';
import { CustomersView } from './CustomersView';
import { keepPreviousData, queryOptions, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoadingView } from '../LoadingView';
import { QUERY_CUSTOMERS_KEY } from '@/services/queries';
import { akClient } from '@/services';

const customersQueryOptions = (pageNumber: number) => 
  queryOptions({
    queryKey: [QUERY_CUSTOMERS_KEY, pageNumber],
    queryFn: () => akClient.fetchCustomers(pageNumber),
  });

export const CustomersScreen = () => {
  const [page, setPage] = React.useState<number>(1);

    const queryClient = useQueryClient();

    const { data, isLoading, error } = useQuery({
        ...customersQueryOptions(page),
        placeholderData: keepPreviousData,
    });

    console.log(data);

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