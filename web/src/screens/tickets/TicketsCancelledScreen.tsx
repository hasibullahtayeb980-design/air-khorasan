import tickets from "./tickets.json";
import { TicketStatus, TicketsView } from "./TicketsView";

export const TicketsCancelledScreen = () => {
    return (
        <TicketsView tickets={tickets.filter(ticket => ticket.status === TicketStatus.Cancelled)} ticketsLength={tickets.length} />
    );
}