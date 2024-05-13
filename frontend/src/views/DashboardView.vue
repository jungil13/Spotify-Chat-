<template>
  <section class="app-main">
    <div class="min-h-screen flex bg-zinc-900 text-white">
      <!-- Left Sidebar -->
      <aside class="flex justify-center py-4 ml-6">
        <section class="border border-gray-700 w-full md:w-7/6 h-full md:h-7/6 py-6 bg-zinc-800 mx-4 md:mx-0 rounded-lg">
          <div class="flex items-center justify-center mb-4">
          <i class="fas fa-music mr-3 text-xl text-green-400"></i>
          <h2 class="text-2xl font-extrabold">My Playlist</h2>
        </div>
          
          <ArtistView/>
          <div class="flex items-center justify-center mb-4">
          <i class="fas fa-microphone text-2xl text-green-400"></i>
          <h2 class="text-2xl font-extrabold mb-4 px-4 flex justify-center">Top Artist</h2>
        </div>
          <ArtistaView/>
        </section>
      </aside>

      <!-- Main Content -->
      <div class="flex-grow p-4 w-3/4">
        <header class="bg-zinc-800 py-4 rounded-xl border border-gray-700 mb-4">
          <div class="container mx-auto px-4 flex flex-col lg:flex-row justify-between items-center">
            <div class="flex items-center">
              <img src="/logo.png" alt="Logo" class="w-10 h-10 mr-2">
              <h1 class="text-xl font-extrabold cursor-pointer">SPOTIFY</h1>
            </div>
            <!-- <ul class="space-y-4">
            <li>
              <router-link to="/" class="text-gray-300 hover:text-white flex items-center font-bold">
                <i class="fas fa-home mr-2 text-xl"></i>
                <span class="text-lg">Home</span>
              </router-link>
            </li>
            <li>
              <router-link to="/artist" target="_blank"
                class="text-gray-300 hover:text-white flex items-center font-bold">
                <i class="fas fa-microphone mr-2 text-xl"></i>
                <span class="text-lg">Playlists</span>
              </router-link>
            </li>
          </ul> -->
            <div class="flex items-center">
              <p class="hidden lg:block mr-6 cursor-pointer">Welcome, <span class="text-sky-300 font-semibold">{{
                  username }}</span></p>
              <button @click="logout" class="bg-green-700 hover:bg-green-600 rounded-full px-4 py-2">Logout</button>
            </div>
          </div>
        </header>

        <!-- Search Input -->
        <div class="flex justify-center">
          <div class="flex w-30">
            <input v-model="searchQuery" type="text" placeholder="Search music . . ."
              class="flex-1 bg-gray-800 hover:bg-green-800 border border-white text-white rounded-l-full px-4 py-2 font-semibold text-md">
            <button @click="search"
              class="bg-green-800 hover:bg-green-800 border border-white text-white rounded-r-full px-4 py-2 font-semibold text-md">
              <i class="fas fa-search mr-1 text-lg"></i>
              <span class="hidden sm:inline-block">Search</span>
            </button>
          </div>
        </div>

        <!-- Top Songs Section -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
          <div v-for="track in tracks" :key="track.id"
            class="bg-nuetral-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-500">
            <iframe :src="generateEmbedUrl(track.id)" class="w-full" height="250" frameborder="" allowfullscreen=""
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
            <div class="p-3">
              <div class="font-bold text-lg">{{ track.name }}</div>
              <p class="text-gray-400 mb-1">{{ track.artists[0].name }}</p>
              <button @click="shareMessage(track.id)" class="flex items-center">
                <i class="fas fa-share mr-1 text-green-400 text-lg"></i> <span
                  class="ml-2 font-bold font-sans">Share</span>
              </button>
            </div>
          </div>
          <!-- Render your top songs here -->
        </div>

        <!-- Skeleton loading animation -->
        <div v-if="!isContentLoaded" class="mb-6">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isContentLoaded" class="mb-6">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isContentLoaded" class="mb-6">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isContentLoaded" class="mb-6">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isContentLoaded" class="mb-6">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isContentLoaded" class="mb-6">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isContentLoaded" class="mb-6">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="!isContentLoaded" class="mb-6">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-gray-700 h-12 w-12"></div>
            <div class="flex-1 space-y-4 py-1">
              <div class="h-4 bg-gray-700 rounded w-3/4"></div>
              <div class="space-y-2">
                <div class="h-4 bg-gray-700 rounded"></div>
                <div class="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Drawer -->
      <div class="fixed inset-y-0 right-0 z-10 flex">
        <transition name="slide">
          <div v-if="isDrawerOpen" class="w-full w-5/6 h-4/3 bg-zinc-800 border-l border-gray-700">
            <div class="p-2">
              <ul>
                <!-- List of top songs -->
                <li v-for="(song, index) in topSongs" :key="index" class="mb-4">
                  <div
                    :class="song.bgColor + ' rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300'">
                    <MessageView />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </transition>
      </div>

      <!-- Mobile Drawer Toggle Button -->
      <button @click="toggleDrawer"
        class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-md z-20">
        <i :class="[isDrawerOpen ? 'fas fa-chevron-left' : 'fas fa-chevron-right']"></i>
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
import MessageView from './MessageView.vue';
import ArtistView from './ArtistView.vue';
import ArtistaView from './ArtistaView.vue';

