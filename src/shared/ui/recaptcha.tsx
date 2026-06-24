'use client';
import ReCAPTCHA from 'react-google-recaptcha';

interface Props {
  onChange: (token: string | null) => void;
}

export function Recaptcha({ onChange }: Props) {
  return (
    <div className="w-full flex justify-center sm:justify-start">
      <div className="origin-center sm:origin-left transform scale-[0.85] sm:scale-100">
        <ReCAPTCHA
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          theme="dark"
          onChange={onChange}
        />
      </div>
    </div>
  );
}
