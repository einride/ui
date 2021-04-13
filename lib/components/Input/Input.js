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
import { forwardRef } from "react";
var Label = styled.label(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  display: ", ";\n\n  &::before {\n    content: attr(data-label);\n    position: absolute;\n    top: var(--spacing);\n    left: var(--spacing);\n    color: ", ";\n  }\n"], ["\n  position: relative;\n  display: ", ";\n\n  &::before {\n    content: attr(data-label);\n    position: absolute;\n    top: var(--spacing);\n    left: var(--spacing);\n    color: ",
    ";\n  }\n"])), function (_a) {
    var isFullWidth = _a.isFullWidth;
    return (isFullWidth ? "block" : "inline-block");
}, function (_a) {
    var isInvalid = _a.isInvalid;
    return isInvalid
        ? "var(--input-label-error-color)"
        : "var(--input-label-color)";
});
var StyledInput = styled.input(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background: ", ";\n  color: ", ";\n  border: none;\n  border-radius: var(--input-border-radius);\n  ", "\n  padding: 30px 10px 10px;\n  border: var(--input-border);\n\n  &::placeholder {\n    color: ", ";\n  }\n\n  &:focus::placeholder {\n    color: transparent;\n  }\n\n  &:active,\n  &:hover {\n    background: ", ";\n  }\n"], ["\n  background: ",
    ";\n  color: ",
    ";\n  border: none;\n  border-radius: var(--input-border-radius);\n  ", "\n  padding: 30px 10px 10px;\n  border: var(--input-border);\n\n  &::placeholder {\n    color: ",
    ";\n  }\n\n  &:focus::placeholder {\n    color: transparent;\n  }\n\n  &:active,\n  &:hover {\n    background: ",
    ";\n  }\n"])), function (_a) {
    var isDark = _a.isDark;
    return isDark ? "var(--input-dark-background)" : "var(--input-background)";
}, function (_a) {
    var isDark = _a.isDark;
    return isDark ? "var(--input-dark-color)" : "var(--input-color)";
}, function (_a) {
    var isFullWidth = _a.isFullWidth;
    return isFullWidth && "width: 100%;";
}, function (_a) {
    var isDark = _a.isDark;
    return isDark ? "var(--input-dark-color)" : "var(--input-color)";
}, function (_a) {
    var isDark = _a.isDark;
    return isDark
        ? "var(--input-dark-hover-background)"
        : "var(--input-hover-background)";
});
export var Input = forwardRef(function (_a, ref) {
    var isFullWidth = _a.isFullWidth, isInvalid = _a.isInvalid, label = _a.label, onBlur = _a.onBlur, onFocus = _a.onFocus, props = __rest(_a, ["isFullWidth", "isInvalid", "label", "onBlur", "onFocus"]);
    return (_jsx(Label, __assign({ "data-label": label, isFullWidth: isFullWidth, isInvalid: isInvalid, onBlur: onBlur, onFocus: onFocus }, { children: _jsx(StyledInput, __assign({ isFullWidth: isFullWidth }, props, { ref: ref }), void 0) }), void 0));
});
Input.defaultProps = {
    isDark: false,
    isInvalid: false,
    isFullWidth: false,
    min: undefined,
    onBlur: undefined,
    onChange: undefined,
    onFocus: undefined,
    placeholder: undefined,
    required: false,
    type: "text",
};
var templateObject_1, templateObject_2;
