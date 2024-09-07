export default function SurveyField({
  input,
  label,
  meta: { error, touched },
}) {
  return (
    <div>
      <label htmlFor="">{label}</label>
      <input {...input} style={{ margin: "1rem 0" }} />
      <span className="red-text">{touched && error}</span>
    </div>
  );
}
