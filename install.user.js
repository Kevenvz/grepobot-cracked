// ==UserScript==

// @name         GrepoBot
// @author       xadam1, rubensei, kevenvz & grepobot
// @description  Grepolis automated bot, which helps you with some stuff!

// @include      http://*.grepolis.com/game/*
// @include      https://*.grepolis.com/game/*
// @exclude      view-source://*
// @exclude      https://classic.grepolis.com/game/*

// @version      v5.1
// @grant        none

// ==/UserScript==
(function () {
    var script = document.createElement('script'),
        link = document.createElement('link'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    script.src = 'https://cdn.jsdelivr.net/gh/xadam1/GrepoBotExtension@master/GrepoBotMinified.js';
    link.href = 'https://cdn.jsdelivr.net/gh/xadam1/GrepoBotExtension@master/Autobot.css';
    head.appendChild(script);
    head.appendChild(link);
    head.setAttribute('xhttps', 1);
})();
