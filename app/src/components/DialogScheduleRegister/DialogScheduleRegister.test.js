import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import DialogScheduleRegister from "./DialogScheduleRegister";

configure({ adapter: new Adapter() });

it("triggers register", () => {
  const onRegister = jest.fn();
  const dogSchedule = [
    {
      from: "0800",
      to: "1400"
    }
  ];
  const date = "25. 12.",
    from = "8:00",
    to = "13:45";
  const root = mount(<DialogScheduleRegister open dogSchedule={dogSchedule} onRegister={onRegister} />);
  root
    .find('TextField')
    .at(0)
    .props()
    .onChange({ target: { value: date } });
  root
    .find('TextField')
    .at(1)
    .props()
    .onChange({ target: { value: from } });
  root
    .find('TextField')
    .at(2)
    .props()
    .onChange({ target: { value: to } });
  root.find("Button").simulate("click");
  expect(onRegister).toHaveBeenCalledWith(date, "0800", "1345");
});
