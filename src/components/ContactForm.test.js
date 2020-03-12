import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ContactForm from "../components/ContactForm.js";

test("renders ContactForm without crashing", () => {
  render(<ContactForm />);
});

test("all form fields render", () => {
  const { getByLabelText } = render(<ContactForm />);

  getByLabelText(/first name*/i);
  getByLabelText(/last name*/i);
  getByLabelText(/email*/i);
  getByLabelText(/message/i);
});

test("form data displayed", () => {
  const { getByLabelText, getByTestId } = render(<ContactForm />);

  // const body = document.querySelector('body');

  const firstName = getByLabelText(/first name*/i);
  const lastName = getByLabelText(/last name*/i);
  const email = getByLabelText(/email*/i);
  const submit = getByTestId(/form/i);

  fireEvent.change(firstName, {
    target: { name: "firstName", value: "steve" }
  });
  fireEvent.change(lastName, {
    target: { name: "lastName", value: "johnson"}
  });
  fireEvent.change(email, {
    target: { name: "email", value: "test@email.com"}
  });
  fireEvent.click(submit);


});

test("errors when submit with empty fields", () => {
  const { getByTestId, findAllByText } = render(<ContactForm />);

  const form = getByTestId(/form/i);
  
  fireEvent.click(form);

  expect(findAllByText(/error/i)).toBeInTheDocument();
});
