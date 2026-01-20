interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`text-xs text-gray-500 ${className ?? ""}`}>
      © {new Date().getFullYear()} CodeElevate Inc. All rights reserved.
    </footer>
  );
}
