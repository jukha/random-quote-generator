import React, { useState, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { FaLongArrowAltRight } from "react-icons/fa";

const randomQuote = "https://quote-garden.herokuapp.com/api/v3/quotes/random";
const Quote = () => {
  const [quoteObj, setQuoteObj] = useState([]);
  const [url, setUrl] = useState(randomQuote);

  const [isLoading, setIsLoading] = useState(true);
  const [author, setAuthor] = useState("");
  const [hideButton, setHideButton] = useState(false);
  const [showAuthor, setShowAuthor] = useState(false);

  const getQuotes = async () => {
    const response = await fetch(url);
    const randomQuote = await response.json();
    setQuoteObj(randomQuote.data);

    const quoteArray = randomQuote.data[0];

    setQuoteObj(randomQuote.data);

    setAuthor(quoteArray.quoteAuthor);

    setIsLoading(false);
  };

  const loadMoreQuotes = () => {
    setUrl(
      `https://quote-garden.herokuapp.com/api/v3/quotes/random?author=${author}&count=3`,
    );
  };

  useEffect(() => {
    getQuotes();
  }, [url]); //triggers re-render as url changed
  return (
    <>
      <div
        className="random-btn"
        onClick={() => {
          setQuoteObj([]);
          setUrl(randomQuote);
          getQuotes();
          setHideButton(false);
          setIsLoading(true);
          setShowAuthor(false);
        }}
      >
        <span>random</span>
        <FiRefreshCcw className="btn" />
      </div>
      {isLoading && <h3 className="loading">Loading...</h3>}
      {showAuthor && <h2 className="author-header">{author}</h2>}
      {!isLoading &&
        quoteObj.map((quote, index) => {
          const { quoteText, quoteAuthor, quoteGenre } = quote;
          return (
            <div key={index}>
              <div className="quote">{quoteText}</div>
              {!hideButton && (
                <div className="wrapper">
                  <div className="quote--info">
                    <h3 className="quote__author">{quoteAuthor}</h3>
                    <p className="quote__genre">{quoteGenre}</p>
                  </div>
                  <FaLongArrowAltRight
                    className="arrow"
                    onClick={() => {
                      loadMoreQuotes();
                      setHideButton(true);
                      setShowAuthor(true);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
    </>
  );
};

export default Quote;
