const posts = [
  {
    slug: "importance",
    title: "The Importance of French Drain Installation for Your Home",
    meta: "Learn about the importance of French drain installation for your home. Discover how proper drainage solutions can prevent flooding and protect your foundation",
    content: "<h2>Importance of Proper Drainage</h2> <p>Proper drainage is crucial for maintaining your home's integrity. Without it, water can accumulate, causing structural issues, basement flooding, and soil erosion. </p><h2>Overview of French Drains</h2><p>French drains effectively manage excess water around your home. Named after Henry Flagg French, these systems consist of a trench filled with gravel and a perforated pipe that redirects water away from your property.</p><h2>What is a French Drain?</h2><h3>Definition and Components</h3><p>A French drain includes: - **Gravel or Rock:** Filters debris and allows water flow. - **Perforated Pipe:** Directs water away. - **Geotextile Fabric:** Prevents clogs.</p> <h3>How it Works</h3><p> Water flows into the trench through the gravel and is collected by the perforated pipe, which directs it to a drainage point, preventing pooling and water damage.</p><h2>Benefits of French Drains</h2><h3>Preventing Water Damage</h3><p>French drains prevent water accumulation around your foundation, avoiding basement flooding and structural issues.</p> <h3>Protecting Foundations</h3><p>They keep your foundation dry, preventing soil shifting and foundation settlement.</p> <h3>Reducing Soil Erosion</h3><p> By managing water flow, French drains reduce soil erosion and preserve your landscape.</p><h2>Installation Process</h2><h3>Steps Involved in Installing a French Drain</h3> <p>1. **Planning:** Determine the best location and design for the drain. 2. **Excavation:** Dig a trench along the planned path. 3. **Lining the Trench:** Place geotextile fabric in the trench to prevent soil intrusion. 4. **Adding Gravel:** Fill the trench with gravel or rock. 5. **Placing the Pipe:** Lay the perforated pipe in the trench. 6. **Covering the Pipe:** Add more gravel on top of the pipe and cover with fabric. 7. **Backfilling:** Cover the trench with soil and restore the landscape. </p><h3>Materials Used</h3><p>The materials required for installing a French drain include: - **Gravel or Rock** - **Perforated Pipe** - **Geotextile Fabric** - **Shovel and Trencher**</p><h2>Why Choose Mini Excavation Érable?</h2><h3>Expertise, Quality Service, and Affordability</h3><p> Mini Excavation Érable offers top-notch French drain installation services with a team of experienced professionals. Our commitment to quality and safety ensures the best results for your residential projects. Moreover, by owning our excavation machines, we can provide these services at a lower cost compared to our competitors, offering you significant savings.</p> <h3>Additional Services</h3> <p>In addition to French drain installations, we also offer: - **Foundation Crack Repairs:** Ensuring the safety and integrity of your foundations. - **Demolition Services:** Safe and environmentally-friendly demolition solutions. - **Camera Inspections:** Precise pipeline diagnostics with advanced technology.</p>"
  },
  {
    slug: "safety",
    title: "Safety notice",
    content: "Hi"
  },
  {
    slug: "cake",
    title: "This was a triumph",
    content: "<p>I'm making a note here: HUGE SUCCESS.</p>"
  }
];
function load() {
  return {
    summaries: posts.map((post) => ({
      slug: post.slug,
      title: post.title
    }))
  };
}
export {
  load
};
