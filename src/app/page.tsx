import Image from "next/image"

export default function Page() {
  return (
    <div className="container py-8">
      <h1 className="text-2xl mb-6">About Me</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div className="md:col-span-1">
          {/* Profile Picture Section */}
          <div className="relative aspect-square w-full max-w-[300px] mx-auto md:mx-0 overflow-hidden rounded-md border">
            <Image
              src="/COLOR_POP.jpg"
              alt="Dave Loaiza"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              className="object-cover"
              priority
            />
          </div>
        </div>

        <div className="md:col-span-2">
          {/* About Me Text Section */}
          <div className="prose max-w-none">
            <p>
              Hey there, I&apos;m Dave Loaiza. I recently moved back to the New York City area after twelve years living in 
              the SF Bay area. I work in technical go-to-market post sales for enterprise software products. I&apos;m passionate about working with customers 
              to implement technical solutions that make bottom-line business impacts. I&apos;m just getting started on this 
              page -- more to come soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

