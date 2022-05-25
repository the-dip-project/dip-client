import { Injectable } from '@nestjs/common';
import { Command } from 'nestjs-command';
import { networkInterfaces } from 'os';

@Injectable()
export class NetToolsService {
  @Command({
    command: 'list-interface',
    describe: 'List all network interfaces',
  })
  public listAllInterface() {
    const interfaces = networkInterfaces();
    const result = [];

    for (const int in interfaces)
      for (const net of interfaces[int]) {
        result.push({ interface: int, network: net.netmask });
      }

    console.table(result);
  }
}
