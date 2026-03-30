import Image from "next/image"
import Link from "next/link"

export default function MembersPage() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-primary)" }}
      >
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        {/* Accent blobs */}
        <div
          className="absolute -top-28 -right-28 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: "var(--color-accent)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full opacity-5 pointer-events-none"
          style={{ background: "var(--color-accent)" }}
        />
        <div className="container section">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-8 blog-fade-in text-xs">
            <a
              href="/"
              className="font-semibold uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-text-inverse)" }}
            >
              Home
            </a>
            <span className="opacity-30" style={{ color: "var(--color-text-inverse)" }}>/</span>
            <a
              href="/members"
              className="font-semibold uppercase tracking-widest opacity-50 hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-text-inverse)" }}
            >
              Members
            </a>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — Introduction to the Community */}
            <div className="space-y-6 page-fade-in" style={{ animationDelay: "0.1s" }}>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{
                  background: "rgba(249,115,22,0.15)",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(249,115,22,0.3)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "var(--color-accent)" }} />
                Connect · Collaborate · Contribute
              </div>

              <h1
                className="font-black leading-[1.05] tracking-tight"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text-inverse)",
                  fontSize: "clamp(36px, 5vw, 60px)",
                }}
              >
                The Heart of Our{" "}
                <span className="relative inline-block" style={{ color: "var(--color-accent)" }}>
                  Community
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 8" fill="none">
                    <path d="M2 6 C60 2, 140 2, 210 4 C260 6, 285 3, 298 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              <p className="text-base leading-relaxed opacity-75 max-w-lg" style={{ color: "var(--color-text-inverse)" }}>
                Meet the dedicated individuals driving the Fakir Diwan mission forward.
                Our directory celebrates the diverse professionals, students, and
                elders who make our collective impact possible.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/donate"
                  className="btn text-sm button hover:text-(--color-accent) "
                >
                  Become a Member
                </Link>
              </div>
            </div>

            {/* Right — Member Categories/Stats */}
            <div className="grid grid-cols-2 gap-6 page-fade-in" style={{ animationDelay: "0.2s" }}>

              <div
                className="p-5 rounded-xl hover:scale-105 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <h3 className="font-bold mb-2" style={{ color: "var(--color-text)" }}>
                  Global Network
                </h3>
                <p className="text-sm opacity-70" style={{ color: "var(--color-text)" }}>
                  Connect with community members across cities and continents.
                </p>
              </div>

              <div
                className="p-5 rounded-xl hover:scale-105 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <h3 className="font-bold mb-2" style={{ color: "var(--color-text)" }}>
                  Professional Mentors
                </h3>
                <p className="text-sm opacity-70" style={{ color: "var(--color-text)" }}>
                  Experienced leaders offering guidance to the next generation.
                </p>
              </div>

              <div
                className="p-5 rounded-xl hover:scale-105 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <h3 className="font-bold mb-2" style={{ color: "var(--color-text)" }}>
                  Youth Volunteers
                </h3>
                <p className="text-sm opacity-70" style={{ color: "var(--color-text)" }}>
                  The energetic force behind our events and social initiatives.
                </p>
              </div>

              <div
                className="p-5 rounded-xl hover:scale-105 transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                <h3 className="font-bold mb-2" style={{ color: "var(--color-text)" }}>
                  Lifetime Members
                </h3>
                <p className="text-sm opacity-70" style={{ color: "var(--color-text)" }}>
                  Honoring those whose long-term commitment sustains our vision.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* HERO */}
      <section className="py-20 text-center max-w-6xl mx-auto px-6">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Our Members
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          The strength of the Fakir Diwan community lies in the unity
          and participation of its members. Our members contribute to
          social welfare, community development and support initiatives.
        </p>

        {/* Leadership */}
        <div className="mt-16 grid md:grid-cols-3 gap-10">

          {/* Managing Director */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow">
              <Image
                src="/images/gallery/ManagingDirector.jpeg"
                alt="Director"
                fill
                className="object-scale-down"
              />
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              A. B. Fakir
            </h3>

            <p className="text-gray-500">
              Managing  Director
            </p>
          </div>

          {/* Director 1 */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow">
              <Image
                src="/images/gallery/director.jpeg"
                alt="Director"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              Ayubsha Diwan
            </h3>

            <p className="text-gray-500">
              Director
            </p>
          </div>

          {/* Director 2 */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden shadow">
              <Image
                src="/images/gallery/director2.jpeg"
                alt="Director"
                fill
                className="object-scale-down"
              />
            </div>

            <h3 className="mt-4 text-xl font-semibold">
              Usmangani Fakir
            </h3>

            <p className="text-gray-500">
              Director
            </p>
          </div>

        </div>

      </section>

      {/* ABOUT MEMBERSHIP */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-bold mb-6">
              About Membership
            </h2>

            <p className="text-gray-600 mb-4">
              Membership in the Fakir Diwan Samaj represents a shared
              commitment to strengthening our community and supporting
              those in need. Members actively participate in community
              activities, decision-making processes and welfare programs.
            </p>

            <p className="text-gray-600">
              Through membership, individuals become part of a network
              that promotes unity, cultural values and social progress
              across the Fakir Diwan community.
            </p>
          </div>

          <div className="bg-gray-100 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">
              Membership Benefits
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li>• Participation in community events</li>
              <li>• Access to welfare and support programs</li>
              <li>• Networking within the community</li>
              <li>• Opportunities to contribute to social development</li>
              <li>• Representation in community decisions</li>
            </ul>
          </div>

        </div>
      </section>

      {/* MEMBER RESPONSIBILITIES */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            Responsibilities of Members
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3">
                Community Participation
              </h3>
              <p className="text-gray-600">
                Members are encouraged to participate in social
                programs, meetings and cultural events organized
                by the community.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3">
                Support & Unity
              </h3>
              <p className="text-gray-600">
                Members contribute to maintaining unity,
                cooperation and mutual respect within
                the Fakir Diwan community.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="font-semibold mb-3">
                Social Development
              </h3>
              <p className="text-gray-600">
                Members support initiatives that promote
                education, welfare and development of
                community members.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      {/* <section className="bg-(--color-accent) py-20 text-center text-white">

        <h2 className="text-3xl font-bold mb-6">
          Become a Member
        </h2>

        <p className="mb-8">
          Join us in building a stronger and more united community.
        </p>

        <Link
          href="/member-login"
          className="bg-white text-black px-6 py-3 rounded-full font-medium"
        >
          Member Login / Register
        </Link>

      </section> */}

    </>
  )
}