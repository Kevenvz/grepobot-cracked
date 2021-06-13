var Autobot = {
  title: 'GrepoBot',
  version: '5.1',
  domain: window['location']['protocol'] + '//bot.grepobot.com/',
  scriptDomain: window['location']['protocol'] + '//cdn.jsdelivr.net/gh/xadam1/grepobot-cracked@v5.1/',
  botWnd: '',
  botPremWnd: '',
  botEmailWnd: '',
  facebookWnd: '',
  isLogged: false,
  Account: {
    player_id: Game['player_id'],
    player_name: Game['player_name'],
    world_id: Game['world_id'],
    locale_lang: Game['locale_lang'],
    premium_grepolis: Game['premium_user'],
    csrfToken: Game['csrfToken']
  },
  trial_time: 0,
  premium_time: 0,
  facebook_like: 0,
  toolbox_element: null,

  init: function () {
    ConsoleLog.Log('Initialize Autobot', 0);
    Autobot['authenticate']();
    Autobot['obServer']();
    Autobot['isActive']();
    Autobot['setToolbox']();
    Autobot['initAjax']();
    Autobot['initMapTownFeature']();
    Autobot['fixMessage']();
    Assistant['init']();
  },

  setToolbox: function () {
    Autobot['toolbox_element'] = $('.nui_bot_toolbox');
  },

  authenticate: function () {
    DataExchanger.Auth('login', Autobot.Account, function (accData) {
      ModuleManager['callbackAuth'](accData);
    });
  },

  obServer: function () {
    $.Observer(GameEvents['notification']['push'])['subscribe']('GRCRTNotification', function () {
      $('#notification_area>.notification.getPremiumNotification')['on']('click', function () {
        Autobot['getPremium']();
      });
    });
  },

  initWnd: function () {
    if (Autobot['isLogged']) {
      if (typeof Autobot['botWnd'] != 'undefined') {
        try {
          Autobot['botWnd']['close']()
        } catch (F) { };
        Autobot['botWnd'] = undefined
      };
      if (typeof Autobot['botPremWnd'] != 'undefined') {
        try {
          Autobot['botPremWnd']['close']()
        } catch (F) { };
        Autobot['botPremWnd'] = undefined
      };
      Autobot['botWnd'] = Layout['dialogWindow']['open']('', Autobot['title'] + ' v<span style="font-size: 10px;">' + Autobot['version'] + '</span>', 500, 350, '', false);
      Autobot['botWnd']['setHeight']([350]);
      Autobot['botWnd']['setPosition'](['center', 'center']);
      var _0x88b7x2 = Autobot['botWnd']['getJQElement']();
      _0x88b7x2['append']($('<div/>', {
        "class": 'menu_wrapper',
        "style": 'left: 78px; right: 14px'
      })['append']($('<ul/>', {
        "class": 'menu_inner'
      })['prepend']
        (Autobot['addMenuItem']('AUTHORIZE', 'Account', 'Account'))
      ['prepend'](Autobot['addMenuItem']('CONSOLE', 'Assistant', 'Assistant'))
      ['prepend'](Autobot['addMenuItem']('ASSISTANT', 'Console', 'Console'))));
      if (typeof Autoattack !== 'undefined') {
        _0x88b7x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('ATTACKMODULE', 'Attack', 'Autoattack'))
      };
      if (typeof Autobuild !== 'undefined') {
        _0x88b7x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('CONSTRUCTMODULE', 'Build', 'Autobuild'))
      };
      if (typeof Autoculture !== 'undefined') {
        _0x88b7x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('CULTUREMODULE', 'Culture', 'Autoculture'))
      };
      if (typeof Autofarm !== 'undefined') {
        _0x88b7x2['find']('.menu_inner li:last-child')['before'](Autobot['addMenuItem']('FARMMODULE', 'Farm', 'Autofarm'))
      };
      $('#Autobot-AUTHORIZE')['click']()
    }
  },

  addMenuItem: function (_0x88b7x3, _0x88b7x4, _0x88b7x5) {
    return $('<li/>')['append']($('<a/>', {
      "class": 'submenu_link',
      "href": '#',
      "id": 'Autobot-' + _0x88b7x3,
      "rel": _0x88b7x5
    })['click'](function () {
      Autobot['botWnd']['getJQElement']()['find']('li a.submenu_link')['removeClass']('active');
      $(this)['addClass']('active');
      Autobot['botWnd']['setContent2'](Autobot['getContent']($(this)['attr']('rel')));
      if ($(this)['attr']('rel') == 'Console') {
        var _0x88b7x6 = $('.terminal');
        var _0x88b7x7 = $('.terminal-output')[0]['scrollHeight'];
        _0x88b7x6['scrollTop'](_0x88b7x7)
      }
    })['append'](function () {
      return _0x88b7x5 != 'Support' ? $('<span/>', {
        "class": 'left'
      })['append']($('<span/>', {
        "class": 'right'
      })['append']($('<span/>', {
        "class": 'middle'
      })['html'](_0x88b7x4))) : '<a id="help-button" onclick="return false;" class="confirm"></a>'
    }))
  },

  getContent: function (param) {
    if (param == 'Console') {
      return ConsoleLog['contentConsole']()
    } else {
      if (param == 'Account') {
        return Autobot['contentAccount']()
      } else {
        if (param == 'Support') {
          console.log("GrepoBot: SupportBTN Clicked");
        } else {
          if (typeof window[param] != 'undefined') {
            return window[param]['contentSettings']()
          };
          return ''
        }
      }
    }
  },

  contentAccount: function () {
    var accountInfo = {
      "Name:": Game['player_name'],
      "World:": Game['world_id'],
      "Rank:": Game['player_rank'],
      "Towns:": Game['player_villages'],
      "Language:": Game['locale_lang'],
      "Premium: ": '[ CRACKED ]'
    };
    var _0x88b7xa = $('<table/>', {
      "class": 'game_table layout_main_sprite',
      "cellspacing": '0',
      "width": '100%'
    })['append'](function () {
      var _0x88b7xb = 0;
      var _0x88b7xc = $('<tbody/>');
      $['each'](accountInfo, function (_0x88b7xd, _0x88b7xe) {
        _0x88b7xc['append']($('<tr/>', {
          "class": _0x88b7xb % 2 ? 'game_table_even' : 'game_table_odd'
        })['append']($('<td/>', {
          "style": 'background-color: #DFCCA6;width: 30%;'
        })['html'](_0x88b7xd))['append']($('<td/>')['html'](_0x88b7xe)));
        _0x88b7xb++
      });
      return _0x88b7xc
    });
    var _0x88b7xf = FormBuilder['gameWrapper']('Account', 'account_property_wrapper', _0x88b7xa, 'margin-bottom:9px;')[0]['outerHTML'];
    _0x88b7xf += $('<div/>', {
      "id": 'grepobanner',
      "style": ''
    })[0]['outerHTML'];
    return _0x88b7xf
  },

  contentSupport: function () {
    console.log("GrepoBot: Support Window would load.")
  },

  checkAlliance: function () {
    if (!$('.allianceforum.main_menu_item')['hasClass']('disabled')) {
      DataExchanger['members_show'](function (_0x88b7x9) {
        if (_0x88b7x9['plain']['html'] != undefined) {
          jQuery['each']($(_0x88b7x9['plain']['html'])['find']('#ally_members_body .ally_name a'), function () {
            var _0x88b7xe = atob($(this)['attr']('href'));
            console['log'](JSON['parse'](_0x88b7xe['substr'](0, _0x88b7xe['length'] - 3)))
          })
        }
      })
    }
  },

  fixMessage: function () {
    var _0x88b7x12 = function (_0x88b7x13) {
      return function () {
        _0x88b7x13['apply'](this, arguments);
        $(window)['unbind']('click')
      }
    };
    HumanMessage['_initialize'] = _0x88b7x12(HumanMessage._initialize)
  },

  getPremium: function () {
    if (Autobot['isLogged']) {
      $.Observer(GameEvents['menu']['click'])['publish']({
        option_id: 'premium'
      });
      if (typeof Autobot['botPremWnd'] != 'undefined') {
        try {
          Autobot['botPremWnd']['close']()
        } catch (F) { };
        Autobot['botPremWnd'] = undefined
      };
      if (typeof Autobot['botWnd'] != 'undefined') {
        try {
          Autobot['botWnd']['close']()
        } catch (F) { };
        Autobot['botWnd'] = undefined
      };
      Autobot['botPremWnd'] = Layout['dialogWindow']['open']('', 'Autobot v' + Autobot['version'] + ' - Premium', 500, 350, '', false);
      Autobot['botPremWnd']['setHeight']([350]);
      Autobot['botPremWnd']['setPosition'](['center', 'center']);
      var _0x88b7x14 = $('<div/>', {
        id: 'payment'
      })['append']($('<div/>', {
        id: 'left'
      })['append']($('<ul/>', {
        id: 'time_options'
      })['append']($('<li/>', {
        class: 'active'
      })['append']($('<span/>', {
        class: 'amount'
      })['html']('1 Month'))['append']($('<span/>', {
        class: 'price'
      })['html']('€&nbsp;4,99')))['append']($('<li/>')['append']($('<span/>', {
        class: 'amount'
      })['html']('2 Month'))['append']($('<span/>', {
        class: 'price'
      })['html']('€&nbsp;9,99'))['append']($('<div/>', {
        class: 'referenceAmount'
      })['append']($('<div/>', {
        class: 'reference',
        style: 'transform: rotate(17deg);'
      })['html']('+12 Days&nbsp;'))))['append']($('<li/>')['append']($('<span/>', {
        class: 'amount'
      })['html']('4 Months'))['append']($('<span/>', {
        class: 'price'
      })['html']('€&nbsp;19,99'))['append']($('<div/>', {
        class: 'referenceAmount'
      })['append']($('<div/>', {
        class: 'reference',
        style: 'transform: rotate(17deg);'
      })['html']('+36 Days&nbsp;'))))['append']($('<li/>')['append']($('<span/>', {
        class: 'amount'
      })['html']('10 Months'))['append']($('<span/>', {
        class: 'price'
      })['html']('€&nbsp;49,99'))['append']($('<div/>', {
        class: 'referenceAmount'
      })['append']($('<div/>', {
        class: 'reference',
        style: 'transform: rotate(17deg);'
      })['html']('+120 Days&nbsp;'))))))['append']($('<div/>', {
        id: 'right'
      })['append']($('<div/>', {
        id: 'pothead'
      }))['append']($('<div/>', {
        id: 'information'
      })['append']($('<span/>', {
        class: 'text'
      })['html']('1 month for only €4,99'))['append']($('<span/>', {
        class: 'button'
      })['html']('Buy'))));
      Autobot['botPremWnd']['setContent2'](_0x88b7x14);
      var _0x88b7x15 = 0;
      $('#time_options li')['on']('click', function () {
        $('#time_options li')['removeClass']('active');
        $(this)['addClass']('active');
        _0x88b7x15 = $(this)['index']();
        var _0x88b7x16 = $('#payment #information .text');
        if (_0x88b7x15 == 0) {
          _0x88b7x16['html']('1 month for only €4,99')
        } else {
          if (_0x88b7x15 == 1) {
            _0x88b7x16['html']('2 month +12 days for only €9,99')
          } else {
            if (_0x88b7x15 == 2) {
              _0x88b7x16['html']('4 months +36 days for only €19,99')
            } else {
              if (_0x88b7x15 == 3) {
                _0x88b7x16['html']('10 months +120 days for only €49,99')
              }
            }
          }
        }
      });
      $('#payment #information')['on']('click', function () {
        var _0x88b7x17 = window['open'](Autobot['domain'] + 'paypal/process.php?payment=' + _0x88b7x15 + '&player_id=' + Autobot['Account']['player_id'], 'grepolis_payment', 'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,height=650,width=800');
        var _0x88b7x18 = setInterval(function () {
          if (!_0x88b7x17 || _0x88b7x17['closed']) {
            clearInterval(_0x88b7x18);
            Autobot['authenticate']()
          }
        }, 500)
      })
    }
  },

  botFacebookWnd: function () {
    console.log("GrepoBot: Facebook Window would show");
  },

  upgrade3Days: function () {
    console.log("GrepoBot: 3day Upgrade called.");
  },

  initAjax: function () {
    $(document)['ajaxComplete'](function (_0x88b7x21, _0x88b7x22, _0x88b7x23) {
      if (_0x88b7x23['url']['indexOf'](Autobot['domain']) == -1 && _0x88b7x23['url']['indexOf'](Autobot['scriptDomain']) == -1 && _0x88b7x23['url']['indexOf']('/game/') != -1 && _0x88b7x22['readyState'] == 4 && _0x88b7x22['status'] == 200) {
        var _0x88b7x24 = _0x88b7x23['url']['split']('?');
        var _0x88b7x25 = _0x88b7x24[0]['substr'](6) + '/' + _0x88b7x24[1]['split']('&')[1]['substr'](7);
        if (typeof Autobuild !== 'undefined') {
          Autobuild['calls'](_0x88b7x25)
        };
        if (typeof Autoattack !== 'undefined') {
          Autoattack['calls'](_0x88b7x25, _0x88b7x22['responseText'])
        }
      }
    })
  },

  verifyEmail: function () {
    if (Autobot['isLogged']) {
      DataExchanger['email_validation'](function (_0x88b7x9) {
        if (_0x88b7x9['plain']['html'] != undefined) {
          DataExchanger.Auth('verifyEmail', {
            key: btoa(Autobot['stringify']({
              player_id: Autobot['Account']['player_id'],
              player_email: $(_0x88b7x9['plain']['html'])['find']('#current_email_adress')['html']()
            }))
          }, function (_0x88b7x9) {
            if (_0x88b7x9['success'] != undefined) {
              Autobot['arrowActivated']()
            }
          })
        }
      })
    }
  },

  randomize: function (a, b) {
    return Math['floor'](Math['random']() * (b - a + 1)) + a
  },

  secondsToTime: function (timeInSeconds) {
    var days = Math['floor'](timeInSeconds / 86400);
    var hours = Math['floor']((timeInSeconds % 86400) / 3600);
    var mins = Math['floor'](((timeInSeconds % 86400) % 3600) / 60);
    return (days ? days + ' days ' : '') + (hours ? hours + ' hours ' : '') + (mins ? mins + ' minutes ' : '')
  },

  timeToSeconds: function (time) {
    var _0x88b7x2d = time['split'](':'),
      seconds = 0,
      _0x88b7x2e = 1;
    while (_0x88b7x2d['length'] > 0) {
      seconds += _0x88b7x2e * parseInt(_0x88b7x2d['pop'](), 10);
      _0x88b7x2e *= 60
    };
    return seconds
  },

  arrowActivated: function () {
    var _0x88b7x2f = $('<div/>', {
      "class": 'helpers helper_arrow group_quest d_w animate bounce',
      "data-direction": 'w',
      "style": 'top: 0; left: 360px; visibility: visible; display: none;'
    });
    Autobot['toolbox_element']['append'](_0x88b7x2f);
    _0x88b7x2f['show']()['animate']({
      left: '138px'
    }, 'slow')['delay'](10000)['fadeOut']('normal');
    setTimeout(function () {
      Autobot['botFacebookWnd']()
    }, 25000)
  },

  createNotification: function (_0x88b7x30, _0x88b7x31) {
    var layoutVar = (typeof Layout['notify'] == 'undefined') ? new NotificationHandler() : Layout;
    layoutVar['notify']($('#notification_area>.notification')['length'] + 1, _0x88b7x30, '<span><b>' + 'Autobot' + '</b></span>' + _0x88b7x31 + '<span class=\'small notification_date\'>' + 'Version ' + Autobot['version'] + '</span>')
  },

  toHHMMSS: function (input) {
    var hours = ~~(input / 3600);
    var minutes = ~~((input % 3600) / 60);
    var seconds = input % 60;
    ret = '';
    if (hours > 0) {
      ret += '' + hours + ':' + (minutes < 10 ? '0' : '')
    };
    ret += '' + minutes + ':' + (seconds < 10 ? '0' : '');
    ret += '' + seconds;
    return ret
  },

  stringify: function (_0x88b7x37) {
    var _0x88b7x38 = typeof _0x88b7x37;
    if (_0x88b7x38 === 'string') {
      return '"' + _0x88b7x37 + '"'
    };
    if (_0x88b7x38 === 'boolean' || _0x88b7x38 === 'number') {
      return _0x88b7x37
    };
    if (_0x88b7x38 === 'function') {
      return _0x88b7x37.toString()
    };
    var _0x88b7x39 = [];
    for (var _0x88b7x3a in _0x88b7x37) {
      _0x88b7x39['push']('"' + _0x88b7x3a + '":' + this['stringify'](_0x88b7x37[_0x88b7x3a]))
    };
    return '{' + _0x88b7x39['join'](',') + '}'
  },

  isActive: function () {
    setTimeout(function () {
      DataExchanger.Auth('isActive', Autobot.Account, Autobot['isActive'])
    }, 180000)
  },

  town_map_info: function (_0x88b7x3b, _0x88b7x3c) {
    if (_0x88b7x3b != undefined && _0x88b7x3b['length'] > 0 && _0x88b7x3c['player_name']) {
      for (var _0x88b7x3d = 0; _0x88b7x3d < _0x88b7x3b['length']; _0x88b7x3d++) {
        if (_0x88b7x3b[_0x88b7x3d]['className'] == 'flag town') {
          if (typeof Assistant !== 'undefined') {
            if (Assistant['settings']['town_names']) {
              $(_0x88b7x3b[_0x88b7x3d])['addClass']('active_town')
            };
            if (Assistant['settings']['player_name']) {
              $(_0x88b7x3b[_0x88b7x3d])['addClass']('active_player')
            };
            if (Assistant['settings']['alliance_name']) {
              $(_0x88b7x3b[_0x88b7x3d])['addClass']('active_alliance')
            }
          };
          $(_0x88b7x3b[_0x88b7x3d])['append']('<div class="player_name">' + (_0x88b7x3c['player_name'] || '') + '</div>');
          $(_0x88b7x3b[_0x88b7x3d])['append']('<div class="town_name">' + _0x88b7x3c['name'] + '</div>');
          $(_0x88b7x3b[_0x88b7x3d])['append']('<div class="alliance_name">' + (_0x88b7x3c['alliance_name'] || '') + '</div>');
          break
        }
      }
    };
    return _0x88b7x3b
  },

  checkPremium: function (param) {
    return $('.advisor_frame.' + param + ' div')['hasClass'](param + '_active')
  },

  initWindow: function () {
    $('.nui_main_menu')['css']('top', '249px');
    $('<div/>', {
      class: 'nui_bot_toolbox'
    })['append']($('<div/>', {
      class: 'bot_menu layout_main_sprite'
    })['append']($('<ul/>')['append']($('<li/>', {
      id: 'Autofarm_onoff',
      class: 'disabled'
    })['append']($('<span/>', {
      class: 'autofarm farm_town_status_0'
    })))['append']($('<li/>', {
      id: 'Autoculture_onoff',
      class: 'disabled'
    })['append']($('<span/>', {
      class: 'autoculture farm_town_status_0'
    })))['append']($('<li/>', {
      id: 'Autobuild_onoff',
      class: 'disabled'
    })['append']($('<span/>', {
      class: 'autobuild toolbar_activities_recruits'
    })))['append']($('<li/>', {
      id: 'Autoattack_onoff',
      class: 'disabled'
    })['append']($('<span/>', {
      class: 'autoattack sword_icon'
    })))['append']($('<li/>')['append']($('<span/>', {
      href: '#',
      class: 'botsettings circle_button_settings'
    })['on']('click', function () {
      if (Autobot['isLogged']) {
        Autobot['initWnd']()
      }
    })['mousePopup'](new MousePopup(DM['getl10n']('COMMON')['main_menu']['settings']))))))['append']($('<div/>', {
      id: 'time_autobot',
      class: 'time_row'
    }))['append']($('<div/>', {
      class: 'bottom'
    }))['insertAfter']('.nui_left_box')
  },

  initMapTownFeature: function () {
    var _0x88b7x3f = function (_0x88b7x13) {
      return function () {
        var _0x88b7x3b = _0x88b7x13['apply'](this, arguments);
        return Autobot['town_map_info'](_0x88b7x3b, arguments[0])
      }
    };
    MapTiles['createTownDiv'] = _0x88b7x3f(MapTiles['createTownDiv'])
  },

  checkAutoRelogin: function () {
    if (typeof $['cookie']('pid') !== 'undefined' && typeof $['cookie']('ig_conv_last_site') !== 'undefined') {
      var _0x88b7x40 = $['cookie']('ig_conv_last_site')['match'](/\/\/(.*?)\.grepolis\.com/g)[0]['replace']('//', '')['replace']('.grepolis.com', '');
      DataExchanger.Auth('checkAutorelogin', {
        player_id: $['cookie']('pid'),
        world_id: _0x88b7x40
      }, function (_0x88b7x9) {
        if (_0x88b7x9 != 0) {
          setTimeout(function () {
            DataExchanger['login_to_game_world'](_0x88b7x40)
          }, _0x88b7x9 * 1000)
        }
      })
    }
  }
};

