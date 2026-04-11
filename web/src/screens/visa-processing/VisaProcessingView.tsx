import React, { useMemo, useState } from "react";
import { Edit01, FilePlus02, Passcode, Passport, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { VisaStatus, VisaType, type Visa } from "@/services/AKClient";
import { Button } from "@/components/base/buttons/button";
import { getLocaleDirection } from "@/utils/utils";
import { LocaleDirection } from "@/i18n/types";
import { i18n, Translation } from "@/i18n";

interface VisaProcessingViewProps {
  visas: Visa[];
  totalVisas: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
 
export const VisaProcessingView: React.FC<VisaProcessingViewProps> = ({ visas, totalVisas, page, totalPages, onPageChange }) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });
 
    const sortedItems = useMemo(() => {
        return visas.sort((a, b) => {
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
                title={i18n.t(Translation.visaProcessing.title)}
                badge={totalVisas}
                contentTrailing={
                        <div className="flex flex-row items-center">
                            <div className="flex items-center gap-3">
                                <Button onClick={() => null} size="sm" iconLeading={FilePlus02}>
                                    {i18n.t(Translation.visaProcessing.buttonNewVisaProcessingEntryLabel)}
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
                <Table aria-label="Visa Processing" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header>
                        <Table.Head id="id" label={i18n.t(Translation.visaProcessing.tableHeaderVisaProcessingIdLabel)} isRowHeader allowsSorting className="w-full max-w-1/4" />
                        <Table.Head id="customer" label={i18n.t(Translation.tickets.tableHeaderCustomerLabel)} allowsSorting />
                        <Table.Head id="country" label={i18n.t(Translation.visaProcessing.tableHeaderCountryLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="visaType" label={i18n.t(Translation.visaProcessing.tableHeaderVisaTypeLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="applicationDate" label={i18n.t(Translation.visaProcessing.tableHeaderApplicationDateLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="fee" label={i18n.t(Translation.visaProcessing.tableHeaderFeeLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="companyCost" label={i18n.t(Translation.visaProcessing.tableHeaderCompanyCostLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="profit" label={i18n.t(Translation.visaProcessing.tableHeaderProfitLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="actions" />
                    </Table.Header>
    
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.id}>
                                <Table.Cell>
                                    <BadgeWithDot size="sm" color={item.status === VisaStatus.Approved ? "success" : item.status === VisaStatus.Rejected ? "error" : "warning"} type="modern">
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
                                <Table.Cell className="whitespace-nowrap">{item.country}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.visaType === VisaType.Tourist ? i18n.t(Translation.visaProcessing.visaTypeTouristLabel) : item.visaType === VisaType.Business ? i18n.t(Translation.visaProcessing.visaTypeBusinessLabel) : i18n.t(Translation.visaProcessing.visaTypeStudyLabel)}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{new Date(item.applicationDate).toLocaleDateString()}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.fee}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.companyCost}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.profit}</Table.Cell>
                                <Table.Cell className="px-4">
                                    <div className="flex justify-end gap-0.5">
                                        <ButtonUtility size="xs" color="tertiary" tooltip={i18n.t(Translation.buttonDeleteLabel)} icon={Trash01} />
                                        <ButtonUtility size="xs" color="tertiary" tooltip={i18n.t(Translation.buttonEditLabel)} icon={Edit01} />
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

