import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Importance } from '../../types/models/List.model';

type Props = {
    importanceLevels?: Importance[];
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
};

const FilterDropdown = ({ importanceLevels = Object.values(Importance) as Importance[], value = '', onChange, className }: Props) => {
    return (
        <FormControl size="small" className={className} sx={{ minWidth: 160 }}>
            <InputLabel id="filter-label">Filter by</InputLabel>
            <Select
                labelId="filter-label"
                label="Filter by"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value as string)}
            >
                {importanceLevels.map((level) => (
                    <MenuItem key={level} value={level}>{level}</MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default FilterDropdown;