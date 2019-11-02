<template>
  <div class="posts-page">
    <PostList :posts="topPosts" />
  </div>
</template>

<script>
import PostList from "@/components/Posts/PostList";

export default {
  components: {
    PostList
  },
  asyncData(context, callback) {
    // executed on server
    setTimeout(() => {
      callback(null, {
        topPosts: [
          {
            id: "3",
            title: "Third Post",
            previewText: "This is our third post!",
            thumbnail:
              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          },
          {
            id: "4",
            title: "Fourth Post",
            previewText: "This is our fourth post!",
            thumbnail:
              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
          }
        ]
      });
    }, 1500);
  }
};
</script>

<style scoped>
.post-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>