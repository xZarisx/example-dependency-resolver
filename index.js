import stringFixer from "./libs/stringFixer.js";
import makeGrossString from "./libs/makeGrossString.js";

const depLooper = (depObjList) => {

    const popDepPackages = (list, packageObject) => {
        if(!list.includes(packageObject.title)
            && (!packageObject.dep
            || list.includes(packageObject.dep)
        )) {
            list.push(packageObject.title);
        }
        return list;
    };

    const loop = (list = []) => {
        const count = list.length;
        const newList = depObjList.reduce(popDepPackages, list);
        if(count === newList.length){
            return "circular";
        }
        else if (depObjList.length > list.length) {
            return loop(newList);
        }
        else {
            return list.reduce(makeGrossString);
        }
    }
    return loop();
};


export default (depList) => {
    const fixedList = depList.map(stringFixer);
    return depLooper(fixedList);
};
