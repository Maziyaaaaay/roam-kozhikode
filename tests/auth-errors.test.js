import test from 'node:test';
import assert from 'node:assert/strict';
import {authFailure} from '../src/auth-errors.js';
test('email provider quota is distinguished from invalid credentials and does not promise a quota reset',()=>{
 const result=authFailure({code:'over_email_send_rate_limit',status:429});
 assert.match(result.message,/delivery restored/);
 assert.doesNotMatch(result.message,/reset|automatically|60 seconds/);
 assert.equal(result.retrySeconds,60);
 assert.equal(authFailure({code:'invalid_credentials'}).retrySeconds,0);
});
test('unconfirmed accounts cannot be silently treated as authenticated',()=>{
 assert.match(authFailure({code:'email_not_confirmed'}).message,/confirmation/);
 assert.equal(authFailure({status:429}).retrySeconds,60);
});
