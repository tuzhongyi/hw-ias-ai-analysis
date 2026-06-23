/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 9675:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerController = void 0;
const event_emitter_1 = __webpack_require__(882);
const player_screen_controller_1 = __webpack_require__(6048);
const player_sound_controller_1 = __webpack_require__(4496);
const player_video_controller_1 = __webpack_require__(4480);
class WSPlayerController {
    constructor(storage, controls, getplugin) {
        this.event = {
            video: new event_emitter_1.EventEmitter(),
            screen: new event_emitter_1.EventEmitter(),
        };
        this.sound = new player_sound_controller_1.WSPlayerSoundController(controls, getplugin);
        this.video = new player_video_controller_1.WSPlayerVideoController(storage, controls, getplugin);
        this.screen = new player_screen_controller_1.WSPlayerScreenController(storage, getplugin);
        this.regist();
    }
    regist() {
        this.registvideo();
        this.registscreen();
    }
    registvideo() {
        this.video.event.on('playing', () => {
            this.event.video.emit('playing');
        });
        this.video.event.on('stoping', () => {
            this.event.video.emit('stoping');
        });
        this.video.event.on('position', (value) => {
            this.event.video.emit('position', value);
        });
        this.video.event.on('time', (value) => {
            this.event.video.emit('time', value);
        });
        this.video.event.on('state', (state) => {
            this.event.video.emit('state', state);
        });
        this.video.event.on('rule', (enabled) => {
            this.event.video.emit('rule', enabled);
        });
        this.video.event.on('subtitle', (enabled) => {
            this.event.video.emit('subtitle', enabled);
        });
    }
    registscreen() {
        this.screen.event.on('change', (isfull) => {
            this.event.screen.emit('change', isfull);
        });
        this.screen.event.on('click', () => {
            this.event.screen.emit('click');
        });
        this.screen.event.on('dblclick', () => {
            this.event.screen.emit('dblclick');
        });
    }
}
exports.WSPlayerController = WSPlayerController;


/***/ }),

/***/ 6048:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerScreenController = void 0;
const player_helper_1 = __webpack_require__(7130);
const event_emitter_1 = __webpack_require__(882);
class WSPlayerScreenController {
    constructor(storage, getplugin) {
        this.storage = storage;
        this.getplugin = getplugin;
        this.event = new event_emitter_1.EventEmitter();
        this.reigst();
    }
    get plugin() {
        return this.getplugin();
    }
    get isfull() {
        return !!(document.fullscreen ||
            document.mozFullScreen ||
            document.webkitIsFullScreen ||
            document.webkitFullScreen ||
            document.msFullScreen);
    }
    full() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            plugin.JS_FullScreenSingle();
            this.storage.fullscreen = true;
            this.resize(window.screen.width, window.screen.height);
        });
    }
    exit() {
        return __awaiter(this, void 0, void 0, function* () {
            let element = document.documentElement; //若要全屏页面中div，var element= document.getElementById("divID");
            //IE ActiveXObject
            if (window.ActiveXObject) {
                let WsShell = new ActiveXObject('WScript.Shell');
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
            this.storage.fullscreen = false;
            this.resize();
        });
    }
    reigst() {
        document.addEventListener('webkitfullscreenchange', (e) => {
            let target = e.currentTarget;
            console.log('webkitfullscreenchange', this.isfull, target);
            if (!this.isfull) {
                this.resize();
            }
        });
        document.addEventListener('fullscreenchange', (e) => {
            let target = e.currentTarget;
            console.log('fullscreenchange', this.isfull, target);
        });
        window.addEventListener('resize', (e) => {
            this.resize(window.innerWidth, window.innerHeight);
        });
        this.registwnd();
    }
    registwnd() {
        return __awaiter(this, void 0, void 0, function* () {
            let wnd = yield player_helper_1.WSPlayerHelper.element.getwnd(this.storage.html.element);
            wnd.addEventListener('dblclick', (e) => {
                if (this.isfull) {
                    this.exit();
                }
                else {
                    this.full();
                }
                this.event.emit('dblclick');
            });
            wnd.addEventListener('click', (e) => {
                this.event.emit('click');
            });
        });
    }
    resize(width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            let _width = width !== null && width !== void 0 ? width : this.storage.html.width;
            let _height = height !== null && height !== void 0 ? height : this.storage.html.height;
            let plugin = yield this.plugin;
            var scale = 1 / player_helper_1.WSPlayerHelper.element.ratio;
            plugin.JS_Resize(_width * scale, _height * scale);
        });
    }
}
exports.WSPlayerScreenController = WSPlayerScreenController;


/***/ }),

/***/ 7105:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerVolumeController = void 0;
class WSPlayerVolumeController {
    constructor(controls, getplugin) {
        this.controls = controls;
        this.getplugin = getplugin;
    }
    get plugin() {
        return this.getplugin();
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            let value = 0;
            let plugin = yield this.plugin;
            plugin.JS_GetVolume(value);
            return value;
        });
    }
    set(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            plugin.JS_SetVolume(value);
            this.controls.widget.volume.icon.value = value > 0;
            this.controls.widget.volume.panel.value = value;
        });
    }
}
exports.WSPlayerVolumeController = WSPlayerVolumeController;


/***/ }),

/***/ 4496:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerSoundController = void 0;
const player_sound_volume_controller_1 = __webpack_require__(7105);
class WSPlayerSoundController {
    get volume() {
        return this._volume;
    }
    constructor(controls, getplugin) {
        this.controls = controls;
        this.getplugin = getplugin;
        this._volume = new player_sound_volume_controller_1.WSPlayerVolumeController(controls, getplugin);
    }
    get plugin() {
        return this.getplugin();
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            if (this.controls.widget.volume.icon.value)
                return;
            plugin.JS_OpenSound();
            this.controls.widget.volume.icon.value = true;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            if (!this.controls.widget.volume.icon.value)
                return;
            plugin.JS_CloseSound();
            this.controls.widget.volume.icon.value = false;
        });
    }
}
exports.WSPlayerSoundController = WSPlayerSoundController;


/***/ }),

/***/ 3084:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerVideoCapturePictureController = void 0;
const play_mode_enum_1 = __webpack_require__(9658);
const player_helper_1 = __webpack_require__(7130);
class PlayerVideoCapturePictureController {
    constructor(storage, controls, getplugin) {
        this.storage = storage;
        this.controls = controls;
        this.getplugin = getplugin;
    }
    get plugin() {
        return this.getplugin();
    }
    download() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            let model = yield this.storage.model;
            let time = new Date();
            if (model.mode == play_mode_enum_1.PlayMode.vod) {
                time = new Date(this.controls.position.position.value);
            }
            let name = player_helper_1.WSPlayerHelper.capturepicture.getName(model, time, this.storage.name);
            if (name) {
                plugin.JS_CapturePicture(name, 'JPEG');
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            let data = yield plugin.JS_CapturePictureData();
            return player_helper_1.WSPlayerHelper.analysis.Uint8ArrayToString(data);
        });
    }
}
exports.PlayerVideoCapturePictureController = PlayerVideoCapturePictureController;


/***/ }),

/***/ 9153:
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerVideoOSDController = void 0;
class WSPlayerVideoOSDController {
    constructor(getplugin) {
        this.getplugin = getplugin;
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.getplugin();
            return plugin.JS_GetOSDTime();
        });
    }
}
exports.WSPlayerVideoOSDController = WSPlayerVideoOSDController;


/***/ }),

/***/ 1502:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerVideoPositionController = void 0;
const player_helper_1 = __webpack_require__(7130);
const date_tool_1 = __webpack_require__(3755);
const event_emitter_1 = __webpack_require__(882);
class WSPlayerVideoPositionController {
    constructor(video, controls) {
        this.video = video;
        this.controls = controls;
        this.event = new event_emitter_1.EventEmitter();
        this.regist(controls);
    }
    get value() {
        return this.controls.position.position.value;
    }
    regist(controls) {
        controls.position.position.event.on('change', this.change.bind(this));
        controls.position.position.event.on('mousedown', this.mousedown.bind(this));
    }
    on(position) {
        return __awaiter(this, void 0, void 0, function* () {
            if (position.data) {
                let current = player_helper_1.WSPlayerHelper.analysis.getPosition(position.data);
                if (Number.isNaN(current.getTime())) {
                    return;
                }
                current = date_tool_1.DateTool.timezone.restore(current);
                this.controls.position.position.value = current.getTime();
                this.event.emit('position', this.controls.position.position.ratio);
                let time = new Date(current.getTime() - this.controls.position.position.min);
                time = date_tool_1.DateTool.timezone.remove(time);
                this.controls.position.begin.value = new Date(time.getTime());
                this.event.emit('time', {
                    current: time,
                    min: this.controls.position.position.min,
                    max: this.controls.position.position.max,
                });
                if (this.controls.position.position.value >=
                    this.controls.position.position.max) {
                    throw new Error('视频播放结束');
                }
            }
        });
    }
    mousedown() {
        return this.video.pause();
    }
    mouseout() {
        return this.video.resume();
    }
    change(value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.video.pause();
            yield this.video.seek(value);
            yield this.video.resume();
        });
    }
}
exports.WSPlayerVideoPositionController = WSPlayerVideoPositionController;


