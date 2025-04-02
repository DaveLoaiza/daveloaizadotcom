import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full py-4 border-b">
      <div className="container">
        <Link href="/" className="text-base font-normal">
          dave loaiza
        </Link>
      </div>
    </header>
  )
}

