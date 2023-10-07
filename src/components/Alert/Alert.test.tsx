import { render, screen } from "@testing-library/react";

import AlertComponent from "./Alert";

describe("Alert Component", () => {
  test("Alert Component renders", () => {
    render(<AlertComponent text="test" />);

    expect(screen.getByText("test")).toBeInTheDocument();
  });

  test("Alert Component snapshot", () => {
    const view = render(<AlertComponent text="test" />);

    expect(view).toMatchSnapshot();
  });
});
