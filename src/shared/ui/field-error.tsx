interface Props {
  message?: string;
}

export function FieldError({ message }: Props) {
  return <p className="text-sm text-destructive">{message}</p>;
}
