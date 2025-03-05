/* eslint-disable max-lines-per-function */
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { signIn, useAuth } from '@/core';

import { client } from './client';
import { toCamelCase, toSnakeCase } from './utils';

const ACCESS_TOKEN = 'access-token';
const CLIENT_HEADER = 'client';
const UID_HEADER = 'uid';
const EXPIRY_HEADER = 'expiry';
const AUTHORIZATION_HEADER = 'Authorization';

const CONTENT_TYPE = 'Content-Type';
const MULTIPART_FORM_DATA = 'multipart/form-data';

export default function interceptors() {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = useAuth.getState().token;

    const { headers, data } = config;

    if (headers && headers[CONTENT_TYPE] !== MULTIPART_FORM_DATA && data) {
      config.data = toSnakeCase(config.data);
    }

    if (token) {
      const { access, client: _client, uid, bearer, expiry } = token;

      config.headers[AUTHORIZATION_HEADER] = bearer;
      config.headers[ACCESS_TOKEN] = access;
      config.headers[CLIENT_HEADER] = _client;
      config.headers[UID_HEADER] = uid;
      config.headers[EXPIRY_HEADER] = expiry;
    }

    return config;
  });

  client.interceptors.response.use(
    (response) => {
      const { data, headers } = response;
      response.data = toCamelCase(response.data);

      const token = headers[ACCESS_TOKEN];
      const _client = headers[CLIENT_HEADER];
      const uid = headers[UID_HEADER];
      const expiry = headers[EXPIRY_HEADER];
      const bearer = headers[AUTHORIZATION_HEADER];

      if (token) {
        signIn({ access: token, client: _client, uid, expiry, bearer });
      }

      response.data = toCamelCase(data);

      return response;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  /*client.interceptors.request.use((request) => {
    console.log(
      `[HTTP REQUEST] ${request.rmethod?.toUpperCase()} ${request.url}`,
      request.data ?? request.params
    );
    return request;
  });
*/
 /* client.interceptors.response.use(
    (response) => {
      console.log("[HTTP RESPONSE]");
      console.log(`✅ Status: ${response.status} URL: ${response.config.url}`);
      console.log("✅ Headers:", response.headers);
      console.log("✅ Data:", response.data);
      return response;
    },
    (error) => {
      if (error.response) {
        console.error("[HTTP ERROR RESPONSE]");
        console.error(`❌ Status: ${error.response.status} URL: ${error.config?.url}`);
        console.error("❌ Headers:", error.response.headers);
        console.error("❌ Data:", error.response.data);
      } else if (error.request) {
        console.error("[HTTP ERROR REQUEST]");
        console.error("❌ No response received:", error.request);
      } else {
        console.error("[HTTP ERROR MESSAGE]");
        console.error("❌", error.message);
      }
      return Promise.reject(error);
    }
  );*/
}
