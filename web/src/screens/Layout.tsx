import type { NavItemDividerType, NavItemType } from '@/components/application/app-navigation/config';
import { SidebarNavigationSectionDividers } from '@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers';
import { BarChartSquare02, CreditCard02, CurrencyDollarCircle, FileCheck02, MessageChatCircle, Users01 } from '@untitledui/icons';
import { Outlet } from 'react-router-dom';

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
        badge: 2398
    },
    { divider: true },
    {
        label: "Tickets",
        icon: CreditCard02,
        href: "/tickets",
        items: [
            { label: "View all", badge: 189, href: "/tickets/view-all" },
            { label: "Changed", badge: 18, href: "/tickets/changes" },
            { label: "Cancellations", badge: 16, href: "/tickets/cancellations" },
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

export const Layout = () => {
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