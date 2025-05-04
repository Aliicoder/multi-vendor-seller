import SignUpForm from "@/components/forms/SignUpForm"
const SignUpPage = () => {
  return (
    <div className="flex ">
      <SignUpForm
        className="flex justify-center items-center | w-full h-lvh bg-slate-50 
        md:w-1/2"
      />
      <div
        className=" flex w-full justify-center items-center 
        max-md:hidden md:w-1/2"
      >
        <img src="/svgs/signup.svg" className=" w-1/2" alt="" />
      </div>
    </div>
  )
}

export default SignUpPage
