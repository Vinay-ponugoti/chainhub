import Link from 'next/link';
import { Github, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-[1200px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-3">
            <h3 className="font-orbitron text-xl font-bold bg-gradient-to-r from-[#1c75c4] to-[#64b5f6] bg-clip-text text-transparent">
              CHAINHUB
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your trusted platform for blockchain exploration and transaction verification.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Github, href: 'https://github.com/Vinay-ponugoti' },
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
              title: 'Resources',
              links: ['Documentation'],
            },
          ].map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      href="https://github.com/Vinay-ponugoti/chainhub/blob/master/README.md"
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

        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} CHAINHUB. All rights reserved.
          </p>
          <span className="text-lg">❤️</span>
        </div>
      </div>
    </footer>
  );
}
