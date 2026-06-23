/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 353:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayMode = void 0;
var PlayMode;
(function (PlayMode) {
    PlayMode["vod"] = "vod";
    PlayMode["live"] = "live";
})(PlayMode = exports.PlayMode || (exports.PlayMode = {}));


/***/ }),

/***/ 73:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerState = void 0;
var PlayerState;
(function (PlayerState) {
    PlayerState[PlayerState["ready"] = 0] = "ready";
    PlayerState[PlayerState["playing"] = 1] = "playing";
    PlayerState[PlayerState["pause"] = 2] = "pause";
    PlayerState[PlayerState["slow"] = 3] = "slow";
    PlayerState[PlayerState["fast"] = 4] = "fast";
    PlayerState[PlayerState["end"] = 5] = "end";
    PlayerState[PlayerState["opening"] = 6] = "opening";
    PlayerState[PlayerState["closing"] = 7] = "closing";
    PlayerState[PlayerState["frame"] = 8] = "frame";
    PlayerState[PlayerState["closed"] = 255] = "closed";
})(PlayerState = exports.PlayerState || (exports.PlayerState = {}));


/***/ }),

/***/ 991:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivatePointF = void 0;
class PrivatePointF {
    constructor() {
        this.X = 0.0;
        this.Y = 0.0;
    }
    static load(dataview, offset) {
        let struct = new PrivatePointF();
        struct.X = dataview.getFloat32(offset, true);
        offset += 4;
        struct.Y = dataview.getFloat32(offset, true);
        offset += 4;
        return {
            struct: struct,
            offset: offset,
        };
    }
}
exports.PrivatePointF = PrivatePointF;


/***/ }),

/***/ 309:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateRuleList = void 0;
const private_rule_model_1 = __webpack_require__(324);
class PrivateRuleList {
    constructor() {
        this.RuleNumber = 0;
        this.Rule = [];
    }
    static load(dataview, offset) {
        let struct = new PrivateRuleList();
        struct.RuleNumber = dataview.getInt32(offset, true);
        struct.Rule = [];
        offset += 4;
        for (let i = 0; i < struct.RuleNumber; i++) {
            let result = private_rule_model_1.PrivateRule.load(dataview, offset);
            struct.Rule.push(result.struct);
            offset = result.offset;
        }
        return struct;
    }
}
exports.PrivateRuleList = PrivateRuleList;


/***/ }),

/***/ 324:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateRule = void 0;
const private_point_f_model_1 = __webpack_require__(991);
class PrivateRule {
    constructor() {
        this.RuleID = 0;
        this.VertexNumber = 0;
        this.Point = [];
    }
    static load(dataview, offset) {
        let struct = new PrivateRule();
        struct.RuleID = dataview.getInt32(offset, true);
        offset += 4;
        struct.VertexNumber = dataview.getInt32(offset, true);
        offset += 4;
        struct.Point = [];
        for (let i = 0; i < struct.VertexNumber; i++) {
            let result = private_point_f_model_1.PrivatePointF.load(dataview, offset);
            struct.Point.push(result.struct);
            offset = result.offset;
        }
        return {
            struct: struct,
            offset: offset,
        };
    }
}
exports.PrivateRule = PrivateRule;


/***/ }),

/***/ 134:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateTargetList = void 0;
const private_target_model_1 = __webpack_require__(712);
class PrivateTargetList {
    constructor() {
        this.TargetNumber = 0;
        this.Target = [];
    }
    static load(dataview, offset) {
        let struct = new PrivateTargetList();
        struct.TargetNumber = dataview.getInt32(offset, true);
        offset += 4;
        struct.Target = [];
        for (let i = 0; i < 16; i++) {
            let result = private_target_model_1.PrivateTarget.load(dataview, offset);
            struct.Target.push(result.struct);
            offset = result.offset;
        }
        struct.Target.slice(0, struct.TargetNumber);
        return struct;
    }
}
exports.PrivateTargetList = PrivateTargetList;


/***/ }),

/***/ 712:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateTarget = void 0;
const private_point_f_model_1 = __webpack_require__(991);
class PrivateTarget {
    constructor() {
        this.Id = 0;
        this.BlobType = 0;
        this.Confidence = 0;
        this.VertexNumber = 0;
        this.Point = [];
    }
    static load(dataview, offset) {
        let struct = new PrivateTarget();
        struct.Id = dataview.getInt32(offset, true);
        offset += 4;
        struct.BlobType = dataview.getInt32(offset, true);
        offset += 4;
        struct.Confidence = dataview.getInt32(offset, true);
        offset += 4;
        struct.VertexNumber = dataview.getInt32(offset, true);
        offset += 4;
        struct.Point = [];
        for (let i = 0; i < 10; i++) {
            let result = private_point_f_model_1.PrivatePointF.load(dataview, offset);
            struct.Point.push(result.struct);
            offset = result.offset;
        }
        struct.Point = struct.Point.slice(0, struct.VertexNumber);
        return {
            struct: struct,
            offset: offset,
        };
    }
}
exports.PrivateTarget = PrivateTarget;


/***/ }),

/***/ 297:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerArgs = void 0;
const play_mode_enum_1 = __webpack_require__(353);
class WSPlayerArgs {
    constructor() {
        this.width = '100%';
        this.height = '100%';
        this.elementId = 'video';
        this.path = `http://${document.location.host}/codebase/`;
        this.mode = play_mode_enum_1.PlayMode.live;
        this.url = '';
    }
}
exports.WSPlayerArgs = WSPlayerArgs;


/***/ }),

/***/ 941:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerToolEvent = void 0;
class WSPlayerToolEvent {
    constructor() {
        this.control = new WSPlayerToolControlEvent();
    }
}
exports.WSPlayerToolEvent = WSPlayerToolEvent;
class WSPlayerToolControlEvent {
    constructor() {
        this.play = new WSPlayerToolControlClickEvent();
        this.stop = new WSPlayerToolControlClickEvent();
        this.fullscreen = new WSPlayerToolControlClickEvent();
        this.capturepicture = new WSPlayerToolControlClickEvent();
        this.slow = new WSPlayerToolControlClickEvent();
        this.fast = new WSPlayerToolControlClickEvent();
        this.forward = new WSPlayerToolControlClickEvent();
        this.position = new WSPlayerToolControlMouseEvent();
        this.jump = {
            back: new WSPlayerToolControlClickEvent(),
            forward: new WSPlayerToolControlClickEvent(),
        };
        this.volume = {
            icon: new WSPlayerToolControlClickEvent(),
            slide: new WSPlayerToolControlInputEvent(),
        };
        this.rule = new WSPlayerToolOpenControlClickEvent();
        this.subtitle = new WSPlayerToolOpenControlClickEvent();
    }
}
class WSPlayerToolControlClickEvent {
}
class WSPlayerToolControlInputEvent {
}
class WSPlayerToolOpenControlClickEvent extends WSPlayerToolControlClickEvent {
    constructor() {
        super(...arguments);
        this.opened = false;
    }
}
class WSPlayerToolControlMouseEvent {
}


/***/ }),

/***/ 96:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerToolControl = void 0;
class WSPlayerToolControl {
    constructor() {
        this.volume = new WSPlayerToolControlVolume();
        this.isMoudseDown = false;
    }
}
exports.WSPlayerToolControl = WSPlayerToolControl;
class WSPlayerToolControlVolume {
    constructor() {
        this.value = 0;
    }
}


/***/ }),

