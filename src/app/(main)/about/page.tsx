import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./about.module.css";

export const metadata: Metadata = {
  title: "About — TRI-FORT CONSTRUCTION",
  description:
    "Building Kenya's future through precision, transparency, and an unwavering commitment to excellence. Discover the story, values, and leadership behind Trifort Construction.",
};

export default function AboutPage() {
  return (
    <>
      {/* 1. HERO SECTION */}
      <section className={styles.pageHero}>
        <video className={styles.pageHeroBg} autoPlay muted loop playsInline>
          <source src="/images/legacy/website_video.mp4" type="video/mp4" />
        </video>
        <div className={styles.pageHeroOverlay}></div>
        <div className={styles.pageHeroLines}></div>
        <div className={styles.pageHeroContent}>
          <div className={styles.heroEyebrow}>Est. 2020 &middot; Nairobi, Kenya</div>
          <h1>
            About<br />
            <em>TRI-FORT</em>
          </h1>
          <div className={styles.heroDivider}></div>
          <p className={styles.heroDesc}>
            Building Kenya's future through precision, transparency, and an unwavering commitment to excellence.
          </p>
        </div>
      </section>

      {/* 2. STORY SECTION */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.whoGrid}>
            <div className={`reveal from-left ${styles.whoText}`}>
              <div className={styles.sectionLabel}>Who We Are</div>
              <h2 className={styles.sectionTitle}>
                Built on<br />
                <em>Integrity &amp; Craft</em>
              </h2>
              <div className={styles.goldLine}></div>
              <p>
                TRI-FORT CONSTRUCTION was founded in 2020 with a singular vision, to transform how Kenya builds. We set out to create a construction firm where every client has full visibility into their project from the first sketch to the final walk-through.
              </p>
              <p>
                What began as a small team of dedicated builders in Nairobi has grown into one of East Africa's most trusted construction companies. With over 120 completed projects and a track record built on trust, we continue to raise the standard of what great construction looks like.
              </p>
              <p>
                We work across residential, commercial, and industrial sectors bringing the same level of precision and care to a family home as we do to a landmark commercial complex.
              </p>
              <div className={styles.kenyaCallout}>
                <p>
                  &#127472;&#127466; <strong>Proudly Kenyan.</strong> Based in Nairobi, operating across East Africa. We are committed to sustainable building practices that respect our environment and strengthen our communities.
                </p>
              </div>
            </div>

            <div className={`reveal from-right ${styles.whoImages}`}>
              <Image
                src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=60"
                alt="Construction"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className={styles.whoImgMain}
              />
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&auto=format&fit=crop&q=80"
                alt="Team"
                fill
                sizes="(max-width: 768px) 80vw, 40vw"
                className={styles.whoImgSecondary}
              />
              <div className={styles.whoBadge}>
                <span className={styles.num}>120+</span>
                <span className={styles.lbl}>Projects<br />Completed</span>
              </div>
            </div>
          </div>

          <div className={`reveal ${styles.statsRow}`}>
            <div className={styles.statBox}>
              <div className={styles.statNum}>5<span className={styles.statUnit}>+</span></div>
              <div className={styles.statLbl}>Years Experience</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNum}>120<span className={styles.statUnit}>+</span></div>
              <div className={styles.statLbl}>Projects Completed</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNum}>98<span className={styles.statUnit}>%</span></div>
              <div className={styles.statLbl}>Client Satisfaction</div>
            </div>
            <div className={styles.statBox}>
              <div className={styles.statNum}>340<span className={styles.statUnit}>+</span></div>
              <div className={styles.statLbl}>Five-Star Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE VALUES SECTION */}
      <section className={styles.valuesSection}>
        <div className={styles.sectionInner}>
          <div className="reveal text-center flex flex-col items-center">
            <div className={styles.sectionLabel}>What Drives Us</div>
            <h2 className={styles.sectionTitle}>
              Our Core <em>Values</em>
            </h2>
            <div className={styles.goldLine} style={{ margin: "0 auto 0" }}></div>
          </div>

          <div className={styles.valuesGrid}>
            <div className={`reveal delay-1 ${styles.valueCard}`}>
              <Image
                src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80"
                alt="Pioneer"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.valueCardBg}
              />
              <div className={styles.valueCardContent}>
                <span className={styles.valueNum}>01.</span>
                <div className={styles.valueName}>PIONEER</div>
                <p className={styles.valueText}>
                  We are a forward-thinking architecture, engineering, and construction company. Our aim is to build in a way that adds exceptional value to your projects while making a positive impact on people and the environment.
                </p>
              </div>
            </div>
            <div className={`reveal delay-2 ${styles.valueCard}`}>
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80"
                alt="Create"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.valueCardBg}
              />
              <div className={styles.valueCardContent}>
                <span className={styles.valueNum}>02.</span>
                <div className={styles.valueName}>CREATE</div>
                <p className={styles.valueText}>
                  We design with tomorrow in mind sourcing responsibly, reducing waste, and creating structures that exist in harmony with their environment. Our design principles are rooted in cultural context, client needs, cost, and desires. We focus on creating sustainable, eco-friendly designs that deliver functional, beautiful, airy, and well-lit spaces, resulting in durable buildings that our clients will absolutely adore!
                </p>
              </div>
            </div>
            <div className={`reveal delay-3 ${styles.valueCard}`}>
              <Image
                src="https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?w=600&auto=format&fit=crop"
                alt="Build"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.valueCardBg}
              />
              <div className={styles.valueCardContent}>
                <span className={styles.valueNum}>03.</span>
                <div className={styles.valueName}>BUILD</div>
                <p className={styles.valueText}>
                  We don't just build for clients we build with them. Deep collaboration from concept to completion ensures every vision is fully realised. In construction, we strive to deliver high-quality buildings that are both aesthetically pleasing and durable, all while adhering to the client's budget. Our attention to detail ensures that each project not only looks exceptional but also stands the test of time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TIMELINE SECTION */}
      <section className={styles.timelineSection}>
        <div className={styles.sectionInner}>
          <div className="reveal text-center flex flex-col items-center mb-[10px]">
            <div className={styles.sectionLabel}>Our Journey</div>
            <h2 className={styles.sectionTitle}>Milestones That <em>Shaped Us</em></h2>
            <div className={styles.goldLine} style={{ margin: "0 auto" }}></div>
          </div>
        </div>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 40px" }}>
          <div className={styles.timelineWrap}>
            <div className={styles.timelineLine}></div>
            <div className={styles.timelineLineFill} style={{ height: "100%" }}></div>

            <div className={`reveal ${styles.timelineItem} ${styles.left}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2020</div>
                <div className={styles.timelineTitle}>Founded in Nairobi</div>
                <p className={styles.timelineDesc}>
                  TRI-FORT CONSTRUCTION was established in Nairobi by George Khoury with a founding team of six. Our first residential commission was completed within two months on time, on budget, and to the client's delight.
                </p>
              </div>
              <div className={styles.timelineDotWrap}><div className={styles.timelineDot}></div></div>
            </div>

            <div className={`reveal delay-1 ${styles.timelineItem} ${styles.right}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2021</div>
                <div className={styles.timelineTitle}>First Landmark Commercial Project</div>
                <p className={styles.timelineDesc}>
                  Delivered a landmark mixed-use commercial complex in Westlands, Nairobi our first major flagship build, completed on time and under budget. A proof of concept that defined our standard.
                </p>
              </div>
              <div className={styles.timelineDotWrap}><div className={styles.timelineDot}></div></div>
            </div>

            <div className={`reveal delay-2 ${styles.timelineItem} ${styles.left}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2022</div>
                <div className={styles.timelineTitle}>Digital Transparency Platform</div>
                <p className={styles.timelineDesc}>
                  Launched our proprietary client portal, giving every project owner real-time visibility into budgets, timelines, and material procurement setting a new industry benchmark for transparency in construction.
                </p>
              </div>
              <div className={styles.timelineDotWrap}><div className={styles.timelineDot}></div></div>
            </div>

            <div className={`reveal delay-3 ${styles.timelineItem} ${styles.right}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2023</div>
                <div className={styles.timelineTitle}>East African Expansion</div>
                <p className={styles.timelineDesc}>
                  Extended our footprint to Uganda and Tanzania, bringing TRI-FORT's transparent construction model to new markets. Established our sub-contractor partnership programme, connecting local tradespeople to premium projects.
                </p>
              </div>
              <div className={styles.timelineDotWrap}><div className={styles.timelineDot}></div></div>
            </div>

            <div className={`reveal delay-4 ${styles.timelineItem} ${styles.left}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2024</div>
                <div className={styles.timelineTitle}>Sustainability Certification</div>
                <p className={styles.timelineDesc}>
                  Achieved ISO 14001 Environmental Management certification, formalising our commitment to sustainable building. Introduced our green materials sourcing programme, cutting project carbon footprints by 30%.
                </p>
              </div>
              <div className={styles.timelineDotWrap}><div className={styles.timelineDot}></div></div>
            </div>

            <div className={`reveal delay-5 ${styles.timelineItem} ${styles.right}`}>
              <div className={styles.timelineContent}>
                <div className={styles.timelineYear}>2025</div>
                <div className={styles.timelineTitle}>Building the Future</div>
                <p className={styles.timelineDesc}>
                  Now with 120+ completed projects and 340+ five-star reviews, TRI-FORT enters 2025 with ambitious plans including a new innovation lab focused on sustainable materials and digital project transparency tools.
                </p>
              </div>
              <div className={styles.timelineDotWrap}><div className={styles.timelineDot}></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. QUOTE SECTION */}
      <section className={styles.quoteBand}>
        <div className={styles.quoteMark}>&ldquo;</div>
        <p className={styles.quoteText}>
          &ldquo;We do not merely construct buildings. We craft the environments in which lives unfold, businesses flourish, and legacies endure.&rdquo;
        </p>
        <div className={styles.quoteAuthor}>— George Khoury, Founder &amp; Chairman</div>
      </section>

      {/* 7. LEADERSHIP SECTION */}
      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className="reveal">
            <div className={styles.sectionLabel}>The People Behind the Projects</div>
            <h2 className={styles.sectionTitle}>Our <em>Leadership</em></h2>
            <div className={styles.goldLine}></div>
          </div>

          <div className={styles.teamGrid}>
            <div className={`reveal delay-1 ${styles.teamCard}`}>
              <div className={styles.teamImgWrap}>
                <Image
                  src="/team/fortune.jpeg"
                  alt="FORTUNE"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className={styles.teamOverlay}></div>
              </div>
              <div className={styles.teamInfo}>
                <div className={styles.teamName}>Fortune Koome</div>
                <div className={styles.teamRole}>Co-Founder &amp; Architectural Designer , Contractor </div>
                <p className={styles.teamBio}>
                  With over six years of experience in the construction industry, Fortune specializes in turning ideas into well-crafted spaces through thoughtful design and quality construction. As the founder, he leads projects from concepts to completion, combining architectural creativity with practical execution to deliver residential, commercial and hospilitalty developments that are functional, timeless and built to last
                </p>
              </div>
            </div>

            <div className={`reveal delay-2 ${styles.teamCard}`}>
              <div className={styles.teamImgWrap}>
                <Image
                  src="/team/mark.png"
                  alt="MARK"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className={styles.teamOverlay}></div>
              </div>
              <div className={styles.teamInfo}>
                <div className={styles.teamName}>Mark Kabugi</div>
                <div className={styles.teamRole}>Co-Founder &amp; Structural Engineer , Project Manager </div>
                <p className={styles.teamBio}>
                  As a Structural Designer and Project Manager at Tri-Fort Construction, Mark Kabugi combines technical expertise with practical project leadership to deliver safe, efficient, and innovative building solutions. He specializes in structural design, project planning, coordination, and execution, ensuring every project meets the highest standards of quality, functionality, and client satisfaction from concept to completion.
                </p>
              </div>
            </div>

            <div className={`reveal delay-3 ${styles.teamCard}`}>
              <div className={styles.teamImgWrap}>
                <Image
                  src="/team/DJAMILLA.jpeg"
                  alt="DJAMILLA"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div className={styles.teamOverlay}></div>
              </div>
              <div className={styles.teamInfo}>
                <div className={styles.teamName}>Djamilla Ndohvu</div>
                <div className={styles.teamRole}>Head of Interior Design</div>
                <p className={styles.teamBio}>
                  With over six years of experience in the construction industry, Djamilla specializes in turning spaces into thoughtfully designed environments through texture, material, and detail. As Co-Director, she leads interiors from concept to completion, combining creative vision with practical execution to deliver residential, commercial, and hospitality spaces that are functional, timeless, and built to last.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA SECTION */}
      <section className={styles.ctaBand}>
        <h2>
          Ready to Build <em>Something Great?</em>
        </h2>
        <p>
          Tell us about your project and let's create something that lasts generations. We bring precision, transparency, and integrity to every build.
        </p>
        <Link href="/contact" className={styles.ctaBtn}>
          Start Your Project
        </Link>
      </section>
    </>
  );
}
