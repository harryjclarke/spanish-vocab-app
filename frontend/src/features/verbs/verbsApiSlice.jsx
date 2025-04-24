import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const verbsAdapter = createEntityAdapter({});

const initialState = verbsAdapter.getInitialState();

export const verbsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVerbs: builder.query({
      query: () => ({
        url: "/verbs",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        const loadedVerbs = responseData.map((verb) => {
          verb.id = verb._id;
          return verb;
        });
        return verbsAdapter.setAll(initialState, loadedVerbs);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Verb", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Verb", id })),
          ];
        } else return [{ type: "Verb", id: "LIST" }];
      },
    }),
    addNewVerb: builder.mutation({
      query: (initialVerbData) => ({
        url: "/verbs",
        method: "POST",
        body: {
          ...initialVerbData,
        },
      }),
      invalidatesTags: [{ type: "Verb", id: "LIST" }],
    }),
    updateVerb: builder.mutation({
      query: (initialVerbData) => ({
        url: "/verbs",
        method: "PATCH",
        body: {
          ...initialVerbData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Verb", id: arg.id }],
    }),
    deleteVerb: builder.mutation({
      query: ({ id }) => ({
        url: `/verbs`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Verb", id: arg.id }],
    }),
  }),
});

export const {
  useGetVerbsQuery,
  useAddNewVerbMutation,
  useUpdateVerbMutation,
  useDeleteVerbMutation,
} = verbsApiSlice;

// returns the query result object
export const selectVerbsResult = verbsApiSlice.endpoints.getVerbs.select();

// creates memoized selector
const selectVerbsData = createSelector(
  selectVerbsResult,
  (verbsResult) => verbsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllVerbs,
  selectById: selectVerbById,
  selectIds: selectVerbIds,
  // Pass in a selector that returns the verbs slice of state
} = verbsAdapter.getSelectors(
  (state) => selectVerbsData(state) ?? initialState
);
