import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
      channelId: null,
      channelName:null,
  },
  reducers: {
    setChannel: (state,action) => {
      state.channelId = action.payload.id;
      state.channelName=action.payload.name
    },
  },
});

export const { setChannel } = appSlice.actions;

export const selectChannelId = state => state.app.channelId;
export const selectChannelName = state => state.app.channelName;

export default appSlice.reducer;
