import request from "request";
import querystring from "querystring";

const defaultOptions = {
  // key: "AIzaSyCCC4OUZavrfMRLX4Be4jGYKL5QUFuNVsc",
  startIndex: 0,
  maxResults: 20,
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

export function search(query, options) {
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

export function lookup(bookId) {
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

export function lookupByISBN(isbn) {
  log(`lookupByISBN started ${isbn}`);
  return new Promise((resolve) => {
    request
      .get(`https://www.googleapis.com/books/v1/volumes?q=isbn=${isbn}`)
      .end((error, result) => {
        if(error) {
          reject(error);
        } else {
          log("lookupByISBN result", result);
          if(result.body && result.body.items && result.body.items.length) {
            cacheBook(result.body.items[0]);
            resolve(result.body.items[0]);
          }
        }
      })
  });
}

export function isCached(bookId) {
  return bookId in bookCache;
}

export function getCachedBook(bookId) {
  return bookCache[bookId];
}

export default {search, lookup, isCached, getCachedBook, lookupByISBN};
