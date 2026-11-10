# AGENTS.md — Home Mods Project Guidelines

## 1. Project Overview & Target Audience
- **Project Name:** Home Mods (Senior Home Mods)
- **Target Audience:** Seniors (62+) and their caregivers.
- **Core Scope:** USDA Section 504 home repair grants and loans + home modifications for seniors: roofing repairs, heating and cooling (HVAC), grab bars, ramps, walk-in showers, stair railings, wider doorways, and safety repairs.
- **Core Design Ethos:** Simplicity, high legibility, robust accessibility, low cognitive load, zero-trust security, and dignity in user experience.

---

## 2. Technology Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Component Primitives:** React Aria components (ensuring accessible headless foundation)
- **Typography:** Fraunces, Atkinson Hyperlegible, Montserrat, Cinzel (loaded via `next/font/google`)
- **Backend & Cloud Infrastructure:**
  - Firebase Authentication
  - Cloud Firestore
  - Cloud Storage
  - Cloud Functions (2nd generation, TypeScript)
  - Firebase App Check
  - Google Cloud Secret Manager
  - Firebase App Hosting

---

## 3. Accessibility Standards (Hard Requirement)
> **Baseline:** WCAG 2.2 AA Minimum compliance.

- **Typography & Font:**
  - Atkinson Hyperlegible for body and UI; Fraunces 600 for headlines.
  - Body text font size must be **18px or larger**; helper text **16px minimum**; nothing below **15px**.
- **Color & Contrast:**
  - Minimum contrast ratio of **4.5:1** for all visual elements.
  - **7:1 contrast ratio preferred** for body text.
  - **No color-only meaning:** Never use color as the sole indicator of state, error, or action; always provide accompanying text, iconography, or distinct patterns.
- **Touch & Click Targets:**
  - Interactive elements (buttons, inputs, links, toggles) must have touch targets of at least **48x48px**; buttons and inputs 56–58px tall.
- **Focus & Indicators:**
  - Focus indicator: 3px solid focus color (`#b45309`), 3px offset, on every interactive element (`:focus-visible`).
  - Visible, explicit labels for every input (no relying solely on placeholder text).
- **UX & Cognitive Accessibility:**
  - **One question per screen** pattern for forms and workflows to avoid cognitive overload.
  - Plain language targeted at **grade 6–8 reading level**.
  - **No timeouts** on forms or sessions during active tasks.
  - Respect `prefers-reduced-motion`.
- **Assistive Technology & Screen Readers:**
  - All errors, validation alerts, and status notifications must be announced dynamically via `aria-live`.
  - Done steps get a check icon plus hidden text "done"; selected items get a check icon.
- **Zoom & Magnification:**
  - Must function fully and legibly at 320px width and at **200% zoom** without clipping or horizontal overflow issues.
  - User "Text size" setting (`A` / `A+` / `A++` = 100% / 112% / 125%) scaling root font size.
- **Automated Testing & Enforcement:**
  - Run `axe-core` accessibility tests; fail the build on violations.

---

## 4. Security & Zero-Trust Architecture
- **Zero Client Secrets:**
  - Never expose secrets, private API keys, or service account credentials in client-side code or environment variables exposed to the browser.
  - Store all sensitive configuration and keys in **Google Cloud Secret Manager**.
- **Third-Party API Boundaries:**
  - All external third-party API calls must be proxied through **Cloud Functions (2nd gen)**; no direct third-party calls from the client.
- **Firebase App Check:**
  - Enforce Firebase App Check across all client-to-backend requests (Firestore, Storage, Functions).
- **Authentication & Authorization:**
  - Every Cloud Function must verify the user's authentication token and role/permission claims before processing any request.
- **Audit Logging:**
  - Record an immutable audit log entry for every sensitive action (e.g., role changes, sensitive data access or modification, exports, deletions).
