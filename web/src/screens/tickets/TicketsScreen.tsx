import tickets from "./tickets.json";
import { TicketsView } from "./TicketsView";

export const TicketsScreen = () => {
    return (
        <TicketsView tickets={tickets} ticketsLength={tickets.length} />
    );
}