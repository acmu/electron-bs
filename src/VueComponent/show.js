const fs = require('fs')

const vm = new Vue({
  el: '#root',
  data: {
    visible: false,
    tabsActiveName: 'first',
    xmlData: ''
  },
  methods: {
    clickTest: function() {

    },
    onXmlDrop: function(e) {
      e.preventDefault();
      e.stopPropagation();

      let filePath;
      for (let f of e.dataTransfer.files) {
        filePath = f.path;
      }
      this.getFileString(filePath)
      this.sucMsg('上传XML成功，数据如下')
    },
    onDragover: function(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    getFileString(p) {
      const data = fs.readFileSync(p, 'utf8')
      this.xmlData = data;
    },
    sucMsg(val) {
      this.$message({
        message: val,
        type: 'success'
      });
    },
    errMsg(val) {
      this.$message.error(val);
    }
  },
});
