<template lang="pug">
  div.eventsBox
    //- tree-view(:data="data" :options="{maxDepth: 3,modifiable: true}" @change-data="onChangeData")
    ul
      li(v-for="(item, i) in uses", @click="currentUseID = i" :key = "i") {{item.name}}
    tree-view(:data="currentUse" :options="{maxDepth: 3}")
    codemirror(v-model="code" :options="cmOptions")
    button(@click="use") Use
</template>

<script>
export default {
  name: "landing-page",
  data() {
    return {
      code: `
$use({name:"foo"})`,
      cmOptions: {
        tabSize: 2,
        mode: {
          name: "javascript",
          json: true
        },
        theme: "dracula",
        extraKeys: {
          "Ctrl-Enter": cm => {
            this.use();
          }
        }
      },
      uses: {
        0: { name: "test0", val: 0 },
        1: { name: "test1", val: 1 },
        2: { name: "test2", val: 2 }
      },
      currentUseID: "",
      currentUse: {},
      data: null
    };
  },
  mounted() {
    this.data = _;
  },
  beforeCreate() {
    _.events.on("$use", _object => {
      let uuid = this.$uuid.v4();
      // _object._uid = uuid;
      this.$set(this.uses, uuid, _object);
    });
  },
  methods: {
    onChangeData(data) {
      this.data = data;
    },
    use() {
      new Function("test", "test", "", this.code)();
    }
  },
  watch: {
    currentUseID(val) {
      this.currentUse = this.uses[val];
    }
  }
};
</script>

<style lang="stylus" scoped>
.eventsBox {
  display: flex;
}
</style>
