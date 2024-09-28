"use client";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { QueryClient } from "@tanstack/react-query";
import { sepolia, baseSepolia } from "wagmi/chains";
export const config = getDefaultConfig({
  appName: "InvoFlow",
  projectId: "a1bbce60ba2d56e175fa93246fd672b6",
  chains: [sepolia, baseSepolia],
  ssr: true,
});
export const queryClient = new QueryClient();