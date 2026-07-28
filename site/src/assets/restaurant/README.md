# Restaurant & Bar photos

The `RestaurantBarPage` (`src/pages/RestaurantBarPage.jsx`) imports the four images below.
To use your own photos, **replace these files, keeping the same names and `.webp` format** —
no code change is needed.

| File               | Where it shows                     | Suggested subject                      |
| ------------------ | ---------------------------------- | -------------------------------------- |
| `restaurant-1.webp`| Restaurant block — left panel      | Aristo dining room / plated dish       |
| `restaurant-2.webp`| Restaurant block — right panel     | Guests at table / table setting detail |
| `bar-1.webp`       | Bar block — right panel            | Bar counter / cocktails at golden hour |
| `bar-2.webp`       | Bar block — left panel             | Live music / evening ambience          |

Each block is a **diptych**: two equal panels side by side, both `aspect-[3/4]` portrait,
rendered with `object-cover` — so anything that is not 3:4 gets centre-cropped on screen.
Export at 3:4 to control the crop yourself and to avoid shipping pixels nobody sees.
`restaurant-1.webp` and `restaurant-2.webp` are 3:4 crops (1200×1600, WebP quality 82) of
`restaurant1.JPG` and `restPeople.JPG`; the two bar files are still centre-cropped at render.

The `.JPG` files in this folder are the full-resolution originals, kept for re-cropping.
