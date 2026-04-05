import { useMemo, useState } from "react";
import { Edit01, Trash01, UploadCloud02, UserPlus01 } from "@untitledui/icons";
import type { SortDescriptor } from "react-aria-components";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithDot } from "@/components/base/badges/badges";
import { ButtonUtility } from "@/components/base/buttons/button-utility";
import { DropdownIconSimple } from "@/components/base/dropdown/dropdown-icon-simple";
import { Button } from "@/components/base/buttons/button";
import { NewCustomerModal } from "./new-customer/NewCustomerModal";
import type { Customer } from "@/services/AKClient";

interface CustomersViewProps {
    totalCustomers: number;
    page: number;
    totalPages: number;
    customers: Customer[];
    onPageChange: (page: number) => void;
}
 
export const CustomersView: React.FC<CustomersViewProps> = ({ 
    totalCustomers,
    page,
    totalPages,
    customers,
    onPageChange
}) => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: "status",
        direction: "ascending",
    });

    const [newCustomerFormVisible, setNewCustomerFormVisible] = useState(false);
 
    const sortedItems = useMemo(() => {
        return customers.sort((a, b) => {
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
    }, [sortDescriptor, customers]);

    const displayNewCustomerForm = () => {
        setNewCustomerFormVisible(true);
    }

    const onNewCustomerFormCancelClick = () => {
        setNewCustomerFormVisible(false);
    }
 
    return (
        <div>
            {newCustomerFormVisible && (
                <NewCustomerModal
                    onCancel={onNewCustomerFormCancelClick}
                    onSuccess={() => null}
                    visible={newCustomerFormVisible}
                />
            )}
            
            <TableCard.Root>
                <TableCard.Header
                    title="Customers"
                    badge={`${totalCustomers}`}
                    contentTrailing={
                        <div>
                            <div className="absolute top-5 right-4 md:right-6">
                                <DropdownIconSimple />
                            </div>
                            <div className="flex items-center gap-3">
                                <Button onClick={displayNewCustomerForm} size="sm" iconLeading={UserPlus01}>
                                    Add Customer
                                </Button>
                            </div>
                        </div>
                    }
                />

                <div className="flex-1 overflow-y-auto">
                    <Table aria-label="Customers" selectionMode="multiple" sortDescriptor={sortDescriptor} onSortChange={setSortDescriptor}>
                        <Table.Header>
                            <Table.Head id="full_name" label="Full Name" isRowHeader allowsSorting className="w-full max-w-1/4" />
                            <Table.Head id="phone" label="Phone" allowsSorting />
                            <Table.Head id="email" label="Email address" allowsSorting className="md:hidden xl:table-cell" />
                            <Table.Head id="passport_number" label="Passport Number" allowsSorting tooltip="This is a tooltip" />
                            <Table.Head id="tazkira_number" label="Tazkira Number" />
                            <Table.Head id="actions" />
                        </Table.Header>
        
                        <Table.Body items={sortedItems}>
                            {(item) => (
                                <Table.Row id={item.id}>
                                    <Table.Cell>
                                        <div className="flex items-center gap-3">
                                            <Avatar src={item.avatarImageUrl} alt={item.fullName} size="md" />
                                            <div className="whitespace-nowrap">
                                                <p className="text-sm font-medium text-primary">{item.fullName}</p>
                                                <p className="text-sm text-tertiary">{item.id}</p>
                                            </div>
                                        </div>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <BadgeWithDot size="sm" color={"success"} type="modern">
                                            {item.phone}
                                        </BadgeWithDot>
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap md:hidden xl:table-cell">{item.email}</Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">{item.tazkiraNumber}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-1">
                                            <Badge color="purple" size="sm">
                                                {item.passportNumber}
                                            </Badge>
                                        </div>
                                    </Table.Cell>
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
    
                <PaginationPageMinimalCenter
                  page={page}
                  total={totalPages}
                  onPageChange={onPageChange}
                  className="px-4 py-3 md:px-6 md:pt-3 md:pb-4"
                />
            </TableCard.Root>
        </div>
    );
};

