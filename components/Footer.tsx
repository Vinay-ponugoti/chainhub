import Link from 'next/link';
import { Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="font-orbitron text-xl font-bold bg-gradient-to-r from-[#1c75c4] to-[#64b5f6] bg-clip-text text-transparent">
              CHAINHUB
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your trusted platform for blockchain exploration and transaction verification.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: MessageCircle, href: '#' },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="text-gray-600 hover:text-[#1c75c4] dark:text-gray-400 dark:hover:text-[#64b5f6] transition-colors"
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {[
            {
              title: 'Product',
              links: ['Features', 'Security', 'Team', 'Enterprise'],
            },
            {
              title: 'Resources',
              links: ['Documentation', 'API', 'Status', 'Blog'],
            },
            {
              title: 'Company',
              links: ['About', 'Careers', 'Contact', 'Partners'],
            },
          ].map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="#"
                      className="text-sm text-gray-600 hover:text-[#1c75c4] dark:text-gray-400 dark:hover:text-[#64b5f6] transition-colors"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            © {currentYear} CHAINHUB. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}