function waitForElementToExist(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(() => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });
  });
}

function toggleSpoiler(elm) {
  elm.classList.toggle('sfdcp-revealed');
}

waitForElementToExist('#board-layout-sidebar .game-mode-top-section-name').then(elm => {
  elm.classList.add('sfdcp-spoiler');
  elm.onclick = function() { toggleSpoiler(this); };
  elm.title = 'Click to reveal title!';
});