(function () {
  String['prototype']['capitalize'] = function () {
    return this['charAt'](0)['toUpperCase']() + this['slice'](1)
  };

  $['fn']['serializeObject'] = function () {
    var _0x88b7x41 = {};
    var _0x88b7x42 = this['serializeArray']();
    $['each'](_0x88b7x42, function () {
      if (_0x88b7x41[this['name']] !== undefined) {
        if (!_0x88b7x41[this['name']]['push']) {
          _0x88b7x41[this['name']] = [_0x88b7x41[this['name']]]
        };
        _0x88b7x41[this['name']]['push'](this['value'] || '')
      } else {
        _0x88b7x41[this['name']] = this['value'] || ''
      }
    });
    return _0x88b7x41
  };

  var loadIntervalID = setInterval(function () {
    if (window != undefined) {
      if ($('.nui_main_menu')['length'] && !$['isEmptyObject'](ITowns['towns'])) {
        clearInterval(loadIntervalID);
        Autobot['initWindow']();
        Autobot['initMapTownFeature']();
        $['getScript'](Autobot['scriptDomain'] + 'Evaluate.js', function () {
          $['when']($['getScript'](Autobot['scriptDomain'] + 'DataExchanger.js'), $['getScript'](Autobot['scriptDomain'] + 'ConsoleLog.js'), $['getScript'](Autobot['scriptDomain'] + 'FormBuilder.js'), $['getScript'](Autobot['scriptDomain'] + 'ModuleManager.js'), $['getScript'](Autobot['scriptDomain'] + 'Assistant.js'), $.Deferred(function (_0x88b7x44) { $(_0x88b7x44['resolve']) }))['done'](function () {
            Autobot['init']()
          });
        });
      } else {
        if (/grepolis\.com\/start\?nosession/g['test'](window['location']['href'])) {
          clearInterval(loadIntervalID);
          $['getScript'](Autobot['scriptDomain'] + 'Evaluate.js', function () {
            $['when']($['getScript'](Autobot['scriptDomain'] + 'DataExchanger.js'), $['getScript'](Autobot['scriptDomain'] + 'Redirect.js'), $.Deferred(function (_0x88b7x44) { $(_0x88b7x44['resolve']) }))['done'](function () {
              Autobot['checkAutoRelogin']()
            });
          });
        }
      }
    }
  }, 1000)
})();
