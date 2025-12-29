export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className='min-h-dvh'>{children}</div>;
}
