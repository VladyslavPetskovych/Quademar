import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { CONTACT, SEO, SITE_ORIGIN_DEFAULT } from "./src/config/site.js";

function seoHtmlTransform(origin) {
  return {
    name: "seo-html-transform",
    transformIndexHtml(html) {
      const ogImage = origin ? `${origin}/og-image.jpg` : "/og-image.jpg";
      const canonical = origin ? `${origin}/` : "/";
      const ogUrl = canonical;

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Hotel",
        "@id": origin ? `${origin}/#hotel` : undefined,
        name: CONTACT.hotelName,
        description: SEO.description,
        image: ogImage,
        telephone: CONTACT.phoneHref.replace(/^tel:/i, ""),
        email: CONTACT.email,
        url: origin ? `${origin}/` : undefined,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Puerto Rico, 11",
          addressLocality: "Guardamar del Segura",
          postalCode: "03140",
          addressRegion: "Alicante",
          addressCountry: "ES",
        },
        sameAs: [CONTACT.instagramHref],
      };

      Object.keys(jsonLd).forEach((k) => jsonLd[k] === undefined && delete jsonLd[k]);

      const ldScript = `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`;

      return html
        .replace("__SEO_LD_JSON__", ldScript)
        .replaceAll("__OG_IMAGE__", ogImage)
        .replaceAll("__TWITTER_IMAGE__", ogImage)
        .replaceAll("__CANONICAL_URL__", canonical)
        .replaceAll("__OG_URL__", ogUrl)
        .replaceAll("__OG_SITE_NAME__", CONTACT.hotelName)
        .replaceAll("__SEO_TITLE__", SEO.title)
        .replaceAll("__SEO_DESCRIPTION__", SEO.description)
        .replaceAll("__SEO_KEYWORDS__", SEO.keywords);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const origin =
    (env.VITE_SITE_ORIGIN || (mode === "production" ? SITE_ORIGIN_DEFAULT : "")).replace(/\/+$/, "");

  return {
    plugins: [react(), tailwindcss(), seoHtmlTransform(origin)],
  };
});
