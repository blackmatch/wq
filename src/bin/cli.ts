#!/usr/bin/env node

import program from "commander";
import { query } from "../index";
import { print } from "../lib/utils";
import "../lib/model";
import pkg from "../../package.json";

program
  .version(pkg.version)
  .usage("<city>")
  .arguments("<city>")
  .action(async function(city: string): Promise<any> {
    if (city && city.trim().length > 0) {
      const wInfo:IWeatherInfo = await query(city);
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
