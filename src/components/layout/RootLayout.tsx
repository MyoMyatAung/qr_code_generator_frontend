import { Outlet } from "react-router-dom";
import Header from "../shared/Header";
import SideMenu from "../shared/SideMenu";
import { useGetMeQuery } from "../../reducers/apiSlice";
import { useProtectedRouteWrapper } from "../../hooks/useCheckAuth";

const RootLayout = () => {

    useProtectedRouteWrapper();
    const { data, isSuccess } = useGetMeQuery();

    return (
        <>
            <Header />
            <div className="flex w-screen h-screen">
                {isSuccess && !!data && (
                    <SideMenu role={"Admin"} username={data.username} />
                )}
                <section className="flex-1 w-screen overflow-scroll overflow-x-hidden bg-gray-100">
                    <main className="p-2 mt-12">
                        <Outlet />
                    </main>
                </section>
            </div>
        </>
    );
};

export default RootLayout;
