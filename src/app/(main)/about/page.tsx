import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Compass, Hammer, ShieldCheck } from "lucide-react";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About Us | Trifort Construction",
  description:
    "Building Kenya's future through precision, transparency, and an unwavering commitment to excellence. Discover the story, values, and leadership behind Trifort Construction.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className={styles.hero}>
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000&auto=format&fit=crop"
          alt="Trifort Construction project site"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={`reveal ${styles.eyebrow}`}>
            Est. 2020 &middot; Nairobi, Kenya
          </div>
          <h1 className={`reveal reveal-delay-1 ${styles.title}`}>
            About<br />
            <em>TRI-FORT</em>
          </h1>
          <div className={`reveal reveal-delay-2 ${styles.divider}`}></div>
          <p className={`reveal reveal-delay-3 ${styles.desc}`}>
            Building Kenya's future through precision, transparency, and an unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section className={styles.storySection}>
        <div className="section-inner">
          <div className={styles.storyGrid}>
            <div className={`reveal from-left ${styles.storyText}`}>
              <div className="section-tag">Who We Are</div>
              <h2 className="section-title">
                Built on<br />
                <em>Integrity &amp; Craft</em>
              </h2>
              <div className="gold-rule"></div>
              <p>
                TRI-FORT CONSTRUCTION was founded in 2020 with a singular vision: to transform how Kenya builds. We set out to create a construction firm where every client has full visibility into their project from the first sketch to the final walk-through.
              </p>
              <p>
                What began as a small team of dedicated builders in Nairobi has grown into one of East Africa's most trusted construction companies. With over 120 completed projects and a track record built on trust, we continue to raise the standard of what great construction looks like.
              </p>
              <div
                className="reveal"
                style={{
                  background: "var(--emerald)",
                  color: "white",
                  padding: "24px 28px",
                  borderLeft: "4px solid var(--gold)",
                  marginTop: "32px",
                  borderRadius: "2px",
                }}
              >
                <p style={{ margin: 0, fontSize: "0.9rem", color: "rgba(255,255,255,0.85)", lineHeight: "1.7" }}>
                  &#127472;&#127466; <strong>Proudly Kenyan.</strong> Based in Nairobi, operating across East Africa. We are committed to sustainable building practices that respect our environment and strengthen our communities.
                </p>
              </div>
            </div>

            <div className={`reveal from-right ${styles.storyImages}`}>
              <div className={styles.imgMain}>
                <Image
                  src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop&q=80"
                  alt="Construction team at site"
                  fill
                  className="object-cover"
                />
              </div>
              <div className={styles.imgSecondary}>
                <Image
                  src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&auto=format&fit=crop&q=80"
                  alt="Architectural planning"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Optional clean badge instead of the legacy huge floating number */}
              <div style={{
                position: "absolute",
                top: "55%",
                right: "-20px",
                background: "var(--gold)",
                color: "white",
                padding: "20px 24px",
                boxShadow: "0 10px 40px rgba(200,112,26,0.3)",
                borderRadius: "2px",
                textAlign: "center"
              }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: "600", display: "block", lineHeight: "1" }}>120+</span>
                <span style={{ fontSize: "0.6rem", letterSpacing: "2px", textTransform: "uppercase", fontWeight: "500" }}>Projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATS SECTION */}
      <section className={styles.statsBand}>
        <div className="section-inner">
          <div className={`reveal ${styles.statsGrid}`}>
            <div className={styles.statItem}>
              <div className={styles.statNum}>5<sup style={{ color: "var(--gold)" }}>+</sup></div>
              <div className={styles.statLabel}>Years Experience</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNum}>120<sup style={{ color: "var(--gold)" }}>+</sup></div>
              <div className={styles.statLabel}>Projects Completed</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNum}>98<sup style={{ color: "var(--gold)" }}>%</sup></div>
              <div className={styles.statLabel}>Client Satisfaction</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNum}>340<sup style={{ color: "var(--gold)" }}>+</sup></div>
              <div className={styles.statLabel}>Five-Star Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className={styles.valuesSection}>
        <div className="section-inner">
          <div className="reveal text-center flex flex-col items-center">
            <div className="section-tag" style={{ color: "var(--gold-light)" }}>What Drives Us</div>
            <h2 className="section-title" style={{ color: "white" }}>
              Our Core <em>Values</em>
            </h2>
            <div className="gold-rule"></div>
          </div>

          <div className={styles.valuesGrid}>
            <div className={`reveal scale-in reveal-delay-1 ${styles.valueCard}`}>
              <div className={styles.valueIcon}><Compass size={40} strokeWidth={1.5} /></div>
              <h3 className={styles.valueName}>PIONEER</h3>
              <p className={styles.valueText}>
                We are a forward-thinking architecture, engineering, and construction company. Our aim is to build in a way that adds exceptional value to your projects while making a positive impact on people and the environment.
              </p>
            </div>
            <div className={`reveal scale-in reveal-delay-2 ${styles.valueCard}`}>
              <div className={styles.valueIcon}><Hammer size={40} strokeWidth={1.5} /></div>
              <h3 className={styles.valueName}>CREATE</h3>
              <p className={styles.valueText}>
                We design with tomorrow in mind: sourcing responsibly, reducing waste, and creating structures that exist in harmony. We focus on creating sustainable, eco-friendly designs that deliver beautiful spaces.
              </p>
            </div>
            <div className={`reveal scale-in reveal-delay-3 ${styles.valueCard}`}>
              <div className={styles.valueIcon}><ShieldCheck size={40} strokeWidth={1.5} /></div>
              <h3 className={styles.valueName}>BUILD</h3>
              <p className={styles.valueText}>
                We don't just build for clients; we build with them. Deep collaboration from concept to completion ensures every vision is fully realized. We strive to deliver high-quality buildings that stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TIMELINE SECTION */}
      <section className={styles.timelineSection}>
        <div className="section-inner">
          <div className="reveal text-center flex flex-col items-center">
            <div className="section-tag">Our Journey</div>
            <h2 className="section-title">Milestones That <em>Shaped Us</em></h2>
            <div className="gold-rule"></div>
          </div>

          <div className={styles.timelineWrap}>
            <div className={`reveal from-left ${styles.timelineItem}`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2020</div>
              <h4 className={styles.timelineTitle}>Founded in Nairobi</h4>
              <p className={styles.timelineDesc}>
                TRI-FORT CONSTRUCTION was established in Nairobi with a founding team of six. Our first residential commission was completed within two months: on time, on budget, and to the client's delight.
              </p>
            </div>

            <div className={`reveal from-left ${styles.timelineItem}`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2021</div>
              <h4 className={styles.timelineTitle}>First Landmark Commercial Project</h4>
              <p className={styles.timelineDesc}>
                Delivered a landmark mixed-use commercial complex in Westlands, Nairobi. This was our first major flagship build, completed on time and under budget, setting the standard for our future operations.
              </p>
            </div>

            <div className={`reveal from-left ${styles.timelineItem}`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2023</div>
              <h4 className={styles.timelineTitle}>Digital Transparency & Expansion</h4>
              <p className={styles.timelineDesc}>
                Launched our proprietary client portal to give every project owner real-time visibility into budgets and timelines. Simultaneously, we extended our footprint to Uganda and Tanzania.
              </p>
            </div>

            <div className={`reveal from-left ${styles.timelineItem}`}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineYear}>2025</div>
              <h4 className={styles.timelineTitle}>Building the Future</h4>
              <p className={styles.timelineDesc}>
                Now with 120+ completed projects and a growing team, TRI-FORT continues to pioneer sustainable materials and digital project transparency tools for the next generation of East African construction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LEADERSHIP SECTION */}
      <section className={styles.teamSection}>
        <div className="section-inner">
          <div className="reveal text-center flex flex-col items-center">
            <div className="section-tag">The People Behind the Projects</div>
            <h2 className="section-title">Our <em>Leadership</em></h2>
            <div className="gold-rule"></div>
          </div>

          <div className={styles.teamGrid}>
            <div className={`reveal scale-in reveal-delay-1 ${styles.teamCard}`}>
              <div className={styles.teamImgWrap}>
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=80"
                  alt="Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className={styles.teamInfo}>
                <h4 className={styles.teamName}>B. Khoury</h4>
                <div className={styles.teamRole}>Founder &amp; Chairman</div>
                <p className={styles.teamBio}>
                  With 25 years in the construction industry across Africa and the Middle East, B. founded TRI-FORT on the belief that great building is inseparable from great trust.
                </p>
              </div>
            </div>

            <div className={`reveal scale-in reveal-delay-2 ${styles.teamCard}`}>
              <div className={styles.teamImgWrap}>
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80"
                  alt="CEO"
                  fill
                  className="object-cover"
                />
              </div>
              <div className={styles.teamInfo}>
                <h4 className={styles.teamName}>Fortune Koome</h4>
                <div className={styles.teamRole}>Co-Founder &amp; Architectural Designer , Contractor </div>
                <p className={styles.teamBio}>
                  With over six years of experience in the construction industry, Fortune specializes in turning ideas into well-crafted spaces through thoughtful design and quality construction. As the founder,
                  he leads projects from concepts to completion,  combining architectural creativity with practical execution to deliver residential, commercial and hospilitalty developments that are functional, timeless and built to last
                </p>
              </div>
            </div>

            <div className={`reveal scale-in reveal-delay-3 ${styles.teamCard}`}>
              <div className={styles.teamImgWrap}>
                <Image
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80"
                  alt="Head of Construction"
                  fill
                  className="object-cover"
                />
              </div>
              <div className={styles.teamInfo}>
                <h4 className={styles.teamName}>Mark Kabugi</h4>
                <div className={styles.teamRole}>Co-Founder &amp; Structural Engineer , Project Manager </div>
                <p className={styles.teamBio}>
                  As a Structural Designer and Project Manager at Tri-Fort  Construction, Mark Kabugi combines technical expertise with practical project leadership to deliver safe, efficient, and innovative building solutions. He specializes in structural design, project planning, coordination, and execution, ensuring every project meets the highest standards of quality, functionality, and client satisfaction from concept to completion.     </p>
              </div>
            </div>
            
            <div className={`reveal scale-in reveal-delay-4 ${styles.teamCard}`}>
              <div className={styles.teamImgWrap}>
                <Image
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&auto=format&fit=crop&q=80"
                  alt="Head of Interior Design"
                  fill
                  className="object-cover"
                />
              </div>
              <div className={styles.teamInfo}>
                <h4 className={styles.teamName}>Djamila Ndlovu</h4>
                <div className={styles.teamRole}>Head of Interior Design</div>
                <p className={styles.teamBio}>
                
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA SECTION */}
      <section className={styles.ctaBand}>
        <div className="reveal">
          <h2 className={styles.ctaTitle}>
            Ready to Build <em>Something Great?</em>
          </h2>
          <p className={styles.ctaDesc}>
            Tell us about your project and let's create something that lasts generations. We bring precision, transparency, and integrity to every build.
          </p>
          <Link href="/contact" className="btn-primary">
            Start Your Project
          </Link>
        </div>
      </section>
    </>
  );
}
