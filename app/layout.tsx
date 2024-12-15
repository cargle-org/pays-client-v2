import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import GeneralProvider from "@/context/GenralContext";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

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
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <head>
          {/* <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=G-X0WYX329V6`}
          />

          <Script id="google-analytics" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-X0WYX329V6');
          `}
          </Script> */}
          {/* <!-- Google tag (gtag.js) --> */}
          {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-X0WYX329V6"></script>
          <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-X0WYX329V6');
          </script> */}
        </head>
        <body>
          <GeneralProvider>
            <ToastContainer
              position="top-right"
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
