import { expect } from "chai";
import { shallow } from "vue-test-utils";
import { createApp } from "../../src/Client/app";
import A from "../../src/Client/Component.vue";

describe("List.vue", () => {
  it("renders li for each item in props.items", () => {
    const instance = shallow(A);
    instance.setData({ value: 5678, value2: 9012 });
    instance.text().should.contain("Hello");
    instance.text().should.contain("5678");
    instance.text().should.contain("123414");
  });
  it("createap", () => {
    createApp();
  });
});