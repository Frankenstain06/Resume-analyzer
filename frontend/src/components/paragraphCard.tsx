import Link from "next/link";

interface ParagraphCardProps {
  title: string;
  content_1: string;
  content_2: string;
  content_3: string;
  content_4: string;
  href_1?: string;
  href_2?: string;
  href_3?: string;
  href_4?: string;
}

export default function ParagraphCard({ title, content_1, content_2, content_3, content_4, href_1 = "/", href_2 = "/", href_3 = "/", href_4 = "/" }: ParagraphCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-bold text-gray-900 mb-1">{title}</h3>
      <nav className="flex flex-col gap-2.5">
        <Link href={href_1} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">{content_1}</Link>
        <Link href={href_2} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">{content_2}</Link>
        <Link href={href_3} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">{content_3}</Link>
        <Link href={href_4} className="text-sm text-gray-500 hover:text-gray-800 transition-colors">{content_4}</Link>
      </nav>
    </div>
  );
}