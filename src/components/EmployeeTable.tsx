import React, {useMemo} from "react";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from "@mui/material";
import { Employee } from "../pages/Dashboard";

type SortOrder = 'asc' | 'desc';

function compareByField(field: keyof Employee, order: SortOrder): (a: Employee, b: Employee) => number {
    return (a: Employee, b: Employee) => {
        const aValue = a[field];
        const bValue = b[field];

        // Try comparing as numbers if both are numeric strings
        if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
            const numA = Number(aValue);
            const numB = Number(bValue);
            return order === 'asc' ? numA - numB : numB - numA;
        }

        // Fallback to string comparison
        return order === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    };
}


export default function EmployeeTable({data: employeeData}: {data: Employee[]}) {

    const [order, setOrder] = React.useState<SortOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Employee>('name');

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Employee,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortedEmployees = React.useMemo(
        () => employeeData.slice().sort(compareByField(orderBy, order)),
        [order, orderBy, employeeData]
    );

    const tableContentRows = useMemo(() => {
        return sortedEmployees.map((employee: Employee, i) => (
            <TableRow key={i}>
                <TableCell>
                    {employee.name}
                </TableCell>

                <TableCell>
                {employee.jobTitle}
                </TableCell>

                <TableCell>
                {employee.tenure}
                </TableCell>

                <TableCell>
                {employee.gender}
                </TableCell>
                </TableRow>
        ))
    }, [sortedEmployees])


    return (
        <Paper elevation={6} sx={{padding: '24px 32px'}}>
    <TableContainer sx={{ maxHeight: 300 }}>

    <Table size="small" stickyHeader>
    <TableHead>
        <TableRow>
            <TableCell key="name" sortDirection={orderBy === "name" ? order : false}>
    <TableSortLabel onClick={(e) => handleRequestSort(e, "name")}>
    Name
    </TableSortLabel>
    </TableCell>

    <TableCell key="jobTitle" sortDirection={orderBy === "jobTitle" ? order : false}>
    <TableSortLabel onClick={(e) => handleRequestSort(e, "jobTitle")}>
    Job Title
    </TableSortLabel>
    </TableCell>

    <TableCell key="tenure" sortDirection={orderBy === "tenure" ? order : false}>
    <TableSortLabel onClick={(e) => handleRequestSort(e, "tenure")}>
    Tenure
    </TableSortLabel>
    </TableCell>

    <TableCell key="gender" sortDirection={orderBy === "gender" ? order : false}>
    <TableSortLabel onClick={(e) => handleRequestSort(e, "gender")}>
    Gender
    </TableSortLabel>
    </TableCell>
    </TableRow>
    </TableHead>

    <TableBody>
    {tableContentRows}
    </TableBody>
    </Table>
    </TableContainer>
    </Paper>
)
}
