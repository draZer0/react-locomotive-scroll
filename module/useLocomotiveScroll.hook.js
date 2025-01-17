"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocomotiveScroll = void 0;
const react_1 = require("react");
const LocomotiveScroll_context_1 = require("./LocomotiveScroll.context");
function useLocomotiveScroll() {
    const context = react_1.useContext(LocomotiveScroll_context_1.LocomotiveScrollContext);
    context === undefined && console.warn('react-locomotive-scroll: the context is missing. You may be using the hook without registering LocomotiveScrollProvider, or you may be using the hook in a component which is not wrapped by LocomotiveScrollProvider.');
    return context;
}
exports.useLocomotiveScroll = useLocomotiveScroll;
useLocomotiveScroll.displayName = 'useLocomotiveScroll';
