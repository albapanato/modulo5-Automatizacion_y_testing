import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Sample } from "./sample";

describe("sample component", () => {
  it("should render title", () => {
    render(<Sample />);
    const element = screen.getByText("Ejemplo de un componente");
    expect(element).toBeInTheDocument();
  });
});
