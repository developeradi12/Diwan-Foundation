"use client";

import Image from "next/image";

const team = [
  {
    name: "A. B. Fakir",
    role: "Managing Director",   
    image : "/images/gallery/managin-director.png" 
  },
  {
    name: "Ayubsha Diwan",
    role: "Director",
    image : "/images/gallery/director.png"    
  },
  {
    name: "Usmangani Fakir",
    role: "Director",
     image : "/images/gallery/director-2.png"    
  },
];

export default function TeamSection() {
  return (
    <section id="team" className="section" style={{ background: "var(--color-surface-alt)" }}>
      <div className="container">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 about-fade-in">
          <div>
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: "var(--color-accent)" }}
            >
              The People Behind It
            </span>
            <h2
              className="mt-2 text-4xl font-black leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              Meet Our{" "}
              <span style={{ color: "var(--color-primary)" }}>Members.</span>
            </h2>
          </div>
          <p
            className="text-sm leading-relaxed max-w-sm"
            style={{ color: "var(--color-text-muted)" }}
          >
            Experts who gave up comfortable careers to chase something far more
            meaningful — impact that outlives them.
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div
              key={member.name}
              className="rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 about-fade-in"
              style={{
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                boxShadow: "var(--shadow-sm)",
                animationDelay: `${i * 0.08}s`,
              }}
            >
              {/* Avatar strip */}
              <div
                className="h-[400px] flex items-center justify-center text-5xl relative"
                style={{ background: "var(--color-primary)" }}
              >
                <Image src={member.image} alt={member.name} fill />
              </div>

              {/* Content */}
              <div className="p-6 space-y-3">
                <div>
                  <h3
                    className="text-base font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--color-text)",
                    }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-xs font-semibold mt-0.5"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {member.role}
                  </p>
                </div>
             

               
              </div>
            </div>
          ))}
        </div>

        {/* Join team CTA */}
        <div
          className="mt-12 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 about-fade-in"
          style={{
            background: "rgba(30,58,138,0.04)",
            border: "1px solid rgba(30,58,138,0.12)",
          }}
        >
          <div>
            <h3
              className="text-xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text)",
              }}
            >
              Want to join our mission?
            </h3>
            <p className="text-sm mt-1" style={{ color: "var(--color-text-muted)" }}>
              We're always looking for passionate volunteers and changemakers.
            </p>
          </div>
          <a
            href="/donate"
            className="text-sm shrink-0 hover:scale-110 transition-transform duration-300 inline-block"
          >
            Donate →
          </a>
        </div>

      </div>
    </section>
  );
}