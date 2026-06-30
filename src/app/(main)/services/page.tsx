import Link from "next/link";
import styles from "./services.module.css";

import "./services.css";

export const metadata = {
  title: "Services | Trifort Construction",
  description: "Explore our comprehensive construction, renovation, and project management services.",
};

export default function ServicesPage() {
  return (
    <div id="services-page">
      












<section id="home" className={styles.hero}>
    
    <div className={styles['hero-slideshow']} id="heroSlideshow">
        <div  className={`${styles['hero-slide']} ${styles.active}`}></div>
        <div  className={styles['hero-slide']}></div>
        <div  className={styles['hero-slide']}></div>
        <div  className={styles['hero-slide']}></div>
        <div  className={styles['hero-slide']}></div>
    </div>
    <div id="heroParticles" className={styles['luxury-particles']}></div>
    <div className={styles['hero-overlay']}></div>
    <div className={styles['hero-grain']}></div>

    <div className={styles['hero-content']}>
        <p className={`${styles['hero-eyebrow']} ${styles.animate__animated} ${styles.animate__fadeInDown} ${styles['animate__delay-1s']}`}>Est. 2020 · Nairobi, Kenya</p>
        <div className={styles['hero-title']}>
            <em  className={`${styles.animate__animated} ${styles.animate__fadeInUp}`}>Excellence In</em>
            <strong  className={`${styles.animate__animated} ${styles.animate__fadeInUp}`}>Every Build</strong>
        </div>
        <p  className={`${styles['hero-desc']} ${styles.animate__animated} ${styles.animate__fadeInUp}`}>
            From luxury residential estates to landmark commercial towers  TRI-FORT delivers construction services that exceed every 
            standard, on time, on budget, with full transparency.
        </p>
        <div  className={`${styles['hero-actions']} ${styles.animate__animated} ${styles.animate__fadeInUp}`}>
            <Link href="/contact#QFORM" className={styles['btn-primary']}>Get a Free Quote <i  className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
            <Link href="/projects" className={styles['btn-ghost']}><i className={`${styles.fas} ${styles['fa-play-circle']}`}></i> View Portfolio</Link>
        </div>
    </div>

   
</section>


<div className={styles['intro-band']}>
    <div className={styles['intro-band-inner']}>
        <div className={`${styles['intro-item']} reveal`}>
            <div className={styles['intro-item-num']}>6</div>
            <div className={styles['intro-item-title']}>Core Services</div>
            <div className={styles['intro-item-desc']}>Comprehensive construction capabilities under one roof from concept to completion.</div>
        </div>
        <div className={styles['intro-divider']}></div>
        <div className={`${styles['intro-item']} reveal reveal-delay-2`}>
            <div className={styles['intro-item-num']}>120+</div>
            <div className={styles['intro-item-title']}>Projects Delivered</div>
            <div className={styles['intro-item-desc']}>A proven track record across Kenya's most prestigious residential and commercial builds.</div>
        </div>
        <div className={styles['intro-divider']}></div>
        <div className={`${styles['intro-item']} reveal reveal-delay-4`}>
            <div className={styles['intro-item-num']}>5</div>
            <div className={styles['intro-item-title']}>Years of Mastery</div>
            <div className={styles['intro-item-desc']}>Half a decade of building Kenya's skyline with precision, speed and unwavering quality.</div>
        </div>
    </div>
</div>


<div id="residential">
    <div className={styles['service-block']}>
        <div className={`${styles['svc-visual']} reveal from-left`}>
            <div className={styles['svc-badge']}><span className={styles.num}>01</span><span className={styles.lbl}>Service</span></div>
            <img className={styles['svc-img-main']} src="/images/legacy/contractor.jpeg" alt="Luxury Residential Construction" />
            <img className={styles['svc-img-accent']} src="/images/legacy/kanal.jpeg" alt="Interior Detail" />
            <div className={styles['svc-gold-bar']}></div>
        </div>
        <div className={`${styles['svc-text']} reveal`}>
            <span className={styles['section-tag']}>Residential</span>
            <h2 className={styles['svc-title']}>Luxury Homes &amp; Private Estates</h2>
            <p className={styles['svc-desc']}>We design and build residential spaces that are an extension of your identity from intimate family 
                homes tucked into lush Nairobi suburbs to sprawling multi-acre private estates that redefine luxury living in East Africa.</p>
            <p className={styles['svc-desc']}>Every residence is engineered to last generations. We source premium materials, employ master craftsmen, 
                and maintain total cost transparency throughout so you always know exactly where your investment goes.</p>
            <div className={styles['svc-features']}>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Custom villa &amp; bungalow design</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Gated estate &amp; compound builds</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Smart home integration</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Premium material sourcing</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Landscaping &amp; exterior works</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Full transparency reporting</span></div>
            </div>
            <Link href="/contact" className={styles['btn-primary']}>Enquire About Residential <i  className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
</div>


<div id="commercial" >
    <div className={`${styles['service-block']} ${styles.reverse}`}>
        <div className={`${styles['svc-visual']} reveal from-right`}>
            <div className={styles['svc-badge']}><span className={styles.num}>02</span><span className={styles.lbl}>Service</span></div>
            <img className={styles['svc-img-main']} src="/images/legacy/WhatsApp_Image_2026-05-21_at_10.20.03_AM.jpeg" alt="Commercial Construction" />
            <img className={styles['svc-img-accent']} src="/images/legacy/Pin_on_Healthcare_Designs.jpeg" alt="Commercial Interior" />
            <div className={styles['svc-gold-bar']}></div>
        </div>
        <div className={`${styles['svc-text']} reveal`}>
            <span className={styles['section-tag']}>Commercial</span>
            <h2 className={styles['svc-title']}>Offices, Retail &amp; Mixed-Use</h2>
            <p className={styles['svc-desc']}>Commercial spaces must perform  financially, operationally, and aesthetically. 
                TRI-FORT builds offices, retail centres, and mixed-use developments that attract tenants, inspire productivity, 
                and deliver long-term ROI to investors.</p>
            <p className={styles['svc-desc']}>From boutique headquarters to large-scale commercial complexes, we bring the same precision and 
                transparency to every commercial project we undertake across Kenya and East Africa.</p>
            <div className={styles['svc-features']}>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Commercial construction</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Retail &amp; shopping centre builds</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Mixed-use  development</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Hospitality &amp; hotel construction</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>MEP systems integration</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span> Institutional Construction</span></div>
            </div>
            <Link href="/contact#QFORM" className={styles['btn-primary']}>Discuss Your Commercial Project <i  className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
</div>


<div id="industrial">
    <div className={styles['service-block']}>
        <div className={`${styles['svc-visual']} reveal from-left`}>
            <div className={styles['svc-badge']}><span className={styles.num}>03</span><span className={styles.lbl}>Service</span></div>
            <img className={styles['svc-img-main']} src="/images/legacy/warehouse.jpeg" alt="Industrial Construction" />
            <img className={styles['svc-img-accent']} src="/images/legacy/👷🏻_♀️.jpeg" alt="Industrial Detail" />
            <div className={styles['svc-gold-bar']}></div>
        </div>
        <div className={`${styles['svc-text']} reveal`}>
            <span className={styles['section-tag']}>Industrial</span>
            <h2 className={styles['svc-title']}>Warehouses &amp; Manufacturing Hubs</h2>
            <p className={styles['svc-desc']}>Industrial buildings must be engineered for performance, durability, and operational efficiency.
                 TRI-FORT constructs warehouses, manufacturing plants, cold storage facilities, and logistics hubs designed to serve
                  your business for decades.</p>
            <p className={styles['svc-desc']}>We understand industrial specification requirements. Our team coordinates structural, mechanical, and 
                electrical systems with precision, ensuring facilities are built right the first time — within budget and on schedule.</p>
            <div className={styles['svc-features']}>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Warehouse &amp; distribution centres</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Manufacturing plant construction</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Cold storage facilities</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Logistics &amp; port infrastructure</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Heavy-duty floor systems</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Industrial MEP engineering</span></div>
            </div>
            <Link href="/contact#QFORM" className={styles['btn-primary']}>Plan Your Industrial Build <i  className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
</div>


<div id="restoration" >
    <div className={`${styles['service-block']} ${styles.reverse}`}>
        <div className={`${styles['svc-visual']} reveal from-right`}>
            <div className={styles['svc-badge']}><span className={styles.num}>04</span><span className={styles.lbl}>Service</span></div>
            <video autoPlay muted loop playsInline className={styles['svc-img-main']}>
                <source src="/images/legacy/WhatsApp_Video_2026-06-13_at_2.06.06_PM.mp4" type="video/mp4" />
            </video>
            <img className={styles['svc-img-accent']} src="/images/legacy/malindi_5.jpeg" alt="Heritage Detail" />
            <div className={styles['svc-gold-bar']}></div>
        </div>
        <div className={`${styles['svc-text']} reveal`}>
            <span className={styles['section-tag']}>Restoration</span>
            <h2 className={styles['svc-title']}>Heritage Restoration &amp; Renovation</h2>
            <p className={styles['svc-desc']}>Old buildings carry stories. Our restoration team breathes new life into Kenya's heritage structures
                carefully preserving their architectural character while modernising their infrastructure to meet today's standards of
                 comfort and safety.</p>
            <p className={styles['svc-desc']}>Whether it's a colonial-era estate, a historic civic building, or an ageing commercial property in need 
                of complete transformation, TRI-FORT approaches every restoration project with exceptional care and forensic attention
                 to detail.</p>
            <div className={styles['svc-features']}>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Heritage building restoration</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Structural repair &amp; consolidation</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Façade renovation &amp; cleaning</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Full interior refurbishment</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>MEP system upgrades</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Seismic &amp; structural assessments</span></div>
            </div>
            <Link href="/contact#QFORM" className={styles['btn-primary']}>Restore Your Property <i  className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
</div>


<div id="interior">
    <div className={styles['service-block']}>
        <div className={`${styles['svc-visual']} reveal from-left`}>
            <div className={styles['svc-badge']}><span className={styles.num}>05</span><span className={styles.lbl}>Service</span></div>
            <img className={styles['svc-img-main']} src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&amp;fit=crop&amp;w=900&amp;q=80" alt="Luxury Interior" />
            <img className={styles['svc-img-accent']} src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&amp;fit=crop&amp;w=400&amp;q=80" alt="Interior Detail" />
            <div className={styles['svc-gold-bar']}></div>
        </div>
        <div className={`${styles['svc-text']} reveal`}>
            <span className={styles['section-tag']}>Interior Design</span>
            <h2 className={styles['svc-title']}>Luxury Interior Fit-Out</h2>
            <p className={styles['svc-desc']}>The shell is just the beginning. Our in-house interior design and fit-out team transforms bare structures
                 into extraordinary living and working environments where every surface, material, and lighting choice tells a cohesive 
                 story.</p>
            <p className={styles['svc-desc']}>We work closely with clients to curate interiors that are deeply personal, enduringly beautiful, and 
                built to the same exacting standards as our construction work. International design sensibility, proudly delivered in 
                Kenya.</p>
            <div className={styles['svc-features']}>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Residential interior design</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Commercial &amp; hospitality fit-out</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Custom joinery &amp; millwork</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Premium material specification</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Lighting design &amp; automation</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>FF&amp;E procurement &amp; installation</span></div>
            </div>
            <Link href="/contact#QFORM" className={styles['btn-primary']}>Design Your Interior <i  className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
</div>


<div id="landscaping" >
    <div className={`${styles['service-block']} ${styles.reverse}`}>
        <div className={`${styles['svc-visual']} reveal from-right`}>
            <div className={styles['svc-badge']}><span className={styles.num}>06</span><span className={styles.lbl}>Service</span></div>
            <img className={styles['svc-img-main']} src="https://i.pinimg.com/1200x/83/a0/51/83a051d0ba66a890745963591a810b62.jpg" alt="Luxury Landscaping" />
            
        </div>
        <div className={`${styles['svc-text']} reveal`}>
            <span className={styles['section-tag']}>Landscaping</span>
            <h2 className={styles['svc-title']}>Landscape &amp; Outdoor Living</h2>
            <p className={styles['svc-desc']}>Kenya's climate is one of its greatest gifts. Our landscaping division designs and builds outdoor
                 environments that celebrate this from lush tropical gardens and infinity pools to hardscaped terraces and sprawling 
                 estate grounds.</p>
            <p className={styles['svc-desc']}>We integrate sustainable planting strategies with premium hardscaping materials to create outdoor spaces
                 that are as functional as they are beautiful year-round, low maintenance, and deeply connected to their surroundings.</p>
            <div className={styles['svc-features']}>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Estate grounds &amp; gardens</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Swimming pool construction</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Terrace &amp; outdoor entertaining</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Irrigation &amp; water features</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Sustainable planting design</span></div>
                <div className={styles['svc-feature']}><i className={`${styles.fas} ${styles['fa-check']}`}></i><span>Boundary &amp; security landscaping</span></div>
            </div>
            <Link href="/contact#QFORM" className={styles['btn-primary']}>Design Your Outdoor Space <i  className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
</div>


<div className={styles['dark-divider']}>
    <div className={styles['commitment-container']}>
        <div className={styles['commitment-grid']}>
            <div className={`reveal from-left`}>
                <span className={`${styles['section-tag']} ${styles['commitment-tag']}`}>Our Commitment</span>
                <h2 className={`${styles['section-title']} ${styles.light} ${styles['commitment-title']}`}>Built on <em>Transparency</em></h2>
                <p className={styles['commitment-desc']}>Unlike many construction companies, TRI-FORT operates with radical transparency. You receive real-time cost breakdowns, progress reports with photographic evidence, and direct access to your project manager at all times. No surprises. No hidden costs.</p>
                <Link href="/about" className={styles['btn-gold']}>Learn About Our Approach <i className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
            </div>
            <div className={`${styles['commitment-features-grid']} reveal from-right`}>
                <div className={styles['commitment-feature-card']}>
                    <i className={`${styles.fas} ${styles['fa-eye']} ${styles['commitment-feature-icon']}`}></i>
                    <div className={styles['commitment-feature-title']}>Full Visibility</div>
                    <p className={styles['commitment-feature-text']}>Real-time cost tracking &amp; milestone reporting</p>
                </div>
                <div className={styles['commitment-feature-card']}>
                    <i className={`${styles.fas} ${styles['fa-clock']} ${styles['commitment-feature-icon']}`}></i>
                    <div className={styles['commitment-feature-title']}>On Schedule</div>
                    <p className={styles['commitment-feature-text']}>98% of projects delivered on or ahead of deadline</p>
                </div>
                <div className={styles['commitment-feature-card']}>
                    <i className={`${styles.fas} ${styles['fa-shield-alt']} ${styles['commitment-feature-icon']}`}></i>
                    <div className={styles['commitment-feature-title']}>Guaranteed</div>
                    <p className={styles['commitment-feature-text']}>Comprehensive defects warranty on all works</p>
                </div>
                <div className={styles['commitment-feature-card']}>
                    <i className={`${styles.fas} ${styles['fa-trophy']} ${styles['commitment-feature-icon']}`}></i>
                    <div className={styles['commitment-feature-title']}>Award Winning</div>
                    <p className={styles['commitment-feature-text']}>Recognised for excellence in East African construction</p>
                </div>
            </div> 
        </div>
    </div>
</div>


<section className={styles['process-section']}>
    <div className={styles['process-inner']}>
        <div className={styles['process-header']}>
            <span className={`${styles['section-tag']} reveal`}>How We Work</span>
            <h2 className={`${styles['section-title']} reveal reveal-delay-1`}>Our Construction <em>Process</em></h2>
            <p className={`${styles['process-subtitle']} reveal reveal-delay-2`}>A clear, structured approach that keeps every project on track and every
                 client fully informed.</p>
        </div>
        <div className={styles['process-grid']}>
            <div className={styles['process-connector']}></div>
            <div className={`${styles['process-card']} reveal`}>
                <div className={styles['process-num-wrap']}><span className={styles['process-num']}>01</span></div>
                <div className={styles['process-card-title']}>Consultation</div>
                <p className={styles['process-card-desc']}>We begin with a thorough discovery session to understand your vision, budget, timeline, 
                    and site requirements.</p>
            </div>
            <div className={`${styles['process-card']} reveal reveal-delay-1`}>
                <div className={styles['process-num-wrap']}><span className={styles['process-num']}>02</span></div>
                <div className={styles['process-card-title']}>Design &amp; Planning</div>
                <p className={styles['process-card-desc']}>Our architects and engineers develop detailed plans, 3D visualisations, and accurate cost
                     estimates.</p>
            </div>
            <div className={`${styles['process-card']} reveal reveal-delay-2`}>
                <div className={styles['process-num-wrap']}><span className={styles['process-num']}>03</span></div>
                <div className={styles['process-card-title']}>Contract &amp; Schedule</div>
                <p className={styles['process-card-desc']}>A transparent contract is agreed, milestone payments scheduled, and construction timelines
                     confirmed.</p>
            </div>
            <div className={`${styles['process-card']} reveal reveal-delay-3`}>
                <div className={styles['process-num-wrap']}><span className={styles['process-num']}>04</span></div>
                <div className={styles['process-card-title']}>Construction</div>
                <p className={styles['process-card-desc']}>Build commences under our master craftsmen with weekly reports, photos, and full financial
                     transparency.</p>
            </div>
            <div className={`${styles['process-card']} reveal reveal-delay-4`}>
                <div className={styles['process-num-wrap']}><span className={styles['process-num']}>05</span></div>
                <div className={styles['process-card-title']}>Handover</div>
                <p className={styles['process-card-desc']}>A thorough snagging process, final inspections, and defects warranty activation then we hand
                     you your keys.</p>
            </div>
        </div>
    </div>
</section>


<section className={styles['why-section']}>
    <div className={`${styles['why-header']} reveal`}>
        <span className={styles['section-tag']}>Why Choose Us</span>
        <h2  className={styles['section-title']}>The TRI-FORT <em>Difference</em></h2>
    </div>
    <div className={styles['why-grid']}>
        <div className={`${styles['why-card']} reveal`}>
            <div className={styles['why-title']}>Precision Engineering</div>
            <p className={styles['why-desc']}>Every structural and mechanical decision is backed by rigorous engineering analysis. We never
                 compromise on structural integrity or material quality.</p>
            <div className={styles['why-num']}>01</div>
        </div>
        <div className={`${styles['why-card']} reveal reveal-delay-1`}>
            <div className={styles['why-title']}>Full Cost Transparency</div>
            <p className={styles['why-desc']}>Real-time cost visibility through our client portal. You see every invoice, every expenditure,
                 and every saving  in real time.</p>
            <div className={styles['why-num']}>02</div>
        </div>
        <div className={`${styles['why-card']} reveal reveal-delay-2`}>
            <div className={styles['why-title']}>Dedicated Project Teams</div>
            <p className={styles['why-desc']}>Your assigned project manager is your single point of contact  available to you directly throughout 
                the entire build.</p>
            <div className={styles['why-num']}>03</div>
        </div>
        <div className={`${styles['why-card']} reveal reveal-delay-1`}>
            <div className={styles['why-title']}>Sustainable Building</div>
            <p className={styles['why-desc']}>We integrate green building principles, energy-efficient systems, and locally sourced materials 
                wherever possible for builds that are responsible and future-proof.</p>
            <div className={styles['why-num']}>04</div>
        </div>
        <div className={`${styles['why-card']} reveal reveal-delay-2`}>
            <div className={styles['why-title']}>On-Time Delivery</div>
            <p className={styles['why-desc']}>98% on-time delivery rate backed by milestone-based project scheduling and active risk management
                 protocols.</p>
            <div className={styles['why-num']}>05</div>
        </div>
        <div className={`${styles['why-card']} reveal reveal-delay-3`}>
            <div className={styles['why-title']}>Award-Winning Quality</div>
            <p className={styles['why-desc']}>Recognised across Kenya for construction excellence. Over 340 five-star client reviews  and an unwavering
                 commitment to earning each one.</p>
            <div className={styles['why-num']}>06</div>
        </div>
    </div>
</section>


<section className={styles['materials-section']}>
    <div className={styles['materials-inner']}>
        <div className={styles['materials-header']}>
            <span  className={`${styles['section-tag']} reveal`}>Premium Standards</span>
            <h2  className={`${styles['section-title']} ${styles.light} reveal reveal-delay-1`}>Materials of <em>Distinction</em></h2>
            <p  className={`reveal reveal-delay-2`}>We source only premium materials from vetted suppliers locally where possible, internationally when required for the highest specification builds.</p>
        </div>
        <div className={styles['materials-grid']}>
            <div className={`${styles['material-card']} reveal`}>
                <img className={styles['material-img']} src="https://i.pinimg.com/1200x/78/26/9e/78269eb4d70fd4710ceee85908d098a6.jpg" alt="Structural Steel" />
                <div className={styles['material-info']}>
                    <div className={styles['material-cat']}>Structure</div>
                    <div className={styles['material-name']}>Structural Steel</div>
                    <p className={styles['material-desc']}>High-tensile steel sourced from certified suppliers for maximum load capacity and longevity.</p>
                </div>
            </div>
            <div className={`${styles['material-card']} reveal reveal-delay-1`}>
                <img className={styles['material-img']} src="https://i.pinimg.com/736x/9e/c5/86/9ec5864f3864f4dd260d87ae51802e59.jpg" alt="Natural Stone" />
                <div className={styles['material-info']}>
                    <div className={styles['material-cat']}>Finishing</div>
                    <div className={styles['material-name']}>Natural Stone</div>
                    <p className={styles['material-desc']}>Locally quarried Kenyan marble and international limestone for timeless interior and
                         exterior finishes.</p>
                </div>
            </div>
            <div className={`${styles['material-card']} reveal reveal-delay-2`}>
                <img className={styles['material-img']} src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Architectural Glass" />
                <div className={styles['material-info']}>
                    <div className={styles['material-cat']}>Envelope</div>
                    <div className={styles['material-name']}>Architectural Glass</div>
                    <p className={styles['material-desc']}>Double-glazed, UV-filtered glass systems for energy efficiency and stunning visual 
                        transparency.</p>
                </div>
            </div>
            <div className={`${styles['material-card']} reveal reveal-delay-3`}>
                <img className={styles['material-img']} src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?auto=format&amp;fit=crop&amp;w=600&amp;q=80" alt="Hardwood Joinery" />
                <div className={styles['material-info']}>
                    <div className={styles['material-cat']}>Interior</div>
                    <div className={styles['material-name']}>Hardwood Joinery</div>
                    <p className={styles['material-desc']}>Sustainably sourced hardwood for custom cabinetry, staircases, and bespoke joinery elements.</p>
                </div>
            </div>
        </div>
    </div>
</section>


<section className={styles['stats-section']}>
    <div className={styles['stats-inner']}>
        <div className={`${styles['stat-card']} reveal`}>
            <div data-target="120" className={styles['stat-num']}>0<sup>+</sup></div>
            <div className={styles['stat-label']}>Projects Completed</div>
        </div>
        <div className={`${styles['stat-card']} reveal reveal-delay-1`}>
            <div data-target="98" className={styles['stat-num']}>0<sup>%</sup></div>
            <div className={styles['stat-label']}>On-Time Delivery</div>
        </div>
        <div className={`${styles['stat-card']} reveal reveal-delay-2`}>
            <div data-target="340" className={styles['stat-num']}>0<sup>+</sup></div>
            <div className={styles['stat-label']}>5-Star Reviews</div>
        </div>
        <div className={`${styles['stat-card']} reveal reveal-delay-3`}>
            <div data-target="5" className={styles['stat-num']}>0<sup>+</sup></div>
            <div className={styles['stat-label']}>Years of Excellence</div>
        </div>
    </div>
</section>


<section>
    <div className={styles['testimonial-spotlight']}>
        <div className={`${styles['ts-visual']} reveal from-left`}>
            <div className={styles['ts-gold-accent']}></div>
            <img className={styles['ts-img']} src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&amp;fit=crop&amp;w=700&amp;q=80" alt="Project completion" />
        </div>
        <div className={`${styles['ts-content']} reveal`}>
            <div className={styles['ts-stars']}>★ ★ ★ ★ ★</div>
            <div className={styles['ts-quote-mark']}>"</div>
            <p className={styles['ts-quote']}>TRI-FORT delivered our 12-unit residential development three weeks ahead of schedule and exactly on
                 budget. The level of transparency throughout was unlike anything I'd experienced from a construction firm in Kenya.
                 I've already commissioned them for our next development.</p>
            <div className={styles['ts-author']}>
                <img className={styles['ts-avatar']} src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&amp;fit=crop&amp;w=100&amp;q=80" alt="Client" />
                <div>
                    <div className={styles['ts-name']}>James Mwangi</div>
                    <div className={styles['ts-role']}>Property Developer · Nairobi</div>
                </div>
            </div>
        </div>
    </div>
</section>


<section className={styles['cta-section']}>
    <div className={styles['cta-inner']}>
        <p className={`${styles['cta-eyebrow']} reveal ${styles.animate__animated} ${styles.animate__fadeInDown}`}>Begin Your Project</p>
        <h2 className={`${styles['cta-title']} reveal reveal-delay-1`}>Ready to Build <em>Something Extraordinary?</em></h2>
        <p className={`${styles['cta-desc']} reveal reveal-delay-2`}>Whether you have a clear brief or just the seed of an idea our team is ready to listen,
             advise, and build something that exceeds your every expectation.</p>
        <div className={`${styles['cta-actions']} reveal reveal-delay-3`}>
            <Link href="/contact#QFORM" className={`${styles['btn-gold']} ${styles['btn-heartbeat']}`}><i className={`${styles.fas} ${styles['fa-paper-plane']}`}></i> Get Your Free Quote</Link>
            <Link href="/projects" className={styles['btn-ghost']}>View Our Portfolio <i className={`${styles.fas} ${styles['fa-arrow-right']}`}></i></Link>
        </div>
    </div>
</section>







<div id="scrollRing" className={styles['scroll-progress-ring']}>
    <svg viewBox="0 0 44 44" width="44" height="44" className={styles['ring-svg']}>
        <circle cx="22" cy="22" r="19" className={styles['ring-circle']}></circle>
        <circle cx="22" cy="22" r="19" className={styles['ring-progress']}></circle>
    </svg>
</div>





    </div>
  );
}
