import { expect } from 'chai';
import spotify from '../src/Spotify';

/* eslint-no-undef */
/* eslint-no-undef */
global.fetch = require('node-fetch');

describe('Spotify Wrapper', () => {

  it('should be an object', () => {
    expect(spotify).to.be.an.object;
  });

  it('should have search method', () => {
    expect(spotify.search).to.exist;
  });

  it('should have album search method', () => {
    expect(spotify.search.album).to.exist;
  });
});
