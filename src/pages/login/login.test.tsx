/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter as Router } from "react-router-dom";
import Login from "./login";
import { UserRepo } from "../../services/users/users.api.repo.js";
import userEvent from "@testing-library/user-event";
import { useUsers } from "../../hooks/use.users";

jest.mock("../../hooks/use.users");

describe("Given Login component", () => {
  beforeEach(async () => {
    act(() => {
      (useUsers as jest.Mock).mockReturnValue({ login: jest.fn() });
    });
    render(
      <Provider store={store}>
        <Router>
          <Login></Login>
        </Router>
      </Provider>
    );
  });

  describe("When the component is rendered", () => {
    test("Then the heading <h2> should be in the document", () => {
      const element = screen.getAllByRole("heading");
      expect(element[0]).toBeInTheDocument();
    });
  });

  test("Then the <input> should be in the document", () => {
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toBeInTheDocument();
  });

  test("Then the <button> should be in the document", () => {
    const element = screen.getByRole("button");
    expect(element).toBeInTheDocument();
  });

  describe("When the submit button is clicked", () => {
    test("Then, the handleSubmit function should be called", async () => {
      const usersMockRepo = {} as unknown as UserRepo;
      const inputs = screen.getAllByRole("textbox");
      await userEvent.type(inputs[0], "test");
      await userEvent.type(inputs[1], "test");
      const button = screen.getByRole("button");
      await userEvent.click(button);
      expect(useUsers(usersMockRepo).login).toHaveBeenCalledWith({
        email: "test",
        password: "test",
      });
    });
  });
});
