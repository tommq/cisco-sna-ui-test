import React, {useContext} from "react";
import {EmployeeContext} from "../App";
import {Box, Button, CircularProgress, Container} from "@mui/material";
import {Link} from "react-router-dom";
import Layout from "../components/Layout";
import AddEmployeeForm from "../components/AddEmployeeForm";

export default function AddEmployee() {

    const {employeeData, setEmployeeData} = useContext(EmployeeContext);

    return (
        <Layout>
            <Container maxWidth='md'>
                <h1>Add Employee Form</h1>

                <Box display='flex' justifyContent='flex-end' py={4}>
                    <Link to='/'>
                        <Button variant='outlined'>Back to Dashboard</Button>
                    </Link>
                </Box>

                {employeeData.length ? (
                    <AddEmployeeForm setEmployeeData={setEmployeeData}/>
                ) : <CircularProgress/>}
            </Container>
        </Layout>
    )
}
