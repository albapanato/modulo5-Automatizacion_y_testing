import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Async } from "./async.jsx";

describe("first", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ title: "sample data" }),
    });
  });
  test("The component renders the obtained data", async () => {
    render(<Async />);
    const buttonElement = screen.getByText(/Obtener datos/i);
    fireEvent.click(buttonElement);
    const textElement = await screen.findByText(/sample data/i);
    expect(textElement).toBeInTheDocument();
  });
});
