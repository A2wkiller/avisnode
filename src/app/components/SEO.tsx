import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  article?: boolean;
  author?: string;
  lang?: string;
}

export const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  article,
  author = 'AvixNode Team',
  lang = 'en'
}: SEOProps) => {
  const { pathname } = useLocation();
  
  const siteName = 'AvixNode';
  const defaultTitle = 'AvixNode - High Performance Game Hosting';
  const defaultDescription = 'AvixNode provides premium, low-latency game server hosting powered by Ryzen 9 7950X CPUs. Featuring instant setup, 24/7 technical support, and enterprise-grade DDoS protection for Minecraft, Rust, ARK, and Valheim.';
  const defaultKeywords = 'game hosting, minecraft server hosting, rust server hosting, ark survival evolved hosting, valheim server hosting, high performance vps, dedicated servers, ddos protection, low latency gaming';
  const siteUrl = 'https://avixnode.com';
  const defaultImage = `${siteUrl}/assets/weblogo.png`;
  const twitterHandle = '@avixnode';

  const seo = {
    title: title ? `${title} | ${siteName}` : defaultTitle,
    description: description || defaultDescription,
    keywords: keywords || defaultKeywords,
    image: image || defaultImage,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet>
      {/* General tags */}
      <html lang={lang} />
      <link rel="icon" type="image/png" href="/assets/weblogo.png" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />
      <meta name="author" content={author} />

      {/* GEO / AI Engine Optimization */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="topical-authority" content="Game Server Hosting, High Performance Computing, DDoS Security" />
      <meta name="entities" content="AvixNode, Minecraft, Rust, ARK: Survival Evolved, Valheim, Ryzen 9 7950X, DDR5 ECC RAM" />

      {/* Open Graph / Facebook */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={lang === 'en' ? 'en_US' : lang} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      
      {/* Multilingual Hreflang Tags */}
      <link rel="alternate" href={seo.url} hrefLang="x-default" />
      <link rel="alternate" href={seo.url} hrefLang="en" />
      
      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="ADD_YOUR_VERIFICATION_CODE_HERE" />
      {/* Bing Webmaster Tools Verification */}
      <meta name="msvalidate.01" content="ADD_YOUR_VERIFICATION_CODE_HERE" />
    </Helmet>
  );
};
