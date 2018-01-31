"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderInfo;
/* eslint no-param-reassign: 0 */

function renderInfo(data, element) {
  var markup = "\n      <img class=\"album-image\" src=\"" + data.images[0].url + "\" alt=\"" + data.name + "\">\n      <p class=\"album-title\">" + data.name + "</p>\n      <p class=\"album-artist\">" + data.artists[0].name + "</p>\n      <p class=\"album-counter\">" + data.tracks.total + " M\xFAsicas</p>\n    ";

  element.innerHTML = markup;
  return data;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = renderAlbums;
/* eslint no-param-reassign: 0 */

function createMarkup(data) {
  return data.map(function (album) {
    return '\n      <div class="list-item" data-album-id="' + album.id + '">\n        <img src="' + album.images[2].url + '" alt="' + album.name + '" class="list-image" data-album-id="' + album.id + '">\n        <div class="list-description" data-album-id="' + album.id + '">\n          <p class="list-title" data-album-id="' + album.id + '">' + album.name + '</p>\n          <p class="list-subtitle" data-album-id="' + album.id + '">' + album.artists[0].name + '</p>\n        </div>\n      </div>';
  }).join('');
}

function renderAlbums(data, element) {
  var markup = createMarkup(data);
  element.innerHTML = markup;
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertHuman = convertHuman;
exports.renderTracks = renderTracks;
/* eslint no-param-reassign: 0 */

function convertHuman(duration) {
  var s = parseInt(duration / 1000 % 60, 10);
  s = s < 10 ? '0' + s : '' + s;
  var m = parseInt(duration / (1000 * 60) % 60, 10);
  return m + ':' + s;
}

function createMarkup(data) {
  return data.map(function (track) {
    return '\n    <div class="music" data-track-preview="' + track.preview_url + '">\n      <p class="music-number">' + track.track_number + '</p>\n      <p class="music-title">' + track.name + '</p>\n      <p class="music-duration">' + convertHuman(track.duration_ms) + '</p>\n    </div>';
  }).join('');
}
// convertHuman(track.duration_ms)

function renderTracks(data, element) {
  var markup = createMarkup(data);
  element.innerHTML = markup;
}
'use strict';

var _SearchTrigger = require('./SearchTrigger');

var _SearchTrigger2 = _interopRequireDefault(_SearchTrigger);

var _SelectAlbumTrigger = require('./SelectAlbumTrigger');

var _SelectAlbumTrigger2 = _interopRequireDefault(_SelectAlbumTrigger);

var _PlayTrigger = require('./PlayTrigger');

var _PlayTrigger2 = _interopRequireDefault(_PlayTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _SearchTrigger2.default)();
(0, _SelectAlbumTrigger2.default)();
(0, _PlayTrigger2.default)();
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = playTrigger;
var albumTraks = document.getElementById('albumtracks');
var audioObject = null;

/* eslint no-undef: 0 */

function playTrigger() {
  albumTraks.addEventListener('click', function (e) {
    var target = e.target.parentNode;

    if (target.classList.contains('active')) {
      audioObject.pause();
    } else {
      if (audioObject) {
        audioObject.pause();
      }

      audioObject = new Audio(target.getAttribute('data-track-preview'));
      audioObject.play();
      target.classList.add('active');
      audioObject.addEventListener('pause', function () {
        target.classList.remove('active');
      });
    }
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = searchAlbumTrigger;

var _Spotify = require('./Spotify');

var _Spotify2 = _interopRequireDefault(_Spotify);

var _Albumlist = require('./Albumlist');

var _Albumlist2 = _interopRequireDefault(_Albumlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-undef: 0 */

var searchInput = document.getElementById('form-input');
var searchForm = document.getElementById('search-form');
var albumlistElement = document.getElementById('albumlist');

function searchAlbumTrigger() {
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var albums = _Spotify2.default.search.album(searchInput.value);

    albums.then(function (data) {
      return (0, _Albumlist2.default)(data.albums.items, albumlistElement);
    });
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = selectAlbumTrigger;

var _Spotify = require('./Spotify');

var _Spotify2 = _interopRequireDefault(_Spotify);

var _Albuminfo = require('./Albuminfo');

var _Albuminfo2 = _interopRequireDefault(_Albuminfo);

var _Albumtracks = require('./Albumtracks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint no-undef: 0 */

var albuminfoElement = document.getElementById('albuminfo');
var albumtracksElement = document.getElementById('albumtracks');
var albumlistElement = document.getElementById('albumlist');

function selectAlbumTrigger() {
  albumlistElement.addEventListener('click', function (e) {
    var target = e.target;
    var albuminfo = _Spotify2.default.album.getAlbum(target.getAttribute('data-album-id'));

    albuminfo.then(function (data) {
      return (0, _Albuminfo2.default)(data, albuminfoElement);
    }).then(function (data) {
      (0, _Albumtracks.renderTracks)(data.tracks.items, albumtracksElement);
    });
  });
}
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lfdoSpotifyWrapper = require('lfdo-spotify-wrapper');

var _lfdoSpotifyWrapper2 = _interopRequireDefault(_lfdoSpotifyWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var spotify = new _lfdoSpotifyWrapper2.default({
  token: 'BQAOJjMmhKhXeGcwbTEbyVtXhMKrBvwt-MzrPXOxqRhOPS_CNFWnjDs157KnE-zOEEksITdrx_hA9xbegWayHta20LlhFYbSlglxvkaABbc9MrgaESK0iYOflsXbEX8xsP376cse3poFOlRXE5o'
});

exports.default = spotify;
