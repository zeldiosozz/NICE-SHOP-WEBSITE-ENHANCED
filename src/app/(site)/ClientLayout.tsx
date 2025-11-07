"use client";
import { useState, useEffect } from "react";
import "../css/euclid-circular-a-font.css";
import "../css/style.css";
import Header from "../../components/Header";
import Welcome from "../../components/WelcomeModal";
import Footer from "../../components/Footer";
import { ModalProvider } from "../context/QuickViewModalContext";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ReduxProvider } from "@/redux/provider";
import QuickViewModal from "@/components/Common/QuickViewModal";
import CartSidebarModal from "@/components/Common/CartSidebarModal";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreviewSliderModal from "@/components/Common/PreviewSlider";
import '../css/global.css';
import ScrollToTop from "@/components/Common/ScrollToTop";
import PreLoader from "@/components/Common/PreLoader";
import RunningBanner from "../../components/RunningBanner";
export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState<boolean>(true);
const [welcomeOpen, setWelcomeOpen] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        {loading ? (
          <PreLoader />
        ) : (
          <>
            <ReduxProvider>
              <CartModalProvider>
                <ModalProvider>
                  <PreviewSliderProvider>
                    
                    <Header />
{!welcomeOpen && <RunningBanner />}
                    
<Welcome
                      isOpen={welcomeOpen}
                      onClose={() => setWelcomeOpen(false)}
                    />                    
                    {children}

                    <QuickViewModal />
                    <CartSidebarModal />
                    <PreviewSliderModal />
                  </PreviewSliderProvider>
                </ModalProvider>
              </CartModalProvider>
            </ReduxProvider>
            <ScrollToTop />
            <Footer />
          </>
        )}
      </body>
    </html>
  );
}
