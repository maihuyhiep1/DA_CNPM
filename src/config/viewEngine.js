const express = require('express');

let configViewEngine = (app) => {
  app.use(express.static('./src/public'));
}

module.exports = configViewEngine;