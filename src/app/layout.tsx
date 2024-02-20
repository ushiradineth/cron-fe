import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import "dayjs/plugin/duration";
import "dayjs/plugin/relativeTime";
import "dayjs/plugin/utc";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

dayjs.extend(require("dayjs/plugin/utc"));
dayjs.extend(require("dayjs/plugin/timezone"));
dayjs.extend(require("dayjs/plugin/duration"));
dayjs.extend(require("dayjs/plugin/relativeTime"));
dayjs.extend(require("dayjs/plugin/weekOfYear"));

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"dark min-h-screen bg-background font-sans antialiased",
					inter.variable,
				)}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
