export type NewsletterFormOptions = {
  containerSelector: string;
  formSelector?: string;
  submitSelector?: string;
  submitLabelSelector?: string;
  formRowSelector?: string;
  errorRowSelector?: string;
  successRowSelector?: string;
};

export type NewsletterFormController = {
  reset: () => void;
  setLoading: (isLoading: boolean) => void;
};

/**
 * Wire up a MailerLite-style newsletter form.
 *
 * Handles loading states, JSONP-style JSON response parsing, and
 * success/error row toggling. Returns a controller so the hosting
 * component can reset the form when the modal reopens.
 */
export function initNewsletterForm(
  options: NewsletterFormOptions,
): NewsletterFormController {
  const container = document.querySelector(options.containerSelector);

  if (!container) {
    return {
      reset: () => {},
      setLoading: () => {},
    };
  }

  const form = container.querySelector(
    options.formSelector || "form",
  ) as HTMLFormElement | null;
  const submit = container.querySelector(
    options.submitSelector || ".newsletter-submit",
  ) as HTMLButtonElement | null;
  const submitLabel = submit?.querySelector(
    options.submitLabelSelector || ".newsletter-submit-label",
  ) as HTMLElement | null;
  const formRow = container.querySelector(
    options.formRowSelector || ".row-form",
  ) as HTMLElement | null;
  const errorRow = container.querySelector(
    options.errorRowSelector || ".row-error",
  ) as HTMLElement | null;
  const successRow = container.querySelector(
    options.successRowSelector || ".row-success",
  ) as HTMLElement | null;

  const setLoading = (isLoading: boolean) => {
    if (!submit || !submitLabel) return;
    submit.disabled = isLoading || !form;
    submit.setAttribute("aria-busy", isLoading ? "true" : "false");
    submitLabel.textContent = isLoading ? "Enviando..." : "Suscribirse ✉";
  };

  const reset = () => {
    errorRow?.classList.add("hidden");
    successRow?.classList.add("hidden");
    formRow?.classList.remove("hidden");
    setLoading(false);
  };

  const showSuccess = () => {
    errorRow?.classList.add("hidden");
    formRow?.classList.add("hidden");
    successRow?.classList.remove("hidden");
    setLoading(false);
    form?.reset();
  };

  const showError = () => {
    successRow?.classList.add("hidden");
    errorRow?.classList.remove("hidden");
    formRow?.classList.remove("hidden");
    setLoading(false);
  };

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.action) {
      showError();
      return;
    }

    setLoading(true);
    errorRow?.classList.add("hidden");

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      const responseText = await response.text();
      let payload: { success?: boolean } | null = null;

      try {
        payload = JSON.parse(responseText) as { success?: boolean };
      } catch {
        payload = null;
      }

      if (response.ok && payload?.success) {
        showSuccess();
        return;
      }

      showError();
    } catch {
      showError();
    }
  });

  return { reset, setLoading };
}
