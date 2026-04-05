import { useQuery } from "@tanstack/react-query";
import { DashboardView } from "./DashboardView";
import { LoadingView } from "../LoadingView";
import { QUERY_DASHBOARD_KEY } from "@/services/queries";
import { akClient } from "@/services";

export const DashboardScreen = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: [QUERY_DASHBOARD_KEY],
        queryFn: akClient.fetchDashboard,
    });

    if (isLoading) {
        return <LoadingView />;
    }

    if (error) {
        return <div className="text-red-500">Error loading dashboard data: {(error as Error).message}</div>;
    }

    return (
      <DashboardView
        newCustomers={data?.newCustomers || []}
        latestTicketChanges={data?.latestTicketChanges || []}
        latestTicketCancellations={data?.latestTicketCancellations || []}
        totalCustomers={data?.totalCustomers || 0}
        changeInPercentage={data?.changeInPercentage || 0}
      />
    );
};