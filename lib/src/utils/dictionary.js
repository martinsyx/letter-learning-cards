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
exports.fetchPhonetic = fetchPhonetic;
exports.checkWordAndGetPhonetic = checkWordAndGetPhonetic;
const taro_1 = require("@tarojs/taro");
/**
 * 获取 Free Dictionary API 的 URL
 * dictionaryapi.dev 支持 CORS，可以直接调用
 */
function getDictionaryApiUrl(word) {
    return `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
}
/**
 * 从 Free Dictionary API 获取单词音标
 * https://dictionaryapi.dev/ - 完全免费，无需注册
 * @param word 单词
 * @returns 音标字符串，如果失败则返回null
 */
function fetchPhonetic(word) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!word || word.trim().length === 0) {
            return null;
        }
        try {
            const response = yield taro_1.default.request({
                url: getDictionaryApiUrl(word.trim().toLowerCase()),
                method: 'GET',
            });
            if (response.statusCode === 200 && response.data && Array.isArray(response.data)) {
                const data = response.data;
                // 遍历结果查找音标
                for (const entry of data) {
                    // 优先获取顶层 phonetic
                    if (entry.phonetic) {
                        return entry.phonetic;
                    }
                    // 从 phonetics 数组中查找
                    if (entry.phonetics && Array.isArray(entry.phonetics)) {
                        for (const p of entry.phonetics) {
                            if (p.text) {
                                return p.text;
                            }
                        }
                    }
                }
            }
            // 404 或其他错误状态码，静默返回 null
            return null;
        }
        catch (error) {
            // 网络错误等，静默返回 null
            console.error('Failed to fetch phonetic:', error);
            return null;
        }
    });
}
/**
 * 检查单词并获取音标
 */
function checkWordAndGetPhonetic(word) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield fetchPhonetic(word);
    });
}
//# sourceMappingURL=dictionary.js.map