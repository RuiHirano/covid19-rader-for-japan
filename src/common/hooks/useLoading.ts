import React, { useEffect, useRef } from "react";
import { LoadingState } from "../../types";
import { AppState } from "../../redux/module";
import { useSelector } from "react-redux";

function usePrevious(value: any) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

// useLoading: loadingStateとloadingが終わったかどうかを返す
export const useLoading = (
	loadingState: LoadingState
) => {
	const isLoading: boolean = useSelector(
		(state: AppState) => state.App.Loading.IsLoading
	);


	const prevIsLoading = usePrevious(isLoading);
	const prevLoadingState = usePrevious(loadingState);

	const isFinishLoading = prevIsLoading &&
		!isLoading &&
		loadingState == prevLoadingState

	return { loadingState: loadingState, isLoading: isLoading, prevIsLoading: prevIsLoading, isFinishLoading: isFinishLoading }
}
