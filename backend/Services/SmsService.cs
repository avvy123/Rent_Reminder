using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using backend.Helpers;

namespace backend.Services
{
    public class SmsService
    {
        private readonly IConfiguration _config;

        public SmsService(IConfiguration config)
        {
            _config = config;
        }

        public async Task SendSms(string phone, string message)
        {
            try
            {
                var accountSid = _config["Twilio:AccountSid"];
                var authToken = _config["Twilio:AuthToken"];
                var fromNumber = _config["Twilio:SmsNumber"];

                TwilioClient.Init(accountSid, authToken);

                var formattedPhone = PhoneHelper.FormatIndianNumber(phone);

                var response = await MessageResource.CreateAsync(
                    body: message,
                    from: new PhoneNumber(fromNumber),
                    to: new PhoneNumber(formattedPhone)
                );

                Console.WriteLine($"SMS Sent ✔ SID: {response.Sid}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"❌ SMS Failed to {phone}: {ex.Message}");
            }
        }
    }
}