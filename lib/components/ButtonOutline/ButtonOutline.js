var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import styled from "@emotion/styled";
var StyledButtonOutline = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: var(--einride-white);\n  color: var(--button-color);\n  padding: 10px;\n  border-radius: 100px;\n  border: 2px solid var(--einride-black);\n  cursor: pointer;\n\n  &:disabled {\n    cursor: not-allowed;\n    color: var(--disabled);\n    border-color: var(--disabled);\n  }\n"], ["\n  background: var(--einride-white);\n  color: var(--button-color);\n  padding: 10px;\n  border-radius: 100px;\n  border: 2px solid var(--einride-black);\n  cursor: pointer;\n\n  &:disabled {\n    cursor: not-allowed;\n    color: var(--disabled);\n    border-color: var(--disabled);\n  }\n"])));
export var ButtonOutline = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return _jsx(StyledButtonOutline, __assign({}, props, { children: children }), void 0);
};
ButtonOutline.defaultProps = {
    disabled: false,
};
var templateObject_1;
