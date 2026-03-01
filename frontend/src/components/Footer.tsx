import ParagraphCard from "./paragraphCard";
import FooterSocials from "./footer_social";
import Link from "next/link";
import { FileText } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold text-teal-700">
              <FileText size={22} />
              MyReazr
            </Link>
          </div>

          {/* Link columns */}
          <ParagraphCard title="Features" content_1="Resume Scoring" content_2="ATS Check" content_3="Keywords" content_4="Cover Letters" href_1="/features" href_2="/features" href_3="/features" href_4="/features" />
          <ParagraphCard title="Company" content_1="About Us" content_2="Careers" content_3="Contact" content_4="Blog" href_4="/blog" />
          <ParagraphCard title="Resources" content_1="Templates" content_2="Guides" content_3="Ebooks" content_4="Tutorials" href_1="/resources" href_2="/resources" href_3="/resources" href_4="/resources" />

          {/* Follow us */}
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold text-gray-900 mb-1">Follow us</p>
            <FooterSocials />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-center items-center gap-3">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} MyReazr. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