/***/ }),

/***/ 3144:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerVideoRuleController = void 0;
const event_emitter_1 = __webpack_require__(882);
class WSPlayerVideoRuleController {
    constructor(controls) {
        this.controls = controls;
        this.event = new event_emitter_1.EventEmitter();
    }
    get enabled() {
        return this.controls.widget.rule.value;
    }
    set enabled(value) {
        if (this.controls.widget.rule.value === value)
            return;
        this.controls.widget.rule.value = value;
        this.event.emit('change', this.controls.widget.rule.value);
    }
}
exports.WSPlayerVideoRuleController = WSPlayerVideoRuleController;


/***/ }),

/***/ 1558:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerVideoSpeedController = void 0;
const event_emitter_1 = __webpack_require__(882);
class WSPlayerVideoSpeedController {
    constructor(getplugin) {
        this.getplugin = getplugin;
        this.event = new event_emitter_1.EventEmitter();
    }
    get plugin() {
        return this.getplugin();
    }
    status() {
        return this.plugin.then((x) => {
            return x.JS_GetWndStatus();
        });
    }
    fast() {
        return __awaiter(this, void 0, void 0, function* () {
            let status = yield this.status();
            if (typeof status === 'number')
                return;
            if (status.iRate >= 4)
                return;
            let plugin = yield this.plugin;
            plugin.JS_Fast();
            if (status.iRate > 1) {
                this.event.emit('fast');
            }
        });
    }
    slow() {
        return __awaiter(this, void 0, void 0, function* () {
            let status = yield this.status();
            if (typeof status === 'number')
                return;
            if (status.iRate <= -4)
                return;
            let plugin = yield this.plugin;
            plugin.JS_Slow();
            if (status.iRate < 1) {
                this.event.emit('slow');
            }
        });
    }
    resume() {
        return __awaiter(this, void 0, void 0, function* () {
            let status = yield this.status();
            if (typeof status === 'number')
                return;
            if (status.iRate > 1) {
                yield this.slow();
                return this.resume();
            }
            else if (status.iRate < 1) {
                yield this.fast();
                return this.resume();
            }
            else {
                this.event.emit('resume');
            }
        });
    }
}
exports.WSPlayerVideoSpeedController = WSPlayerVideoSpeedController;


/***/ }),

/***/ 8075:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerVideoSubtitleController = void 0;
const event_emitter_1 = __webpack_require__(882);
class WSPlayerVideoSubtitleController {
    constructor(controls, storage) {
        this.controls = controls;
        this.storage = storage;
        this.event = new event_emitter_1.EventEmitter();
    }
    get enabled() {
        return this.controls.widget.subtitle.value;
    }
    set enabled(value) {
        if (this.controls.widget.subtitle.value === value)
            return;
        this.controls.widget.subtitle.value = value;
        this.event.emit('change', this.controls.widget.subtitle.value);
        this.init();
    }
    set(text) {
        if (this.content && this.enabled) {
            this.content.innerText = text;
        }
    }
    init() {
        if (this.enabled) {
            if (!this.element) {
                this.append(this.storage.html.element);
            }
        }
        else {
            if (this.element) {
                this.remove(this.storage.html.element);
            }
        }
    }
    append(parent) {
        this.element = document.createElement('div');
        this.element.className = 'player-subtitle';
        this.content = document.createElement('div');
        this.content.className = 'player-subtitle-content';
        this.element.appendChild(this.content);
        parent.appendChild(this.element);
    }
    remove(parent) {
        if (this.element) {
            parent.removeChild(this.element);
            this.element = undefined;
            this.content = undefined;
        }
    }
}
exports.WSPlayerVideoSubtitleController = WSPlayerVideoSubtitleController;


/***/ }),

/***/ 4480:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerVideoController = void 0;
const play_mode_enum_1 = __webpack_require__(9658);
const player_state_enum_1 = __webpack_require__(1407);
const player_helper_1 = __webpack_require__(7130);
const date_tool_1 = __webpack_require__(3755);
const event_emitter_1 = __webpack_require__(882);
const wait_1 = __webpack_require__(8676);
const player_video_capture_picture_controller_1 = __webpack_require__(3084);
const player_video_osd_controller_1 = __webpack_require__(9153);
const player_video_position_controller_1 = __webpack_require__(1502);
const player_video_rule_controller_1 = __webpack_require__(3144);
const player_video_speed_controller_1 = __webpack_require__(1558);
const player_video_subtitle_controller_1 = __webpack_require__(8075);
class WSPlayerVideoController {
    get rule() {
        return this._rule;
    }
    get subtitle() {
        return this._subtitle;
    }
    get capturepicture() {
        return this._capturepicture;
    }
    get position() {
        return this._position;
    }
    get speed() {
        return this._speed;
    }
    get osd() {
        return this._osd;
    }
    constructor(storage, controls, getplugin) {
        this.storage = storage;
        this.controls = controls;
        this.getplugin = getplugin;
        this.event = new event_emitter_1.EventEmitter();
        this._state = player_state_enum_1.PlayerState.ready;
        this._position = new player_video_position_controller_1.WSPlayerVideoPositionController(this, controls);
        this._rule = new player_video_rule_controller_1.WSPlayerVideoRuleController(controls);
        this._subtitle = new player_video_subtitle_controller_1.WSPlayerVideoSubtitleController(controls, storage);
        this._capturepicture = new player_video_capture_picture_controller_1.PlayerVideoCapturePictureController(storage, controls, getplugin);
        this._speed = new player_video_speed_controller_1.WSPlayerVideoSpeedController(getplugin);
        this._osd = new player_video_osd_controller_1.WSPlayerVideoOSDController(getplugin);
        this.regist();
    }
    regist() {
        this._position.event.on('position', (value) => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('position', value);
        }));
        this._position.event.on('time', (value) => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('time', value);
        }));
        this._rule.event.on('change', (value) => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('rule', value);
        }));
        this._speed.event.on('fast', () => {
            this.state = player_state_enum_1.PlayerState.fast;
            console.log('speed fasted');
        });
        this._speed.event.on('slow', () => {
            this.state = player_state_enum_1.PlayerState.slow;
            console.log('speed slowed');
        });
        this._speed.event.on('resume', () => {
            this.state = player_state_enum_1.PlayerState.playing;
            console.log('speed resumed');
        });
        document.addEventListener('visibilitychange', (e) => {
            if (document.visibilityState == 'visible') {
                if (this.storage.model.mode == play_mode_enum_1.PlayMode.vod) {
                    this.resume();
                }
                else {
                    this.play();
                }
            }
            if (document.visibilityState == 'hidden') {
                if (this.storage.model.mode == play_mode_enum_1.PlayMode.vod) {
                    this.pause();
                }
                else {
                    this.stop();
                }
            }
        });
    }
    get plugin() {
        return this.getplugin();
    }
    get state() {
        return this._state;
    }
    set state(v) {
        if (this._state === v)
            return;
        this._state = v;
        this.event.emit('state', this._state);
    }
    play() {
        return __awaiter(this, void 0, void 0, function* () {
            this.state = player_state_enum_1.PlayerState.opening;
            let canvas = player_helper_1.WSPlayerHelper.element.canvas.get(this.storage.html.element);
            player_helper_1.WSPlayerHelper.element.canvas.clear(canvas);
            player_helper_1.WSPlayerHelper.element.loading(this.storage.html.element);
            let plugin = yield this.plugin;
            let url = this.storage.url;
            plugin
                .JS_Play(url, {
                onDebug: (debug) => {
                    console.log(debug);
                },
                onPlaying: this.onplaying.bind(this),
                getPosition: (data) => {
                    if (this.state == player_state_enum_1.PlayerState.playing &&
                        this.storage.model.mode == play_mode_enum_1.PlayMode.vod) {
                        this._position.on(data).catch((x) => {
                            this.stop();
                        });
                    }
                },
                readMediaPrivateData: (data) => {
                    this.readMediaPrivateData(canvas, data);
                },
            })
                .then(() => {
                (0, wait_1.wait)(() => {
                    return this.state == player_state_enum_1.PlayerState.playing;
                }, () => {
                    let model = this.storage.model;
                    this.controls.reload(this.storage.html.element, model.mode);
                    if (model.mode == play_mode_enum_1.PlayMode.vod &&
                        model.beginTime &&
                        model.endTime) {
                        this.controls.position.end.value = date_tool_1.DateTool.interval(model.beginTime, model.endTime);
                        this.controls.position.begin.value = date_tool_1.DateTool.timezone.remove(new Date(0));
                        this.controls.position.position.min = model.beginTime.getTime();
                        this.controls.position.position.max = model.endTime.getTime();
                    }
                }, 1);
            });
        });
    }
    onplaying() {
        return __awaiter(this, void 0, void 0, function* () {
            yield player_helper_1.WSPlayerHelper.element.getwnd(this.storage.html.element);
            player_helper_1.WSPlayerHelper.element.loading(this.storage.html.element, false);
            switch (this.state) {
                case player_state_enum_1.PlayerState.pause:
                case player_state_enum_1.PlayerState.frame:
                    break;
                default:
                    this.state = player_state_enum_1.PlayerState.playing;
                    break;
            }
            this.event.emit('playing');
        });
    }
    readMediaPrivateData(canvas, data) {
        let draw_target = false;
        try {
            if (this._rule.enabled) {
                draw_target = player_helper_1.WSPlayerHelper.analysis.readMediaPrivateData(data, {
                    loadPrivateTargetList: (dataview, offset) => {
                        player_helper_1.WSPlayerHelper.element.canvas.clear(canvas);
                        player_helper_1.WSPlayerHelper.element.canvas.loadPrivateTargetList(canvas, dataview, offset);
                    },
                });
            }
        }
        finally {
            player_helper_1.WSPlayerHelper.element.canvas.lazyclear(canvas, draw_target);
        }
    }
    resume() {
        return __awaiter(this, void 0, void 0, function* () {
            player_helper_1.WSPlayerHelper.element.loading(this.storage.html.element);
            let plugin = yield this.plugin;
            plugin.JS_Resume();
            this.state = player_state_enum_1.PlayerState.playing;
        });
    }
    stop() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            player_helper_1.WSPlayerHelper.element.loading(this.storage.html.element, false);
            let canvas = player_helper_1.WSPlayerHelper.element.canvas.get(this.storage.html.element);
            player_helper_1.WSPlayerHelper.element.canvas.clear(canvas);
            switch (this.state) {
                case player_state_enum_1.PlayerState.closing:
                case player_state_enum_1.PlayerState.closed:
                    return;
                default:
                    break;
            }
            try {
                this.state = player_state_enum_1.PlayerState.closing;
                yield plugin.JS_Stop();
                this.state = player_state_enum_1.PlayerState.closed;
            }
            finally {
                this.controls.control.play.show = true;
                if (this.controls.control.pause) {
                    this.controls.control.pause.show = false;
                }
                if (this.controls.control.stop) {
                    this.controls.control.stop.show = false;
                }
                this.event.emit('stoping');
            }
        });
    }
    pause() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            plugin.JS_Pause();
            this.state = player_state_enum_1.PlayerState.pause;
            let canvas = player_helper_1.WSPlayerHelper.element.canvas.get(this.storage.html.element);
            player_helper_1.WSPlayerHelper.element.canvas.clear(canvas);
        });
    }
    forward() {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            plugin.JS_FrameForward();
            this.state = player_state_enum_1.PlayerState.frame;
        });
    }
    jump_back() {
        return __awaiter(this, void 0, void 0, function* () {
            let current = this.controls.position.position.value;
            let time = new Date(current);
            time.setSeconds(time.getSeconds() - 30);
            let value = time.getTime() - this.controls.position.position.min;
            if (value <= 0) {
                value = 0;
            }
            this.seek(value);
        });
    }
    jump_forward() {
        return __awaiter(this, void 0, void 0, function* () {
            let current = this.controls.position.position.value;
            let time = new Date(current);
            time.setSeconds(time.getSeconds() + 30);
            let value = time.getTime() - this.controls.position.position.min;
            if (value < this.controls.position.position.max) {
                this.seek(value);
            }
        });
    }
    seek(value) {
        return __awaiter(this, void 0, void 0, function* () {
            let plugin = yield this.plugin;
            plugin.JS_Seek(value / 1000);
        });
    }
    download(filename, type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.storage.model.mode == play_mode_enum_1.PlayMode.vod) {
                let plugin = yield this.plugin;
                plugin.JS_Download(filename, type);
            }
        });
    }
}
exports.WSPlayerVideoController = WSPlayerVideoController;


