"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { locales } from "../../i18n";

type LanguageSwitcherProps = {
  currentLocale: string;
};

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const t = useTranslations("languageSwitcher");
  const router = useRouter();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const currentPath = window.location.pathname;

    const newPath = currentPath.replace(`/${currentLocale}`, `/${newLocale}`);
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
          {locale}
        </option>
      ))}
    </select>
  );
}
