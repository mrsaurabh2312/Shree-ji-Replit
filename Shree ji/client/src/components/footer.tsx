import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-dark-brown text-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🕉️</span>
              <span className="text-xl font-bold font-serif">Sacred Essentials</span>
            </div>
            <p className="text-warm-gray mb-4">
              Your trusted source for authentic pooja samgri and spiritual products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-saffron hover:text-gold transition-colors">
                📘
              </a>
              <a href="#" className="text-saffron hover:text-gold transition-colors">
                📷
              </a>
              <a href="#" className="text-saffron hover:text-gold transition-colors">
                🐦
              </a>
              <a href="#" className="text-saffron hover:text-gold transition-colors">
                📺
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-warm-gray">
              <li>
                <Link href="/" className="hover:text-saffron transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-saffron transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-saffron transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-saffron transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2 text-warm-gray">
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-saffron transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <div className="space-y-2 text-warm-gray">
              <p>📞 +91 98765 43210</p>
              <p>✉️ info@sacredessentials.com</p>
              <p>📍 New Delhi, India</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-warm-gray mt-8 pt-8 text-center text-warm-gray">
          <p>&copy; 2024 Sacred Essentials. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
