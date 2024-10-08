export default function inputBar({ label, ...rest }) {
  return (
    <input
      type="text"
      placeholder={label}
      className="input input-bordered border-primary mt-1 mb-3 border-opacity-60 bg-white w-[400px] text-sm font-semibold max-w-xs text-[#D7DCE0]"
      {...rest}
    />
  );
}
