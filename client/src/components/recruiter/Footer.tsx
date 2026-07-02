export default function Footer() {
  return (
    <footer className="w-full bg-white py-3 px-6 text-sm text-gray-500 flex justify-between">
      <span>© {new Date().getFullYear()} CodeElevate</span>
      <span>All rights reserved</span>
    </footer>
  );
}