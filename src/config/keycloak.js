'use client';

import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || 'http://localhost:8080',
    realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || 'your-realm',
    clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || 'your-client-id'
};

let keycloak = null;

if (typeof window !== 'undefined') {
    keycloak = new Keycloak(keycloakConfig);
}

export default keycloak;