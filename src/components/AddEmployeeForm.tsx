import React from "react";
import {Button, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {EmployeeContextValueInterface} from "../App";

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


export default function AddEmployeeForm({setEmployeeData}: Omit<EmployeeContextValueInterface, 'employeeData'>) {

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            name: '',
            jobTitle: '',
            tenure: '',
            gender: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if (typeof setEmployeeData === "function") {
                setEmployeeData((prev) => [...prev, {...values}])
                navigate("/")
            }
        },
    });

    return (
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
                data-testid="name-input"
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
                data-testid="jobTitle-input"
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
                data-testid="tenure-input"
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
                data-testid="gender-input"
            />
            <Button color="primary" variant="contained" fullWidth type="submit" data-testid="add-employee-form-submit-button">
                Submit
            </Button>
        </form>
    );
}
