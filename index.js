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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.main = void 0;
var events_1 = require("events");
var puppeteer = require("puppeteer");
function main(stopAfter, startUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var queue, visited, crawlerMaxCount, crawlerCount, eventEmitter, crawl;
        var _this = this;
        return __generator(this, function (_a) {
            queue = [startUrl || process.argv[2]];
            visited = {};
            crawlerMaxCount = 5;
            crawlerCount = 0;
            eventEmitter = new events_1.EventEmitter();
            eventEmitter.on('go', function () {
                while (crawlerCount < crawlerMaxCount && queue.length > crawlerCount) {
                    crawl(crawlerCount);
                    crawlerCount++;
                }
            });
            crawl = function (cralwerIndex) { return __awaiter(_this, void 0, void 0, function () {
                var browser, page, url, hrefs;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, puppeteer.launch()];
                        case 1:
                            browser = _a.sent();
                            return [4 /*yield*/, browser.newPage()];
                        case 2:
                            page = _a.sent();
                            _a.label = 3;
                        case 3:
                            if (!queue.length) return [3 /*break*/, 7];
                            if (stopAfter && Object.keys(visited).length >= stopAfter) {
                                return [2 /*return*/, Object.keys(visited)];
                            }
                            url = queue.shift();
                            if (!(url && !visited[url])) return [3 /*break*/, 6];
                            visited[url] = true;
                            console.log(url);
                            return [4 /*yield*/, page.goto(url, {
                                    timeout: 60 * 1000
                                })];
                        case 4:
                            _a.sent();
                            return [4 /*yield*/, page.$$eval('[href]', function (els) { return els.map(function (el) { return el.href; }); })];
                        case 5:
                            hrefs = _a.sent();
                            hrefs.forEach(function (href) {
                                if (href && typeof href === 'string' && href.match(/^http*/)) {
                                    console.log('  ' + href);
                                    queue.push(href);
                                }
                            });
                            if (cralwerIndex === 0 && crawlerCount < crawlerMaxCount) {
                                eventEmitter.emit('go');
                            }
                            _a.label = 6;
                        case 6: return [3 /*break*/, 3];
                        case 7: return [2 /*return*/];
                    }
                });
            }); };
            return [2 /*return*/, crawl(0)];
        });
    });
}
exports.main = main;
main(0);
