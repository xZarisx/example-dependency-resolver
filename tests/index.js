import tape from "tape";
import stringFixer from "../libs/stringFixer";

tape("stringFixer", (test) => {
    const testObject = stringFixer("foo: bar");

    test.deepEqual(testObject, {foo: "bar"});
    test.end();
});
