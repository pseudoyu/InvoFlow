import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "./helpers/client";
import Web3Connect from "./components/Web3Connect";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoFlow",
  description: "InvoFlow Invoice Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <div className="relative min-h-screen">
                <Web3Connect />
                {children}
              </div>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}