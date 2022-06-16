/*!
 * Copyright (c) 2015-present, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
import { StorageManager } from '../StorageManager';
import { CustomUrls, TokenParams } from './OktaAuthOptions';
import { IdxTransactionMeta } from '../idx/types';
export interface TransactionManagerOptions {
    storageManager?: StorageManager;
    enableSharedStorage?: boolean;
    legacyWidgetSupport?: boolean;
    saveNonceCookie?: boolean;
    saveStateCookie?: boolean;
    saveParamsCookie?: boolean;
    saveLastResponse?: boolean;
}
export interface OAuthTransactionMeta extends Pick<TokenParams, 'issuer' | 'clientId' | 'redirectUri' | 'responseType' | 'responseMode' | 'scopes' | 'state' | 'pkce' | 'ignoreSignature' | 'nonce'> {
    urls: CustomUrls;
    originalUri?: string;
}
export interface PKCETransactionMeta extends OAuthTransactionMeta, Pick<TokenParams, 'codeChallenge' | 'codeChallengeMethod' | 'codeVerifier'> {
}
export declare type CustomAuthTransactionMeta = Record<string, string | undefined>;
export declare type TransactionMeta = IdxTransactionMeta | PKCETransactionMeta | OAuthTransactionMeta | CustomAuthTransactionMeta;
export interface TransactionMetaOptions extends Pick<IdxTransactionMeta, 'pkce' | 'state' | 'codeChallenge' | 'codeChallengeMethod' | 'codeVerifier' | 'flow' | 'activationToken' | 'recoveryToken'> {
    oauth?: boolean;
    muteWarning?: boolean;
}
export declare function isOAuthTransactionMeta(obj: any): obj is OAuthTransactionMeta;
export declare function isPKCETransactionMeta(obj: any): obj is PKCETransactionMeta;
export declare function isIdxTransactionMeta(obj: any): obj is IdxTransactionMeta;
export declare function isCustomAuthTransactionMeta(obj: any): obj is CustomAuthTransactionMeta;
export declare function isTransactionMeta(obj: any): obj is TransactionMeta;
