import React, { useEffect, useRef, useState } from "react";
import { LoadingState } from "../../types";
import { AppState } from "../../redux/module";
import { useSelector } from "react-redux";

// useLoading: loadingStateとloadingが終わったかどうかを返す
export const useLoading = (
	targetState: LoadingState,
	callback: (nowLoading: boolean, finishLoading: boolean) => void
) => {
	const isLoading: boolean = useSelector(
		(state: AppState) => state.App.Loading.IsLoading
	);

	const loadingState = useSelector(
		(state: AppState) => state.App.Loading.LoadingState
	)


	var finishLoading: boolean = false
	var nowLoading: boolean = (targetState === loadingState) && isLoading
	const prevIsLoading: boolean = Boolean(usePrevious(isLoading));

	console.log("lodang", prevIsLoading)

	useEffect(() => {
		const isCorrectState = (targetState === loadingState)
		const prevNowLoading = prevIsLoading
		console.log("prev", nowLoading, prevNowLoading)
		// nowLoadingがtrueだった、かつloadingが終了し、stateが等しい
		finishLoading =
			!isLoading && prevNowLoading && isCorrectState

		// loading中かつstateが等しい
		nowLoading = isCorrectState && isLoading

		console.log("next", nowLoading, prevNowLoading)

		callback(nowLoading, finishLoading)


		console.log("useeffect: ", nowLoading, finishLoading)
	}, [isLoading, loadingState]);

}

function usePrevious(value: any) {
	const ref: any = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