/***/ }),

/***/ 9658:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayMode = void 0;
var PlayMode;
(function (PlayMode) {
    PlayMode["vod"] = "vod";
    PlayMode["live"] = "live";
})(PlayMode = exports.PlayMode || (exports.PlayMode = {}));


/***/ }),

/***/ 1407:
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

/***/ 8593:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StreamType = void 0;
/**流类型：1-主码流，2-子码流 */
var StreamType;
(function (StreamType) {
    /** 1-主码流 */
    StreamType[StreamType["main"] = 1] = "main";
    /** 2-子码流 */
    StreamType[StreamType["sub"] = 2] = "sub";
})(StreamType = exports.StreamType || (exports.StreamType = {}));


/***/ }),

/***/ 4284:
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

/***/ 6044:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateRuleList = void 0;
const private_rule_model_1 = __webpack_require__(1285);
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

/***/ 1285:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateRule = void 0;
const private_point_f_model_1 = __webpack_require__(4284);
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

/***/ 1225:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateTargetList = void 0;
const private_target_model_1 = __webpack_require__(9590);
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

/***/ 9590:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrivateTarget = void 0;
const private_point_f_model_1 = __webpack_require__(4284);
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

/***/ 758:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HowellUrl = void 0;
class HowellUrl {
    constructor(uri) {
        if (uri.lastIndexOf('#') === uri.length - 1) {
            uri = uri.substr(0, uri.length - 1);
        }
        let temp;
        const schemeIndex = uri.indexOf(':') + 3;
        const userInfoIndex = uri.indexOf('@');
        let authorityIndex = uri.indexOf('/', schemeIndex);
        if (authorityIndex < 0) {
            authorityIndex = uri.length;
        }
        const queryIndex = uri.indexOf('?');
        this.Origin = uri;
        if (queryIndex > 0) {
            this.Origin = uri.substr(0, queryIndex);
        }
        this.AbsoluteUri = uri;
        this.Scheme = uri.substr(0, schemeIndex - 3);
        if (userInfoIndex > 0) {
            this.UserInfo = uri.substr(schemeIndex, userInfoIndex - schemeIndex);
            this.Authority = uri.substr(userInfoIndex + 1, authorityIndex - userInfoIndex - 1);
        }
        else {
            this.Authority = uri.substr(schemeIndex, authorityIndex - schemeIndex);
        }
        this.Port = 80;
        this.Host = this.Authority;
        if (this.Authority.indexOf(':') > 0) {
            temp = this.Authority.split(':');
            this.Host = temp[0];
            this.Port = temp[1];
        }
        this.PathAndQuery = uri.substr(queryIndex, uri.length - queryIndex);
        this.AbsolutePath = this.PathAndQuery;
        if (queryIndex > 0) {
            temp = this.PathAndQuery.split('?');
            this.AbsolutePath = temp[0];
            this.Query = temp[1];
        }
        if (this.Query) {
            const items = this.Query.split('&');
            this.Querys = {};
            for (let i = 0; i < items.length; i++) {
                const index = items[i].indexOf('=');
                this.Querys[items[i].substr(0, index)] = items[i].substr(index + 1);
            }
        }
        this.Segments = null;
        if (this.AbsolutePath !== '') {
            this.Segments = this.AbsolutePath.split('/');
        }
    }
    toString() {
        let param = '';
        if (this.Querys) {
            let i = 0;
            for (let q in this.Querys) {
                if (i == 0)
                    param = '?';
                if (i++ > 0)
                    param += '&';
                param += q + '=' + this.Querys[q];
            }
        }
        let result = this.Scheme + '://';
        if (this.UserInfo)
            result += this.UserInfo + '@';
        result += this.Host;
        if (this.Origin.indexOf(':', 6) > 0)
            result += ':' + this.Port;
        result += this.AbsolutePath + param;
        return result;
    }
}
exports.HowellUrl = HowellUrl;


/***/ }),

