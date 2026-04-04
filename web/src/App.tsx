import { Route, Routes } from "react-router";
import { DashboardScreen } from "./screens/dashboard/DashboardScreen";
import { Layout } from "./screens/Layout";
import { CustomersScreen } from "./screens/customers/CustomersScreen";
import { TicketsScreen } from "./screens/tickets/TicketsScreen";
import { TicketsChangedScreen } from "./screens/tickets/TicketsChangedScreen";
import { TicketsCancelledScreen } from "./screens/tickets/TicketsCancelledScreen";
import { VisaProcessingScreen } from "./screens/visa-processing/VisaProcessingScreen";
import { CommissionsScreen } from "./screens/commissions/CommissionsScreen";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

const ExpensesScreen = () => <div>Expenses</div>;

export const App = () => {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardScreen />} />
                    <Route path="/customers" element={<CustomersScreen />} />
                    <Route path="/tickets/view-all" element={<TicketsScreen />} />
                    <Route path="/tickets/changed" element={<TicketsChangedScreen />} />
                    <Route path="/tickets/cancelled" element={<TicketsCancelledScreen />} />
                    <Route path="/visa-processing" element={<VisaProcessingScreen />} />
                    <Route path="/expenses" element={<ExpensesScreen />} />
                    <Route path="/commissions" element={<CommissionsScreen />} />
                </Route>
            </Routes>
        </QueryClientProvider>
    );
}