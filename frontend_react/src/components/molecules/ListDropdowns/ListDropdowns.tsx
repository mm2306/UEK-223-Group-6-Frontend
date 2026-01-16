import React, { useState } from 'react';
import { Box } from '@mui/system';
import FilterDropdown from '../../atoms/FilterDropdown';
import SortDropdown from '../../atoms/SortDropdown';
import { Importance, SortByListCategories } from '../../../types/models/List.model';

type ListDropdownsProps = {
    importanceLevels?: Importance[];
    sortCategories?: SortByListCategories[];
    filterValue?: string;
    sortValue?: string;
    onFilterChange?: (value: string) => void;
    onSortChange?: (value: string) => void;
    className?: string;
};

const ListDropdowns = ({
                           importanceLevels = [],
                           sortCategories = [],
                           filterValue,
                           sortValue,
                           onFilterChange,
                           onSortChange,
                           className,
                       }: ListDropdownsProps) => {
    const levels: Importance[] = importanceLevels.length
        ? importanceLevels
        : (Object.values(Importance).filter(() => true) as Importance[]);

    const categories: SortByListCategories[] = sortCategories.length
        ? sortCategories
        : (Object.values(SortByListCategories).filter(() => true) as SortByListCategories[]);

    const [internalFilter, setInternalFilter] = useState<string>('');
    const [internalSort, setInternalSort] = useState<string>('');

    const currentFilter = filterValue !== undefined ? filterValue : internalFilter;
    const currentSort = sortValue !== undefined ? sortValue : internalSort;

    const handleFilterChange = (newValue: string) => {
        if (onFilterChange) onFilterChange(newValue);
        else setInternalFilter(newValue);
    };

    const handleSortChange = (newValue: string) => {
        if (onSortChange) onSortChange(newValue);
        else setInternalSort(newValue);
    };

    return (
        <Box sx={{ padding: 2, display: 'flex', gap: 1, alignItems: 'center' }} className={className}>
            <FilterDropdown importanceLevels={levels} value={currentFilter} onChange={handleFilterChange} />
            <SortDropdown categories={categories} value={currentSort} onChange={handleSortChange} />
        </Box>
    );
};

export default ListDropdowns;
