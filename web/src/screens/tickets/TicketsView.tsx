import React, { useMemo, useState } from "react";
import { Edit01, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";

export enum TicketStatus {
    Booked,
    Changed,
    Cancelled,
}

export interface Ticket {
    id: string;
    ticketNumber: string;
    status: TicketStatus;
    customerId: string;
    customerFullName: string;
    airline: string;
    fromCity: string;
    toCity: string;
    departureDate: string;
    returnDate: string;
    price: number;
    createdAt: string;
    avatarUrl: string;
}

interface TicketsViewProps {
    tickets: Ticket[];
    ticketsLength: number;
}
 
export const TicketsView: React.FC<TicketsViewProps> = ({ tickets, ticketsLength }) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });
 
    const sortedItems = useMemo(() => {
        return tickets.sort((a, b) => {
            const first = a[sortDescriptor.column as keyof typeof a];
            const second = b[sortDescriptor.column as keyof typeof b];
 
            // Compare numbers or booleans
            if ((typeof first === "number" && typeof second === "number") || (typeof first === "boolean" && typeof second === "boolean")) {
                return sortDescriptor.direction === "descending" ? second - first : first - second;
            }
 
            // Compare strings
            if (typeof first === "string" && typeof second === "string") {
                let cmp = first.localeCompare(second);
                if (sortDescriptor.direction === "descending") {
                    cmp *= -1;
                }
                return cmp;
            }
 
            return 0;
        });
    }, [sortDescriptor]);

    return (
        <TableCard.Root>
            <TableCard.Header
                title="Tickets"
                badge={ticketsLength}
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <DropdownIconSimple />
                    </div>
                }
            />
            <Table aria-label="Tickets" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                <Table.Header>
                    <Table.Head id="id" label="Ticket ID" isRowHeader allowsSorting className="w-full max-w-1/4" />
                    <Table.Head id="customer" label="Customer" allowsSorting />
                    <Table.Head id="airline" label="Airline" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="from-city" label="Departure City" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="to-city" label="Destination City" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="departure-date" label="Departure Date" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="return-date" label="Return Date" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="price" label="Price" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="created_at" label="Created At" allowsSorting tooltip="This is a tooltip" />
                    <Table.Head id="actions" />
                </Table.Header>
 
                <Table.Body items={sortedItems}>
                    {(item) => (
                        <Table.Row id={item.id}>
                            <Table.Cell>
                                <BadgeWithDot size="sm" color={item.status === TicketStatus.Booked ? "success" : item.status === TicketStatus.Changed ? "warning" : "error"} type="modern">
                                    {item.id.split('-')[0]}
                                </BadgeWithDot>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-3">
                                    <Avatar src={item.avatarUrl} alt={item.customerFullName} size="md" />
                                    <div className="whitespace-nowrap">
                                        <p className="text-sm font-medium text-primary">{item.customerFullName}</p>
                                        <p className="text-sm text-tertiary">{item.customerId.split('-')[0]}</p>
                                    </div>
                                </div>
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.airline}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.fromCity}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.toCity}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{new Date(item.departureDate).toLocaleDateString()}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{new Date(item.returnDate).toLocaleDateString()}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{item.price}</Table.Cell>
                            <Table.Cell className="whitespace-nowrap">{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell className="px-4">
                                <div className="flex justify-end gap-0.5">
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Delete" icon={Trash01} />
                                    <ButtonUtility size="xs" color="tertiary" tooltip="Edit" icon={Edit01} />
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
 
            <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />

            <div className="flex items-center justify-center overflow-hidden px-24 py-30">
            </div>
        </TableCard.Root>
    );
};

