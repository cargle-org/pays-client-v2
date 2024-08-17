import "@/app/globals.css";
// export default async function MainLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>)

export default async function MainLayout({ children }: any) {
  return <div className="flex flex-col">{children}</div>;
}
