const { getOptions } = require('loader-utils');
module.exports = function (source) {
  const { replaceMap = {} } = getOptions(this) || {};
  const reg = /<%(([\s\S](?!%>))*[\s\S])%>/g;
  
  // 示例处理：移除所有注释 <!-- ... -->
  const processed = source.replace(reg, (matched, name) => {
    // 如果 replaceMap 中有对应的键，则替换为对应的值
    return replaceMap[name.trim()] || matched;
  });
  
  // 返回处理后的内容（必须返回字符串）
  return processed;
};