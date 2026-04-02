import React from 'react';
import customers from "./customers.json";
import { CustomersView } from './CustomersView';

export const CustomersScreen = () => {
    return (
        <CustomersView customers={customers} customersLength={customers.length} />
    );
};