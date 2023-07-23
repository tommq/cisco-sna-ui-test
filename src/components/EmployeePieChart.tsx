import React from "react";
import {Paper, Typography} from "@mui/material";
import {Pie, PieChart} from "recharts";
import {Employee} from "../pages/Dashboard";

export default function EmployeePieChart({data: employeeData}: {data: Employee[]}) {

    const data = employeeData.reduce((acc: { name: string, value: number }[], employee: Employee) => {
        const index = acc.findIndex(item => item.name === employee.jobTitle);
        if (index > -1) {
            acc[index].value += 1;
        } else {
            acc.push({name: employee.jobTitle, value: 1});
        }
        return acc;
    }, []);

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
