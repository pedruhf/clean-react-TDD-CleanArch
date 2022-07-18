import { httpPostParams, HttpGetParams } from "@/data/protocols/http";
import { AxiosHttpClient } from "./axios-http-client";
import { faker } from "@faker-js/faker";
import axios from "axios";

jest.mock("axios");
const  mockedAxios = axios as jest.Mocked<typeof axios>;
const mockHttpResponse = {
  data: JSON.parse(faker.datatype.json()),
  status: faker.datatype.number(),
};
mockedAxios.post.mockResolvedValue(mockHttpResponse);
mockedAxios.get.mockResolvedValue(mockHttpResponse);

const mockPostRequest = (): httpPostParams => ({
  url: faker.internet.url(),
  body: JSON.parse(faker.datatype.json()),
});

const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
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
        statusCode: mockHttpResponse.status,
        body: mockHttpResponse.data
      })
    });
  
    test('should return correct error on axios.post failure', async () => {
      const sut = makeSut();
      mockedAxios.post.mockRejectedValueOnce({
        response: mockHttpResponse,
      });
      const postPromise = await sut.post(mockPostRequest());
      expect(postPromise).toEqual({
        statusCode: mockHttpResponse.status,
        body: mockHttpResponse.data
      })
    });
  });

  describe('Get', () => {
    test('should call axios.get with correct values', async () => {
      const sut = makeSut();
      const request = mockGetRequest();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url);
    });
  });
});
