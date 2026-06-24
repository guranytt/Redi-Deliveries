import fs from 'fs';
import path from 'path';

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let changed = false;
      if (content.includes("react-router-dom")) {
        content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]react-router-dom['"];/g, (match, imports) => {
          let newImports = [];
          if (imports.includes('Link')) {
             newImports.push("import Link from 'next/link';");
          }
          let navImports = [];
          if (imports.includes('useNavigate')) navImports.push('useRouter');
          if (imports.includes('useLocation')) navImports.push('usePathname');
          if (imports.includes('useParams')) navImports.push('useParams');
          
          if (navImports.length > 0) {
             newImports.push(`import { ${navImports.join(', ')} } from 'next/navigation';`);
          }
          
          return newImports.join('\n');
        });
        
        content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);/g, 'const router = useRouter();');
        content = content.replace(/navigate\(/g, 'router.push(');
        content = content.replace(/const\s+location\s*=\s*useLocation\(\);/g, 'const pathname = usePathname();');
        content = content.replace(/location\.pathname/g, 'pathname');
        content = content.replace(/to=/g, 'href=');
        
        changed = true;
      }
      
      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceInDir('src');