- **Security Rules & Emulator Testing:**
  - Write granular Firestore and Cloud Storage security rules enforcing zero-trust permissions.
  - Back all security rules with comprehensive **Firebase Emulator tests**.

---

## 5. Operational Protocols & Human-in-the-Loop Gates
- **Paid Services:** ALWAYS ask the user before adding or provisioning any paid service or paid API tier.
- **Deployments:** ALWAYS ask the user before running any deploy command.
- **App Code:** Respect design rules in Section 6 for all UI components and screens.

---

## 6. Design Rules — "Warm & Premium" Aesthetic
All future tasks must adhere to these design specifications.

### 6.1 Typography (`next/font/google`)
- **Headlines:** Fraunces, weight 600 (`--font-fraunces`)
- **Body & UI:** Atkinson Hyperlegible, weights 400 and 700 (`--font-atkinson`)
- **Eyebrows & Small All-Caps:** Montserrat, weight 600, letter-spacing `0.14em` (`--font-montserrat`)
- **Logo Wordmark:** Cinzel, weight 700 (`--font-cinzel`)

### 6.2 Named Tailwind Color Tokens
*Rule: Use these named tokens everywhere; never write raw hex codes in components.*
- `ivory`: `#faf7f1` (page background)
- `sand`: `#f3ecdf` (soft fills, selected tab background)
- `sand-deep`: `#ede4d3` (progress track)
- `hairline`: `#e8e1d4` (card borders, dividers; decorative only)
- `navy`: `#0b2a4a` (text, primary buttons)
- `navy-hover`: `#173f6b`
- `muted`: `#50586a` (secondary text)
- `control`: `#7d8696` (input and checkbox borders)
- `gold`: `#b98a2e` (decorative lines, link underlines only, never text)
- `gold-text`: `#7a5a1e` (gold text on light backgrounds)
- `gold-on-navy`: `#e6c77f` (gold text or icons on navy)
- `cream-on-navy`: `#f1e6cf` (body text on navy)
- `leaf`: `#4f7a37` (done/success fills)
- `leaf-text`: `#3f6a2b` (success text)
- `focus`: `#b45309` (accessible focus indicator)
- `white`: `#ffffff` (cards, inputs)

### 6.3 Shared UI Components Specification (`/components/ui`)
1. **PrimaryButton:** Navy fill, white 18px bold text, 58px tall, radius 16px, soft navy shadow, optional gold arrow icon.
2. **SecondaryButton:** White fill, 2px navy border, navy text, 56px tall, radius 16px.
3. **TextLink:** Navy bold text with gold underline, 4px underline offset, 48px tap area.
4. **Eyebrow:** 28px x 2px gold line + all-caps Montserrat text in `gold-text`, 15px.
5. **PageTitle:** Fraunces 600, 30–36px, line-height 1.12.
6. **TextField:** Visible label above (18px bold), optional hint (16px muted, linked with `aria-describedby`), input 58px, 2px control border, radius 14px; on focus 2px navy border plus soft gold glow.
7. **ChoiceCard (checkbox or radio):** White card, radius 18px, icon in a sand circle, label 18px bold, check box on right; selected = 2px navy border.
8. **Chip (toggle):** 48px pill, selected = navy fill with check icon.
9. **Segmented control:** Sand track, selected segment navy with check icon, `role="radiogroup"`.
10. **Card:** White, 1px hairline border, radius 22px, soft warm shadow `rgba(60,40,10,0.07)`.
11. **TopBar:** Round 48px back button (white, hairline border), optional center text, optional round call button (`tel:` link).
12. **ProgressBar:** 4px tall, sand-deep track, navy fill, with `role="progressbar"`.
13. **BottomTabBar:** Home, Documents, Status, Profile; white bar, 88px tall; active tab = navy text, bold, icon in a sand pill, `aria-current="page"`.
14. **Logo:** Emblem image/SVG + "SENIOR" (Cinzel) over "HOME MODS" (Montserrat, small caps spacing), with hidden text "Senior Home Mods".
