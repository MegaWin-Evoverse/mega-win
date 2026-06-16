'use client';

import ReCAPTCHA from 'react-google-recaptcha';

interface Props {
  onChange: (token: string | null) => void;
}

export function Recaptcha({ onChange }: Props) {
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      theme="dark"
      onChange={onChange}
    />
  );
}
