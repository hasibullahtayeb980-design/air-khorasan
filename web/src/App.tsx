import { Route, Routes } from "react-router";
import { DashboardScreen } from "./screens/DashboardScreen";
import { Layout } from "./screens/Layout";
import { CustomersScreen } from "./screens/customers/CustomersScreen";
import { TicketsScreen } from "./screens/tickets/TicketsScreen";

const TicketsChangedScreen = () => <div>Tickets Changed</div>;
const TicketsCancelledScreen = () => <div>Tickets Cancelled</div>;
const VisaProcessingScreen = () => <div>Visa Processing</div>;
const ExpensesScreen = () => <div>Expenses</div>;
const ComissionsScreen = () => <div>Commissions</div>;

export const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<DashboardScreen />} />
                <Route path="/customers" element={<CustomersScreen />} />
                <Route path="/tickets/view-all" element={<TicketsScreen />} />
                <Route path="/tickets/changed" element={<TicketsChangedScreen />} />
                <Route path="/tickets/cancelled" element={<TicketsCancelledScreen />} />
                <Route path="/visa-processing" element={<VisaProcessingScreen />} />
                <Route path="/expenses" element={<ExpensesScreen />} />
                <Route path="/commissions" element={<ComissionsScreen />} />
            </Route>
        </Routes>
    );
}