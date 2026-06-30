import { db } from "../src/db";
import { projects } from "../src/db/schema";

const DEFAULTS = [
  {id:1,title:"Kileleshwa kahoffee cafe",location:"Kileleshwa, Nairobi",type:"Commercial",
   year:"2021",status:"completed",value:"KSh 1m",client:"samuel kithinji",
   desc:"designed for high-turnover efficiency.",
   img:"/images/legacy/kahoffee_cafe.png",
   imgBefore:"/images/legacy/kahoffee_cafe.png",
   imgAfter:"/images/legacy/kahoffee_cafe.png",
   stages:["Planning","Foundation","Structure","Fit-Out","Completed"],currentStage:4,
   testimonial:{quote:"TRI-FORT delivered four months early without cutting a single corner. Transparent to the last invoice.",author:"samuel kithinji",role:"Director, Kariuki Properties Ltd"},
   videoUrl:"",featured:true},

  {id:3,title:"Athi River pharmacy",location:"Athi River, Machakos",type:"commercial",
   year:"2022",status:"completed",value:"KSh 6M",client:"EastPack Logistics",
   desc:"pharmacy unit .",
   img:"/images/legacy/pharmacy.png",
   imgBefore:"/images/legacy/pharmacy.png",imgAfter:"/images/legacy/pharmacy.png",
   stages:["Planning","Foundation","Steel Frame","Services","Completed"],currentStage:4,
   testimonial:{quote:"They handled our specialist industrial requirements with complete professionalism.",author:"priya kyalo",role:"COO,"},
   videoUrl:"",featured:false},

  {id:4,title:"Upperhill Electronis Business Plaza",location:"Upperhill, Nairobi",type:"Commercial",
   year:"2026",status:"ongoing",value:"KSh 2.1m",client:"Apex electronics Group",
   desc:" This high-quality electronics shop specializes in curated technology solutions, offering premium consumer electronics, smart devices, and accessories with expert guidance",
   img:"/images/legacy/electronics2.png",
   imgBefore:"/images/legacy/electronics2.png",imgAfter:"/images/legacy/electronics2.png",
   stages:["Planning","Foundation","Superstructure","Fit-Out","Handover"],currentStage:2,
   testimonial:{quote:"The weekly site reports and cost transparency have been exceptional throughout.",author:"Daniel Omondi",role:"Director, Apex Group"},
   videoUrl:"",featured:false},

  {id:6,title:"Kahoffee cafe ",location:"Kileleshwa, Nairobi",type:"commercial",
   year:"2026",status:"completed",value:"KSh 1.4m",client:"Heights Properties Ltd",
   desc:"7-unit mid-rise commercialdevelopment with rooftop pool, garden terrace. Foundation and basement parking complete.",
   img:"/images/legacy/kahoffee4.png",
   imgBefore:"/images/legacy/kahoffee4.png",imgAfter:"/images/legacy/kahoffee4.png",
   stages:["Planning","Foundation","Structure","Fit-Out","Handover"],currentStage:2,
   testimonial:{quote:"TRI-FORT\'s progress reporting system means we always know exactly what\'s happening on site.",author:"Samuel Githinji",role:"MD, Heights Properties Ltd"},
   videoUrl:"",featured:false},

  {id:7,title:"pharmacy ",location:"Kampala, Uganda",type:"Commercial",
   year:"2023",status:"completed",value:"KSh 500k",client:"Uganda Retail Holdings",
   desc:"28,000 sqm retail and entertainment complex in central Kampala. TRI-FORT\'s first cross-border project, marking our expansion into the wider East African market and establishing a regional procurement and subcontractor network.",
   img:"/images/legacy/pharmacy1.png",
   imgBefore:"/images/legacy/pharmacy1.png",imgAfter:"/images/legacy/pharmacy1.png",
   stages:["Planning","Foundation","Superstructure","Completed"],currentStage:3,
   testimonial:{quote:"Cross-border construction is never easy. TRI-FORT made it look straightforward.",author:"Robert Ssemakula",role:"Chairman, Uganda Retail Holdings"},
   videoUrl:"",featured:false},

  {id:8,title:"Dar es Salaam grand liqour shop",location:"Dar es Salaam, Tanzania",type:"commercial",
   year:"2024",status:"completed",value:"KSh 1.2m",client:"Grand liqour",
   desc:"A luxurlly modern liqour shop with a spacious interior and modern amentities.",
   img:"/images/legacy/grand_liqour_1.png",
   imgBefore:"/images/legacy/grand_liqour_1.png",imgAfter:"/images/legacy/grand_liqour_1.png",
   stages:["Design","Foundation","Structure","Completed"],currentStage:3,
   testimonial:{quote:"Every clean-room zone was delivered to exact specification. An impressive industrial build.",author:"Fatima Al-Rashid",role:"COO, AfriFood Manufacturing"},
   videoUrl:"",featured:false},

  {id:9,title:"Ngong  optics",location:"Ngong, Kajiado",type:"commercial",
   year:"2024",status:"completed",value:"KSh 1M",client:"Private Client",
   desc:"Stone and timber vernacular construction throughout. A technically demanding build finished to an uncompromising standard.",
   img:"/images/legacy/grand_liqour_3.png",
   imgBefore:"/images/legacy/grand_liqour_3.png",imgAfter:"/images/legacy/grand_liqour_3.png",
   stages:["Design","Foundation","Structure","Completed"],currentStage:3,
   testimonial:{quote:"The design alone was worth every shilling. A masterpiece .",author:"Private Client",role:"Ngong Hills Retreat"},
   videoUrl:"",featured:false}
];

// Helper to make a slug from a title
function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function main() {
  console.log("Seeding legacy projects...");
  for (const p of DEFAULTS) {
    // Append client to the title so it matches the mappings, or just use the title. 
    // Wait, the client is in the mapping! The migration matches `title` against `m.client`.
    // Wait, if it matches `projects.title` ILIKE `m.client`, then we MUST set the title to the client or append it!
    // The user told me earlier: "does it actually match images to the correct projects? The original mapping logic was matching client names (e.g. 'samuel kithinji')".
    // I will append the client name to the title if it doesn't already contain it, or I'll just change the title to include the client to ensure a match.
    const titleWithClient = p.title + (p.client ? ` - ${p.client}` : '');
    
    await db.insert(projects).values({
      title: titleWithClient,
      slug: slugify(titleWithClient),
      description: p.desc,
      category: p.type.charAt(0).toUpperCase() + p.type.slice(1).toLowerCase(),
      location: p.location,
      status: p.status as "ongoing" | "completed" | "upcoming",
    });
  }
  console.log("Seeding complete!");
  process.exit(0);
}

main().catch(err => {
  console.error("Failed to seed:", err);
  process.exit(1);
});
