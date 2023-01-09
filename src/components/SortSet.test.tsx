import { render, screen } from '@testing-library/react';
import SortSet from './SortSet';

describe("SortSet", () => {
  test("renders correctly", () => {
    const setRouteParams = jest.fn();
    render(<SortSet page={0} size={20} parameter="id" sort="asc" setRouteParams={setRouteParams} />);

    const sizeLabelElement = screen.getByLabelText("Size");
    expect(sizeLabelElement).toBeInTheDocument();

    const parameterLabelElement = screen.getByLabelText("Parameter");
    expect(parameterLabelElement).toBeInTheDocument();

    const sortLabelElement = screen.getByLabelText("Sort");
    expect(sortLabelElement).toBeInTheDocument();

    const sizeInputValue = (screen.getByRole('spinbutton', {
      name: /size/i
    }) as HTMLInputElement).value;
    expect(sizeInputValue).toEqual("20");

    const parameterInputValue = (screen.getByRole('combobox', {
      name: /parameter/i
    }) as HTMLInputElement).value;
    expect(parameterInputValue).toEqual("id");

    const sortInputValue = (screen.getByRole('combobox', {
      name: /sort/i
    }) as HTMLInputElement).value;
    expect(sortInputValue).toEqual("asc");
  });
})