import type { NavItemDividerType, NavItemType } from '@/components/application/app-navigation/config';
import { SidebarNavigationSectionDividers } from '@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers';
import { Translation } from '@/i18n';
import { i18n } from '@/i18n/i18n';
import { akClient } from '@/services';
import { QUERY_DASHBOARD_KEY } from '@/services/queries';
import { useQuery } from '@tanstack/react-query';
import { BarChartSquare02, CreditCard02, CurrencyDollarCircle, FileCheck02, MessageChatCircle, Users01 } from '@untitledui/icons';
import { Outlet } from 'react-router-dom';

const getNavItems = (
    totalCustomers: number,
    totalTickets: number,
    totalTicketChanges: number,
    totalTicketCancellations: number) => {
    const navItems: (NavItemType | NavItemDividerType)[] = [
        {
            label: i18n.t(Translation.navigation.buttonDashboardLabel),
            href: "/",
            icon: BarChartSquare02,
        },
        {
            label: i18n.t(Translation.navigation.buttonCustomersLabel),
            href: "/customers",
            icon: Users01,
            badge: totalCustomers,
        },
        { divider: true },
        {
            label: i18n.t(Translation.navigation.tickets.buttonIndexLabel),
            icon: CreditCard02,
            href: "/tickets",
            items: [
                { label: i18n.t(Translation.navigation.tickets.buttonViewAllLabel), badge: totalTickets, href: "/tickets/view-all" },
                { label: i18n.t(Translation.navigation.tickets.buttonChangedLabel), badge: totalTicketChanges, href: "/tickets/changed" },
                { label: i18n.t(Translation.navigation.tickets.buttonCancellationsLabel), badge: totalTicketCancellations, href: "/tickets/cancelled" },
            ],
        },
        { divider: true },
        {
            label: i18n.t(Translation.navigation.buttonVisaProcessingLabel),
            href: "/visa-processing",
            icon: FileCheck02,
        },
        {
            label: i18n.t(Translation.navigation.buttonExpensesLabel),
            href: "/expenses",
            icon: CurrencyDollarCircle,
        },
        {
            label: i18n.t(Translation.navigation.buttonCommissionsLabel),
            href: "/commissions",
            icon: MessageChatCircle,
        },
    ];

    return navItems;
}

export const Layout = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [QUERY_DASHBOARD_KEY],
        queryFn: akClient.fetchDashboard,
    });

    let navItems = getNavItems(
        data?.totalCustomers || 0,
        data?.totalTickets || 0,
        data?.totalTicketChanges || 0,
        data?.totalTicketCancellations || 0
    );

    if (isLoading) {
        navItems = getNavItems(0, 0, 0, 0);
    }

    if (error) {
        return <div className="text-red-500">Error loading dashboard data: {(error as Error).message}</div>;
    }

    return (
        <div className='flex flex-col lg:flex-row'>
            <SidebarNavigationSectionDividers items={navItems} />
            <main className="min-w-0 flex-1 pt-8 pb-12">
                <div className="flex flex-col gap-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}