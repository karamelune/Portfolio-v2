import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex justify-between p-2">
      <div className="flex gap-2">
        <Link href={'/'} className="px-3 py-2">
          🏠
        </Link>
      </div>

      {/* Language switcher */}
      <LanguageSwitcher />
    </header>
  );
}