/***/ 7800:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VideoModel = void 0;
const play_mode_enum_1 = __webpack_require__(9658);
const stream_type_enum_1 = __webpack_require__(8593);
const url_model_1 = __webpack_require__(758);
class VideoModel {
    constructor(options) {
        /** 链接地址 */
        this.host = '';
        /** 端口号 */
        this.port = 80;
        /** 摄像机id */
        this.deviceId = '';
        /** 通道号 */
        this.slot = 0;
        /** 模式 */
        this.mode = play_mode_enum_1.PlayMode.live;
        this.index = 0;
        if (options) {
            if (typeof options === 'string') {
                this.fromString(options);
            }
            else {
                this.host = options.host;
                this.deviceId = options.deviceId;
                this.slot = options.slot;
                this.username = options.userName;
                this.password = options.password;
                this.mode = options.mode;
                this.beginTime = options.beginTime;
                this.endTime = options.endTime;
                this.stream = options.stream;
            }
        }
    }
    fromString(str) {
        let url = new url_model_1.HowellUrl(str);
        this.host = url.Host;
        this.port = url.Port;
        if (url.Querys) {
            this.username = url.Querys.user;
            this.password = url.Querys.password;
        }
        let uri = str.substr(str.indexOf(url.Authority) + url.Authority.length + 1);
        let nodes = uri.split('/');
        this.mode = nodes[3];
        this.deviceId = nodes[4];
        this.slot = parseInt(nodes[5]);
        this.stream = parseInt(nodes[6]);
        switch (this.mode) {
            case play_mode_enum_1.PlayMode.live:
                break;
            case play_mode_enum_1.PlayMode.vod:
                let interval = nodes[7];
                let times = interval.split('_');
                this.beginTime = new Date(times[0]);
                this.endTime = new Date(times[1]);
                break;
            default:
                break;
        }
    }
    toString(stream) {
        if (stream) {
            this.stream = stream;
        }
        if (!this.stream) {
            this.stream = stream_type_enum_1.StreamType.sub;
        }
        let url = `ws://${this.host}:${this.port}/ws/video/howellps/${this.mode}/${this.deviceId}/${this.slot}/${this.stream}/${this.mode}.mp4?user=${this.username}&password=${this.password}`;
        if (this.mode === play_mode_enum_1.PlayMode.vod && this.beginTime && this.endTime) {
            url = `ws://${this.host}:${this.port}/ws/video/howellps/${this.mode}/${this.deviceId}/${this.slot}/${this.stream}/${this.beginTime.toISOString()}_${this.endTime.toISOString()}/${this.mode}.mp4?user=${this.username}&password=${this.password}`;
        }
        return url;
    }
    static fromUrl(url, username, password) {
        let model = new VideoModel(url);
        if (username)
            model.username = username;
        if (password)
            model.password = password;
        return model;
    }
}
exports.VideoModel = VideoModel;


/***/ }),

/***/ 7782:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APlayerControlButton = void 0;
const player_control_1 = __webpack_require__(4218);
class APlayerControlButton extends player_control_1.APlayerToolTriggerControl {
    constructor() {
        super();
    }
    _create(title, icon) {
        let _icon = document.createElement('i');
        _icon.className = icon;
        let element = document.createElement('div');
        element.title = title;
        element.appendChild(_icon);
        element.addEventListener('click', (e) => {
            console.log(e.currentTarget);
            e.stopPropagation();
            this.event.emit('click', e);
        });
        element.addEventListener('mousedown', (e) => {
            e.stopPropagation();
        });
        return element;
    }
}
exports.APlayerControlButton = APlayerControlButton;


/***/ }),

/***/ 3545:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APlayerControlSlide = void 0;
const player_control_1 = __webpack_require__(4218);
class APlayerControlSlide extends player_control_1.APlayerToolTriggerControl {
    constructor() {
        super(...arguments);
        this._value = 0;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
    }
}
exports.APlayerControlSlide = APlayerControlSlide;


/***/ }),

/***/ 3358:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APlayerControlSwitch = void 0;
const player_control_1 = __webpack_require__(4218);
class APlayerControlSwitch extends player_control_1.APlayerToolTriggerControl {
    constructor() {
        super(...arguments);
        this._value = false;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        if (this._value === v)
            return;
        this._value = v;
        let icon = this.element.querySelector('i');
        if (this.icon) {
            icon.className = this.value ? this.icon.on : this.icon.off;
        }
        this.event.emit('change', this._value);
    }
    _create(title, icon) {
        this.icon = icon;
        let _icon = document.createElement('i');
        _icon.className = icon.off;
        let element = document.createElement('div');
        element.title = title;
        element.appendChild(_icon);
        element.addEventListener('click', (e) => {
            e.stopPropagation();
            this.value = !this.value;
        });
        return element;
    }
}
exports.APlayerControlSwitch = APlayerControlSwitch;


/***/ }),

/***/ 4218:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.APlayerToolTriggerControl = exports.APlayerControl = void 0;
const event_emitter_1 = __webpack_require__(882);
class APlayerControl {
    constructor() {
        this.style = {
            display: '',
        };
        this.init();
        this.element = this.create();
    }
    init() { }
    get show() {
        return this.element.style.display != 'none';
    }
    set show(v) {
        this.element.style.display = v ? this.style.display : 'none';
    }
}
exports.APlayerControl = APlayerControl;
class APlayerToolTriggerControl extends APlayerControl {
    constructor() {
        super();
        this.event = new event_emitter_1.EventEmitter();
    }
}
exports.APlayerToolTriggerControl = APlayerToolTriggerControl;


/***/ }),

/***/ 8363:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlCapturePictureButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlCapturePictureButton extends player_control_button_a_1.APlayerControlButton {
    create() {
        return super._create('截图', 'howell-icon-picture');
    }
}
exports.WSPlayerControlCapturePictureButton = WSPlayerControlCapturePictureButton;


/***/ }),

/***/ 3548:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlFastButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlFastButton extends player_control_button_a_1.APlayerControlButton {
    create() {
        return super._create('快进', 'mdi mdi-fast-forward');
    }
}
exports.WSPlayerControlFastButton = WSPlayerControlFastButton;


/***/ }),

/***/ 6715:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlForwardButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlForwardButton extends player_control_button_a_1.APlayerControlButton {
    create() {
        return super._create('单帧进', 'mdi mdi-step-forward');
    }
}
exports.WSPlayerControlForwardButton = WSPlayerControlForwardButton;


/***/ }),

/***/ 921:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlFullscreenButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlFullscreenButton extends player_control_button_a_1.APlayerControlButton {
    create() {
        return super._create('全屏', 'mdi mdi-arrow-expand-all');
    }
}
exports.WSPlayerControlFullscreenButton = WSPlayerControlFullscreenButton;


/***/ }),

/***/ 7812:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlJumpBackButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlJumpBackButton extends player_control_button_a_1.APlayerControlButton {
    create() {
        return super._create('退30秒', 'mdi mdi-reply');
    }
}
exports.WSPlayerControlJumpBackButton = WSPlayerControlJumpBackButton;


/***/ }),

/***/ 2414:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlJumpForwardButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlJumpForwardButton extends player_control_button_a_1.APlayerControlButton {
    create() {
        let _icon = document.createElement('i');
        _icon.className = 'mdi mdi-reply';
        _icon.style.transform = 'rotateY(180deg)';
        let element = document.createElement('div');
        element.title = '进30秒';
        element.appendChild(_icon);
        element.addEventListener('click', (e) => {
            this.event.emit('click', e);
        });
        return element;
    }
}
exports.WSPlayerControlJumpForwardButton = WSPlayerControlJumpForwardButton;


/***/ }),

/***/ 9950:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlPauseButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlPauseButton extends player_control_button_a_1.APlayerControlButton {
    constructor() {
        super();
        this.show = false;
    }
    create() {
        let element = this._create('暂停', 'mdi mdi-pause');
        element.className = 'play';
        return element;
    }
}
exports.WSPlayerControlPauseButton = WSPlayerControlPauseButton;


/***/ }),

/***/ 4144:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlPlayButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlPlayButton extends player_control_button_a_1.APlayerControlButton {
    constructor() {
        super();
    }
    create() {
        let element = super._create('播放', 'mdi mdi-play');
        element.className = 'play';
        return element;
    }
}
exports.WSPlayerControlPlayButton = WSPlayerControlPlayButton;


/***/ }),

/***/ 3001:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlSlowButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlSlowButton extends player_control_button_a_1.APlayerControlButton {
    create() {
        return super._create('慢放', 'mdi mdi-rewind');
    }
}
exports.WSPlayerControlSlowButton = WSPlayerControlSlowButton;


/***/ }),

/***/ 7342:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlStopButton = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlStopButton extends player_control_button_a_1.APlayerControlButton {
    constructor() {
        super();
        this.show = false;
    }
    create() {
        let element = super._create('停止', 'mdi mdi-stop');
        element.className = 'play';
        return element;
    }
}
exports.WSPlayerControlStopButton = WSPlayerControlStopButton;


/***/ }),

/***/ 1239:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlPosition = void 0;
const event_emitter_1 = __webpack_require__(882);
const player_control_time_begin_1 = __webpack_require__(3367);
const player_control_time_end_1 = __webpack_require__(2851);
const player_control_time_position_slide_1 = __webpack_require__(1640);
class WSPlayerControlPosition {
    constructor() {
        this.event = new event_emitter_1.EventEmitter();
        this.begin = new player_control_time_begin_1.WSPlayerControlTimeBegin();
        this.end = new player_control_time_end_1.WSPlayerControlTimeEnd();
        this.position = new player_control_time_position_slide_1.WSPlayerControlTimePositionSlide();
        this.element = this.create();
        this.regist();
    }
    create() {
        let div = document.createElement('div');
        div.className = 'player-controls-position';
        div.appendChild(this.begin.element);
        div.appendChild(this.position.element);
        div.appendChild(this.end.element);
        return div;
    }
    regist() {
        this.position.event.on('change', (value) => {
            this.event.emit('change', value);
        });
        this.position.event.on('mousedown', () => {
            this.event.emit('mousedown');
        });
    }
}
exports.WSPlayerControlPosition = WSPlayerControlPosition;


/***/ }),

