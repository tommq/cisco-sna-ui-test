import {fireEvent, render, screen} from "@testing-library/react";
import React from "react";
import AddEmployeeForm from "./AddEmployeeForm";
import {MemoryRouter} from "react-router-dom";

test('renders without crashing', () => {
    render(
        <MemoryRouter initialEntries={["/add-employee"]}>
            <AddEmployeeForm setEmployeeData={(() => {})}/>
        </MemoryRouter>
    );
});
