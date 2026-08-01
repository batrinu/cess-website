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

## 2. Contrast remediation — partly done

Fixed so far:
- Form error text `#ef4444` → `#b3261e` (was 3.32:1 on pearl, now 5.77:1).

Still outstanding, measured but not yet changed:

| Colour | Ground | Ratio | Where |
|---|---|---|---|
| `#c9a87c` copper | pearl `#f5f0eb` | **1.98:1** | ~45 text uses — service-card "Află mai mult", phone/email on contact cards, "Vezi documentul", policy links |
| `#c9a87c` copper | white | 2.24:1 | same, on white card surfaces |
| `#64748b` | pearl | 4.20:1 | 46 uses — the entire body copy of Termeni, Confidențialitate, Cookie |
| `#5c7c6b` teal | pearl | 4.08:1 | 13 uses |

Copper is fine on dark grounds (9.38:1 on `#000`) and should stay there. For light
grounds a darkened companion measures well and keeps the hue:

- `--copper-ink: #7a5c2e` → 5.46:1 on pearl, 6.18:1 on white
- muted body replacement `#5a687d` → 5.00:1 on pearl (vs 4.20 today)

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
