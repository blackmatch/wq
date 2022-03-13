#!/usr/bin/env node

import {program} from "commander"
import chalk from "chalk"
import pkg from "../../package.json"
import {query} from '../index'

const getWeatherString = (wInfo: wq.blackmatch.cn.WeatherInfo, len?: number): string => {
  let str = `${wInfo.dateStr} ${wInfo.weather} ${wInfo.temperature}  ${wInfo.wind}`
  if (len && str.length < len) {
    const arr: string[] = Array((len - str.length) * 2).fill(' ')
    str += arr.join('')
  }
  return str
}

const calculateMaxStringLength = (wInfoList: wq.blackmatch.cn.WeatherInfo[]): number => {
  let maxLength = 0
  wInfoList.forEach((wInfo) => {
    const str = getWeatherString(wInfo)
    if (str.length > maxLength) {
      maxLength = str.length
    }
  })

  return maxLength
}

const printWeatherInfo = (wInfoList: wq.blackmatch.cn.WeatherInfo[]) => {
  const log = console.log
  const firstItem = wInfoList[0]
  log(chalk.green(`${firstItem.city} 数据更新时间：${firstItem.updatedAt}`))
  const rainbow = ['#FF0000', '#FF7F00', '#FFFF00', '00FF00', '#00FFFF', '#0000FF', '#8B00FF']
  const rainbowBg = ['#000000', '#FFFFFF', '#000000', '#000000', '#A52A2A', '#DCDCDC', '#DCDCDC']
  const maxStrLength = calculateMaxStringLength(wInfoList)
  log('========================================')
  wInfoList.forEach((wInfo, idx) => {
    log(chalk.bgHex(rainbowBg[idx]).hex(rainbow[idx])(getWeatherString(wInfo, maxStrLength)))
  })
  log('========================================')
}

program
  .version(pkg.version)
  .usage("<name>")
  .arguments("<name>")
  .action(async (name: string): Promise<any> => {
    if (name && name.trim().length > 0) {
      const wInfoList = await query(name)
      printWeatherInfo(wInfoList)
    } else {
      program.outputHelp()
    }
  })
  .parse(process.argv)

// program.on("--help")
if (!process.argv.slice(2).length) {
  program.outputHelp()
}
