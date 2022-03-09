#!/usr/bin/env node

import program from "commander";
import pkg from "../../package.json";
import { query } from "../index";
import "../lib/model";
import { print } from "../lib/utils";

program
  .version(pkg.version)
  .usage("<city>")
  .arguments("<city>")
  .action(async (city: string): Promise<any> => {
    if (city && city.trim().length > 0) {
      const wInfo: wq.blackmatch.cn.IWeatherInfo = await query(city);
      print(wInfo);
    } else {
      program.outputHelp();
    }
  })
  .parse(process.argv);

// program.on("--help")
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
