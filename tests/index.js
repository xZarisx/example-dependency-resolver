import tape from "tape";
import stringFixer from "../libs/stringFixer";
import resolver from "../index.js";
import {depResolveClean} from "../index.js";

tape("stringFixer", (test) => {
    const testObject = stringFixer("foo: bar");

    test.deepEqual(testObject, {title: "foo", dep: "bar"});
    test.end();
});


tape("valid dep list", (test) => {
    const validList = [
        "KittenService: ",
        "Leetmeme: Cyberportal",
        "Cyberportal: Ice",
        "CamelCaser: KittenService",
        "Fraudstream: Leetmeme",
        "Ice: "
    ];
    test.equal(resolver(validList), 'KittenService, CamelCaser, Ice, Cyberportal, Leetmeme, Fraudstream');
    test.end();
});

tape("valid dep list are in a valid order", (test) => {
    const validList = [
        "KittenService: ",
        "Leetmeme: Cyberportal",
        "Cyberportal: Ice",
        "CamelCaser: KittenService",
        "Fraudstream: Leetmeme",
        "Ice: "
    ];
    const packageDeps = validList.map(stringFixer).reduce((p, c) => {
        return Object.assign(p, {[c.title]: c.dep});
    },{});
    test.ok(depResolveClean(validList)
        .every((dep, index, depArray) => {
            return !packageDeps[dep] ? true : depArray.indexOf(packageDeps[dep]) - index;
        })
    );
    test.end();
});

tape("circular dep list", (test) => {
    const circularList =  [
        "KittenService: ",
        "Leetmeme: Cyberportal",
        "Cyberportal: Ice",
        "CamelCaser: KittenService",
        "Fraudstream: ",
        "Ice: Leetmeme"
    ];
    test.equal(resolver(circularList), 'circular');
    test.end();
});
