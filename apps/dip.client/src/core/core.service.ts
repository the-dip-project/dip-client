import { Command, Option, Positional } from 'nestjs-command';

import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import fetch from 'node-fetch';

@Injectable()
export class CoreService {
  private readonly server: string;
  private readonly apiKey: string;

  public constructor(configService: ConfigService) {
    this.server = configService.get('server');
    this.apiKey = configService.get('api-key');
  }

  @Command({
    command: 'list-domain',
    describe: 'List all domains of current user',
  })
  public async listDomain() {
    const { apiKey, server } = this;

    const { statusCode, message, body } = await fetch(
      `${server}/api/domain?api_key=${apiKey}`,
    ).then((res) => res.json());

    if (statusCode !== 200) {
      console.error('Cannot fetch domains');
      console.error(message.join('\n'));
    }

    const transformed = body.reduce((acc, { id, ...x }) => {
      acc[id] = x;
      return acc;
    }, {});

    console.table(transformed);
  }

  @Command({
    command: 'list-record [domainId]',
    describe: 'List all records of domain',
  })
  public async listRecord(
    @Positional({ name: 'domainId', description: 'Domain id' })
    domainId: number,
  ) {
    const { apiKey, server } = this;

    const { statusCode, message, body } = await fetch(
      `${server}/api/domain/${domainId}/record?api_key=${apiKey}`,
    ).then((res) => res.json());

    if (statusCode !== 200) {
      console.error('Cannot fetch domains');
      console.error(message.join('\n'));
    }

    const transformed = body.reduce((acc, { id, ...x }) => {
      acc[id] = x;
      delete acc[id].domain;
      return acc;
    }, {});

    console.table(transformed);
  }
}
