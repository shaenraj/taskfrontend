import { render, screen } from "@testing-library/react";
import Navbar from './Navbar';
import { BrowserRouter } from 'react-router-dom';

describe("Navbar", () => {
  test("renders correctly", () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const companyNameElement = screen.getByText("The Psychometrics Centre");
    expect(companyNameElement).toBeInTheDocument();

    const usersNavElement = screen.getByText("Users");
    expect(usersNavElement).toBeInTheDocument();

    const addUserNavElement = screen.getByText("Add User");
    expect(addUserNavElement).toBeInTheDocument();
  })
});