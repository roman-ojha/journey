import { Inter } from "next/font/google";
import "@/styles/base/reset.scss";
import "@/styles/base/global.scss";
import "@/types/CssVariables";
import Main from "./_components/main";
import Footer from "@/components/footer";
import NavBar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          <Main>
            <NavBar />
            {children}
            <Footer />
          </Main>
        </body>
      </html>
    </>
  );
}
