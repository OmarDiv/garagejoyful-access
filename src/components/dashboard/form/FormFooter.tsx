
interface FormFooterProps {
  children?: React.ReactNode;
}

const FormFooter = ({ children }: FormFooterProps) => {
  return (
    <div className="mt-6 pt-5 border-t border-gray-100 text-xs text-guardian-gray text-center">
      {children || <p>Fields marked with <span className="text-guardian-red">*</span> are required</p>}
    </div>
  );
};

export default FormFooter;
