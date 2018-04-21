<template lang="pug">
  div.eventsBox
    //- tree-view(:data="data" :options="{maxDepth: 3,modifiable: true}" @change-data="onChangeData")
    ul
      li(v-for="(item, i) in uses", @click="currentUseID = i" :key = "i") {{item.name}}
    div
      tree-view( v-if=`viewMode == "Tree"` :data="currentUse" :options="{maxDepth: 3}")
      codemirror( v-if=`viewMode == "Edit"` v-model="currentUseString" :options="cmOptions")
      button(@click=`ToggleVieMode("Tree")`) Tree
      button(@click=`ToggleVieMode("Edit")`) Edit      
      
      
    codemirror(v-model="code" :options="cmOptions")
    button(@click="use") Use
</template>

<script>
export default {
  name: "landing-page",
  data() {
    return {
      code: `$use({name:"foo"})`,
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
      currentUseID: -1,
      currentUse: {},
      currentUseString: "",
      viewMode: "Tree",
      data: null
    };
  },
  mounted() {
    this.data = _;
    this.currentUseID = 0;
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
    ToggleVieMode(mode) {
      this.viewMode = mode;
    },
    use() {
      new Function("test", "test", "", this.code)();
    }
  },
  watch: {
    currentUseID(val) {
      this.currentUse = this.uses[val];
      this.currentUseString = JSON.stringify(this.currentUse);
    }
  }
};
</script>

<style lang="stylus" scoped>
.eventsBox {
  display: flex;
}
</style>
