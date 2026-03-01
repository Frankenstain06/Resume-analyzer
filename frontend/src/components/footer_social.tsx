import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

export default function FooterSocials() {
  return (
    <div className="flex gap-4 mt-1">
      <a href="#" aria-label="Instagram" className="text-gray-400 hover:text-gray-600 transition-colors">
        <Instagram size={20} strokeWidth={1.5} />
      </a>
      <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-gray-600 transition-colors">
        <Facebook size={20} strokeWidth={1.5} />
      </a>
      <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-gray-600 transition-colors">
        <Twitter size={20} strokeWidth={1.5} />
      </a>
      <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-gray-600 transition-colors">
        <Linkedin size={20} strokeWidth={1.5} />
      </a>
    </div>
  );
}