<template lang="pug">
div
  ul
    li(v-for="item in useList") {{item}}
</template>

<script>
export default {
  name: "landing-page",
  data() {
    return {
      useList: []
    };
  },
  $use: {},
  beforeCreate() {
    _.events.on("$use", _object => {
      this.useList.push(_object);
    });
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
