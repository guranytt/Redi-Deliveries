import fs from 'fs';
import path from 'path';

function addUseClient(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      addUseClient(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if ((content.includes('useState') || content.includes('useEffect') || content.includes('useRouter') || content.includes('usePathname') || content.includes('useParams')) && !content.includes('"use client"')) {
        content = '"use client";\n' + content;
        fs.writeFileSync(fullPath, content);
        console.log(`Added "use client" to ${fullPath}`);
      }
    }
  }
}

addUseClient('src/app');
addUseClient('src/components');
