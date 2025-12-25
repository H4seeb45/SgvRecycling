import Link from "next/link";
import Image from "next/image";
import { Linkedin, Twitter, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white w-full">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="SGV Recycle"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-heading font-bold">
                SGV Recycle
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed font-body">
              A premier UK material recovery partner, specializing in the
              ethical disposal and recycling of tyres, rubber, and plastics.
              Bridging the gap between industrial waste and the circular economy
              since 2018.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://linkedin.com/company/sgvrecycle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/sgvrecycle"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Services (Quick Links) */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">
              Recovery Solutions
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/services/tyres"
                  className="text-slate-400 hover:text-[#7CC444] transition-colors font-body"
                >
                  Tyre Recycling
                </Link>
              </li>
              <li>
                <Link
                  href="/services/rubber"
                  className="text-slate-400 hover:text-[#7CC444] transition-colors font-body"
                >
                  Rubber Remediation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/plastics"
                  className="text-slate-400 hover:text-[#7CC444] transition-colors font-body"
                >
                  Plastic Regeneration
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company (Navigation) */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-slate-400 hover:text-[#7CC444] transition-colors font-body"
                >
                  About SGV
                </Link>
              </li>
              <li>
                <Link
                  href="/#contact"
                  className="text-slate-400 hover:text-[#7CC444] transition-colors font-body"
                >
                  Compliance & Licenses
                </Link>
              </li>
              <li>
                <Link
                  href="/purchasing"
                  className="text-[#7CC444] hover:text-[#6ab335] transition-colors font-body font-semibold"
                >
                  Sell Your Waste
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Statutory & Contact (The Legal Trust) */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4">
              Registered Office
            </h3>
            <div className="space-y-3 text-sm text-slate-400 font-body">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#7CC444] flex-shrink-0 mt-0.5" />
                <div>
                  <p>110 Plashet Road</p>
                  <p>Plaistow, London, E13 0QS</p>
                  <p>United Kingdom</p>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <p className="text-white font-medium">Contact</p>
                <p>Phone: +44 7551 568468</p>
                <p>Email: salim@sgvrecyclingltd.co.uk</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Copyright) */}
        <div className="border-t border-slate-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Left Side: Copyright Stack */}
            <div>
              <p className="text-slate-500 text-sm font-body">
                © 2018-2025 SGV Recycle Ltd. All rights reserved.
              </p>
              {/* Subtle agency credit */}
              <p className="mt-1 text-[10px] text-slate-600 font-body">
                Designed and deployed by{" "}
                <a
                  href="https://binarybyte.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-500 transition-colors duration-300"
                >
                  Binary Byte
                </a>
                .
              </p>
            </div>
            {/* Right Side: Legal Links */}
            <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm">
              <Link
                href="/legal/privacy-policy"
                className="text-slate-400 hover:text-[#7CC444] transition-colors font-body"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/legal/terms-of-service"
                className="text-slate-400 hover:text-[#7CC444] transition-colors font-body"
              >
                Terms of Service
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                href="/legal/cookie-policy"
                className="text-slate-400 hover:text-[#7CC444] transition-colors font-body"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
