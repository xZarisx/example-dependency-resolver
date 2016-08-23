import tape from "tape";
import stringFixer from "./libs/stringFixer";

tape("stringFixer", (test) => {
    const testObject = stringFixer("foo: bar");

    test.equals(testObject, {foo: "bar"});
    test.end();
});
