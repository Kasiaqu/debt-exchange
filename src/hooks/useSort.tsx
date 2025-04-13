import { Dispatch, SetStateAction, useState } from "react";
import { Debt } from "../types/Debt";
import { Headers } from "../utils/debts";

export const useSort = (setDebts: Dispatch<SetStateAction<Debt[]>>) => {
    const [sortColumn, setSortColumn] = useState<Headers>(Headers.Name);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    
    const sortByColumn = (data: Debt[], column: Headers) => {
        let order: 'asc' | 'desc' = 'asc';
    
        if (sortColumn === column) {
            order = sortOrder === 'asc' ? 'desc' : 'asc';
        }
        const multiplier = order === 'asc' ? 1 : -1
        const sortedDebts = [...data].sort((a, b) => {
            switch (column) {
                case Headers.Name:
                    return multiplier * a.Name.localeCompare(b.Name);
                case Headers.NIP:
                    return multiplier * a.NIP.localeCompare(b.NIP);
                case Headers.Value:
                    return (multiplier * (a.Value - b.Value));
                case Headers.Date:
                    return multiplier * new Date(a.Date).getTime() - new Date(b.Date).getTime();
                default:
                    return 0;
            }
        });

        setDebts(sortedDebts);
        setSortColumn(column);
        setSortOrder(order)
    }

    return { sortByColumn, sortColumn, sortOrder }
}