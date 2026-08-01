# Open items

## 1. The contact form has no backend — decide on delivery ⚠️

**Status:** interim mitigation shipped. Not solved.

`src/pages/Contact.tsx` previously waited 1500 ms and displayed *"Mesajul tău a fost
trimis cu succes"* while **silently discarding every enquiry**. There was never an
endpoint — no `fetch`, no form service, nothing. This was live on `www.cess.ro`.

**What it does now:** on submit it builds a `mailto:contact@cess.ro` with the name,
email, subject and message pre-filled, hands off to the visitor's mail client, and says
so honestly — with the address and phone number as fallbacks if nothing opened.

That is a stopgap, not a solution. It depends on the visitor having a working mail
client, it loses anyone on a device without one, and it gives no delivery confirmation.

**Options, roughly in order of effort:**

| Option | Effort | Notes |
|---|---|---|
| Web3Forms / Formspree | ~30 min | Free tier, no backend, POST to their endpoint. Fastest real fix. |
| Cloudflare Pages Function + Resend | ~2 h | Stays in the existing stack. Needs an API key as a Pages secret and a verified sender domain. |
| Pages Function + MailChannels | ~2 h | No third-party account, but needs SPF/DKIM alignment against the existing `mail.cess.ro` setup — check it does not disturb the current SPF record. |

Whichever is chosen: add a honeypot check server-side too (the client-side `website`
honeypot at `Contact.tsx:179` is trivially bypassed), and keep the GDPR consent
requirement.

**Do not** restore a fake success state.

---

## 2. Contrast remediation — DONE

Every text/background pair on all nine routes now meets WCAG 2.1 AA, verified by
measuring computed colour against effective background in a real browser rather than
by reading the source.

Ground-aware tokens were introduced in `src/index.css`, because the same value cannot
serve both grounds — `#64748b` was 4.20:1 on pearl *and* 3.66:1 on graphite:

| Token | Value | For |
|---|---|---|
| `--copper-ink` | `#7a5c2e` | copper text on light — 5.46:1 on pearl, 6.18:1 on white |
| `--text-muted` | `#5a687d` | muted text on light — 5.00:1 on pearl |
| `--text-muted-dark` | `#94a3b8` | muted text on dark — 6.79:1 on graphite |
| `--teal-on-dark` | `#8bb39c` | status pills on charcoal — 6.50:1 |
| `--error-on-dark` | `#e08585` | status pills on charcoal — 5.67:1 |
| `--error-ink` | `#b3261e` | error text on light — 5.77:1 on pearl |

Also fixed along the way: link hovers that went *lighter* (`#d4b896`, 1.89:1 on white)
now darken; policy links are permanently underlined rather than distinguished by
colour alone (1.4.1 Use of Color); and the WhatsApp label was white on `#25D366`
(1.98:1) — the brand green is kept and the text darkened to `#0a2e26` (7.4:1).

**Method note for anyone repeating this:** two rounds of false positives came from
static analysis — a collapsed mobile menu with a 0×0 rect, and a transparent navbar
over a dark hero that a naive parent-walk resolved to white. Measure the rendered DOM,
skip zero-size nodes, and fall back to the body background, not to white.

`#c9a87c`, `#5c7c6b` and `#c94c4c` remain correct and unchanged on dark grounds and
for fills, rules, borders and swatches.

---

## 3. Token system is decorative

663 colour literals in app code against 4 token references (0.6% adoption). Worse,
`slate` and `slate-dark` are declared with **different values** in `src/index.css` and
`tailwind.config.js`:

| Name | index.css | tailwind.config.js |
|---|---|---|
| `slate` | `#4a5568` | `#64748b` |
| `slate-dark` | `#64748b` | `#94a3b8` |

So the same token name yields a different colour depending on which system is used, and
the literal that got copy-pasted 36 times is the one that fails AA. Fix by making
`tailwind.config.js` reference the CSS variables rather than restating hex values.

---

## 4. Smaller items

- `Galerie` and `VideoSection` on the homepage are placeholder gradient rectangles with
  a "coming soon" label — while real photography already ships in `public/`
  (`about-team.jpg`, `contact-office.jpg`). Zero imagery on a brand surface is a bug.
- `FluidGateway`'s `requestAnimationFrame` loop never stops: the full-viewport noise
  shader keeps rendering at 60 fps for the whole session after the hero scrolls out of
  view. Gate it on an `IntersectionObserver` and on `document.hidden`.
- Footer copyright still reads **© 2025**.
- The responsive dimension of the audit never ran (agent session limit) — touch-target
  sizes and narrow-viewport overflow are unaudited.
