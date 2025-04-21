'use client';
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Moon, Sun } from 'lucide-react';

const locales = ['en', 'de'];

type HeaderProps = {
    currentLocale: string;
  };


  export default function Header({ currentLocale }: HeaderProps) {
    const { theme, setTheme } = useTheme();
    const t = useTranslations("languageSwitcher");
    const router = useRouter();
    const pathName = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
      }, []);

      const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = e.target.value;
        const pathWithoutLocale = pathName.replace(`/${currentLocale}`, '') || '/';
        const newPath = `/${newLocale}${pathWithoutLocale}`;
        router.push(newPath);
      };
    
      const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
      };

      return (
        <header className="w-full border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-colors duration-200">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">            
            <div className="flex items-center space-x-4">
              <select
                value={currentLocale}
                onChange={handleLanguageChange}
                className="p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
                aria-label="Change Language"
              >
                {locales.map((locale) => (
                  <option key={locale} value={locale}>
                    {t(`${locale}`, { fallback: locale.toUpperCase() })}
                  </option>
                ))}
              </select>
              {mounted && (
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              )}
            </div>
          </div>
        </header>
      );
    
    };