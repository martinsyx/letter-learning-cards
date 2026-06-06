"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioManager = void 0;
const taro_1 = require("@tarojs/taro");
class AudioManager {
    constructor() {
        this.innerAudioContext = null;
        this.isPlaying = false;
        this.innerAudioContext = taro_1.default.createInnerAudioContext();
    }
    playAudio(text_1) {
        return __awaiter(this, arguments, void 0, function* (text, isSlowMode = false) {
            if (this.isPlaying) {
                this.stop();
            }
            return new Promise((resolve, reject) => {
                if (!this.innerAudioContext) {
                    reject(new Error("Audio context not available"));
                    return;
                }
                // 使用有道词典免费发音 API
                const audioUrl = this.getYoudaoAudioUrl(text);
                this.innerAudioContext.src = audioUrl;
                this.innerAudioContext.playbackRate = isSlowMode ? 0.7 : 1.0;
                this.isPlaying = true;
                // 清除之前的事件监听
                this.innerAudioContext.offPlay();
                this.innerAudioContext.offError();
                this.innerAudioContext.offEnded();
                this.innerAudioContext.onPlay(() => {
                    console.log("Playing audio:", text);
                });
                this.innerAudioContext.onError((res) => {
                    console.error("Audio playback failed:", res);
                    this.isPlaying = false;
                    // 尝试备用 API
                    this.playWithBackupApi(text, isSlowMode).then(resolve).catch(reject);
                });
                this.innerAudioContext.onEnded(() => {
                    this.isPlaying = false;
                    resolve();
                });
                this.innerAudioContext.play();
            });
        });
    }
    // 有道词典发音 API（免费）
    getYoudaoAudioUrl(text) {
        const encodedText = encodeURIComponent(text.toLowerCase());
        return `https://dict.youdao.com/dictvoice?audio=${encodedText}&type=2`;
    }
    // 备用：使用 Google Translate TTS（免费）
    getGoogleTtsUrl(text) {
        const encodedText = encodeURIComponent(text.toLowerCase());
        return `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodedText}`;
    }
    // 备用发音方案
    playWithBackupApi(text, isSlowMode) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!this.innerAudioContext) {
                    reject(new Error("Audio context not available"));
                    return;
                }
                // 尝试使用备用 API
                const backupUrl = this.getGoogleTtsUrl(text);
                this.innerAudioContext.src = backupUrl;
                this.innerAudioContext.playbackRate = isSlowMode ? 0.7 : 1.0;
                this.isPlaying = true;
                this.innerAudioContext.offPlay();
                this.innerAudioContext.offError();
                this.innerAudioContext.offEnded();
                this.innerAudioContext.onError((res) => {
                    console.error("Backup audio also failed:", res);
                    this.isPlaying = false;
                    taro_1.default.showToast({
                        title: "发音失败，请检查网络",
                        icon: "none",
                    });
                    reject(new Error("All audio sources failed"));
                });
                this.innerAudioContext.onEnded(() => {
                    this.isPlaying = false;
                    resolve();
                });
                this.innerAudioContext.play();
            });
        });
    }
    stop() {
        if (this.innerAudioContext) {
            this.innerAudioContext.stop();
            this.isPlaying = false;
        }
    }
    destroy() {
        if (this.innerAudioContext) {
            this.innerAudioContext.destroy();
            this.innerAudioContext = null;
        }
    }
}
exports.AudioManager = AudioManager;
//# sourceMappingURL=audio.js.map