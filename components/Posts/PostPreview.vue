<template>
  <nuxt-link class="post-preview" v-bind:to="'/posts/' + 1">
    <article>
      <div class="post-thumbnail"></div>
      <div class="post-content">
        <h1>Post Title</h1>
        <p>Preview Text</p>
      </div>
    </article>
  </nuxt-link>
</template>

<style scoped>
.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-image: url("~assets/img/innovators-200.jpg");
}

.post-content {
  padding: 10px;
  text-align: center;
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}
</style>