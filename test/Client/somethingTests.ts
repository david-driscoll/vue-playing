import { expect } from "chai";
import { shallow } from "vue-test-utils";
import { createApp } from "../../src/Client/app";
import A from "../../src/Client/Component.vue";

describe("List.vue", () => {
  it("renders li for each item in props.items", () => {
    const instance = shallow(A);
    instance.text().should.contain("Hello");
  });
  it("createap", () => {
    createApp();
  });
});
