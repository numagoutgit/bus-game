"use strict";
(self.webpackChunkbus_game = self.webpackChunkbus_game || []).push([
  [179],
  {
    597: () => {
      function J(e) {
        return "function" == typeof e;
      }
      function $r(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ur = $r(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function Gn(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class tt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (J(r))
              try {
                r();
              } catch (i) {
                t = i instanceof Ur ? i.errors : [i];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const i of o)
                try {
                  xu(i);
                } catch (s) {
                  (t = t ?? []),
                    s instanceof Ur ? (t = [...t, ...s.errors]) : t.push(s);
                }
            }
            if (t) throw new Ur(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) xu(t);
            else {
              if (t instanceof tt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && Gn(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && Gn(n, t), t instanceof tt && t._removeParent(this);
        }
      }
      tt.EMPTY = (() => {
        const e = new tt();
        return (e.closed = !0), e;
      })();
      const Pu = tt.EMPTY;
      function Fu(e) {
        return (
          e instanceof tt ||
          (e && "closed" in e && J(e.remove) && J(e.add) && J(e.unsubscribe))
        );
      }
      function xu(e) {
        J(e) ? e() : e.unsubscribe();
      }
      const Vt = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        zr = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = zr;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = zr;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function Ou(e) {
        zr.setTimeout(() => {
          const { onUnhandledError: t } = Vt;
          if (!t) throw e;
          t(e);
        });
      }
      function Ru() {}
      const Rg = wi("C", void 0, void 0);
      function wi(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Ht = null;
      function Gr(e) {
        if (Vt.useDeprecatedSynchronousErrorHandling) {
          const t = !Ht;
          if ((t && (Ht = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Ht;
            if (((Ht = null), n)) throw r;
          }
        } else e();
      }
      class Ei extends tt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), Fu(t) && t.add(this))
              : (this.destination = $g);
        }
        static create(t, n, r) {
          return new Wn(t, n, r);
        }
        next(t) {
          this.isStopped
            ? Ii(
                (function kg(e) {
                  return wi("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? Ii(
                (function Lg(e) {
                  return wi("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? Ii(Rg, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Bg = Function.prototype.bind;
      function Ci(e, t) {
        return Bg.call(e, t);
      }
      class Vg {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Wr(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Wr(r);
            }
          else Wr(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Wr(n);
            }
        }
      }
      class Wn extends Ei {
        constructor(t, n, r) {
          let o;
          if ((super(), J(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let i;
            this && Vt.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && Ci(t.next, i),
                  error: t.error && Ci(t.error, i),
                  complete: t.complete && Ci(t.complete, i),
                }))
              : (o = t);
          }
          this.destination = new Vg(o);
        }
      }
      function Wr(e) {
        Vt.useDeprecatedSynchronousErrorHandling
          ? (function jg(e) {
              Vt.useDeprecatedSynchronousErrorHandling &&
                Ht &&
                ((Ht.errorThrown = !0), (Ht.error = e));
            })(e)
          : Ou(e);
      }
      function Ii(e, t) {
        const { onStoppedNotification: n } = Vt;
        n && zr.setTimeout(() => n(e, t));
      }
      const $g = {
          closed: !0,
          next: Ru,
          error: function Hg(e) {
            throw e;
          },
          complete: Ru,
        },
        bi =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function Lu(e) {
        return e;
      }
      let be = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const i = (function zg(e) {
              return (
                (e && e instanceof Ei) ||
                ((function Ug(e) {
                  return e && J(e.next) && J(e.error) && J(e.complete);
                })(e) &&
                  Fu(e))
              );
            })(n)
              ? n
              : new Wn(n, r, o);
            return (
              Gr(() => {
                const { operator: s, source: a } = this;
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                );
              }),
              i
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = ju(r))((o, i) => {
              const s = new Wn({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    i(u), s.unsubscribe();
                  }
                },
                error: i,
                complete: o,
              });
              this.subscribe(s);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [bi]() {
            return this;
          }
          pipe(...n) {
            return (function ku(e) {
              return 0 === e.length
                ? Lu
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n);
                  };
            })(n)(this);
          }
          toPromise(n) {
            return new (n = ju(n))((r, o) => {
              let i;
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function ju(e) {
        var t;
        return null !== (t = e ?? Vt.Promise) && void 0 !== t ? t : Promise;
      }
      const Gg = $r(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Si = (() => {
        class e extends be {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new Bu(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new Gg();
          }
          next(n) {
            Gr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            Gr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            Gr(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this;
            return r || o
              ? Pu
              : ((this.currentObservers = null),
                i.push(n),
                new tt(() => {
                  (this.currentObservers = null), Gn(i, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this;
            r ? n.error(o) : i && n.complete();
          }
          asObservable() {
            const n = new be();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new Bu(t, n)), e;
      })();
      class Bu extends Si {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Pu;
        }
      }
      function qn(e) {
        return (t) => {
          if (
            (function Wg(e) {
              return J(e?.lift);
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function qr(e, t, n, r, o) {
        return new qg(e, t, n, r, o);
      }
      class qg extends Ei {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function Nt(e) {
        return this instanceof Nt ? ((this.v = e), this) : new Nt(e);
      }
      function Uu(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function Ni(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (l) {
                    i({ value: l, done: a });
                  }, s);
                })(a, u, (s = e[i](s)).done, s.value);
              });
            };
        }
      }
      const zu = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Gu(e) {
        return J(e?.then);
      }
      function Wu(e) {
        return J(e[bi]);
      }
      function qu(e) {
        return Symbol.asyncIterator && J(e?.[Symbol.asyncIterator]);
      }
      function Zu(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Yu = (function hm() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function Qu(e) {
        return J(e?.[Yu]);
      }
      function Ku(e) {
        return (function $u(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            i = [];
          return (
            (o = {}),
            s("next"),
            s("throw"),
            s("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof Nt
                  ? Promise.resolve(f.value.v).then(l, c)
                  : d(i[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(i[0][3], p);
            }
          }
          function l(f) {
            a("next", f);
          }
          function c(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield Nt(n.read());
              if (o) return yield Nt(void 0);
              yield yield Nt(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function Xu(e) {
        return J(e?.getReader);
      }
      function $t(e) {
        if (e instanceof be) return e;
        if (null != e) {
          if (Wu(e))
            return (function pm(e) {
              return new be((t) => {
                const n = e[bi]();
                if (J(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (zu(e))
            return (function gm(e) {
              return new be((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Gu(e))
            return (function mm(e) {
              return new be((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, Ou);
              });
            })(e);
          if (qu(e)) return Ju(e);
          if (Qu(e))
            return (function ym(e) {
              return new be((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (Xu(e))
            return (function Dm(e) {
              return Ju(Ku(e));
            })(e);
        }
        throw Zu(e);
      }
      function Ju(e) {
        return new be((t) => {
          (function vm(e, t) {
            var n, r, o, i;
            return (function Vu(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(c) {
                  try {
                    l(r.next(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function u(c) {
                  try {
                    l(r.throw(c));
                  } catch (d) {
                    s(d);
                  }
                }
                function l(c) {
                  c.done
                    ? i(c.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i);
                            });
                      })(c.value).then(a, u);
                }
                l((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Uu(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (s) {
                o = { error: s };
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Pt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(i), !o)) return i;
      }
      function el(e, t, n = 1 / 0) {
        return J(t)
          ? el(
              (r, o) =>
                (function Zg(e, t) {
                  return qn((n, r) => {
                    let o = 0;
                    n.subscribe(
                      qr(r, (i) => {
                        r.next(e.call(t, i, o++));
                      })
                    );
                  });
                })((i, s) => t(r, i, o, s))($t(e(r, o))),
              n
            )
          : ("number" == typeof t && (n = t),
            qn((r, o) =>
              (function _m(e, t, n, r, o, i, s, a) {
                const u = [];
                let l = 0,
                  c = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !l && t.complete();
                  },
                  h = (g) => (l < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), l++;
                    let D = !1;
                    $t(n(g, c++)).subscribe(
                      qr(
                        t,
                        (v) => {
                          o?.(v), i ? h(v) : t.next(v);
                        },
                        () => {
                          D = !0;
                        },
                        void 0,
                        () => {
                          if (D)
                            try {
                              for (l--; u.length && l < r; ) {
                                const v = u.shift();
                                s ? Pt(t, s, () => p(v)) : p(v);
                              }
                              f();
                            } catch (v) {
                              t.error(v);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    qr(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      const tl = new be((e) => e.complete());
      function Pi(e) {
        return e[e.length - 1];
      }
      function nl(e, t = 0) {
        return qn((n, r) => {
          n.subscribe(
            qr(
              r,
              (o) => Pt(r, e, () => r.next(o), t),
              () => Pt(r, e, () => r.complete(), t),
              (o) => Pt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function rl(e, t = 0) {
        return qn((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function ol(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new be((n) => {
          Pt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Pt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function xm(...e) {
        const t = (function Im(e) {
            return (function Cm(e) {
              return e && J(e.schedule);
            })(Pi(e))
              ? e.pop()
              : void 0;
          })(e),
          n = (function bm(e, t) {
            return "number" == typeof Pi(e) ? e.pop() : t;
          })(e, 1 / 0),
          r = e;
        return r.length
          ? 1 === r.length
            ? $t(r[0])
            : (function wm(e = 1 / 0) {
                return el(Lu, e);
              })(n)(
                (function Fm(e, t) {
                  return t
                    ? (function Pm(e, t) {
                        if (null != e) {
                          if (Wu(e))
                            return (function Sm(e, t) {
                              return $t(e).pipe(rl(t), nl(t));
                            })(e, t);
                          if (zu(e))
                            return (function Tm(e, t) {
                              return new be((n) => {
                                let r = 0;
                                return t.schedule(function () {
                                  r === e.length
                                    ? n.complete()
                                    : (n.next(e[r++]),
                                      n.closed || this.schedule());
                                });
                              });
                            })(e, t);
                          if (Gu(e))
                            return (function Mm(e, t) {
                              return $t(e).pipe(rl(t), nl(t));
                            })(e, t);
                          if (qu(e)) return ol(e, t);
                          if (Qu(e))
                            return (function Am(e, t) {
                              return new be((n) => {
                                let r;
                                return (
                                  Pt(n, t, () => {
                                    (r = e[Yu]()),
                                      Pt(
                                        n,
                                        t,
                                        () => {
                                          let o, i;
                                          try {
                                            ({ value: o, done: i } = r.next());
                                          } catch (s) {
                                            return void n.error(s);
                                          }
                                          i ? n.complete() : n.next(o);
                                        },
                                        0,
                                        !0
                                      );
                                  }),
                                  () => J(r?.return) && r.return()
                                );
                              });
                            })(e, t);
                          if (Xu(e))
                            return (function Nm(e, t) {
                              return ol(Ku(e), t);
                            })(e, t);
                        }
                        throw Zu(e);
                      })(e, t)
                    : $t(e);
                })(r, t)
              )
          : tl;
      }
      function Fi(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new Wn({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return t(...n).subscribe(r);
      }
      function G(e) {
        for (let t in e) if (e[t] === G) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function W(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(W).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function Oi(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const Rm = G({ __forward_ref__: G });
      function Ri(e) {
        return (
          (e.__forward_ref__ = Ri),
          (e.toString = function () {
            return W(this());
          }),
          e
        );
      }
      function S(e) {
        return (function Li(e) {
          return (
            "function" == typeof e &&
            e.hasOwnProperty(Rm) &&
            e.__forward_ref__ === Ri
          );
        })(e)
          ? e()
          : e;
      }
      function ki(e) {
        return e && !!e.ɵproviders;
      }
      class C extends Error {
        constructor(t, n) {
          super(Zr(t, n)), (this.code = t);
        }
      }
      function Zr(e, t) {
        return `NG0${Math.abs(e)}${t ? ": " + t.trim() : ""}`;
      }
      function A(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function Yr(e, t) {
        throw new C(-201, !1);
      }
      function je(e, t) {
        null == e &&
          (function U(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function Q(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function tn(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function Qr(e) {
        return sl(e, Kr) || sl(e, ul);
      }
      function sl(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function al(e) {
        return e && (e.hasOwnProperty(ji) || e.hasOwnProperty($m))
          ? e[ji]
          : null;
      }
      const Kr = G({ ɵprov: G }),
        ji = G({ ɵinj: G }),
        ul = G({ ngInjectableDef: G }),
        $m = G({ ngInjectorDef: G });
      var T = (() => (
        ((T = T || {})[(T.Default = 0)] = "Default"),
        (T[(T.Host = 1)] = "Host"),
        (T[(T.Self = 2)] = "Self"),
        (T[(T.SkipSelf = 4)] = "SkipSelf"),
        (T[(T.Optional = 8)] = "Optional"),
        T
      ))();
      let Bi;
      function Be(e) {
        const t = Bi;
        return (Bi = e), t;
      }
      function ll(e, t, n) {
        const r = Qr(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & T.Optional
          ? null
          : void 0 !== t
          ? t
          : void Yr(W(e));
      }
      const Z = (() =>
          (typeof globalThis < "u" && globalThis) ||
          (typeof global < "u" && global) ||
          (typeof window < "u" && window) ||
          (typeof self < "u" &&
            typeof WorkerGlobalScope < "u" &&
            self instanceof WorkerGlobalScope &&
            self))(),
        Zn = {},
        Vi = "__NG_DI_FLAG__",
        Xr = "ngTempTokenPath",
        zm = "ngTokenPath",
        Gm = /\n/gm,
        Wm = "\u0275",
        cl = "__source";
      let Yn;
      function nn(e) {
        const t = Yn;
        return (Yn = e), t;
      }
      function qm(e, t = T.Default) {
        if (void 0 === Yn) throw new C(-203, !1);
        return null === Yn
          ? ll(e, void 0, t)
          : Yn.get(e, t & T.Optional ? null : void 0, t);
      }
      function B(e, t = T.Default) {
        return (
          (function Um() {
            return Bi;
          })() || qm
        )(S(e), t);
      }
      function Jr(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Hi(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = S(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new C(900, !1);
            let o,
              i = T.Default;
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = Ym(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a);
            }
            t.push(B(o, i));
          } else t.push(B(r));
        }
        return t;
      }
      function Qn(e, t) {
        return (e[Vi] = t), (e.prototype[Vi] = t), e;
      }
      function Ym(e) {
        return e[Vi];
      }
      function pt(e) {
        return { toString: e }.toString();
      }
      var nt = (() => (
          ((nt = nt || {})[(nt.OnPush = 0)] = "OnPush"),
          (nt[(nt.Default = 1)] = "Default"),
          nt
        ))(),
        rt = (() => {
          return (
            ((e = rt || (rt = {}))[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            rt
          );
          var e;
        })();
      const gt = {},
        V = [],
        eo = G({ ɵcmp: G }),
        $i = G({ ɵdir: G }),
        Ui = G({ ɵpipe: G }),
        fl = G({ ɵmod: G }),
        mt = G({ ɵfac: G }),
        Kn = G({ __NG_ELEMENT_ID__: G });
      let Xm = 0;
      function to(e) {
        return pt(() => {
          const t = pl(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === nt.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              data: e.data || {},
              encapsulation: e.encapsulation || rt.Emulated,
              id: "c" + Xm++,
              styles: e.styles || V,
              _: null,
              schemas: e.schemas || null,
              tView: null,
            };
          gl(n);
          const r = e.dependencies;
          return (n.directiveDefs = no(r, !1)), (n.pipeDefs = no(r, !0)), n;
        });
      }
      function ey(e) {
        return z(e) || pe(e);
      }
      function ty(e) {
        return null !== e;
      }
      function Xn(e) {
        return pt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || V,
          declarations: e.declarations || V,
          imports: e.imports || V,
          exports: e.exports || V,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function hl(e, t) {
        if (null == e) return gt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o;
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i);
          }
        return n;
      }
      function Ve(e) {
        return pt(() => {
          const t = pl(e);
          return gl(t), t;
        });
      }
      function z(e) {
        return e[eo] || null;
      }
      function pe(e) {
        return e[$i] || null;
      }
      function Me(e) {
        return e[Ui] || null;
      }
      function pl(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          selectors: e.selectors || V,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: hl(e.inputs, t),
          outputs: hl(e.outputs),
        };
      }
      function gl(e) {
        e.features?.forEach((t) => t(e));
      }
      function no(e, t) {
        if (!e) return null;
        const n = t ? Me : ey;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(ty);
      }
      const yt = 0,
        w = 1,
        F = 2,
        ee = 3,
        We = 4,
        Ut = 5,
        ge = 6,
        rn = 7,
        ne = 8,
        ro = 9,
        oo = 10,
        O = 11,
        zi = 12,
        er = 13,
        ml = 14,
        on = 15,
        me = 16,
        tr = 17,
        sn = 18,
        ot = 19,
        nr = 20,
        yl = 21,
        Y = 22,
        Gi = 1,
        Dl = 2,
        io = 7,
        so = 8,
        an = 9,
        _e = 10;
      function Oe(e) {
        return Array.isArray(e) && "object" == typeof e[Gi];
      }
      function qe(e) {
        return Array.isArray(e) && !0 === e[Gi];
      }
      function Wi(e) {
        return 0 != (4 & e.flags);
      }
      function rr(e) {
        return e.componentOffset > -1;
      }
      function ao(e) {
        return 1 == (1 & e.flags);
      }
      function Ze(e) {
        return !!e.template;
      }
      function ry(e) {
        return 0 != (256 & e[F]);
      }
      function zt(e, t) {
        return e.hasOwnProperty(mt) ? e[mt] : null;
      }
      class sy {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function wl(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = uy), ay;
      }
      function ay() {
        const e = Cl(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === gt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function uy(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            Cl(e) ||
            (function ly(e, t) {
              return (e[El] = t);
            })(e, { previous: gt, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o];
        (s[o] = new sy(u && u.currentValue, t, a === gt)), (e[r] = t);
      }
      const El = "__ngSimpleChanges__";
      function Cl(e) {
        return e[El] || null;
      }
      const He = function (e, t, n) {};
      function fe(e) {
        for (; Array.isArray(e); ) e = e[yt];
        return e;
      }
      function Re(e, t) {
        return fe(t[e.index]);
      }
      function Sl(e, t) {
        return e.data[t];
      }
      function Te(e, t) {
        const n = t[e];
        return Oe(n) ? n : n[yt];
      }
      function co(e) {
        return 64 == (64 & e[F]);
      }
      function xt(e, t) {
        return null == t ? null : e[t];
      }
      function Ml(e) {
        e[sn] = 0;
      }
      function Zi(e, t) {
        e[Ut] += t;
        let n = e,
          r = e[ee];
        for (
          ;
          null !== r && ((1 === t && 1 === n[Ut]) || (-1 === t && 0 === n[Ut]));

        )
          (r[Ut] += t), (n = r), (r = r[ee]);
      }
      const N = { lFrame: kl(null), bindingsEnabled: !0 };
      function Al() {
        return N.bindingsEnabled;
      }
      function y() {
        return N.lFrame.lView;
      }
      function j() {
        return N.lFrame.tView;
      }
      function he() {
        let e = Nl();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Nl() {
        return N.lFrame.currentTNode;
      }
      function it(e, t) {
        const n = N.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function Yi() {
        return N.lFrame.isParent;
      }
      function Qi() {
        N.lFrame.isParent = !1;
      }
      function ln() {
        return N.lFrame.bindingIndex++;
      }
      function Iy(e, t) {
        const n = N.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Ki(t);
      }
      function Ki(e) {
        N.lFrame.currentDirectiveIndex = e;
      }
      function Ji(e) {
        N.lFrame.currentQueryIndex = e;
      }
      function Sy(e) {
        const t = e[w];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[ge] : null;
      }
      function Rl(e, t, n) {
        if (n & T.SkipSelf) {
          let o = t,
            i = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & T.Host ||
              ((o = Sy(i)), null === o || ((i = i[on]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = i);
        }
        const r = (N.lFrame = Ll());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function es(e) {
        const t = Ll(),
          n = e[w];
        (N.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function Ll() {
        const e = N.lFrame,
          t = null === e ? null : e.child;
        return null === t ? kl(e) : t;
      }
      function kl(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function jl() {
        const e = N.lFrame;
        return (
          (N.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Bl = jl;
      function ts() {
        const e = jl();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Ee() {
        return N.lFrame.selectedIndex;
      }
      function Gt(e) {
        N.lFrame.selectedIndex = e;
      }
      function fo(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: l,
              ngOnDestroy: c,
            } = i;
          s && (e.contentHooks ?? (e.contentHooks = [])).push(-n, s),
            a &&
              ((e.contentHooks ?? (e.contentHooks = [])).push(n, a),
              (e.contentCheckHooks ?? (e.contentCheckHooks = [])).push(n, a)),
            u && (e.viewHooks ?? (e.viewHooks = [])).push(-n, u),
            l &&
              ((e.viewHooks ?? (e.viewHooks = [])).push(n, l),
              (e.viewCheckHooks ?? (e.viewCheckHooks = [])).push(n, l)),
            null != c && (e.destroyHooks ?? (e.destroyHooks = [])).push(n, c);
        }
      }
      function ho(e, t, n) {
        Vl(e, t, 3, n);
      }
      function po(e, t, n, r) {
        (3 & e[F]) === n && Vl(e, t, n, r);
      }
      function ns(e, t) {
        let n = e[F];
        (3 & n) === t && ((n &= 2047), (n += 1), (e[F] = n));
      }
      function Vl(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[sn] : 0; u < s; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[sn] += 65536),
              (a < i || -1 == i) &&
                (Ry(e, n, t, u), (e[sn] = (4294901760 & e[sn]) + u + 2)),
              u++;
      }
      function Ry(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        if (o) {
          if (e[F] >> 11 < e[sn] >> 16 && (3 & e[F]) === t) {
            (e[F] += 2048), He(4, a, i);
            try {
              i.call(a);
            } finally {
              He(5, a, i);
            }
          }
        } else {
          He(4, a, i);
          try {
            i.call(a);
          } finally {
            He(5, a, i);
          }
        }
      }
      const cn = -1;
      class ir {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function os(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const i = n[r++],
              s = n[r++],
              a = n[r++];
            e.setAttribute(t, s, a, i);
          } else {
            const i = o,
              s = n[++r];
            $l(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++;
          }
        }
        return r;
      }
      function Hl(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function $l(e) {
        return 64 === e.charCodeAt(0);
      }
      function sr(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  Ul(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function Ul(e, t, n, r, o) {
        let i = 0,
          s = e.length;
        if (-1 === t) s = -1;
        else
          for (; i < e.length; ) {
            const a = e[i++];
            if ("number" == typeof a) {
              if (a === t) {
                s = -1;
                break;
              }
              if (a > t) {
                s = i - 1;
                break;
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o));
            if (r === e[i + 1]) return void (e[i + 2] = o);
          }
          i++, null !== r && i++, null !== o && i++;
        }
        -1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o);
      }
      function zl(e) {
        return e !== cn;
      }
      function go(e) {
        return 32767 & e;
      }
      function mo(e, t) {
        let n = (function By(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[on]), n--;
        return r;
      }
      let is = !0;
      function yo(e) {
        const t = is;
        return (is = e), t;
      }
      const Gl = 255,
        Wl = 5;
      let Vy = 0;
      const st = {};
      function Do(e, t) {
        const n = ql(e, t);
        if (-1 !== n) return n;
        const r = t[w];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          ss(r.data, e),
          ss(t, null),
          ss(r.blueprint, null));
        const o = as(e, t),
          i = e.injectorIndex;
        if (zl(o)) {
          const s = go(o),
            a = mo(o, t),
            u = a[w].data;
          for (let l = 0; l < 8; l++) t[i + l] = a[s + l] | u[s + l];
        }
        return (t[i + 8] = o), i;
      }
      function ss(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function ql(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function as(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = ec(o)), null === r)) return cn;
          if ((n++, (o = o[on]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return cn;
      }
      function us(e, t, n) {
        !(function Hy(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(Kn) && (r = n[Kn]),
            null == r && (r = n[Kn] = Vy++);
          const o = r & Gl;
          t.data[e + (o >> Wl)] |= 1 << o;
        })(e, t, n);
      }
      function Zl(e, t, n) {
        if (n & T.Optional || void 0 !== e) return e;
        Yr();
      }
      function Yl(e, t, n, r) {
        if (
          (n & T.Optional && void 0 === r && (r = null),
          !(n & (T.Self | T.Host)))
        ) {
          const o = e[ro],
            i = Be(void 0);
          try {
            return o ? o.get(t, r, n & T.Optional) : ll(t, r, n & T.Optional);
          } finally {
            Be(i);
          }
        }
        return Zl(r, 0, n);
      }
      function Ql(e, t, n, r = T.Default, o) {
        if (null !== e) {
          if (1024 & t[F]) {
            const s = (function qy(e, t, n, r, o) {
              let i = e,
                s = t;
              for (
                ;
                null !== i && null !== s && 1024 & s[F] && !(256 & s[F]);

              ) {
                const a = Kl(i, s, n, r | T.Self, st);
                if (a !== st) return a;
                let u = i.parent;
                if (!u) {
                  const l = s[yl];
                  if (l) {
                    const c = l.get(n, st, r);
                    if (c !== st) return c;
                  }
                  (u = ec(s)), (s = s[on]);
                }
                i = u;
              }
              return o;
            })(e, t, n, r, st);
            if (s !== st) return s;
          }
          const i = Kl(e, t, n, r, st);
          if (i !== st) return i;
        }
        return Yl(t, n, r, o);
      }
      function Kl(e, t, n, r, o) {
        const i = (function zy(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(Kn) ? e[Kn] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Gl : Gy) : t;
        })(n);
        if ("function" == typeof i) {
          if (!Rl(t, e, r)) return r & T.Host ? Zl(o, 0, r) : Yl(t, n, r, o);
          try {
            const s = i(r);
            if (null != s || r & T.Optional) return s;
            Yr();
          } finally {
            Bl();
          }
        } else if ("number" == typeof i) {
          let s = null,
            a = ql(e, t),
            u = cn,
            l = r & T.Host ? t[me][ge] : null;
          for (
            (-1 === a || r & T.SkipSelf) &&
            ((u = -1 === a ? as(e, t) : t[a + 8]),
            u !== cn && Jl(r, !1)
              ? ((s = t[w]), (a = go(u)), (t = mo(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const c = t[w];
            if (Xl(i, a, c.data)) {
              const d = Uy(a, t, n, s, r, l);
              if (d !== st) return d;
            }
            (u = t[a + 8]),
              u !== cn && Jl(r, t[w].data[a + 8] === l) && Xl(i, a, t)
                ? ((s = c), (a = go(u)), (t = mo(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function Uy(e, t, n, r, o, i) {
        const s = t[w],
          a = s.data[e + 8],
          c = (function vo(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              c = i >> 20,
              f = o ? a + c : e.directiveEnd;
            for (let h = r ? a : a + c; h < f; h++) {
              const p = s[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = s[u];
              if (h && Ze(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            s,
            n,
            null == r ? rr(a) && is : r != s && 0 != (3 & a.type),
            o & T.Host && i === a
          );
        return null !== c ? Wt(t, s, c, a) : st;
      }
      function Wt(e, t, n, r) {
        let o = e[n];
        const i = t.data;
        if (
          (function Ly(e) {
            return e instanceof ir;
          })(o)
        ) {
          const s = o;
          s.resolving &&
            (function Lm(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new C(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function $(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : A(e);
              })(i[n])
            );
          const a = yo(s.canSeeViewProviders);
          s.resolving = !0;
          const u = s.injectImpl ? Be(s.injectImpl) : null;
          Rl(e, r, T.Default);
          try {
            (o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function Oy(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype;
                  if (r) {
                    const s = wl(t);
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, s),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, s);
                  }
                  o &&
                    (n.preOrderHooks ?? (n.preOrderHooks = [])).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ?? (n.preOrderHooks = [])).push(e, i),
                      (
                        n.preOrderCheckHooks ?? (n.preOrderCheckHooks = [])
                      ).push(e, i));
                })(n, i[n], t);
          } finally {
            null !== u && Be(u), yo(a), (s.resolving = !1), Bl();
          }
        }
        return o;
      }
      function Xl(e, t, n) {
        return !!(n[t + (e >> Wl)] & (1 << e));
      }
      function Jl(e, t) {
        return !(e & T.Self || (e & T.Host && t));
      }
      class dn {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Ql(this._tNode, this._lView, t, Jr(r), n);
        }
      }
      function Gy() {
        return new dn(he(), y());
      }
      function ec(e) {
        const t = e[w],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[ge] : null;
      }
      const hn = "__parameters__";
      function gn(e, t, n) {
        return pt(() => {
          const r = (function ds(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...i) {
            if (this instanceof o) return r.apply(this, i), this;
            const s = new o(...i);
            return (a.annotation = s), a;
            function a(u, l, c) {
              const d = u.hasOwnProperty(hn)
                ? u[hn]
                : Object.defineProperty(u, hn, { value: [] })[hn];
              for (; d.length <= c; ) d.push(null);
              return (d[c] = d[c] || []).push(s), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      class R {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = Q({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      function qt(e, t) {
        e.forEach((n) => (Array.isArray(n) ? qt(n, t) : t(n)));
      }
      function nc(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function _o(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      const Eo = Qn(gn("Optional"), 8),
        Co = Qn(gn("SkipSelf"), 4);
      var Ae = (() => (
        ((Ae = Ae || {})[(Ae.Important = 1)] = "Important"),
        (Ae[(Ae.DashCase = 2)] = "DashCase"),
        Ae
      ))();
      const vs = new Map();
      let vD = 0;
      const ws = "__ngContext__";
      function ye(e, t) {
        Oe(t)
          ? ((e[ws] = t[nr]),
            (function wD(e) {
              vs.set(e[nr], e);
            })(t))
          : (e[ws] = t);
      }
      let Es;
      function Cs(e, t) {
        return Es(e, t);
      }
      function hr(e) {
        const t = e[ee];
        return qe(t) ? t[ee] : t;
      }
      function Is(e) {
        return Cc(e[er]);
      }
      function bs(e) {
        return Cc(e[We]);
      }
      function Cc(e) {
        for (; null !== e && !qe(e); ) e = e[We];
        return e;
      }
      function Dn(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1;
          qe(r) ? (i = r) : Oe(r) && ((s = !0), (r = r[yt]));
          const a = fe(r);
          0 === e && null !== n
            ? null == o
              ? Ac(t, n, a)
              : Zt(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? Zt(t, n, a, o || null, !0)
            : 2 === e
            ? (function Fs(e, t, n) {
                const r = So(e, t);
                r &&
                  (function HD(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function zD(e, t, n, r, o) {
                const i = n[io];
                i !== fe(n) && Dn(t, e, r, i, o);
                for (let a = _e; a < n.length; a++) {
                  const u = n[a];
                  pr(u[w], u, e, t, r, i);
                }
              })(t, e, i, n, o);
        }
      }
      function Ms(e, t, n) {
        return e.createElement(t, n);
      }
      function bc(e, t) {
        const n = e[an],
          r = n.indexOf(t),
          o = t[ee];
        512 & t[F] && ((t[F] &= -513), Zi(o, -1)), n.splice(r, 1);
      }
      function Ts(e, t) {
        if (e.length <= _e) return;
        const n = _e + t,
          r = e[n];
        if (r) {
          const o = r[tr];
          null !== o && o !== e && bc(o, r), t > 0 && (e[n - 1][We] = r[We]);
          const i = _o(e, _e + t);
          !(function xD(e, t) {
            pr(e, t, t[O], 2, null, null), (t[yt] = null), (t[ge] = null);
          })(r[w], r);
          const s = i[ot];
          null !== s && s.detachView(i[w]),
            (r[ee] = null),
            (r[We] = null),
            (r[F] &= -65);
        }
        return r;
      }
      function Sc(e, t) {
        if (!(128 & t[F])) {
          const n = t[O];
          n.destroyNode && pr(e, t, n, 3, null, null),
            (function LD(e) {
              let t = e[er];
              if (!t) return As(e[w], e);
              for (; t; ) {
                let n = null;
                if (Oe(t)) n = t[er];
                else {
                  const r = t[_e];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[We] && t !== e; )
                    Oe(t) && As(t[w], t), (t = t[ee]);
                  null === t && (t = e), Oe(t) && As(t[w], t), (n = t && t[We]);
                }
                t = n;
              }
            })(t);
        }
      }
      function As(e, t) {
        if (!(128 & t[F])) {
          (t[F] &= -65),
            (t[F] |= 128),
            (function VD(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof ir)) {
                    const i = n[r + 1];
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1];
                        He(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          He(5, a, u);
                        }
                      }
                    else {
                      He(4, o, i);
                      try {
                        i.call(o);
                      } finally {
                        He(5, o, i);
                      }
                    }
                  }
                }
            })(e, t),
            (function BD(e, t) {
              const n = e.cleanup,
                r = t[rn];
              let o = -1;
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ("string" == typeof n[i]) {
                    const s = n[i + 3];
                    s >= 0 ? r[(o = s)]() : r[(o = -s)].unsubscribe(), (i += 2);
                  } else {
                    const s = r[(o = n[i + 1])];
                    n[i].call(s);
                  }
              if (null !== r) {
                for (let i = o + 1; i < r.length; i++) (0, r[i])();
                t[rn] = null;
              }
            })(e, t),
            1 === t[w].type && t[O].destroy();
          const n = t[tr];
          if (null !== n && qe(t[ee])) {
            n !== t[ee] && bc(n, t);
            const r = t[ot];
            null !== r && r.detachView(e);
          }
          !(function ED(e) {
            vs.delete(e[nr]);
          })(t);
        }
      }
      function Mc(e, t, n) {
        return (function Tc(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[yt];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o];
              if (i === rt.None || i === rt.Emulated) return null;
            }
            return Re(r, n);
          }
        })(e, t.parent, n);
      }
      function Zt(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Ac(e, t, n) {
        e.appendChild(t, n);
      }
      function Nc(e, t, n, r, o) {
        null !== r ? Zt(e, t, n, r, o) : Ac(e, t, n);
      }
      function So(e, t) {
        return e.parentNode(t);
      }
      let Ns,
        Rs,
        xc = function Fc(e, t, n) {
          return 40 & e.type ? Re(e, n) : null;
        };
      function Mo(e, t, n, r) {
        const o = Mc(e, r, t),
          i = t[O],
          a = (function Pc(e, t, n) {
            return xc(e, t, n);
          })(r.parent || t[ge], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Nc(i, o, n[u], a, !1);
          else Nc(i, o, n, a, !1);
        void 0 !== Ns && Ns(i, r, t, n, o);
      }
      function To(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Re(t, e);
          if (4 & n) return Ps(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return To(e, r);
            {
              const o = e[t.index];
              return qe(o) ? Ps(-1, o) : fe(o);
            }
          }
          if (32 & n) return Cs(t, e)() || fe(e[t.index]);
          {
            const r = Rc(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : To(hr(e[me]), r)
              : To(e, t.next);
          }
        }
        return null;
      }
      function Rc(e, t) {
        return null !== t ? e[me][ge].projection[t.projection] : null;
      }
      function Ps(e, t) {
        const n = _e + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[w].firstChild;
          if (null !== o) return To(r, o);
        }
        return t[io];
      }
      function xs(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (s && 0 === t && (a && ye(fe(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) xs(e, t, n.child, r, o, i, !1), Dn(t, e, o, a, i);
            else if (32 & u) {
              const l = Cs(n, r);
              let c;
              for (; (c = l()); ) Dn(t, e, o, c, i);
              Dn(t, e, o, a, i);
            } else 16 & u ? Lc(e, t, r, n, o, i) : Dn(t, e, o, a, i);
          n = s ? n.projectionNext : n.next;
        }
      }
      function pr(e, t, n, r, o, i) {
        xs(n, r, e.firstChild, t, o, i, !1);
      }
      function Lc(e, t, n, r, o, i) {
        const s = n[me],
          u = s[ge].projection[r.projection];
        if (Array.isArray(u))
          for (let l = 0; l < u.length; l++) Dn(t, e, o, u[l], i);
        else xs(e, t, u, s[ee], o, i, !0);
      }
      function kc(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function jc(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n;
        null !== r && os(e, t, r),
          null !== o && kc(e, t, o),
          null !== i &&
            (function WD(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, i);
      }
      const Xc = new R("ENVIRONMENT_INITIALIZER"),
        Jc = new R("INJECTOR", -1),
        ed = new R("INJECTOR_DEF_TYPES");
      class td {
        get(t, n = Zn) {
          if (n === Zn) {
            const r = new Error(`NullInjectorError: No provider for ${W(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function _v(...e) {
        return { ɵproviders: nd(0, e), ɵfromNgModule: !0 };
      }
      function nd(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        return (
          qt(t, (i) => {
            const s = i;
            Hs(s, n, [], r) && (o || (o = []), o.push(s));
          }),
          void 0 !== o && rd(o, n),
          n
        );
      }
      function rd(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { providers: o } = e[n];
          $s(o, (i) => {
            t.push(i);
          });
        }
      }
      function Hs(e, t, n, r) {
        if (!(e = S(e))) return !1;
        let o = null,
          i = al(e);
        const s = !i && z(e);
        if (i || s) {
          if (s && !s.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((i = al(u)), !i)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (s) {
          if (a) return !1;
          if ((r.add(o), s.dependencies)) {
            const u =
              "function" == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies;
            for (const l of u) Hs(l, t, n, r);
          }
        } else {
          if (!i) return !1;
          {
            if (null != i.imports && !a) {
              let l;
              r.add(o);
              try {
                qt(i.imports, (c) => {
                  Hs(c, t, n, r) && (l || (l = []), l.push(c));
                });
              } finally {
              }
              void 0 !== l && rd(l, t);
            }
            if (!a) {
              const l = zt(o) || (() => new o());
              t.push(
                { provide: o, useFactory: l, deps: V },
                { provide: ed, useValue: o, multi: !0 },
                { provide: Xc, useValue: () => B(o), multi: !0 }
              );
            }
            const u = i.providers;
            null == u ||
              a ||
              $s(u, (c) => {
                t.push(c);
              });
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function $s(e, t) {
        for (let n of e)
          ki(n) && (n = n.ɵproviders), Array.isArray(n) ? $s(n, t) : t(n);
      }
      const wv = G({ provide: String, useValue: G });
      function Us(e) {
        return null !== e && "object" == typeof e && wv in e;
      }
      function Yt(e) {
        return "function" == typeof e;
      }
      const zs = new R("Set Injector scope."),
        Fo = {},
        Cv = {};
      let Gs;
      function xo() {
        return void 0 === Gs && (Gs = new td()), Gs;
      }
      class _n {}
      class sd extends _n {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            qs(t, (s) => this.processProvider(s)),
            this.records.set(Jc, wn(void 0, this)),
            o.has("environment") && this.records.set(_n, wn(void 0, this));
          const i = this.records.get(zs);
          null != i && "string" == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(ed.multi, V, T.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const t of this._ngOnDestroyHooks) t.ngOnDestroy();
            for (const t of this._onDestroyHooks) t();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear(),
              (this._onDestroyHooks.length = 0);
          }
        }
        onDestroy(t) {
          this._onDestroyHooks.push(t);
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = nn(this),
            r = Be(void 0);
          try {
            return t();
          } finally {
            nn(n), Be(r);
          }
        }
        get(t, n = Zn, r = T.Default) {
          this.assertNotDestroyed(), (r = Jr(r));
          const o = nn(this),
            i = Be(void 0);
          try {
            if (!(r & T.SkipSelf)) {
              let a = this.records.get(t);
              if (void 0 === a) {
                const u =
                  (function Tv(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof R)
                    );
                  })(t) && Qr(t);
                (a = u && this.injectableDefInScope(u) ? wn(Ws(t), Fo) : null),
                  this.records.set(t, a);
              }
              if (null != a) return this.hydrate(t, a);
            }
            return (r & T.Self ? xo() : this.parent).get(
              t,
              (n = r & T.Optional && n === Zn ? null : n)
            );
          } catch (s) {
            if ("NullInjectorError" === s.name) {
              if (((s[Xr] = s[Xr] || []).unshift(W(t)), o)) throw s;
              return (function Qm(e, t, n, r) {
                const o = e[Xr];
                throw (
                  (t[cl] && o.unshift(t[cl]),
                  (e.message = (function Km(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && e.charAt(1) == Wm
                        ? e.slice(2)
                        : e;
                    let o = W(t);
                    if (Array.isArray(t)) o = t.map(W).join(" -> ");
                    else if ("object" == typeof t) {
                      let i = [];
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s];
                          i.push(
                            s +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : W(a))
                          );
                        }
                      o = `{${i.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      Gm,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e[zm] = o),
                  (e[Xr] = null),
                  e)
                );
              })(s, t, "R3InjectorError", this.source);
            }
            throw s;
          } finally {
            Be(i), nn(o);
          }
        }
        resolveInjectorInitializers() {
          const t = nn(this),
            n = Be(void 0);
          try {
            const r = this.get(Xc.multi, V, T.Self);
            for (const o of r) o();
          } finally {
            nn(t), Be(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(W(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new C(205, !1);
        }
        processProvider(t) {
          let n = Yt((t = S(t))) ? t : S(t && t.provide);
          const r = (function bv(e) {
            return Us(e)
              ? wn(void 0, e.useValue)
              : wn(
                  (function ad(e, t, n) {
                    let r;
                    if (Yt(e)) {
                      const o = S(e);
                      return zt(o) || Ws(o);
                    }
                    if (Us(e)) r = () => S(e.useValue);
                    else if (
                      (function id(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Hi(e.deps || []));
                    else if (
                      (function od(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => B(S(e.useExisting));
                    else {
                      const o = S(e && (e.useClass || e.provide));
                      if (
                        !(function Sv(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return zt(o) || Ws(o);
                      r = () => new o(...Hi(e.deps));
                    }
                    return r;
                  })(e),
                  Fo
                );
          })(t);
          if (Yt(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = wn(void 0, Fo, !0)),
              (o.factory = () => Hi(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Fo && ((n.value = Cv), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function Mv(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = S(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
      }
      function Ws(e) {
        const t = Qr(e),
          n = null !== t ? t.factory : zt(e);
        if (null !== n) return n;
        if (e instanceof R) throw new C(204, !1);
        if (e instanceof Function)
          return (function Iv(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function lr(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new C(204, !1))
              );
            const n = (function Hm(e) {
              return (e && (e[Kr] || e[ul])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new C(204, !1);
      }
      function wn(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function qs(e, t) {
        for (const n of e)
          Array.isArray(n) ? qs(n, t) : n && ki(n) ? qs(n.ɵproviders, t) : t(n);
      }
      class Av {}
      class ud {}
      class Pv {
        resolveComponentFactory(t) {
          throw (function Nv(e) {
            const t = Error(
              `No component factory found for ${W(
                e
              )}. Did you add it to @NgModule.entryComponents?`
            );
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let Oo = (() => {
        class e {}
        return (e.NULL = new Pv()), e;
      })();
      function Fv() {
        return En(he(), y());
      }
      function En(e, t) {
        return new Cn(Re(e, t));
      }
      let Cn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n;
          }
        }
        return (e.__NG_ELEMENT_ID__ = Fv), e;
      })();
      class cd {}
      let Rv = (() => {
        class e {}
        return (
          (e.ɵprov = Q({ token: e, providedIn: "root", factory: () => null })),
          e
        );
      })();
      class Zs {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const Lv = new Zs("15.2.9"),
        Ys = {},
        Qs = "ngOriginalError";
      function Ks(e) {
        return e[Qs];
      }
      class In {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Ks(t);
          for (; n && Ks(n); ) n = Ks(n);
          return n || null;
        }
      }
      function hd(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length;
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o;
          }
          n = o + 1;
        }
      }
      const pd = "ng-template";
      function qv(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let i = e[r++];
          if ("string" == typeof i && o) {
            const s = e[r++];
            if (n && "class" === i && -1 !== hd(s.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === i) {
              for (; r < e.length && "string" == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof i && (o = !1);
          }
        }
        return !1;
      }
      function gd(e) {
        return 4 === e.type && e.value !== pd;
      }
      function Zv(e, t, n) {
        return t === (4 !== e.type || n ? e.value : pd);
      }
      function Yv(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          i = (function Xv(e) {
            for (let t = 0; t < e.length; t++) if (Hl(e[t])) return t;
            return e.length;
          })(o);
        let s = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !Zv(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (Ye(r)) return !1;
                  s = !0;
                }
              } else {
                const l = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!qv(e.attrs, l, n)) {
                    if (Ye(r)) return !1;
                    s = !0;
                  }
                  continue;
                }
                const d = Qv(8 & r ? "class" : u, o, gd(e), n);
                if (-1 === d) {
                  if (Ye(r)) return !1;
                  s = !0;
                  continue;
                }
                if ("" !== l) {
                  let f;
                  f = d > i ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== hd(h, l, 0)) || (2 & r && l !== f)) {
                    if (Ye(r)) return !1;
                    s = !0;
                  }
                }
              }
          } else {
            if (!s && !Ye(r) && !Ye(u)) return !1;
            if (s && Ye(u)) continue;
            (s = !1), (r = u | (1 & r));
          }
        }
        return Ye(r) || s;
      }
      function Ye(e) {
        return 0 == (1 & e);
      }
      function Qv(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let i = !1;
          for (; o < t.length; ) {
            const s = t[o];
            if (s === e) return o;
            if (3 === s || 6 === s) i = !0;
            else {
              if (1 === s || 2 === s) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === s) break;
              if (0 === s) {
                o += 4;
                continue;
              }
            }
            o += i ? 1 : 2;
          }
          return -1;
        }
        return (function Jv(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function md(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (Yv(e, t[r], n)) return !0;
        return !1;
      }
      function yd(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function t_(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          i = !1;
        for (; n < e.length; ) {
          let s = e[n];
          if ("string" == typeof s)
            if (2 & r) {
              const a = e[++n];
              o += "[" + s + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + s) : 4 & r && (o += " " + s);
          else
            "" !== o && !Ye(s) && ((t += yd(i, o)), (o = "")),
              (r = s),
              (i = i || !Ye(r));
          n++;
        }
        return "" !== o && (t += yd(i, o)), t;
      }
      const P = {};
      function Rt(e) {
        Dd(j(), y(), Ee() + e, !1);
      }
      function Dd(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[F])) {
            const i = e.preOrderCheckHooks;
            null !== i && ho(t, i, n);
          } else {
            const i = e.preOrderHooks;
            null !== i && po(t, i, 0, n);
          }
        Gt(n);
      }
      function Ed(e, t = null, n = null, r) {
        const o = Cd(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Cd(e, t = null, n = null, r, o = new Set()) {
        const i = [n || V, _v(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : W(e))),
          new sd(i, t || xo(), r || null, o)
        );
      }
      let Qt = (() => {
        class e {
          static create(n, r) {
            if (Array.isArray(n)) return Ed({ name: "" }, r, n, "");
            {
              const o = n.name ?? "";
              return Ed({ name: o }, n.parent, n.providers, o);
            }
          }
        }
        return (
          (e.THROW_IF_NOT_FOUND = Zn),
          (e.NULL = new td()),
          (e.ɵprov = Q({ token: e, providedIn: "any", factory: () => B(Jc) })),
          (e.__NG_ELEMENT_ID__ = -1),
          e
        );
      })();
      function L(e, t = T.Default) {
        const n = y();
        return null === n ? B(e, t) : Ql(he(), n, S(e), t);
      }
      function Nd(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1];
            if (-1 !== i) {
              const s = e.data[i];
              Ji(n[r]), s.contentQueries(2, t[i], i);
            }
          }
      }
      function Lo(e, t, n, r, o, i, s, a, u, l, c) {
        const d = t.blueprint.slice();
        return (
          (d[yt] = o),
          (d[F] = 76 | r),
          (null !== c || (e && 1024 & e[F])) && (d[F] |= 1024),
          Ml(d),
          (d[ee] = d[on] = e),
          (d[ne] = n),
          (d[oo] = s || (e && e[oo])),
          (d[O] = a || (e && e[O])),
          (d[zi] = u || (e && e[zi]) || null),
          (d[ro] = l || (e && e[ro]) || null),
          (d[ge] = i),
          (d[nr] = (function _D() {
            return vD++;
          })()),
          (d[yl] = c),
          (d[me] = 2 == t.type ? e[me] : d),
          d
        );
      }
      function Mn(e, t, n, r, o) {
        let i = e.data[t];
        if (null === i)
          (i = (function na(e, t, n, r, o) {
            const i = Nl(),
              s = Yi(),
              u = (e.data[t] = (function T_(e, t, n, r, o, i) {
                return {
                  type: n,
                  index: r,
                  insertBeforeIndex: null,
                  injectorIndex: t ? t.injectorIndex : -1,
                  directiveStart: -1,
                  directiveEnd: -1,
                  directiveStylingLast: -1,
                  componentOffset: -1,
                  propertyBindings: null,
                  flags: 0,
                  providerIndexes: 0,
                  value: o,
                  attrs: i,
                  mergedAttrs: null,
                  localNames: null,
                  initialInputs: void 0,
                  inputs: null,
                  outputs: null,
                  tView: null,
                  next: null,
                  prev: null,
                  projectionNext: null,
                  child: null,
                  parent: t,
                  projection: null,
                  styles: null,
                  stylesWithoutHost: null,
                  residualStyles: void 0,
                  classes: null,
                  classesWithoutHost: null,
                  residualClasses: void 0,
                  classBindings: 0,
                  styleBindings: 0,
                };
              })(0, s ? i : i && i.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            );
          })(e, t, n, r, o)),
            (function Cy() {
              return N.lFrame.inI18n;
            })() && (i.flags |= 32);
        else if (64 & i.type) {
          (i.type = n), (i.value = r), (i.attrs = o);
          const s = (function or() {
            const e = N.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          i.injectorIndex = null === s ? -1 : s.injectorIndex;
        }
        return it(i, !0), i;
      }
      function Dr(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function ra(e, t, n) {
        es(t);
        try {
          const r = e.viewQuery;
          null !== r && fa(1, r, n);
          const o = e.template;
          null !== o && Pd(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Nd(e, t),
            e.staticViewQueries && fa(2, e.viewQuery, n);
          const i = e.components;
          null !== i &&
            (function b_(e, t) {
              for (let n = 0; n < t.length; n++) Z_(e, t[n]);
            })(t, i);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[F] &= -5), ts();
        }
      }
      function ko(e, t, n, r) {
        const o = t[F];
        if (128 != (128 & o)) {
          es(t);
          try {
            Ml(t),
              (function Fl(e) {
                return (N.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Pd(e, t, n, 2, r);
            const s = 3 == (3 & o);
            if (s) {
              const l = e.preOrderCheckHooks;
              null !== l && ho(t, l, null);
            } else {
              const l = e.preOrderHooks;
              null !== l && po(t, l, 0, null), ns(t, 0);
            }
            if (
              ((function W_(e) {
                for (let t = Is(e); null !== t; t = bs(t)) {
                  if (!t[Dl]) continue;
                  const n = t[an];
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    512 & o[F] || Zi(o[ee], 1), (o[F] |= 512);
                  }
                }
              })(t),
              (function G_(e) {
                for (let t = Is(e); null !== t; t = bs(t))
                  for (let n = _e; n < t.length; n++) {
                    const r = t[n],
                      o = r[w];
                    co(r) && ko(o, r, o.template, r[ne]);
                  }
              })(t),
              null !== e.contentQueries && Nd(e, t),
              s)
            ) {
              const l = e.contentCheckHooks;
              null !== l && ho(t, l);
            } else {
              const l = e.contentHooks;
              null !== l && po(t, l, 1), ns(t, 1);
            }
            !(function C_(e, t) {
              const n = e.hostBindingOpCodes;
              if (null !== n)
                try {
                  for (let r = 0; r < n.length; r++) {
                    const o = n[r];
                    if (o < 0) Gt(~o);
                    else {
                      const i = o,
                        s = n[++r],
                        a = n[++r];
                      Iy(s, i), a(2, t[i]);
                    }
                  }
                } finally {
                  Gt(-1);
                }
            })(e, t);
            const a = e.components;
            null !== a &&
              (function I_(e, t) {
                for (let n = 0; n < t.length; n++) q_(e, t[n]);
              })(t, a);
            const u = e.viewQuery;
            if ((null !== u && fa(2, u, r), s)) {
              const l = e.viewCheckHooks;
              null !== l && ho(t, l);
            } else {
              const l = e.viewHooks;
              null !== l && po(t, l, 2), ns(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[F] &= -41),
              512 & t[F] && ((t[F] &= -513), Zi(t[ee], -1));
          } finally {
            ts();
          }
        }
      }
      function Pd(e, t, n, r, o) {
        const i = Ee(),
          s = 2 & r;
        try {
          Gt(-1),
            s && t.length > Y && Dd(e, t, Y, !1),
            He(s ? 2 : 0, o),
            n(r, o);
        } finally {
          Gt(i), He(s ? 3 : 1, o);
        }
      }
      function oa(e, t, n) {
        if (Wi(t)) {
          const o = t.directiveEnd;
          for (let i = t.directiveStart; i < o; i++) {
            const s = e.data[i];
            s.contentQueries && s.contentQueries(1, n[i], i);
          }
        }
      }
      function ia(e, t, n) {
        Al() &&
          ((function R_(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd;
            rr(n) &&
              (function $_(e, t, n) {
                const r = Re(t, e),
                  o = Fd(n),
                  i = e[oo],
                  s = jo(
                    e,
                    Lo(
                      e,
                      o,
                      null,
                      n.onPush ? 32 : 16,
                      r,
                      t,
                      i,
                      i.createRenderer(r, n),
                      null,
                      null,
                      null
                    )
                  );
                e[t.index] = s;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || Do(n, t),
              ye(r, t);
            const s = n.initialInputs;
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                l = Wt(t, e, a, n);
              ye(l, t),
                null !== s && U_(0, a - o, l, u, 0, s),
                Ze(u) && (Te(n.index, t)[ne] = Wt(t, e, a, n));
            }
          })(e, t, n, Re(n, t)),
          64 == (64 & n.flags) && kd(e, t, n));
      }
      function sa(e, t, n = Re) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s];
            e[o++] = a;
          }
        }
      }
      function Fd(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = aa(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts
            ))
          : t;
      }
      function aa(e, t, n, r, o, i, s, a, u, l) {
        const c = Y + r,
          d = c + o,
          f = (function S_(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : P);
            return n;
          })(c, d),
          h = "function" == typeof l ? l() : l;
        return (f[w] = {
          type: e,
          blueprint: f,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: f.slice().fill(null, c),
          bindingStartIndex: c,
          expandoStartIndex: d,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof i ? i() : i,
          pipeRegistry: "function" == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: h,
          incompleteFirstPass: !1,
        });
      }
      function Od(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const i = e[o];
            null === r
              ? Rd(n, t, o, i)
              : r.hasOwnProperty(o) && Rd(n, t, r[o], i);
          }
        return n;
      }
      function Rd(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function ua(e, t, n, r) {
        if (Al()) {
          const o = null === r ? null : { "": -1 },
            i = (function k_(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i];
                  if (md(t, s.selectors, !1))
                    if ((r || (r = []), Ze(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          la(e, t, a.length);
                      } else r.unshift(s), la(e, t, 0);
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let s, a;
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && Ld(e, t, n, s, o, a),
            o &&
              (function j_(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]];
                    if (null == i) throw new C(-301, !1);
                    r.push(t[o], i);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = sr(n.mergedAttrs, n.attrs);
      }
      function Ld(e, t, n, r, o, i) {
        for (let l = 0; l < r.length; l++) us(Do(n, t), e, r[l].type);
        !(function V_(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          c.providersResolver && c.providersResolver(c);
        }
        let s = !1,
          a = !1,
          u = Dr(e, t, r.length, null);
        for (let l = 0; l < r.length; l++) {
          const c = r[l];
          (n.mergedAttrs = sr(n.mergedAttrs, c.hostAttrs)),
            H_(e, n, t, u, c),
            B_(u, c, o),
            null !== c.contentQueries && (n.flags |= 4),
            (null !== c.hostBindings ||
              null !== c.hostAttrs ||
              0 !== c.hostVars) &&
              (n.flags |= 64);
          const d = c.type.prototype;
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ?? (e.preOrderHooks = [])).push(n.index),
            (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ?? (e.preOrderCheckHooks = [])).push(
                n.index
              ),
              (a = !0)),
            u++;
        }
        !(function A_(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = [];
          let u = null,
            l = null;
          for (let c = t.directiveStart; c < o; c++) {
            const d = i[c],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = Od(d.inputs, c, u, f ? f.inputs : null)),
              (l = Od(d.outputs, c, l, p));
            const g = null === u || null === s || gd(t) ? null : z_(u, c, s);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = l);
        })(e, n, i);
      }
      function kd(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function by() {
            return N.lFrame.currentDirectiveIndex;
          })();
        try {
          Gt(i);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              l = t[a];
            Ki(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                L_(u, l);
          }
        } finally {
          Gt(-1), Ki(s);
        }
      }
      function L_(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function la(e, t, n) {
        (t.componentOffset = n),
          (e.components ?? (e.components = [])).push(t.index);
      }
      function B_(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Ze(t) && (n[""] = e);
        }
      }
      function H_(e, t, n, r, o) {
        e.data[r] = o;
        const i = o.factory || (o.factory = zt(o.type)),
          s = new ir(i, Ze(o), L);
        (e.blueprint[r] = s),
          (n[r] = s),
          (function x_(e, t, n, r, o) {
            const i = o.hostBindings;
            if (i) {
              let s = e.hostBindingOpCodes;
              null === s && (s = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function O_(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(s) != a && s.push(a),
                s.push(n, r, i);
            }
          })(e, t, r, Dr(e, n, o.hostVars, P), o);
      }
      function U_(e, t, n, r, o, i) {
        const s = i[t];
        if (null !== s) {
          const a = r.setInput;
          for (let u = 0; u < s.length; ) {
            const l = s[u++],
              c = s[u++],
              d = s[u++];
            null !== a ? r.setInput(n, d, l, c) : (n[c] = d);
          }
        }
      }
      function z_(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const i = n[o];
          if (0 !== i)
            if (5 !== i) {
              if ("number" == typeof i) break;
              if (e.hasOwnProperty(i)) {
                null === r && (r = []);
                const s = e[i];
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function jd(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null];
      }
      function q_(e, t) {
        const n = Te(t, e);
        if (co(n)) {
          const r = n[w];
          48 & n[F] ? ko(r, n, r.template, n[ne]) : n[Ut] > 0 && da(n);
        }
      }
      function da(e) {
        for (let r = Is(e); null !== r; r = bs(r))
          for (let o = _e; o < r.length; o++) {
            const i = r[o];
            if (co(i))
              if (512 & i[F]) {
                const s = i[w];
                ko(s, i, s.template, i[ne]);
              } else i[Ut] > 0 && da(i);
          }
        const n = e[w].components;
        if (null !== n)
          for (let r = 0; r < n.length; r++) {
            const o = Te(n[r], e);
            co(o) && o[Ut] > 0 && da(o);
          }
      }
      function Z_(e, t) {
        const n = Te(t, e),
          r = n[w];
        (function Y_(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n),
          ra(r, n, n[ne]);
      }
      function jo(e, t) {
        return e[er] ? (e[ml][We] = t) : (e[er] = t), (e[ml] = t), t;
      }
      function Bo(e) {
        for (; e; ) {
          e[F] |= 32;
          const t = hr(e);
          if (ry(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Vo(e, t, n, r = !0) {
        const o = t[oo];
        o.begin && o.begin();
        try {
          ko(e, t, e.template, n);
        } catch (s) {
          throw (r && $d(t, s), s);
        } finally {
          o.end && o.end();
        }
      }
      function fa(e, t, n) {
        Ji(0), t(e, n);
      }
      function Bd(e) {
        return e[rn] || (e[rn] = []);
      }
      function Vd(e) {
        return e.cleanup || (e.cleanup = []);
      }
      function $d(e, t) {
        const n = e[ro],
          r = n ? n.get(In, null) : null;
        r && r.handleError(t);
      }
      function ha(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++],
            u = t[s],
            l = e.data[s];
          null !== l.setInput ? l.setInput(u, o, r, a) : (u[a] = o);
        }
      }
      function Et(e, t, n) {
        const r = (function lo(e, t) {
          return fe(t[e]);
        })(t, e);
        !(function Ic(e, t, n) {
          e.setValue(t, n);
        })(e[O], r, n);
      }
      function Ho(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s];
            "number" == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Oi(o, a))
              : 2 == i && (r = Oi(r, a + ": " + t[++s] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function $o(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index];
          if ((null !== i && r.push(fe(i)), qe(i)))
            for (let a = _e; a < i.length; a++) {
              const u = i[a],
                l = u[w].firstChild;
              null !== l && $o(u[w], u, l, r);
            }
          const s = n.type;
          if (8 & s) $o(e, t, n.child, r);
          else if (32 & s) {
            const a = Cs(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & s) {
            const a = Rc(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = hr(t[me]);
              $o(u[w], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      class vr {
        get rootNodes() {
          const t = this._lView,
            n = t[w];
          return $o(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[ne];
        }
        set context(t) {
          this._lView[ne] = t;
        }
        get destroyed() {
          return 128 == (128 & this._lView[F]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ee];
            if (qe(t)) {
              const n = t[so],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Ts(t, r), _o(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          Sc(this._lView[w], this._lView);
        }
        onDestroy(t) {
          !(function xd(e, t, n, r) {
            const o = Bd(t);
            null === n
              ? o.push(r)
              : (o.push(n), e.firstCreatePass && Vd(e).push(r, o.length - 1));
          })(this._lView[w], this._lView, null, t);
        }
        markForCheck() {
          Bo(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[F] &= -65;
        }
        reattach() {
          this._lView[F] |= 64;
        }
        detectChanges() {
          Vo(this._lView[w], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new C(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function RD(e, t) {
              pr(e, t, t[O], 2, null, null);
            })(this._lView[w], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new C(902, !1);
          this._appRef = t;
        }
      }
      class Q_ extends vr {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Vo(t[w], t, t[ne], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class Ud extends Oo {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = z(t);
          return new _r(n, this.ngModule);
        }
      }
      function zd(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class X_ {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = Jr(r);
          const o = this.injector.get(t, Ys, r);
          return o !== Ys || n === Ys ? o : this.parentInjector.get(t, n, r);
        }
      }
      class _r extends ud {
        get inputs() {
          return zd(this.componentDef.inputs);
        }
        get outputs() {
          return zd(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function n_(e) {
              return e.map(t_).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof _n ? o : o?.injector;
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i);
          const s = i ? new X_(t, i) : t,
            a = s.get(cd, null);
          if (null === a) throw new C(407, !1);
          const u = s.get(Rv, null),
            l = a.createRenderer(null, this.componentDef),
            c = this.componentDef.selectors[0][0] || "div",
            d = r
              ? (function M_(e, t, n) {
                  return e.selectRootElement(t, n === rt.ShadowDom);
                })(l, r, this.componentDef.encapsulation)
              : Ms(
                  l,
                  c,
                  (function K_(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(c)
                ),
            f = this.componentDef.onPush ? 288 : 272,
            h = aa(0, null, null, 1, 0, null, null, null, null, null),
            p = Lo(null, h, null, f, null, null, a, l, u, s, null);
          let g, D;
          es(p);
          try {
            const v = this.componentDef;
            let E,
              m = null;
            v.findHostDirectiveDefs
              ? ((E = []),
                (m = new Map()),
                v.findHostDirectiveDefs(v, E, m),
                E.push(v))
              : (E = [v]);
            const I = (function ew(e, t) {
                const n = e[w],
                  r = Y;
                return (e[r] = t), Mn(n, r, 2, "#host", null);
              })(p, d),
              H = (function tw(e, t, n, r, o, i, s, a) {
                const u = o[w];
                !(function nw(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = sr(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Ho(t, t.mergedAttrs, !0), null !== n && jc(r, n, t));
                })(r, e, t, s);
                const l = i.createRenderer(t, n),
                  c = Lo(
                    o,
                    Fd(n),
                    null,
                    n.onPush ? 32 : 16,
                    o[e.index],
                    e,
                    i,
                    l,
                    a || null,
                    null,
                    null
                  );
                return (
                  u.firstCreatePass && la(u, e, r.length - 1),
                  jo(o, c),
                  (o[e.index] = c)
                );
              })(I, d, v, E, p, a, l);
            (D = Sl(h, Y)),
              d &&
                (function ow(e, t, n, r) {
                  if (r) os(e, n, ["ng-version", Lv.full]);
                  else {
                    const { attrs: o, classes: i } = (function r_(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let i = e[r];
                        if ("string" == typeof i)
                          2 === o
                            ? "" !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i);
                        else {
                          if (!Ye(o)) break;
                          o = i;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && os(e, n, o),
                      i && i.length > 0 && kc(e, n, i.join(" "));
                  }
                })(l, v, d, r),
              void 0 !== n &&
                (function iw(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o];
                    r.push(null != i ? Array.from(i) : null);
                  }
                })(D, this.ngContentSelectors, n),
              (g = (function rw(e, t, n, r, o, i) {
                const s = he(),
                  a = o[w],
                  u = Re(s, o);
                Ld(a, o, s, n, null, r);
                for (let c = 0; c < n.length; c++)
                  ye(Wt(o, a, s.directiveStart + c, s), o);
                kd(a, o, s), u && ye(u, o);
                const l = Wt(o, a, s.directiveStart + s.componentOffset, s);
                if (((e[ne] = o[ne] = l), null !== i))
                  for (const c of i) c(l, t);
                return oa(a, s, e), l;
              })(H, v, E, m, p, [sw])),
              ra(h, p, null);
          } finally {
            ts();
          }
          return new J_(this.componentType, g, En(D, p), p, D);
        }
      }
      class J_ extends Av {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Q_(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            const i = this._rootLView;
            ha(i[w], i, o, t, n), Bo(Te(this._tNode.index, i));
          }
        }
        get injector() {
          return new dn(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function sw() {
        const e = he();
        fo(y()[w], e);
      }
      function Uo(e) {
        return (
          !!(function ga(e) {
            return (
              null !== e && ("function" == typeof e || "object" == typeof e)
            );
          })(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function De(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function Er(e, t, n, r, o, i, s, a) {
        const u = y(),
          l = j(),
          c = e + Y,
          d = l.firstCreatePass
            ? (function _w(e, t, n, r, o, i, s, a, u) {
                const l = t.consts,
                  c = Mn(t, e, 4, s || null, xt(l, a));
                ua(t, n, c, xt(l, u)), fo(t, c);
                const d = (c.tView = aa(
                  2,
                  c,
                  r,
                  o,
                  i,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  l
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, c),
                    (d.queries = t.queries.embeddedTView(c))),
                  c
                );
              })(c, l, u, t, n, r, o, i, s)
            : l.data[c];
        it(d, !1);
        const f = u[O].createComment("");
        Mo(l, u, f, d),
          ye(f, u),
          jo(u, (u[c] = jd(f, u, f, d))),
          ao(d) && ia(l, u, d),
          null != s && sa(u, d, a);
      }
      function Ct(e, t, n) {
        const r = y();
        return (
          De(r, ln(), t) &&
            (function ke(e, t, n, r, o, i, s, a) {
              const u = Re(t, n);
              let c,
                l = t.inputs;
              !a && null != l && (c = l[r])
                ? (ha(e, n, c, r, o),
                  rr(t) &&
                    (function P_(e, t) {
                      const n = Te(t, e);
                      16 & n[F] || (n[F] |= 32);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function N_(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != s ? s(o, t.value || "", r) : o),
                  i.setProperty(u, r, o));
            })(
              j(),
              (function K() {
                const e = N.lFrame;
                return Sl(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[O],
              n,
              !1
            ),
          Ct
        );
      }
      function ma(e, t, n, r, o) {
        const s = o ? "class" : "style";
        ha(e, n, t.inputs[s], s, r);
      }
      function lt(e, t, n, r) {
        const o = y(),
          i = j(),
          s = Y + e,
          a = o[O],
          u = i.firstCreatePass
            ? (function Cw(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Mn(t, e, 2, r, xt(s, o));
                return (
                  ua(t, n, u, xt(s, i)),
                  null !== u.attrs && Ho(u, u.attrs, !1),
                  null !== u.mergedAttrs && Ho(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(s, i, o, t, n, r)
            : i.data[s],
          l = (o[s] = Ms(
            a,
            t,
            (function xy() {
              return N.lFrame.currentNamespace;
            })()
          )),
          c = ao(u);
        return (
          it(u, !0),
          jc(a, l, u),
          32 != (32 & u.flags) && Mo(i, o, l, u),
          0 ===
            (function gy() {
              return N.lFrame.elementDepthCount;
            })() && ye(l, o),
          (function my() {
            N.lFrame.elementDepthCount++;
          })(),
          c && (ia(i, o, u), oa(i, u, o)),
          null !== r && sa(o, u),
          lt
        );
      }
      function ct() {
        let e = he();
        Yi() ? Qi() : ((e = e.parent), it(e, !1));
        const t = e;
        !(function yy() {
          N.lFrame.elementDepthCount--;
        })();
        const n = j();
        return (
          n.firstCreatePass && (fo(n, e), Wi(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function ky(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            ma(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function jy(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            ma(n, t, y(), t.stylesWithoutHost, !1),
          ct
        );
      }
      function kn(e, t, n, r) {
        return lt(e, t, n, r), ct(), kn;
      }
      function Cr(e, t, n) {
        const r = y(),
          o = j(),
          i = e + Y,
          s = o.firstCreatePass
            ? (function Iw(e, t, n, r, o) {
                const i = t.consts,
                  s = xt(i, r),
                  a = Mn(t, e, 8, "ng-container", s);
                return (
                  null !== s && Ho(a, s, !0),
                  ua(t, n, a, xt(i, o)),
                  null !== t.queries && t.queries.elementStart(t, a),
                  a
                );
              })(i, o, r, t, n)
            : o.data[i];
        it(s, !0);
        const a = (r[i] = r[O].createComment(""));
        return (
          Mo(o, r, a, s),
          ye(a, r),
          ao(s) && (ia(o, r, s), oa(o, s, r)),
          null != n && sa(r, s),
          Cr
        );
      }
      function Ir() {
        let e = he();
        const t = j();
        return (
          Yi() ? Qi() : ((e = e.parent), it(e, !1)),
          t.firstCreatePass && (fo(t, e), Wi(e) && t.queries.elementEnd(e)),
          Ir
        );
      }
      function ya(e) {
        return !!e && "function" == typeof e.then;
      }
      const Sw = function uf(e) {
        return !!e && "function" == typeof e.subscribe;
      };
      function br(e, t, n, r) {
        const o = y(),
          i = j(),
          s = he();
        return (
          (function cf(e, t, n, r, o, i, s) {
            const a = ao(r),
              l = e.firstCreatePass && Vd(e),
              c = t[ne],
              d = Bd(t);
            let f = !0;
            if (3 & r.type || s) {
              const g = Re(r, t),
                D = s ? s(g) : g,
                v = d.length,
                E = s ? (I) => s(fe(I[r.index])) : r.index;
              let m = null;
              if (
                (!s &&
                  a &&
                  (m = (function Mw(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i];
                        if (s === n && o[i + 1] === r) {
                          const a = t[rn],
                            u = o[i + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof s && (i += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== m)
              )
                ((m.__ngLastListenerFn__ || m).__ngNextListenerFn__ = i),
                  (m.__ngLastListenerFn__ = i),
                  (f = !1);
              else {
                i = ff(r, t, c, i, !1);
                const I = n.listen(D, o, i);
                d.push(i, I), l && l.push(o, E, v, v + 1);
              }
            } else i = ff(r, t, c, i, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let D = 0; D < g; D += 2) {
                  const H = t[p[D]][p[D + 1]].subscribe(i),
                    ie = d.length;
                  d.push(i, H), l && l.push(o, r.index, ie, -(ie + 1));
                }
            }
          })(i, o, o[O], s, e, t, r),
          br
        );
      }
      function df(e, t, n, r) {
        try {
          return He(6, t, n), !1 !== n(r);
        } catch (o) {
          return $d(e, o), !1;
        } finally {
          He(7, t, n);
        }
      }
      function ff(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r;
          Bo(e.componentOffset > -1 ? Te(e.index, t) : t);
          let u = df(t, n, r, s),
            l = i.__ngNextListenerFn__;
          for (; l; ) (u = df(t, n, l, s) && u), (l = l.__ngNextListenerFn__);
          return o && !1 === u && (s.preventDefault(), (s.returnValue = !1)), u;
        };
      }
      function Da(e = 1) {
        return (function My(e) {
          return (N.lFrame.contextLView = (function Ty(e, t) {
            for (; e > 0; ) (t = t[on]), e--;
            return t;
          })(e, N.lFrame.contextLView))[ne];
        })(e);
      }
      function Bn(e, t = "") {
        const n = y(),
          r = j(),
          o = e + Y,
          i = r.firstCreatePass ? Mn(r, o, 1, t, null) : r.data[o],
          s = (n[o] = (function Ss(e, t) {
            return e.createText(t);
          })(n[O], t));
        Mo(r, n, s, i), it(i, !1);
      }
      function Ia(e) {
        return ba("", e, ""), Ia;
      }
      function ba(e, t, n) {
        const r = y(),
          o = (function An(e, t, n, r) {
            return De(e, ln(), n) ? t + A(n) + r : P;
          })(r, e, t, n);
        return o !== P && Et(r, Ee(), o), ba;
      }
      const Hn = "en-US";
      let oh = Hn;
      class $n {}
      class DC {}
      class Nh extends $n {
        constructor(t, n) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Ud(this));
          const r = (function xe(e, t) {
            const n = e[fl] || null;
            if (!n && !0 === t)
              throw new Error(
                `Type ${W(e)} does not have '\u0275mod' property.`
              );
            return n;
          })(t);
          (this._bootstrapComponents = (function wt(e) {
            return e instanceof Function ? e() : e;
          })(r.bootstrap)),
            (this._r3Injector = Cd(
              t,
              n,
              [
                { provide: $n, useValue: this },
                { provide: Oo, useValue: this.componentFactoryResolver },
              ],
              W(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Fa extends DC {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Nh(this.moduleType, t);
        }
      }
      function Oa(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const It = class ZC extends Si {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u));
          }
          this.__isAsync && ((i = Oa(i)), o && (o = Oa(o)), s && (s = Oa(s)));
          const a = super.subscribe({ next: o, error: i, complete: s });
          return t instanceof tt && t.add(a), a;
        }
      };
      let bt = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = XC), e;
      })();
      const QC = bt,
        KC = class extends QC {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          createEmbeddedView(t, n) {
            const r = this._declarationTContainer.tView,
              o = Lo(
                this._declarationLView,
                r,
                t,
                16,
                null,
                r.declTNode,
                null,
                null,
                null,
                null,
                n || null
              );
            o[tr] = this._declarationLView[this._declarationTContainer.index];
            const s = this._declarationLView[ot];
            return (
              null !== s && (o[ot] = s.createEmbeddedView(r)),
              ra(r, o, t),
              new vr(o)
            );
          }
        };
      function XC() {
        return (function Ko(e, t) {
          return 4 & e.type ? new KC(t, e, En(e, t)) : null;
        })(he(), y());
      }
      let ht = (() => {
        class e {}
        return (e.__NG_ELEMENT_ID__ = JC), e;
      })();
      function JC() {
        return (function Gh(e, t) {
          let n;
          const r = t[e.index];
          if (qe(r)) n = r;
          else {
            let o;
            if (8 & e.type) o = fe(r);
            else {
              const i = t[O];
              o = i.createComment("");
              const s = Re(e, t);
              Zt(
                i,
                So(i, s),
                o,
                (function $D(e, t) {
                  return e.nextSibling(t);
                })(i, s),
                !1
              );
            }
            (t[e.index] = n = jd(r, t, o, e)), jo(t, n);
          }
          return new Uh(n, e, t);
        })(he(), y());
      }
      const eI = ht,
        Uh = class extends eI {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return En(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new dn(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = as(this._hostTNode, this._hostLView);
            if (zl(t)) {
              const n = mo(t, this._hostLView),
                r = go(t);
              return new dn(n[w].data[r + 8], n);
            }
            return new dn(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = zh(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - _e;
          }
          createEmbeddedView(t, n, r) {
            let o, i;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector));
            const s = t.createEmbeddedView(n || {}, i);
            return this.insert(s, o), s;
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function ur(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (s) a = n;
            else {
              const d = n || {};
              (a = d.index),
                (r = d.injector),
                (o = d.projectableNodes),
                (i = d.environmentInjector || d.ngModuleRef);
            }
            const u = s ? t : new _r(z(t)),
              l = r || this.parentInjector;
            if (!i && null == u.ngModule) {
              const f = (s ? l : this.parentInjector).get(_n, null);
              f && (i = f);
            }
            const c = u.create(l, o, void 0, i);
            return this.insert(c.hostView, a), c;
          }
          insert(t, n) {
            const r = t._lView,
              o = r[w];
            if (
              (function py(e) {
                return qe(e[ee]);
              })(r)
            ) {
              const c = this.indexOf(t);
              if (-1 !== c) this.detach(c);
              else {
                const d = r[ee],
                  f = new Uh(d, d[ge], d[ee]);
                f.detach(f.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              s = this._lContainer;
            !(function kD(e, t, n, r) {
              const o = _e + r,
                i = n.length;
              r > 0 && (n[o - 1][We] = t),
                r < i - _e
                  ? ((t[We] = n[o]), nc(n, _e + r, t))
                  : (n.push(t), (t[We] = null)),
                (t[ee] = n);
              const s = t[tr];
              null !== s &&
                n !== s &&
                (function jD(e, t) {
                  const n = e[an];
                  t[me] !== t[ee][ee][me] && (e[Dl] = !0),
                    null === n ? (e[an] = [t]) : n.push(t);
                })(s, t);
              const a = t[ot];
              null !== a && a.insertView(e), (t[F] |= 64);
            })(o, r, s, i);
            const a = Ps(i, s),
              u = r[O],
              l = So(u, s[io]);
            return (
              null !== l &&
                (function OD(e, t, n, r, o, i) {
                  (r[yt] = o), (r[ge] = t), pr(e, r, n, 1, o, i);
                })(o, s[ge], u, r, l, a),
              t.attachToViewContainerRef(),
              nc(La(s), i, t),
              t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = zh(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Ts(this._lContainer, n);
            r && (_o(La(this._lContainer), n), Sc(r[w], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Ts(this._lContainer, n);
            return r && null != _o(La(this._lContainer), n) ? new vr(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function zh(e) {
        return e[so];
      }
      function La(e) {
        return e[so] || (e[so] = []);
      }
      function Jo(...e) {}
      const gp = new R("Application Initializer");
      let ei = (() => {
        class e {
          constructor(n) {
            (this.appInits = n),
              (this.resolve = Jo),
              (this.reject = Jo),
              (this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((r, o) => {
                (this.resolve = r), (this.reject = o);
              }));
          }
          runInitializers() {
            if (this.initialized) return;
            const n = [],
              r = () => {
                (this.done = !0), this.resolve();
              };
            if (this.appInits)
              for (let o = 0; o < this.appInits.length; o++) {
                const i = this.appInits[o]();
                if (ya(i)) n.push(i);
                else if (Sw(i)) {
                  const s = new Promise((a, u) => {
                    i.subscribe({ complete: a, error: u });
                  });
                  n.push(s);
                }
              }
            Promise.all(n)
              .then(() => {
                r();
              })
              .catch((o) => {
                this.reject(o);
              }),
              0 === n.length && r(),
              (this.initialized = !0);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(B(gp, 8));
          }),
          (e.ɵprov = Q({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      const Rr = new R("AppId", {
        providedIn: "root",
        factory: function mp() {
          return `${Wa()}${Wa()}${Wa()}`;
        },
      });
      function Wa() {
        return String.fromCharCode(97 + Math.floor(25 * Math.random()));
      }
      const yp = new R("Platform Initializer"),
        Dp = new R("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        St = new R("LocaleId", {
          providedIn: "root",
          factory: () =>
            (function Zm(e, t = T.Default) {
              return B(e, Jr(t));
            })(St, T.Optional | T.SkipSelf) ||
            (function PI() {
              return (typeof $localize < "u" && $localize.locale) || Hn;
            })(),
        }),
        LI = (() => Promise.resolve(0))();
      function qa(e) {
        typeof Zone > "u"
          ? LI.then(() => {
              e && e.apply(null, null);
            })
          : Zone.current.scheduleMicroTask("scheduleMicrotask", e);
      }
      class ve {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new It(!1)),
            (this.onMicrotaskEmpty = new It(!1)),
            (this.onStable = new It(!1)),
            (this.onError = new It(!1)),
            typeof Zone > "u")
          )
            throw new C(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function kI() {
              let e = Z.requestAnimationFrame,
                t = Z.cancelAnimationFrame;
              if (typeof Zone < "u" && e && t) {
                const n = e[Zone.__symbol__("OriginalDelegate")];
                n && (e = n);
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
              }
              return {
                nativeRequestAnimationFrame: e,
                nativeCancelAnimationFrame: t,
              };
            })().nativeRequestAnimationFrame),
            (function VI(e) {
              const t = () => {
                !(function BI(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(Z, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Ya(e),
                                (e.isCheckStableRunning = !0),
                                Za(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Ya(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  try {
                    return wp(e), n.invokeTask(o, i, s, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Ep(e);
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return wp(e), n.invoke(o, i, s, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Ep(e);
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ("microTask" == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          Ya(e),
                          Za(e))
                        : "macroTask" == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask));
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ve.isInAngularZone()) throw new C(909, !1);
        }
        static assertNotInAngularZone() {
          if (ve.isInAngularZone()) throw new C(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask("NgZoneEvent: " + o, t, jI, Jo, Jo);
          try {
            return i.runTask(s, n, r);
          } finally {
            i.cancelTask(s);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const jI = {};
      function Za(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Ya(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function wp(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Ep(e) {
        e._nesting--, Za(e);
      }
      class HI {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new It()),
            (this.onMicrotaskEmpty = new It()),
            (this.onStable = new It()),
            (this.onError = new It());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Cp = new R(""),
        ti = new R("");
      let Xa,
        Qa = (() => {
          class e {
            constructor(n, r, o) {
              (this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Xa ||
                  ((function $I(e) {
                    Xa = e;
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ve.assertNotInAngularZone(),
                        qa(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                qa(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop();
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let n = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : [];
            }
            addCallback(n, r, o) {
              let i = -1;
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks());
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o });
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(n, r, o), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this);
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n);
            }
            findProviders(n, r, o) {
              return [];
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(B(ve), B(Ka), B(ti));
            }),
            (e.ɵprov = Q({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Ka = (() => {
          class e {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(n, r) {
              this._applications.set(n, r);
            }
            unregisterApplication(n) {
              this._applications.delete(n);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(n) {
              return this._applications.get(n) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(n, r = !0) {
              return Xa?.findTestabilityInTree(this, n, r) ?? null;
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = Q({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            e
          );
        })();
      const Mt = !1;
      let kt = null;
      const Ip = new R("AllowMultipleToken"),
        Ja = new R("PlatformDestroyListeners"),
        UI = new R("appBootstrapListener");
      function Sp(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new R(r);
        return (i = []) => {
          let s = eu();
          if (!s || s.injector.get(Ip, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function WI(e) {
                  if (kt && !kt.get(Ip, !1)) throw new C(400, !1);
                  kt = e;
                  const t = e.get(Tp);
                  (function bp(e) {
                    const t = e.get(yp, null);
                    t && t.forEach((n) => n());
                  })(e);
                })(
                  (function Mp(e = [], t) {
                    return Qt.create({
                      name: t,
                      providers: [
                        { provide: zs, useValue: "platform" },
                        { provide: Ja, useValue: new Set([() => (kt = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function ZI(e) {
            const t = eu();
            if (!t) throw new C(401, !1);
            return t;
          })();
        };
      }
      function eu() {
        return kt?.get(Tp) ?? null;
      }
      let Tp = (() => {
        class e {
          constructor(n) {
            (this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(n, r) {
            const o = (function Np(e, t) {
                let n;
                return (
                  (n =
                    "noop" === e
                      ? new HI()
                      : ("zone.js" === e ? void 0 : e) || new ve(t)),
                  n
                );
              })(
                r?.ngZone,
                (function Ap(e) {
                  return {
                    enableLongStackTrace: !1,
                    shouldCoalesceEventChangeDetection:
                      !(!e || !e.ngZoneEventCoalescing) || !1,
                    shouldCoalesceRunChangeDetection:
                      !(!e || !e.ngZoneRunCoalescing) || !1,
                  };
                })(r)
              ),
              i = [{ provide: ve, useValue: o }];
            return o.run(() => {
              const s = Qt.create({
                  providers: i,
                  parent: this.injector,
                  name: n.moduleType.name,
                }),
                a = n.create(s),
                u = a.injector.get(In, null);
              if (!u) throw new C(402, !1);
              return (
                o.runOutsideAngular(() => {
                  const l = o.onError.subscribe({
                    next: (c) => {
                      u.handleError(c);
                    },
                  });
                  a.onDestroy(() => {
                    ni(this._modules, a), l.unsubscribe();
                  });
                }),
                (function Pp(e, t, n) {
                  try {
                    const r = n();
                    return ya(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(u, o, () => {
                  const l = a.injector.get(ei);
                  return (
                    l.runInitializers(),
                    l.donePromise.then(
                      () => (
                        (function ih(e) {
                          je(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (oh = e.toLowerCase().replace(/_/g, "-"));
                        })(a.injector.get(St, Hn) || Hn),
                        this._moduleDoBootstrap(a),
                        a
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(n, r = []) {
            const o = Fp({}, r);
            return (function zI(e, t, n) {
              const r = new Fa(n);
              return Promise.resolve(r);
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o));
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(tu);
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o));
            else {
              if (!n.instance.ngDoBootstrap) throw new C(-403, !1);
              n.instance.ngDoBootstrap(r);
            }
            this._modules.push(n);
          }
          onDestroy(n) {
            this._destroyListeners.push(n);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new C(404, !1);
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r());
            const n = this._injector.get(Ja, null);
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(B(Qt));
          }),
          (e.ɵprov = Q({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          e
        );
      })();
      function Fp(e, t) {
        return Array.isArray(t) ? t.reduce(Fp, e) : { ...e, ...t };
      }
      let tu = (() => {
        class e {
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          constructor(n, r, o) {
            (this._zone = n),
              (this._injector = r),
              (this._exceptionHandler = o),
              (this._bootstrapListeners = []),
              (this._views = []),
              (this._runningTick = !1),
              (this._stable = !0),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this.componentTypes = []),
              (this.components = []),
              (this._onMicrotaskEmptySubscription =
                this._zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this._zone.run(() => {
                      this.tick();
                    });
                  },
                }));
            const i = new be((a) => {
                (this._stable =
                  this._zone.isStable &&
                  !this._zone.hasPendingMacrotasks &&
                  !this._zone.hasPendingMicrotasks),
                  this._zone.runOutsideAngular(() => {
                    a.next(this._stable), a.complete();
                  });
              }),
              s = new be((a) => {
                let u;
                this._zone.runOutsideAngular(() => {
                  u = this._zone.onStable.subscribe(() => {
                    ve.assertNotInAngularZone(),
                      qa(() => {
                        !this._stable &&
                          !this._zone.hasPendingMacrotasks &&
                          !this._zone.hasPendingMicrotasks &&
                          ((this._stable = !0), a.next(!0));
                      });
                  });
                });
                const l = this._zone.onUnstable.subscribe(() => {
                  ve.assertInAngularZone(),
                    this._stable &&
                      ((this._stable = !1),
                      this._zone.runOutsideAngular(() => {
                        a.next(!1);
                      }));
                });
                return () => {
                  u.unsubscribe(), l.unsubscribe();
                };
              });
            this.isStable = xm(
              i,
              s.pipe(
                (function Om(e = {}) {
                  const {
                    connector: t = () => new Si(),
                    resetOnError: n = !0,
                    resetOnComplete: r = !0,
                    resetOnRefCountZero: o = !0,
                  } = e;
                  return (i) => {
                    let s,
                      a,
                      u,
                      l = 0,
                      c = !1,
                      d = !1;
                    const f = () => {
                        a?.unsubscribe(), (a = void 0);
                      },
                      h = () => {
                        f(), (s = u = void 0), (c = d = !1);
                      },
                      p = () => {
                        const g = s;
                        h(), g?.unsubscribe();
                      };
                    return qn((g, D) => {
                      l++, !d && !c && f();
                      const v = (u = u ?? t());
                      D.add(() => {
                        l--, 0 === l && !d && !c && (a = Fi(p, o));
                      }),
                        v.subscribe(D),
                        !s &&
                          l > 0 &&
                          ((s = new Wn({
                            next: (E) => v.next(E),
                            error: (E) => {
                              (d = !0), f(), (a = Fi(h, n, E)), v.error(E);
                            },
                            complete: () => {
                              (c = !0), f(), (a = Fi(h, r)), v.complete();
                            },
                          })),
                          $t(g).subscribe(s));
                    })(i);
                  };
                })()
              )
            );
          }
          bootstrap(n, r) {
            const o = n instanceof ud;
            if (!this._injector.get(ei).done) {
              !o &&
                (function Jn(e) {
                  const t = z(e) || pe(e) || Me(e);
                  return null !== t && t.standalone;
                })(n);
              throw new C(405, Mt);
            }
            let s;
            (s = o ? n : this._injector.get(Oo).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType);
            const a = (function GI(e) {
                return e.isBoundToModule;
              })(s)
                ? void 0
                : this._injector.get($n),
              l = s.create(Qt.NULL, [], r || s.selector, a),
              c = l.location.nativeElement,
              d = l.injector.get(Cp, null);
            return (
              d?.registerApplication(c),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  ni(this.components, l),
                  d?.unregisterApplication(c);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new C(101, !1);
            try {
              this._runningTick = !0;
              for (let n of this._views) n.detectChanges();
            } catch (n) {
              this._zone.runOutsideAngular(() =>
                this._exceptionHandler.handleError(n)
              );
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(n) {
            const r = n;
            this._views.push(r), r.attachToAppRef(this);
          }
          detachView(n) {
            const r = n;
            ni(this._views, r), r.detachFromAppRef();
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n);
            const r = this._injector.get(UI, []);
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy()),
                  this._onMicrotaskEmptySubscription.unsubscribe();
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => ni(this._destroyListeners, n)
            );
          }
          destroy() {
            if (this._destroyed) throw new C(406, !1);
            const n = this._injector;
            n.destroy && !n.destroyed && n.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(B(ve), B(_n), B(In));
          }),
          (e.ɵprov = Q({ token: e, factory: e.ɵfac, providedIn: "root" })),
          e
        );
      })();
      function ni(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      class kp {
        constructor() {}
        supports(t) {
          return Uo(t);
        }
        create(t) {
          return new ob(t);
        }
      }
      const rb = (e, t) => t;
      class ob {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || rb);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            i = null;
          for (; n || r; ) {
            const s = !r || (n && n.currentIndex < Bp(r, o, i)) ? n : r,
              a = Bp(s, o, i),
              u = s.currentIndex;
            if (s === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == s.previousIndex)) o++;
            else {
              i || (i = []);
              const l = a - o,
                c = u - o;
              if (l != c) {
                for (let f = 0; f < l; f++) {
                  const h = f < i.length ? i[f] : (i[f] = 0),
                    p = h + f;
                  c <= p && p < l && (i[f] = h + 1);
                }
                i[s.previousIndex] = c - l;
              }
            }
            a !== u && t(s, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Uo(t))) throw new C(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            i,
            s,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (i = t[a]),
                (s = this._trackByFn(a, i)),
                null !== n && Object.is(n.trackById, s)
                  ? (r && (n = this._verifyReinsertion(n, i, s, a)),
                    Object.is(n.item, i) || this._addIdentityChange(n, i))
                  : ((n = this._mismatch(n, i, s, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function yw(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (s = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, s)
                    ? (r && (n = this._verifyReinsertion(n, a, s, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, s, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let i;
          return (
            null === t ? (i = this._itTail) : ((i = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, i, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, i, o))
              : (t = this._addAfter(new ib(n, r), i, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let i =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== i
              ? (t = this._reinsertAfter(i, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            i = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = i) : (o._nextRemoved = i),
            null === i ? (this._removalsTail = o) : (i._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new jp()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new jp()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class ib {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class sb {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class jp {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new sb()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function Bp(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      function Hp() {
        return new ii([new kp()]);
      }
      let ii = (() => {
        class e {
          constructor(n) {
            this.factories = n;
          }
          static create(n, r) {
            if (null != r) {
              const o = r.factories.slice();
              n = n.concat(o);
            }
            return new e(n);
          }
          static extend(n) {
            return {
              provide: e,
              useFactory: (r) => e.create(n, r || Hp()),
              deps: [[e, new Co(), new Eo()]],
            };
          }
          find(n) {
            const r = this.factories.find((o) => o.supports(n));
            if (null != r) return r;
            throw new C(901, !1);
          }
        }
        return (e.ɵprov = Q({ token: e, providedIn: "root", factory: Hp })), e;
      })();
      const db = Sp(null, "core", []);
      let fb = (() => {
          class e {
            constructor(n) {}
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(B(tu));
            }),
            (e.ɵmod = Xn({ type: e })),
            (e.ɵinj = tn({})),
            e
          );
        })(),
        su = null;
      function si() {
        return su;
      }
      class gb {}
      const Tt = new R("DocumentToken");
      class r0 {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let tg = (() => {
        class e {
          set ngForOf(n) {
            (this._ngForOf = n), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(n) {
            this._trackByFn = n;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(n, r, o) {
            (this._viewContainer = n),
              (this._template = r),
              (this._differs = o),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(n) {
            n && (this._template = n);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const n = this._ngForOf;
              !this._differ &&
                n &&
                (this._differ = this._differs
                  .find(n)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const n = this._differ.diff(this._ngForOf);
              n && this._applyChanges(n);
            }
          }
          _applyChanges(n) {
            const r = this._viewContainer;
            n.forEachOperation((o, i, s) => {
              if (null == o.previousIndex)
                r.createEmbeddedView(
                  this._template,
                  new r0(o.item, this._ngForOf, -1, -1),
                  null === s ? void 0 : s
                );
              else if (null == s) r.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const a = r.get(i);
                r.move(a, s), ng(a, o);
              }
            });
            for (let o = 0, i = r.length; o < i; o++) {
              const a = r.get(o).context;
              (a.index = o), (a.count = i), (a.ngForOf = this._ngForOf);
            }
            n.forEachIdentityChange((o) => {
              ng(r.get(o.currentIndex), o);
            });
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(ht), L(bt), L(ii));
          }),
          (e.ɵdir = Ve({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          e
        );
      })();
      function ng(e, t) {
        e.context.$implicit = t.item;
      }
      let rg = (() => {
        class e {
          constructor(n, r) {
            (this._viewContainer = n),
              (this._context = new s0()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r);
          }
          set ngIf(n) {
            (this._context.$implicit = this._context.ngIf = n),
              this._updateView();
          }
          set ngIfThen(n) {
            og("ngIfThen", n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(n) {
            og("ngIfElse", n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(n, r) {
            return !0;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(L(ht), L(bt));
          }),
          (e.ɵdir = Ve({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          e
        );
      })();
      class s0 {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function og(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${W(t)}'.`
          );
      }
      let P0 = (() => {
        class e {}
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵmod = Xn({ type: e })),
          (e.ɵinj = tn({})),
          e
        );
      })();
      class lS extends gb {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Cu extends lS {
        static makeCurrent() {
          !(function pb(e) {
            su || (su = e);
          })(new Cu());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r, !1),
            () => {
              t.removeEventListener(n, r, !1);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function cS() {
            return (
              (Vr = Vr || document.querySelector("base")),
              Vr ? Vr.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function dS(e) {
                (Di = Di || document.createElement("a")),
                  Di.setAttribute("href", e);
                const t = Di.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          Vr = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return (function e0(e, t) {
            t = encodeURIComponent(t);
            for (const n of e.split(";")) {
              const r = n.indexOf("="),
                [o, i] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
              if (o.trim() === t) return decodeURIComponent(i);
            }
            return null;
          })(document.cookie, t);
        }
      }
      let Di,
        Vr = null;
      const hg = new R("TRANSITION_ID"),
        hS = [
          {
            provide: gp,
            useFactory: function fS(e, t, n) {
              return () => {
                n.get(ei).donePromise.then(() => {
                  const r = si(),
                    o = t.querySelectorAll(`style[ng-transition="${e}"]`);
                  for (let i = 0; i < o.length; i++) r.remove(o[i]);
                });
              };
            },
            deps: [hg, Tt, Qt],
            multi: !0,
          },
        ];
      let gS = (() => {
        class e {
          build() {
            return new XMLHttpRequest();
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵprov = Q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const vi = new R("EventManagerPlugins");
      let _i = (() => {
        class e {
          constructor(n, r) {
            (this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this;
              }),
              (this._plugins = n.slice().reverse());
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o);
          }
          addGlobalEventListener(n, r, o) {
            return this._findPluginFor(r).addGlobalEventListener(n, r, o);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(n) {
            const r = this._eventNameToPlugin.get(n);
            if (r) return r;
            const o = this._plugins;
            for (let i = 0; i < o.length; i++) {
              const s = o[i];
              if (s.supports(n)) return this._eventNameToPlugin.set(n, s), s;
            }
            throw new Error(`No event manager plugin found for event ${n}`);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(B(vi), B(ve));
          }),
          (e.ɵprov = Q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class pg {
        constructor(t) {
          this._doc = t;
        }
        addGlobalEventListener(t, n, r) {
          const o = si().getGlobalEventTarget(this._doc, t);
          if (!o)
            throw new Error(`Unsupported event target ${o} for event ${n}`);
          return this.addEventListener(o, n, r);
        }
      }
      let gg = (() => {
          class e {
            constructor() {
              this.usageCount = new Map();
            }
            addStyles(n) {
              for (const r of n)
                1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r);
            }
            removeStyles(n) {
              for (const r of n)
                0 === this.changeUsageCount(r, -1) && this.onStyleRemoved(r);
            }
            onStyleRemoved(n) {}
            onStyleAdded(n) {}
            getAllStyles() {
              return this.usageCount.keys();
            }
            changeUsageCount(n, r) {
              const o = this.usageCount;
              let i = o.get(n) ?? 0;
              return (i += r), i > 0 ? o.set(n, i) : o.delete(n), i;
            }
            ngOnDestroy() {
              for (const n of this.getAllStyles()) this.onStyleRemoved(n);
              this.usageCount.clear();
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵprov = Q({ token: e, factory: e.ɵfac })),
            e
          );
        })(),
        Hr = (() => {
          class e extends gg {
            constructor(n) {
              super(),
                (this.doc = n),
                (this.styleRef = new Map()),
                (this.hostNodes = new Set()),
                this.resetHostNodes();
            }
            onStyleAdded(n) {
              for (const r of this.hostNodes) this.addStyleToHost(r, n);
            }
            onStyleRemoved(n) {
              const r = this.styleRef;
              r.get(n)?.forEach((i) => i.remove()), r.delete(n);
            }
            ngOnDestroy() {
              super.ngOnDestroy(), this.styleRef.clear(), this.resetHostNodes();
            }
            addHost(n) {
              this.hostNodes.add(n);
              for (const r of this.getAllStyles()) this.addStyleToHost(n, r);
            }
            removeHost(n) {
              this.hostNodes.delete(n);
            }
            addStyleToHost(n, r) {
              const o = this.doc.createElement("style");
              (o.textContent = r), n.appendChild(o);
              const i = this.styleRef.get(r);
              i ? i.push(o) : this.styleRef.set(r, [o]);
            }
            resetHostNodes() {
              const n = this.hostNodes;
              n.clear(), n.add(this.doc.head);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(B(Tt));
            }),
            (e.ɵprov = Q({ token: e, factory: e.ɵfac })),
            e
          );
        })();
      const Iu = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        bu = /%COMP%/g,
        Dg = new R("RemoveStylesOnCompDestory", {
          providedIn: "root",
          factory: () => !1,
        });
      function vg(e, t) {
        return t.flat(100).map((n) => n.replace(bu, e));
      }
      function _g(e) {
        return (t) => {
          if ("__ngUnwrap__" === t) return e;
          !1 === e(t) && (t.preventDefault(), (t.returnValue = !1));
        };
      }
      let Su = (() => {
        class e {
          constructor(n, r, o, i) {
            (this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestory = i),
              (this.rendererByCompId = new Map()),
              (this.defaultRenderer = new Mu(n));
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer;
            const o = this.getOrCreateRenderer(n, r);
            return (
              o instanceof Cg
                ? o.applyToHost(n)
                : o instanceof Tu && o.applyStyles(),
              o
            );
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId;
            let i = o.get(r.id);
            if (!i) {
              const s = this.eventManager,
                a = this.sharedStylesHost,
                u = this.removeStylesOnCompDestory;
              switch (r.encapsulation) {
                case rt.Emulated:
                  i = new Cg(s, a, r, this.appId, u);
                  break;
                case rt.ShadowDom:
                  return new ES(s, a, n, r);
                default:
                  i = new Tu(s, a, r, u);
              }
              (i.onDestroy = () => o.delete(r.id)), o.set(r.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
          begin() {}
          end() {}
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(B(_i), B(Hr), B(Rr), B(Dg));
          }),
          (e.ɵprov = Q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      class Mu {
        constructor(t) {
          (this.eventManager = t),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? document.createElementNS(Iu[n] || n, t)
            : document.createElement(t);
        }
        createComment(t) {
          return document.createComment(t);
        }
        createText(t) {
          return document.createTextNode(t);
        }
        appendChild(t, n) {
          (Eg(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (Eg(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? document.querySelector(t) : t;
          if (!r)
            throw new Error(`The selector "${t}" did not match any elements`);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const i = Iu[o];
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = Iu[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (Ae.DashCase | Ae.Important)
            ? t.style.setProperty(n, r, o & Ae.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & Ae.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          return "string" == typeof t
            ? this.eventManager.addGlobalEventListener(t, n, _g(r))
            : this.eventManager.addEventListener(t, n, _g(r));
        }
      }
      function Eg(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class ES extends Mu {
        constructor(t, n, r, o) {
          super(t),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const i = vg(o.id, o.styles);
          for (const s of i) {
            const a = document.createElement("style");
            (a.textContent = s), this.shadowRoot.appendChild(a);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Tu extends Mu {
        constructor(t, n, r, o, i = r.id) {
          super(t),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestory = o),
            (this.rendererUsageCount = 0),
            (this.styles = vg(i, r.styles));
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles),
            this.rendererUsageCount++;
        }
        destroy() {
          this.removeStylesOnCompDestory &&
            (this.sharedStylesHost.removeStyles(this.styles),
            this.rendererUsageCount--,
            0 === this.rendererUsageCount && this.onDestroy?.());
        }
      }
      class Cg extends Tu {
        constructor(t, n, r, o, i) {
          const s = o + "-" + r.id;
          super(t, n, r, i, s),
            (this.contentAttr = (function vS(e) {
              return "_ngcontent-%COMP%".replace(bu, e);
            })(s)),
            (this.hostAttr = (function _S(e) {
              return "_nghost-%COMP%".replace(bu, e);
            })(s));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let CS = (() => {
        class e extends pg {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return !0;
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            );
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o);
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(B(Tt));
          }),
          (e.ɵprov = Q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const Ig = ["alt", "control", "meta", "shift"],
        IS = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        bS = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let SS = (() => {
        class e extends pg {
          constructor(n) {
            super(n);
          }
          supports(n) {
            return null != e.parseEventName(n);
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => si().onAndCancel(n, i.domEventName, s));
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split("."),
              o = r.shift();
            if (0 === r.length || ("keydown" !== o && "keyup" !== o))
              return null;
            const i = e._normalizeKey(r.pop());
            let s = "",
              a = r.indexOf("code");
            if (
              (a > -1 && (r.splice(a, 1), (s = "code.")),
              Ig.forEach((l) => {
                const c = r.indexOf(l);
                c > -1 && (r.splice(c, 1), (s += l + "."));
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null;
            const u = {};
            return (u.domEventName = o), (u.fullKey = s), u;
          }
          static matchEventFullKeyCode(n, r) {
            let o = IS[n.key] || n.key,
              i = "";
            return (
              r.indexOf("code.") > -1 && ((o = n.code), (i = "code.")),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                " " === o ? (o = "space") : "." === o && (o = "dot"),
                Ig.forEach((s) => {
                  s !== o && (0, bS[s])(n) && (i += s + ".");
                }),
                (i += o),
                i === r)
            );
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i));
            };
          }
          static _normalizeKey(n) {
            return "esc" === n ? "escape" : n;
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(B(Tt));
          }),
          (e.ɵprov = Q({ token: e, factory: e.ɵfac })),
          e
        );
      })();
      const NS = Sp(db, "browser", [
          { provide: Dp, useValue: "browser" },
          {
            provide: yp,
            useValue: function MS() {
              Cu.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: Tt,
            useFactory: function AS() {
              return (
                (function QD(e) {
                  Rs = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        Mg = new R(""),
        Tg = [
          {
            provide: ti,
            useClass: class pS {
              addToWindow(t) {
                (Z.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o);
                  if (null == i)
                    throw new Error("Could not find testability for element.");
                  return i;
                }),
                  (Z.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (Z.getAllAngularRootElements = () => t.getAllRootElements()),
                  Z.frameworkStabilizers || (Z.frameworkStabilizers = []),
                  Z.frameworkStabilizers.push((r) => {
                    const o = Z.getAllAngularTestabilities();
                    let i = o.length,
                      s = !1;
                    const a = function (u) {
                      (s = s || u), i--, 0 == i && r(s);
                    };
                    o.forEach(function (u) {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? si().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Cp, useClass: Qa, deps: [ve, Ka, ti] },
          { provide: Qa, useClass: Qa, deps: [ve, Ka, ti] },
        ],
        Ag = [
          { provide: zs, useValue: "root" },
          {
            provide: In,
            useFactory: function TS() {
              return new In();
            },
            deps: [],
          },
          { provide: vi, useClass: CS, multi: !0, deps: [Tt, ve, Dp] },
          { provide: vi, useClass: SS, multi: !0, deps: [Tt] },
          { provide: Su, useClass: Su, deps: [_i, Hr, Rr, Dg] },
          { provide: cd, useExisting: Su },
          { provide: gg, useExisting: Hr },
          { provide: Hr, useClass: Hr, deps: [Tt] },
          { provide: _i, useClass: _i, deps: [vi, ve] },
          { provide: class L0 {}, useClass: gS, deps: [] },
          [],
        ];
      let PS = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [
                { provide: Rr, useValue: n.appId },
                { provide: hg, useExisting: Rr },
                hS,
              ],
            };
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)(B(Mg, 12));
          }),
          (e.ɵmod = Xn({ type: e })),
          (e.ɵinj = tn({ providers: [...Ag, ...Tg], imports: [P0, fb] })),
          e
        );
      })();
      typeof window < "u" && window;
      var Bt = (() => {
        return (
          ((e = Bt || (Bt = {})).SPADES = "Spades"),
          (e.DIAMONDS = "Diamonds"),
          (e.HEARTS = "Hearts"),
          (e.CLUBS = "Clubs"),
          Bt
        );
        var e;
      })();
      function Fg(e, t) {
        return e.number > t.number ? 1 : e.number < t.number ? -1 : 0;
      }
      function xg(e) {
        for (let t = e.length - 1; t > 0; --t) {
          let n = Math.floor(Math.random() * (t + 1));
          const r = e[n];
          (e[n] = e[t]), (e[t] = r);
        }
      }
      class Og {
        constructor() {
          (this.hiddenCards = []), (this.visibleCards = []), this.shuffleAll();
        }
        get length() {
          return this.hiddenCards.length;
        }
        shuffleAll() {
          this.visibleCards = [];
          const t = (function BS() {
            let e = [];
            for (let t = 1; t <= 13; ++t)
              e.push({ number: t, sign: Bt.CLUBS }),
                e.push({ number: t, sign: Bt.HEARTS }),
                e.push({ number: t, sign: Bt.DIAMONDS }),
                e.push({ number: t, sign: Bt.SPADES });
            return e;
          })();
          xg(t), (this.hiddenCards = t);
        }
        shuffleHidden() {
          xg(this.hiddenCards);
        }
        drawCard() {
          const t = this.hiddenCards.pop();
          if (t) return this.visibleCards.push(t), t;
        }
      }
      function VS(e, t) {
        if ((1 & e && (lt(0, "p", 1), Bn(1), ct()), 2 & e)) {
          const n = Da();
          Rt(1), Ia(n.card.number + " of " + n.card.sign);
        }
      }
      function HS(e, t) {
        1 & e && (lt(0, "p", 1), Bn(1, "Hidden"), ct());
      }
      let $S = (() => {
        class e {
          constructor() {
            (this.hidden = !1), (this.card = { number: 1, sign: Bt.DIAMONDS });
          }
        }
        return (
          (e.ɵfac = function (n) {
            return new (n || e)();
          }),
          (e.ɵcmp = to({
            type: e,
            selectors: [["app-card"]],
            inputs: { hidden: "hidden", card: "card" },
            decls: 2,
            vars: 2,
            consts: [
              ["class", "card", 4, "ngIf"],
              [1, "card"],
            ],
            template: function (n, r) {
              1 & n && (Er(0, VS, 2, 1, "p", 0), Er(1, HS, 2, 0, "p", 0)),
                2 & n && (Ct("ngIf", !r.hidden), Rt(1), Ct("ngIf", r.hidden));
            },
            dependencies: [rg],
            styles: [".card[_ngcontent-%COMP%]{background-color:0}"],
          })),
          e
        );
      })();
      function US(e, t) {
        if ((1 & e && (Cr(0), kn(1, "app-card", 7), Ir()), 2 & e)) {
          const n = t.$implicit;
          Rt(1), Ct("card", n[n.length - 1]);
        }
      }
      function zS(e, t) {
        if ((1 & e && (Cr(0), kn(1, "app-card", 8), Ir()), 2 & e)) {
          const n = t.$implicit,
            r = t.index,
            o = Da();
          Rt(1), Ct("card", n[n.length - 1])("hidden", o.currentStep <= r + 3);
        }
      }
      let GS = (() => {
          class e {
            constructor(n) {
              (this.deck = n),
                (this.hiddenCards = [[], [], []]),
                (this.visibleCards = [[], [], []]),
                (this.currentStep = 0);
            }
            ngOnInit() {
              (this.hiddenCards = [[], [], []]),
                (this.visibleCards = [[], [], []]);
              for (let n = 0; n < 3; ++n)
                this.hiddenCards[n].push(this.drawCard()),
                  this.visibleCards[n].push(this.drawCard());
            }
            playVisible(n, r, o) {
              const i = this.visibleCards[r].slice(-1)[0];
              this.visibleCards[r].push(n),
                (this.currentStep = Fg(n, i) === o ? this.currentStep + 1 : 0);
            }
            playHidden(n, r, o) {
              const i = this.hiddenCards[r].slice(-1)[0];
              if ((this.hiddenCards[r].push(n), Fg(n, i) === o))
                ++this.currentStep;
              else {
                this.currentStep = 0;
                for (let s = 0; s <= r; ++s) {
                  const a = this.drawCard();
                  if (!a) return;
                  this.hiddenCards[s].push(a);
                }
              }
            }
            drawCard() {
              const n = this.deck.drawCard();
              return n || this.triggerDefeat(), n;
            }
            play(n) {
              const r = this.drawCard();
              r &&
                (this.currentStep < 3
                  ? this.playVisible(r, this.currentStep, n)
                  : this.playHidden(r, this.currentStep - 3, n),
                6 === this.currentStep && this.triggerVictory());
            }
            triggerVictory() {
              console.log("Victory Bro"),
                this.deck.shuffleAll(),
                this.ngOnInit();
            }
            triggerDefeat() {
              console.log("Defeat bro"),
                this.deck.shuffleAll(),
                this.ngOnInit();
            }
            chooseLess() {
              this.play(-1);
            }
            chooseEqual() {
              this.play(0);
            }
            chooseMore() {
              this.play(1);
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)(L(Og));
            }),
            (e.ɵcmp = to({
              type: e,
              selectors: [["app-board"]],
              decls: 13,
              vars: 3,
              consts: [
                [1, "main"],
                [1, "bus-wrapper"],
                [4, "ngFor", "ngForOf"],
                [1, "deck-wrapper"],
                [3, "hidden"],
                [1, "commands-wrapper"],
                [3, "click"],
                [3, "card"],
                [3, "card", "hidden"],
              ],
              template: function (n, r) {
                1 & n &&
                  (lt(0, "div", 0)(1, "div", 1),
                  Er(2, US, 2, 1, "ng-container", 2),
                  Er(3, zS, 2, 2, "ng-container", 2),
                  ct(),
                  lt(4, "div", 3),
                  kn(5, "app-card", 4),
                  ct(),
                  lt(6, "div", 5)(7, "button", 6),
                  br("click", function () {
                    return r.chooseLess();
                  }),
                  Bn(8, "-"),
                  ct(),
                  lt(9, "button", 6),
                  br("click", function () {
                    return r.chooseEqual();
                  }),
                  Bn(10, "="),
                  ct(),
                  lt(11, "button", 6),
                  br("click", function () {
                    return r.chooseMore();
                  }),
                  Bn(12, "+"),
                  ct()()()),
                  2 & n &&
                    (Rt(2),
                    Ct("ngForOf", r.visibleCards),
                    Rt(1),
                    Ct("ngForOf", r.hiddenCards),
                    Rt(2),
                    Ct("hidden", !0));
              },
              dependencies: [tg, $S],
              styles: [
                ".bus-wrapper[_ngcontent-%COMP%]{display:flex;gap:20px}.main[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.commands-wrapper[_ngcontent-%COMP%]{display:flex;gap:20px}",
              ],
            })),
            e
          );
        })(),
        WS = (() => {
          class e {
            constructor() {
              this.title = "bus-game";
            }
          }
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵcmp = to({
              type: e,
              selectors: [["app-root"]],
              decls: 1,
              vars: 0,
              template: function (n, r) {
                1 & n && kn(0, "app-board");
              },
              dependencies: [GS],
            })),
            e
          );
        })(),
        qS = (() => {
          class e {}
          return (
            (e.ɵfac = function (n) {
              return new (n || e)();
            }),
            (e.ɵmod = Xn({ type: e, bootstrap: [WS] })),
            (e.ɵinj = tn({ providers: [Og], imports: [PS] })),
            e
          );
        })();
      NS()
        .bootstrapModule(qS)
        .catch((e) => console.error(e));
    },
  },
  (J) => {
    J((J.s = 597));
  },
]);