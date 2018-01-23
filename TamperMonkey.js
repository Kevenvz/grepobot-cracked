// ==UserScript==
// @name			Grepobot - Bot for Grepolis
// @namespace		Grepobot - Bot for Grepolis
// @description		Grepobot is a automated script that helps you do stuff in Grepolis automaticaly! One of the best Grepolis bots out there.
// @autor			Grepobot
// @verison			3.0
// @include			http://*.grepolis.*/*
// @include			https://*.grepolis.*/*
// ==/UserScript==
(function(){
    var script = document.createElement('script'),
        link = document.createElement('link'),
        head = document.getElementsByTagName('head')[0];
    script.type = 'text/javascript';
    link.type = 'text/css';
    link.rel = 'stylesheet';
    script.src = location.protocol+'//cdn.jsdelivr.net/gh/kevenvz/grepobot-cracked@1.2/Raw/Autobot-Cracked.js';
    link.href = location.protocol+'//cdn.jsdelivr.net/gh/kevenvz/grepobot-cracked@1.2/Raw/Autobot.css';
    head.appendChild(script);
    head.appendChild(link);
    head.setAttribute('xhttps', 1);
})();