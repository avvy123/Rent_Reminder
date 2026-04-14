namespace backend.Helpers
{
    public static class PhoneHelper
    {
        public static string FormatIndianNumber(string phone)
        {
            if (string.IsNullOrWhiteSpace(phone))
                return phone;

            phone = phone.Trim();

            // If already has +91, return as is
            if (phone.StartsWith("+"))
                return phone;

            // If starts with 91 without +
            if (phone.StartsWith("91") && phone.Length == 12)
                return "+" + phone;

            // Normal 10-digit number
            if (phone.Length == 10)
                return "+91" + phone;

            return phone; // fallback
        }
    }
}