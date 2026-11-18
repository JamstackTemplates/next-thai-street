// Small 24px icons in a shared 2.5px stroke style. Decorative: pair them with visible text.
import type { ReactNode } from 'react';

function Icon({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`inline-block h-[1.25em] w-[1.25em] flex-none ${className}`} fill="none" stroke="currentColor"
      strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{children}</svg>
  );
}

export const ChilliIcon = ({ className }: { className?: string }) => <Icon className={className}><path d="M4 12c3-6 10-8 15-4-3 0-5 3-7 6-3 5-8 6-8-2z" fill="currentColor" stroke="none" /><path d="M17 7c1-2 3-3 4-3" /></Icon>;
export const LeafIcon = ({ className }: { className?: string }) => <Icon className={className}><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19l8-8" /></Icon>;
export const ClockIcon = ({ className }: { className?: string }) => <Icon className={className}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></Icon>;
export const PinIcon = ({ className }: { className?: string }) => <Icon className={className}><path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z" /><circle cx="12" cy="9" r="2.5" /></Icon>;
export const PhoneIcon = ({ className }: { className?: string }) => <Icon className={className}><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" /></Icon>;
export const MailIcon = ({ className }: { className?: string }) => <Icon className={className}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></Icon>;
export const TicketIcon = ({ className }: { className?: string }) => <Icon className={className}><path d="M3 7h18v3a2 2 0 0 0 0 4v3H3v-3a2 2 0 0 0 0-4z" /><path d="M14 7v10" strokeDasharray="2 2" /></Icon>;
export const TramIcon = ({ className }: { className?: string }) => <Icon className={className}><rect x="5" y="6" width="14" height="12" rx="3" /><path d="M5 12h14M9 2h6M12 2v4M8 18l-2 3M16 18l2 3" /></Icon>;
export const TrainIcon = ({ className }: { className?: string }) => <Icon className={className}><path d="M6 4h12v11a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3z" /><path d="M6 10h12M9 14h.01M15 14h.01M8 21l2-3M16 21l-2-3" /></Icon>;
export const BikeIcon = ({ className }: { className?: string }) => <Icon className={className}><circle cx="6" cy="16" r="4" /><circle cx="18" cy="16" r="4" /><path d="M6 16l4-7h5l3 7M10 9l3 7M13 6h3" /></Icon>;
