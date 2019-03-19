import test from "ava";
import { query } from "../src/index";
import "../src/lib/model";

test("query 北京", async (t) => {
  const wInfo: IWeatherInfo = await query("北京");
  t.is(wInfo.data.length, 7);
});

test("query 上海", async (t) => {
  const wInfo: IWeatherInfo = await query("上海");
  t.is(wInfo.data.length, 7);
});

test("query 广州", async (t) => {
  const wInfo: IWeatherInfo = await query("广州");
  t.is(wInfo.data.length, 7);
});
