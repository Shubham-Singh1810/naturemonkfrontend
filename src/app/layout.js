import { Geist, Geist_Mono } from "next/font/google";
import { LoggedDataProvider } from "./context/Context";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Nature Monk",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
          crossOrigin="anonymous"
        ></link>

        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&family=Merriweather&display=swap"
          rel="stylesheet"
        />

        <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <LoggedDataProvider>
          {children}

          <ToastContainer position="top-right" autoClose={4000} />
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js"
            integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF"
            crossOrigin="anonymous"
          ></script>
        </LoggedDataProvider>
      </body>
    </html>
  );
}
