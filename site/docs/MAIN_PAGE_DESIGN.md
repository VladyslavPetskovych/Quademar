# Main Page Design & Structure

**Guardamar Hotel & Spa** — Design and structure specification for the homepage.

---

## 1. Design System

### Typography
| Element | Font | Weight | Use |
|---------|------|--------|-----|
| Headings | Cormorant Garamond | 400, 600 | Titles, taglines, elegant copy |
| Body | Inter | 300, 400, 500, 600 | Paragraphs, UI, nav |

### Color Palette
| Token | Value | Use |
|-------|-------|-----|
| Primary dark | `#2d4a3e` | CTA buttons, accents |
| Primary hover | `#243d32` | Button hover |
| Stone 900 | `stone-900` | Footer, strong text |
| Stone 600 | `stone-600` | Body text |
| Stone 50 | `stone-50` | Section backgrounds |
| White | `white` | Cards, alternating sections |

### Spacing & Layout
- **Max content width:** `max-w-4xl` (896px) for text, `max-w-[1400px]` for header
- **Section padding:** `py-16 md:py-24`
- **Horizontal padding:** `px-4 sm:px-6`
- **Rounded top of content card:** `rounded-t-[1.5rem] sm:rounded-t-[2rem] md:rounded-t-[2.5rem]`

---

## 2. Page Structure (Top to Bottom)

```
┌─────────────────────────────────────────┐
│ 1. HERO (full viewport, video bg)       │
│    - Sticky, full height                │
│    - Subtitle + location                │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 2. INTRO (overlapping card)             │
│    - Welcome text, centered             │
│    - Rounded top, shadow                │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 3. HISTORY                              │
│    - Title + 1–2 paragraph intro       │
│    - Link to /history                   │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 4. ROOMS                                │
│    - Title + brief description          │
│    - Link to /rooms                     │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 5. RESTAURANTS                          │
│    - Preview + link to /restaurants      │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 6. SPA                                  │
│    - Preview + link to /spa             │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 7. MOMENTS                              │
│    - Preview + link to /moments         │
└─────────────────────────────────────────┘
┌─────────────────────────────────────────┐
│ 8. CTA SECTION                          │
│    - Book / Contact call-to-action      │
└─────────────────────────────────────────┘
```

---

## 3. Section Specifications

### 1. Hero
- **Height:** `h-screen min-h-[600px]`
- **Background:** Video (Pexels), overlay `bg-stone-900/20`
- **Content:** Subtitle (Cormorant italic), location (Inter, tracking-widest)
- **Position:** Sticky top while in view

### 2. Intro
- **Background:** `stone-50`, rounded top, `-mt-[20vh]` overlap
- **Content:** Single paragraph, bilingual, max-w-4xl
- **Typography:** Cormorant xl–2xl, stone-600

### 3–7. Feature Sections (History, Rooms, Restaurants, Spa, Moments)
- **Background:** Alternating `stone-50` / `white`
- **Layout:** Centered content, max-w-4xl
- **Elements:** `h2` (Cormorant 3xl–4xl), paragraph (Inter), optional link to full page
- **Padding:** `py-16 md:py-24`

### 8. CTA Section
- **Background:** `stone-900` or primary dark
- **Content:** Short line + primary button (Reservar / Забронювати)
- **Link:** `/contact`

---

## 4. Component Architecture

```
HomePage
├── Hero
├── IntroCard (content area)
│   └── Intro text
├── History
├── Rooms
├── RestaurantsPreview (SectionPreview)
├── SpaPreview (SectionPreview)
├── MomentsPreview (SectionPreview)
└── CtaSection
```

---

## 5. Responsive Behavior

| Breakpoint | Hero overlap | Section padding | Font sizes |
|------------|--------------|-----------------|------------|
| Mobile | -mt-[20vh] | py-16, px-4 | text-xl, text-3xl |
| sm | - | px-6 | — |
| md | -mt-[25vh] | py-24 | text-2xl, text-4xl |
| lg+ | — | — | — |

---

## 6. Content Guidelines

- **Bilingual:** All homepage copy in `es` and `uk`
- **Tone:** Elegant, welcoming, Mediterranean
- **CTA:** Always visible in header; reinforced in CTA section
- **Links:** Each section links to its full page where relevant