/***/ 626:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerSubtitle = void 0;
class WSPlayerSubtitle {
    constructor() { }
    get enabled() {
        if (this.element) {
            return !this.element.style.display;
        }
        return false;
    }
    set enabled(v) {
        if (this.element) {
            this.element.style.display = v ? '' : 'none';
        }
    }
    appendElement(parent) {
        this.element = document.createElement('div');
        this.element.className = 'subtitle';
        this.content = document.createElement('div');
        this.content.className = 'subtitle-content';
        this.element.appendChild(this.content);
        parent.appendChild(this.element);
    }
    set(text) {
        if (this.content && this.enabled) {
            this.content.innerText = text;
        }
    }
}
exports.WSPlayerSubtitle = WSPlayerSubtitle;


/***/ }),

/***/ 30:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerTool = void 0;
const play_mode_enum_1 = __webpack_require__(353);
const ws_player_tool_control_event_model_1 = __webpack_require__(941);
const ws_player_tool_control_model_1 = __webpack_require__(96);
class WSPlayerTool {
    constructor(element, mode) {
        this.control = new ws_player_tool_control_model_1.WSPlayerToolControl();
        this.event = new ws_player_tool_control_event_model_1.WSPlayerToolEvent();
        this.display = false;
        this.createElements = () => {
            var ul = document.createElement('ul');
            this.control.content.appendChild(ul);
            this.control.play = this.createElement(ul, 'a', { width: '40px' }, { className: 'play glyphicon glyphicon-play', title: '播放' });
            //this.control.stop = createElement(ul, "a", {}, { className: "stop glyphicon glyphicon-stop", title: "停止" });
            //this.control.pause = createElement(ul, "a", {}, { className: "pause glyphicon glyphicon-pause", title: "暂停" });
            this.control.slow = this.createElement(ul, 'a', {}, { className: 'slow glyphicon glyphicon-backward', title: '慢放' });
            this.control.fast = this.createElement(ul, 'a', {}, { className: 'fast glyphicon glyphicon-forward', title: '快进' });
            this.control.forward = this.createElement(ul, 'a', {}, { className: 'glyphicon glyphicon glyphicon-eject', title: '单帧进' });
            this.control.jump_back = this.createElement(ul, 'a', {}, { className: 'jump_back glyphicon glyphicon-share-alt', title: '退30秒' });
            this.control.jump_forward = this.createElement(ul, 'a', {}, {
                className: 'jump_forward glyphicon glyphicon-share-alt',
                title: '进30秒',
            });
            this.control.begin_time = this.createElement(ul, 'label', { width: '60px' }, {
                className: 'begin_time',
                innerText: '00:00:00',
                title: '当前时间',
            });
            this.control.position = this.createElement(ul, 'input', { width: 'calc(100% - 452px)', flexGrow: '1' }, {
                className: 'position',
                title: '00:00:00',
                type: 'range',
            });
            this.control.end_time = this.createElement(ul, 'label', { width: '60px' }, { className: 'end_time', title: '结束时间', innerText: '00:00:00' });
            this.control.fullscreen = this.createElement(ul, 'a', { float: 'right' }, { className: 'fullscreen glyphicon glyphicon-fullscreen', title: '全屏' });
            this.control.capturepicture = this.createElement(ul, 'a', { float: 'right' }, { className: 'capturepicture glyphicon glyphicon-picture', title: '截图' });
            this.control.rule = this.createElement(ul, 'a', { float: 'right' }, { className: 'rule howell-icon-garbage-target-off', title: '目标' });
            this.control.subtitle = this.createElement(ul, 'a', { float: 'right' }, { className: 'subtitle howell-icon-subtitles_off', title: '字幕' });
            if (this.mode == play_mode_enum_1.PlayMode.live) {
                //this.control.stop.style.display = "none";
                this.control.slow.style.display = 'none';
                this.control.fast.style.display = 'none';
                this.control.forward.style.display = 'none';
                this.control.jump_back.style.display = 'none';
                this.control.jump_forward.style.display = 'none';
                this.control.begin_time.style.display = 'none';
                this.control.position.style.display = 'none';
                this.control.end_time.style.display = 'none';
            }
            this.control.volume.icon = this.createElement(ul, 'a', { float: 'right' }, { className: 'volume glyphicon glyphicon-volume-off', title: '音量' });
            this.control.volume.panel = document.createElement('div');
            // volume_panel.style.display = "none";
            this.control.volume.panel.className = 'volume_panel';
            this.control.volume.panel.style.display = 'none';
            this.tools.appendChild(this.control.volume.panel);
            this.control.volume.slide = document.createElement('input');
            this.control.volume.slide.type = 'range';
            this.control.volume.slide.min = '0';
            this.control.volume.slide.max = '100';
            this.control.volume.slide.value = '0';
            this.control.volume.slide.style.backgroundSize = '0% 100%';
            this.control.volume.slide.step = '10';
            this.control.volume.panel.appendChild(this.control.volume.slide);
            this.registEvent();
        };
        this.element = element;
        this.mode = mode;
        this.tools = document.createElement('div');
        this.initTools();
    }
    initTools() {
        this.tools.className = 'tools';
        //tools.style.display = "none";
        this.element.appendChild(this.tools);
        this.control.content = document.createElement('div');
        this.control.content.className = 'tools-content';
        this.tools.appendChild(this.control.content);
    }
    createElement(ul, type, li_styles, ctr_params, ctr_styles) {
        var li = document.createElement('li');
        if (li_styles) {
            for (const key in li_styles) {
                li.style[key] = li_styles[key];
            }
        }
        ul.appendChild(li);
        var ctr = document.createElement(type);
        if (ctr_params) {
            for (const key in ctr_params) {
                // ctr.setAttribute(key, ctr_params[key])
                ctr[key] = ctr_params[key];
            }
        }
        if (ctr_styles) {
            for (const key in ctr_styles) {
                ctr.style[key] = ctr_styles[key];
            }
        }
        li.appendChild(ctr);
        return ctr;
    }
    destroy() {
        if (this.element && this.element.parentElement) {
            this.element.parentElement.removeChild(this.element);
        }
    }
    onSlideInput(ctr) {
        var value = (parseFloat(ctr.value) - parseFloat(ctr.min)) /
            (parseFloat(ctr.max) - parseFloat(ctr.min));
        var valStr = value * 100 + '% 100%';
        ctr.style.backgroundSize = valStr;
        ctr.title = '音量：' + value * 100 + '%';
        this.control.volume.icon.title = ctr.title;
        this.control.volume.value = parseInt(ctr.value);
        if (value == 0) {
            ctr.opened = false;
            this.control.volume.icon.className =
                'volume glyphicon glyphicon-volume-off';
        }
        else {
            ctr.opened = true;
            this.control.volume.icon.className =
                'volume glyphicon glyphicon-volume-up';
        }
    }
    registEvent() {
        this.control.volume.slide.addEventListener('input', (e) => {
            this.onSlideInput(this.control.volume.slide);
            if (this.event.control.volume.slide.input) {
                this.event.control.volume.slide.input(e);
            }
        });
        this.control.volume.icon.addEventListener('mouseover', () => {
            this.display = true;
            this.control.volume.panel.style.display = '';
        });
        this.control.volume.icon.addEventListener('click', (e) => {
            setTimeout(() => {
                if (this.control.volume.value == 0)
                    this.control.volume.value = 80;
                var value = this.control.volume.value;
                if (parseFloat(this.control.volume.slide.value) > 0) {
                    this.control.volume.slide.value = '0';
                }
                else {
                    this.control.volume.slide.value = this.control.volume.value.toString();
                }
                this.onSlideInput(this.control.volume.slide);
                this.control.volume.value = value;
            }, 10);
            if (this.event.control.volume.icon.click) {
                this.event.control.volume.icon.click(e);
            }
        });
        this.control.volume.icon.addEventListener('dblclick', () => {
            if (this.control.volume.value == 0)
                this.control.volume.value = 80;
            var value = this.control.volume.value;
            if (parseFloat(this.control.volume.slide.value) > 0) {
                this.control.volume.slide.value = '0';
            }
            else {
                this.control.volume.slide.value = this.control.volume.value.toString();
            }
            this.onSlideInput(this.control.volume.slide);
            this.control.volume.value = value;
            // if (this.opened) {
            //     this.control.volume.icon.className = "volume glyphicon glyphicon-volume-up";
            //     this.opened = true;
            //     if(this.value == 0)
            //     {
            //         this.value = this.control.volume.value;
            //     }
            // }
            // else {
            //     this.control.volume.icon.className = "volume glyphicon glyphicon-volume-off";
            //     this.opened = false;
            // }
        });
        this.control.volume.icon.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (this.display == false)
                    this.control.volume.panel.style.display = 'none';
            }, 100);
            this.display = false;
        });
        this.control.volume.panel.addEventListener('mouseleave', () => {
            setTimeout(() => {
                if (this.display === false)
                    this.control.volume.panel.style.display = 'none';
            }, 100);
            this.display = false;
        });
        this.control.volume.panel.addEventListener('mouseover', () => {
            this.display = true;
        });
        // var li_stop = document.createElement("li");
        // ul.appendChild(li_stop);
        // this.control.stop = document.createElement("a");
        // this.control.stop.className = "stop howell-icon-Square"
        // this.control.stop.style.display = "none";
        // li_stop.appendChild(this.control.stop);
        // var li_fullscreen = document.createElement("li");
        // li_fullscreen.style.float = "right";
        // ul.appendChild(li_fullscreen);
        // this.control.fullscreen = document.createElement("a");
        // this.control.fullscreen.className = "fullscreen glyphicon glyphicon-fullscreen"
        // li_fullscreen.appendChild(this.control.fullscreen);
        // this.control.play.addEventListener("click", function () {
        //     this.control.play.className = "play glyphicon glyphicon-pause";
        //     //this.control.pause.style.display = "";
        // });
        // this.control.pause.addEventListener("click", function () {
        //     this.control.play.style.display = "";
        //     this.control.pause.style.display = "none";
        // });
        if (this.control.position) {
            this.control.position.addEventListener('input', () => {
                let ctr = this.control.position;
                var value = (parseFloat(ctr.value) - parseFloat(ctr.min)) /
                    (parseFloat(ctr.max) - parseFloat(ctr.min));
                var valStr = value * 100 + '% 100%';
                ctr.style.backgroundSize = valStr;
            });
            this.control.position.addEventListener('mousemove', (e) => { });
        }
        if (this.control.play) {
            this.control.play.addEventListener('click', (e) => {
                if (this.event.control.play.click) {
                    this.event.control.play.click(e);
                }
            });
        }
        if (this.control.stop) {
            this.control.stop.addEventListener('click', (e) => {
                if (this.event.control.stop.click) {
                    this.event.control.stop.click(e);
                }
            });
        }
        if (this.control.fullscreen) {
            this.control.fullscreen.addEventListener('click', (e) => {
                if (this.event.control.fullscreen.click) {
                    this.event.control.fullscreen.click(e);
                }
            });
        }
        if (this.control.capturepicture) {
            this.control.capturepicture.addEventListener('click', (e) => {
                if (this.event.control.capturepicture.click) {
                    this.event.control.capturepicture.click(e);
                }
            });
        }
        if (this.control.slow) {
            this.control.slow.addEventListener('click', (e) => {
                if (this.event.control.slow.click) {
                    this.event.control.slow.click(e);
                }
            });
        }
        if (this.control.fast) {
            this.control.fast.addEventListener('click', (e) => {
                if (this.event.control.fast.click) {
                    this.event.control.fast.click(e);
                }
            });
        }
        if (this.control.forward) {
            this.control.forward.addEventListener('click', (e) => {
                if (this.event.control.forward.click) {
                    this.event.control.forward.click(e);
                }
            });
        }
        if (this.control.position) {
            this.control.position.addEventListener('mousedown', (e) => {
                if (this.event.control.position.mousedown) {
                    this.event.control.position.mousedown(e);
                }
            });
            this.control.position.addEventListener('mouseup', (e) => {
                if (this.event.control.position.mouseup) {
                    this.event.control.position.mouseup(e);
                }
            });
            this.control.position.addEventListener('mousemove', (e) => {
                if (this.event.control.position.mousemove) {
                    this.event.control.position.mousemove(e);
                }
            });
        }
        if (this.control.jump_back) {
            this.control.jump_back.addEventListener('click', (e) => {
                if (this.event.control.jump.back.click) {
                    this.event.control.jump.back.click(e);
                }
            });
        }
        if (this.control.jump_forward) {
            this.control.jump_forward.addEventListener('click', (e) => {
                if (this.event.control.jump.forward.click) {
                    this.event.control.jump.forward.click(e);
                }
            });
        }
        if (this.control.volume.slide) {
            this.control.volume.slide.addEventListener('input', (e) => {
                if (this.event.control.volume.slide.input) {
                    this.event.control.volume.slide.input(e.currentTarget);
                }
            });
        }
        if (this.control.rule) {
            this.control.rule.addEventListener('click', (e) => {
                this.event.control.rule.opened = !this.event.control.rule.opened;
                if (this.event.control.rule.opened) {
                    e.target.classList.remove('howell-icon-garbage-target-off');
                    e.target.classList.add('howell-icon-garbage-target-on');
                }
                else {
                    e.target.classList.remove('howell-icon-garbage-target-on');
                    e.target.classList.add('howell-icon-garbage-target-off');
                }
                if (this.event.control.rule.click) {
                    this.event.control.rule.click(e);
                }
            });
        }
        if (this.control.subtitle) {
            this.control.subtitle.addEventListener('click', (e) => {
                this.event.control.subtitle.opened = !this.event.control.subtitle.opened;
                if (!e.target)
                    return;
                let target = e.target;
                if (this.event.control.subtitle.opened) {
                    target.classList.remove('howell-icon-subtitles_off');
                    target.classList.add('howell-icon-subtitles');
                }
                else {
                    target.classList.remove('howell-icon-subtitles');
                    target.classList.add('howell-icon-subtitles_off');
                }
                if (this.event.control.subtitle.click) {
                    this.event.control.subtitle.click(e);
                }
            });
        }
    }
}
exports.WSPlayerTool = WSPlayerTool;


