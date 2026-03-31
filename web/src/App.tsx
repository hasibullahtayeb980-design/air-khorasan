import './App.css'

import { BarChartSquare02, CreditCard02, CurrencyDollarCircle, FileCheck02, Folder, HomeLine, LayoutAlt01, MessageChatCircle, PieChart03, Rows01, Settings01, Users01 } from "@untitledui/icons";
import type { NavItemDividerType, NavItemType } from "@/components/application/app-navigation/config";
import { SidebarNavigationSectionDividers } from "@/components/application/app-navigation/sidebar-navigation/sidebar-section-dividers";
import { Table01DividerLine } from "@/components/table-demo";

const navItemsWithDividers: (NavItemType | NavItemDividerType)[] = [
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
            { label: "View all", badge: 18, href: "/tickets/view-all" },
            { label: "Changed", badge: 8, href: "/tickets/changes" },
            { label: "Cancellations", badge: 6, href: "/tickets/cancellations" },
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

export const SidebarSectionDividersDemo = () => <SidebarNavigationSectionDividers activeUrl="/" items={navItemsWithDividers} />;

function App() {
  return (
    <div className='dark-mode flex flex-col bg-primary lg:flex-row'>
      <SidebarSectionDividersDemo />
      <main className="min-w-0 flex-1 bg-primary pt-8 pb-12">
        <div className="flex flex-col gap-8">
          <Table01DividerLine />
        </div>
      </main>
    </div>
  )
}

export default App
