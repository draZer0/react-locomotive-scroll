"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocomotiveScrollProvider = exports.LocomotiveScrollContext = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const use_debounce_1 = require("use-debounce");
const use_resize_observer_1 = tslib_1.__importDefault(require("use-resize-observer"));
exports.LocomotiveScrollContext = react_1.createContext({
    scroll: null,
    isReady: false,
});
function LocomotiveScrollProvider({ children, options, containerRef, watch, onUpdate, location, onLocationChange, }) {
    const { height: containerHeight } = use_resize_observer_1.default({ ref: containerRef });
    const [isReady, setIsReady] = react_1.useState(false);
    const LocomotiveScrollRef = react_1.useRef(null);
    const [height] = use_debounce_1.useDebounce(containerHeight, 100);
    if (!watch) {
        console.warn('react-locomotive-scroll: you did not add any props to watch. Scroll may have weird behaviours if the instance is not updated when the route changes');
    }
    react_1.useEffect(() => {
        ;
        (() => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const LocomotiveScroll = (yield Promise.resolve().then(() => tslib_1.__importStar(require('locomotive-scroll')))).default;
                const dataScrollContainer = document.querySelector('[data-scroll-container]');
                if (!dataScrollContainer) {
                    console.warn(`react-locomotive-scroll: [data-scroll-container] dataset was not found. You likely forgot to add it which will prevent Locomotive Scroll to work.`);
                }
                LocomotiveScrollRef.current = new LocomotiveScroll(Object.assign({ el: dataScrollContainer !== null && dataScrollContainer !== void 0 ? dataScrollContainer : undefined }, options));
                setIsReady(true); // Re-render the context
            }
            catch (error) {
                throw Error(`react-locomotive-scroll: ${error}`);
            }
        }))();
        return () => {
            var _a;
            (_a = LocomotiveScrollRef.current) === null || _a === void 0 ? void 0 : _a.destroy();
            setIsReady(false);
        };
    }, []);
    react_1.useEffect(() => {
        if (!LocomotiveScrollRef.current) {
            return;
        }
        LocomotiveScrollRef.current.update();
        if (onUpdate) {
            onUpdate(LocomotiveScrollRef.current);
        }
    }, watch ? [...watch, height] : [height]);
    react_1.useEffect(() => {
        if (!LocomotiveScrollRef.current || !location) {
            return;
        }
        LocomotiveScrollRef.current.update();
        if (onLocationChange) {
            onLocationChange(LocomotiveScrollRef.current);
        }
    }, [location]);
    return (jsx_runtime_1.jsx(exports.LocomotiveScrollContext.Provider, Object.assign({ value: { scroll: LocomotiveScrollRef.current, isReady } }, { children: children }), void 0));
}
exports.LocomotiveScrollProvider = LocomotiveScrollProvider;
exports.LocomotiveScrollContext.displayName = 'LocomotiveScrollContext';
LocomotiveScrollProvider.displayName = 'LocomotiveScrollProvider';
