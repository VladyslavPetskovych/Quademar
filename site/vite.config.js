import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { CONTACT, SEO, SEO_OG_IMAGE, SITE_ORIGIN_DEFAULT } from "./src/config/site.js";
import { buildIndexJsonLdGraph } from "./src/seo/structuredData.js";

function seoHtmlTransform(origin, googleSiteVerification) {
  return {
    name: "seo-html-transform",
    transformIndexHtml(html) {
      const ogImage = origin ? `${origin}${SEO_OG_IMAGE.path}` : SEO_OG_IMAGE.path;
      const canonical = origin ? `${origin}/` : "/";
      const ogUrl = canonical;

      const jsonLd =
        origin ? buildIndexJsonLdGraph({ origin, contact: CONTACT, seo: SEO }) : null;
      const ldScript = jsonLd
        ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`
        : "";

      const verificationMeta = googleSiteVerification
        ? `<meta name="google-site-verification" content="${googleSiteVerification}" />`
        : "";

      return html
        .replace(
          "\n\n    __GSC_VERIFICATION__\n",
          verificationMeta ? `\n\n    ${verificationMeta}\n` : "\n",
        )
        .replace("__SEO_LD_JSON__", ldScript)
        .replaceAll("__OG_IMAGE__", ogImage)
        .replaceAll("__TWITTER_IMAGE__", ogImage)
        .replaceAll("__OG_IMAGE_WIDTH__", String(SEO_OG_IMAGE.width))
        .replaceAll("__OG_IMAGE_HEIGHT__", String(SEO_OG_IMAGE.height))
        .replaceAll("__OG_IMAGE_ALT__", SEO_OG_IMAGE.alt)
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
  const googleSiteVerification = (env.VITE_GOOGLE_SITE_VERIFICATION || "").trim();

  return {
    plugins: [react(), tailwindcss(), seoHtmlTransform(origin, googleSiteVerification)],
    build: {
      // Keep imported photos as separate files; Vite does not recompress PNG/JPEG assets.
      assetsInlineLimit: 4096,
    },
  };
});
