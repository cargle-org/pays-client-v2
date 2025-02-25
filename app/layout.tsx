import type { Metadata } from "next";
import "./globals.css";
import GeneralProvider from "@/context/GenralContext";
import { ToastContainer } from "react-toastify";
import Script from "next/script";
import { Manrope } from "next/font/google";

// Initialize Manrope font
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Pays",
  description: "Create and cashout vouchers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang='en' className={`${manrope.variable}`}>
        <head>
          <Script async src={`https://www.googletagmanager.com/gtag/js?id=G-636938PFTH`} />

          <Script id='google-analytics' strategy='afterInteractive'>
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-636938PFTH');
          `}
          </Script>
        </head>
        <body className='font-manrope'>
          <GeneralProvider>
            <ToastContainer
              position='top-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {children}
          </GeneralProvider>
        </body>
      </html>
    </>
  );
}
