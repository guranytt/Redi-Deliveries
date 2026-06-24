import fs from 'fs';
import path from 'path';

const pagesDir = 'src/pages';
const appDir = 'src/app';

const mappings = {
  'Home.tsx': 'page.tsx',
  'Auth.tsx': 'auth/page.tsx',
  'Cart.tsx': 'cart/page.tsx',
  'Checkout.tsx': 'checkout/page.tsx',
  'Orders.tsx': 'orders/page.tsx',
  'Stores.tsx': 'stores/page.tsx',
  'Tracking.tsx': 'tracking/[id]/page.tsx',
  'Vendor.tsx': 'vendor/[id]/page.tsx',
  'Product.tsx': 'product/[id]/page.tsx',
  'Admin.tsx': 'admin/page.tsx',
  'Wallet.tsx': 'wallet/page.tsx'
};

for (const [src, dest] of Object.entries(mappings)) {
  const srcPath = path.join(pagesDir, src);
  const destPath = path.join(appDir, dest);
  if (fs.existsSync(srcPath)) {
    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.renameSync(srcPath, destPath);
    console.log(`Moved ${srcPath} to ${destPath}`);
  }
}
