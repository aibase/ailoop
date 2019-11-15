<template>
  <div class="single-post-page">
    <section class="post">
      <h1 class="post-title">{{ loadedPost.title }}</h1>
      <div class="post-details">
        <div class="post-detail">
          Last updated on: {{ loadedPost.updatedDate | date }}
        </div>
        <div class="post-detail">Written by: {{ loadedPost.creator }}</div>
      </div>
      <p>{{ loadedPost.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        Project / Service feedback @
        <a href="https://github.com/aibase/ailoop/issues">feedback loop</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  asyncData(context) {
    if (context.payload) {
      // this will run just during npm run generate / nuxt generate
      return {
        loadedPost: context.payload.postData
      };
    }
    return context.app.$axios
      .$get("/feed/posts/" + context.params.id)
      .then(data => {
        return {
          loadedPost: data
        };
      })
      .catch(e => context.error(e));
  },
  head: {
    title: "A Recombinant Post"
  }
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>
