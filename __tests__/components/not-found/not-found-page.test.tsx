import React from "react";
import { render } from "@testing-library/react";
import { NotFoundPage } from "../../../components/not-found/not-found-page";

describe('Not found page', () => {
  it('Should render the component', () => {
    const { asFragment } = render(<NotFoundPage />);

    expect(asFragment()).toMatchSnapshot();
  });
});