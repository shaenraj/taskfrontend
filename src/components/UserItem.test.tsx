import { render, screen } from '@testing-library/react';
import UserItem from './UserItem';
import user from "@testing-library/user-event";

describe("UserItem", () => {
  const userInfo = {
    id: 1234,
    birthDate: "1953-04-20",
    firstName: "Anneke",
    lastName: "Preusig",
    gender: "F" as const,
    created: "1989-06-02"
  }
  test("renders correctly", () => {
    const handleDeleteUser = jest.fn();
    render(<UserItem user={userInfo} handleDeleteUser={handleDeleteUser} />);

    const nameElement = screen.getByText(/anneke preusig/i);
    expect(nameElement).toBeInTheDocument();

    const idElement = screen.getByText(/1234/i);
    expect(idElement).toBeInTheDocument();

    const infoElement = screen.getByText(/date of birth: 1953-04-20 gender: female created: 1989-06-02/i);
    expect(infoElement).toBeInTheDocument();

    const deleteButtonElement = screen.getByRole("button");
    expect(deleteButtonElement).toBeInTheDocument();    
  });

  test("calls deleteUser function after clicking the delete button", async () => {
    user.setup();
    const handleDeleteUser = jest.fn();
    render(<UserItem user={userInfo} handleDeleteUser={handleDeleteUser} />);

    const deleteButtonElement = screen.getByRole("button");
    await user.click(deleteButtonElement);
    expect(handleDeleteUser).toHaveBeenCalledTimes(1);
  })
})