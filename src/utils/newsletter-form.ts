export type HiddenField = {
  name: string;
  value: string;
};

export type NewsletterFormConfig = {
  action: string;
  emailFieldName: string;
  hiddenFields: HiddenField[];
  target?: "_blank" | "_self";
};

// Paste the public values from your MailerLite HTML embed here.
// These values are safe to expose because MailerLite includes them in the browser form snippet.
export const NEWSLETTER_FORM_CONFIG: NewsletterFormConfig = {
  action:
    "https://assets.mailerlite.com/jsonp/2484647/forms/191849877989230261/subscribe",
  emailFieldName: "fields[email]",
  hiddenFields: [
    { name: "ml-submit", value: "1" },
    { name: "anticsrf", value: "true" },
  ],
  target: "_blank",
};

export const isNewsletterFormConfigured =
  NEWSLETTER_FORM_CONFIG.action.trim().length > 0 &&
  NEWSLETTER_FORM_CONFIG.emailFieldName.trim().length > 0;
