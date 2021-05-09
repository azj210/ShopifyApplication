import React from "react";
import { render } from "@testing-library/react";
import Login from "./Login";
import { shallow, configure } from "enzyme";
const renderer = require("react-test-renderer");
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DataService from "../services/UserServices";
configure({ adapter: new Adapter() });

it("serves invalid login with invalid password", () => {
  const { getByText } = render(<Login />);
  var spy = jest.fn();
  var spyClick = jest.fn();
  var wrapper = shallow(<Login onChange={spy} onClick={spyClick} />);

  wrapper.find("#userName").simulate("change", { target: { value: "abc123" } });
  DataService.login = jest
    .fn()
    .mockResolvedValue({ data: { success: 1, data: "abc123" } });
  wrapper.find("#login_button").simulate("click");
  DataService.login = jest
    .fn()
    .mockResolvedValue({ data: { success: 0, data: "Invalid password" } });
  wrapper.find("#login_button").simulate("click");
  expect(DataService.login).toHaveBeenCalled();
  expect(DataService.login).toHaveBeenCalledTimes(1);
});

it("serves valid login with valid password", () => {
  const { getByText } = render(<Login />);
  var spy = jest.fn();
  var spyClick = jest.fn();
  var wrapper = shallow(<Login onChange={spy} onClick={spyClick} />);

  wrapper.find("#userName").simulate("change", { target: { value: "abc123" } });
  wrapper.find("#password").simulate("change", { target: { value: "abc123" } });
  DataService.login = jest
    .fn()
    .mockResolvedValue({ data: { success: 1, data: "abc123" } });
  wrapper.find("#login_button").simulate("click");
  DataService.login = jest
    .fn()
    .mockResolvedValue({ data: { success: 1, data: "abc123" } });
  wrapper.find("#login_button").simulate("click");
  expect(DataService.login).toHaveBeenCalled();
  expect(DataService.login).toHaveBeenCalledTimes(1);
});
