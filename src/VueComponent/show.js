const fs = require('fs');

const vm = new Vue({
  el: '#root',
  data: {
    visible: false,
    tabsActiveName: 'second',
    xmlData: '',
    jsonData: '',
    generateData: '',
    graphyData: [],
  },
  mounted() {
    this.clickTest();
  },
  methods: {
    clickTest() {
      this.getFileString('C:\\Users\\Xio\\Desktop\\XML\\RPC.xml');
    },
    transformClick() {
      try {
        const realData = JSON.parse(this.jsonData);
        realData.root.module.forEach(v => {
          const data = {};
          data.moduleName = `模块名称：${v.$.name}`;
          this.graphyData.push(data);
        });
        this.sucMsg('转换成功');
      } catch (error) {
        console.log(error);
        this.errMsg('请按照先后顺序点击');
      }
    },
    generateClick() {
      try {
        const realData = JSON.parse(this.jsonData);
        console.log(realData);
        this.generateData = realData.root.module.reduce((acc, cur) => {
          cur.constraints.forEach(v => {
            acc += `\n${v.rule.join('\n')}`;
          });
          return acc;
        }, '');
        this.sucMsg('生成成功');
      } catch (error) {
        console.log(error);
        this.errMsg('请按照先后顺序点击');
      }
    },
    parseXml() {
      var parseString = require('xml2js').parseString;
      parseString(this.xmlData, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const str = JSON.stringify(result, null, 2);
          // 这里使用了this 所以要注意context
          this.jsonData = str;
          this.sucMsg('解析成功');
        }
      });
    },
    onXmlDrop(e) {
      e.preventDefault();
      e.stopPropagation();

      let filePath;
      for (let f of e.dataTransfer.files) {
        filePath = f.path;
      }
      this.getFileString(filePath);
      console.log(filePath);
      this.sucMsg('上传XML成功');
    },
    onDragover(e) {
      e.preventDefault();
      e.stopPropagation();
    },
    getFileString(p) {
      const data = fs.readFileSync(p, 'utf8');
      this.xmlData = data;
    },
    sucMsg(val) {
      this.$message({
        message: val,
        type: 'success',
      });
    },
    errMsg(val) {
      this.$message.error(val);
    },
  },
});
