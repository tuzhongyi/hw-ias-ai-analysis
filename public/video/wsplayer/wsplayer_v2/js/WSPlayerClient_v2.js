/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 8840:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlayerCommand = void 0;
var PlayerCommand;
(function (PlayerCommand) {
    PlayerCommand["stop"] = "stop";
    PlayerCommand["play"] = "play";
    PlayerCommand["seek"] = "seek";
    PlayerCommand["fast"] = "fast";
    PlayerCommand["slow"] = "slow";
    PlayerCommand["pause"] = "pause";
    PlayerCommand["resume"] = "resume";
    PlayerCommand["frame"] = "frame";
    PlayerCommand["resize"] = "resize";
    PlayerCommand["fullscreen"] = "fullScreen";
    PlayerCommand["fullexit"] = "fullExit";
    PlayerCommand["download"] = "download";
    PlayerCommand["speed_resume"] = "speedResume";
    PlayerCommand["capture_picture"] = "capturePicture";
    PlayerCommand["subtitle_text"] = "subtitleText";
    PlayerCommand["subtitle_enabled"] = "subtitleEnabled";
    PlayerCommand["open_sound"] = "openSound";
    PlayerCommand["close_sound"] = "closeSound";
    PlayerCommand["change_rule_state"] = "changeRuleState";
    PlayerCommand["button_click"] = "buttonClick";
    PlayerCommand["get_capture_picture_data"] = "getCapturePictureData";
    PlayerCommand["get_position"] = "getPosition";
    PlayerCommand["get_timer"] = "getTimer";
    PlayerCommand["get_volume"] = "getVolume";
    PlayerCommand["set_volume"] = "setVolume";
    PlayerCommand["on_stoping"] = "onStoping";
    PlayerCommand["on_playing"] = "onPlaying";
    PlayerCommand["on_button_clicked"] = "onButtonClicked";
    PlayerCommand["on_viewer_doubleclicked"] = "onViewerDoubleClicked";
    PlayerCommand["on_viewer_clicked"] = "onViewerClicked";
    PlayerCommand["on_status_changed"] = "onStatusChanged";
    PlayerCommand["on_capture_picture"] = "onCapturePicture";
    PlayerCommand["on_rule_state_changed"] = "onRuleStateChanged";
    PlayerCommand["on_subtitle_enabled_changed"] = "onSubtitleEnableChanged";
    PlayerCommand["get_osd_time"] = "getOsdTime";
    PlayerCommand["on_osd_time"] = "onOsdTime";
})(PlayerCommand = exports.PlayerCommand || (exports.PlayerCommand = {}));


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
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
const player_command_1 = __webpack_require__(8840);
class WSPlayerClient {
    constructor(player, index = 0) {
        this.player = player;
        this.index = index;
        this.video = {
            stoping: () => {
                this.send({ index: this.index, command: player_command_1.PlayerCommand.on_stoping });
            },
            playing: () => {
                this.send({ index: this.index, command: player_command_1.PlayerCommand.on_playing });
            },
            position: (value) => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.get_position,
                    value: value,
                });
            },
            time: (value) => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.get_timer,
                    value: value,
                });
            },
            capturepicture: (data) => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.on_capture_picture,
                    data: data,
                });
            },
            state: (state) => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.on_status_changed,
                    value: state,
                });
            },
            rule: (enabled) => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.on_rule_state_changed,
                    value: enabled,
                });
            },
            subtitle: (enabled) => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.on_subtitle_enabled_changed,
                    value: enabled,
                });
            },
            osd: (value) => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.on_osd_time,
                    value: value,
                });
            },
        };
        this.screen = {
            change: (isfull) => { },
            click: () => {
                this.send({ index: this.index, command: player_command_1.PlayerCommand.on_viewer_clicked });
            },
            dblclick: () => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.on_viewer_doubleclicked,
                });
            },
        };
        this.button = {
            click: (name) => {
                this.send({
                    index: this.index,
                    command: player_command_1.PlayerCommand.on_button_clicked,
                    value: name,
                });
            },
        };
        this.regist();
    }
    send(data) {
        let message = JSON.stringify(data);
        window.parent.postMessage(message, '*');
    }
    regist() {
        window.addEventListener('message', (e) => {
            if (e && e.data) {
                try {
                    let data = JSON.parse(e.data);
                    switch (data.command) {
                        case player_command_1.PlayerCommand.stop:
                            this.player.stop();
                            break;
                        case player_command_1.PlayerCommand.play:
                            this.player.play();
                            break;
                        case player_command_1.PlayerCommand.seek:
                            this.player.seek(data.value);
                            break;
                        case player_command_1.PlayerCommand.fast:
                            this.player.fast();
                            break;
                        case player_command_1.PlayerCommand.slow:
                            this.player.slow();
                            break;
                        case player_command_1.PlayerCommand.capture_picture:
                            this.player.capturePicture();
                            break;
                        case player_command_1.PlayerCommand.get_capture_picture_data:
                            this.player.getCapturePictureData().then((x) => {
                                this.video.capturepicture(x);
                            });
                            break;
                        case player_command_1.PlayerCommand.pause:
                            this.player.pause();
                            break;
                        case player_command_1.PlayerCommand.speed_resume:
                            this.player.speedResume();
                            break;
                        case player_command_1.PlayerCommand.resume:
                            this.player.resume();
                            break;
                        case player_command_1.PlayerCommand.frame:
                            this.player.frame();
                            break;
                        case player_command_1.PlayerCommand.fullscreen:
                            this.player.fullscreen();
                            break;
                        case player_command_1.PlayerCommand.resize:
                            this.player.resize(data.width, data.height);
                            break;
                        case player_command_1.PlayerCommand.fullexit:
                            this.player.fullexit();
                            break;
                        case player_command_1.PlayerCommand.download:
                            this.player.download(data.filename, data.type);
                            break;
                        case player_command_1.PlayerCommand.open_sound:
                            this.player.openSound();
                            break;
                        case player_command_1.PlayerCommand.close_sound:
                            this.player.closeSound();
                            break;
                        case player_command_1.PlayerCommand.get_volume:
                            // this.player.sound.volume.get().then((x) => {})
                            break;
                        case player_command_1.PlayerCommand.set_volume:
                            this.player.setVolume(data.value);
                            break;
                        case player_command_1.PlayerCommand.change_rule_state:
                            this.player.changeRuleState(data.value);
                            break;
                        case player_command_1.PlayerCommand.button_click:
                            break;
                        case player_command_1.PlayerCommand.subtitle_text:
                            this.player.subtitleText(data.value);
                            break;
                        case player_command_1.PlayerCommand.subtitle_enabled:
                            this.player.subtitleEnabled(data.value);
                            break;
                        case player_command_1.PlayerCommand.get_osd_time:
                            this.player.getOSDTime().then((value) => {
                                this.video.osd(value);
                            });
                            break;
                        default:
                            break;
                    }
                }
                catch (error) { }
            }
        });
        this.registevent(this.player.event.video, this.video);
        this.registevent(this.player.event.screen, this.screen);
        this.registevent(this.player.event.button, this.button);
    }
    registevent(event, data) {
        let _data = data;
        for (const key in _data) {
            let _key = key;
            event.on(_key, _data[key].bind(this));
        }
    }
}
__webpack_unused_export__ = WSPlayerClient;
window.WSPlayerClient = WSPlayerClient;

})();

/******/ })()
;
//# sourceMappingURL=WSPlayerClient_v2.js.map