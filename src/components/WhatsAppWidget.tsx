import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  return (
    <a
      href="https://wa.me/250784710788?text=Hello%20Hero%20Home%20Tech%20Solutions,%20I%20would%20like%20to%20discuss%20a%20project."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xl transition-all hover:scale-110 flex items-center justify-center group"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs font-bold pl-0 group-hover:pl-2">
        Chat with Us
      </span>
    </a>
  );
}
