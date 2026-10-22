// src/components/Footer.jsx
// Slim one-line footer with the API attribution and the tech stack.
function Footer() {
  return (
    <footer className="border-t border-amber-100 bg-[#fffdf8]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-[11px] text-slate-500 sm:flex-row sm:px-6 lg:px-8">
        <p>
          Photos by{' '}
          <a
            href="https://picsum.photos"
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-amber-700 hover:underline"
          >
            Picsum Photos
          </a>{' '}
          — Lorem Picsum, the placeholder image API.
        </p>
        <p className="font-mono">
          React <span className="text-amber-600">19</span> · Vite <span className="text-amber-600">7</span> · Tailwind CSS{' '}
          <span className="text-amber-600">4</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
