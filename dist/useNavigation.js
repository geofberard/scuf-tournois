import { useEffect, useMemo, useState } from "react";
import { createHashHistory } from "history";
import { parseElementId } from "./data/Utils";
export var useNavigation = function (pages) {
    var historyService = useMemo(function () { return createHashHistory({ hashType: "noslash" }); }, []);
    var _a = useState(function () {
        return parseElementId(historyService.location.pathname.replace("/", ""), pages) || pages[0];
    }), currentPage = _a[0], setCurrentPage = _a[1];
    useEffect(function () { return historyService.listen(function (location) {
        var target = parseElementId(location.pathname.replace("/", ""), pages);
        if (currentPage.id !== target.id) {
            setCurrentPage(target);
        }
    }); });
    var setCurrentPageAndHistory = function (page) {
        historyService.push(page.id);
        setCurrentPage(page);
    };
    return [currentPage, setCurrentPageAndHistory];
};
//# sourceMappingURL=useNavigation.js.map