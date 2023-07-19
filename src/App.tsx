import {Routes, Route} from "react-router-dom";
import Dashboard, {Employee} from "./Dashboard";
import AddEmployeeForm from "./AddEmployeeForm";
import React, {createContext, Dispatch, SetStateAction, useState} from "react";
import employees from "./new_hire.json";

export const EmployeeContext = createContext<{
    employeeData: Employee[],
    setEmployeeData?: Dispatch<SetStateAction<Employee[]>>
}>({employeeData: []});

export default function App() {

    const [employeeData, setEmployeeData] = useState(employees);

    return (
        <div>
            <EmployeeContext.Provider value={{employeeData: employeeData, setEmployeeData}}>
                <Routes>
                    <Route key={0} path="/" element={<Dashboard/>} />,
                    <Route key={1} path="add-employee" element={<AddEmployeeForm/>}/>
                </Routes>
            </EmployeeContext.Provider>
        </div>
    );

}
