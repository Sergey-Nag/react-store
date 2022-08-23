import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { DropdownButton, DropdownButtonProps } from "../../../src/components/dropdown-button/dropdown-button";

const renderWithItems = (rest?: DropdownButtonProps) => render(
  <DropdownButton {...rest}>
    <div>Test item 1</div>
    <div>Test item 2</div>
    Test text 3
  </DropdownButton>
);

describe('Dropdown button', () => {
  it('Should initially render component without nested items', () => {
    const { asFragment } = renderWithItems();

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should render component with nested elements to which the menuitem class has been passed', () => {
    const { asFragment } = renderWithItems();

    fireEvent.click(screen.getByRole('button'));

    expect(asFragment()).toMatchSnapshot();
  });

  it('Should opend dropdown with nested elements when button is clicked and close after clicking outside', async () => {
    renderWithItems();

    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button'));
    
    await waitFor(() => {
      expect(screen.getAllByRole('menuitem')).toHaveLength(2);
    });

    await waitFor(() => {
      expect(screen.getByText('Test text 3')).toBeInTheDocument();
    });

    fireEvent.click(document.body);

    await waitFor(() => {
      expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
    });
  });

  it('Should change button name if related prop passed', () => {
    renderWithItems({ text: 'Dropdown' });

    expect(screen.getByRole('button', { name: 'Dropdown' })).toBeInTheDocument();
  });
});