/***/ 3481:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlVideo = void 0;
const play_mode_enum_1 = __webpack_require__(9658);
const event_emitter_1 = __webpack_require__(882);
const player_control_fast_button_1 = __webpack_require__(3548);
const player_control_forward_button_1 = __webpack_require__(6715);
const player_control_jump_back_button_1 = __webpack_require__(7812);
const player_control_jump_forward_button_1 = __webpack_require__(2414);
const player_control_pause_button_1 = __webpack_require__(9950);
const player_control_play_button_1 = __webpack_require__(4144);
const player_control_slow_button_1 = __webpack_require__(3001);
const player_control_stop_button_1 = __webpack_require__(7342);
class WSPlayerControlVideo {
    constructor(mode) {
        this.event = new event_emitter_1.EventEmitter();
        this.play = new player_control_play_button_1.WSPlayerControlPlayButton();
        this.pause = new player_control_pause_button_1.WSPlayerControlPauseButton();
        this.stop = new player_control_stop_button_1.WSPlayerControlStopButton();
        this.fast = new player_control_fast_button_1.WSPlayerControlFastButton();
        this.slow = new player_control_slow_button_1.WSPlayerControlSlowButton();
        this.forward = new player_control_forward_button_1.WSPlayerControlForwardButton();
        this.jump = {
            forward: new player_control_jump_forward_button_1.WSPlayerControlJumpForwardButton(),
            back: new player_control_jump_back_button_1.WSPlayerControlJumpBackButton(),
        };
        this.mode = mode;
        this.element = this.create(mode);
        this.regist();
    }
    create(mode) {
        let div = document.createElement('div');
        div.className = 'player-controls-video';
        div.appendChild(this.play.element);
        this.play.show = !mode;
        if (mode === play_mode_enum_1.PlayMode.live) {
            div.appendChild(this.stop.element);
            this.stop.show = true;
        }
        if (mode === play_mode_enum_1.PlayMode.vod) {
            div.appendChild(this.pause.element);
            this.pause.show = true;
            div.appendChild(this.fast.element);
            div.appendChild(this.slow.element);
            div.appendChild(this.forward.element);
            div.appendChild(this.jump.back.element);
            div.appendChild(this.jump.forward.element);
        }
        return div;
    }
    regist() {
        this.play.event.on('click', (e) => {
            this.play.show = !this.play.show;
            if (this.mode === play_mode_enum_1.PlayMode.live) {
                this.stop.show = !this.play.show;
            }
            else {
                this.pause.show = !this.play.show;
            }
            this.event.emit('play');
        });
        this.stop.event.on('click', (e) => {
            this.stop.show = false;
            this.play.show = true;
            this.event.emit('stop');
        });
        this.pause.event.on('click', (e) => {
            this.pause.show = false;
            this.play.show = true;
            this.event.emit('pause');
        });
        this.fast.event.on('click', (e) => {
            this.event.emit('fast');
        });
        this.slow.event.on('click', (e) => {
            this.event.emit('slow');
        });
        this.forward.event.on('click', (e) => {
            this.event.emit('forward');
        });
        this.jump.back.event.on('click', (e) => {
            this.event.emit('jump_back');
        });
        this.jump.forward.event.on('click', (e) => {
            this.event.emit('jump_forward');
        });
    }
}
exports.WSPlayerControlVideo = WSPlayerControlVideo;


/***/ }),

/***/ 2690:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlWidget = void 0;
const play_mode_enum_1 = __webpack_require__(9658);
const event_emitter_1 = __webpack_require__(882);
const player_control_capture_picture_button_1 = __webpack_require__(8363);
const player_control_fullscreen_button_1 = __webpack_require__(921);
const player_control_rule_switch_1 = __webpack_require__(3572);
const player_control_subtitle_switch_1 = __webpack_require__(1970);
const player_control_volume_1 = __webpack_require__(3857);
class WSPlayerControlWidget {
    constructor(mode) {
        this.event = new event_emitter_1.EventEmitter();
        this.rule = new player_control_rule_switch_1.WSPlayerControlRuleSwitch();
        this.volume = new player_control_volume_1.WSPlayerControlVolume();
        this.subtitle = new player_control_subtitle_switch_1.WSPlayerControlSubtitleSwitch();
        this.fullscreen = new player_control_fullscreen_button_1.WSPlayerControlFullscreenButton();
        this.capturepicture = new player_control_capture_picture_button_1.WSPlayerControlCapturePictureButton();
        this.element = this.create(mode);
        this.regist();
    }
    get _rule() {
        return this.rule;
    }
    create(mode) {
        let div = document.createElement('div');
        div.className = 'player-controls-widget';
        div.appendChild(this.volume.element);
        if (mode === play_mode_enum_1.PlayMode.vod) {
            div.appendChild(this.subtitle.element);
        }
        div.appendChild(this._rule.element);
        div.appendChild(this.capturepicture.element);
        div.appendChild(this.fullscreen.element);
        return div;
    }
    regist() {
        this.fullscreen.event.on('click', (e) => {
            this.event.emit('fullscreen');
        });
        this.capturepicture.event.on('click', (e) => {
            this.event.emit('capturepicture');
        });
        this._rule.event.on('change', (value) => {
            this.event.emit('rule', value);
        });
        this.subtitle.event.on('change', (value) => {
            this.event.emit('subtitle', value);
        });
    }
}
exports.WSPlayerControlWidget = WSPlayerControlWidget;


/***/ }),

/***/ 8826:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControls = void 0;
const play_mode_enum_1 = __webpack_require__(9658);
const event_emitter_1 = __webpack_require__(882);
const player_control_position_tool_1 = __webpack_require__(1239);
const player_control_video_tool_1 = __webpack_require__(3481);
const player_control_widget_tool_1 = __webpack_require__(2690);
class WSPlayerControls {
    constructor(parent, mode) {
        this.event = new event_emitter_1.EventEmitter();
        this.control = new player_control_video_tool_1.WSPlayerControlVideo(mode);
        this.widget = new player_control_widget_tool_1.WSPlayerControlWidget(mode);
        this.position = new player_control_position_tool_1.WSPlayerControlPosition();
        this.element = this.create(mode);
        this.regist();
        parent.appendChild(this.element);
    }
    reload(element, mode) {
        this.control = new player_control_video_tool_1.WSPlayerControlVideo(mode);
        this.widget = new player_control_widget_tool_1.WSPlayerControlWidget(mode);
        this.position = new player_control_position_tool_1.WSPlayerControlPosition();
        this.element = document.querySelector('.player-controls');
        if (this.element) {
            element.removeChild(this.element);
        }
        this.element = this.create(mode);
        this.regist();
        element.appendChild(this.element);
    }
    create(mode) {
        let div = document.createElement('div');
        div.className = 'player-controls';
        this.content = document.createElement('div');
        this.content.className = 'player-controls-content';
        this.content.style.opacity = '0';
        this.content.appendChild(this.control.element);
        if (mode === play_mode_enum_1.PlayMode.vod) {
            this.content.appendChild(this.position.element);
        }
        if (mode) {
            this.content.appendChild(this.widget.element);
        }
        div.appendChild(this.content);
        return div;
    }
    registvideocontrol() {
        this.control.event.on('play', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('play');
        }));
        this.control.event.on('stop', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('stop');
        }));
        this.control.event.on('pause', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('pause');
        }));
        this.control.event.on('fast', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('fast');
        }));
        this.control.event.on('slow', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('slow');
        }));
        this.control.event.on('forward', () => __awaiter(this, void 0, void 0, function* () {
            this.control.play.show = true;
            this.control.pause.show = false;
            this.event.emit('forward');
        }));
        this.control.event.on('jump_back', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('jump_back');
        }));
        this.control.event.on('jump_forward', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('jump_forward');
        }));
    }
    registwidget() {
        this.widget.event.on('fullscreen', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('fullscreen');
        }));
        this.widget.event.on('capturepicture', () => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('capturepicture');
        }));
        this.widget.event.on('rule', (enabled) => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('rule', enabled);
        }));
        this.widget.event.on('subtitle', (enabled) => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('subtitle', enabled);
        }));
        this.widget.event.on('volume', (value) => __awaiter(this, void 0, void 0, function* () {
            this.event.emit('volume', value);
        }));
    }
    registposition() {
        this.position.position.event.on('change', (value) => {
            this.event.emit('positionchange', value);
        });
        this.position.position.event.on('mousedown', () => {
            this.event.emit('positionmousedown');
        });
    }
    registdisplay() {
        this.element.addEventListener('mouseover', (e) => {
            if (this.content) {
                this.content.style.opacity = '';
            }
        });
        this.element.addEventListener('mouseout', (e) => {
            if (this.content) {
                this.content.style.opacity = '0';
            }
        });
        this.element.addEventListener('mouseover', (e) => {
            if (this.content) {
                this.content.style.opacity = '';
            }
        });
    }
    regist() {
        this.registvideocontrol();
        this.registwidget();
        this.registposition();
        this.registdisplay();
    }
}
exports.WSPlayerControls = WSPlayerControls;


