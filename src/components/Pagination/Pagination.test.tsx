import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination } from ".";

test("all buttons work correctly", () => {
  const onPageChange = jest.fn();
  const { getByText } = render(
    <Pagination current={3} total={5} onPageChange={onPageChange} />
  );

  expect(getByText(/page 3 of 5/i)).toBeVisible();

  userEvent.click(getByText(/first/i));

  expect(onPageChange).toHaveBeenLastCalledWith(1);

  userEvent.click(getByText(/previous/i));

  expect(onPageChange).toHaveBeenLastCalledWith(2);

  userEvent.click(getByText(/next/i));

  expect(onPageChange).toHaveBeenLastCalledWith(4);

  userEvent.click(getByText(/last/i));

  expect(onPageChange).toHaveBeenLastCalledWith(5);
  expect(onPageChange).toHaveBeenCalledTimes(4);
});

test("First and Previous buttons are not rendered if current page is the first one", () => {
  const { queryByText, getByText } = render(
    <Pagination current={1} total={5} onPageChange={jest.fn} />
  );

  expect(queryByText(/first/i)).not.toBeInTheDocument();
  expect(queryByText(/previous/i)).not.toBeInTheDocument();
  expect(getByText(/page 1 of 5/i)).toBeVisible();
  expect(getByText(/next/i)).toBeVisible();
  expect(getByText(/last/i)).toBeVisible();
});

test("Next and Last buttons are not rendered if current page is the last one", () => {
  const { getByText, queryByText } = render(
    <Pagination current={5} total={5} onPageChange={jest.fn} />
  );

  expect(getByText(/first/i)).toBeVisible();
  expect(getByText(/previous/i)).toBeVisible();
  expect(getByText(/page 5 of 5/i)).toBeVisible();
  expect(queryByText(/next/i)).not.toBeInTheDocument();
  expect(queryByText(/last/i)).not.toBeInTheDocument();
});
