import React, { useState } from 'react';
import { Box } from '@mui/system';
import FilterByImportanceDropdown from '../../atoms/FilterByImportanceDropdown';
import FilterByUserDropdown from "../../atoms/FilterByUserDropdown";
import SortDropdown from '../../atoms/SortDropdown';
import { Importance, SortByListCategories } from '../../../types/models/List.model';
import { User } from '../../../types/models/User.model';

type ListDropdownsProps = {
    importanceLevels?: Importance[];
    sortCategories?: SortByListCategories[];
    filterValue?: string;
    sortValue?: string;
    onFilterChange?: (value: string) => void;
    onSortChange?: (value: string) => void;
    className?: string;
    users?: User[];
    userFilterValue?: string;
    onUserFilterChange?: (value: string) => void;
    isAdmin?: boolean;
};

const ListDropdowns = ({
                           importanceLevels = [],
                           sortCategories = [],
                           filterValue,
                           sortValue,
                           onFilterChange,
                           onSortChange,
                           className,
                           users = [],
                           userFilterValue,
                           onUserFilterChange,
                           isAdmin = false,
                       }: ListDropdownsProps) => {
    const levels: Importance[] = importanceLevels.length
        ? importanceLevels
        : (Object.values(Importance).filter(() => true) as Importance[]);

    const categories: SortByListCategories[] = sortCategories.length
        ? sortCategories
        : (Object.values(SortByListCategories).filter(() => true) as SortByListCategories[]);

    const [internalFilter, setInternalFilter] = useState<string>('');
    const [internalSort, setInternalSort] = useState<string>('');
    const [internalUserFilter, setInternalUserFilter] = useState<string>('');

    const currentFilter = filterValue !== undefined ? filterValue : internalFilter;
    const currentSort = sortValue !== undefined ? sortValue : internalSort;
    const currentUserFilter = userFilterValue !== undefined ? userFilterValue : internalUserFilter;

    const handleFilterChange = (newValue: string) => {
        if (onFilterChange) onFilterChange(newValue);
        else setInternalFilter(newValue);
    };

    const handleSortChange = (newValue: string) => {
        if (onSortChange) onSortChange(newValue);
        else setInternalSort(newValue);
    };

    const handleUserFilterChange = (newValue: string) => {
        if (onUserFilterChange) onUserFilterChange(newValue);
        else setInternalUserFilter(newValue);
    };

    return (
        <Box sx={{ padding: 2, display: 'flex', gap: 1, alignItems: 'center' }} className={className}>
            <FilterByImportanceDropdown importanceLevels={levels} value={currentFilter} onChange={handleFilterChange} />
            {isAdmin ? (
                <FilterByUserDropdown users={users} value={currentUserFilter} onChange={handleUserFilterChange} />
            ) : null}
            <SortDropdown categories={categories} value={currentSort} onChange={handleSortChange} />
        </Box>
    );
};

export default ListDropdowns;
