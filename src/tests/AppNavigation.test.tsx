import {render} from "@testing-library/react";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import React from "react";
import AddEmployee from "../pages/AddEmployee";

test("navigates to Dashboard", () => {
    render(
        <MemoryRouter initialEntries={["/dashboard"]}>
            <Routes>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </MemoryRouter>
    );
});

test("navigates to Add Employee Form", () => {
    render(
        <MemoryRouter initialEntries={["/add-employee"]}>
            <Routes>
                <Route path="/add-employee" element={<AddEmployee/>}/>
            </Routes>
        </MemoryRouter>
    );
});
