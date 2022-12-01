"use strict";

/* eslint-disable no-console */
// @title Make All Images Not Lazy
(function makeAllImagesNotLazy() {
  'use strict';

  var images = Array.from(document.querySelectorAll('img[decoding], img[loading]'));
  images.forEach(function (img) {
    return ['decoding', 'loading'].forEach(function (attr) {
      return img.removeAttribute(attr);
    });
  });
  console.log("Made ".concat(images.length, " images not lazy."));
})();