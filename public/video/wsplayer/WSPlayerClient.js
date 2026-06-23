/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 91:
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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
__webpack_unused_export__ = void 0;
const player_command_1 = __webpack_require__(91);
class WSPlayerClient {
    constructor(player, index = 0) {
        this.index = 0;
        this.index = index;
        this.player = player;
        this.initProxy();
        this.regist();
    }
    send(data) {
        let message = JSON.stringify(data);
        window.parent.postMessage(message, '*');
    }
    initProxy() {
        this.player.onStoping = () => {
            this.send({ index: this.index, command: player_command_1.PlayerCommand.on_stoping });
        };
        this.player.getPosition = (value) => {
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.get_position,
                value: value,
            });
        };
        this.player.getTimer = (value) => {
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.get_timer,
                value: value,
            });
        };
        this.player.onPlaying = () => {
            this.send({ index: this.index, command: player_command_1.PlayerCommand.on_playing });
        };
        this.player.onButtonClicked = (value) => {
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.on_button_clicked,
                value: value,
            });
        };
        this.player.onViewerDoubleClicked = () => {
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.on_viewer_doubleclicked,
            });
        };
        this.player.onViewerClicked = () => {
            this.send({ index: this.index, command: player_command_1.PlayerCommand.on_viewer_clicked });
        };
        this.player.onStatusChanged = (value) => {
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.on_status_changed,
                value: value,
            });
        };
        this.player.onCapturePicture = (data) => {
            let str = this.Uint8ArrayToString(data);
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.on_capture_picture,
                data: str,
            });
        };
        this.player.onRuleStateChanged = (value) => {
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.on_rule_state_changed,
                value: value,
            });
        };
        this.player.onSubtitleEnableChanged = (value) => {
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.on_subtitle_enabled_changed,
                value: value,
            });
        };
        this.player.onOSDTime = (value) => {
            this.send({
                index: this.index,
                command: player_command_1.PlayerCommand.on_osd_time,
                value: value,
            });
        };
    }
    Uint8ArrayToString(fileData) {
        var dataString = '';
        for (var i = 0; i < fileData.length; i++) {
            dataString += String.fromCharCode(fileData[i]);
        }
        return dataString;
    }
    regist() {
        window.addEventListener('message', (e) => {
            if (!this.player)
                return;
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
                            let promise = this.player.getCapturePictureData();
                            promise.then((data) => {
                                //let str = Uint8ArrayToString(data);
                                this.send({
                                    index: this.index,
                                    command: player_command_1.PlayerCommand.on_capture_picture,
                                    data: Array.from(data),
                                });
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
                            this.player.fullScreen();
                            break;
                        case player_command_1.PlayerCommand.resize:
                            this.player.resize(data.width, data.height);
                            break;
                        case player_command_1.PlayerCommand.fullexit:
                            this.player.fullExit();
                            break;
                        case player_command_1.PlayerCommand.download:
                            this.player.download(data.filename, data.type);
                            break;
                        case player_command_1.PlayerCommand.open_sound:
                            if (this.player.tools && !this.player.soundOpened) {
                                this.player.tools.control.volume.icon.click();
                            }
                            else {
                                this.player.openSound();
                            }
                            break;
                        case player_command_1.PlayerCommand.close_sound:
                            if (this.player.tools && this.player.soundOpened) {
                                this.player.tools.control.volume.icon.click();
                            }
                            else {
                                this.player.closeSound();
                            }
                            break;
                        case player_command_1.PlayerCommand.get_volume:
                            this.player.getVolume();
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
                            this.player.subtitle.set(data.value);
                            break;
                        case player_command_1.PlayerCommand.subtitle_enabled:
                            this.player.subtitleEnabled(data.value);
                            break;
                        case player_command_1.PlayerCommand.get_osd_time:
                            this.player.getOSDTime().then((value) => {
                                this.send({
                                    index: this.index,
                                    command: player_command_1.PlayerCommand.on_osd_time,
                                    value: value,
                                });
                            });
                            break;
                        default:
                            break;
                    }
                }
                catch (error) { }
            }
        });
    }
}
__webpack_unused_export__ = WSPlayerClient;
window.WSPlayerClient = WSPlayerClient;

})();

/******/ })()
;
//# sourceMappingURL=WSPlayerClient.js.map