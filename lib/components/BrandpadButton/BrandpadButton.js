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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "@emotion/styled";
var StyledBrandpadButton = styled.button(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background: var(--button-background);\n  color: var(--button-color);\n  padding: 10px;\n  border: none;\n  cursor: pointer;\n\n  &:disabled {\n    cursor: not-allowed;\n  }\n"], ["\n  background: var(--button-background);\n  color: var(--button-color);\n  padding: 10px;\n  border: none;\n  cursor: pointer;\n\n  &:disabled {\n    cursor: not-allowed;\n  }\n"])));
var Children = styled.span(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  margin-right: 40px;\n"], ["\n  margin-right: 40px;\n"])));
var Arrow = styled.span(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: var(--electric-green);\n"], ["\n  color: var(--electric-green);\n"])));
export var BrandpadButton = function (_a) {
    var children = _a.children, props = __rest(_a, ["children"]);
    return (_jsxs(StyledBrandpadButton, __assign({}, props, { children: [_jsx(Children, { children: children }, void 0),
            _jsx(Arrow, { children: "\u2192" }, void 0)] }), void 0));
};
BrandpadButton.defaultProps = {
    disabled: false,
};
var templateObject_1, templateObject_2, templateObject_3;
