import React, {useContext} from "react";
import {Box, Button, Container, TextField} from "@mui/material";
import Layout from "./Layout";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {EmployeeContext} from "./App";

const validationSchema = Yup.object({
    name: Yup
        .string()
        .required(),
    jobTitle: Yup
        .string()
        .required(),
    tenure: Yup
        .string()
        .required(),
    gender: Yup
        .string()
        .required(),
});


export default function AddEmployeeForm() {

    const navigate = useNavigate()

    const {setEmployeeData} = useContext(EmployeeContext);

    const formik = useFormik({
        initialValues: {
            name: '',
            jobTitle: '',
            tenure: '',
            gender: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(typeof setEmployeeData === "function"){
                setEmployeeData((prev) => [...prev, {...values}])
                navigate("/")
            }
        },
    });


    return (
        <Layout>
            <Container maxWidth='md'>
                <h1>Add Employee Form</h1>

                <Box display='flex' justifyContent='flex-end' py={4}>
                    <Link to='/'>
                        <Button variant='outlined'>Back to Dashboard</Button>
                    </Link>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Full Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{pb: 2}}
                    />

                    <TextField
                        fullWidth
                        id="jobTitle"
                        name="jobTitle"
                        label="Job Title"
                        value={formik.values.jobTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                        helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                        sx={{pb: 2}}
                    />

                    <TextField
                        fullWidth
                        id="tenure"
                        name="tenure"
                        label="Tenure"
                        value={formik.values.tenure}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.tenure && Boolean(formik.errors.tenure)}
                        helperText={formik.touched.tenure && formik.errors.tenure}
                        sx={{pb: 2}}
                    />

                    <TextField
                        fullWidth
                        id="gender"
                        name="gender"
                        label="Gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                        helperText={formik.touched.gender && formik.errors.gender}
                        sx={{pb: 2}}
                    />
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </form>


            </Container>
        </Layout>
    );
}
