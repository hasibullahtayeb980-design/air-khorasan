import React, { useMemo, useState } from "react";
import { Edit01, MessagePlusCircle, Trash01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import type { Commission } from "@/services/AKClient";
import { Button } from "@/components/base/buttons/button";
import { getLocaleDirection } from "@/utils/utils";
import { LocaleDirection } from "@/i18n/types";
import { i18n, Translation } from "@/i18n";

interface CommissionsViewProps {
    commissions: Commission[];
    totalCommissions: number;
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}
 
export const CommissionsView: React.FC<CommissionsViewProps> = ({ commissions, totalCommissions, page, totalPages, onPageChange }) => {
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
    }, [sortDescriptor, page]);

    const dir: LocaleDirection = getLocaleDirection();

    return (
        <TableCard.Root className="dark-mode h-screen flex flex-col">
            <TableCard.Header
                title={i18n.t(Translation.commissions.title)}
                badge={totalCommissions}
                contentTrailing={
                        <div className="flex flex-row items-center">
                            <div className="flex items-center gap-3">
                                <Button onClick={() => null} size="sm" iconLeading={MessagePlusCircle}>
                                    {i18n.t(Translation.commissions.buttonNewCommissionLabel)}
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
                <Table aria-label="Commissions" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                    <Table.Header>
                        <Table.Head id="id" label={i18n.t(Translation.commissions.tableHeaderComissionIdLabel)} isRowHeader allowsSorting className="w-full max-w-1/4" />
                        <Table.Head id="partnerCompany" label={i18n.t(Translation.commissions.tableHeaderPartnerCompanyLabel)} allowsSorting />
                        <Table.Head id="visaId" label={i18n.t(Translation.commissions.tableHeaderVisaIdLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="amount" label={i18n.t(Translation.commissions.tableHeaderAmountLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="date" label={i18n.t(Translation.commissions.tableHeaderDateLabel)} allowsSorting tooltip="This is a tooltip" />
                        <Table.Head id="actions" />
                    </Table.Header>
    
                    <Table.Body items={sortedItems}>
                        {(item) => (
                            <Table.Row id={item.id}>
                                <Table.Cell>
                                    <Badge size="sm" type="modern">
                                        {item.id}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.partnerCompany}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.visaId}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{item.amount}</Table.Cell>
                                <Table.Cell className="whitespace-nowrap">{new Date(item.date).toLocaleDateString()}</Table.Cell>
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

