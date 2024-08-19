import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppBarTitle } from "../reducers/appSlice";

export const useChangeAppTitle = (title: string) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setAppBarTitle(title));
  }, [dispatch, title]);
};
