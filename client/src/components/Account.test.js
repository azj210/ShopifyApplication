import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from "@testing-library/react";
import { shallow, configure } from "enzyme";
import Account from "./Account";
const renderer = require("react-test-renderer");
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import DataService from "../services/UserServices";
configure({ adapter: new Adapter() });

describe('Account Page Test', () => {
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useHistory: () => ({
      push: jest.fn(),
    }),
  }));

  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
      <Router>
        <Account/>
      </Router>,
      div
    );
  });

  it("sends call to write file", () => {
    var spy = jest.fn();
    var spyClick = jest.fn();

    var wrapper = shallow(<Account onChange={spy} onClick={spyClick} />);
    DataService.createImg = jest
      .fn()
      .mockResolvedValue({ data: { success : 1, data: {insertId: 2} } });

    wrapper
      .find("#nameInput")
      .simulate("change", { target: { value: "NewName" } });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 550);

    wrapper
      .find("#descriptionInput")
      .simulate("change", { target: { value: "NewDescription" } });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 550);

    wrapper.find("#sendMedia").simulate("click");
    setTimeout(() => {
      expect(spyClick).toHaveBeenCalledTimes(1);
      done();
    }, 550);
  });

  it("sends call to search file by name", () => {
    var spy = jest.fn();
    var spyClick = jest.fn();

    var wrapper = shallow(<Account onChange={spy} onClick={spyClick} />);
    DataService.getImgByName = jest
      .fn()
      .mockResolvedValue({ data: { success : 1, data: {insertId: 2} } });

    wrapper
      .find("#searchInput")
      .simulate("change", { target: { value: "NewName" } });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 550);

    wrapper
      .find("#choiceInput")
      .simulate("change", { target: { value: "Search By File Name" } });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 550);

    wrapper.find("#sendSearch").simulate("click");
    setTimeout(() => {
      expect(spyClick).toHaveBeenCalledTimes(1);
      done();
    }, 550);
  });

  it("sends call to search file by description", () => {
    var spy = jest.fn();
    var spyClick = jest.fn();

    var wrapper = shallow(<Account onChange={spy} onClick={spyClick} />);
    DataService.getImgByName = jest
      .fn()
      .mockResolvedValue({ data: { success : 1, data: {insertId: 2} } });

    wrapper
      .find("#searchInput")
      .simulate("change", { target: { value: "NewDescription" } });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 550);

    wrapper
      .find("#choiceInput")
      .simulate("change", { target: { value: "Search By File Description" } });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 550);

    wrapper.find("#sendSearch").simulate("click");
    setTimeout(() => {
      expect(spyClick).toHaveBeenCalledTimes(1);
      done();
    }, 550);
  });

  it("sends call to search file by description", () => {
    var spy = jest.fn();
    var spyClick = jest.fn();

    var wrapper = shallow(<Account onChange={spy} onClick={spyClick} />);
    DataService.getImgByName = jest
      .fn()
      .mockResolvedValue({ data: { success : 1, data: {insertId: 2} } });

    wrapper
      .find("#deleteInput")
      .simulate("change", { target: { value: "NewName" } });
    setTimeout(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    }, 550);

    wrapper.find("#deleteMedia").simulate("click");
    setTimeout(() => {
      expect(spyClick).toHaveBeenCalledTimes(1);
      done();
    }, 550);
  });
});
