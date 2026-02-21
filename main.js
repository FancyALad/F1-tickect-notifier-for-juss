// console.log('device.height: ' + device.height);

function openApp (appName = '久事体育') {
    return launchApp(appName);
}

function findF1(tag = '2026F1') {
    // console.log(selector() instanceof UiSelector);
    btn = selector().text("票务")
    if (btn.exists()) {
        console.log('选择票务:', btn.click()); 
        // selector().text("票务").click();
    } else {
        throw new Error('没有找到票务按钮');
    }
    console.log('找到:', tag, selector().text(tag).exists()); 

    btn = text(tag).findOne(5000);

    // console.log(btn);
    console.log(btn.text() + ': ' + btn.parent().click());

    // console.log(btn.clickable());

    // console.log(btn.parent().clickable());

    year = tag.substring(0, 4);     // 年份
}


function chooseGrandstand(choice = 'B') {
    /* 选看台 */
    A_widget = text(year + ' F1 喜力中国大奖赛-' + choice.toUpperCase() + '看台').findOne(5000);

    // console.log(A_widget);
    // console.log(A_widget.parent().children());
    console.log('看台' + choice + '购票: ', A_widget.parent().findOne(id("btn_buy")).click());
}

function humanCheck() {
    /* 选票 */
    btn = text('确认并知悉').findOne(3000);

    if (btn) {
        scroll = text('（请详细阅读完成后点击确认）').findOne(5000);

        // console.log(scroll.parent().scrollable());
        console.log('阅读:', scroll.parent().parent().parent().parent().scrollDown());

        console.log('确认并知悉:', btn.click());

    }
    btn = text('下一步').findOne(5000);
    console.log('下一步:', btn.click());
}
// try {
//     selector().text("2026F1").show();
//     console.log(selector().text("2026F1").click());
// } catch (e) {
//     console.error(e);
// }

function checkTickets(day = '周日 SUN') {
    waitFor(text('场次时间为当地时间').exists, 5000);
    btn = textContains(day).findOne(5000);
    // console.log(btn.parent().children());
    // console.log(btn.parent().childCount());
    if (btn.parent().childCount() === 1) {
        console.log(btn.text() + '有票！！！');
        return true;
    } else {
        console.log(btn.text() + '没票...');
        return false;
    }
}

function refresh() {
    // console.log(longClickable().find())
    // console.log(className('RelativeLayout').findOne(3000));
    // bounds = className('RelativeLayout').findOne(3000).bounds();
    // // console.log(className('RelativeLayout').findOne(3000).bounds());
    // console.log('bounds: ', bounds, 'centerX: ', bounds.centerX(), 'top: ', bounds.top, 'bottom: ', bounds.bottom);

    // console.log(className('RelativeLayout').find().toArray().filter(function(widget) {
    //     return widget.bounds().top !== 0 && widget.bounds().left !== 0;
    // }));

    console.log('刷新界面', swipe(Math.floor(0.5 * device.width), Math.ceil(0.4 * device.height), 
            Math.floor(0.5 * device.width), device.height, 800));

    sleep(500);
    while (text("加载中").exists()) {
        console.log('正在刷新...');
        sleep(2000);
    }
}

function back() {
    return id('h5_tv_nav_back').findOne(3000).click();
}

let SEND_KEY;

// 发送通知到微信的函数
function serverChanNotify(message) {
    let url = `https://sctapi.ftqq.com/${SEND_KEY}.send`;
    // console.log('url: ', url);
    let res = http.post(url, {
        title: "F1抢票啦！！！",
        desp: message
    });
    if (res.statusCode == 200) {
        log("通知发送成功");
    } else {
        log("通知发送失败");
    }
}


function main() {
    /* main() */

    SEND_KEY = "xxx";    // your Key
    
    year = '2026';
    exp = '周日 SUN'
    grandstand = 'A';

    timeLimit = 23  // 23:00

    let now = new Date();

    console.log(openApp('久事体育'));
    sleep(10000);    // 等待 app 启动

    while (now.getHours() < timeLimit) {    // or while true
        try {
            findF1(tag = '2026F1');
            chooseGrandstand(grandstand);
            humanCheck();
        } catch (e) {
            console.error(e);
            console.log('返回主界面:', back());
            sleep(500)
            continue;
        }
        while (!checkTickets('周日 SUN')) {
            refresh();
        }
        break;
    }

    msg = '看台' + grandstand + ', ' + exp + '有票！！';
    console.log(msg);
    serverChanNotify(msg);
}

main();
