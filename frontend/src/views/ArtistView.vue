<template>
  <div class="mb-6 border border-gray-700 ">
   <iframe class="" src="https://open.spotify.com/embed/playlist/2hCKt8ynEu958dKHW0jTV4?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
  </div>
</template>

<script>
export default {
  data() {
    return {
      playlistId: "3cEYpjA9oz9GiPac4AsH4n", // Paste your playlist ID here
    };
  },
  computed: {
    playlistEmbedUrl() {
      return `https://open.spotify.com/embed/playlist/${this.playlistId}`;
    }
  }
};
</script>
