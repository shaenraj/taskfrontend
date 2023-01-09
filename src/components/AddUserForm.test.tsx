import { render, screen } from '@testing-library/react';
import AddUserForm from './AddUserForm';

describe("AddUserForm", () => {
  test("renders correctly", () => {
    render(<AddUserForm />);

    const firstNameLabelElement = screen.getByText(/first name/i);
    expect(firstNameLabelElement).toBeInTheDocument();

    const lastNameLabelElement = screen.getByText(/last name/i);
    expect(lastNameLabelElement).toBeInTheDocument();

    const birthDateLabelElement = screen.getByText(/date of birth/i);
    expect(birthDateLabelElement).toBeInTheDocument();

    const genderLabelElement = screen.getByText(/gender/i);
    expect(genderLabelElement).toBeInTheDocument();

    const submitButtonElement = screen.getByRole('button', {
      name: /submit/i
    });
    expect(submitButtonElement).toBeInTheDocument();

    const nameInputElement = screen.getAllByRole("textbox");
    expect(nameInputElement).toHaveLength(2);

    const genderInputElement = screen.getByRole('combobox');
    expect(genderInputElement).toBeInTheDocument();
  });
})