import localforage from "localforage";

const storage = localforage.createInstance({
  name: "io.github.fullr.book-organizer"
});

export default storage;
