"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";

const locales = ['en', 'de'];

type LanguageSwitcherProps = {
  currentLocale: string;
};

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher");
  const router = useRouter();
  const pathName = usePathname();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const pathWithoutLocale = pathName.replace(`/${currentLocale}`, '') || '/';

    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <select
      value={currentLocale}
      onChange={handleLanguageChange}
      className="p-2 border border-gray-300 rounded-md"
      aria-label="Change Language"
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {t(`${locale}`, { fallback: locale.toUpperCase() })}
        </option>
      ))}
    </select>
  );
}
