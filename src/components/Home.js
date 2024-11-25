import React, { useState, useEffect } from 'react';
import MovieComponent from './MovieComponent'
import Loading from './Loading';

export default function Home() {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getCardData = async () => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`);
    const data = await res.json();
    setCard((prev) => [...prev, ...data]);
    setLoading(false);
  };

  const handleInfiniteScroll = () => {
    try {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.scrollHeight) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCardData();
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleInfiniteScroll);
    return () => window.removeEventListener('scroll', handleInfiniteScroll);
  }, [])

  return (
    <>
      <MovieComponent movieInfo={card} />
      {loading && <Loading />}
    </>
  )
}
