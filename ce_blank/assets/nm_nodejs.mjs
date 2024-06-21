#!/usr/bin/env -S /Users/hua/.nvm/versions/node/v22.3.0/bin/node
import { open } from "node:fs/promises";
// process.env.UV_THREADPOOL_SIZE = 1;

async function readFullAsync(length, buffer = new Uint8Array(65536)) {
  const data = [];
  while (data.length < length) {
    const input = await open("/dev/stdin");
    let { bytesRead } = await input.read({
      buffer
    });
    await input.close();
    if (bytesRead === 0) {
      break;
    }
    data.push(...buffer.subarray(0, bytesRead));
  }
  return new Uint8Array(data);
}

async function getMessage() {
  const header = new Uint32Array(1);
  await readFullAsync(1, header);
  const content = await readFullAsync(header[0]);
  return content;
}

async function sendMessage(message) {
  const header = new Uint32Array([message.length]);
  // const stdout = await open("/proc/self/fd/1", "w");
  const stdout = await fs.open(`/proc/${process.pid}/fd/1`, "w");
  await stdout.write(header);
  await stdout.write(message);
  await stdout.close();
  global.gc();
}

async function main() {
  while (true) {
    try {
      const message = await getMessage();
      await sendMessage(message);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }
}

main();
