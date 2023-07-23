import React from "react";
import {Paper, Typography} from "@mui/material";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import { Employee } from "../pages/Dashboard";

type GenderCount = {
    male: number;
    female: number;
};

export default function EmployeeBarChart({data: employeeData}: {data: Employee[]}) {
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
