import { ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

function IconBase({ children, size = 24, className, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
      width={size}
      {...props}
    >
      {children}
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-3.5-3.5" />
    </IconBase>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5.5 4.75c0-.69.56-1.25 1.25-1.25H9a1.5 1.5 0 0 1 1.46 1.17l.56 2.49a1.5 1.5 0 0 1-.43 1.41l-1.14 1.12a14.5 14.5 0 0 0 4.9 4.9l1.12-1.14a1.5 1.5 0 0 1 1.41-.43l2.49.56A1.5 1.5 0 0 1 20.5 15v2.25c0 .69-.56 1.25-1.25 1.25h-.75C10.49 18.5 5.5 13.51 5.5 7.5z" />
    </IconBase>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m14.5 5-7 7 7 7" />
    </IconBase>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9.5 5 7 7-7 7" />
    </IconBase>
  );
}

export function FactoryIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3.5 20.5h17" />
      <path d="M5 20.5V9.5l5 3V9.5l5 3V6.5l4 2.5v11.5" />
      <path d="M8 20.5v-4h3v4" />
    </IconBase>
  );
}

export function ShieldCheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5 5.5 6v5.5c0 4 2.64 7.57 6.5 9 3.86-1.43 6.5-5 6.5-9V6z" />
      <path d="m9.5 12 1.75 1.75L15 10" />
    </IconBase>
  );
}

export function DeliveryIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M3.5 7.5h10v8h-10z" />
      <path d="M13.5 10.5h3.25l2.25 2.25v2.75h-5.5z" />
      <circle cx="8" cy="18" r="1.75" />
      <circle cx="17" cy="18" r="1.75" />
    </IconBase>
  );
}

export function HeadsetIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 13a7.5 7.5 0 1 1 15 0" />
      <path d="M4.5 13v4a2 2 0 0 0 2 2H8v-6H6.5a2 2 0 0 0-2 2Z" />
      <path d="M19.5 13v4a2 2 0 0 1-2 2H16v-6h1.5a2 2 0 0 1 2 2Z" />
    </IconBase>
  );
}

export function BadgeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 3 2.25 1.25 2.58-.3 1.1 2.35 2.32 1.16-.73 2.5L20 12l-.48 2.04.73 2.5-2.32 1.16-1.1 2.35-2.58-.3L12 21l-2.25-1.25-2.58.3-1.1-2.35-2.32-1.16.73-2.5L4 12l.48-2.04-.73-2.5 2.32-1.16 1.1-2.35 2.58.3z" />
      <path d="m9.5 12 1.5 1.5 3.5-3.5" />
    </IconBase>
  );
}

export function WalletIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4.5 7.5A2.5 2.5 0 0 1 7 5h10.5v14H7A2.5 2.5 0 0 1 4.5 16.5z" />
      <path d="M17.5 9.5h2v5h-2a2.5 2.5 0 1 1 0-5Z" />
      <path d="M7 8.5h10.5" />
    </IconBase>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m14.5 6.5 3-3a4 4 0 0 1-5 5l-6.75 6.75a1.77 1.77 0 1 0 2.5 2.5l6.75-6.75a4 4 0 0 1 5-5l-3 3" />
    </IconBase>
  );
}

export function MenuGridIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 5h5v5H5zM14 5h5v5h-5zM5 14h5v5H5zM14 14h5v5h-5z" />
    </IconBase>
  );
}

export function BoltIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13 2.5 6.5 13H11l-1 8.5L17.5 11H13z" />
    </IconBase>
  );
}

export function DropletsIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3.5c2.58 3.07 5.5 6.2 5.5 9.65A5.5 5.5 0 0 1 6.5 13.15C6.5 9.7 9.42 6.57 12 3.5Z" />
    </IconBase>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M13.5 20v-6h2.5l.5-3h-3V9.5c0-.9.3-1.5 1.6-1.5H16V5.3c-.3 0-1.2-.3-2.3-.3-2.3 0-3.9 1.4-3.9 4V11H7v3h2.8v6" />
    </IconBase>
  );
}

export function YoutubeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M20 8.75a2.5 2.5 0 0 0-1.77-1.77C16.77 6.5 12 6.5 12 6.5s-4.77 0-6.23.48A2.5 2.5 0 0 0 4 8.75 26 26 0 0 0 3.5 12c0 1.08.17 2.83.5 3.25a2.5 2.5 0 0 0 1.77 1.77c1.46.48 6.23.48 6.23.48s4.77 0 6.23-.48A2.5 2.5 0 0 0 20 15.25c.33-.42.5-2.17.5-3.25s-.17-2.83-.5-3.25Z" />
      <path d="m10 9.5 4 2.5-4 2.5z" />
    </IconBase>
  );
}

export function TiktokIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 4v8.25a3.25 3.25 0 1 1-3.25-3.25" />
      <path d="M14 4c.83 1.9 2.34 3 4.5 3.25" />
    </IconBase>
  );
}

export function InstagramIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect height="15" rx="4" width="15" x="4.5" y="4.5" />
      <circle cx="12" cy="12" r="3.25" />
      <path d="M17.35 6.65h.01" />
    </IconBase>
  );
}
