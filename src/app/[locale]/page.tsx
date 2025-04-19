import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import BookingForm from '../../components/form/BookingForm';
import LanguageSwitcher from '../../components/UI/LanguageSwitcher';

export const metadata: Metadata = {
    title: "Booking Form",
    description: 'Sample booking form with internationalization'
};

export const revalidate = 3600;

export default async function Home({
    params: {locale}
}: {
    params: {locale: string}
}) {
    const t = await getTranslations('form');

    return (
        <main className="container mx-auto px-4 py-8">
            <div className='max-w-2xl mx-auto'>
                <BookingForm locale={locale}/>
            </div>
        </main>
    )
}