/***/ }),

/***/ 3367:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlTimeBegin = void 0;
const date_tool_1 = __webpack_require__(3755);
const player_control_1 = __webpack_require__(4218);
class WSPlayerControlTimeBegin extends player_control_1.APlayerControl {
    get value() {
        let values = this.element.innerText.split(':').map((x) => parseInt(x));
        return new Date(0, 0, 0, values[0], values[1], values[2]);
    }
    set value(v) {
        this.element.innerHTML = date_tool_1.DateTool.format(v, 'HH:mm:ss');
    }
    create() {
        let div = document.createElement('div');
        div.innerHTML = '00:00:00';
        div.title = '当前时间';
        return div;
    }
}
exports.WSPlayerControlTimeBegin = WSPlayerControlTimeBegin;


/***/ }),

/***/ 2851:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlTimeEnd = void 0;
const date_tool_1 = __webpack_require__(3755);
const player_control_1 = __webpack_require__(4218);
class WSPlayerControlTimeEnd extends player_control_1.APlayerControl {
    get value() {
        let values = this.element.innerText.split(':').map((x) => parseInt(x));
        return new Date(0, 0, 0, values[0], values[1], values[2]);
    }
    set value(v) {
        this.element.innerHTML = date_tool_1.DateTool.format(v, 'HH:mm:ss');
    }
    create() {
        let div = document.createElement('div');
        div.innerHTML = '00:00:00';
        div.title = '结束时间';
        return div;
    }
}
exports.WSPlayerControlTimeEnd = WSPlayerControlTimeEnd;


/***/ }),

/***/ 1640:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlTimePositionSlide = void 0;
const date_tool_1 = __webpack_require__(3755);
const player_control_slide_1 = __webpack_require__(3545);
class WSPlayerControlTimePositionSlide extends player_control_slide_1.APlayerControlSlide {
    get input() {
        return this.element;
    }
    get value() {
        return this.input.valueAsNumber;
    }
    set value(v) {
        this.input.value = `${v}`;
        this.setBackground(v);
    }
    get min() {
        return this.input.min ? parseFloat(this.input.min) : 0;
    }
    set min(v) {
        this.input.min = `${v}`;
    }
    get max() {
        return this.input.max ? parseFloat(this.input.max) : 0;
    }
    set max(v) {
        this.input.max = `${v}`;
    }
    get ratio() {
        let count = this.max - this.min;
        let current = this.value - this.min;
        let ratio = current / count;
        if (ratio >= 1) {
            return 1;
        }
        return ratio;
    }
    setBackground(v) {
        this.input.style.backgroundSize = `${this.ratio * 100}% 100%`;
    }
    create() {
        let input = document.createElement('input');
        input.type = 'range';
        input.value = `0`;
        input.step = '1000';
        input.style.flexGrow = '1';
        input.title = '00:00:00';
        this.regist(input);
        return input;
    }
    regist(input) {
        input.addEventListener('input', (e) => {
            let ctr = e.target;
            var value = (parseFloat(ctr.value) - parseFloat(ctr.min)) /
                (parseFloat(ctr.max) - parseFloat(ctr.min));
            var valStr = value * 100 + '% 100%';
            ctr.style.backgroundSize = valStr;
        });
        input.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.event.emit('mousedown');
        });
        input.addEventListener('mouseup', (e) => {
            e.stopPropagation();
            let ratio = e.offsetX / this.input.clientWidth;
            let count = this.max - this.min;
            let currnet = ratio * count;
            let value = currnet - this.min;
            this.event.emit('change', value);
        });
        input.addEventListener('mousemove', (e) => {
            e.stopPropagation();
            let ratio = e.offsetX / this.input.clientWidth;
            let count = this.max - this.min;
            let currnet = ratio * count;
            let time = new Date(currnet);
            time = date_tool_1.DateTool.timezone.remove(time);
            this.input.title = date_tool_1.DateTool.format(time, 'HH:mm:ss');
        });
        input.addEventListener('change', (e) => {
            let value = this.value - this.min;
            this.event.emit('change', value);
        });
    }
}
exports.WSPlayerControlTimePositionSlide = WSPlayerControlTimePositionSlide;


/***/ }),

/***/ 3572:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlRuleSwitch = void 0;
const player_control_switch_1 = __webpack_require__(3358);
class WSPlayerControlRuleSwitch extends player_control_switch_1.APlayerControlSwitch {
    create() {
        return super._create('目标', {
            on: 'howell-icon-garbage-target-on',
            off: 'howell-icon-garbage-target-off',
        });
    }
}
exports.WSPlayerControlRuleSwitch = WSPlayerControlRuleSwitch;


/***/ }),

/***/ 1970:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlSubtitleSwitch = void 0;
const player_control_switch_1 = __webpack_require__(3358);
class WSPlayerControlSubtitleSwitch extends player_control_switch_1.APlayerControlSwitch {
    create() {
        return super._create('字幕', {
            on: 'howell-icon-subtitles',
            off: 'howell-icon-subtitles_off',
        });
    }
}
exports.WSPlayerControlSubtitleSwitch = WSPlayerControlSubtitleSwitch;


/***/ }),

/***/ 6463:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlVolumeIcon = void 0;
const player_control_button_a_1 = __webpack_require__(7782);
class WSPlayerControlVolumeIcon extends player_control_button_a_1.APlayerControlButton {
    get value() {
        return this._value;
    }
    set value(v) {
        if (this._value === v)
            return;
        this._value = v;
        this.icon.element.className = v
            ? this.icon.classname.on
            : this.icon.classname.off;
    }
    constructor() {
        super();
        this._value = false;
    }
    init() {
        this.icon = {
            element: document.createElement('i'),
            classname: {
                off: 'mdi mdi-volume-off',
                on: 'mdi mdi-volume-high',
            },
        };
    }
    create() {
        this.icon.element.className = this.icon.classname.off;
        let element = document.createElement('div');
        element.title = '音量';
        element.appendChild(this.icon.element);
        element.addEventListener('click', (e) => {
            this.value = !this.value;
            this.event.emit('click');
        });
        return element;
    }
}
exports.WSPlayerControlVolumeIcon = WSPlayerControlVolumeIcon;


/***/ }),

/***/ 9462:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlVolumePanel = void 0;
const player_control_slide_1 = __webpack_require__(3545);
const player_control_volume_slide_1 = __webpack_require__(3913);
class WSPlayerControlVolumePanel extends player_control_slide_1.APlayerControlSlide {
    constructor() {
        super();
        this.show = false;
        this.regist();
    }
    get value() {
        return this.slide.value;
    }
    set value(v) {
        if (this.slide.value === v)
            return;
        this.slide.value = v;
    }
    init() {
        this.slide = new player_control_volume_slide_1.WSPlayerControlVolumeSlide();
        this.style.display = 'flex';
    }
    create() {
        let div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.top = '0';
        div.style.left = '50%';
        div.style.transform = 'translate(-50%, -100%)';
        div.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        div.style.height = '100px';
        div.style.width = '40px';
        div.style.padding = '10px';
        div.style.boxSizing = 'border-box';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.appendChild(this.slide.element);
        return div;
    }
    regist() {
        this.slide.event.on('change', (value) => {
            this.event.emit('change', value);
        });
    }
}
exports.WSPlayerControlVolumePanel = WSPlayerControlVolumePanel;


/***/ }),

/***/ 3913:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlVolumeSlide = void 0;
const player_control_slide_1 = __webpack_require__(3545);
class WSPlayerControlVolumeSlide extends player_control_slide_1.APlayerControlSlide {
    get input() {
        return this.element;
    }
    get value() {
        return parseInt(this.input.value);
    }
    set value(v) {
        let str = v.toString();
        if (this.input.value == str)
            return;
        this.input.value = str;
        this.oninput(this.input);
    }
    create() {
        let input = document.createElement('input');
        input.type = 'range';
        input.min = '0';
        input.max = '100';
        input.step = '1';
        input.value = `0`;
        input.title = `音量：0%`;
        input.style.backgroundSize = `0% 100%`;
        input.style.transform = 'rotate(270deg)';
        input.style.width = '80px';
        input.className = 'vertical';
        this.regist(input);
        return input;
    }
    regist(input) {
        input.addEventListener('input', (e) => {
            let input = e.target;
            this.oninput(input);
        });
    }
    oninput(input) {
        var value = (parseFloat(input.value) - parseFloat(input.min)) /
            (parseFloat(input.max) - parseFloat(input.min));
        input.style.backgroundSize = `${value * 100}% 100%`;
        input.title = `音量：${input.value}%`;
        this.value = parseInt(input.value);
        this.event.emit('change', this.value);
    }
}
exports.WSPlayerControlVolumeSlide = WSPlayerControlVolumeSlide;


/***/ }),

