import { ClerkProvider } from '@clerk/nextjs';
import '@/index.css';

export const metadata = {
  title: 'REDI',
  description: 'Food Delivery',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
