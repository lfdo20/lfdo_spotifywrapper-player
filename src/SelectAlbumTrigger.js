import spotify from './Spotify';
import renderInfo from './Albuminfo';
import { renderTracks } from './Albumtracks';

/* eslint no-undef: 0 */

const albuminfoElement = document.getElementById('albuminfo');
const albumtracksElement = document.getElementById('albumtracks');
const albumlistElement = document.getElementById('albumlist');

export default function selectAlbumTrigger() {
  albumlistElement.addEventListener('click', (e) => {
    const target = e.target;
    const albuminfo = spotify.album.getAlbum(target.getAttribute('data-album-id'));

    albuminfo
      .then(data => renderInfo(data, albuminfoElement))
      .then((data) => {
        renderTracks(data.tracks.items, albumtracksElement);
      });
  });
}
