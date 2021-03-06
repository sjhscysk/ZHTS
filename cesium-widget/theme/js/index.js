function run() {
    var e = (new Date).getTime();
    e - oldTime >= 3500 && (loadingBar.className = "",
            e - oldTime >= 3550 && (loadingBar.className = "ins", oldTime = e)),
        1 == Window.LOADING_FLAG && clearInterval(loadIdx)
}

function loaderOK() {
    $("#loadOverlay").hide(), $("#loadbar").removeClass("ins"),
        Window.LOADING_FLAG = !0
}

function initMap() {
    var e = "../config.json?time=20180118";
    mars3d.createMap({
        id: "cesiumContainer",
        url: e,
        sceneModePicker: !0,
        homeButton: !1,
        navigationHelpButton: !0,
        infoBox: !1,
        success: function(e, a, t) {
            viewer = e, t.widget.defaultOptions.windowOptions.skin = "layer-mars-dialog2",
                t.widget.defaultOptions.style = "dark",
                t.widget.widgetsAtStart = [],
                mars3d.map.centerAt(null, { duration: 0 }),
                mars3d.widget.init(e, t.widget, "../"),
                loaderOK(),
                mars3d.map.openFlyAnimation(function() {
                    var a = haoutil.system.getRequestByName("widget");
                    null != a && a.length > 0 && mars3d.widget.activate(a),
                        initWork(e)
                })
        }
    })
}

function initUI() {
    $(".widget-btn").each(function() {
        $(this).click(function(e) {
            var a = $(this).attr("data-widget");
            haoutil.isutil.isNull(a) || (mars3d.widget.isActivate(a) ? mars3d.widget.disable(a) : mars3d.widget.activate(a))
        })
    }), $(".menu4").on("click", function() { $(".menu4-ul").toggle("slow") })
}

function initWork(e) {
    $.getJSON("../widgetsTS/qyPoint/data/point.json",
        function(e) {
            for (var a = e.Data, t = 0; t < a.length; t++) {
                var i = a[t];
                i.QYZP = 5,
                    i.CPZP = 4,
                    i.QYJJ = "有",
                    i.JJ = [{
                            NF: "2015",
                            ZCZ: 6e3 + haoutil.math.random(10, 1e3 * t),
                            LY: 1e3 + haoutil.math.random(10, 1e3 * t),
                            NSE: 1e3 + haoutil.math.random(10, 1e3 * t)
                        },
                        {
                            NF: "2016",
                            ZCZ: 1e4 + haoutil.math.random(10, 1e3 * t),
                            LY: 3e3 + haoutil.math.random(10, 1e3 * t),
                            NSE: 3e3 + haoutil.math.random(10, 1e3 * t)
                        },
                        {
                            NF: "2017",
                            ZCZ: 25e3 + haoutil.math.random(10, 1e3 * t),
                            LY: 5e3 + haoutil.math.random(10, 1e3 * t),
                            NSE: 5e3 + haoutil.math.random(10, 1e3 * t)
                        }
                    ]
            }
            mars3d.widget.activate({ uri: "widgetsTS/qyCharts/widget.js", dataQy: a }),
                setTimeout(function() {
                        mars3d.widget.activate({
                            uri: "widgetsTS/qyPoint/widget.js",
                            dataQy: a
                        })
                    },
                    1e3)
        })
}

function bindToLayerControl(e) {
    var a = e.visible;
    delete e.visible;
    var t = new mars3d.BaseLayer(e, viewer);
    t._visible = a, e._layer = t;
    var i = mars3d.widget.getClass("widgets/manageLayers/widget.js");
    i ? i.addOverlay(e) : viewer.gisdata.config.operationallayers.push(e)
}

function unbindLayerControl(e) {
    var a = mars3d.widget.getClass("widgets/manageLayers/widget.js");
    if (a) a.removeLayer(e);
    else
        for (var t = viewer.gisdata.config.operationallayers, i = 0; i < t.length; i++) {
            var n = t[i];
            if (n.name == e) {
                t.splice(i, 1);
                break
            }
        }
}
var loadingBar = document.getElementById("loadbar"),
    oldTime = (new Date).getTime(),
    loadIdx = setInterval(run, 100);
$(document).ready(function() {
    mars3d.map.webglreport() || (alert("系统检测到您使用的浏览器不支持WebGL功能"),
            layer.open({
                type: 1,
                title: "当前浏览器不支持WebGL功能",
                closeBtn: 0,
                shadeClose: !1,
                resize: !1,
                area: ["600px",
                    "200px"
                ],
                content: '<div style="margin: 20px;"><h3>系统检测到您使用的浏览器不支持WebGL功能！</h3>  <p>1、请您检查浏览器版本，安装使用最新版chrome、火狐或IE11以上浏览器！</p> <p>2、WebGL支持取决于GPU支持，请保证客户端电脑已安装最新显卡驱动程序！</p><p>3、如果上两步骤没有解决问题，说明您的电脑需要更换了！</p></div>'
            })),
        initUI(),
        initMap()
});
var viewer;