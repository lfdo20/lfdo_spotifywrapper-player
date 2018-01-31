import spotify from './Spotify';
import renderAlbums from './Albumlist';

/* eslint no-undef: 0 */

const searchInput = document.getElementById('form-input');
const searchForm = document.getElementById('search-form');
const albumlistElement = document.getElementById('albumlist');

export default function searchAlbumTrigger() {
  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const albums = spotify.search.album(searchInput.value);

    albums
      .then(data => renderAlbums(data.albums.items, albumlistElement),
      );
  });
}
