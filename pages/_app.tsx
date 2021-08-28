import { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';

export default function SWCharacters({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
