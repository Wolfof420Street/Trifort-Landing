import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import CountUp from "@/components/ui/CountUp";

export const metadata = {
  title: "Trifort Construction | Transparency Through Builds",
  description: "Leading construction company in Kenya specializing in residential homes, commercial buildings, renovations, and project management.",
};

export default function Home() {
  return (
    <>
<section className={styles.hero}>
    <div className={styles['hero-bg']}>
        <div className={styles['hero-bg-img']}></div>
        <div className={styles['hero-overlay']}></div>
        <div className={styles['hero-diagonal-lines']}></div>
    </div>
    <div className={styles['hero-panel']}></div>
    <div className={styles['hero-content']}>
        <p className={styles['hero-eyebrow']}>Est. 2020 · Nairobi, Kenya</p>
        <h1 className={styles['hero-title']}>
            <em>Art of</em>
            <strong>Construction</strong>
        </h1>
        <div className={styles['hero-divider']}>
            <div className={styles['hero-divider-line']}></div>
            <span className={styles['hero-divider-text']}>Transparency Through Builds</span>
        </div>
        <p className={styles['hero-desc']}>We craft landmark buildings and residences that blend timeless craftsmanship with modern precision
            built to endure generations.</p>
        <div className={styles['hero-actions']}>
            <Link href="/projects" className={styles['btn-primary']}><span>View Our Work</span></Link>
            <Link href="/contact#QFORM" className={styles['btn-ghost']}>Get a Quote <i className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
    <div className={styles['hero-stats']}>
        <div className={styles['hero-stat']}>
            <div className={styles['hero-stat-num']}>5<sup >+</sup></div>
            <div className={styles['hero-stat-label']}>Years Strong</div>
        </div>
        <div className={styles['hero-stat']}>
            <div className={styles['hero-stat-num']}>120<sup >+</sup></div>
            <div className={styles['hero-stat-label']}>Projects</div>
        </div>
        <div className={styles['hero-stat']}>
            <div className={styles['hero-stat-num']}>98<sup >%</sup></div>
            <div className={styles['hero-stat-label']}>Client Satisfaction</div>
        </div>
        <div className={styles['hero-stat']}>
            <div className={styles['hero-stat-num']}>340<sup >+</sup></div>
            <div className={styles['hero-stat-label']}>5-Star Reviews</div>
        </div>
    </div>
    
</section>


<div className={styles['intro-strip']}>
    <div className={styles['intro-strip-inner']}>
        <div className={`${styles['intro-strip-item']} reveal`}>
            <div className={styles['intro-strip-icon']}><span>01.</span></div>
            <div className={styles['intro-strip-text']}><strong>Residential</strong><span>Luxury villas &amp; homes</span></div>
        </div>
        <div className={`${styles['intro-strip-item']} reveal reveal-delay-1`}>
            <div className={styles['intro-strip-icon']}><span>02.</span></div>
            <div className={styles['intro-strip-text']}><strong>Commercial</strong><span>Offices &amp; mixed-use</span></div>
        </div>
        <div className={`${styles['intro-strip-item']} reveal reveal-delay-2`}>
            <div className={styles['intro-strip-icon']}><span>03.</span></div>
            <div className={styles['intro-strip-text']}><strong>Industrial</strong><span>Warehouses &amp; facilities</span></div>
        </div>
        <div className={`${styles['intro-strip-item']} reveal reveal-delay-3`}>
            <div className={styles['intro-strip-icon']}><span>04.</span></div>
            <div className={styles['intro-strip-text']}><strong>Restoration</strong><span>Heritage &amp; renovation</span></div>
        </div>
    </div>
</div>


<section className={styles['mosaic-section']}>
    <div className={styles['mosaic-header']}>
        <span className={`${styles['section-tag']} reveal`}>Our Portfolio</span>
        <h2 className={`${styles['section-title']} reveal reveal-delay-1`}>Built With Purpose,<br />Crafted With Precision</h2>
        <div className={`${styles['gold-rule']} reveal reveal-delay-2`} ></div>
    </div>
    <div className={styles['mosaic-grid']}>
        <div className={`${styles['mosaic-cell']} ${styles['main-cell']} reveal from-left`}
             data-img="https://i1-e.pinimg.com/1200x/78/fd/58/78fd583ae5d4f263d97e5887edb1b149.jpg"
             data-label="Commercial · Nairobi" data-title="Emerald Bank Tower">
            <img src="https://i1-e.pinimg.com/1200x/78/fd/58/78fd583ae5d4f263d97e5887edb1b149.jpg" alt="Emerald Bank Tower" loading="lazy" />
            <div className={styles['mosaic-label']}><span>Commercial · Nairobi</span><h4>Emerald Tower</h4></div>
        </div>
        <div className={`${styles['mosaic-cell']} reveal reveal-delay-1`}
             data-img="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80"
             data-label="Residential · Karen" data-title="Golden Residence">
            <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80" alt="Golden Residence" loading="lazy" />
            <div className={styles['mosaic-label']}><span>Residential · Karen</span><h4>Golden Residence</h4></div>
        </div>
        <div className={`${styles['mosaic-cell']} reveal reveal-delay-2`}
             data-img="/images/legacy/Hospital_paramedics.jpeg"
             data-label="Mixed-use · Westlands" data-title="Sapphire Hospital Plaza">
            <img src="/images/legacy/Hospital_paramedics.jpeg" alt="Sapphire Plaza" loading="lazy" />
            <div className={styles['mosaic-label']}><span>Mixed-use · Westlands</span><h4>Sapphire Hospital Plaza</h4></div>
        </div>
        <div className={`${styles['mosaic-cell']} reveal reveal-delay-3`}
             data-img="/images/legacy/Pin_on_Healthcare_Designs.jpeg"
             data-label="Sapphire · Athi River" data-title="Hospital">
            <img src="/images/legacy/Pin_on_Healthcare_Designs.jpeg" alt="Hospital" loading="lazy" />
            <div className={styles['mosaic-label']}><span>Sapphire · Athi River</span><h4>Hospital</h4></div>
        </div>
        <div className={`${styles['mosaic-cell']} reveal reveal-delay-4`}
             data-img="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80"
             data-label="Restoration · Mombasa" data-title="Heritage Hall">
            <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80" alt="Heritage Hall" loading="lazy" />
            <div className={styles['mosaic-label']}><span>Restoration · Mombasa</span><h4>Heritage Hall</h4></div>
        </div>
    </div>
    <div >
        <Link href="/projects" className={`${styles['btn-emerald']} reveal`}>All Projects <i className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
    </div>
</section>


<section >
    <div className={styles['about-teaser']}>
        <div className={`${styles['about-visual']} reveal from-left`}>
            <img src="/images/legacy/WhatsApp_Image_2026-06-09_at_7.35.18_PM.jpeg" alt="TRI-FORT Construction site" className={styles['about-img-main']} />
            <img src="/images/legacy/WhatsApp_Image_2026-06-09_at_7.35.42_PM.jpeg" alt="Construction detail" className={styles['about-img-secondary']} />
            <div className={styles['about-badge']}>
                <div className={styles.num}>5</div>
                <div className={styles.lbl}>Years of<br />Excellence</div>
            </div>
        </div>
        <div className={styles['about-text']}>
            <span className={`${styles['section-tag']} reveal`}>Our Story</span>
            <h2 className={`${styles['section-title']} reveal reveal-delay-1`}>A Legacy Built<br />on Integrity</h2>
            <div className={`${styles['gold-rule']} reveal reveal-delay-2`}></div>
            <p className={`reveal reveal-delay-2`}>TRI-FORT CONSTRUCTION is a Nairobi-based firm founded in 2020,
                 built on a core promise: <em>Transparency Through Builds.</em> We believe every client deserves complete visibility
                  into their project from the first sketch to the final handover.We are a multi- disciplinary architecture and design
                   practice offering a combination of design expertise across a diverse typology of projects. Areas of expertise
               include Architecture, Interior Design, Project Management Urban and Master Planning. Thiscombined with resources in
                engineering services enables Tri-fort to ensure high-quality, innovative andfunctional solutions are delivered on time
                 and withinbudget.</p>
          
                 <p className={`reveal reveal-delay-3`}>The design process is propelled by extensive research,
                                            site and cultural context. It is inspired by innovative and
                                        vernacular methods of construction and use of
                                        indigenous local materials and arts and crafts, while
                                        evolving steadily within the parameters of sustainable
                                           design principles.</p>
            <div className={`${styles['about-pillars']} reveal reveal-delay-3`}>
                <div className={styles['about-pillar']}>
                    <div className={styles['about-pillar-icon']}>1.</div>
                    <div>
                        <h4>Transparent</h4>
                        <p>Full visibility at every stage</p>
                    </div>
                </div>
                <div className={styles['about-pillar']}>
                    <div className={styles['about-pillar-icon']}>2.</div>
                    <div>
                        <h4>Quality First</h4>
                        <p>Zero-compromise standards</p>
                    </div>
                </div>
                <div className={styles['about-pillar']}>
                    <div className={styles['about-pillar-icon']}>3.</div>
                    <div>
                        <h4>On Schedule</h4>
                        <p>Delivering on our promises</p>
                    </div>
                </div>
                <div className={styles['about-pillar']}>
                    <div className={styles['about-pillar-icon']}>4.</div>
                    <div>
                        <h4>Sustainable</h4>
                        <p>Building for tomorrow</p>
                    </div>
                </div>
            </div>
            <Link href="/about" className={`${styles['btn-emerald']} reveal reveal-delay-4`}>Discover Our Story <i className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
</section>


<section className={styles['services-section']}>
    <div className={styles['services-inner']}>
        <div className={styles['services-header']}>
            <div>
                <span className={`${styles['section-tag']} reveal`}>What We Build</span>
                <h2 className={`${styles['section-title']} reveal reveal-delay-1`}>Our Services</h2>
            </div>
            <Link href="/contact" className={`${styles['btn-gold']} reveal`}>Start a Project <i className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
        <div className={styles['services-grid']}>
            <div className={`${styles['service-card']} reveal reveal-delay-1`}>
                <div className={styles['service-num']}>01</div>
                <h3 className={styles['service-title']}>Residential</h3>
                <p className={styles['service-desc']}>From intimate family homes to grand luxury villas, we build residences that reflect the
                     aspirations of the people who live in them.</p>
            </div>
            <div className={`${styles['service-card']} reveal reveal-delay-2`}>
                <div className={styles['service-num']}>02</div>
                <h3 className={styles['service-title']}>Commercial</h3>
                <p className={styles['service-desc']}>Office towers, retail centres, and mixed-use developments designed to enhance productivity
                     and leave a lasting impression.</p>
            </div>
            <div className={`${styles['service-card']} reveal reveal-delay-3`}>
                <div className={styles['service-num']}>03</div>
                <h3 className={styles['service-title']}>Industrial</h3>
                <p className={styles['service-desc']}>Purpose-built warehouses, manufacturing facilities, and logistics hubs engineered for efficiency
                     and long-term performance.</p>
            </div>
            <div className={`${styles['service-card']} reveal reveal-delay-4`}>
                <div className={styles['service-num']}>04</div>
                <h3 className={styles['service-title']}>Restoration</h3>
                <p className={styles['service-desc']}>Breathing new life into heritage structures with meticulous care preserving history while
                     meeting the demands of modern use.</p>
            </div>
        </div>
    </div>
</section>


<div className={styles['stats-band']}>
    <div className={styles['stats-band-inner']}>
        <div className={`${styles['stat-item']} reveal`}>
            <div className={styles['stat-num']}>5<sup>+</sup></div>
            <div className={styles['stat-label']}>Years of Experience</div>
        </div>
        <div className={`${styles['stat-item']} reveal reveal-delay-1`}>
            <div className={styles['stat-num']}>120<sup>+</sup></div>
            <div className={styles['stat-label']}>Projects Completed</div>
        </div>
        <div className={`${styles['stat-item']} reveal reveal-delay-2`}>
            <div className={styles['stat-num']}>98<sup>%</sup></div>
            <div className={styles['stat-label']}>Client Satisfaction</div>
        </div>
        <div className={`${styles['stat-item']} reveal reveal-delay-3`}>
            <div className={styles['stat-num']}>340<sup>+</sup></div>
            <div className={styles['stat-label']}>5-Star Reviews</div>
        </div>
    </div>
</div>


<section className={styles['process-section']}>
    <div className={styles['process-header']}>
        <span className={`${styles['section-tag']} reveal`}>How We Work</span>
        <h2 className={`${styles['section-title']} reveal reveal-delay-1`}>Our Process</h2>
        <div className={`${styles['gold-rule']} reveal reveal-delay-2`} ></div>
    </div>
    <div className={styles['process-steps']}>
        <div className={`${styles['process-step']} reveal reveal-delay-1`}>
            <div className={styles['step-circle']}><span>01</span></div>
            <h3 className={styles['step-title']}>Consultation</h3>
            <p className={styles['step-desc']}>We begin with a deep listening session understanding your vision, budget, timeline, 
                and the life you want to build inside these walls.</p>
        </div>
        <div className={`${styles['process-step']} reveal reveal-delay-2`}>
            <div className={styles['step-circle']}><span>02</span></div>
            <h3 className={styles['step-title']}>Design &amp; Planning</h3>
            <p className={styles['step-desc']}>Our architects translate vision into precise technical drawings, material selections, and a detailed 
                project programme.</p>
        </div>
        <div className={`${styles['process-step']} reveal reveal-delay-3`}>
            <div className={styles['step-circle']}><span>03</span></div>
            <h3 className={styles['step-title']}>Construction</h3>
            <p className={styles['step-desc']}>Skilled craftsmen and site managers execute every element with rigorous quality control,
                 regular reporting, and transparent communication.</p>
        </div>
        <div className={`${styles['process-step']} reveal reveal-delay-4`}>
            <div className={styles['step-circle']}><span>04</span></div>
            <h3 className={styles['step-title']}>Handover</h3>
            <p className={styles['step-desc']}>We deliver a complete, snagging-free project — with full documentation, warranties,
                 and ongoing aftercare support.</p>
        </div>
    </div>
</section>


<section className={styles['testimonial-section']}>
    <div className={styles['testimonials-header']}>
        <span className={`${styles['section-tag']} reveal`}>Client Words</span>
        <h2 className={`${styles['section-title']} reveal reveal-delay-1`}>What Our Clients Say</h2>
        <div className={`${styles['gold-rule']} reveal reveal-delay-2`} ></div>
    </div>
    <div className={styles['testimonials-grid']}>
        <div className={`${styles['testimonial-card']} reveal reveal-delay-1`}>
            <div className={styles['t-stars']}>★★★★★</div>
            <p className={styles['t-text']}>TRI-FORT delivered our villa project three weeks ahead of schedule without compromising a single detail. Truly exceptional work and complete transparency throughout.</p>
            <div className={styles['t-author']}>
                <div className={styles['t-avatar']}>AK</div>
                <div>
                    <div className={styles['t-name']}>Ahmed Al-Kaabi</div>
                    <div className={styles['t-role']}>Villa Owner · Nairobi</div>
                </div>
            </div>
        </div>
        <div className={`${styles['testimonial-card']} reveal reveal-delay-2`}>
            <div className={styles['t-stars']}>★★★★★</div>
            <p className={styles['t-text']}>The level of craftsmanship and attention to detail was beyond anything I expected.
                 Our office building is a testament to their artistry and professionalism.</p>
            <div className={styles['t-author']}>
                <div className={styles['t-avatar']}>SR</div>
                <div>
                    <div className={styles['t-name']}>Sarah Reynolds</div>
                    <div className={styles['t-role']}>CEO · Meridian Group</div>
                </div>
            </div>
        </div>
        <div className={`${styles['testimonial-card']} reveal reveal-delay-3`}>
            <div className={styles['t-stars']}>★★★★★</div>
            <p className={styles['t-text']}>From first consultation to final handover, TRI-FORT were professional, communicative,
                 and delivered a landmark we are immensely proud of.</p>
            <div className={styles['t-author']}>
                <div className={styles['t-avatar']}>MN</div>
                <div>
                    <div className={styles['t-name']}>Marco Negretti</div>
                    <div className={styles['t-role']}>Developer · Westlands</div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className={styles['cta-band']}>
    <div className={styles['cta-inner']}>
        <span className={`${styles['cta-tag']} reveal`}>Ready to Build?</span>
        <h2 className={`${styles['cta-title']} reveal reveal-delay-1`}>
            Let's Create Something<br /><em>Extraordinary</em>
        </h2>
        <p className={`${styles['cta-desc']} reveal reveal-delay-2`}>Tell us about your project and let's begin building your vision together. 
            Transparency guaranteed from day one.</p>
        <Link href="/contact#QFORM" className={`${styles['btn-gold']} reveal reveal-delay-3`}>
            
            <i className={`${styles.fas} ${styles['fa-paper-plane']}`}></i> Get Your Free Quote
        </Link>
    </div>
</section>



    </>
  );
}
