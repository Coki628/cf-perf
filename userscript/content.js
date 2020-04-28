// ==UserScript==
// @name         CodeForces Performance
// @namespace    https://github.com/Coki628/cf-perf
// @version      0.1
// @description  You can check your performance for each contest!
// @author       Coki628
// @include      https://codeforces.com/contests/with/*
// @grant        none
// ==/UserScript==

// ---------- your settings hare ----------

// colorize your rate (1 or 0)
const colorRate = 1;
// colorize your perf (1 or 0)
const colorPerf = 1;
// show your perf (1 or 0)
const showPerf = 1;

// ----------------------------------------

let getColorType = function(x) {
    if (x >= 3000) {
        return 'user-legendary';
    } else if (3000 > x && x >= 2400) {
        return 'user-red';
    } else if (2400 > x && x >= 2100) {
        return 'user-orange';
    } else if (2100 > x && x >= 1900) {
        return 'user-violet';
    } else if (1900 > x && x >= 1600) {
        return 'user-blue';
    } else if (1600 > x && x >= 1400) {
        return 'user-cyan';
    } else if (1400 > x && x >= 1200) {
        return 'user-green';
    } else {
        return 'user-gray';
    }
}

$(function() {
    'use strict';

    // 必要な要素を取得
    let $thead = $('table.user-contests-table>thead');
    let $tbody = $('table.user-contests-table>tbody');
    let th = $thead.find('th');
    let tr = $tbody.find('tr');

    // ヘッダ行に列を追加
    if (showPerf) {
        let $head = $(th[5]).clone();
        $head.text('Performance');
        $(th[5]).after($head);
    }

    // 各行
    for (let i=0; i<tr.length; i++) {
        // 変化量とレートを取得
        let td = $(tr[i]).find('td');
        let change = Number($(td[4]).text());
        let $rate = $(td[5]);
        let rate = Number($rate.text());

        // パフォーマンス列を表示
        if (showPerf) {
            // パフォーマンスを計算
            let prev = rate - change;
            let perf = prev + change * 4;
            // 列を追加
            let $perf = $rate.clone();
            $perf.text(perf);
            $rate.after($perf);
            // パフォーマンスの色付け
            if (colorPerf) {
                let colorType = getColorType(perf);
                $perf.addClass(colorType);
                $perf.css('font-weight', 'bold');
            }
        }
        // レートの色付け
        if (colorRate) {
            let colorType = getColorType(rate);
            $rate.addClass(colorType);
            $rate.css('font-weight', 'bold');
        }
    }
});
