// ==UserScript==
// @name			Gsaddsabot - Bot for Grepolis
// @namespace		Grepobot - Bot for Grepolis
// @description		Grepobot is a automated script that helps you do stuff in Grepolis automaticaly! One of the best Grepolis bots out there.
// @autor			Grepobot
// @verison			3.2
// @include			http://*.grepolis.*/*
// @include			https://*.grepolis.*/*
// ==/UserScript==
(function () {
    var script = document.createElement('script'),
        link = document.createElement('link'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    script.src = 'https://cdn.jsdelivr.net/gh/xadam1/GrepoBot@v4.3/Autobot-Cracked.js';
    link.href = 'https://cdn.jsdelivr.net/gh/xadam1/GrepoBot@v4.3/Autobot.css';
    console.log(link.href);
    head.appendChild(script);
    head.appendChild(link);
    head.setAttribute('xhttps', 1);
})();