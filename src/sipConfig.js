// src/sipConfig.js
export const sipConfig = {
    uri: 'sip:101@sip.xtrevo.com', // Your SIP account URI
    wsServers: ['wss://sip.xtrevo.com:8443/asterisk-wss'], // WebSocket URL for SIP
    authorizationUser: '101', // SIP Username
    password: 'severalleddepend8912@@', // SIP Password
    sessionDescriptionHandlerFactoryOptions: {
      peerConnectionOptions: {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302' // STUN server
          }
        ]
      }
    }
  };
  