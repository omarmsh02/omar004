// src/SipService.js
import { UserAgent } from 'sip.js';
import { sipConfig } from './sipConfig';

class SipService {
    constructor() {
        this.userAgent = new UserAgent({
            uri: sipConfig.uri,
            transportOptions: {
                wsServers: sipConfig.wsServers,
            },
            authorizationUsername: sipConfig.authorizationUser,
            authorizationPassword: sipConfig.password,
            displayName: sipConfig.displayName,
        });
    }

    async connect() {
        try {
            await this.userAgent.start();
            console.log('Connected to SIP server');
        } catch (error) {
            console.error('Failed to connect to SIP server:', error);
        }
    }

    makeCall(destination) {
        const inviter = this.userAgent.invite(destination);
        inviter.stateChange.on((state) => {
            console.log(`Call state changed: ${state}`);
            if (state === 'Accepted') {
                // Handle call accepted logic
            }
            if (state === 'Terminated') {
                // Handle call terminated logic
            }
        });
    }

    hangup(call) {
        call.hangup();
    }
}

export default new SipService();
