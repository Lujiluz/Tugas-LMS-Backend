export interface ResponseDetail {
  category: string;
  message: string;
  description: string;
}

export interface ResponseConfig {
  [key: string]: ResponseDetail;
}

const responseConfig: ResponseConfig = {
  // Success (2xx)
  200: {
    category: "Success",
    message: "Successful",
    description: "Successful",
  },
  202: {
    category: "Success",
    message: "Request In Progress",
    description: "Transaction still on process",
  },

  // Client Errors (4xx)
  // 400 - Bad Request
  400: {
    category: "System",
    message: "Bad Request",
    description: "General request failed error, including message parsing failed.",
  },
  "400_01": {
    category: "Message",
    message: "Invalid Field Format {field name}",
    description: "Invalid format",
  },
  "400_02": {
    category: "Message",
    message: "Invalid Mandatory Field {field name}",
    description: "Missing or invalid format on mandatory field",
  },

  // 401 - Unauthorized
  401: {
    category: "System",
    message: "Unauthorized. [reason]",
    description: "General unauthorized error",
  },
  "401_01": {
    category: "System",
    message: "Invalid Token (B2B)",
    description: "Token found in request is invalid (Access Token Not Exist, Access Token Expiry)",
  },
  "401_02": {
    category: "System",
    message: "Invalid Customer Token",
    description: "Token found in request is invalid (Access Token Not Exist, Access Token Expiry)",
  },
  "401_03": {
    category: "System",
    message: "Token Not Found (B2B)",
    description: "Token not found in the system. This occurs on any API that requires token as input parameter",
  },
  "401_04": {
    category: "System",
    message: "Customer Token Not Found",
    description: "Token not found in the system. This occurs on any API that requires token as input parameter",
  },

  // 403 - Forbidden
  403: {
    category: "Business",
    message: "Transaction Expired",
    description: "Transaction expired",
  },
  "403_01": {
    category: "System",
    message: "Feature Not Allowed [Reason]",
    description: "This merchant is not allowed to call Direct Debit APIs",
  },
  "403_02": {
    category: "Business",
    message: "Exceeds Transaction Amount Limit",
    description: "Exceeds Transaction Amount Limit",
  },
  "403_03": {
    category: "Business",
    message: "Suspected Fraud",
    description: "Suspected Fraud",
  },
  "403_04": {
    category: "Business",
    message: "Activity Count Limit Exceeded",
    description: "Too many request, Exceeds Transaction Frequency Limit",
  },
  "403_05": {
    category: "Business",
    message: "Do Not Honor",
    description: "Account or User status is abnormal",
  },
  "403_06": {
    category: "System",
    message: "Feature Not Allowed At This Time. [reason]",
    description: "Cut off In Progress",
  },
  "403_07": {
    category: "Business",
    message: "Card Blocked",
    description: "The payment card is blocked",
  },
  "403_08": {
    category: "Business",
    message: "Card Expired",
    description: "The payment card is expired",
  },
  "403_09": {
    category: "Business",
    message: "Dormant Account",
    description: "The account is dormant",
  },
  "403_10": {
    category: "Business",
    message: "Need To Set Token Limit",
    description: "Need to set token limit",
  },
  "403_11": {
    category: "System",
    message: "OTP Blocked",
    description: "OTP has been blocked",
  },
  "403_12": {
    category: "System",
    message: "OTP Lifetime Expired",
    description: "OTP has been expired",
  },
  "403_13": {
    category: "System",
    message: "OTP Sent To Cardholer",
    description: "initiates request OTP to the issuer",
  },
  "403_14": {
    category: "Business",
    message: "Insufficient Funds",
    description: "Insufficient Funds",
  },
  "403_15": {
    category: "Business",
    message: "Transaction Not Permitted.[reason]",
    description: "Transaction Not Permitted",
  },
  "403_16": {
    category: "Business",
    message: "Suspend Transaction",
    description: "Suspend Transaction",
  },
  "403_17": {
    category: "Business",
    message: "Token Limit Exceeded",
    description: "Purchase amount exceeds the token limit set prior",
  },
  "403_18": {
    category: "Business",
    message: "Inactive Card/Account/Customer",
    description: "Indicates inactive account",
  },
  "403_19": {
    category: "Business",
    message: "Merchant Blacklisted",
    description: "Merchant is suspended from calling any APIs",
  },
  "403_20": {
    category: "Business",
    message: "Merchant Limit Exceed",
    description: "Merchant aggregated purchase amount on that day exceeds the agreed limit",
  },
  "403_21": {
    category: "Business",
    message: "Set Limit Not Allowed",
    description: "Set limit not allowed on particular token",
  },
  "403_22": {
    category: "Business",
    message: "Token Limit Invalid",
    description: "The token limit desired by the merchant is not within the agreed range between the merchant and the Issuer",
  },
  "403_23": {
    category: "Business",
    message: "Account Limit Exceed",
    description: "Account aggregated purchase amount on that day exceeds the agreed limit",
  },

  // 404 - Not Found
  404: {
    category: "Business",
    message: "Invalid Transaction Status",
    description: "Invalid transaction status",
  },
  "404_99": {
    category: "System",
    message: "[reason]",
    description: "[reason]",
  },
  "404_01": {
    category: "Business",
    message: "Transaction Not Found",
    description: "Transaction not found",
  },
  "404_02": {
    category: "System",
    message: "Invalid Routing",
    description: "Invalid Routing",
  },
  "404_03": {
    category: "System",
    message: "Bank Not Supported By Switch",
    description: "Bank not supported by switch",
  },
  "404_04": {
    category: "Business",
    message: "Transaction Cancelled",
    description: "Transaction is cancelled by customer",
  },
  "404_05": {
    category: "Business",
    message: "Merchant Is Not Registered For Card Registration Services",
    description: "Merchant is not registered for Card Registration services",
  },
  "404_06": {
    category: "System",
    message: "Need To Request OTP",
    description: "Need to request OTP",
  },
  "404_07": {
    category: "System",
    message: "Journey Not Found",
    description: "The journeyID cannot be found in the system",
  },
  "404_08": {
    category: "Business",
    message: "Invalid Merchant",
    description: "Merchant does not exist or status abnormal",
  },
  "404_09": {
    category: "Business",
    message: "No Issuer",
    description: "No issuer",
  },
  "404_10": {
    category: "System",
    message: "Invalid API Transition",
    description: "Invalid API transition within a journey",
  },
  "404_11": {
    category: "Business",
    message: "Invalid Card/Account/Customer [info]/Virtual Account",
    description: "Card information may be invalid, or the card account may be blacklisted, or Virtual Account number maybe invalid.",
  },
  "404_12": {
    category: "Business",
    message: "Invalid Bill/Virtual Account [Reason]",
    description: "The bill is blocked/ suspended/not found. Virtual account is suspend/not found.",
  },
  "404_13": {
    category: "Business",
    message: "Invalid Amount",
    description: "The amount doesn't match with what supposed to",
  },
  "404_14": {
    category: "Business",
    message: "Paid Bill",
    description: "The bill has been paid",
  },
  "404_15": {
    category: "System",
    message: "Invalid OTP",
    description: "OTP is incorrect",
  },
  "404_16": {
    category: "Business",
    message: "Partner Not Found",
    description: "Partner number can't be found",
  },
  "404_17": {
    category: "Business",
    message: "Invalid Terminal",
    description: "Terminal does not exist in the system",
  },
  "404_18": {
    category: "Business",
    message: "Inconsistent Request",
    description: "Inconsistent request parameter found for the same partner reference number/transaction id",
  },
  "404_19": {
    category: "Business",
    message: "Invalid Bill/Virtual Account",
    description: "The bill is expired. Virtual account is expired.",
  },

  // 405 - Method Not Allowed
  405: {
    category: "System",
    message: "Requested Function Is Not Supported",
    description: "Requested function is not supported",
  },
  "405_01": {
    category: "Business",
    message: "Requested Opearation Is Not Allowed",
    description: "Requested operation to cancel/refund transaction Is not allowed at this time.",
  },

  // 409 - Conflict
  409: {
    category: "System",
    message: "Conflict",
    description: "Cannot use same X-EXTERNAL-ID in same day",
  },
  "409_01": {
    category: "System",
    message: "Duplicate partnerReferenceNo",
    description: "Transaction has previously been processed indicates the same partnerReferenceNo already success",
  },

  // 429 - Too Many Requests
  429: {
    category: "System",
    message: "Too Many Requests",
    description: "Maximum transaction limit exceeded",
  },

  // Server Errors (5xx)
  500: {
    category: "System",
    message: "General Error",
    description: "General Error",
  },
  "500_01": {
    category: "System",
    message: "Internal Server Error",
    description: "Unknown Internal Server Failure, Please retry the process again",
  },
  "500_02": {
    category: "System",
    message: "External Server Error",
    description: "Backend system failure, etc",
  },
  504: {
    category: "System",
    message: "Timeout",
    description: "timeout from the issuer",
  },
};

export default responseConfig;
