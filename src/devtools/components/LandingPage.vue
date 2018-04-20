<template lang="pug">
div
  h1 Hello world!
</template>

<script>
export default {
  name: "landing-page",
  data() {
    return {
      _: {}
    };
  },
  $use: {
    test: [
      { id: 1, profile: { mobile: 123213 } },
      { id: 2, profile: { mobile: 123213 } }
    ]
  },
  mounted() {
    this.$data._ = window._;
  },
  methods: {
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