const searchQuery = ref('');
const tracks = ref([]);
const isLoggedIn = ref(false);
const message = ref('');
const username = ref('');
const isDrawerOpen = ref(false);
const router = useRouter();

const topSongs = [
  { url: "https://open.spotify.com/embed/track/29WxJqIfDRMo9isV07kbJP", bgColor: "bg-violet-900" },
  { url: "https://open.spotify.com/embed/track/1iIJtD9hkzw4ZHfR7ND9yb", bgColor: "bg-pink-800" },
  { url: "https://open.spotify.com/embed/track/2v6jmF6VQWS96x6tSg05IC", bgColor: "bg-gray-400" },
  { url: "https://open.spotify.com/embed/track/5sbooPcNgIE22DwO0VNGUJ", bgColor: "bg-violet-400" }
];

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const search = async () => {
  try {
    const response = await axios.get('http://localhost:3000/search', {
      params: {
        q: searchQuery.value
      }
    });
    tracks.value = response.data.tracks.items;
  } catch (error) {
    console.error('Error searching tracks:', error);
  }
};

const generateEmbedUrl = (trackId) => {
  return `https://open.spotify.com/embed/track/${trackId}`;
};

const shareMessage = (trackId) => {
  const embedUrl = generateEmbedUrl(trackId);
  const message = `Check out this track: ${embedUrl}`;

  const input = document.createElement('input');
  input.style.position = 'fixed';
  input.style.opacity = 0;
  input.value = message;
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);

  alert('Link copied to clipboard!');
};

const logout = () => {
  console.log("Logged out!");
  localStorage.removeItem('token');
  router.push('/');
  Swal.fire({
    icon: 'success',
    title: 'Logged out successfully',
    position: 'top',
    showConfirmButton: false,
    timer: 1500,
    customClass: {
      popup: 'my-swal-popup',
      title: 'my-swal-title'
    }
  });
};

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:3000/dashboard', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    message.value = response.data.message;
    isLoggedIn.value = true;

    const token = localStorage.getItem('token');
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    if (decodedToken) {
      username.value = decodedToken.username;
    }
  } catch (error) {
    console.error('Error fetching dashboard message:', error);
  }
});
</script>



<style>
.my-swal-popup {
  width: 200px;
  /* Adjust width as needed */
  background-color: #4CAF50;
  /* Custom background color */
  color: white;
  /* Custom text color */
}

.my-swal-title {
  font-size: 16px;
  /* Adjust font size as needed */
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
