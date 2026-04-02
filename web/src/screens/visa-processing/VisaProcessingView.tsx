import React, { useMemo, useState } from "react";
import { Edit01, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";

export enum VisaType {
    Tourist,
    Business,
    Study,
}

export enum VisaStatus {
    Processing,
    Approved,
    Rejected,
}

export interface VisaProcessingEntry {
    id: string;
    visaType: VisaType;
    customerId: string;
    customerFullName: string;
    country: string;
    avatarUrl: string;
    applicationDate: string;
    status: VisaStatus;
    fee: number;
    companyCost: number;
    profit: number;
    createdAt: string;
}

interface VisaProcessingViewProps {
    visaProcessingData: VisaProcessingEntry[];
    visaProcessingDataLength: number;
}
 
export const VisaProcessingView: React.FC<VisaProcessingViewProps> = ({ visaProcessingData, visaProcessingDataLength }) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });
 
    const sortedItems = useMemo(() => {
        return visaProcessingData.sort((a, b) => {
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
                title="Visa Processing"
                badge={visaProcessingDataLength}
                contentTrailing={
                    <div className="absolute top-5 right-4 md:right-6">
                        <DropdownIconSimple />
                    </div>
                }
            />
            <div className="flex-1 overflow-y-auto">
                <Table aria-label="Visa Processing" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header>
                        <Table.Head id="id" label="Visa Processing ID" isRowHeader allowsSorting className="w-full max-w-1/4" />
                        <Table.Head id="customer" label="Customer" allowsSorting />
                        <Table.Head id="country" label="Country" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="applicationDate" label="Application Date" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="status" label="Status" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="fee" label="Fee" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="companyCost" label="Company Cost" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="profit" label="Profit" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="createdAt" label="Created At" allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="actions" />
                    </Table.Header>
    
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.id}>
                                <Table.Cell>
                                    <BadgeWithDot size="sm" color={item.status === VisaStatus.Approved ? "success" : item.status === VisaStatus.Rejected ? "error" : "warning"} type="modern">
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
                                <Table.Cell className="whitespace-nowrap">{item.country}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.applicationDate}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.status}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.fee}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.companyCost}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.profit}</Table.Cell>
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
            <PaginationPageMinimalCenter page={1} total={10} className="px-4 py-3 md:px-6 md:pt-3 md:pb-4" />
        </TableCard.Root>
    );
};

