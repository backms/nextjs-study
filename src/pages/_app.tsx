import "@/styles/globals.css";
import type { AppProps } from "next/app";
import GlobalLayout from "@/components/global-layout";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import {NextPage} from "next";

type NextPageWithLayout = NextPage & {
    getLayout? : (page: ReactNode) => ReactNode;
}

export default function App({ Component, pageProps }: AppProps & { Component: NextPageWithLayout }) {

    const getLayout = Component.getLayout ?? ((page: ReactNode)=>page); // getLayout 없는 컴포넌트에서 에러 발생방지를 위한 예외처리

    return (
        <GlobalLayout>
            {getLayout(<Component {...pageProps} />)}
        </GlobalLayout>
    );
}
