import './styles/globals.css';
import { Inter } from "next/font/google";
import { ThemeProvider } from '../../utils/theme-provider';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Poll",
  description: "Poll...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="no">
      <body className={inter.className}>
        <div className="sm:px-4 md:px-12 lg:px-20">
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  );
}