/***/ 3857:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlVolume = void 0;
const player_control_1 = __webpack_require__(4218);
const player_control_volume_icon_1 = __webpack_require__(6463);
const player_control_volume_panel_1 = __webpack_require__(9462);
class WSPlayerControlVolume extends player_control_1.APlayerControl {
    constructor() {
        super();
        this.regist();
    }
    init() {
        this.icon = new player_control_volume_icon_1.WSPlayerControlVolumeIcon();
        this.panel = new player_control_volume_panel_1.WSPlayerControlVolumePanel();
    }
    create() {
        let div = document.createElement('div');
        div.style.position = 'relative';
        div.style.height = '100%';
        div.appendChild(this.icon.element);
        div.appendChild(this.panel.element);
        return div;
    }
    regist() {
        this.panel.event.on('change', (value) => {
            this.icon.value = value > 0;
            this.icon.element.title = `音量：${value}%`;
        });
        this.element.addEventListener('mouseover', (e) => {
            this.panel.show = true;
        });
        this.element.addEventListener('mouseout', (e) => {
            this.panel.show = false;
        });
        this.icon.event.on('click', (e) => {
            if (this.icon.value) {
                if (this.panel.value === 0) {
                    this.panel.value = 50;
                }
                else {
                    this.panel.value = 0;
                }
            }
            else {
                this.panel.value = 0;
            }
        });
    }
}
exports.WSPlayerControlVolume = WSPlayerControlVolume;


/***/ }),

/***/ 9983:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerAnalysisHelper = void 0;
class WSPlayerAnalysisHelper {
    static readMediaPrivateData(data, triggers) {
        let draw_target = false;
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
                        triggers.loadPrivateTargetList(dataview, offset, draw_target);
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
        return draw_target;
    }
    static getPosition(position) {
        var u8array = new Uint8Array(position);
        // 2020-02-22T10:11:22Z
        // 01234567890123456789
        var year = parseInt(this.Uint8ArrayToString(u8array.slice(0, 4)));
        var month = parseInt(this.Uint8ArrayToString(u8array.slice(5, 7)));
        var day = parseInt(this.Uint8ArrayToString(u8array.slice(8, 10)));
        var hour = parseInt(this.Uint8ArrayToString(u8array.slice(11, 13)));
        var minute = parseInt(this.Uint8ArrayToString(u8array.slice(14, 16)));
        var second = parseInt(this.Uint8ArrayToString(u8array.slice(17, 19)));
        let current = new Date(year, month - 1, day, hour, minute, second);
        return current;
    }
    static Uint8ArrayToString(data) {
        var dataString = '';
        for (var i = 0; i < data.length; i++) {
            dataString += String.fromCharCode(data[i]);
        }
        return dataString;
    }
}
exports.WSPlayerAnalysisHelper = WSPlayerAnalysisHelper;


/***/ }),

/***/ 5302:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerCapturePictureHelper = void 0;
const play_mode_enum_1 = __webpack_require__(9658);
const date_tool_1 = __webpack_require__(3755);
class PlayerCapturePictureHelper {
    static getName(model, time, _name) {
        let infos = [];
        let name = _name !== null && _name !== void 0 ? _name : model.deviceId;
        infos.push(name);
        infos.push(model.slot);
        infos.push(model.stream);
        if (model.mode === play_mode_enum_1.PlayMode.vod) {
            if (model.beginTime) {
                let begin = date_tool_1.DateTool.format(model.beginTime, 'yyyy-MM-ddTHH_mm_ss.SSSZ');
                infos.push(begin);
            }
            if (model.endTime) {
                let end = date_tool_1.DateTool.format(model.endTime, 'yyyy-MM-ddTHH_mm_ss.SSSZ');
                infos.push(end);
            }
        }
        let date = new Date(time.getTime());
        let current = date_tool_1.DateTool.format(date, 'yyyy_MM_dd_HH_mm_ss');
        infos.push(current);
        return infos.join('_');
    }
}
exports.PlayerCapturePictureHelper = PlayerCapturePictureHelper;


/***/ }),

/***/ 7620:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerElementCanvasHelper = void 0;
const private_rule_list_model_1 = __webpack_require__(6044);
const private_target_list_model_1 = __webpack_require__(1225);
class WSPlayerElementCanvasHelper {
    static lazyclear(canvas, cancel = false) {
        if (cancel) {
            if (this.handle.clearMediaPrivateData) {
                clearTimeout(this.handle.clearMediaPrivateData);
                this.handle.clearMediaPrivateData = undefined;
            }
        }
        else {
            if (!this.handle.clearMediaPrivateData) {
                this.handle.clearMediaPrivateData = setTimeout(() => {
                    this.clear(canvas);
                    this.handle.clearMediaPrivateData = undefined;
                }, 500);
            }
        }
    }
    static clear(canvas) {
        try {
            if (canvas) {
                let ctx = canvas.getContext('2d');
                let width = canvas.offsetWidth;
                let height = canvas.offsetHeight;
                ctx.clearRect(0, 0, width, height);
            }
        }
        catch (ex) {
            console.error(ex);
        }
    }
    static get(element) {
        let canvas = element.querySelector('.draw-window');
        return canvas;
    }
    static loadPrivateTargetList(canvas, dataview, offset) {
        let list = private_target_list_model_1.PrivateTargetList.load(dataview, offset);
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
    static loadPrivateRuleList(canvas, dataview, offset) {
        let list = private_rule_list_model_1.PrivateRuleList.load(dataview, offset);
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
exports.WSPlayerElementCanvasHelper = WSPlayerElementCanvasHelper;
WSPlayerElementCanvasHelper.handle = {};


/***/ }),

/***/ 7181:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerElementHelper = void 0;
const wait_1 = __webpack_require__(8676);
const player_element_canvas_helper_1 = __webpack_require__(7620);
class WSPlayerElementHelper {
    static getwnd(element) {
        return new Promise((resolve) => {
            (0, wait_1.wait)(() => {
                let wnd = element.querySelector('.parent-wnd');
                return !!wnd;
            }, () => {
                let wnd = element.querySelector('.parent-wnd');
                resolve(wnd);
            });
        });
    }
    static get ratio() {
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
    static loading(element, loading = true) {
        let classname = 'loading';
        let has = element.classList.contains(classname);
        if (loading && !has) {
            element.classList.add(classname);
            return;
        }
        if (!loading && has) {
            element.classList.remove(classname);
        }
    }
}
exports.WSPlayerElementHelper = WSPlayerElementHelper;
WSPlayerElementHelper.canvas = player_element_canvas_helper_1.WSPlayerElementCanvasHelper;


/***/ }),

/***/ 4872:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerPluginHelper = void 0;
class WSPlayerPluginHelper {
    static getPath() {
        let ss = document.getElementsByTagName('script');
        for (let i = 0; i < ss.length; i++) {
            var index = 0;
            if ((index = ss[i].src.toLowerCase().lastIndexOf('wsplayer_v2.js')) > 0) {
                return ss[i].src.substr(0, index) + 'codebase/';
            }
        }
        return `http://${document.location.host}/codebase/`;
    }
}
exports.WSPlayerPluginHelper = WSPlayerPluginHelper;


/***/ }),

/***/ 7130:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerHelper = void 0;
const player_analysis_helper_1 = __webpack_require__(9983);
const player_capture_picture_helper_1 = __webpack_require__(5302);
const player_element_helper_1 = __webpack_require__(7181);
const player_plugin_helper_1 = __webpack_require__(4872);
class WSPlayerHelper {
}
exports.WSPlayerHelper = WSPlayerHelper;
WSPlayerHelper.capturepicture = player_capture_picture_helper_1.PlayerCapturePictureHelper;
WSPlayerHelper.plugin = player_plugin_helper_1.WSPlayerPluginHelper;
WSPlayerHelper.element = player_element_helper_1.WSPlayerElementHelper;
WSPlayerHelper.analysis = player_analysis_helper_1.WSPlayerAnalysisHelper;


/***/ }),

/***/ 5075:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerStorage = void 0;
const video_model_1 = __webpack_require__(7800);
const event_emitter_1 = __webpack_require__(882);
class WSPlayerStorage {
    constructor(element, url) {
        this.event = new event_emitter_1.EventEmitter();
        this.fullscreen = false;
        this.html = {
            element: element,
            width: element.clientWidth,
            height: element.clientHeight,
        };
        this._url = url;
        this._model = video_model_1.VideoModel.fromUrl(url);
    }
    get url() {
        return this._url;
    }
    get model() {
        return this._model;
    }
}
exports.WSPlayerStorage = WSPlayerStorage;


/***/ }),

