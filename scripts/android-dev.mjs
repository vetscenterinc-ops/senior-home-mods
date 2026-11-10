import { spawn } from 'child_process';
import http from 'http';

function checkServerReady(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}`, (res) => {
      resolve(true);
    });
    req.on('error', () => resolve(false));
    req.setTimeout(1000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function main() {
  const isRunning = await checkServerReady(3000);
  let devProcess = null;

  if (!isRunning) {
    console.log('Starting Next.js dev server...');
    devProcess = spawn('npx', ['next', 'dev'], {
      stdio: 'inherit',
      env: { ...process.env, CAP_ENV: 'dev' },
    });

    let attempts = 0;
    while (attempts < 30) {
      await new Promise((r) => setTimeout(r, 1000));
      const ready = await checkServerReady(3000);
      if (ready) break;
      attempts++;
    }
  } else {
    console.log('Next.js dev server is already running on port 3000.');
  }

  console.log('Syncing Capacitor Android (CAP_ENV=dev)...');
  const sync = spawn('npx', ['cap', 'sync', 'android'], {
    stdio: 'inherit',
    env: { ...process.env, CAP_ENV: 'dev' },
  });

  sync.on('close', (code) => {
    if (code === 0) {
      console.log('Opening Android Studio...');
      spawn('npx', ['cap', 'open', 'android'], {
        stdio: 'inherit',
        env: { ...process.env, CAP_ENV: 'dev' },
      });
    }
  });
}

main();
