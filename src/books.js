import superagentCache from "superagent-cache";
import querystring from "querystring";

const request = superagentCache();
const defaultOptions = {
  startIndex: 0,
  maxResults: 10,
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

function search(query, options) {
  return new Promise((resolve, reject) => {
    request
      .get(createSearchURL(query, options))
      .end((error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result.body);
        }
      });
  });
}

function lookup(bookId) {
  return new Promise((resolve, reject) => {
    request
      .get(createLookupURL(bookId))
      .end((error, result) => {
        if(error) {
          reject(error);
        } else {
          resolve(result.body);
        }
      });
  });
}

export default {search, lookup};
