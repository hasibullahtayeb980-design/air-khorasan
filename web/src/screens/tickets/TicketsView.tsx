import React, { useMemo, useState } from "react";
import { CreditCardPlus, Edit01, Trash01, UserPlus01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import type { Ticket } from "@/services/AKClient";
import { TicketStatus } from "@/services/AKClient";
import { Button } from "@/components/base/buttons/button";
import { LocaleDirection } from "@/i18n/types";
import { getLocaleDirection } from "@/utils/utils";

interface TicketsViewProps {
    totalTickets: number;
    page: number;
    totalPages: number;
    tickets: Ticket[];
    onPageChange: (page: number) => void;
}
 
export const TicketsView: React.FC<TicketsViewProps> = ({
  tickets,
  totalTickets,
  page,
  totalPages,
  onPageChange,
}) => {
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
    }, [sortDescriptor, page]);

    const dir: LocaleDirection = getLocaleDirection();

    return (
        <TableCard.Root className="dark-mode h-screen flex flex-col">
            <TableCard.Header
                title="Tickets"
                badge={totalTickets}
                contentTrailing={
                        <div className="flex flex-row items-center">
                            <div className="flex items-center gap-3">
                                <Button onClick={() => null} size="sm" iconLeading={CreditCardPlus}>
                                    New Ticket
                                </Button>
                            </div>
                            <div
                              className={`flex items-center m${dir === LocaleDirection.RightToLeft ? 'r' : 'l'}-4 md:m${dir === LocaleDirection.RightToLeft ? 'r' : 'l'}-6`}
                            >
                                <DropdownIconSimple />
                            </div>
                        </div>
                }
            />
            <div className="flex-1 overflow-y-auto">
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
                                        {item.id}
                                    </BadgeWithDot>
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-3">
                                        <Avatar src={item.customerAvatarImageUrl} alt={item.customerFullName} size="md" />
                                        <div className="whitespace-nowrap">
                                            <p className="text-sm font-medium text-primary">{item.customerFullName}</p>
                                            <p className="text-sm text-tertiary">{item.customerId}</p>
                                        </div>
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.airline}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.fromCity}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.toCity}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{new Date(item.departureDate).toLocaleDateString()}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{new Date(item.returnDate).toLocaleDateString()}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">$ {item.price}</Table.Cell>
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
            </div>
            <PaginationPageMinimalCenter page={page} total={totalPages} onPageChange={onPageChange} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};

