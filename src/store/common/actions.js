import { SHOW_PROGRESS, STOP_PROGRESS } from "./actionTypes";

export const showProgress = ()=>({
    type: SHOW_PROGRESS
});

export const stopProgress = ()=>({
    type: STOP_PROGRESS
});