/***/ }),

/***/ 502:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerPlugin = void 0;
const event_emitter_1 = __webpack_require__(68);
class WSPlayerPlugin {
    constructor(args) {
        var _a;
        this.event = new event_emitter_1.EventEmitter();
        this.soundOpened = false;
        this.loaded = false;
        this.id = 'wsplayer_script';
        this.timeout = 10;
        this.args = {
            iCurrentSplit: 1,
            iHeight: args.height,
            iMaxSplit: 1,
            iType: 1,
            iWidth: args.width,
            szBasePath: args.path,
            szId: args.elementId,
        };
        this.path = args.path;
        if (args.loaded) {
            this.event.on('loaded', () => {
                if (args.loaded)
                    args.loaded();
            });
        }
        this.script =
            (_a = document.getElementById(this.id)) !== null && _a !== void 0 ? _a : undefined;
        this.init();
    }
    init() {
        if (!this.script) {
            this.script = document.createElement('script');
            this.script.type = 'text/javascript';
            this.script.src =
                this.path + 'jsPlugin-1.2.0.min.js?v=' + new Date().getTime();
            document.getElementsByTagName('head')[0].appendChild(this.script);
            this.script.onload = this.script.onreadystatechange = () => {
                this.plugin = new JSPlugin(this.args);
                this.event.emit('loaded');
                this.loaded = true;
            };
        }
        else {
            this.plugin = new JSPlugin(this.args);
            this.event.emit('loaded');
            this.loaded = true;
        }
    }
    load() { }
    wait() {
        return new Promise((resolve) => {
            let handle = setInterval(() => {
                if (this.plugin) {
                    resolve(0);
                    clearInterval(handle);
                }
            }, this.timeout);
        });
    }
    JS_Play(url, callabck) {
        return this.plugin.JS_Play(url, callabck, 0);
    }
    JS_GetWndStatus() {
        return this.plugin.JS_GetWndStatus(0);
    }
    JS_Resize(width, height) {
        return this.plugin.JS_Resize(width, height);
    }
    JS_OpenSound() {
        return this.plugin.JS_OpenSound(0);
    }
    JS_CloseSound() {
        return this.plugin.JS_CloseSound();
    }
    JS_GetVolume(value) {
        return this.plugin.JS_GetVolume(0, value);
    }
    JS_SetVolume(value) {
        return this.plugin.JS_SetVolume(0, value);
    }
    JS_Seek(value, callback) {
        return this.plugin.JS_Seek(0, value, callback);
    }
    JS_Fast() {
        return this.plugin.JS_Fast(0);
    }
    JS_Slow() {
        return this.plugin.JS_Slow(0);
    }
    JS_CapturePictureData() {
        return this.plugin.JS_CapturePictureData(0);
    }
    JS_Pause() {
        return this.plugin.JS_Pause(0);
    }
    JS_FrameForward() {
        return this.plugin.JS_FrameForward(0);
    }
    JS_Stop() {
        return this.plugin.JS_Stop(0);
    }
    JS_FullScreenSingle() {
        return this.plugin.JS_FullScreenSingle(0);
    }
    JS_Download(filename, type) {
        return this.plugin.JS_Download(filename, type);
    }
    JS_CapturePicture(name, type) {
        return this.plugin.JS_CapturePicture(0, name, type);
    }
    JS_Resume() {
        return this.plugin.JS_Resume(0);
    }
    JS_GetOSDTime() {
        return this.plugin.JS_GetOSDTime(0);
    }
}
exports.WSPlayerPlugin = WSPlayerPlugin;


