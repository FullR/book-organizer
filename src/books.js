import request from "request";
import querystring from "querystring";

const defaultOptions = {
  // key: "AIzaSyCCC4OUZavrfMRLX4Be4jGYKL5QUFuNVsc",
  startIndex: 0,
  maxResults: 40,
  printType: "all",
  orderBy: "relevance",
  langRestrict: "en"
};
const bookCache = {};

function createSearchURL(query, options) {
  return `https://www.googleapis.com/books/v1/volumes?${querystring.encode(Object.assign({}, defaultOptions, options, {q: query}))}`;
}

function createLookupURL(bookId) {
  return `https://www.googleapis.com/books/v1/volumes/${bookId}`;
}

function cacheBook(book) {
  bookCache[book.id] = book;
  return book;
}

function search(query, options) {
  return new Promise((resolve, reject) => {
    request
      .get(createSearchURL(query, options))
      .end((error, result) => {
        if(error) {
          reject(error);
        } else {
          result.body.items.forEach(cacheBook);
          resolve(result.body);
        }
      });
  });
}

function lookup(bookId) {
  if(isCached(bookId)) return Promise.resolve(getCachedBook(bookId));

  return new Promise((resolve, reject) => {
    request
      .get(createLookupURL(bookId))
      .end((error, result) => {
        if(error) {
          reject(error);
        } else {
          cacheBook(result.body);
          resolve(result.body);
        }
      });
  });
}

function isCached(bookId) {
  return bookId in bookCache;
}

function getCachedBook(bookId) {
  return bookCache[bookId];
}

export default {search, lookup, isCached, getCachedBook};
