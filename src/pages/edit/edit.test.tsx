/* eslint-disable testing-library/no-unnecessary-act */
import { act, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../../store/store";
import Edit from "./edit";

describe("Given the Cart component", () => {
  describe("When it is rendered", () => {
    test("Then it should appear in the document", async () => {
      await act(async () => {
        render(
          <Provider store={store}>
            <MemoryRouter>
              <Edit></Edit>
            </MemoryRouter>
          </Provider>
        );
      });
      const title = screen.getByRole("heading");
      expect(title).toBeInTheDocument();
    });
  });
});
