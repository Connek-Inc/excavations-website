<script>
  import { language } from '$lib/store/store'; 
  import waterproofing from "$lib/images/basement-sump-pumps-installation-1.png";
  import benefits from "$lib/images/residential-excavating-service-image-600x400-1.webp";
  import importance from "$lib/images/frenchdrain2.jpg";

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

<div id="blogs" class="bg-gray-100 dark:bg-black px-4 py-20 font-[sans-serif] transition-colors duration-300">
    <div class="max-w-6xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl font-extrabold text-[#333] dark:text-white uppercase tracking-tight">{maintitle}</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-md:max-w-lg mx-auto">
        <div class="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 hover:shadow-xl dark:hover:bg-zinc-800 transition-all duration-300 group">
          <div class="overflow-hidden rounded-lg mb-4">
             <img src={importance} alt="Blog Post 1" class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="text-center">
            <span class="text-xs font-bold text-[#febd17] mb-2 mt-2 block uppercase tracking-wider">{subtitle1 || 'BLOG POST'}</span>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{title1}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{description1}</p>
            <a href="/blog/importance"><button type="button" class="px-6 py-3 text-black font-bold text-sm tracking-wider border-none outline-none bg-[#febd17] hover:bg-[#e5aa15] rounded-full mt-6 transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">{button}</button></a>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 hover:shadow-xl dark:hover:bg-zinc-800 transition-all duration-300 group">
          <div class="overflow-hidden rounded-lg mb-4">
            <img src={benefits} alt="Blog Post 2" class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="text-center">
             <span class="text-xs font-bold text-[#febd17] mb-2 mt-2 block uppercase tracking-wider">{subtitle2 || 'BLOG POST'}</span>
             <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{title2}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{description2}</p>
            <a href="/blog/benefits"><button type="button" class="px-6 py-3 text-black font-bold text-sm tracking-wider border-none outline-none bg-[#febd17] hover:bg-[#e5aa15] rounded-full mt-6 transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">{button}</button></a>
          </div>
        </div>
        <div class="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900 border border-transparent dark:border-zinc-800 p-6 hover:shadow-xl dark:hover:bg-zinc-800 transition-all duration-300 group">
          <div class="overflow-hidden rounded-lg mb-4">
            <img src={waterproofing} alt="Blog Post 3" class="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div class="text-center">
             <span class="text-xs font-bold text-[#febd17] mb-2 mt-2 block uppercase tracking-wider">{subtitle3 || 'BLOG POST'}</span>
             <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{title3}</h3>
            <p class="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{description3}</p>
            <a href="/blog/waterproofing"><button type="button" class="px-6 py-3 text-black font-bold text-sm tracking-wider border-none outline-none bg-[#febd17] hover:bg-[#e5aa15] rounded-full mt-6 transition-all hover:scale-105 shadow-lg shadow-yellow-500/20">{button}</button></a>
          </div>
        </div>
      </div>
    </div>
  </div> 
