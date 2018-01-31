/* eslint no-param-reassign: 0 */

export function convertHuman(duration) {
  let s = parseInt((duration / 1000) % 60, 10);
  s = s < 10 ? `0${s}` : `${s}`;
  const m = parseInt((duration / (1000 * 60)) % 60, 10);
  return `${m}:${s}`;
}

function createMarkup(data) {
  return data.map(track =>
    `
    <div class="music" data-track-preview="${track.preview_url}">
      <p class="music-number">${track.track_number}</p>
      <p class="music-title">${track.name}</p>
      <p class="music-duration">${convertHuman(track.duration_ms)}</p>
    </div>`).join('');
}
// convertHuman(track.duration_ms)

export function renderTracks(data, element) {
  const markup = createMarkup(data);
  element.innerHTML = markup;
}
