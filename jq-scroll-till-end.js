var steConfig = {length: 0};
(function () {
    function callable(callback, nullable) {
        if (typeof callback === 'string') {
            if (callback.indexOf('.') === -1) {
                callback = window[callback];
            }
            else {
                var split = callback.split('.'), _cb = window;
                $.each(split, function (i, v) {
                    if (!_cb) {
                        callback = null;
                        return false;
                    }
                    _cb = _cb[v];
                });
                callback = _cb;
            }
            return callback === window ?
                    function () {
                    } :
                    callable(callback);
        }
        if (typeof callback === 'function') {
            return callback;
        }
        else if (!nullable) {
            return function () {
            };
        }
    }
    function success(page, resp, config, target) {
        var data = config.dataKey ? resp[config.dataKey] : resp,
                parse = callable(config.parse, true);
        if (config.dataType.toLowerCase() === 'html') {
            console.log($.trim(data) === '', $.trim(data));
            // stop trying to fetch data if no more data exists
            if ($.trim(data) === '' || !data) {
                $(target).removeClass('scrolling-till-end');
                callable(config.end).apply(target);
                return;
            }
            data = [data];
        }
        else if (config.dataType.toLowerCase() === 'json') {
            // stop trying to fetch data if no more data exists
            if (!data.length) {
                $(target).removeClass('scrolling-till-end');
                callable(config.end).apply(target);
                return;
            }
        }

        $(target).data('pages', page);
        this.page = page;

        $(target).find('.ste-loading').removeClass('ste-loading').html('- PAGE ' + page + ' -');

        if (parse) {
            $.each(data, function (i, v) {
                $(target).append(parse.call(this, v, i));
            }.bind(this));
        }
        callable(config.done).call(target, resp);
    }
    function error(config, target, args) {
        callable(config.fail).apply(target, args);
    }
    function complete(config, target, args) {
        $(target).removeClass('ste-loading');
        callable(config.always).apply(target, args);
    }
    function ajax(config, target) {
        $(target).addClass('ste-loading');
        var data = config.data,
                page = config.pages !== undefined ? config.pages + 1 : 2;
        if (typeof data === 'object') {
            data[config.pageKey] = page;
        } else if (typeof data === 'string') {
            data += '&' + config.pageKey + '=' + page;
        } else {
            data = config.pageKey + '=' + page;
        }

        $.ajax({
            url: config.url,
            dataType: config.dataType,
            data: data,
            success: function (data) {
                success(page, data, config, target);
            },
            done: function (data) {
                success(page, data, config, target);
            },
            error: function () {
                error(config, target, Array.from(arguments));
            },
            fail: function () {
                error(config, target, Array.from(arguments));
            },
            complete: function () {
                complete(config, target, Array.from(arguments));
            },
            always: function () {
                error(config, target, Array.from(arguments));
            }
        });

    }
    function scroll($win, $doc) {
        if ($(this).hasClass('ste-loading')) {
            return;
        }
        if (!$win) {
            $win = $(this);
            $doc = $(this);
        }
        var config = $.extend({}, steConfig[$(this).data('config')], $(this).data()),
                offset = config.offset;
        if (typeof offset === 'string') {
            offset = offset.indexOf('%') !== -1 ?
                    parseInt(offset) * $doc.height() / 100 :
                    parseInt(offset);
        }
        if ($win.scrollTop() + $win.innerHeight() + offset + 10 >= $doc[0].scrollHeight) {
            if (false !== callable(config.beforeAjax).call(this)) {
                ajax(config, this);
            }
        }
    }
    $.fn.scrollTillEnd = function (settings) {
        var config = {
            url: location.href,
            method: 'get',
            dataType: 'html',
            pageKey: 'page',
            data: {},
            dataKey: null,
            loadFirstPage: false,
            offset: 0,
            watchSelf: false,
            beforeAjax: function () {
                $(this).append('<div style="text-align:center;padding:10px;margin:10px 0;clear:both;width:100%" class="ste-loading"><i>loading...</i></div>');
            },
            parse: function (data) {
                return data;
            },
            end: function () {
                $(this).find('.ste-loading').removeClass('ste-loading').html('- THE END -');
            },
            done: function (data) {
            },
            fail: function () {

            },
            always: function () {
            }
        };
        if (settings) {
            $.extend(config, settings);
        }
        steConfig[steConfig.length] = config;
        this.each(function () {
            $(this).addClass('scrolling-till-end').data('config', steConfig.length);
            var _config = $.extend({}, config, $(this).data());
            if (_config.watchSelf) {
                $(this).scroll(function () {
                    if (!$(this).hasClass('scrolling-till-end')) {
                        $(this).unbind('scroll');
                        return;
                    }
                    scroll.call(this);
                });
            } else {
                $(this).addClass('document');
            }
            if (_config.loadFirstPage) {
                _config.pages = 0;
                ajax(_config, this);
            }
        });
        steConfig.length++;
        return this;
    };

    $(document).ready(function () {
        var $win = $(window), $doc = $('body');
        $win.scroll(function () {
            $('.scrolling-till-end.document').each(function () {
                scroll.call(this, $win, $doc);
            });
        });
    });
})(jQuery);

