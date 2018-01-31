import 'jsdom-global/register';
import { expect } from 'chai';
import { renderTracks, convertHuman } from '../src/Albumtracks';

/* eslint no-undef: 0 */
/* eslint quotes: 0 */
/* eslint no-unused-expressions: 0 */
/* eslint no-unused-vars: 0 */
/* eslint quote-props: 0 */


describe('Albumtracks', () => {
  const data = [
    {
      "preview_url": "https://p.scdn.co/mp3-preview/ab3d501c5ffbf560e94094f76cd36d874a26e941?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number": 1,
      "name": "Around The World",
      "duration_ms": 238733,
    },
  ];

  const data2 = [
    {
      "preview_url": "https://p.scdn.co/mp3-preview/ab3d501c5ffbf560e94094f76cd36d874a26e941?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number": 1,
      "name": "Around The World",
      "duration_ms": 238733,
    },
    {
      "preview_url": "https://p.scdn.co/mp3-preview/ab3d501c5ffbf560e94094f76cd36d874a26e941?cid=8897482848704f2a8f8d7c79726a70d4",
      "track_number": 1,
      "name": "Around The World",
      "duration_ms": 238733,
    },
  ];

  const markup =
    `
    <div class="music" data-track-preview="https://p.scdn.co/mp3-preview/ab3d501c5ffbf560e94094f76cd36d874a26e941?cid=8897482848704f2a8f8d7c79726a70d4">
      <p class="music-number">1</p>
      <p class="music-title">Around The World</p>
      <p class="music-duration">${convertHuman(238733)}</p>
    </div>`;

  const markup2 =
    `
    <div class="music" data-track-preview="https://p.scdn.co/mp3-preview/ab3d501c5ffbf560e94094f76cd36d874a26e941?cid=8897482848704f2a8f8d7c79726a70d4">
      <p class="music-number">1</p>
      <p class="music-title">Around The World</p>
      <p class="music-duration">${convertHuman(238733)}</p>
    </div>
    <div class="music" data-track-preview="https://p.scdn.co/mp3-preview/ab3d501c5ffbf560e94094f76cd36d874a26e941?cid=8897482848704f2a8f8d7c79726a70d4">
      <p class="music-number">1</p>
      <p class="music-title">Around The World</p>
      <p class="music-duration">${convertHuman(238733)}</p>
    </div>`;

  it('should return the markup given the correct data', () => {
    const element = document.createElement('div');
    renderTracks(data, element);

    expect(element.innerHTML).to.be.eql(markup);
  });

  it('should return the markup when more than one', () => {
    const element2 = document.createElement('div');
    renderTracks(data2, element2);

    expect(element2.innerHTML).to.be.eql(markup2);
  });

  describe('convert track duration to human', () => {
    it('should have a method convertHuman', () => {
      expect(convertHuman()).to.exist;
    });

    it('should convert 0ms to 0:00', () => {
      expect(convertHuman(0)).to.be.eql('0:00');
    });

    it('should convert 1000ms to 0:01', () => {
      expect(convertHuman(1000)).to.be.eql('0:01');
    });

    it('should convert 11000ms to 0:01', () => {
      expect(convertHuman(11000)).to.be.eql('0:11');
    });

    it('should convert 60000ms to 1:00', () => {
      expect(convertHuman(60000)).to.be.eql('1:00');
    });

    it('should convert 68000ms to 1:00', () => {
      expect(convertHuman(238733)).to.be.eql('3:58');
    });
  });
});
