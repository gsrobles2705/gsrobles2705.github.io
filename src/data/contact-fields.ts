
import { Mail, Phone, MapPin, Github } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ContactField {
  key: string;
  icon: LucideIcon;
  label: string;
  value: string;
  href: string | null;
  color: string;
}

/** Single source of truth for the contact email. */
export const EMAIL = 'gsrobles2705@gmail.com';

/** Static contact data extracted from the component to avoid re-creation on every render. */
export const contactFields: ContactField[] = [
  {
    key: 'email',
    icon: Mail,
    label: 'email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    color: '#e5c07b',
  },
  {
    key: 'phone',
    icon: Phone,
    label: 'phone',
    value: '+51 960 950 454',
    href: 'tel:+51960950454',
    color: '#98c379',
  },
  {
    key: 'location',
    icon: MapPin,
    label: 'location',
    value: 'Lima, Perú',
    href: null,
    color: '#61afef',
  },
  {
    key: 'github',
    icon: Github,
    label: 'github',
    value: '@gsrobles2705',
    href: 'https://github.com/gsrobles2705',
    color: '#abb2bf',
  },
];
