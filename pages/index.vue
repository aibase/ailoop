<template>
  <div class="home-page">
    <section class="intro">
      <h1>Progress at AI speed!</h1>
    </section>
    <section class="featured-posts">
      <nuxt-link v-bind:to="'/posts/' + 1">
        <article class="post-preview">
          <div class="post-thumbnail"></div>
          <div class="post-content">
            <h1>Post Title</h1>
            <p>Preview Text</p>
          </div>
        </article>
      </nuxt-link>
      <nuxt-link v-bind:to="'/posts/' + 2">
        <article class="post-preview">
          <div class="post-thumbnail"></div>
          <div class="post-content">
            <h1>Post Title 2</h1>
            <p>Preview Text 2</p>
          </div>
        </article>
      </nuxt-link>
    </section>
  </div>
</template>

