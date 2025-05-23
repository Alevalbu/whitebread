import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-white dark:bg-black text-black dark:text-white">
      <Link href={'/en'}>English Form</Link>
      <Link href={'/de'}>Buchungsformular</Link>
    </div>
  );
}
