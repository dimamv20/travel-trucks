import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCampersApi,
  fetchCamperByIdApi,
} from "../../services/api";

export const fetchCampers = createAsyncThunk(
  "campers/fetchAll",
  async (_, thunkAPI) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      return await fetchCampersApi();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperById = createAsyncThunk(
  "campers/fetchById",
  async (id, thunkAPI) => {
    try {
      return await fetchCamperByIdApi(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);