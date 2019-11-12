<template>
  <form @submit.prevent="onSave">
    <AppControlInput v-model="editedPost.creator">Author Name</AppControlInput>
    <AppControlInput v-model="editedPost.title">Title</AppControlInput>
    <AppControlInput v-model="editedPost.previewText">Preview Text</AppControlInput>
    <AppControlInput v-model="editedPost.postType">Type</AppControlInput>
    <AppControlInput v-model="editedPost.interestTags">Interest Tags</AppControlInput>
    <AppControlInput v-model="editedPost.imageUrl">Thumbnail Link</AppControlInput>
    <AppControlInput control-type="textarea" v-model="editedPost.content">Content</AppControlInput>
    <AppControlInput control-type="textarea" v-model="editedPost.sheets">Sheets</AppControlInput>
    <AppButton type="submit">Save</AppButton>
    <AppButton type="button" style="margin-left: 10px" btn-style="cancel" @click="onCancel">Cancel</AppButton>
  </form>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      editedPost: this.post
        ? { ...this.post }
        : {
            creator: "",
            title: "",
            imageUrl: "",
            content: "",
            previewText: "",
            postType: "project / service",
            interestTags: "what change",
            sheets: `tab 1: Social
tab 2: Money
tab 3: Terms
tab 4: Deal

tab 5: Input
tab 6: Steps
tab 7: Output
tab 8: Pay`
          }
    };
  },
  methods: {
    onSave() {
      // Save the post
      this.$emit("submit", this.editedPost);
    },
    onCancel() {
      // Navigate back
      this.$router.push("/admin");
    }
  }
};
</script>