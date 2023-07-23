import {Box, Button, CircularProgress, Container} from "@mui/material";
import React, {useContext} from "react";
import Grid from '@mui/material/Unstable_Grid2';
import {Link} from "react-router-dom";
import { EmployeeContext } from "../App";
import EmployeeTable from "../components/EmployeeTable";
import EmployeePieChart from "../components/EmployeePieChart";
import EmployeeBarChart from "../components/EmployeeBarChart";
import Layout from "../components/Layout";


export default function Dashboard() {

    const {employeeData} = useContext(EmployeeContext);

    return (
        <Layout>
            <Container maxWidth='md'>
                <h1>Dashboard</h1>

                <Box display='flex' justifyContent='flex-end' py={4}>
                    <Link to='/add-employee' data-testid="add-employee-link">
                        <Button variant='outlined' data-testid="add-employee-button" >Add Employee</Button>
                    </Link>
                </Box>

                {employeeData.length ? (
                    <Grid container spacing={4}>
                        <Grid xs={12}>
                            <EmployeeTable data={employeeData}/>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <EmployeePieChart data={employeeData}/>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <EmployeeBarChart data={employeeData}/>
                        </Grid>
                    </Grid>
                ) : <CircularProgress data-testid="dashboard-loader" />}

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











