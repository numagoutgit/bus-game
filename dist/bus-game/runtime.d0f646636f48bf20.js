(() => {
  "use strict";
  var e,
    i = {},
    _ = {};
  function n(e) {
    var l = _[e];
    if (void 0 !== l) return l.exports;
    var r = (_[e] = { exports: {} });
    return i[e](r, r.exports, n), r.exports;
  }
  (n.m = i),
    (e = []),
    (n.O = (l, r, s, f) => {
      if (!r) {
        var c = 1 / 0;
        for (a = 0; a < e.length; a++) {
          for (var [r, s, f] = e[a], t = !0, u = 0; u < r.length; u++)
            (!1 & f || c >= f) && Object.keys(n.O).every((h) => n.O[h](r[u]))
              ? r.splice(u--, 1)
              : ((t = !1), f < c && (c = f));
          if (t) {
            e.splice(a--, 1);
            var o = s();
            void 0 !== o && (l = o);
          }
        }
        return l;
      }
      f = f || 0;
      for (var a = e.length; a > 0 && e[a - 1][2] > f; a--) e[a] = e[a - 1];
      e[a] = [r, s, f];
    }),
    (n.o = (e, l) => Object.prototype.hasOwnProperty.call(e, l)),
    (() => {
      var e = { 666: 0 };
      n.O.j = (s) => 0 === e[s];
      var l = (s, f) => {
          var u,
            o,
            [a, c, t] = f,
            v = 0;
          if (a.some((d) => 0 !== e[d])) {
            for (u in c) n.o(c, u) && (n.m[u] = c[u]);
            if (t) var b = t(n);
          }
          for (s && s(f); v < a.length; v++)
            n.o(e, (o = a[v])) && e[o] && e[o][0](), (e[o] = 0);
          return n.O(b);
        },
        r = (self.webpackChunkbus_game = self.webpackChunkbus_game || []);
      r.forEach(l.bind(null, 0)), (r.push = l.bind(null, r.push.bind(r)));
    })();
})();
