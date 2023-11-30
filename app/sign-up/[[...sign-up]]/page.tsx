import { SignUp } from "@clerk/nextjs";

export const SignUpPage = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-slate-100/25  py-5 px-4">
      <SignUp />
    </div>
  );
};

export default SignUpPage;
