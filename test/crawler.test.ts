import test from "ava";
import Crawler from "../src/lib/crawler";
import "../src/lib/model";
import { print } from "../src/lib/utils";

const cl = new Crawler();

test("北京 should be 101010100", async (t) => {
  t.is(await cl.getCityCode("北京"), "101010100");
});

test("上海 should be 101020100", async (t) => {
  t.is(await cl.getCityCode("上海"), "101020100");
});

test("^^上海 should be 101020100", async (t) => {
  t.is(await cl.getCityCode("  上海"), "101020100");
});

test("广州 should be 101280101", async (t) => {
  t.is(await cl.getCityCode("广州"), "101280101");
});

test("广州^^ should be 101280101", async (t) => {
  t.is(await cl.getCityCode("广州  "), "101280101");
});

test("徐汇 should be 101021200", async (t) => {
  t.is(await cl.getCityCode("徐汇"), "101021200");
});

test("浦东 should be 101020600", async (t) => {
  t.is(await cl.getCityCode("浦东"), "101020600");
});

test("测试文本 should be \"\"", async (t) => {
  t.is(await cl.getCityCode("测试文本"), "");
});

test("\"\" should be \"\"", async (t) => {
  t.is(await cl.getCityCode(""), "");
});

test("^^ should be \"\"", async (t) => {
  t.is(await cl.getCityCode("  "), "");
});

test("weather info", async (t) => {
  const info: wq.blackmatch.cn.IWeatherInfo = await cl.queryWeather("101020600");
  t.is(info.data.length, 7);
});
