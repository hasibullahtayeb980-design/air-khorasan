import tickets from "./tickets.json";
import { TicketStatus, TicketsView } from "./TicketsView";

export const TicketsChangedScreen = () => {
    return (
        <TicketsView tickets={tickets.filter(ticket => ticket.status === TicketStatus.Changed)} ticketsLength={tickets.length} />
    );
}