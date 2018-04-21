<template lang="pug">
  <tree-view :data="data" :options="{maxDepth: 3,modifiable: true}" @change-data="onChangeData" ></tree-view>
</template>

<script>
export default {
  name: "landing-page",
  data() {
    return {
      data: null
    };
  },
  mounted() {
    this.data = _;
  },
  beforeCreate() {
    _.events.on("$use", _object => {
      this.useList.push(_object);
    });
  },
  methods: {
    onChangeData(data) {
      this.data = data;
    },
    open(link) {
      this.$electron.shell.openExternal(link);
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
