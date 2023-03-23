import { getDownloadURL } from "firebase/storage/dist/storage";
import { newImage } from "./firebase-user";

jest.mock("firebase/storage");

describe("Given the firebase app", () => {
  describe("When there is a new uploaded file", () => {
    test("Then it should contain two elements and get a URL", async () => {
      const mockInfo = { id: "2", avatar: "123" };
      const mockFile = new File(["festival"], "festivalFile", {});
      await newImage(mockInfo, mockFile);
      expect(getDownloadURL).toHaveBeenCalled();
    });
  });
});
