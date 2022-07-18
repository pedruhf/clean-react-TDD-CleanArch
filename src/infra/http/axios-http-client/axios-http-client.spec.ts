import { httpPostParams } from "@/data/protocols/http";
import { AxiosHttpClient } from "./axios-http-client";
import { faker } from "@faker-js/faker";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: JSON.parse(faker.datatype.json()),
  status: faker.datatype.number(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const mockPostRequest = (): httpPostParams => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json()),
});

const makeSut = (): AxiosHttpClient => {
  const sut = new AxiosHttpClient();
  return sut;
};

describe('AxiosHttpClient', () => {
  describe('Post', () => {
    test('should call axios.post with correct values', async () => {
      const sut = makeSut();
      const request = mockPostRequest();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });
  
    test('should return correct response on axios.post', async () => {
      const sut = makeSut();
      const httpResponse = await sut.post(mockPostRequest());
      expect(httpResponse).toEqual({
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data
      })
    });
  
    test('should return correct error on axios.post failure', async () => {
      const sut = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockedAxiosResult,
      });
      const postPromise = await sut.post(mockPostRequest());
      expect(postPromise).toEqual({
        statusCode: mockedAxiosResult.status,
        body: mockedAxiosResult.data
      })
    });
  });
});
