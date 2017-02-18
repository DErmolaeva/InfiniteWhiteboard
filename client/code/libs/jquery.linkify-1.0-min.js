// encoding: utf-8
// $.fn.linkify 1.0 - MIT/GPL Licensed - More info: http://github.com/maranomynet/linkify/
(function (b) {
    var x = /(^|["'(\s]|&lt;)(www\..+?\..+?)((?:[:?]|\.+)?(?:\s|$)|&gt;|[)"',])/g, y = /(^|["'(\s]|&lt;)((?:(?:https?|ftp):\/\/|mailto:).+?)((?:[:?]|\.+)?(?:\s|$)|&gt;|[)"',])/g, z = function (h) {
        return h.replace(x, '$1<a tabindex="-1" href="<``>://$2">$2</a>$3').replace(y, '$1<a tabindex="-1" href="$2">$2</a>$3').replace(/"<``>/g, '"http')
    }, s = b.fn.linkify = function (c) {
        if (!b.isPlainObject(c)) {
            c = {use: (typeof c == 'string') ? c : undefined, handleLinks: b.isFunction(c) ? c : arguments[1]}
        }
        var d = c.use, k = s.plugins || {}, l = [z], f, m = [], n = c.handleLinks;
        if (d == undefined || d == '*') {
            for (var i in k) {
                l.push(k[i])
            }
        } else {
            d = b.isArray(d) ? d : b.trim(d).split(/ *, */);
            var o, i;
            for (var p = 0, A = d.length; p < A; p++) {
                i = d[p];
                o = k[i];
                if (o) {
                    l.push(o)
                }
            }
        }
        this.each(function () {
            var h = this.childNodes, t = h.length;
            while (t--) {
                var e = h[t];
                if (e.nodeType == 3) {
                    var a = e.nodeValue;
                    if (a.length > 1 && /\S/.test(a)) {
                        var q, r;
                        f = f || b('<div/>')[0];
                        f.innerHTML = '';
                        f.appendChild(e.cloneNode(false));
                        var u = f.childNodes;
                        for (var v = 0, g; (g = l[v]); v++) {
                            var w = u.length, j;
                            while (w--) {
                                j = u[w];
                                if (j.nodeType == 3) {
                                    a = j.nodeValue;
                                    if (a.length > 1 && /\S/.test(a)) {
                                        r = a;
                                        a = a.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                                        a = b.isFunction(g) ? g(a) : a.replace(g.re, g.tmpl);
                                        q = q || r != a;
                                        r != a && b(j).after(a).remove()
                                    }
                                }
                            }
                        }
                        a = f.innerHTML;
                        if (n) {
                            a = b('<div/>').html(a);
                            m = m.concat(a.find('a').toArray().reverse());
                            a = a.contents()
                        }
                        q && b(e).after(a).remove()
                    }
                } else if (e.nodeType == 1 && !/^(a|button|textarea)$/i.test(e.tagName)) {
                    arguments.callee.call(e)
                }
            }
        });
        n && n(b(m.reverse()));
        return this
    };
    s.plugins = {mailto: {re: /(^|["'(\s]|&lt;)([^"'(\s&]+?@.+\.[a-z]{2,7})(([:?]|\.+)?(\s|$)|&gt;|[)"',])/gi, tmpl: '$1<a href="mailto:$2">$2</a>$3'}}
})(jQuery);