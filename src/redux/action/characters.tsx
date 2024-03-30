/**
 * This is hold all apis calls which is used in characters
 */
import {createAsyncThunk} from '@reduxjs/toolkit';
import {useAxios} from '../../api/apiClient';
import {Api, ApiBaseUrl, ApiConstants} from '../../utils/ApiConstants';

export const getCharacters = createAsyncThunk(
  'getCharacters',
  async (pageNumber: number) => {
    const apiURL =
      ApiBaseUrl + ApiConstants.characters + ApiConstants.page + pageNumber; // here we can append api contants of that perticular api
    const response = await useAxios({
      method: Api.GET,
      url: apiURL,
    });
    return response;
  },
);

export const getLocation = createAsyncThunk(
  'getLocation',
  async (url: string) => {
    const apiURL = url;
    const response = await useAxios({
      method: Api.GET,
      url: apiURL,
    });
    return response;
  },
);

export const getOrigin = createAsyncThunk('getOrigin', async (url: string) => {
  const apiURL = url;
  const response = await useAxios({
    method: Api.GET,
    url: apiURL,
  });
  return response;
});

export const getEpisode = createAsyncThunk(
  'getEpisode',
  async (ids: string) => {
    const apiURL = ApiBaseUrl + ApiConstants.episode + ids;
    const response = await useAxios({
      method: Api.GET,
      url: apiURL,
    });
    return response;
  },
);
