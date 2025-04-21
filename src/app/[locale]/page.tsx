import { Metadata } from "next";
import BookingForm from "../../components/form/BookingForm";

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

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <BookingForm locale={locale} />
      </div>
    </main>
  );
}
