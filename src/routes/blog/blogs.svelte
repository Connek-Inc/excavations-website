<script>
  import { language } from '$lib/store/store'; 
  import waterproofing from "$lib/images/basement-sump-pumps-installation-1.png";
  import benefits from "$lib/images/residential-excavating-service-image-600x400-1.webp";
  import importance from "$lib/images/french drain1.jpg";

  let maintitle;
  let button;  
  let subtitle1;
  let title1;
  let description1;
  let subtitle2;
  let title2;
  let description2;
  let subtitle3;
  let title3;
  let description3;

  if ($language=='en') {
      maintitle = 'LATEST BLOGS'
      button = 'Read More'
      subtitle1 = ''//'04 JULY 2024 | BY AUTHOR'
      title1 = 'The Importance of French Drain Installation for Your Home'
      description1 = 'Learn about the importance of French drain installation for your home. Discover how proper drainage solutions can prevent flooding and protect your foundation'
      subtitle2 = ''//'04 JULY 2024 | BY AUTHOR'
      title2 = 'Top 5 Benefits of Excavation Services for Your Residential Projects'
      description2 = 'Discover the top 5 benefits of excavation services for your residential projects. Learn how professional excavation can ensure successful site preparation and foundation stability.'
      subtitle3 = ''//'04 JULY 2024 | BY AUTHOR'
      title3 = 'Waterproofing Solutions for a Dry Basement'
      description3 = 'Discover effective waterproofing solutions for keeping your basement dry. Learn about sump pump installation and other techniques to protect your home.'
  } else if ($language=='fr') {
      maintitle = "DERNIERS BLOGS"
      button = 'En Savoir Plus'
      subtitle1 = ''//"04 JUILLET 2024 | PAR AUTEUR"
      title1 = "L'Importance de l'Installation de Drains Français pour Votre Maison"
      description1 = 'Learn about the importance of French drain installation for your home. Discover how proper drainage solutions can prevent flooding and protect your foundation'
      subtitle2 = ''//"04 JUILLET 2024 | PAR AUTEUR"
      title2 = "Les 5 Principaux Avantages des Services d'Excavation pour Vos Projets Résidentiels"
      description2 = "Découvrez les 5 principaux avantages des services d'excavation pour vos projets résidentiels. Apprenez comment une excavation professionnelle peut garantir une préparation du site réussie et une stabilité des fondations."
      subtitle3 = ''//"04 JUILLET 2024 | PAR AUTEUR"
      title3 = "Solutions d'Imperméabilisation pour un Sous-Sol Sec"
      description3 = "Découvrez des solutions efficaces d'imperméabilisation pour garder votre sous-sol sec. Apprenez-en plus sur l'installation de pompes de puisard et d'autres techniques pour protéger votre maison."
  }

</script>

<div id="blogs" class="bg-gray-200 px-4 py-20 font-[sans-serif]">
    <div class="max-w-6xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-[#333]">{maintitle}</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-12 max-md:max-w-lg mx-auto">
        <div class="rounded overflow-hidden p-6 hover:bg-white transition-all duration-300">
          <img src={importance} alt="Blog Post 1" class="w-full h-64 object-cover rounded" />
          <div class="text-center">
            <span class="text-sm block text-[#333] mb-2 mt-4">{subtitle1}</span>
            <h3 class="text-xl font-bold text-[#333] mb-4">{title1}</h3>
            <p class="text-[#333] text-sm">{description1}</p>
            <a href="/blog/importance"><button type="button" class="px-6 py-3 text-white text-sm tracking-wider border-none outline-none bg-[#b69b88] hover:bg-[#af876a] mt-6">{button}</button></a>
          </div>
        </div>
        <div class="rounded overflow-hidden p-6 hover:bg-white transition-all duration-300">
          <img src={benefits} alt="Blog Post 2" class="w-full h-64 object-cover rounded" />
          <div class="text-center">
            <span class="text-sm block text-[#333] mb-2 mt-4">{subtitle2}</span>
            <h3 class="text-xl font-bold text-[#333] mb-4">{title2}</h3>
            <p class="text-[#333] text-sm">{description2}</p>
            <a href="/blog/benefits"><button type="button" class="px-6 py-3 text-white text-sm tracking-wider border-none outline-none bg-[#b69b88] hover:bg-[#af876a] mt-6">{button}</button></a>
          </div>
        </div>
        <div class="rounded overflow-hidden p-6 hover:bg-white transition-all duration-300">
          <img src={waterproofing} alt="Blog Post 3" class="w-full h-64 object-cover rounded" />
          <div class="text-center">
            <span class="text-sm block text-[#333] mb-2 mt-4">{subtitle3}</span>
            <h3 class="text-xl font-bold text-[#333] mb-4">{title3}</h3>
            <p class="text-[#333] text-sm">{description3}</p>
            <a href="/blog/waterproofing"><button type="button" class="px-6 py-3 text-white text-sm tracking-wider border-none outline-none bg-[#b69b88] hover:bg-[#af876a] mt-6">{button}</button></a>
          </div>
        </div>
      </div>
    </div>
  </div> 
