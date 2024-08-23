<script>
    import { language } from "./store/store";
</script>


<div class="bg-gray-600 flex flex-col justify-center items-center py-12 text-white">
    {#if $language == 'en'}
    <div class="flex justify-center mt-4 px-6">
        <a href="https://www.instagram.com/mini_excavation_erable?igsh=cnc2dzY5OGpjdGFs" target="_blank" rel="noopener noreferrer" class="px-6 pb-6">
            <svg fill="#ffffff" width="35px" height="35" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-instagram"><path d='M14.017 0h-8.07A5.954 5.954 0 0 0 0 5.948v8.07a5.954 5.954 0 0 0 5.948 5.947h8.07a5.954 5.954 0 0 0 5.947-5.948v-8.07A5.954 5.954 0 0 0 14.017 0zm3.94 14.017a3.94 3.94 0 0 1-3.94 3.94h-8.07a3.94 3.94 0 0 1-3.939-3.94v-8.07a3.94 3.94 0 0 1 3.94-3.939h8.07a3.94 3.94 0 0 1 3.939 3.94v8.07z'/><path d='M9.982 4.819A5.17 5.17 0 0 0 4.82 9.982a5.17 5.17 0 0 0 5.163 5.164 5.17 5.17 0 0 0 5.164-5.164A5.17 5.17 0 0 0 9.982 4.82zm0 8.319a3.155 3.155 0 1 1 0-6.31 3.155 3.155 0 0 1 0 6.31z'/><circle cx='15.156' cy='4.858' r='1.237'/>
            </svg>
        </a>
        <a href="https://www.facebook.com/share/XDdWREBZZxgCwBnT/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" class="px-6 pb-6">
            <svg fill="#ffffff" width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z"/></svg>
        </a>
        <a href="mailto:miniexcavationerable@gmail.com" target="_blank" rel="noopener noreferrer" class="px-6 pb-6">
            <svg fill="#ffffff" width="35px" height="35px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path class="clr-i-outline clr-i-outline-path-1" d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM30.46,28H5.66l7-7.24-1.44-1.39L4,26.84V9.52L16.43,21.89a2,2,0,0,0,2.82,0L32,9.21v17.5l-7.36-7.36-1.41,1.41ZM5.31,8H30.38L17.84,20.47Z"></path>
                <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
            </svg>
        </a>
      </div>
    <p>
        Written by Connek
    </p>
    <p>
        All rights reserved
    </p>
    {:else}
    <div class="flex justify-center mt-4 ">
        <a href="https://www.instagram.com/mini_excavation_erable?igsh=cnc2dzY5OGpjdGFs" target="_blank" rel="noopener noreferrer" class="px-6 pb-6">
            <svg fill="#ffffff" width="35px" height="35" viewBox="-2 -2 24 24" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin" class="jam jam-instagram">
                <path d='M14.017 0h-8.07A5.954 5.954 0 0 0 0 5.948v8.07a5.954 5.954 0 0 0 5.948 5.947h8.07a5.954 5.954 0 0 0 5.947-5.948v-8.07A5.954 5.954 0 0 0 14.017 0zm3.94 14.017a3.94 3.94 0 0 1-3.94 3.94h-8.07a3.94 3.94 0 0 1-3.939-3.94v-8.07a3.94 3.94 0 0 1 3.94-3.939h8.07a3.94 3.94 0 0 1 3.939 3.94v8.07z'/>
                <path d='M9.982 4.819A5.17 5.17 0 0 0 4.82 9.982a5.17 5.17 0 0 0 5.163 5.164 5.17 5.17 0 0 0 5.164-5.164A5.17 5.17 0 0 0 9.982 4.82zm0 8.319a3.155 3.155 0 1 1 0-6.31 3.155 3.155 0 0 1 0 6.31z'/><circle cx='15.156' cy='4.858' r='1.237'/>
            </svg>
        </a>
        <a href="https://www.facebook.com/share/XDdWREBZZxgCwBnT/?mibextid=LQQJ4d" target="_blank" rel="noopener noreferrer" class="px-6 pb-6">
            <svg fill="#ffffff" width="35px" height="35px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M20.9,2H3.1A1.1,1.1,0,0,0,2,3.1V20.9A1.1,1.1,0,0,0,3.1,22h9.58V14.25h-2.6v-3h2.6V9a3.64,3.64,0,0,1,3.88-4,20.26,20.26,0,0,1,2.33.12v2.7H17.3c-1.26,0-1.5.6-1.5,1.47v1.93h3l-.39,3H15.8V22h5.1A1.1,1.1,0,0,0,22,20.9V3.1A1.1,1.1,0,0,0,20.9,2Z"/></svg>
        </a>
        <a href="mailto:miniexcavationerable@gmail.com" target="_blank" rel="noopener noreferrer" class="px-6 pb-6">
            <svg fill="#ffffff" width="35px" height="35px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <path class="clr-i-outline clr-i-outline-path-1" d="M32,6H4A2,2,0,0,0,2,8V28a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V8A2,2,0,0,0,32,6ZM30.46,28H5.66l7-7.24-1.44-1.39L4,26.84V9.52L16.43,21.89a2,2,0,0,0,2.82,0L32,9.21v17.5l-7.36-7.36-1.41,1.41ZM5.31,8H30.38L17.84,20.47Z"></path>
                <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
            </svg>
        </a>
      </div>
    <p>
        Écrit par Connek
    </p>
    <p>
        Tous droits réservés
    </p>
    {/if}
</div>