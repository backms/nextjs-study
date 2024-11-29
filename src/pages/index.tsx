// CSS Module
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode, useEffect} from "react";
import books from '@/mock/books.json';
import BookItem from "@/components/book-item";
import {InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";   // @ 는 src 를 가르킴.

// 서버 사이드 함수를 생성함으로써 서버 사이드 렌더링 가능.
export const getServerSideProps = async() => {

    // 직렬 조회
    // const allBooks = await fetchBooks();
    // const recoBooks = await fetchRandomBooks();

    // 병렬 조회
    const [allBooks, recoBooks] = await Promise.all([
        fetchBooks(),
        fetchRandomBooks(),
    ]);

    return {
        props: {    // 반드시 props 객체에 데이터를 담아서 리턴해야함.
            allBooks,
            recoBooks,
        }
    }
};

export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getServerSideProps>) {

  return (
      <div className={style.container}>
          <section>
              <h3>지금 추천하는 도서</h3>
              {recoBooks.map(book => (
                  <BookItem key={book.id} {...book} />
              ))}
          </section>
          <section>
              <h3>등록된 모든 도서</h3>
              {allBooks.map(book => (
                  <BookItem key={book.id} {...book} />
              ))}
          </section>
      </div>
  )
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
};
