import React from "react";
import {CPUGameCell} from "./CPUGameCell";
import renderer from "react-test-renderer";

test("Link changes the class when hovered", () => {
  const component = renderer.create(<CPUGameCell />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
