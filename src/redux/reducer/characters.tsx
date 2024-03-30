/**
 * This is Characters reducer which old data of charcters
 */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getCharacters} from '../action/characters';
import {CharacterDataModal} from '../../models/CharacterDataModal';

interface charactersSliceType {
  apiLoader: boolean;
  apiError: string;
  charactersList: CharacterDataModal[];
  totalCharactersCount: number;
}

const initialState: charactersSliceType = {
  apiLoader: false,
  apiError: '',
  charactersList: [],
  totalCharactersCount: 0,
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState: initialState,
  reducers: {
    updateApiLoader: (state, action: PayloadAction<any>) => {
      if (action?.payload?.apiLoader)
        state.apiLoader = action?.payload?.apiLoader;
      else {
        state.apiLoader = false;
      }

      if (action?.payload?.apiError) {
        state.apiError = action?.payload?.apiError;
      } else state.apiError = '';
    },
  },
  extraReducers: builder => {
    //Get charactersList--------------------------
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.apiLoader = false;
      state.apiError = '';
      if (state.charactersList?.length > 0) {
        state.totalCharactersCount = action?.payload?.info?.count;
        state.charactersList = state.charactersList.concat(
          Array.isArray(action?.payload?.results)
            ? action?.payload?.results
            : [],
        );
      } else {
        state.charactersList = Array.isArray(action?.payload?.results)
          ? action?.payload?.results
          : [];
        state.totalCharactersCount = action?.payload?.info?.count;
      }
    });
  },
});
export const {updateApiLoader} = charactersSlice.actions;
export default charactersSlice;
