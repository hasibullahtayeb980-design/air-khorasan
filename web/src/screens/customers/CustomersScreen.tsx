import React from 'react';
import { CustomersView } from './CustomersView';
import { useQuery } from '@tanstack/react-query';
import { LoadingView } from '../LoadingView';

export const fetchCustomers = async () => {
    const response = await fetch("https://127.0.0.1:8000/api/customers");

    if (!response.ok) {
        throw new Error("Failed to fetch customers data");
    }

    const data = await response.json();
    return data;
};

export const CustomersScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['CUSTOMERS'],
        queryFn: fetchCustomers,
    });

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
        />
    );
};