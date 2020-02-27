// 必要な要素を取得
var $thead = $('table.user-contests-table>thead');
var $tbody = $('table.user-contests-table>tbody');
var th = $thead.find('th');
var tr = $tbody.find('tr');

// ヘッダ行に列を追加
var $head = $(th[5]).clone();
$head.text('Performance');
$(th[5]).after($head);

// 各行
for (i=0; i<tr.length; i++) {
    // 変化量とレートを取得
    var td = $(tr[i]).find('td');
    var change = Number($(td[4]).text());
    var rate = Number($(td[5]).text());
    // パフォーマンスを計算
    var prev = rate - change;
    var perf = prev + change * 4;
    // 列を追加
    var $perf = $(td[5]).clone();
    $perf.text(perf);
    $(td[5]).after($perf);
}
