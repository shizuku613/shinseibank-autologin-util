/*jslint node: true */

/**
 * セキュリティカードのデータを二次元配列からハッシュテーブルへ変換する
 */
exports.convert = function (table) {
  var width = table.length;
  var height = table[0].length;
  
  var result = { };
  
  for (var i = 0; i < width; ++i) {
    var row = i.toString();
    
    for (var j = 0; j < height; ++j) {
      var col = String.fromCharCode('A'.charCodeAt(0) + j);
      result[col + row] = table[i][j];
    }
  }
  
  return result;
};