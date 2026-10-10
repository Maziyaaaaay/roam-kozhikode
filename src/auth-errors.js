export function authFailure(error){
 if(error?.code==='over_email_send_rate_limit'||/email.*rate.*limit/i.test(error?.message||''))return {message:'Confirmation email delivery has reached its limit. Your details are still here. An already confirmed account can sign in; new registrations need email delivery restored by the app owner.',retrySeconds:60};
 if(error?.status===429||['over_request_rate_limit','over_sms_send_rate_limit'].includes(error?.code))return {message:'Too many account requests. Wait a minute before trying again.',retrySeconds:60};
 if(error?.code==='email_not_confirmed')return {message:'This account still needs email confirmation. Open the confirmation email before signing in.',retrySeconds:0};
 if(error?.code==='invalid_credentials')return {message:'The email or password is incorrect. Check both and try again.',retrySeconds:0};
 return {message:error?.message||'Account access failed. Please try again.',retrySeconds:0};
}
