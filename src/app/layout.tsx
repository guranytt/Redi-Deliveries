import { Auth0Provider } from '@auth0/nextjs-auth0/client';
import '@/index.css';

export const metadata = {
  title: 'REDI',
  description: 'Food Delivery',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Auth0Provider>
          {children}
        </Auth0Provider>
      </body>
    </html>
  );
}
