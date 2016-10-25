import localforage from "localforage";

const storage = localforage.createInstance({
  name: "io.github.fullr.book-organizer-dev2"
});

export default storage;
