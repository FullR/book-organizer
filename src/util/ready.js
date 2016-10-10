let ready;

if(window._isCordova) {
  ready = new Promise((resolve) => {
    document.addEventListener("deviceready", resolve, {once: true}, false)
  });
} else {
  ready = new Promise((resolve) => {
    window.addEventListener("load", resolve, {once: true}, false);
  });
}

export default ready;
