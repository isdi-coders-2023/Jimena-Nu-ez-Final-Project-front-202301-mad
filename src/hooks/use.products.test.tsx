/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/no-unnecessary-act */
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { Product } from "../models/product";
import { ProductsRepo } from "../services/products/products.api.repo";
import { store } from "../store/store";
import { useProducts } from "./use.products";

jest.mock("../firebase/firebase-user");
describe("Given the useProducts Custom Hook, an ApiRepo and a given component", () => {
  let mockInfo: Product;

  let mockRepo = {
    getAll: jest.fn(),
    getByTag: jest.fn(),
    getById: jest.fn(),
    patch: jest.fn(),
    post: jest.fn(),
    delete: jest.fn(),
  } as unknown as ProductsRepo;

  beforeEach(async () => {
    mockInfo = {
      email: "test",
      password: "test",
    } as unknown as Product;
    const mockFile = new File(["image"], "test.jpg");

    const mockId = "id";

    const TestComponent = function () {
      const {
        productsGetAll,
        productsGetById,
        productPatch,
        productPost,
        productDelete,
      } = useProducts(mockRepo);

      return (
        <>
          <button onClick={() => productsGetAll()}>getAll</button>
          <button onClick={() => productsGetById(mockId)}>getById</button>
          <button
            onClick={() => productPatch(mockInfo, mockFile, "image", "token")}
          >
            patch
          </button>
          <button onClick={() => productPost(mockInfo, mockFile, "token")}>
            post
          </button>
          <button onClick={() => productDelete(mockId, "token")}>delete</button>
        </>
      );
    };
    await act(() =>
      render(
        <Provider store={store}>
          <TestComponent></TestComponent>
        </Provider>
      )
    );
  });
  describe("When the TestComponent is rendered", () => {
    test("Then, the button must be in the document", async () => {
      const elements = await screen.findAllByRole("button");
      expect(elements[0]).toBeInTheDocument();
    });
  });

  describe("When the TestComponent is showed and the GetAll button is clicked", () => {
    test("Then, the productsGetAll method and the dispatch method should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => {
        await fireEvent.click(elements[0]);
      });
      expect(mockRepo.getAll).toHaveBeenCalled();
    });
  });

  describe("When we render the TestComponent and we click the getById button", () => {
    test("Then, the productsgetById function should be called", async () => {
      const buttons = await screen.findAllByRole("button");
      await act(async () => {
        await fireEvent.click(buttons[1]);
      });
      expect(mockRepo.getById).toHaveBeenCalled();
    });
  });

  describe("When the Patch button is clicked", () => {
    test("Then, the Patch function should have been called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => {
        await fireEvent.click(elements[2]);
        expect(mockRepo.patch).toHaveBeenCalled();
      });
    });
  });

  describe("When the Post is showed and the GetAll button is clicked", () => {
    test("Then, the Post method should be called", async () => {
      const elements = await screen.findAllByRole("button");
      await act(async () => {
        await fireEvent.click(elements[3]);
      });
      expect(mockRepo.post).toHaveBeenCalled();
    });
  });

  describe("When the delete button is clicked", () => {
    test("Then, the Delete function should have been called", async () => {
      const elements = await screen.findAllByRole("button");
      await fireEvent.click(elements[4]);
      expect(mockRepo.delete).toHaveBeenCalled();
    });
  });
});
