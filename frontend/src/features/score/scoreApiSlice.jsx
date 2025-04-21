import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const scoreAdapter = createEntityAdapter({});

const initialState = scoreAdapter.getInitialState();

export const scoreApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getScores: builder.query({
      query: (id) => ({ url: `/scores/${id}` }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedScores = responseData.map((score) => {
          score.id = score._id;
          return score;
        });
        return scoreAdapter.setAll(initialState, loadedScores);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Score", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Score", id })),
          ];
        } else return [{ type: "Score", id: "LIST" }];
      },
    }),
    addNewScore: builder.mutation({
      query: (initialScoreData) => ({
        url: "/scores",
        method: "POST",
        body: {
          ...initialScoreData,
        },
      }),
      invalidatesTags: [{ type: "Score", id: "LIST" }],
    }),
  }),
});

export const { useGetScoresQuery, useAddNewScoreMutation } = scoreApiSlice;

// returns the query result object
export const selectScoresResults = scoreApiSlice.endpoints.getScores.select();

// creates memoized selector
const selectScoresData = createSelector(
  selectScoresResults,
  (scoresResult) => scoresResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllScores,
  selectById: selectScoreById,
  selectIds: selectScoreIds,
  // Pass in a selector that returns the scores slice of state
} = scoreAdapter.getSelectors(
  (state) => selectScoresData(state) ?? initialState
);
