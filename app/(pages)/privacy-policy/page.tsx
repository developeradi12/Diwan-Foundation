export default function PrivacyPolicyPage() {
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
             Privacy Policy
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
              Privacy{" "}
              <span
                className="relative inline-block"
                style={{ color: "var(--color-accent)" }}
              >
                Policy
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
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-gray-600 mb-6">
          At All Gujarat Muslim Fakir Diwan Samaj, we respect and protect the
          privacy of our members, donors and visitors. This privacy policy
          explains how we collect, use and safeguard your personal information.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Information We Collect
        </h2>

        <p className="text-gray-600 mb-4">
          We may collect personal information such as name, contact details,
          email address and other relevant details when users register as
          members, donate or contact us through our website.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          How We Use Information
        </h2>

        <p className="text-gray-600 mb-4">
          The information collected is used to manage membership records,
          process donations, communicate with members and improve our services
          and community programs.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Data Protection</h2>

        <p className="text-gray-600 mb-4">
          We take reasonable security measures to protect personal information
          from unauthorized access, misuse or disclosure. However, no online
          system can guarantee complete security.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">
          Third Party Sharing
        </h2>

        <p className="text-gray-600 mb-4">
          We do not sell or share personal information with third parties except
          when required by law or necessary for providing services related to
          our organization.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Policy Updates</h2>

        <p className="text-gray-600">
          This privacy policy may be updated periodically. Any changes will be
          posted on this page with the updated revision date.
        </p>
      </section>
    </div>
  );
}
