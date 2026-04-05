import { Area, AreaChart, CartesianGrid, Label, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartTooltipContent } from "@/components/application/charts/charts-base";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { MinimalTicketsView } from "../tickets/MinimalTicketsView";
import { TicketStatus, type TicketCancelled, type TicketChange } from "@/services/AKClient";

interface NewCustomersInterface {
  monthYear: string;
  newCustomers: number;
}

interface DashboardViewProps {
    newCustomers: NewCustomersInterface[];
    latestTicketChanges: TicketChange[];
    latestTicketCancellations: TicketCancelled[];
    totalCustomers: number;
    changeInPercentage: number;
}
 
export const DashboardView: React.FC<DashboardViewProps> = ({
    newCustomers,
    latestTicketChanges,
    latestTicketCancellations,
    totalCustomers,
    changeInPercentage,
}) => {
    const isDesktop = useBreakpoint("lg");
 
    const colors: Record<string, string> = {
        newCustomers: "text-utility-brand-600",
    };

    const newCustomersData = newCustomers.map((item) => ({
        date: new Date(item.monthYear),
        newCustomers: item.newCustomers,
    }));
 
    return (
        <main>
            <div className="flex flex-row items-center justify-between px-8">
                <h1 className="text-xl font-semibold text-primary">Dashboard</h1>
                <div className="flex flex-col gap-2">
                    <dt className="text-sm font-medium text-tertiary">Total customers</dt>
                    <dd className="flex items-start gap-2">
                        <span className="text-display-sm font-semibold text-primary">{totalCustomers}</span>
                        <div className="flex items-center gap-1">
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" className="stroke-[3px] size-4 text-fg-success-secondary"><path d="m22 7-7.869 7.869c-.396.396-.594.594-.822.668a1 1 0 0 1-.618 0c-.228-.074-.426-.272-.822-.668L9.13 12.13c-.396-.396-.594-.594-.822-.668a1 1 0 0 0-.618 0c-.228.074-.426.272-.822.668L2 17M22 7h-7m7 0v7"></path></svg>
                            <span className="text-sm font-medium text-success-primary">{`${changeInPercentage.toFixed(1)}%`}</span>
                        </div>
                    </dd>
                </div>
            </div>
            <div className="flex h-60 flex-col gap-2 px-8 pt-8">
                <ResponsiveContainer initialDimension={{ width: 1, height: 1 }} className="h-full">
                    <AreaChart
                        data={newCustomersData}
                        className="text-tertiary [&_.recharts-text]:text-xs"
                        margin={{
                            top: isDesktop ? 12 : 6,
                            bottom: isDesktop ? 16 : 0,
                        }}
                    >
                        <defs>
                            <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0.7" />
                                <stop offset="95%" stopColor="currentColor" className="text-utility-brand-700" stopOpacity="0" />
                            </linearGradient>
                        </defs>

                        <CartesianGrid vertical={false} stroke="currentColor" className="text-utility-neutral-100" />

                        <XAxis
                            fill="currentColor"
                            axisLine={false}
                            tickLine={false}
                            interval="preserveStartEnd"
                            dataKey="date"
                            tickFormatter={(value) => value.toLocaleDateString(undefined, { month: "short" })}
                            padding={{ left: 10, right: 10 }}
                        >
                            {isDesktop && (
                                <Label fill="currentColor" className="text-xs! font-medium max-lg:hidden" position="bottom">
                                    Month
                                </Label>
                            )}
                        </XAxis>

                        <YAxis
                            fill="currentColor"
                            axisLine={false}
                            tickLine={false}
                            interval="preserveStartEnd"
                            tickFormatter={(value) => Number(value).toLocaleString()}
                        >
                            <Label
                                value="New customers"
                                fill="currentColor"
                                className="text-xs! font-medium"
                                style={{ textAnchor: "middle" }}
                                angle={-90}
                                position="insideLeft"
                            />
                        </YAxis>

                        <Tooltip
                            content={<ChartTooltipContent />}
                            formatter={(value) => Number(value).toLocaleString()}
                            labelFormatter={(value) => value.toLocaleDateString(undefined, { month: "short", year: "numeric" })}
                            cursor={{
                                className: "stroke-utility-brand-600 stroke-2",
                            }}
                        />

                        <Area
                            isAnimationActive={false}
                            className={cx(colors["newCustomers"], "[&_.recharts-area-area]:translate-y-1.5 [&_.recharts-area-area]:[clip-path:inset(0_0_6px_0)]")}
                            dataKey="newCustomers"
                            name="New customers"
                            type="monotone"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="url(#gradient)"
                            fillOpacity={0.1}
                            activeDot={{
                                className: "fill-bg-primary stroke-utility-brand-600 stroke-2",
                            }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col w-full md:flex-row mt-8">
                <MinimalTicketsView
                    tickets={latestTicketChanges}
                    title="Recently Changed Tickets"
                    ticketsStatus={TicketStatus.Changed}
                />
                <MinimalTicketsView
                    tickets={latestTicketCancellations}
                    title="Recently Cancelled Tickets"
                    ticketsStatus={TicketStatus.Cancelled}
                />
            </div>
        </main>
    );
};