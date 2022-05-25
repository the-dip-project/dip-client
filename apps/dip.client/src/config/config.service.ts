import { existsSync, readFileSync, writeFileSync } from 'fs';
import { Command, Positional } from 'nestjs-command';
import { resolve } from 'path';

import { Injectable, Scope } from '@nestjs/common';

import { notAllowedKeys, Schema, schemaValidator } from './schema';

const defaultConfig: Schema = {
  server: '127.0.0.1',
  apiKey: ' '.repeat(64),
  watches: [],
};

@Injectable({
  scope: Scope.DEFAULT,
})
export class ConfigService {
  private static readonly CONFIG_PATH = resolve(
    process.env.APPDATA ? process.env.APPDATA : process.env.HOME,
    '.dip',
    'config.json',
  );
  private readonly config: Schema = defaultConfig;

  public constructor() {
    this.loadConfig();
  }

  private loadConfig() {
    if (existsSync(ConfigService.CONFIG_PATH)) {
      const rawConfig = JSON.parse(
        readFileSync(ConfigService.CONFIG_PATH, 'utf8'),
      );

      const validation = schemaValidator.validate(rawConfig);

      if (validation.error)
        writeFileSync(
          ConfigService.CONFIG_PATH,
          JSON.stringify(this.config, null, 2),
        );
      else Object.assign(this.config, validation.value);
    } else {
      writeFileSync(
        ConfigService.CONFIG_PATH,
        JSON.stringify(this.config, null, 2),
      );
    }
  }

  private getConfig(key: string) {
    console.log(this.config[key]);
  }

  private setConfig(key: string, value: string) {
    const newConfig = { ...this.config, [key]: value };

    const validation = schemaValidator.validate(newConfig);

    if (validation.error) {
      console.error(validation.error.details.map((d) => d.message).join('\n'));
      return;
    }

    Object.assign(this.config, validation.value);

    writeFileSync(
      ConfigService.CONFIG_PATH,
      JSON.stringify(this.config, null, 2),
    );

    console.log(`configuration.${key} set to new value`);
  }

  @Command({
    command: 'config <method> <key> [value]',
    describe: 'Configure the application',
  })
  public configure(
    @Positional({
      name: 'method',
      describe: 'Get or set',
      type: 'string',
      choices: ['get', 'set'],
    })
    method: string,
    @Positional({
      name: 'key',
      describe: 'Configuration key',
      type: 'string',
      choices: Object.keys(defaultConfig).filter(
        (key) => !notAllowedKeys.includes(key),
      ),
    })
    key: string,
    @Positional({
      name: 'value',
      describe: 'Configuration value',
      type: 'string',
    })
    value: string,
  ) {
    if (method === 'get') this.getConfig(key);
    else this.setConfig(key, value);
  }
}
