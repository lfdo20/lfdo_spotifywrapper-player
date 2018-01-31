const albumTraks = document.getElementById('albumtracks');
let audioObject = null;

/* eslint no-undef: 0 */

export default function playTrigger() {
  albumTraks.addEventListener('click', (e) => {
    const target = e.target.parentNode;

    if (target.classList.contains('active')) {
      audioObject.pause();
    } else {
      if (audioObject) {
        audioObject.pause();
      }

      audioObject = new Audio(target.getAttribute('data-track-preview'));
      audioObject.play();
      target.classList.add('active');
      audioObject.addEventListener('pause', () => {
        target.classList.remove('active');
      });
    }
  });
}
