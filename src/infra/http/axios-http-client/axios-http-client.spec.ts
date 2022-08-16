import axios from "axios";

import { AxiosHttpClient } from "./axios-http-client";
import { mockHttpRequest } from "@/data/test";
import { mockAxios, mockHttpResponse } from "@/infra/test";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient;
  mockedAxios: jest.Mocked<typeof axios>;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return {
    sut,
    mockedAxios,
  };
};

describe('AxiosHttpClient', () => {
  test('should call axios with correct values', async () => {
    const request = mockHttpRequest();
    const { sut, mockedAxios } = makeSut();
    await sut.request(request);
    expect(mockedAxios.request).toHaveBeenCalledWith({
      url: request.url,
      method: request.method,
      data: request.body,
      headers: request.headers,
    });
  });

  test('should return correct response on axios', async () => {
    const { sut, mockedAxios } = makeSut();
    const httpResponse = await sut.request(mockHttpRequest());
    const axiosResponse = await mockedAxios.request.mock.results[0].value;
    expect(httpResponse).toEqual({
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    });
  });

  test('should return correct error on axios failure', () => {
    const { sut, mockedAxios } = makeSut();
    mockedAxios.request.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const requestPromise = sut.request(mockHttpRequest());
    expect(requestPromise).toEqual(mockedAxios.request.mock.results[0].value);
  });
});
