import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TOAST_SEVERITY } from "../libs/constants";

interface InitialState {
    appBar: {
        title: string;
    },
    messageSnackBar: {
        isOpen: boolean;
        severity: TOAST_SEVERITY,
        message: string;
    },
    warningDialog: {
        isOpen: boolean;
        title: string;
        description: string;
    }
}

const initialState: InitialState = {
    appBar: {
        title: "Dashboard",
    },
    messageSnackBar: {
        isOpen: false,
        severity: TOAST_SEVERITY.SUCCESS, // "success" || "error" || "warning" || "info"
        message: "",
    },
    warningDialog: {
        isOpen: false,
        title: "",
        description: ""
    }
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppBarTitle: (state, action) => {
            state.appBar.title = action.payload;
        },
        openSnackbar: (state, action: PayloadAction<{ severity: TOAST_SEVERITY, message: string }>) => {
            state.messageSnackBar.isOpen = true;
            state.messageSnackBar.severity = action.payload.severity;
            state.messageSnackBar.message = action.payload.message;
        },
        closeSnackBar: (state) => {
            state.messageSnackBar = initialState.messageSnackBar;
        },
        openWarningDialog: (state, action: PayloadAction<{ title: string, description: string }>) => {
            state.warningDialog.isOpen = true;
            state.warningDialog.title = action.payload.title;
            state.warningDialog.description = action.payload.description;
        },
        closeWarningDialog: (state) => {
            state.warningDialog = initialState.warningDialog;
        },
    },
});

export const { setAppBarTitle, openSnackbar, closeSnackBar, openWarningDialog, closeWarningDialog } = appSlice.actions;
export default appSlice.reducer;
