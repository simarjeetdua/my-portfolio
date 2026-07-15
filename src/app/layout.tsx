import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Simarjeet Singh Dua — Full Stack Developer",
  description:
    "Portfolio of Simarjeet Singh Dua — Full Stack Developer building modern AI-powered web applications. B.Tech Computer Science at SVVV (2023–2027).",
  keywords: [
    "Simarjeet Singh Dua",
    "Full Stack Developer",
    "Next.js Developer",
    "React Developer",
    "AI Developer",
    "Web Developer",
    "Portfolio",
    "SVVV",
    "Computer Science",
  ],
  authors: [{ name: "Simarjeet Singh Dua" }],
  creator: "Simarjeet Singh Dua",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simarjeetdua.dev",
    title: "Simarjeet Singh Dua — Full Stack Developer",
    description:
      "Full Stack Developer building modern AI-powered web applications. Explore my projects, tech stack, and GitHub activity.",
    siteName: "Simarjeet Singh Dua Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Simarjeet Singh Dua — Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simarjeet Singh Dua — Full Stack Developer",
    description: "Full Stack Developer building modern AI-powered web applications.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  metadataBase: new URL("https://simarjeetdua.dev"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Simarjeet Singh Dua",
              url: "https://simarjeetdua.dev",
              sameAs: [
                "https://github.com/simarjeetdua",
                "https://www.linkedin.com/in/simarjeet-singh-dua-/",
                "https://leetcode.com/u/simarjeetdua/",
              ],
              jobTitle: "Full Stack Developer",
              description:
                "Computer Science undergraduate passionate about building scalable web applications and AI-powered products.",
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Shri Vaishnav Vidyapeeth Vishwavidyalaya",
              },
            }),
          }}
        />
      </head>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
