import type { NavItemDividerType, NavItemType } from '@/components/application/app-navigation/config';
import { SidebarNavigationSectionDividers } from '@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers';
import { useQuery } from '@tanstack/react-query';
import { BarChartSquare02, CreditCard02, CurrencyDollarCircle, FileCheck02, MessageChatCircle, Users01 } from '@untitledui/icons';
import { Outlet } from 'react-router-dom';
import { fetchDashboard } from './dashboard/DashboardScreen';
import { LoadingIndicator } from "@/components/application/loading-indicator/loading-indicator";

const getNavItems = (
    totalCustomers: number,
    totalTickets: number,
    totalTicketChanges: number,
    totalTicketCancellations: number) => {
    const navItems: (NavItemType | NavItemDividerType)[] = [
        {
            label: "Dashboard",
            href: "/",
            icon: BarChartSquare02,
        },
        {
            label: "Customers",
            href: "/customers",
            icon: Users01,
            badge: totalCustomers,
        },
        { divider: true },
        {
            label: "Tickets",
            icon: CreditCard02,
            href: "/tickets",
            items: [
                { label: "View all", badge: totalTickets, href: "/tickets/view-all" },
                { label: "Changed", badge: totalTicketChanges, href: "/tickets/changed" },
                { label: "Cancellations", badge: totalTicketCancellations, href: "/tickets/cancelled" },
            ],
        },
        { divider: true },
        {
            label: "Visa Processing",
            href: "/visa-processing",
            icon: FileCheck02,
        },
        {
            label: "Expenses",
            href: "/expenses",
            icon: CurrencyDollarCircle,
        },
        {
            label: "Commissions",
            href: "/commissions",
            icon: MessageChatCircle,
        },
    ];

    return navItems;
}

export const Layout = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['DASHBOARD'],
        queryFn: fetchDashboard,
    });

    const navItems = getNavItems(
        data?.totalCustomers || 0,
        data?.totalTickets || 0,
        data?.totalTicketChanges || 0,
        data?.totalTicketCancellations || 0
    );

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoadingIndicator type="line-simple" size="md" label="Loading..." />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error loading dashboard data: {(error as Error).message}</div>;
    }

    return (
        <div className='flex flex-col bg-primary lg:flex-row'>
            <SidebarNavigationSectionDividers items={navItems} />
            <main className="dark-mode min-w-0 flex-1 bg-primary pt-8 pb-12">
                <div className="flex flex-col gap-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}