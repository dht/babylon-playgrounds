// NOTE: Read chrome-script.md for instructions on how to use this script

(function () {
  let all = {},
    sameSizeCount = 0;

  function collectLinks() {
    const links = [...document.querySelectorAll('a')];
    links
      .filter((a) => (a.href ?? '').startsWith('https://playground'))
      .forEach((a) => {
        all[a.href] = true;
      });
  }

  function scrollAndCollect() {
    let lastHeight = 0;

    const interval = setInterval(() => {
      collectLinks();
      window.scrollBy(0, window.innerHeight);

      const newHeight = document.body.scrollHeight;

      console.log(newHeight, Object.keys(all).length);

      if (newHeight === lastHeight) {
        sameSizeCount++;

        if (sameSizeCount > 10) {
          clearInterval(interval);
          console.log(JSON.stringify(Object.keys(all), null, 2));
        }
      } else {
        sameSizeCount = 0;
      }

      lastHeight = newHeight;
    }, 300); // Adjust this value as needed for scrolling speed
  }

  scrollAndCollect();
})();
