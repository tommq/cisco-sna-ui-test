import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {createContext, Dispatch, SetStateAction, useEffect, useState} from "react";
import Dashboard, {Employee} from "./pages/Dashboard";
import AddEmployee from "./pages/AddEmployee";

export type EmployeeDataType = Array<Employee>;

export interface EmployeeContextValueInterface {
    employeeData: EmployeeDataType,
    setEmployeeData?: Dispatch<SetStateAction<Employee[]>>
}

export const EmployeeContext = createContext<EmployeeContextValueInterface>({employeeData: []});

export default function App() {

    const [employeeData, setEmployeeData] = useState<Employee[]>([]);

    useEffect(() => {
        fetch('new_hire.json').then((response) => {
            response.json().then((result) => {
                setEmployeeData(result)
            });
        })
    }, [])


    return (
        <BrowserRouter>
            <EmployeeContext.Provider value={{employeeData: employeeData, setEmployeeData}}>
                <Routes>
                    <Route key={0} path="/" element={<Dashboard/>} />,
                    <Route key={1} path="add-employee" element={<AddEmployee/>}/>
                </Routes>
            </EmployeeContext.Provider>
        </BrowserRouter>
    );

}
