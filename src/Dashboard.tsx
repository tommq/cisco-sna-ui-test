import {
    Box, Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel, Typography
} from "@mui/material";
import React, {useContext, useMemo} from "react";
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
} from 'recharts';
import Layout from "./Layout";
import Grid from '@mui/material/Unstable_Grid2';
import {Link} from "react-router-dom";
import {EmployeeContext} from "./App"; // Grid version 2


export default function Dashboard() {

    return (
        <Layout>
            <Container maxWidth='md'>
                <h1>Dashboard</h1>

                <Box display='flex' justifyContent='flex-end' py={4}>
                    <Link to='/add-employee'>
                        <Button variant='outlined'>Add Employee</Button>
                    </Link>
                </Box>

                <Grid container spacing={4}>
                    <Grid xs={12}>
                        <EmployeeTable/>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <EmployeePieChart/>
                    </Grid>

                    <Grid xs={12} md={6}>
                        <EmployeeBarChart/>
                    </Grid>
                </Grid>

            </Container>
        </Layout>

    );
}

export interface Employee {
    name: string;
    jobTitle: string;
    tenure: string;
    gender: string;
}

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

type SortOrder = 'asc' | 'desc';


function EmployeeTable() {

    const [order, setOrder] = React.useState<SortOrder>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Employee>('name');
    const {employeeData} = useContext(EmployeeContext);

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
        [order, orderBy]
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

function EmployeePieChart() {
    const {employeeData} = useContext(EmployeeContext);
    const data = employeeData.reduce((acc: { name: string, value: number }[], employee: Employee) => {
        const index = acc.findIndex(item => item.name === employee.jobTitle);
        if (index > -1) {
            acc[index].value += 1;
        } else {
            acc.push({name: employee.jobTitle, value: 1});
        }
        return acc;
    }, []);

    console.warn(data)


    return (
        <Paper elevation={6} sx={{padding: '24px 32px'}}>
            <Typography variant='h5'>Employees by Job Title</Typography>
            <PieChart width={350} height={350} title="Employees by Job Title">
                <Pie
                    dataKey="value"
                    nameKey='name'
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    fill="#1976d2"
                    label={(entry) => `${entry.name}: ${entry.value}`}
                />
            </PieChart>
        </Paper>

    )

}

type GenderCount = {
    male: number;
    female: number;
};


function EmployeeBarChart() {
    const {employeeData} = useContext(EmployeeContext);
    const genderCounts = employeeData.reduce<GenderCount>((accumulator, employee) => {
        const key = employee.gender.toLowerCase() as keyof GenderCount;
        accumulator[key]++;
        return accumulator;
    }, {male: 0, female: 0});

    const data = [{...genderCounts, name: "Gender"}]

    return (
        <Paper elevation={6} sx={{padding: '24px 32px'}}>
            <Typography variant='h5'>Employees by gender</Typography>
            <BarChart
                width={350}
                height={350}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="gender"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>
                <Bar dataKey="male" fill="#8884d8"/>
                <Bar dataKey="female" fill="#82ca9d"/>
            </BarChart>
        </Paper>
    )

}