/***/ }),

/***/ 68:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventEmitter = void 0;
class EventEmitter {
    constructor() {
        this.eventMap = {};
    }
    get keys() {
        let keys = [];
        for (const key in this.eventMap) {
            keys.push(key);
        }
        return keys;
    }
    // 添加对应事件的监听函数
    on(eventName, listener) {
        if (!this.eventMap[eventName]) {
            this.eventMap[eventName] = [];
        }
        this.eventMap[eventName].push(listener);
        return this;
    }
    // 触发事件
    emit(eventName, ...args) {
        const listeners = this.eventMap[eventName];
        if (!listeners || listeners.length === 0)
            return false;
        listeners.forEach((listener) => {
            listener(...args);
        });
        return true;
    }
    // 取消对应事件的监听
    off(eventName, listener) {
        const listeners = this.eventMap[eventName];
        if (listeners && listeners.length > 0) {
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
        return this;
    }
}
exports.EventEmitter = EventEmitter;


/***/ }),

/***/ 831:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.wait = void 0;
function wait(whether, reject, timeout = 100) {
    setTimeout(() => {
        if (whether()) {
            reject();
        }
        else {
            wait(whether, reject, timeout);
        }
    }, timeout);
}
exports.wait = wait;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
const play_mode_enum_1 = __webpack_require__(353);
const player_state_enum_1 = __webpack_require__(73);
const private_rule_list_model_1 = __webpack_require__(309);
const private_target_list_model_1 = __webpack_require__(134);
const ws_player_args_model_1 = __webpack_require__(297);
const player_subtitle_1 = __webpack_require__(626);
const player_tool_1 = __webpack_require__(30);
const plugin_1 = __webpack_require__(502);
const wait_1 = __webpack_require__(831);
class WSPlayer {
    constructor(args) {
        this.url = '';
        this.soundOpened = false;
        this.volume = 0;
        this.outsidefullscreen = false;
        this.clientWidth = 0;
        this.clientHeight = 0;
        this.title = '';
        this.name = '';
        this.playback_time = {};
        this.subtitle = new player_subtitle_1.WSPlayerSubtitle();
        this._status = player_state_enum_1.PlayerState.ready;
        this.args = new ws_player_args_model_1.WSPlayerArgs();
        this.loaded = false;
        this._fullScreen = false;
        this.timeout = 10;
        this.getCapturePictureData = () => {
            return this.plugin.JS_CapturePictureData();
            // var promise = plugin.JS_CapturePictureData(0)
            // promise.then((data) => {
            //   if (this.onCapturePicture) {
            //     this.onCapturePicture(data);
            //   }
            // });
        };
        this.closeSound = () => {
            this.doing(() => {
                if (!this.soundOpened)
                    return;
                this.plugin.JS_CloseSound();
                this.soundOpened = false;
            });
        };
        Object.assign(this.args, args);
        if (args.url) {
            if (args.url.indexOf('vod') > 0) {
                args.mode = play_mode_enum_1.PlayMode.vod;
            }
        }
        this.url = args.url;
        this.loadPlugin();
        this.initElement(args.elementId);
        this.plugin = new plugin_1.WSPlayerPlugin({
            width: this.args.width,
            height: this.args.height,
            path: this.args.path,
            elementId: this.args.elementId,
        });
        this.regist();
        this.check();
    }
    get PlayMode() {
        return this.args.mode;
    }
    get FullScreen() {
        return !!(document.fullscreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen ||
            document.webkitFullScreen ||
            document.msFullScreen);
    }
    set FullScreen(v) {
        this._fullScreen = v;
        var display = '';
        if (this._fullScreen)
            display = 'block';
        if (this.tools) {
            this.tools.control.content.style.display = display;
        }
    }
    get status() {
        return this._status;
    }
    set status(v) {
        if (this._status == v)
            return;
        this._status = v;
        Promise.resolve().then(() => {
            if (this.onStatusChanged) {
                this.onStatusChanged(this._status);
            }
        });
    }
    regist() {
        this.plugin.event.on('loaded', this.onPluginLoaded.bind(this));
    }
    initSubtitle() {
        this.subtitle.appendElement(this.element);
    }
    loadPlugin() {
        let ss = document.getElementsByTagName('script');
        for (let i = 0; i < ss.length; i++) {
            var index = 0;
            if ((index = ss[i].src.toLowerCase().lastIndexOf('wsplayer.js')) > 0) {
                this.args.path = ss[i].src.substr(0, index) + 'codebase/';
                break;
            }
        }
    }
    initElement(elementId) {
        this.element = document.getElementById(elementId);
        if (this.element) {
            this.element.style.backgroundColor = 'transparent';
            this.clientWidth = this.element.offsetWidth;
            this.clientHeight = this.element.offsetHeight;
        }
        this.sizeHandle = setInterval(() => {
            if (this.clientWidth > 0 && this.clientHeight > 0) {
                clearInterval(this.sizeHandle);
                return;
            }
            if (this.element) {
                this.clientWidth = this.element.offsetWidth;
                this.clientHeight = this.element.offsetHeight;
            }
        }, 100);
        var body = document.getElementsByTagName('body')[0];
        body.addEventListener('click', () => {
            if (this.onViewerClicked) {
                this.onViewerClicked();
            }
        });
    }
    initTools() {
        if (this.tools && this.tools.control) {
            this.volume = this.tools.control.volume.value;
        }
        this.tools = new player_tool_1.WSPlayerTool(this.element, this.PlayMode);
        this.tools.createElements();
        this.tools.control.volume.value = this.volume;
        this.tools.event.control.play.click = () => {
            switch (this.status) {
                case player_state_enum_1.PlayerState.ready:
                    this.play();
                    this.buttonClick('play');
                    break;
                case player_state_enum_1.PlayerState.end:
                    this.seek(0);
                    this.resume();
                    this.buttonClick('resume');
                    break;
                case player_state_enum_1.PlayerState.fast:
                case player_state_enum_1.PlayerState.slow:
                    //this.play();
                    this.speedResume();
                    this.buttonClick('resume');
                    break;
                case player_state_enum_1.PlayerState.pause:
                case player_state_enum_1.PlayerState.frame:
                    this.resume();
                    this.buttonClick('resume');
                    break;
                case player_state_enum_1.PlayerState.playing:
                    if (this.args.mode == play_mode_enum_1.PlayMode.vod) {
                        this.pause();
                        this.buttonClick('pause');
                    }
                    else {
                        this.stop();
                        this.buttonClick('stop');
                    }
                    break;
                default:
                    break;
            }
        };
        this.tools.event.control.stop.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            this.stop();
            this.buttonClick('stop');
        };
        this.tools.event.control.fullscreen.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            if (this.FullScreen) {
                this.fullExit();
            }
            else {
                this.fullScreen();
            }
            this.buttonClick('fullscreen');
        };
        this.tools.event.control.capturepicture.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            this.capturePicture();
            this.buttonClick('capturepicture');
        };
        this.tools.event.control.slow.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            this.slow();
            this.buttonClick('slow');
        };
        this.tools.event.control.fast.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            this.fast();
            this.buttonClick('fast');
        };
        this.tools.event.control.forward.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            debugger;
            this.frame();
            this.buttonClick('forward');
        };
        this.tools.event.control.position.mousedown = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            this.pause();
            if (this.tools) {
                this.tools.control.isMoudseDown = true;
            }
        };
        this.tools.event.control.position.mouseup = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            if (!this.tools)
                return;
            this.tools.control.isMoudseDown = false;
            let ctr = this.tools.control.position;
            var value = parseFloat(ctr.value) - parseFloat(ctr.min);
            this.seek(value);
            this.resume();
        };
        this.tools.event.control.position.mousemove = (evt) => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            if (!this.tools)
                return;
            if (!evt)
                return;
            var width = evt.target.offsetWidth;
            var x = evt.offsetX;
            var p = x / width;
            var c = parseFloat(this.tools.control.position.max) -
                parseFloat(this.tools.control.position.min);
            var current = c * p;
            if (current < 0)
                current = 0;
            var date = new Date(current);
            date.setUTCHours(date.getUTCHours() - 8);
            this.title = date.format('HH:mm:ss');
            if (this.tools.control.isMoudseDown)
                this.tools.control.begin_time.innerText = date.format('HH:mm:ss');
        };
        this.tools.event.control.jump.back.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            if (!this.tools)
                return;
            if (this.playback_time.current) {
                var date = new Date(this.playback_time.current.getTime());
                date.setSeconds(date.getSeconds() - 30);
                var value = date.getTime() - parseFloat(this.tools.control.position.min);
                if (value <= 0)
                    value = 0;
                this.seek(value);
            }
            this.buttonClick('jump_back');
        };
        this.tools.event.control.jump.forward.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            if (!this.tools)
                return;
            if (this.playback_time.current) {
                var date = new Date(this.playback_time.current.getTime());
                date.setSeconds(date.getSeconds() + 30);
                var value = date.getTime() - parseFloat(this.tools.control.position.min);
                if (value >= parseFloat(this.tools.control.position.max))
                    return;
                this.seek(value);
            }
            this.buttonClick('jump_forward');
        };
        this.tools.event.control.volume.icon.click = () => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            if (this.soundOpened) {
                this.closeSound();
            }
            else {
                this.openSound();
            }
            //this.tools.control.volume.value = this.value;
            this.buttonClick('volume');
        };
        this.tools.event.control.volume.slide.input = (e) => {
            if (this.status == player_state_enum_1.PlayerState.ready)
                return;
            var value = parseInt(e.value);
            if (value > 0) {
                this.openSound();
            }
            else {
                this.closeSound();
            }
            this.setVolume(value);
            if (this.tools) {
                this.tools.control.volume.value = value;
            }
        };
        this.tools.event.control.rule.click = (e) => {
            this.buttonClick('rule');
            if (this.onRuleStateChanged) {
                if (this.tools) {
                    this.onRuleStateChanged(this.tools.event.control.rule.opened);
                }
            }
        };
        this.tools.event.control.subtitle.click = (e) => {
            this.buttonClick('subtitle');
            this.subtitle.set('');
            if (this.tools) {
                this.subtitle.enabled = this.tools.event.control.subtitle.opened;
            }
            if (this.onSubtitleEnableChanged) {
                this.onSubtitleEnableChanged(this.subtitle.enabled);
            }
        };
        var p = this.element.getElementsByClassName('parent-wnd')[0];
        p.addEventListener('dblclick', () => {
            console.log('dblclick');
            try {
                if (this.onViewerDoubleClicked) {
                    this.onViewerDoubleClicked();
                }
            }
            catch (ex) {
                console.error(ex);
            }
            if (this.FullScreen) {
                this.fullExit();
            }
            else {
                this.fullScreen();
            }
        });
        document.addEventListener('fullscreenchange', (e) => {
            console.log('window fullscreenchange');
            console.log(e);
            this.plugin.JS_Resize(window.screen.width, window.screen.height);
        });
        document.addEventListener('webkitfullscreenchange', (e) => {
            if (!window.screens) {
                window.screens = {};
            }
            let target = e.target || (e.path ? e.path[0] : undefined);
            if (target) {
                if (!target.fullscreennumber)
                    target.fullscreennumber = 1;
                target.fullscreennumber++;
                if (this.outsidefullscreen) {
                    target.fullscreennumber++;
                    this.outsidefullscreen = false;
                }
                var id = target.id;
                window.screens[id] =
                    target.fullscreennumber % 2 == 0 || document.fullscreen;
                setTimeout(() => {
                    if (window.screens[id]) {
                        var scale = 1 / this.getRatio();
                        console.log(window.screen.height);
                        this.plugin.JS_Resize(window.screen.width * scale, window.screen.height * scale);
                        if (this.tools) {
                            this.tools.control.fullscreen.title = '退出';
                        }
                    }
                    else {
                        this.FullScreen = false;
                        this.plugin.JS_Resize(this.clientWidth, this.clientHeight);
                        if (this.tools) {
                            this.tools.control.fullscreen.title = '全屏';
                        }
                    }
                    console.log('fullscreenchange id:' + id);
                }, 200);
            }
        });
        document.addEventListener('mozfullscreenchange', () => {
            console.log('mozfullscreenchange');
        });
        document.addEventListener('MSFullscreenChange', () => {
            console.log('MSFullscreenChange');
        });
        document.addEventListener('visibilitychange', () => {
            try {
                if (document.visibilityState == 'visible') {
                    if (this.PlayMode == 'vod') {
                        this.resume();
                    }
                    else {
                        this.play();
                    }
                }
                if (document.visibilityState == 'hidden') {
                    if (this.PlayMode == 'vod') {
                        this.pause();
                    }
                    else {
                        try {
                            this.stop(false);
                        }
                        catch (ex) {
                            console.warn(ex);
                        }
                    }
                }
            }
            finally {
                console.log(document.visibilityState + ':', this.status);
            }
        });
    }
    onPluginLoaded() {
        this.initTools();
        this.initSubtitle();
        this.loaded = true;
    }
    check() {
        setInterval(() => {
            this.checkControl();
            // this.checkFullscreen()
        }, 10);
    }
    checkFullscreen() {
        if (this.FullScreen) {
            this.resize();
        }
        else {
            this.resize(this.clientWidth, this.clientHeight);
        }
    }
    checkControl() {
        if (!this.tools || !this.tools.control.play)
            return;
        switch (this.status) {
            case player_state_enum_1.PlayerState.pause:
            case player_state_enum_1.PlayerState.slow:
            case player_state_enum_1.PlayerState.fast:
            case player_state_enum_1.PlayerState.end:
            case player_state_enum_1.PlayerState.frame:
                this.tools.control.play.className = 'play glyphicon glyphicon-play';
                this.tools.control.play.title = '播放';
                break;
            case player_state_enum_1.PlayerState.playing:
                if (this.PlayMode == play_mode_enum_1.PlayMode.vod) {
                    this.tools.control.play.className = 'play glyphicon glyphicon-pause';
                    this.tools.control.play.title = '暂停';
                }
                else {
                    this.tools.control.play.className = 'play glyphicon glyphicon-stop';
                    this.tools.control.play.title = '停止';
                }
                break;
            default:
                break;
        }
    }
    getStatus() {
        return this.plugin.JS_GetWndStatus();
    }
    clearMediaPrivateData() {
        try {
            if (this.element) {
                let canvas = this.element.querySelector('.draw-window');
                if (canvas) {
                    let ctx = canvas.getContext('2d');
                    let width = canvas.offsetWidth;
                    let height = canvas.offsetHeight;
                    ctx.clearRect(0, 0, width, height);
                }
            }
        }
        catch (ex) {
            console.error(ex);
        }
    }
    loadPrivateTargetList(dataview, offset) {
        this.clearMediaPrivateData();
        let list = private_target_list_model_1.PrivateTargetList.load(dataview, offset);
        if (this.element) {
            let canvas = this.element.querySelector('.draw-window');
            let ctx = canvas.getContext('2d');
            let width = canvas.offsetWidth;
            let height = canvas.offsetHeight;
            ctx.beginPath();
            for (let i = 0; i < list.Target.length; i++) {
                const target = list.Target[i];
                let countX = 0.0;
                let countY = 0.0;
                target.Point.forEach((x) => {
                    countX += x.X;
                    countY += x.Y;
                });
                let centerX = countX / target.Point.length;
                let centerY = countY / target.Point.length;
                for (let j = 0; j < target.Point.length; j++) {
                    const point = target.Point[j];
                    let x = point.X * width;
                    let y = point.Y * height;
                    let v = Math.abs(centerX - point.X) * 200;
                    let h = Math.abs(centerY - point.Y) * 200;
                    let a = (v + h) / 2;
                    ctx.moveTo(x, y);
                    if (point.X <= centerX) {
                        ctx.lineTo(x + a, y);
                    }
                    else {
                        ctx.lineTo(x - a, y);
                    }
                    ctx.moveTo(x, y);
                    if (point.Y <= centerY) {
                        ctx.lineTo(x, y + a);
                    }
                    else {
                        ctx.lineTo(x, y - a);
                    }
                }
            }
            ctx.lineWidth = 2;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'red';
            ctx.shadowBlur = 3;
            ctx.shadowColor = 'black';
            ctx.stroke();
        }
    }
    loadPrivateRuleList(dataview, offset) {
        this.clearMediaPrivateData();
        let list = private_rule_list_model_1.PrivateRuleList.load(dataview, offset);
        if (this.element) {
            let canvas = this.element.querySelector('.draw-window');
            let ctx = canvas.getContext('2d');
            let width = canvas.offsetWidth;
            let height = canvas.offsetHeight;
            for (let i = 0; i < list.Rule.length; i++) {
                const rule = list.Rule[i];
                ctx.beginPath();
                for (let j = 0; j < rule.Point.length; j++) {
                    const point = rule.Point[j];
                    if (j == 0) {
                        ctx.moveTo(rule.Point[j].X * width, rule.Point[j].Y * height);
                    }
                    else {
                        ctx.lineTo(rule.Point[j].X * width, rule.Point[j].Y * height);
                    }
                }
                ctx.lineTo(rule.Point[0].X * width, rule.Point[0].Y * height);
            }
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.stroke();
        }
    }
    doing(fn, args) {
        (0, wait_1.wait)(() => {
            return this.plugin && this.loaded;
        }, () => {
            fn(args);
        });
        // setTimeout(() => {
        //   if (!this.plugin || this.loaded === false) {
        //     this.doing(fn, args)
        //     return
        //   }
        //   fn(args)
        // }, this.timeout)
    }
    // 播放
    play() {
        console.log('status:', this.status);
        this.status = player_state_enum_1.PlayerState.opening;
        this.clearMediaPrivateData();
        if (this.element) {
            this.element.className += ' loading';
        }
        let m_begin = this.url.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
        let begin, end;
        if (m_begin) {
            let i_begin = m_begin.splice(0).map((x) => parseInt(x));
            begin = new Date(i_begin[1], i_begin[2] - 1, i_begin[3], i_begin[4], i_begin[5], i_begin[6]);
            begin.setUTCHours(begin.getUTCHours() + 8);
            this.playback_time.begin = begin;
            this.args.mode = play_mode_enum_1.PlayMode.vod;
        }
        var m_end = this.url.match(/_(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
        if (m_end) {
            let i_end = m_end.splice(0).map((x) => parseInt(x));
            end = new Date(i_end[1], i_end[2] - 1, i_end[3], i_end[4], i_end[5], i_end[6]);
            end.setUTCHours(end.getUTCHours() + 8);
            this.playback_time.end = end;
        }
        if (!m_begin && !m_end)
            this.args.mode = play_mode_enum_1.PlayMode.live;
        this.doing((args) => {
            var t = this.element.getElementsByClassName('tools');
            if (!t || !t[0]) {
                this.initTools();
            }
            let tools = this.element.querySelector('.tools');
            tools.style.display = 'none';
            this.plugin
                .JS_Play(this.url, {
                isPlayback: this.PlayMode === play_mode_enum_1.PlayMode.vod,
                onDebug: (debug) => {
                    console.log(debug);
                },
                onPlaying: () => {
                    this.element.classList.remove('loading');
                    switch (this.status) {
                        case player_state_enum_1.PlayerState.pause:
                        case player_state_enum_1.PlayerState.frame:
                            break;
                        default:
                            this.status = player_state_enum_1.PlayerState.playing;
                            break;
                    }
                    tools.style.display = '';
                    if (this.onPlaying) {
                        this.onPlaying();
                    }
                },
                getPosition: (p) => {
                    if (p.data) {
                        var u8array = new Uint8Array(p.data);
                        // 2020-02-22T10:11:22Z
                        // 01234567890123456789
                        var year = parseInt(this.Uint8ArrayToString(u8array.slice(0, 4)));
                        var month = parseInt(this.Uint8ArrayToString(u8array.slice(5, 7)));
                        var day = parseInt(this.Uint8ArrayToString(u8array.slice(8, 10)));
                        var hour = parseInt(this.Uint8ArrayToString(u8array.slice(11, 13)));
                        var minute = parseInt(this.Uint8ArrayToString(u8array.slice(14, 16)));
                        var second = parseInt(this.Uint8ArrayToString(u8array.slice(17, 19)));
                        this.playback_time.current = new Date(year, month - 1, day, hour, minute, second);
                        if (Number.isNaN(this.playback_time.current.getTime())) {
                            return;
                        }
                        this.playback_time.current.setUTCHours(this.playback_time.current.getUTCHours() + 8);
                        if (!this.tools)
                            return;
                        this.tools.control.position.value = this.playback_time.current
                            .getTime()
                            .toString();
                        var current = new Date(parseFloat(this.tools.control.position.value) -
                            parseFloat(this.tools.control.position.min));
                        current.setUTCHours(current.getUTCHours() - 8);
                        this.tools.control.begin_time.innerText =
                            current.format('HH:mm:ss');
                        // this.tools.control.position.title = current.format("HH:mm:ss");
                        var val = (this.playback_time.current.getTime() -
                            parseFloat(this.tools.control.position.min)) /
                            (parseFloat(this.tools.control.position.max) -
                                parseFloat(this.tools.control.position.min));
                        if (this.tools.control.position.max &&
                            this.tools.control.position.min &&
                            val >= 1) {
                            this.stop();
                        }
                        var valStr = val * 100 + '% 100%';
                        this.tools.control.position.style.backgroundSize = valStr;
                        Promise.resolve().then(() => {
                            if (this.getPosition) {
                                this.getPosition(val);
                            }
                        });
                        Promise.resolve().then(() => {
                            if (this.getTimer &&
                                this.tools &&
                                this.playback_time.current) {
                                let time = {
                                    current: this.playback_time.current.getTime(),
                                    min: parseFloat(this.tools.control.position.min),
                                    max: parseFloat(this.tools.control.position.max),
                                };
                                this.getTimer(time);
                            }
                        });
                        //this.status = p.offset + 1 >= p.count ? this.status = PlayerState.end : this.status = PlayerState.playing;
                    }
                },
                readMediaPrivateData: (data) => {
                    let draw_target = false;
                    try {
                        if (this.tools &&
                            this.tools.event.control.rule.opened === false) {
                            return draw_target;
                        }
                        var dataview = new DataView(data);
                        // 开始标记，默认是：0x5052495648570001
                        let programStreamPacket = [0x00, 0x00, 0x01, 0xba];
                        let pesPacket = [0x00, 0x00, 0x01, 0xbf];
                        let flags = [0x50, 0x52, 0x49, 0x56, 0x48, 0x57, 0x00, 0x01];
                        let offset = 0;
                        for (let i = 0; i < programStreamPacket.length; i++) {
                            var item = dataview.getUint8(offset++);
                            let packet = programStreamPacket[i];
                            if (packet != item) {
                                return draw_target;
                            }
                        }
                        offset += 10;
                        for (let i = 0; i < pesPacket.length; i++) {
                            var item = dataview.getUint8(offset++);
                            let packet = pesPacket[i];
                            if (packet != item) {
                                return draw_target;
                            }
                        }
                        offset += 2;
                        for (let i = offset; i < flags.length; i++) {
                            var item = dataview.getUint8(offset + flags.length - i);
                            if (flags[i] != item) {
                                console.log(i, flags[i], item);
                                return draw_target;
                            }
                        }
                        offset += flags.length;
                        let type = dataview.getInt32(offset, true);
                        offset += 4;
                        switch (type) {
                            case 1:
                                ;
                                ((dataview, offset) => {
                                    setTimeout(() => {
                                        this.loadPrivateTargetList(dataview, offset);
                                    }, 0);
                                })(dataview, offset);
                                draw_target = true;
                                break;
                            case 2:
                                // loadPrivateRuleList(dataview, offset);
                                break;
                            default:
                                break;
                        }
                    }
                    finally {
                        if (draw_target) {
                            if (this.clearMediaPrivateDataHandle) {
                                clearTimeout(this.clearMediaPrivateDataHandle);
                                this.clearMediaPrivateDataHandle = undefined;
                            }
                        }
                        else {
                            if (!this.clearMediaPrivateDataHandle) {
                                this.clearMediaPrivateDataHandle = setTimeout(() => {
                                    this.clearMediaPrivateData();
                                    this.clearMediaPrivateDataHandle = undefined;
                                }, 500);
                            }
                        }
                    }
                },
            })
                .then(() => {
                Promise.resolve().then(() => {
                    if (this.onPlaying) {
                        try {
                            this.onPlaying();
                        }
                        catch (ex) {
                            console.error(ex);
                        }
                    }
                });
                if (this.soundOpened) {
                    var openSound = () => {
                        setTimeout(() => {
                            if (this.status == player_state_enum_1.PlayerState.playing) {
                                setTimeout(() => {
                                    this.plugin.JS_OpenSound();
                                    console.warn('sound');
                                }, 500 * 3);
                            }
                            else {
                                openSound();
                            }
                        }, 100);
                    };
                    openSound();
                }
            });
            if (!this.tools)
                return;
            if (this.tools.control.begin_time && this.playback_time.begin) {
                this.tools.control.begin_time.innerText = '00:00:00';
            }
            if (this.tools &&
                this.tools.control.end_time &&
                this.playback_time.end &&
                this.playback_time.begin) {
                var date = new Date(this.playback_time.end.getTime() -
                    this.playback_time.begin.getTime());
                date.setUTCHours(date.getUTCHours() - 8);
                this.tools.control.end_time.innerText = date.format('HH:mm:ss');
            }
            if (this.tools.control.position) {
                if (this.playback_time.begin)
                    this.tools.control.position.min = this.playback_time.begin
                        .getTime()
                        .toString();
                if (this.playback_time.end)
                    this.tools.control.position.max = this.playback_time.end
                        .getTime()
                        .toString();
                console.log('interval:', parseFloat(this.tools.control.position.max) -
                    parseFloat(this.tools.control.position.min));
            }
        }, {
            begin: this.playback_time.begin
                ? this.playback_time.begin.toISOString()
                : undefined,
            end: this.playback_time.end
                ? this.playback_time.end.toISOString()
                : undefined,
        });
    }
    Uint8ArrayToString(data) {
        var dataString = '';
        for (var i = 0; i < data.length; i++) {
            dataString += String.fromCharCode(data[i]);
        }
        return dataString;
    }
    seek(value) {
        this.doing(() => {
            console.log('seek:' + value);
            this.plugin.JS_Seek(value / 1000, {
                pause: () => {
                    if (!this.element.classList.contains('loading')) {
                        this.element.classList.add('loading');
                    }
                },
                resume: () => {
                    if (this.element.classList.contains('loading')) {
                        this.element.classList.remove('loading');
                    }
                },
            });
        });
    }
    // 快进
    fast() {
        var status = this.getStatus();
        console.log(status);
        if (typeof status === 'number')
            return;
        if (status.iRate >= 4)
            return;
        this.doing(() => {
            this.plugin.JS_Fast();
        });
        if (status.iRate > 1)
            this.status = player_state_enum_1.PlayerState.fast;
    }
    // 慢放
    slow() {
        var status = this.getStatus();
        console.log(status);
        if (typeof status === 'number')
            return;
        if (status.iRate <= -4)
            return;
        this.doing(() => {
            this.plugin.JS_Slow();
        });
        if (status.iRate < 1)
            this.status = player_state_enum_1.PlayerState.slow;
    }
    // 截图
    capturePicture() {
        //"ws://192.168.21.241:8800/ws/video/howellps/vod/dev_id/slot/stream/begin_end/vod.mp4?user=howell&password=123456";
        this.doing(() => {
            var name = 'picture';
            var name = this.name;
            if (!name && this.url) {
                name = this.url;
                var begin = name.indexOf(this.args.mode) + this.args.mode.length + 1;
                var end = name.lastIndexOf(this.args.mode) - 1;
                name = name.substr(begin, end - begin);
                name = name.replace(/\//g, '_');
            }
            var date = new Date();
            if (this.playback_time.current) {
                date = this.playback_time.current;
            }
            var v;
            name += '_' + date.getFullYear();
            name += '_' + ((v = date.getMonth() + 1) < 10 ? '0' + v : v);
            name += '_' + ((v = date.getDate()) < 10 ? '0' + v : v);
            name += '_' + ((v = date.getHours()) < 10 ? '0' + v : v);
            name += '_' + ((v = date.getMinutes()) < 10 ? '0' + v : v);
            name += '_' + ((v = date.getSeconds()) < 10 ? '0' + v : v);
            this.plugin.JS_CapturePicture(name, 'JPEG');
        });
    }
    buttonClick(btn) {
        Promise.resolve().then(() => {
            try {
                if (this.onButtonClicked) {
                    this.onButtonClicked(btn);
                }
            }
            catch (ex) {
                console.error(ex);
            }
        });
    }
    // 暂停
    pause() {
        this.doing(() => {
            this.plugin.JS_Pause();
        });
        this.status = player_state_enum_1.PlayerState.pause;
        this.clearMediaPrivateData();
    }
    speedResume() {
        this.doing(() => {
            var status = this.getStatus();
            if (typeof status === 'number')
                return;
            if (status.iRate > 1) {
                this.slow();
                setTimeout(() => {
                    this.speedResume();
                }, 10);
            }
            else if (status.iRate < 1) {
                this.fast();
                setTimeout(() => {
                    this.speedResume();
                }, 10);
            }
            else {
                this.status = player_state_enum_1.PlayerState.playing;
            }
        });
    }
    // 恢复
    resume() {
        this.element.className += ' loading';
        this.doing(() => {
            this.plugin.JS_Resume();
        });
        this.status = player_state_enum_1.PlayerState.playing;
    }
    // 单帧
    frame() {
        this.doing(() => {
            this.plugin.JS_FrameForward();
        });
        this.status = player_state_enum_1.PlayerState.frame;
    }
    // 停止
    stop(message = true) {
        if (this.waitStopHandle)
            throw new Error('waiting for stop');
        if (this.element) {
            this.element.classList.remove('loading');
        }
        if (this.FullScreen) {
            this.fullExit();
        }
        this.clearMediaPrivateData();
        this.soundOpened = false;
        if (!this.plugin)
            return;
        switch (this.status) {
            case player_state_enum_1.PlayerState.closing:
            case player_state_enum_1.PlayerState.closed:
                return;
            default:
                break;
        }
        console.log('stop');
        try {
            return this.plugin
                .JS_Stop()
                .then(() => {
                this.status = player_state_enum_1.PlayerState.closed;
                var tools = this.element.getElementsByClassName('tools');
                if (tools && tools[0]) {
                    this.element.removeChild(tools[0]);
                    this.tools = undefined;
                }
            })
                .catch((ex) => {
                this.status = player_state_enum_1.PlayerState.closed;
                var tools = this.element.getElementsByClassName('tools');
                if (tools && tools[0]) {
                    this.element.removeChild(tools[0]);
                    this.tools = undefined;
                }
            })
                .finally(() => {
                {
                    this.waitStopHandle = setTimeout(() => {
                        this.waitStopHandle = undefined;
                    }, 1500);
                }
            });
        }
        finally {
            if (message) {
                Promise.resolve().then(() => {
                    if (this.onStoping)
                        this.onStoping();
                });
            }
        }
    }
    // 全屏
    fullScreen() {
        this.doing(() => {
            try {
                this.plugin.JS_FullScreenSingle();
            }
            catch (ex) {
                console.error(ex);
            }
            //plugin.JS_FullScreen(0);
            // plugin.JS_Resize(window.screen.width, window.screen.height);
            this.resize(window.screen.width, window.screen.height);
            this.FullScreen = true;
        });
    }
    resize(width, height) {
        if (!width)
            width = this.clientWidth;
        if (!height)
            height = this.clientHeight;
        this.doing((args) => {
            var scale = 1 / this.getRatio();
            this.plugin.JS_Resize(args.width * scale, args.height * scale);
        }, {
            width: width,
            height: height,
        });
    }
    _resize() {
        var handle = setInterval(() => {
            var scale = 1 / this.getRatio();
            if (this.FullScreen && !document.fullscreen) {
                this.FullScreen = false;
                this.plugin.JS_Resize(this.clientWidth, this.clientHeight);
                clearInterval(handle);
                if (this.tools) {
                    this.tools.control.fullscreen.title = '全屏';
                }
            }
            else if (this.FullScreen == false) {
                this.FullScreen = true;
                this.plugin.JS_Resize(window.screen.width * scale, window.screen.height * scale);
                if (this.tools) {
                    this.tools.control.fullscreen.title = '退出';
                }
            }
            else {
            }
        }, 200);
    }
    fullExit() {
        var element = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
        //IE ActiveXObject
        if (window.ActiveXObject) {
            var WsShell = new ActiveXObject('WScript.Shell');
            WsShell.SendKeys('{ESC}');
        }
        //HTML5 W3C 提议
        else if (element.requestFullScreen) {
            document.exitFullscreen();
        }
        //IE 11
        else if (element.msRequestFullscreen) {
            document.msExitFullscreen();
        }
        // Webkit (works in Safari5.1 and Chrome 15)
        else if (element.webkitRequestFullScreen) {
            document.webkitCancelFullScreen();
        }
        // Firefox (works in nightly)
        else if (element.mozRequestFullScreen) {
            document.mozCancelFullScreen();
        }
        this.resize(this.clientWidth, this.clientHeight);
    }
    getRatio() {
        var ratio = 0;
        var screen = window.screen;
        var ua = navigator.userAgent.toLowerCase();
        if (window.devicePixelRatio !== undefined) {
            ratio = window.devicePixelRatio;
        }
        else if (~ua.indexOf('msie')) {
            if (screen.deviceXDPI && screen.logicalXDPI) {
                ratio = screen.deviceXDPI / screen.logicalXDPI;
            }
        }
        else if (window.outerWidth !== undefined &&
            window.innerWidth !== undefined) {
            ratio = window.outerWidth / window.innerWidth;
        }
        else {
        }
        return ratio;
    }
    download(filename, type) {
        if (this.args.mode == play_mode_enum_1.PlayMode.vod)
            this.doing((args) => {
                this.plugin.JS_Download(args.filename, args.type);
            }, { filename: filename, type: type });
    }
    openSound() {
        this.doing(() => {
            if (this.soundOpened)
                return;
            this.plugin.JS_OpenSound();
            this.soundOpened = true;
        });
    }
    getVolume() {
        return new Promise((resolve) => {
            let result = 0;
            this.doing(() => {
                this.plugin.JS_GetVolume(result);
                resolve(result);
            });
        });
    }
    setVolume(value) {
        this.doing((value) => {
            this.plugin.JS_SetVolume(value);
            this.volume = value;
        }, value);
    }
    changeRuleState(value) {
        if (this.tools && this.tools.control.rule) {
            if (this.tools.event.control.rule.opened != value) {
                this.tools.control.rule.click();
            }
        }
    }
    subtitleEnabled(value) {
        if (this.tools && this.tools.control.subtitle) {
            if (this.tools.event.control.subtitle.opened != value) {
                this.tools.control.subtitle.click();
            }
        }
    }
    getOSDTime() {
        return new Promise((resolve) => {
            this.doing(() => {
                this.plugin.JS_GetOSDTime().then((time) => {
                    resolve(time);
                });
            });
        });
    }
}
__webpack_unused_export__ = WSPlayer;
window.WSPlayer = WSPlayer;

})();

/******/ })()
;
//# sourceMappingURL=WSPlayer.js.map