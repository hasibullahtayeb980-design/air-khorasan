import React, { useMemo, useState } from "react";
import { Edit01, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";

export interface Commission {
    id: string;
    partnerCompany: string;
    visaId: string;
    amount: number;
    date: string;
}

interface CommissionsViewProps {
    commissions: Commission[];
    commissionsLength: number;
}
 
export const CommissionsView: React.FC<CommissionsViewProps> = ({ commissions, commissionsLength }) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });
 
    const sortedItems = useMemo(() => {
        return commissions.sort((a, b) => {
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
        <TableCard.Root className="h-screen flex flex-col">
            <TableCard.Header
                title="Commissions"
                badge={commissionsLength}
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <DropdownIconSimple />
                    </div>
                }
            />
            <div className="flex-1 overflow-y-auto">
                <Table aria-label="Commissions" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header>
                        <Table.Head id="id" label="Commission ID" isRowHeader allowsSorting className="w-full max-w-1/4" />
                        <Table.Head id="partnerCompany" label="Partner Company" allowsSorting />
                        <Table.Head id="visaId" label="Visa ID" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="amount" label="Amount" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="date" label="Date" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="actions" />
                    </Table.Header>
    
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.id}>
                                <Table.Cell>
                                    <Badge size="sm" type="modern">
                                        {item.id.split('-')[0]}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.partnerCompany}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.visaId.split('-')[0]}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.amount}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</Table.Cell>
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
            <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};

