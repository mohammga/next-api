import '../styles/globals.css';
import { Inter } from "next/font/google";
import { ThemeProvider } from '../utils/theme-provider';
import Navigation from "@/components/navigation/Navigation";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="no" suppressHydrationWarning className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link
          rel="icon"
          type="image/png"
          href="/android-chrome-192x192.png"
          sizes="192x192"
        />
        <link
          rel="icon"
          type="image/png"
          href="/android-chrome-512x512.png"
          sizes="512x512"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main>
              <Navigation />
              <div className="px-4 md:px-6 lg:px-8 h-screen">{children}</div>
            </main>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
