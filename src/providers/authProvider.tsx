// /* eslint-disable @typescript-eslint/no-unused-vars */

// "use client";

// import { useEffect, ReactNode } from "react";
// import { verifyAuth } from "@/lib/api/auth";
// import { useAuthStore } from "@/store/auth.store";
// import Loading from "@/components/loading";
// interface Props {
//   children: ReactNode;
// }

// const AuthProvider = ({ children }: Props) => {
//   const setAuth = useAuthStore((state) => state.setAuth);
//   const logout = useAuthStore((state) => state.logout);

//   useEffect(() => {

//     const restoreSession = async () => {

//       try {

//         const data = await verifyAuth();

//         if(!data) return <Loading/>
//         setAuth(data.data, data.accessToken);

//       } catch (error) {

//         logout();

//       }
//     };

//     restoreSession();

//   }, [setAuth, logout]);

//   return <>{children}</>;
// };

// export default AuthProvider;