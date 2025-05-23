export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full py-4 text-center text-gray-500 text-sm mt-2">
      <p>© {currentYear} Risky Cahya Nugraha. All rights reserved.</p>
      <p className="mt-1">
        <a
          href="https://github.com/RissMorisson"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-800 transition-colors"
        >
          GitHub
        </a>
      </p>
    </footer>
  )
}
