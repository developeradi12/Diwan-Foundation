export default function TermsPage() {
  return (
    <div className="">

       <section
        className="relative overflow-hidden"
        style={{ background: "var(--color-primary)" }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-10 pointer-events-none"
          style={{ background: "var(--color-accent)" }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-56 h-56 rounded-full opacity-5 pointer-events-none"
          style={{ background: "var(--color-accent)" }}
        />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container section">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-8 blog-fade-in">
            <span
              className="text-xs font-semibold uppercase tracking-widest opacity-50"
              style={{ color: "var(--color-text-inverse)" }}
            >
              Home
            </span>
            <span
              className="opacity-30"
              style={{ color: "var(--color-text-inverse)" }}
            >
              /
            </span>
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
             Terms & Conditions
            </span>
          </div>

          <div
            className="max-w-3xl blog-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <h1
              className="font-black leading-[1.05] tracking-tight mb-5"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-inverse)",
                fontSize: "clamp(36px, 5vw, 64px)",
              }}
            >
              Terms & {" "}
              <span
                className="relative inline-block"
                style={{ color: "var(--color-accent)" }}
              >
                Conditions
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 260 8"
                  fill="none"
                >
                  <path
                    d="M2 6 C50 2, 120 2, 180 4 C220 6, 245 3, 258 2"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>
            
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">

        <h1 className="text-4xl font-bold mb-8">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6">
          Welcome to the website of All Gujarat Muslim Fakir Diwan Samaj.
          By accessing and using this website, you agree to comply with
          and be bound by the following terms and conditions. If you do
          not agree with any part of these terms, please refrain from
          using this website.
        </p>

        {/* Use of Website */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Use of the Website
        </h2>

        <p className="text-gray-600 mb-4">
          This website is intended to provide information about the
          activities, services and initiatives of the Fakir Diwan
          community organization. Users agree to use this website
          only for lawful purposes and in a way that does not
          infringe upon the rights of others.
        </p>

        {/* Membership */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Membership
        </h2>

        <p className="text-gray-600 mb-4">
          Individuals who register as members must provide accurate
          and complete information. The organization reserves the
          right to approve, reject or terminate membership if any
          misleading or inappropriate information is provided.
        </p>

        {/* Donations */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Donations
        </h2>

        <p className="text-gray-600 mb-4">
          Donations made through this website are voluntary and are
          used to support community welfare activities, educational
          programs and social initiatives. All donations are handled
          responsibly and used for the betterment of the community.
        </p>

        {/* Intellectual Property */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Intellectual Property
        </h2>

        <p className="text-gray-600 mb-4">
          All content on this website including text, images,
          logos and design elements belongs to the organization
          unless otherwise stated. Unauthorized reproduction,
          distribution or use of this content is prohibited.
        </p>

        {/* Limitation of Liability */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Limitation of Liability
        </h2>

        <p className="text-gray-600 mb-4">
          While we strive to ensure the accuracy of information on
          this website, the organization is not responsible for any
          errors, omissions or damages resulting from the use of
          this website.
        </p>

        {/* Changes */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Changes to Terms
        </h2>

        <p className="text-gray-600 mb-4">
          These terms and conditions may be updated from time to
          time. Any changes will be reflected on this page and users
          are encouraged to review this page periodically.
        </p>

        {/* Contact */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Contact Information
        </h2>

        <p className="text-gray-600">
          If you have any questions regarding these Terms &
          Conditions, please contact us through the contact page
          of this website.
        </p>

      </section>

    </div>
  )
}