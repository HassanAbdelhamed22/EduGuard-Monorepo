import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProfile } from "../../services/authService";
import toast from "react-hot-toast";

// Async thunk to fetch profile
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getProfile();
      if (data?.profile_picture) {
        data.profile_picture = `http://127.0.0.1:8000/storage/${
          data.profile_picture
        }?${new Date().getTime()}`;
      }
      return data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Error fetching profile");
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  profile: {
    name: "",
    email: "",
    phone: "",
    address: "",
    profile_picture: null,
  },
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
