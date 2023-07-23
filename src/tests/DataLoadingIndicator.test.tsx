import {render, screen, waitForElementToBeRemoved} from "@testing-library/react";
import React from "react";
import App from "../App";

test("shows loader on dashboard page", async () => {

    const mockResponse = Promise.resolve({
        json: () => new Promise((resolve) => setTimeout(() => resolve([{
            "name": "Mike Potts",
            "jobTitle": "CEO",
            "tenure": "5",
            "gender": "Male"
        }]), 200)),
    });

    // Tell TypeScript that fetch might be a mock function
    const mockFetch = jest.spyOn(global, 'fetch').mockImplementation(() => mockResponse as any);

    render(<App/>);

    expect(screen.getByTestId("dashboard-loader")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId("dashboard-loader"));

    mockFetch.mockRestore();
});

