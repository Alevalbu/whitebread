import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import BookingForm from "../../components/form/BookingForm";
import LanguageSwitcher from "../../components/UI/LanguageSwitcher";

export const metadata: Metadata = {
  title: "Booking Form",
  description: "Sample booking form with internationalization",
};

export const revalidate = 3600;

interface HomeParams {
  params: Promise<{
    locale: string;
  }>;
}

export default async function Home({ params }: HomeParams) {
  const { locale } = await params;
  const t = await getTranslations("form");

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <LanguageSwitcher currentLocale={locale} />
      </div>
      <div className="max-w-2xl mx-auto">
        <BookingForm locale={locale} />
      </div>
    </main>
  );
}
