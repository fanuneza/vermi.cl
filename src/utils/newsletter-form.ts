export type HiddenField = {
  name: string;
  value: string;
};

export type NewsletterFormConfig = {
  action: string;
  emailFieldName: string;
  hiddenFields: HiddenField[];
};

// Paste the public values from your MailerLite HTML embed here.
// These values are safe to expose because MailerLite includes them in the browser form snippet.
export const NEWSLETTER_FORM_CONFIG: NewsletterFormConfig = {
  action: "",
  emailFieldName: "fields[email]",
  hiddenFields: [],
};

export const isNewsletterFormConfigured =
  NEWSLETTER_FORM_CONFIG.action.trim().length > 0 &&
  NEWSLETTER_FORM_CONFIG.emailFieldName.trim().length > 0;