/***/ 8490:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerPlugin = void 0;
const player_helper_1 = __webpack_require__(7130);
const event_emitter_1 = __webpack_require__(882);
class WSPlayerPlugin {
    static get(elementId) {
        return new Promise((resolve) => {
            if (this._plugin) {
                if (this._plugin.loaded) {
                    resolve(this._plugin);
                }
            }
            else {
                if (!this._plugin) {
                    this._plugin = new WSPlayerPlugin({
                        width: '100%',
                        height: '100%',
                        path: player_helper_1.WSPlayerHelper.plugin.getPath(),
                        elementId: elementId,
                        loaded: () => __awaiter(this, void 0, void 0, function* () {
                            if (this._plugin) {
                                resolve(this._plugin);
                            }
                        }),
                    });
                }
            }
        });
    }
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
    JS_Seek(value) {
        return this.plugin.JS_Seek(0, value);
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

/***/ 3755:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DateTool = void 0;
class DateTool {
    static format(date, fmt) {
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12,
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds(), //毫秒
        };
        let week = [
            '\u65e5',
            '\u4e00',
            '\u4e8c',
            '\u4e09',
            '\u56db',
            '\u4e94',
            '\u516d',
        ];
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length > 1
                ? RegExp.$1.length > 2
                    ? '\u661f\u671f'
                    : '\u5468'
                : '') + week[date.getDay()]);
        }
        let _o = o;
        for (var k in _o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1
                    ? _o[k]
                    : ('00' + _o[k]).substr(('' + _o[k]).length));
            }
        }
        return fmt;
    }
    static interval(begin, end) {
        let interval = new Date(end.getTime() - begin.getTime());
        return this.timezone.remove(interval);
    }
}
exports.DateTool = DateTool;
DateTool.timezone = {
    remove: (date) => {
        let time = new Date(date.getTime());
        time.setHours(time.getHours() + time.getTimezoneOffset() / 60);
        return time;
    },
    restore: (date) => {
        let time = new Date(date.getTime());
        time.setHours(time.getHours() - time.getTimezoneOffset() / 60);
        return time;
    },
};


/***/ }),

/***/ 882:
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

/***/ 8676:
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


/***/ }),

/***/ 4331:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WSPlayerControlsTrigger = void 0;
const play_mode_enum_1 = __webpack_require__(9658);
const player_state_enum_1 = __webpack_require__(1407);
const event_emitter_1 = __webpack_require__(882);
class WSPlayerControlsTrigger {
    constructor(controls, controller, storage) {
        this.controls = controls;
        this.controller = controller;
        this.storage = storage;
        this.event = {
            button: new event_emitter_1.EventEmitter(),
        };
        this.regist();
    }
    regist() {
        this.controls.event.on('play', this.play.bind(this));
        this.controls.event.on('stop', this.stop.bind(this));
        this.controls.event.on('pause', this.pause.bind(this));
        this.controls.event.on('fast', this.fast.bind(this));
        this.controls.event.on('slow', this.slow.bind(this));
        this.controls.event.on('forward', this.forward.bind(this));
        this.controls.event.on('jump_back', this.jump_back.bind(this));
        this.controls.event.on('jump_forward', this.jump_forward.bind(this));
        this.controls.event.on('fullscreen', this.fullscreen.bind(this));
        this.controls.event.on('capturepicture', this.capturepicture.bind(this));
        this.controls.event.on('rule', this.rule.bind(this));
        this.controls.event.on('subtitle', this.subtitle.bind(this));
        this.controls.event.on('volume', this.volume.bind(this));
        this.controls.event.on('positionchange', this.positionchange.bind(this));
        this.controls.event.on('positionmousedown', this.positionmousedown.bind(this));
        this.storage.event.on('state', this.state.bind(this));
    }
    state(state) {
        switch (this.storage.model.mode) {
            case play_mode_enum_1.PlayMode.live:
                this.livestate(state);
                break;
            case play_mode_enum_1.PlayMode.vod:
                this.vodstate(state);
                break;
            default:
                break;
        }
    }
    livestate(state) {
        switch (state) {
            case player_state_enum_1.PlayerState.playing:
                this.controls.control.play.show = false;
                this.controls.control.stop.show = true;
                break;
            default:
                break;
        }
    }
    vodstate(state) {
        switch (state) {
            case player_state_enum_1.PlayerState.playing:
                this.controls.control.play.show = false;
                this.controls.control.pause.show = true;
                break;
            default:
                break;
        }
    }
    play() {
        this.event.button.emit('click', this.play.name);
        switch (this.controller.video.state) {
            case player_state_enum_1.PlayerState.pause:
            case player_state_enum_1.PlayerState.frame:
                return this.controller.video.resume();
            default:
                return this.controller.video.play();
        }
    }
    stop() {
        this.event.button.emit('click', this.stop.name);
        return this.controller.video.stop().then((x) => {
            if (this.storage.fullscreen) {
                this.controller.screen.exit();
            }
        });
    }
    pause() {
        this.event.button.emit('click', this.pause.name);
        return this.controller.video.pause();
    }
    fast() {
        this.event.button.emit('click', this.fast.name);
        return this.controller.video.speed.fast();
    }
    slow() {
        this.event.button.emit('click', this.slow.name);
        return this.controller.video.speed.slow();
    }
    forward() {
        this.event.button.emit('click', this.forward.name);
        return this.controller.video.forward();
    }
    jump_back() {
        this.event.button.emit('click', this.jump_back.name);
        return this.controller.video.jump_back();
    }
    jump_forward() {
        this.event.button.emit('click', this.jump_forward.name);
        return this.controller.video.jump_forward();
    }
    fullscreen() {
        this.event.button.emit('click', this.fullscreen.name);
        if (this.controller.screen.isfull) {
            return this.controller.screen.exit();
        }
        else {
            return this.controller.screen.full();
        }
    }
    capturepicture() {
        this.event.button.emit('click', this.capturepicture.name);
        return this.controller.video.capturepicture.download();
    }
    rule(enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            this.event.button.emit('click', this.rule.name);
            this.controller.video.rule.enabled = enabled;
        });
    }
    subtitle(enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            this.event.button.emit('click', this.subtitle.name);
            this.controller.video.subtitle.enabled = enabled;
        });
    }
    volume(value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.event.button.emit('click', this.volume.name);
            if (value > 0) {
                this.controller.sound.open();
            }
            else {
                this.controller.sound.close();
            }
            this.controller.sound.volume.set(value);
        });
    }
    positionmousedown() {
        return this.controller.video.position.mousedown();
    }
    positionchange(value) {
        return this.controller.video.position.change(value);
    }
}
exports.WSPlayerControlsTrigger = WSPlayerControlsTrigger;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
const player_controller_1 = __webpack_require__(9675);
const player_controls_1 = __webpack_require__(8826);
const player_storage_1 = __webpack_require__(5075);
const plugin_1 = __webpack_require__(8490);
const player_controls_trigger_1 = __webpack_require__(4331);
class WSPlayer {
    get event() {
        return Object.assign(Object.assign({}, this.controller.event), this.trigger.event);
    }
    constructor(args) {
        let element = this.init(args.elementId);
        this.storage = new player_storage_1.WSPlayerStorage(element, args.url);
        this.storage.name = args.name;
        this.controls = new player_controls_1.WSPlayerControls(element);
        this.controller = new player_controller_1.WSPlayerController(this.storage, this.controls, () => {
            return plugin_1.WSPlayerPlugin.get(this.storage.html.element.id);
        });
        this.trigger = new player_controls_trigger_1.WSPlayerControlsTrigger(this.controls, this.controller, this.storage);
    }
    stop() {
        return this.controller.video.stop();
    }
    play() {
        return this.controller.video.play();
    }
    seek(position) {
        return this.controller.video.seek(position);
    }
    fast() {
        return this.controller.video.speed.fast();
    }
    slow() {
        return this.controller.video.speed.slow();
    }
    pause() {
        return this.controller.video.pause();
    }
    resume() {
        return this.controller.video.resume();
    }
    frame() {
        return this.controller.video.forward();
    }
    resize(width, height) {
        return this.controller.screen.resize(width, height);
    }
    fullscreen() {
        return this.controller.screen.full();
    }
    fullexit() {
        return this.controller.screen.exit();
    }
    download(filename, type) {
        return this.controller.video.download(filename, type);
    }
    speedResume() {
        return this.controller.video.speed.resume();
    }
    capturePicture() {
        return this.controller.video.capturepicture.download();
    }
    subtitleText(text) {
        return this.controller.video.subtitle.set(text);
    }
    subtitleEnabled(enabled) {
        this.controller.video.subtitle.enabled = enabled;
    }
    openSound() {
        return this.controller.sound.open();
    }
    closeSound() {
        return this.controller.sound.close();
    }
    changeRuleState(state) {
        return (this.controller.video.rule.enabled = state);
    }
    getCapturePictureData() {
        return this.controller.video.capturepicture.get();
    }
    getPosition() {
        return this.controller.video.position.value;
    }
    getVolume() {
        return this.controller.sound.volume.get();
    }
    setVolume(volume) {
        return this.controller.sound.volume.set(volume);
    }
    getOSDTime() {
        return this.controller.video.osd.get();
    }
    init(id) {
        let element = document.getElementById(id);
        let classname = 'player';
        if (!element.classList.contains(classname)) {
            element.classList.add(classname);
        }
        return element;
    }
}
__webpack_unused_export__ = WSPlayer;
;
window.WSPlayer = WSPlayer;

})();

/******/ })()
;
//# sourceMappingURL=WSPlayer_v2.js.map