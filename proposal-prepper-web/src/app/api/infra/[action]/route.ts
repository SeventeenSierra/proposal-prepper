/*
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * SPDX-FileCopyrightText: 2025 Seventeen Sierra LLC
 */

import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

/**
 * Common handler for infrastructure commands
 */
async function runInfraCommand(command: string) {
    const infraDir = path.resolve(process.cwd(), '../proposal-prepper-infra/containers');
    const binDir = path.join(infraDir, 'bin');

    // Ensure bin/podman exists as a link to docker for the workaround
    try {
        if (!fs.existsSync(binDir)) {
            fs.mkdirSync(binDir, { recursive: true });
        }

        // Fallback docker path
        const dockerPath = '/etc/profiles/per-user/afla/bin/docker';
        const podmanLink = path.join(binDir, 'podman');
        const podmanComposeLink = path.join(binDir, 'podman-compose');

        if (!fs.existsSync(podmanLink)) {
            try {
                fs.symlinkSync(dockerPath, podmanLink);
                // Also link docker-compose to podman-compose if needed
                fs.symlinkSync('/etc/profiles/per-user/afla/bin/docker-compose', podmanComposeLink);
            } catch (e) { }
        }

        // Determine Podman socket based on host OS
        const isMac = process.platform === 'darwin';
        let podmanSocket = '';

        if (isMac) {
            // On Mac, first try to find the Nix-provided socket or the default machine socket
            podmanSocket = `/tmp/nix-shell.${process.env.USER || 'afla'}/podman/podman-machine-default-api.sock`;
            if (!fs.existsSync(podmanSocket)) {
                // Fallback to default Mac podman socket location if Nix one isn't there
                podmanSocket = `/Users/${process.env.USER || 'afla'}/.local/share/containers/podman/machine/podman-machine-default/podman.sock`;
            }
        } else {
            podmanSocket = `/run/user/${process.getuid?.() || 501}/podman/podman.sock`;
        }

        const env: any = { ...process.env };
        env.PATH = `${binDir}:${process.env.PATH}`;

        // If the current DOCKER_HOST looks like the broken Linux path on Mac, unset it
        if (isMac && env.DOCKER_HOST?.includes('/run/user/')) {
            delete env.DOCKER_HOST;
        }

        // Try to use the discovered socket if it exists
        if (fs.existsSync(podmanSocket)) {
            env.DOCKER_HOST = `unix://${podmanSocket}`;
        }

        // Always use podman-compose on this system as docker-compose is broken for Podman
        let finalizedCommand = command;
        if (command.includes('docker-compose')) {
            finalizedCommand = command.replace('docker-compose', 'podman-compose -f compose.yaml');
        }

        console.log(`[INFRA] Executing: ${finalizedCommand} in ${infraDir} (DOCKER_HOST=${env.DOCKER_HOST || 'default'})`);

        return new Promise((resolve, reject) => {
            exec(finalizedCommand, { cwd: infraDir, env }, (error, stdout, stderr) => {
                if (error) {
                    console.error(`[INFRA] Error: ${error.message}`);
                    // If it's a 'down' command and it fails, we often don't care if the services were already down
                    if (command.includes('down')) {
                        resolve({ stdout, stderr: error.message });
                        return;
                    }
                    reject(error);
                    return;
                }
                console.log(`[INFRA] Output: ${stdout}`);
                resolve({ stdout, stderr });
            });
        });
    } catch (error: any) {
        console.error(`[INFRA] Setup failed: ${error.message}`);
        throw error;
    }
}

/**
 * Start/Stop Infrastructure
 */
export async function POST(req: Request) {
    const url = new URL(req.url);
    const isStop = url.pathname.endsWith('/stop');

    const cmd = isStop
        ? 'docker-compose -p proposal-prepper down'
        : './start.sh --mode router-local --no-web -d';

    try {
        // We don't await here to keep the UI responsive, but we handle the promise
        runInfraCommand(cmd).catch(err => console.error(`[INFRA] Async command failed: ${err.message}`));
        return NextResponse.json({ status: 'initiated', command: isStop ? 'stop' : 'start' });
    } catch (error: any) {
        return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
    }
}
