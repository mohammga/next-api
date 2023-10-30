import '../styles/globals.css';
import { Inter } from "next/font/google";
import { ThemeProvider } from '../utils/theme-provider';
import Navigation from "@/components/navigation/Navigation";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hjemmeside - Pollify",
  description: "Poll...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no" suppressHydrationWarning className="scroll-smooth">
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
