import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from "./searchable-layout.module.css";

export default function SearchableLayout({children}: {children: ReactNode}) {

    const router = useRouter();
    const [search, setSearch] = useState("");

    const q = router.query.q as string;

    // 새로고침해도 search 값 유지
    useEffect(() => {
        setSearch(q || "");
    }, [q])

    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onSubmit = () => {
        if(!search || q === search) return;
        router.push(`/search?q=${search}`);
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter") {
            onSubmit();
        }
    }

    return (
        <div>
            <div className={style.search_container}>
                <input
                    value={search}
                    onKeyDown={onKeyDown}
                    onChange={onChangeSearch}
                    placeholder="검색어를 입력하세요 ..."
                />
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    )
}